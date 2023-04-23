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

                if (isBlackListed && (details.frameId == 0)) {
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
