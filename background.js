console.log(chrome);
console.log("I;m debugging");

let userActivityLog = [];

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    var domain = url.split('/')[2];
    console.log("Current page: " + url);
    console.log("Current domain: " + domain);
  