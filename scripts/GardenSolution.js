console.log("gardensolution");
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
let bagItems=[];

onLoad();
function onLoad(){
 let bagItemStr=bagItems=localStorage.getItem('bagItems'); 
 bagItems=bagItemStr ? JSON.parse(bagItemStr):[];
 displayItemOnHomePage();
displayItemOnHomePage();
displayBagIcon();
}

function addToBag(itemId){
  bagItems.push(itemId);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  displayBagIcon();
}

function displayBagIcon(){
  let bagItemCountElement=document.querySelector('.bag-item-count');
  if(bagItems.length>0){
    bagItemCountElement.style.visibility='visible';  
  bagItemCountElement.innerText=bagItems.length;
  }
  else{
    bagItemCountElement.style.visibility='hidden';
  }
}

function  displayItemOnHomePage(){
let itemcontainerElement=document.querySelector('.items-container');
let innerHTML='';
items.forEach(item=>{
  innerHTML+=`<a href="nursery.html" class="item-container">
        <img class="item-image" src="${item.image}" alt="item image">
        <div class="nursery-name">${item.nursery}</div>`       
});

itemcontainerElement.innerHTML=innerHTML;
}