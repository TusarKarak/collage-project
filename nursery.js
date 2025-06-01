console.log("nursery");
let bagItems=[];
let wishItems=[];
let items=[]
let wish=[];
onLoad();
async function onLoad(){
    await fetch('http://localhost:5000/nursery', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }).then(r=>r.json()).then(data=>{
    items=data;
    //console.log(typeof(items[0]._id),"abc")   
  });
  console.log("abcd")   
  await fetch(`http://localhost:5000/add/wise/${localStorage.getItem("token")}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }).then(r=>r.json()).then(data=>{
    wish=data;
    console.log(wish,"abc")   
  });
 displayItemOnHomePage();
displayItemOnHomePage();
displayBagIcon();
}

function addToBag(itemId){
  if(localStorage.getItem('token')){
  if(!bagItems.includes(itemId)){
    bagItems.push(itemId);
  }
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  displayBagIcon();
}
else{
  window.location.replace('http://127.0.0.1:3000/profile/profile.html')

}
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
async function addToWish(itemId){
  console.log(document.getElementById(itemId).style.fill)
  if(document.getElementById(`${itemId}`).style.fill=="red"){
  document.getElementById(`${itemId}`).style.fill="lightgray";
}
else{
 document.getElementById(`${itemId}`).style.fill="red";
}
const res = await fetch('http://localhost:5000/add/wise', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          id:itemId
        })
      });
}

function  displayItemOnHomePage(){
let itemcontainerElement=document.querySelector('.items-container');
let innerHTML='';
items.forEach(item=>{
  innerHTML+=`<div class="item-container">
        <img class="item-image" src="${item.image}" alt="item image">
        <svg  xmlns="http://www.w3.org/2000/svg"  class="addwishlist" width="28" height="28" viewBox="0 0 20 16"><path id="${item._id}"onclick="addToWish('${item._id}')"  d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z" class="x1UMqG" stroke="#FFf" fill-rule="evenodd" opacity=".9" 
        style="fill:${wish.includes(item._id)?"red":"lightgray"}"></path></svg>
        <div class="nursery-name">${item.nursery}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
          <span class="current-price">Rs ${item.original_price-(item.discount_percentage*item.original_price/100)}</span>
              <span class="original-price">Rs ${item.original_price}</span>
              <span class="discount">(${item.discount_percentage}% OFF)</span>
        </div>
        <button type="button" class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
      </div>`
});

itemcontainerElement.innerHTML=innerHTML;
}