
const dom = document.getElementById('intinerario');
const dom2 = document.getElementById('rellenoIntinerario');
const loadIntinerario = (intinerario) =>{
    let print = "<section style='height:60px;'></section>";
    let print2 = "<section style='height:60px;'></section>";
    for (let index = 0; index < intinerario.length; index++) {
        print +=`<div id="inti-item-${intinerario[index].name}" class="inti-item inti-item-${intinerario[index].name}">
        <p>${intinerario[index].name}</p>
        <img src="${intinerario[index].img}" style="width:80px; margin-top:5px;">
        <p>${intinerario[index].time}</p>
    </div>`;
        print2 +=`<div">
        <p>${intinerario[index].name}</p>
        <img src="${intinerario[index].img}" style="width:80px; margin-top:5px;">
        <p>${intinerario[index].time}</p>
    </div>`;
        if(index != intinerario.length-1){
            print+='<div class="inti-item-line"></div>';
            print2+='<div class="inti-item-line"></div>';
        }
        
    }
    dom.innerHTML = print;
    dom2.innerHTML = print2;
    document.getElementById('rellenoIntinerario').style.height = document.getElementById('intinerario').scrollHeight;+"px";
}
export {loadIntinerario};