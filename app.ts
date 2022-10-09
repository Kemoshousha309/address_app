import axios from "axios";

// GLOBALS
const API_KEY = "AIzaSyBoz6qs7RvmlnQwZxEGL4q3Qk6IKCHJJEE";

// DOM
const form = document.getElementById("address-form")! as HTMLFormElement;
const input = document.getElementById("address")! as HTMLInputElement;
const mapDiv = document.getElementById("map")! as HTMLDivElement;
form.addEventListener("submit", handleSubmit);

// TYPES
interface MapApiRes {
  data: {
    results: { geometry: { location: object } }[];
    status: string;
  };
}
// to declare the global variable in another file or script to a document ..
declare var google: any;

// MAIN
function handleSubmit(event: Event) {
  event.preventDefault();
  const address = input.value;

  axios
    .get(geocodeReqTem(address, API_KEY))
    .then((res: MapApiRes) => {
      const {
        data: { results, status },
      } = res;
      console.log(res);
      if (status !== "OK") {
        throw new Error();
      }
      const location = results[0].geometry.location;
      initMap(location);
    })
    .catch((err) => {
      alert("INVALID ADDRESS");
      input.value = "";
    });
}

function initMap(location: object) {
  const map = new google.maps.Map(mapDiv, {
    zoom: 10,
    center: location,
  });
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
}

function geocodeReqTem(address: string, key: string) {
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;
}


// this app would not work because google account is stopped billing which is required to 
// use API key and get the service of google maps