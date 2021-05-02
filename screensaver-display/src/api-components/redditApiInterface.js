

// Usage: getSubreddits({search query, results limit})
export function getSubreddits(query, limit) {

    fetch(`http://www.reddit.com/subreddits/search.json?q=${query}&limit=${limit}`)
    .then((response) => {
        if (!response.ok) {
            throw Error("Error");
        }
        return response.json();
    })
    .then(data => {
        console.log(data.data.children);
        return data.data.children;
    });
};

export function getRedditImages() {
    return;
};