
//async Func to get Geo data
async function fetchGeoLocationByIP(ip) {
    try {
      const response = await fetch(`https://ip-api.io/api/json`);
      const data = await response.json();
      renderGeoData(data);
      fetchPostOffices(data.zip_code);
    } catch (error) {
      console.log('Error:', error);
    }
}

//Func to get post offices by pincode
async function fetchPostOffices(pincode) {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      renderPOData(data[0]);
    } catch (error) {
      console.log('Error:', error);
    }
}


//keys to fetch from geoData object
const geoDataKeys = ['latitude', 'city', 'organisation', 'longitude', 'region_name', 'ip', 
            'callingCode', 'time_zone', 'date_time', 'zip_code'];


// DOM elements
const geoDataContainer = document.getElementById('geo-data');
const getDataButton = document.getElementById('get-data-button');
const countryFlag = document.getElementsByClassName('country-data')[0];
const postOfficesContainer = document.getElementsByClassName('post-offices')[0];
const googleMap = document.getElementById('googleMap');
const searchPo = document.getElementById('post-office-search');

//Func to create and render Geo Data
function renderGeoData(geoData) {
    geoDataKeys.forEach(key => {
        let div = document.getElementById(key);

        if(key == 'date_time') {
            div.innerText = getCurrentUserDateTime(geoData['time_zone']);
        }else
            div.innerText = geoData[key];
    });

    getDataButton.style.display = 'none'; //hiding button on UI
    geoDataContainer.style.display = 'block';

    countryFlag.src  = geoData.flagUrl; //setting country falg url in img tag
    countryFlag.style.visibility = 'visible';

    setAddressInMAp(geoData.longitude , geoData.latitude);
}


//Func to create and render Post offices
function renderPOData(poData) {
    document.getElementById('Message').innerText = poData.Message; //setting PO message on UI

    poData.PostOffice.forEach(office => {

        let div = document.createElement('div');
        div.classList.add('post-office');
        div.innerHTML = `<div class="post-office-item">Name: <span class="po-name">${office.Name}</span></div>
        <div class="post-office-item">Branch Type: <span class="po-branch">${office.BranchType}</span></div>
        <div class="post-office-item">Delivery Status: <span>${office.DeliveryStatus}</span></div>
        <div class="post-office-item">District: <span>${office.District}</span></div>
        <div class="post-office-item">Division: <span>${office.Division}</span></div>`;

        postOfficesContainer.appendChild(div);
    });
}

//Func to set src in Google Map
function setAddressInMAp(long, lat) {
  googleMap.src = `https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed`;
}


//Func to get user date-time by their time zone
function getCurrentUserDateTime(userTimeZone) {
    return new Date().toLocaleString("en-US", { timeZone: userTimeZone });
}


//Po Search function
searchPo.addEventListener('input', (e) => {
  const keyword = e.currentTarget.value.trim().toLowerCase();
  const postOfficesOnUi = document.getElementsByClassName('post-office');

  for (let i = 0; i < postOfficesOnUi.length; i++) {
    const po = postOfficesOnUi[i];
    let poName = po.getElementsByClassName('po-name')[0].innerText.trim().toLowerCase();
    let poBranch = po.getElementsByClassName('po-branch')[0].innerText.trim().toLowerCase();
    
    if(poName.includes(keyword) || poBranch.includes(keyword)) {
      if(po.classList[1] == 'post-office-hide') po.classList.remove('post-office-hide');
    }else {
      po.classList.add('post-office-hide');
    }
  }

});