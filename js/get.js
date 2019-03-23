var request;
var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB;
if(!idb in window){
  alert("Browser is not suppoted,sorry");
}
var open=idb.open("StoreData",1);
console.log("Indexed Database is created");
open.onupgradeneeded=function(event)
{
var request=event.target.result;
request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}
open.onerror=function(error){
  console.log("Sorry, you did a mistake",+error);
}
open.onsuccess=function(event){
  request=event.target.result;
  var transaction=request.transaction("Formdata","readwrite");
  var storeDB=transaction.objectStore("Formdata");
  var finalData=storeDB.getAll();
  finalData.onsuccess=function(event){
    var result=event.target.result;
    console.log(result);
    display(event.target.result);
  }
}
function display(data){
  var parent=document.querySelector(".parent");
  for(var i=0; i < data.length; i++){
    var child=document.createElement("div");
    child.classList.add("child");
  var image=document.createElement("img");
  image.src="image/149067.svg";
  image.alt=data[i].name;
  var career=document.createElement("h2");
  career.textContent=data[i].career;
  var name=document.createElement("h2");
  name.textContent=data[i].name;
  var email=document.createElement("h2");
  email.textContent=data[i].email;
  var link=document.createElement("a");
  link.href="resume.html?id="+data[i].id;
  link.textContent="view profile";
  child.append(image);
  child.append(career);
  child.append(name);
  child.append(email);
  child.append(link);
  parent.append(child);
}
}
