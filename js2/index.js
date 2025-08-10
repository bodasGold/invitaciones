
let object = {
    "id":"1",
    "name":"",
    "person":0,
    "quantity":2,
    "done":false,
    "guests":[
       { "allergens":[],
        "name":"",},
        {"allergens":[],"name":""}
        ]
}
const loadPrincipalObject = (guestData) =>object = guestData;

/*consts*/
const selectQuantity = document.getElementById('quantity');

const popUPAllergens = document.getElementById('popUPAllergens');
const form = document.getElementById('form');


const allergensData = [
    {
        "name": "glutten",
        "img": "https://i.ibb.co/vJBXrNd/glutten.png"
    },
    {
        "name": "huevo",
        "img": "https://i.ibb.co/1MrHwhn/huevo.png"
    },
    {
        "name": "vegano",
        "img": "https://i.ibb.co/FKt0XhS/vegan.png"
    }
];


const createAllergensPopUp = () =>{
    let options = `<form id="formAllergens" class="formAllergens"
        style="border:solid;">`;
    allergensData.forEach(element => {
        options +=`<label class="d-flex border">
            <img src="${element.img}" style="width: 30px; border:solid; border-radius: 100%;">
            ${element.name}
             <input type="checkbox" name="alergenos" value="${element.name}" class="allergensSelector">
        </label>`;
    });

    options +="<button onclick='closePopUp()'>Cerrar</button>";
    options +="</form>";
    popUPAllergens.innerHTML = options;

    const listAllernger = document.querySelectorAll('.allergensSelector');
    const guest = document.getElementById('allergensGuestNum').value;
    if(guest >=0){
        for (let index = 0; index < object.guests[guest].allergens.length; index++) {
        listAllernger.forEach(e =>{
           if(e.defaultValue == object.guests[guest].allergens[index]){
            e.checked = true;
           }
        });
        }
    }
}

const addQuantity = () =>{
    const elementoOpcion = document.createElement('option');
        elementoOpcion.value = 0;
        elementoOpcion.textContent = "Selecciona la cantidad";
        selectQuantity.appendChild(elementoOpcion);
        const elementoOpcion2 = document.createElement('option');
        elementoOpcion2.value = "no";
        elementoOpcion2.textContent = "No Asistire";
        selectQuantity.appendChild(elementoOpcion2);

    for (let index = 0; index < object.quantity; index++) {
        const elementoOpcion = document.createElement('option');
        elementoOpcion.value = index+1;
        elementoOpcion.textContent = index+1;
        selectQuantity.appendChild(elementoOpcion);
    }
    
}

  

  export {loadPrincipalObject,addQuantity,createAllergensPopUp}