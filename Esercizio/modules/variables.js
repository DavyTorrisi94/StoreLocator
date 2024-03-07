
let coords={
    lat: 42.646184,
    lng: 12.932628,
}

let adress_request="./stores.json";
let request=fetch(adress_request).then(res=>res.json());


export {coords,request};