let deliveryLocation;
    let bagItemObjects;
    if(localStorage.getItem('token')){
   fetch(`http://localhost:5000/mylocations/${localStorage.getItem("token")}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }).then(r=>r.json()).then(data=>{
    console.log(data)
    data.forEach(item => {
      document.getElementById("locations").innerHTML+=`<div class="address-header"><input name="location" type="radio" onclick='setLocation(${JSON.stringify(item)})'/>
          <div class="info">
            <span class="name">${item.name}</span>
            <span class="tag">${item.city_district_town}</span>
            <span class="phone">${item.ph_no}</span>
          </div>
          <div class="edit-link" onclick="editData('${item._id}')">EDIT</div>
        </div>
        
        <p class="full-address">
        ${item.address}</strong>
        </p>`
    });
  });
}
async function changepath(){
  event.preventDefault();
      const data={
        id:document.getElementById("id").value,
        name:document.getElementById("name").value,
        ph_no:Number(document.getElementById("number").value),
        address:document.getElementById("Address").value,
        city_district_town:document.getElementById("City").value,
        state:document.getElementById("state").value,
        pin:Number(document.getElementById("Pincode").value),
        locality:document.getElementById("Locality").value,
        landmark:document.getElementById("landmark").value,
        alt_phno:Number(document.getElementById("alt_phno").value),
      }
      await fetch(`http://localhost:5000/mylocations/${localStorage.getItem("token")}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          data:data
        })
      }).then(r=>r.json()).then(data1=>{
        console.log(data1)
        deliveryLocation=data1;
        delivery();
      })
}
  function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

           const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    const response = fetch(url, {
      headers: {
        "User-Agent": "Node.js App"
      }
    }).then(response => response.json())
            .then(data => {
              console.log(data)
              // document.getElementById("output").innerText = `
              //   Full Address: ${data.fullAddress}
              //   Pincode: ${data.postcode}
              //   City/District/Town: ${data.city || data.town || data.village}
              //   State: ${data.state}
              // `;
              document.getElementById("Address").value=data.display_name;
              document.getElementById("Pincode").value=data.address.postcode;
              document.getElementById("City").value=data.address.city || data.address.town || data.address.village;
              document.getElementById("state").value=data.address.state;
            });
          },
          error => {
            console.error("Geolocation error:", error);
            document.getElementById("output").innerText = "Location access denied.";
          }
        );
      } else {
        document.getElementById("output").innerText = "Geolocation not supported.";
      }
    }
    function delivery(){
      if(localStorage.getItem('token')){
    fetch(`http://localhost:5000/baglist/${localStorage.getItem("token")}`).then(r=>r.json()).then(data=>{
    bagItemObjects=data.allBagData;
    if(deliveryLocation){
      deliveryLocation.items=bagItemObjects;
      deliveryLocation.price=localStorage.getItem("totalMRP");
      deliveryLocation.payment=false;
      deliveryLocation.cashOnDelivery=false;
      let date=new Date();
      let day=date.getDate()+6;
      let month=date.getMonth()+1;
      let year=date.getFullYear();
      date=new Date(year+"-"+month+"-"+day)
      deliveryLocation.deliveryDate=date;


      fetch(`http://localhost:5000/deliverylocation/${localStorage.getItem("token")}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          data:deliveryLocation
        })
      }).then(r=>r.json()).then(data=>{
        localStorage.setItem("orderId",data.orderId)
        window.location.href="/payment.html";
      })
    }
  });
}
    }
    function editData(id){
      const data=locations.filter(item=>String(item._id)==id)
      document.getElementById("id").value=data[0]._id;
      document.getElementById("Address").value=data[0].address;
         document.getElementById("Pincode").value=data[0].pin;
        document.getElementById("City").value=data[0].city_district_town;
        document.getElementById("state").value=data[0].state;
        document.getElementById("name").value=data[0].name;
        document.getElementById("number").value=String(data[0].ph_no);
        document.getElementById("Locality").value=data[0].locality;
        document.getElementById("landmark").value=data[0].landmark;
        document.getElementById("alt_phno").value=String(data[0].alt_phno);
    }
    function setLocation(item){
      console.log(item)
      deliveryLocation=item;
    }