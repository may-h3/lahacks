/*
document.querySelector('#testerButton').onclick = () => {
    chrome.storage.sync.set({autofill: 'foo'}, () => {
      chrome.tabs.create({url: 'https://www.google.com'});
    });
}
*/
//onloadRetriveData();

listAllItems();

//validate - existing websites?
let websiteForm = document.getElementById('websiteForm');
websiteForm.addEventListener('submit', (event) => {
    let websiteURL = websiteForm.elements['websiteURL'].value;
    localStorage.setItem(websiteURL, '1');
    clearAllItems();
    listAllItems();
    event.preventDefault();
    alert(`Added ${websiteURL}.`);
    document.getElementById("websiteForm").reset();
});

let clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', (deleteItems));

function deleteItems() {
    localStorage.clear();
    clearAllItems();
}

function listAllItems(){  
    var items = [];
    for (i=0; i<localStorage.length; i++)  
    {  
        key = localStorage.key(i);
        items.push(key);
        //alert(localStorage.getItem(key));
    }
    
    let ul = document.createElement('ul');
    let li = document.createElement('li');
    document.querySelector("#myList").appendChild(ul);
        
    items.forEach((item) => {
        li.innerHTML += item;
        ul.appendChild(li);
        li = document.createElement('li');
    });
}

function clearAllItems()
{
    var ul = document.getElementById("myList");
    while(ul.firstChild) ul.removeChild(ul.firstChild);
}

/*
var items = [], keys = Object.keys(localStorage), i = 0, key;
for (; k = keys[i]; i++)
{
    items.push(key + '=' + localStorage.getItem(key));
}
while (i--) { items.push(localStorage.getItem(keys[i])); }

let it = ["Ram", "Shyam", "Sita", "Gita"];
let ul = document.createElement('ul');
let li = document.createElement('li');
document.querySelector("#myList").appendChild(ul);
     
items.forEach((item) => {
    li.innerHTML += item;
    ul.appendChild(li);
    li = document.createElement('li');
});
*/

/*var hiddenP = document.getElementById('myList');
var ul = document.createElement('ul');

function onloadRetriveData() {
  //check the length 
  var length = localStorage.length;
  var storedValues = [];
  console.log(length);
  var x;
  for (x = 1; x <= length; x++) {
    var li = document.createElement('li');
    var textContent = document.createTextNode(window.localStorage.getItem('savedValues' + x));
    li.appendChild(textContent);
    ul.appendChild(li);
  } 
  hiddenP.appendChild(ul);
}*/

/*
function store(){ //stores items in the localStorage
    var brand = document.getElementById('carBrand').value;
    var price = document.getElementById('carPrice').value;
    var key = document.getElementById('key').value;

    const car = {
        brand: brand,
        price: price,
    }

    window.localStorage.setItem(key,JSON.stringify(car));  
    //converting object to string
}

function retrieveRecords(){ //retrieves items in the localStorage
    var key = document.getElementById('retrieveKey').value; //gets key from user
    console.log("retrive records");
    var records = window.localStorage.getItem(key); //searches for the key in localStorage
    var paragraph = document.createElement("p");
    var infor = document.createTextNode(records);
    paragraph.appendChild(infor);
    var element = document.getElementById("retrieve");
    element.appendChild(paragraph);
}

function removeItem(){ //deletes item from localStorage
    var key = document.getElementById('removeKey').value; //gets key from user
    localStorage.removeItem(key) //passes key to the removeItem method
    console.log("remove items");
}

function clearStorage(){ //clears the entire localStorage
    localStorage.clear()
    console.log("clear records");
}

window.onload =function(){ //ensures the page is loaded before functions are executed.
    document.getElementById("carForm").onsubmit = store
    document.getElementById("clearButton").onclick = clearStorage
    document.getElementById("removeButton").onclick = removeItem
    document.getElementById("retrieveButton").onclick = retrieveRecords
}
*/