
let bagItems=[];
let wishItems=[];

onLoad();
function onLoad(){
 let bagItemStr=bagItems=localStorage.getItem('bagItems'); 
 bagItems=bagItemStr ? JSON.parse(bagItemStr):[];
 let wishItemStr=wishItems=localStorage.getItem('wishItems'); 
 wishItems=wishItemStr ? JSON.parse(wishItemStr):[];
 displayItemOnHomePage();
displayItemOnHomePage();
displayBagIcon();
}

function addToBag(itemId){
  if(!bagItems.includes(itemId)){
    bagItems.push(itemId);
  }
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

function addToWish(itemId){
  console.log(itemId)
  document.getElementById(`id${itemId}`).style.fill="red"
  if(!wishItems.includes(itemId)){
    wishItems.push(itemId);
  }
  localStorage.setItem('wishItems',JSON.stringify(wishItems));
}

function  displayItemOnHomePage(){
let itemcontainerElement=document.querySelector('.items-container');

// let item={
//   item_image:'project gardensolution/image/Catagories/1.jpg',
//   rating:{
//     stars:4.5,
//     noOfReviews:1400,
//   },
//   nursery_name:'Abcd',
//   item_name:'Mango Plants',
//   current_price:606,
//   original_price:1045,
//   discount_percentage:42,
// }
let innerHTML='';
items2.forEach(item=>{
  innerHTML+=`<div href="plants.html" class="item-container">
        <img class="item-image" src="${item.image}" alt="item image">
         <svg  xmlns="http://www.w3.org/2000/svg" id="id${Number(item.id)}" class="addwishlist" width="28" height="28" viewBox="0 0 20 16"><path onclick="addToWish(${item.id})"  d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z" class="x1UMqG" stroke="#FFF" fill-rule="evenodd" opacity=".9"></path></svg>
        <div class="nursery-name">${item.nursery}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
          <span class="current-price">Rs ${item.original_price-(item.discount_percentage*item.original_price/100)}</span>
              <span class="original-price">Rs ${item.original_price}</span>
              <span class="discount">(${item.discount_percentage}% OFF)</span>
        </div>
        <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
      </div>`
});

itemcontainerElement.innerHTML=innerHTML;
}