console.log(chrome);
console.log("I'm debugging");

let userActivityLog = [];

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    var domain = url.split('/')[2];
    console.log("Current page: " + url);
    console.log("Current domain: " + domain);

    // webNav code - ie anything happening within the tab itself
    chrome.webNavigation.onBeforeNavigate.addListener(function() {
        console.log("navigation detected")
        url = tab.url;
        userActivityLog.push("navigating away from: " + url); // push some data into array
    });

    chrome.webNavigation.onCommitted.addListener(function() {
        console.log("commit detected");
        url = tab.url;
        userActivityLog.push("successfully navigated away from: " + url);
    });

    chrome.webNavigation.onDOMContentLoaded.addListener(function() {
        console.log("dom content loaded");
        url = tab.url;
        userActivityLog.push(url + "'s dom loaded");
    }); // console always displays beforenav, oncommit, domcontent in that
    // order is that because of the way i coded it

    chrome.webNavigation.onCompleted.addListener(function(timeStamp) {
        console.log("smth completed?"); // doc + all referred resources comp loaded + initalized
        // url = tab.url;
        console.log(url);
        userActivityLog.push("smth completed at: " + url);
    });
});