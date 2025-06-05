let bagItems;
let wishItems;
document.getElementById('navbar').innerHTML=`<div class="logo-container">
<a href="GardenSolution.html"><img class="Garden_home" src="project gardensolution/GardenSolutionlogo1.png" alt=""></a>
    </div>
    <nav class="nav_bar">
      <div>
        <a class="navitem">
          Plants
        </a>
          <div class="plantbox" >
            <div class="plantitem"  onclick="indoorplant()">Indoor Plant</div>
            <span></span>
            <div class="plantitem"   onclick="outdoorplant()">Outdoor Plant</div>
          </div>
      </div>
      <!--<div>
         <a class="navitem" href="#">Seeds</a>
       </div>-->
      <div>
        <a class="navitem" href="gifts.html">Gifts Plants</a>
      </div>
      <!--<div>
        <a class="navitem" href="#">Gardening</a>
      </div>-->
      <div>
        <a class="navitem">Pots</a>
        <div class="potbox">
          <div class="potitem" onclick="bigpot()">Big Pot</div>
          <span></span>
          <div class="potitem"  onclick="smallpot()">Small Pot</div>
        </div>
      </div>
      <div>
        <a class="navitem">Season</a>
        <div class="seasonbox">
          <div class="seasonitem" onclick="seasonflower()">Flower</div>
          <span></span>
          <div class="seasonitem" onclick="seasonfruit()">Fruit</div>
        </div>
      </div>
      <div>
        <a class="navitem" href="#">Offers</a>
      </div>
    </nav>
    <div class="search_bar">
      <span class="material-symbols-outlined search_icon">search</span>
      <input id="searchPlant" class="search_input" placeholder="Search for plants">
    </div>
    <div class="action_bar">
    <div>
      <div id="profile"  class="action_container">
          <span class="material-symbols-outlined action_icon">
              person
              </span>
        <span class="action_name">Profile</span>
        </div>
        <div class="profile">
          <div class="profileitem" id="profileText" onclick="logout()">LogIn</div>
          <span></span>
          <div class="profileitem"  onclick="myorder()">My Order</div>
        </div>
        </div>
      <a href="wishlist.html" class="action_container">
              <span class="material-symbols-outlined action_icon">
                  favorite
                  </span>
         <span   class="action_name">Wishlist</span>
         <span class="wish-item-count">0</span>
                </a>
      <a class="action_container" href="bag.html">
              <span class="material-symbols-outlined action_icon">
                  shopping_bag
                  </span>
        <span class="action_name">Bag</span>
          <span class="bag-item-count">0</span>
        </a>
   </div>`

document.getElementById("searchPlant").addEventListener('keyup',async ()=>{
  if(event.keyCode==13){
     
  localStorage.setItem("searchPlant",document.getElementById("searchPlant").value)
  window.location.replace("search.html")
  }
})

   if(localStorage.getItem('token')){
    document.getElementById("profileText").innerText='LogOut'
   }
    localStorage.setItem('path',window.location.href);
    function changePath(){
      if(localStorage.getItem('token')){
      document.location.href=localStorage.getItem('path')
      localStorage.removeItem('token')
    }else{
        document.location.href="profile/profile.html"

      }
    }
    function indoorplant(){
      localStorage.setItem('plants',"indoor")
      window.location.replace('plants.html')
    }
    function outdoorplant(){
      localStorage.setItem('plants',"outdoor")
      window.location.replace('plants.html')
    }
    function bigpot(){
      localStorage.setItem('pots',"bigpot")
      window.location.replace('pots.html')
    }
    function smallpot(){
      localStorage.setItem('pots',"smallpot")
      window.location.replace('pots.html')
    }
    function seasonflower(){
      localStorage.setItem('season',"flower")
      window.location.replace('seasonflower.html')
    }
    function seasonfruit(){
      localStorage.setItem('season',"fruit")
      window.location.replace('seasonflower.html')
    }
    
    function logout(){
      changePath()
    }
    
    function myorder(){
      localStorage.setItem('myorder','1')
      window.location.replace('orderlist.html')
    }
    
    function displayBagIcon(){
  let bagItemCountElement=document.querySelector('.bag-item-count');
  if(bagItems>0){
    bagItemCountElement.style.visibility='visible';  
  bagItemCountElement.innerText=bagItems;
  }
  else{
    bagItemCountElement.style.visibility='hidden';
  }
}
function displayWishIcon(){
  let bagItemCountElement=document.querySelector('.wish-item-count');
  if(wishItems>0){
    bagItemCountElement.style.visibility='visible';  
  bagItemCountElement.innerText=wishItems;
  }
  else{
    bagItemCountElement.style.visibility='hidden';
  }
}
async function get(){
if(localStorage.getItem('token')){
  await fetch(`http://localhost:5000/count/bagAndWish/${localStorage.getItem("token")}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }).then(r=>r.json()).then(data=>{
    bagItems=data.bagItems;
    wishItems=data.wishItems;
    displayBagIcon();
displayWishIcon();
  });
}
}
get()