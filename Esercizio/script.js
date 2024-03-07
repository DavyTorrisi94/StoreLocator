/* //TODO: Inizializzare la mappa
import {coords,request} from "./modules/variables.js"
import { creaMappa } from "./modules/maps.js";
let mappa=creaMappa(coords);
request.then(data=>{
    console.log(data);
}) */

class Mappa{
    constructor(lat,long,zoom){
        this.lat=lat;
        this.long=long;
        this.zoom=zoom;
    }
    creaMappa(){
        return new google.maps.Map(document.querySelector("#map"),{
            center: {
                lat: this.lat,
                lng: this.long
            },
            zoom: this.zoom
        })
    }
     creaSegnaposto(coords,map){
        return new google.maps.Marker({
            position: coords,
            map,
        });
    }
    creaFinestraInformazioni(info,map){
        return new google.maps.InfoWindow({
            content: info,
            map
        })
    }
}
let map=new Mappa(42.646184,12.932628,6);
let section=document.querySelector(".list-store-container")
let my_map=map.creaMappa();
console.log(my_map);

class Stores{
    constructor(container,name,address,phone,email,opening,map,coords){
        this.name=name,
        this.address=address,
        this.phone=phone,
        this.opening=opening,
        this.container=container,
        this.email=email,
        this.map=map,
        this.coords=coords,
        this.info=
            `<div>
                <h3>${this.name}</h3>
                <p>${this.address}</p>
                <p>${this.email}</p>
                <p>${this.phone}</p>
                <p>${this.opening}</p>
            </div>`
    }
    
    creaStores(){
        let article=document.createElement("article");
        let h3=document.createElement("h3");
        h3.textContent=this.name;
        let address=document.createElement("p");
        address.textContent=this.address;
        let email=document.createElement("p");
        email.textContent=this.email;
        let phone=document.createElement("p");
        phone.textContent=this.phone;
        let opening=document.createElement("p");
        opening.innerHTML=this.opening;
        article.append(h3);
        article.append(address);
        article.append(email);
        article.append(phone);
        article.append(opening);
        this.container.append(article)

    }
    creaMarkerStore(){
        return map.creaSegnaposto(this.coords,this.map);
    }
    creaWindowStore(marker){
        let windowstore=map.creaFinestraInformazioni(this.info,this.map);
        windowstore.open({
            anchor: marker,
            map
        })
    }

}


fetch("./stores.json").then(res=>res.json())
.then(data=>{
    data.stores.forEach(element => {
        let store=new Stores(section,element.name,element.address,element.phone,element.email,element.openings,my_map,element.coords);
        store.creaStores();
        let marker=store.creaMarkerStore();
        marker.addListener("click",(e)=>{
            console.log(e);
            store.creaWindowStore(marker);
            
        })
        let buttonTV=document.querySelector("#TV");
        buttonTV.addEventListener("click",(e)=>{
            buttonTV.classList.add("clicked");
            data.stores.forEach(element => {
                console.log(element.categories);
                if(!element.categories.includes("tv")){
                    marker.setVisible(false);
                }
            });
})
        //map.creaSegnaposto(element.coords,my_map);
    });
})

