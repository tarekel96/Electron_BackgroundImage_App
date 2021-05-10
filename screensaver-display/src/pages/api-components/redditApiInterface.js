

// Usage: getSubreddits({search query, results limit})
// returns: array of subreddit objects, where the names are found in 
export async function getSubreddits(query, limit) {

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
};

// Usage: getRedditImages([array of search terms], [ID of reddit post to search after for paging])
// returns: array of posts, where image links are found in post.data.url
// NOTE: page refers to the ID of some reddit post, from which the query will look for
//       posts following that post. Currently having issues with making that work.
export async function getRedditQuery(query, page) {

    // As of right now, CORS policy does not allow us to fetch a reddit search
    // query for posts following some certain post. This seems like a difficult
    // but very necessary problem to fix.
    page = '';
    //const url = `https://www.reddit.com/r/${query.join("+")}${page ? (`?after=t3_${page}`) : ""}.json`;
    
    const url = `https://www.reddit.com/r/${query.join("+")}.json`;

    try {
        const result = await
        fetch(url)
        .then(res => {
            if (!res.ok) {
                console.error("Request error:",res);
                throw Error("Error fetching");
            }
            return res.json()})
            
        .then(data => {
            if (data != null){
                
                // filter out everything that is not an image or is NSFW
                data = data.data.children.filter(post => ((
                    post.data.url.includes('imgur') ||
                    post.data.url.includes('.png') ||
                    post.data.url.includes('.jpg') ||
                    post.data.url.includes('.gif')) &&
                    !post.data.over_18)
                    );
                    //console.log('RedditAPI(filtered):',data);
                    return data;
                } else {
                    console.log("Data is null");
                    return [];
                }
            });
        return result;
    } catch (err) {
        console.error('Reddit API: Error in fetch request.',err);
        return [];
    }
};

// Usage: getRedditImages([array of subreddits], [number of posts to get])
// returns: array of posts, where image links are found in post.data.url
// Loops through search queries, with each iteration applying the ID of the last post
// to getRedditQuery to search for posts following that last post until the count is met
// CURRENTLY NOT WORKING DUE TO CORS POLICY. SEE NOTES ON 'getRedditQuery()'
// DO NOT USE, USELESS OVERHEAD. Instead use getRedditQuery([subreddits],'')
export async function getRedditImages(query, count) {
    try {

        let results = [];
        let lastItem = "";
        while(results.length < count){
            const tempQuery = await getRedditQuery(query, lastItem);
            if (!tempQuery.length){
                console.error("fetch failed, exiting with partial image array");
                break;
            }
            results = results.concat(tempQuery);
            lastItem = results[results.length - 1].data.id;
            console.log('Last Item:',lastItem);
        }
        return results.slice(0,count);
    } catch (err) {

    }
};