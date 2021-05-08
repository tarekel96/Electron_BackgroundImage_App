

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

// Usage: getRedditImages([array of search terms])
// returns: array of posts, where image links are found in post.data.url
export async function getRedditImages(query) {
    const url = `https://www.reddit.com/r/${query.join("+")}.json`;
    console.log(url);
    try {
        const result = await
        fetch(url)
        .then(res => {
            if (!res.ok) {
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
        console.error('Error pulling images from RedditAPI',err);
        return [];
    }
};