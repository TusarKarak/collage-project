//console.log("gardensolution");
let items=[];
setInterval(()=>{
  let s=document.getElementById("banner").src;
  s=s.split("/")[4]
  if(s==="banner.jpg"){
    document.getElementById("banner").src="project gardensolution/banner2.jpg";
  }
  else if(s==="banner1.jpg"){
    document.getElementById("banner").src="project gardensolution/banner.jpg";
  }
  else{
    document.getElementById("banner").src="project gardensolution/banner1.jpg";
  }
},3000)

onLoad();
function onLoad(){
 fetch('http://localhost:5000/allnurserys', {
    method: 'GET',
  }).then(r=>r.json()).then(data=>{
    console.log(data);   
    items=data;
    displayItemOnHomePage();
  });
}



function  displayItemOnHomePage(){
let itemcontainerElement=document.querySelector('.items-container');
let innerHTML='';
items.forEach(item=>{
  innerHTML+=`<div onclick="setnursery('${item.nursery}')" class="item-container">
        <img class="item-image" src="${item.url}" alt="item image">
        <div class="nursery-name">${item.nursery}</div></div>`       
});

itemcontainerElement.innerHTML=innerHTML;
}
function setnursery(nursery){
  localStorage.setItem("nursery",nursery);
  window.location.replace("nursery.html")
}