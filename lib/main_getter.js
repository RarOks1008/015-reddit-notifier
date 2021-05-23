/*jslint node:true*/
var main_getter = (function () {
    "use strict";

    const https = require('https'),
        electron = require('electron');

    var subreddit_url,
        time_to_check = 60 * 1000,
        last_post;

    function startWatch(params) {
        if (!params) { return; }
        if (!params.subreddit) { return; }
        subreddit_url = "https://www.reddit.com/r/" + params.subreddit + "/new.json";
        watchUrl();
        setInterval(watchUrl, time_to_check);
    }
    
    function watchUrl() {
        https.get(subreddit_url, function(res) {
            var result_data = "";

            res.on("data", function(chunk) {
                result_data += chunk;
            });

            res.on("end", function() {
                try {
                    var posts_data = JSON.parse(result_data);
                    if (!posts_data) { return; }
                    if (!posts_data.data) { return; }
                    if (!posts_data.data.children) { return; }
                    checkLastPost(posts_data.data.children[0]);
                } catch (error) {
                    electron.app.quit();
                };
            });

        }).on("error", () => {
            electron.app.quit();
        });
    }

    function checkLastPost(post) {
        if (!post) { return; }
        if (!post.data) { return; }
        if (!post.data.title) { return; }
        if (!post.data.url) { return; }
        console.log(post.data.title);
        console.log(post.data.link_flair_text);
        console.log(post.data.url);
        console.log(post.data.thumbnail);
    }

    return {
        startWatch: function (params) {
            startWatch(params);
        },
    };
}());

module.exports = main_getter;
