console.log(chrome);
console.log("I'm debugging");

var userActivityLog = [];
var blacklistedURLs = ["https://www.youtube.com/"];
var timeStamps = [];

var isBlackListed = false;
var isCommitted = false;
var startTimeStamp;
var oldURL;
var calculation;

// A way to check if user actually changed the page:
//      check if they committed something
//      AND if a new page completely loaded onCompleted

// Scenario: blacklisted site --> notblacklisted site
// on YouTube
//      isBlacklisted = true
// go to Reddit
//      would go into for loop
//      would go into else statement
//      would change isBlacklisted to false
//      if isBlacklisted is true, then take next URL and compare it to old URL
//          if same, then do nothing
//          if different, then take timeStamp
//          and do calculation

// Listens for whenever a page is fully loaded.
chrome.webNavigation.onCompleted.addListener(
    // take the timestamp of when a relevant page is fully loaded
    (details) => {
        console.log("onCompleted URL: " + details.url);

        // Compares current URL to any of the blacklistedURLs
        for (let i = 0; i < blacklistedURLs.length; i++)
        {
            if (details.url == blacklistedURLs[i]) {
                console.log("This URL is blacklisted!");

                isBlackListed = true;
                oldURL = details.url;
                startTimeStamp = details.timeStamp;

                console.log("startTimeStamp: " + startTimeStamp);
            } else {
                console.log("This URL is not blacklisted!");

                if (isBlackListed) {
                    if (oldURL != details.url) {
                        console.log("endTimeStamp: " + details.timeStamp);
                        calculated = details.timeStamp - startTimeStamp;

                        console.log("calculated: " + calculated);
                    }
                }
            }
        }
    }
);



// // Listens for whenever a page is fully loaded.
// chrome.webNavigation.onCompleted.addListener(
//     // take the timestamp of when a relevant page is fully loaded
//     (details) => {
//         console.log("onCompleted URL: " + details.url)
//         // console.log("onCompleted time: " + details.timeStamp);

//         for (let i = 0; i < blacklistedURLs.length; i++) {

//             console.log("in for loop, on " + i + "th iteration");
//             console.log("blacklistedURL[" + i + "]:" + blacklistedURLs[i]);
//             if (details.url == blacklistedURLs[i]) {
//                 console.log("in the if statement");
//                 console.log("onCompleted timeStamp: " + details.timeStamp);
//                 onBlackListedURL = details.url;
//                 onBlackListedStart = details.timeStamp;
//             } else {
//                 console.log("in the else statement");
//                 console.log("onCompleted not timeStamp: " + details.timeStamp);
//             }
//         }


//     }
// );

/* Gets all tabs that have the specified properties, or all tabs if no properties are specified. */
// chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     var tab = tabs[0]; // a list of the different active tabs
//     var url = tab.url;
//     var domain = url.split('/')[2];

//     console.log("Current page: " + url);

//     // *** If-statement here to check if the url is a blacklisted url"
//     for (let i = 0; i < blacklistedURLs.length; i++)
//     {
//         if (url == blacklistedURLs[i])
//         {
//             console.log("url is blacklisted");
//         }
//     }

//     // console.log("Current domain: " + domain);

//     // userActivityLog.push(url);

//     // for (let i = 0; i < userActivityLog.length; i++) {
//     //     console.log(userActivityLog[i]);
//     // };

//     // If relevant URL, then take time of when it's completed.

//     // chrome.webNavigation.onBeforeNavigate.addListener(
//     //     (details) => { 
//     //         // take the timestamp of when the tab is switches
//     //         console.log("onBeforeNavigate URL: " + details.url)
//     //         console.log("onBeforeNavigate URL: " + details.timeStamp);
//     //     }
//     // );

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, Tab) => {
//     console.log("tab was updated!");
//     console.log(Tab.url);
// });

// chrome.tabs.addEventListener("DOMContentLoaded", () => {
//     const start = new Date().getTime();
//     window.addEventListener("beforeunload", () => {
//         const end = new Date().getTime();
//         const totalTime = (end - start) / 1000
    
//         console.log(totalTime)
//     });
// });
// })

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    var domain = url.split('/')[2];
    console.log("Current page: " + url);
    console.log("Current domain: " + domain);

    // webNav code - ie anything happening within the tab itself
    // chrome.webNavigation.onBeforeNavigate.addListener(function() {
    //     console.log("navigation detected")
    //     url = tab.url;
    //     userActivityLog.push("navigating away from: " + url); // push some data into array

    // });

    chrome.webNavigation.onCommitted.addListener(function() {
        console.log("commit detected");
        url = tab.url;
        userActivityLog.push("successfully navigated away from: " + url);
    });

    // chrome.webNavigation.onDOMContentLoaded.addListener(function() {
    //     console.log("dom content loaded");
    //     url = tab.url;
    //     userActivityLog.push(url + "'s dom loaded");
    // }); // console always displays beforenav, oncommit, domcontent in that
    // // order is that because of the way i coded it

    // chrome.webNavigation.onCompleted.addListener((details) => {
    //     console.log("smth completed?"); // doc + all referred resources comp loaded + initalized
    //     console.log(details.url);
    //     userActivityLog.push("smth completed at: " + details.url);
    // });

    // // trying stuff !
    // chrome.tabs.onUpdated.addListener(() => {
    //     console.log("tab was updated!");
    // });

    console.log("after listeners: " + url);
});