const formGuests = document.getElementById('guests');
const popUPAllergens = document.getElementById('popUPAllergens');
const scriptTag = document.getElementById("dataObject");
const body = document.getElementById("body");
const formGuest = document.getElementById("formGuest");

const editQuantityGuests = (quantity) =>{
    
    if(quantity == "no"){
        formGuests.innerHTML ="";
          Swal.fire({
            title: 'Estas seguro que no asistiras a la Boda?',
            showCancelButton: true,
            showConfirmButton:true,
            confirmButtonColor: '#ff6961',
            confirmButtonText: "Confirmo",
            cancelButtonText: "Volver",
            background: '#ede3d7',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dontWillGoWedding();
            }else{
                document.getElementById('quantity').value ="0"
            }
          });
        return;
    }else if(quantity == 0){
         formGuests.innerHTML ="";
        return;
    }
    const object = JSON.parse(scriptTag.textContent);
    object.guestData.guests = [];
    formGuests.innerHTML ="<div class='col'>";
    for (let index = 0; index < quantity; index++) {
        const newGuest = `<div class="row">
        <input placeholder="Nombre Completo" name="name${index}" id="name${index}" type="text" class="wd-80 bg-crema">
        <br>
        <br>
        <button onclick="allAllergens(${index})" class="wd-60 bg-crema">Selecionar Alergenos</button>
    </div><br>`;
    formGuests.innerHTML += newGuest;
    object.guestData.guests.push({"name:": "","allergens":[]});
    scriptTag.textContent = JSON.stringify(object, null, 2);
    }
    formGuests.innerHTML += `</div><button onclick="save()" class="bg-crema">Guardar</button>`;
    if(quantity > 0){
        document.getElementById('name0').value = object.guestData.name;
    }
    document.getElementById("newQuantity").value = quantity;
}

const createAllergensPopUp = () =>{
    const object = JSON.parse(scriptTag.textContent);
    let options = `<form id="formAllergens" class="formAllergens"><p>Seleccionar Alergenos</p>`;
    allergensData.forEach(element => {
        options +=`<label style="width:80%;">
            <img src="${element.img}">
            ${element.name}
             <input type="checkbox" name="alergenos" value="${element.name}" class="allergensSelector">
        </label><br>`;
    });
    options +=`<label for="comentario">Otros:</label><br>
        <textarea id="comentario" name="comentario" rows="3" style="width:80%; resize: none;" class="bg-crema"></textarea>`;
    options +="<button onclick='closePopUp()' class='bg-crema'>Guardar</button>";
    options +="</form>";
    popUPAllergens.innerHTML = options;

    const listAllernger = document.querySelectorAll('.allergensSelector');
    const guest = document.getElementById('allergensGuestNum').value;
    if(guest >=0){
        for (let index = 0; index < object.guestData.guests[guest].allergens.length; index++) {
            document.getElementById("comentario").value = object.guestData.guests[guest].comment;
            listAllernger.forEach(e =>{
                if(e.defaultValue == object.guestData.guests[guest].allergens[index]){
                e.checked = true;
                }
            });
        }
    }
    scriptTag.textContent = JSON.stringify(object, null, 2);
}

const allAllergens = (num) =>{
    event.preventDefault();
    formGuest.classList.add('hide');
    popUPAllergens.hidden = false;
    document.getElementById('allergensGuestNum').value = num;
    createAllergensPopUp();
}

const closePopUp = () =>{
    event.preventDefault();
    const object = JSON.parse(scriptTag.textContent);
    popUPAllergens.hidden = true;
    formGuest.classList.remove('hide');
    const listAllernger = document.querySelectorAll('.allergensSelector');
    let list = [];
    listAllernger.forEach(e =>{if(e.checked)list.push(e.value)});
    const guest = document.getElementById('allergensGuestNum').value;
    object.guestData.guests[guest].comment = document.getElementById("comentario").value;
    object.guestData.guests[guest].allergens = list;
    listAllernger.forEach(e =>e.checked = false);
    scriptTag.textContent = JSON.stringify(object, null, 2);
}

const controlDataToSend = (guestData) =>{
    const quantity = document.getElementById("newQuantity").value;
    guestData.quantity = quantity;
    for (let index = 0; index < quantity; index++) {
        const name = document.getElementById('name'+index).value
        if(name == null || name == "" || name.length < 5)return null;
        guestData.guests[index].name = name;
    }
    return guestData;
}


const save = () =>{
    
    const object = JSON.parse(scriptTag.textContent);
    const guestData =  controlDataToSend(object.guestData);
    if (guestData == null){
        Swal.fire({
            title: 'Todos los invitados deben tener su nombre completo',
            confirmButtonText: 'Entendido!',
            confirmButtonColor: '#5d674f',
            background: '#ede3d7'
          })
        return;
    } else{
      let text = 'Confirmo asistencia';
        Swal.fire({
            title: text,
            confirmButtonText: 'Si',
            confirmButtonColor: '#5d674f',
            background: '#ede3d7',
            cancelButtonText: "Volver",
            showCancelButton: true,
        }).then((result) => {
            if (!result.isConfirmed) return;
            else willGoWedding(guestData);
          });
        
    }

   
}

const allergensData = [
    {
        "name": "Glutten",
        "img": "img/icon/glutten.png"
    },
    {
        "name": "Lactosa",
        "img": "img/icon/leche.png"
    },
    {
        "name": "Vegano",
        "img": "img/icon/vegano.png"
    }
];

const willGoWedding = (guestData) =>{
    fetch('https://bodasgoldback-production.up.railway.app/api', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": guestData.name,
          "done": guestData.done,
          "quantity": guestData.quantity,
          "guests":guestData.guests
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
          }
          return response.json();
        })
        .then(data => {
          
          Swal.fire({
              title: 'Invitación cargada',
              confirmButtonText: 'Nos vemos en la Boda!!',
              confirmButtonColor: '#5d674f',
              background: '#ede3d7'
            })
          document.getElementById('form').remove();
        })
        .catch(error => {
          console.error('Error al crear usuario:', error);
        });
}

const dontWillGoWedding = () =>{
    const object = JSON.parse(scriptTag.textContent);
    fetch('https://bodasgoldback-production.up.railway.app/api', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": object.guestData.name,
          "done": true,
          "quantity": 0
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
          }
          return response.json();
        })
        .then(data => {
          Swal.fire({
              title: '¡Gracias por avisarnos!',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5d674f',
              background: '#ede3d7'
            })
          document.getElementById('form').remove();
        })
        .catch(error => {
          console.error('Error al crear usuario:', error);
        });

}