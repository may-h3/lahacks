console.log(chrome);
console.log("I'm debugging");

var userActivityLog = new Map();
var blacklistedURLs = ["https://www.youtube.com/"];

var isBlackListed = false;
var isCommitted = false;
var startTimeStamp;
var oldURL;
var calculation;

// Listens for whenever a page is fully loaded.
chrome.webNavigation.onCompleted.addListener(
    // Takes the timestamp of when a relevant page is fully loaded
    (details) => {
        console.log("onCompleted URL: " + details.url);

        // Compares current URL to any of the blacklistedURLs
        for (let i = 0; i < blacklistedURLs.length; i++)
        {
            if (details.url == blacklistedURLs[i]) {
                console.log("This URL is blacklisted!");

                // Sets variables to keep track of data
                isBlackListed = true;
                oldURL = details.url; 
                startTimeStamp = details.timeStamp;

                console.log("startTimeStamp: " + startTimeStamp);
                console.log("isBlackListed in equals: " + isBlackListed);
            } else {
                console.log("This URL is not blacklisted!");
                console.log("isBlackListed in not equals: " + isBlackListed);

                if (isBlackListed && (details.frameId == 0)) {
                    if (oldURL != details.url) {
                        console.log("endTimeStamp: " + details.timeStamp);
                        calculated = details.timeStamp - startTimeStamp;
                        if (userActivityLog.has(oldURL))
                        {
                            userActivityLog.set(oldURL, calculated + userActivityLog.get(oldURL));
                        }
                        else
                        {
                            userActivityLog.set(oldURL, calculated);
                        }
                        isBlackListed = false;

                        console.log("calculated: " + calculated);

                        // var unit;
                        // // convert calculated time into better units
                        // if (calculated/60000 < 1) {
                        //     calculated /= 1000; // convert to seconds
                        //     unit = "seconds";
                        // } else if (calculated/3600000 < 1) {
                        //     calculated /= 60000; // convert to minutes
                        //     unit = "minutes";
                        // } else if (calculated/86400000 < 1) {
                        //     calculated /= 3600000 // convert to hours
                        //     unit = "hours";
                        // } else {
                        //     calculated /= 86400000 // convert to days
                        //     unit = "days";
                        // }

                        // console.log("calculated: " + calculated + " " + unit); // for debug
                    }
                }
            }
        }
    }
);