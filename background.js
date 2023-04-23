console.log(chrome);
console.log("I'm debugging");

var userActivityLog = [];
var timeStamps = [];

// Notes
// ===================
// Tabs vs. WebNavigation
// tabs = all tabs
// webnavigation = within tab
//      onBeforeNavigate: when you press return key to navigate away
//          - Fired when a navigation is about to occur.
//          - **** USE TIMESTAMP
//      onCommitted: when the page loads
//          - Fired when a navigation is committed. The document 
//            (and the resources it refers to, such as images and 
//            subframes) might still be downloading, but at least 
//            part of the document has been received from the server 
//            and the browser has decided to switch to the new document.
//      onDOMContentLoaded: when content loads
//          - Fired when the page's DOM is fully constructed, but the 
//            referenced resources may not finish loading.
//      onCompleted: when everything is done
//          - Fired when a document, including the resources it refers 
//            to, is completely loaded and initialized.
//          - **** USE TIMESTAMP
// active tabs = tab currently on

// Scenario
// user is on google.com
// about to switch to bing.com which they have listed
// after hitting return and page loads, then we have time from onCompleted
// switch back to google.com, then we have time from onBeforeNavigate 


// Have conditional statement to check if user is on a relevant website 
// all relevant websites stored in an array

// calculate time stamp by onCompleted timestamp - onBeforeNavigate timestamp

/* Gets all tabs that have the specified properties, or all tabs if no properties are specified. */
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tab = tabs[0]; // a list of the different active tabs
    var url = tab.url;
    var domain = url.split('/')[2];

    // note: Might say that this code only works on one window
    // for (let i = 0; i < tabs.length; i++) {
    //     console.log("All tabs: " + tabs[i].url);
    // };

    console.log("Current page: " + url);
    // console.log("Current domain: " + domain);

    // userActivityLog.push(url);

    // for (let i = 0; i < userActivityLog.length; i++) {
    //     console.log(userActivityLog[i]);
    // };

    chrome.webNavigation.onCompleted.addListener(function() {
        // take the timestamp of when a relevant page is fully loaded
        console.log("onComplete, loaded new page");
    });

    chrome.webNavigation.onBeforeNavigate.addListener(function() {
        // take the timestamp of when the tab is switches
        console.log("onBeforeNavigate, about to switch to new page")
    });
})
