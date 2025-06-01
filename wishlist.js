if(!localStorage.getItem('token')){
  window.location.replace("/profile/profile.html")
  localStorage.setItem('path',window.location.href);
}
else{
let bagItemObjects;
onLoad();

function onLoad() {
  loadBagItemObjects();
  displayBagItems();
}


function loadBagItemObjects() {
  bagItemObjects = wishItems
.map(itemId => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
      else if(itemId== items3[i].id){
        return items3[i];
      }
    }
  });
  //console.log(bagItemObjects);
}

function displayBagItems() {
  let containerElement = document.querySelector('.bag-items-container');
  let innerHTML = '';
  bagItemObjects.forEach(bagItem => {
    innerHTML += generateItemHTML(bagItem);
  });
  containerElement.innerHTML = innerHTML;
}

function removeFromBag(itemId) {
  wishItems
 = wishItems
.filter(bagItemId => bagItemId != itemId);
  localStorage.setItem('wishItems', JSON.stringify(wishItems
));
  loadBagItemObjects();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
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

    <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
  </div>`;
}
}