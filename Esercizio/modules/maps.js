
export function creaMappa(coords){
    //Creo la mappa 
    let map=new google.maps.Map(document.querySelector("#map"),{
        center: coords,
        zoom: 6
    })
    //Ritorno l'instanza della mappa
    return map;
}

