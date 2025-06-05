if(!localStorage.getItem('token')){
  window.location.replace("/profile/profile.html")
  localStorage.setItem('path',window.location.href);
}
else{let wishItems;
const CONVENIENCE_FEES = 40;
let bagItemObjects=[];
onLoad();

async function onLoad() {
  await fetch(`http://localhost:5000/baglist/${localStorage.getItem("token")}`).then(r=>r.json()).then(data=>{
    bagItemObjects=data.allBagData;
    bagItems=bagItemObjects.length;
    wishItems=data.wishItems
    console.log(data)
    
    //loadBagItemObjects(); 
    displayBagItems();
    displayBagSummary();
  });
}

function displayBagSummary() {
  let bagSummaryElement = document.querySelector('.bag-summary');
  let totalItem = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemObjects.forEach(bagItem => {
    totalMRP += bagItem.original_price;
    totalDiscount +=bagItem.discount_percentage*bagItem.original_price/100;
  });

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;
  

  bagSummaryElement.innerHTML = `
    <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">₹${totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">₹40</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">₹${finalPayment}</span>
    </div>
  </div>
  <a href=${totalMRP==0?"#":"location.html"} onclick='storeMRP(${finalPayment})' class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </a>
  `;
}

function storeMRP(totalMRP){
  localStorage.setItem("totalMRP",totalMRP);
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
 async function deleteItem(){

    await fetch('http://localhost:5000/baglist/delete', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          id:itemId
        })
      }).then(r=>r.json()).then(data=>{
        console.log(data,"agsda")
        bagItems=data
      onLoad();
      displayBagIcon();
      })
      displayBagItems();
      displayBagSummary();
    }
    deleteItem();
}

function generateItemHTML(item) {
  let date=new Date();
      let day=date.getDate()+5;
      let month=date.getMonth()+1;
      let year=date.getFullYear();
      date=new Date(year+"-"+month+"-"+day).toDateString()
      let newDate=String(date)
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
      <div class="return-period">
        <span class="return-period-days">${item.return_period}</span>
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${newDate}</span>
      </div>
    </div>

    <div class="remove-from-cart" onclick="removeFromBag('${item.id}')">X</div>
  </div>`;
}

}