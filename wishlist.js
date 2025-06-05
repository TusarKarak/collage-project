if(!localStorage.getItem('token')){
  localStorage.setItem('path',window.location.href);
  window.location.replace("/profile/profile.html")
}
else{
  
let bagItemObjects=[];
onLoad();

async function onLoad() {
  await fetch(`http://localhost:5000/wishlist/${localStorage.getItem("token")}`).then(r=>r.json()).then(data=>{
    bagItemObjects=data.allWishData;
    wishItems=bagItemObjects.length;
    bagItems=data.bagItems
    console.log(data)
    
  });
<<<<<<< HEAD
  displayBagItems();

  }

=======
  //console.log(bagItemObjects);
}
>>>>>>> a9e76b14fb723ee31a9364a796c16a8b2a108be3

function displayBagItems() {
  let containerElement = document.querySelector('.bag-items-container');
  let innerHTML = '';
  bagItemObjects.forEach(bagItem => {
    innerHTML += generateItemHTML(bagItem);
  });
  containerElement.innerHTML = innerHTML;
}

function removeFromWish(itemId) {
  async function deleteItem(){
    if(localStorage.getItem("token"))
    await fetch('http://localhost:5000/wishlist/delete', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          id:itemId
        })
      }).then(r=>r.json()).then(data=>{
        console.log(data,"agsda")
        wishItems=data
      onLoad();
      displayWishIcon();
      })
  }
      deleteItem();
  //loadBagItemObjects();
}

function generateItemHTML(item) {
  return `<div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="${item.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.nursery}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs ${item.original_price-(item.discount_percentage*item.original_price/100)}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
      </div>
    </div>

    <div class="remove-from-cart" onclick="removeFromWish('${item.id}')">X</div>
  </div>`;
}

}