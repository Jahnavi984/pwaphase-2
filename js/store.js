function addData(){
var career=document.querySelector("#career").value;
var name=document.querySelector("#name").value;
var email=document.querySelector("#email").value;
var role=document.querySelector("#role").value;
var phoneno=document.querySelector("#phoneno").value;
//Graduation details
var degree1=document.querySelector("#degree1").value;
var branch1=document.querySelector("#branch1").value;
var college1=document.querySelector("#college1").value;
var percent1=document.querySelector("#percent1").value;
//Intermediate details
var degree2=document.querySelector("#degree2").value;
var branch2=document.querySelector("#branch2").value;
var college2=document.querySelector("#college2").value;
var percent2=document.querySelector("#percent2").value;
//S.S.C
var college3=document.querySelector("#college3").value;
var degree3=document.querySelector("#degree3").value;
var percent3=document.querySelector("#percent3").value;
//Technical skills
var skills=document.querySelector("#skills").value;
// IndexedDB creation
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
  storeDB.put({
    career:career,
    name:name,
    email:email,
    role:role,
    phoneno:phoneno,
    education:[
  {
    degree:degree1,
    branch:branch1,
    college:college1,
    percent:percent1
  },
  {
    degree:degree2,
    branch:branch2,
    college:college2,
    percent:percent2
  },
  {
  degree:degree3,
  branch:"",
  college:college3,
  percent:percent3,
}
],
skills:skills
});
window.open("index.html");
}
}
