
const boda1 = document.getElementById('boda1');
const boda2 = document.getElementById('boda2');
const day = document.getElementById('day');
const date = document.getElementById('date');
const bodaText = document.getElementById('bodaText');
const principalDate = document.getElementById('principalDate');
const salon = document.getElementById('salon');
const iglesia = document.getElementById('iglesia');
const bodaInfo = document.getElementById('bodaInfo');


function loadBodaInfo(boda){
    principalDate.innerHTML = boda.date;
    for (let index = 0; index < boda.text.length; index++) {
        const id = 'text'+(index+1);
        document.getElementById(id).innerHTML = boda.text[index];
    }
    let text ="";
    bodaText.innerHTML = text;
    text = ` 
        <img src="img/icon/iglesia.png" style="width:120px; margin-top:5px;">
        <h2>${boda.info.iglesia.time}</h2>
        <h2>${boda.info.iglesia.name}</h2>
        <a href="${boda.info.iglesia.link}" target="_blank"><h2>Ver ubicación</h2></a>
        
        <img src="img/icon/copas.png" style="width:120px; margin-top:5px;">
        <h2>${boda.info.salon.time}</h2>
        <h2>${boda.info.salon.name}</h2>
        <a href="${boda.info.salon.link}" target="_blank"><h2>Ver ubicación</h2></a>
    `;
    bodaInfo.innerHTML = text;
    text = null;
    day.innerHTML = /*boda.day*/ "Faltan";
    date.innerHTML = /*boda.date*/ "para nuestra boda";
}
export {loadBodaInfo};

//loadBodaInfo();