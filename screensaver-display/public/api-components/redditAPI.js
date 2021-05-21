// handle to ipc
const { ipcMain } = require('electron');

// access to fetch since it isn't included in the main process
const fetch = require('node-fetch').default;


/* "Why is the API here?"
We need the Reddit API to be included in the main Electron process
so that when we make API calls, we do not have to deal with Cross-Origin
Resource Sharing policies, which happens when a front-end platform makes
API requests. We prevent this by running API calls from the main process
*/

// Usage: ipcRenderer.sendSync('get-subreddits', ({search query}, {results limit}))
// returns: array of subreddit objects, where the names are found in 
ipcMain.handle('get-subreddits', async (event, query, limit) => {

    try {
        const result = await fetch(`http://www.reddit.com/subreddits/search.json?q=${query}&limit=${limit}`)
        .then((response) => {
            if (!response.ok) {
                throw Error("Error");
            }
            return response.json();
        })
        .then(data => {
            return data.data.children;
        });
        return result;
    } catch (err) {
        console.error('Empty query caught as expected:',err);
        return [];
    }
});

// Usage: getRedditImages([array of search terms], [ID of reddit post to search after for paging])
// returns: array of posts, where image links are found in post.data.url
// parameter query: array of strings, where each string is a valid subreddit
// parameter pageref: ID of reddit post to search after for more posts. Used for paging of search queries

async function getRedditPosts(query, pageref) {

    const url = 
        'https://www.reddit.com/r/'
        + `${query.join("+")}`
        + '.json'
        + (pageref ? (`?after=t3_${pageref}`) : "");
    // Ex: https://www.reddit.com/r/pics+photography+dankmemes.json/?after=t3_xntdr7
    
    try {
        const result = await fetch(url)
        .then(res => {
            if (!res.ok) {
                throw Error("RedditAPI: Fetch request invalid");
            }
            return res.json();
            }
        )
        .then(data => {
            if (data != null){
                
                // filter out everything that is not an image or is NSFW
                data = data.data.children.filter(post => ((
                    post.data.url.includes('imgur') ||
                    post.data.url.includes('.png') ||
                    post.data.url.includes('.jpg') ) &&
                    !post.data.over_18)
                    );
                    return data;
                } else {
                    console.log("RedditAPI: Data is null");
                    return [];
                }
            }
        );
        return result;

    } catch (err) {
        console.error('RedditAPI: Error in fetch request.',err);
        return [];
    }
};

// Usage: ipcRenderer.invoke('get-reddit-images', [array of subreddits], [number of posts to get])
// returns: array of posts, where image links are found in post.data.url
    // Loops through search queries, with each iteration applying the ID of the last post
    // to getRedditQuery to search for posts following that last post until the count is met
// parameter query: array of strings, where each string is a valid subreddit
// parameter count: number of images to get
ipcMain.handle('get-reddit-images', async (event, query, count) => {
    try {

        let results = [];
        let lastPostID = "";
        while(results.length < count){
            const tempQuery = await getRedditPosts(query, lastPostID);
            if (!tempQuery.length){
                console.error(`RedditAPI: No images gathered from the page, exiting with partial array of ${results.length} images`);
                return results;
            }
            results = results.concat(tempQuery);
            lastPostID = results[results.length - 1].data.id;
            console.log('RedditAPI: Last Post ID:',lastPostID);
        }
        console.log(`RedditAPI: Sending back ${count} images from ${query}`);
        return results.slice(0,count);
    } catch (err) {
        console.error("RedditAPI: Error in 'get-reddit-images'",err);
    }
});