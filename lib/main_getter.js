/*jslint node:true*/
var main_getter = (function () {
    "use strict";

    var https = require('https'),
        electron = require('electron'),

        main_window = require('./main_window'),
        
        subreddit_url,
        time_to_check = 60 * 1000,
        last_post,
        posts_pending = [];

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
        var post_data = {
            title: post.data.title,
            flair: post.data.link_flair_text,
            url: post.data.url,
            image: post.data.thumbnail
        };
        if (last_post && last_post.title === post_data.title) { return; }
        if (main_window.existsWindow('notification')) {
            var pending_exists = false;
            posts_pending.forEach(function(postp) {
                if (postp.title === post_data.title) {
                    postp.flair = post_data.flair;
                    pending_exists = true;
                }
            });
            if (pending_exists) { return; }
            posts_pending.push(pending_exists);
            return;
        }
        last_post = post_data;
        console.log("pre svega mora sad da se sredi da options window ode u tray i da se ne gasi app kad je u tray-u.")
        console.log("ovde treba sad otvoriti nov notification window i poslati mu ovu datu.");
    }

    return {
        startWatch: function (params) {
            startWatch(params);
        },
    };
}());

module.exports = main_getter;
