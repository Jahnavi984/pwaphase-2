var param;
var paramValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query){
  param=query[i].split("=");
  paramValue=parseInt(param[1]);
}
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
  var info=storeDB.get(paramValue);
  info.onsuccess=function(data){
    console.log(data.target.result);
    display(data.target.result);
  }
}
var main=document.querySelector(".main");
var left=document.querySelector(".left");
var right=document.querySelector(".right");
function display(data)
{
  var img=document.createElement("img");
  img.src="image/149067.svg";
  left.append(img);
  main.appendChild(left);
  var h3=document.createElement("h3");
  h3.textContent=data.name;
  left.append(h3);
  main.appendChild(left);
  var h4=document.createElement("h6");
  h4.textContent=data.email;
  left.append(h4);
  main.appendChild(left);
  var h5=document.createElement("h5");
  h5.textContent=data.role;
  left.append(h5);
    main.appendChild(left);
  // right-div
  var r=document.createElement("h2");
  r.textContent="CAREER OBJECTIVE";
  right.append(r);
    main.appendChild(right);
  var pc=document.createElement("p");
  pc.textContent=data.career;
  right.append(pc);
  main.appendChild(right);
  var head1=document.createElement("h2");
  head1.textContent="EDUCATIONAL DETAILS";
  right.append(head1);
  main.appendChild(right);
  var table=document.createElement("table");
  let row='';
  row+="<tr>"+"<th>"+"degree"+"</th>"+"<th>"+"branch"+"</th>"+"<th>"+"college"+"</th>"+"<th>"+"percent"+"</th>"+"</tr>";
  for(i in data.education){
  row+="<tr>"+"<td>"+data.education[i].degree+"</td>"+"<td>"+data.education[i].branch+"</td>"+"<td>"+data.education[i].college+"</td>"+"<td>"+data.education[i].percent+"</td>"+"</tr>";
}
table.innerHTML=row;
right.appendChild(table);
main.appendChild(right);
}
