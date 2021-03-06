/*jslint node:true*/
var main_getter = (function () {
    "use strict";

    var https = require('https'),
        electron = require('electron'),
        
        subreddit_url,
        time_to_check = 60 * 1000,
        last_post,
        watch_interval;

    function startWatch(params) {
        if (!params) { return; }
        if (!params.subreddit) { return; }
        if (params.time > 0) { time_to_check = params.time * 1000; }
        subreddit_url = "https://www.reddit.com/r/" + params.subreddit + "/new.json";
        watchUrl();
        watch_interval = setInterval(watchUrl, time_to_check);
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
        var post_data = {
            title: post.data.title,
            flair: post.data.link_flair_text,
            url: post.data.url,
            image: post.data.thumbnail
        };
        if (last_post && last_post.title === post_data.title) { return; }
        last_post = post_data;
        main_getter.emit('open_notification', {params: post_data});
    }

    return {
        startWatch: function(params) {
            startWatch(params);
        },
        stopWatch: function() {
            clearInterval(watch_interval);
            watch_interval = null;
            last_post = null;
        }
    };
}());

module.exports = require('./main_events').expand(main_getter);
