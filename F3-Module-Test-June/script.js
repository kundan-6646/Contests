let geoData;

//async method to get Geo data
async function fetchGeoLocationByIP() {
    try {
      const response = await fetch(`https://ip-api.io/api/json`);
      const data = await response.json();
      geoData = data;
      renderData();
    } catch (error) {
      console.log('Error:', error);
    }
}

//This object is a collection of keys that we going to get from our geoData
//we will iterate over this map to get create Ui ele and their val we use in to get geodata.keyname
const reqData = {
    Lat: "latitude",
    City: "city",
    Organisation: "organisation",
    Long: "longitude",
    Region: "region_name",
    Hostname: "ip"
}

const geoDataContainer = document.getElementsByClassName('geo-data-container')[0];
function renderData() {
    geoDataContainer.innerHTML = '';
    for (const key in reqData) {
        const keyForGeoData = reqData[key];
        
        let div = document.createElement('div');
        div.classList.add('geo-data-item');
        div.innerHTML = `${key}: <span>${geoData[keyForGeoData]}</span>`;

        geoDataContainer.appendChild(div);
    }
}
  