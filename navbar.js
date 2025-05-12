document.getElementById('navbar').innerHTML=`<div class="logo-container">
      <a href="#"><img class="Garden_home" src="project gardensolution/GardenSolutionlogo1.png" alt=""></a>
    </div>
    <nav class="nav_bar">
      <div>
        <a class="navitem">
          Plants
        </a>
          <div class="plantbox">
            <a class="plantitem" href="plants.html">Indoor Plant</a>
            <div></div>
            <a class="plantitem" href="plants.html">Outdoor Plant</a>
          </div>
      </div>
      <div>
        <a class="navitem" href="#">Seeds</a>
      </div>
      <div>
        <a class="navitem" href="#">Gifts Plants</a>
      </div>
      <div>
        <a class="navitem" href="#">Gardening</a>
      </div>
      <div>
        <a class="navitem">Pots</a>
        <div class="potbox">
          <a class="potitem" href="pots.html">Big Pot</a>
          <div></div>
          <a class="potitem" href="pots.html">Small Pot</a>
        </div>
      </div>
      <div>
        <a class="navitem" href="#">Offers</a>
      </div>
    </nav>
    <div class="search_bar">
      <span class="material-symbols-outlined search_icon">search</span>
      <input class="search_input" placeholder="Search for plants">
    </div>
    <div class="action_bar">
      <a id="profile" href="profile/profile.html" class="action_container" onclick="changePath()">
          <span class="material-symbols-outlined action_icon">
              person
              </span>
        <span class="action_name" id="profileText">Profile</span>
            </a>
      <a href="wishlist.html" class="action_container">
              <span class="material-symbols-outlined action_icon">
                  favorite
                  </span>
         <span   class="action_name">Wishlist</span>
                </a>
      <a class="action_container" href="bag.html">
              <span class="material-symbols-outlined action_icon">
                  shopping_bag
                  </span>
        <span class="action_name">Bag</span>
          <span class="bag-item-count">0</span>
        </a>
   </div>`

   if(localStorage.getItem('token'))
    document.getElementById("profileText").innerText='LogOut'
    localStorage.setItem('path',window.location.href);
    function changePath(){
      if(localStorage.getItem('token')){
      document.getElementById('profile').href=localStorage.getItem('path')
      localStorage.removeItem('token')
      }
    }