import {loadBodaInfo} from './boda.js';
import { loadIntinerario } from './intinerario.js';
import { loadPrincipalObject,addQuantity,createAllergensPopUp} from './index.js';

const object = {
    "day":"Sábado",
    "date":"04 de Octubre de 2025",
    "text":[
        "Nos casamos",
        "Sofia y Juan",
        "Porque la felicidad es mucho más grande cuando la compartimos, te esperamos en nuestro casamiento",
        "Gracias por acompañarnos en este día, los esperamos para brindar juntos"
    ],
    "info":{
        "salon":{
            "link":"https://maps.app.goo.gl/Do3erMRwskRgXVVE9",
            "time":"18:00",
            "name":"Salón La Arboleda"
            },
        "iglesia":{
            "link":"https://maps.app.goo.gl/h83QYJo3NkEotb837",
            "time":"16:30",
            "name":"Parroquia Nuestra Señora de la Caridad"
            },
        "afterDinner":{
          "link":"https://maps.app.goo.gl/Do3erMRwskRgXVVE9",
          "time":"22:00",
          "name":"Salón La Arboleda"
        }
    },
    "intinerario" : [
        {
            "img":"img/icon/iglesia.png",
            "time":"16:30",
            "name":"Ceremonia"
            },
        {
            "img":"img/icon/copas.png",
            "time":"18:00",
            "name":"Cocktail"
        },
        {
            "img":"img/icon/comida.png",
            "time":"20:00",
            "name":"Comida"
        },
        {
            "img":"img/icon/musica.png",
            "time":"22:00",
            "name":"Fiesta"
        }
    ],
    "guestData" : {
    "id":"1",
    "name":"Alvaro Bernabey Izquierdo",
    "quantity":2,
    "done":false,
    "guests":[
       { "allergens":['leche'],"comment":"cca",
        "name":"",},
        {"allergens":[],"comment":"ccm","name":""}
        ]
}

}

let indexImg = 1;
const changeImg = () =>{
    var imagen = document.getElementById('principalImg');
    imagen.src =  "img/bg/i"+indexImg+'.jpg';
    indexImg = (indexImg < 16)?indexImg+1:1;
}

  function loadGuestDB(name) {
    return new Promise((resolve, reject) => {
      console.log("→ Llamando a API con:", name);
      //https://bodasgoldback-production.up.railway.app/api/
      //http://localhost:8080/api/
      fetch('https://bodasgoldback-production.up.railway.app/api/'+name, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json' // Indicamos que enviamos JSON
        },
      })
        .then(response => {
          if (!response.ok) {
            userDontFound();
          }
          resolve(response.json());
        })
      }
      
  )}

  const qrGenerator = (qrList) =>{
    for (let index = 0; index < qrList.length; index++) {
        const url = "hola/"+object.id+"/"+index;
        new QRCode(document.getElementById('qrCodeId'+index),url);
    }
   
}

  const sliderGenerator = (qrList) =>{
   /* let print = `<div id="slider">`;
    for (let index = 0; index < qrList.length; index++) {
        if(index == 0){
            print+=` <input type="radio" name="slider" id="slide1" checked>`;
        }else{
            print+=`<input type="radio" name="slider" id="slide${index+1}">`;  
        }
       
    }
        print+=`<div id="slides">
                <div id="overflow">
                <div class="inner">
        `;
    for (let index = 0; index < qrList.length; index++) {
        print+=`
                <div class="slide slide_${index+1}">
                    <div class="slide-content">
                        <p>${qrList[index].name}</p>
                        <div id="qrCodeId${index}"></div>
                        <p>Esta es tu entrada, no la compartas</p>
                    </div>
                </div>`;  
    }
    print+=`</div></div></div><div id="controls">`;
    for (let index = 0; index < qrList.length; index++) {
        print+=`<label for='slide${index+1}'></label>`;  
    }
    print+=`</div><div id="bullets">`;
    for (let index = 0; index < qrList.length; index++) {
        print+=`<label for="slide${index+1}"></label>`;  
    }
    print+=`</div></div>`;
   document.getElementById('qrcode').innerHTML= print;
   qrGenerator(qrList);*/
  }
  

document.addEventListener('DOMContentLoaded', async function () {
  const params = new URLSearchParams(window.location.search);
  let name = params.get("invitado");
  let afterDinner = false;
  if(name == null || name == ""){
    name = null;
  } else{
    name = params.get("afterDinner");
    afterDinner = true;
  }
  console.log("Esperando datos...");
  try {
    loadBodaInfo(object,afterDinner);
    loadIntinerario(object.intinerario);
    if (name !=null){
      object.guestData =  await loadGuestDB(name); // Espera completa
    }else{
      object.guestData.done = true;
    }
    
    console.log("✅ Datos listos, continuando...");
    loadPrincipalObject(object.guestData);
    scriptTag.textContent = JSON.stringify(object, null, 2);
    if(!object.guestData.done){
        addQuantity();
    }else{
        document.getElementById('form').remove();
    }

  } catch (err) {
    console.error("❌ Error general:", err);
    userDontFound();
  }
});

const userDontFound = () =>{
  Swal.fire({
    title: "Invitado no encontrado",
    confirmButtonText: "Aceptar",
    confirmButtonColor: '#5d674f',
    background: '#ede3d7'
  });
  document.getElementById('form').remove();
}


