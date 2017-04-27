window.onload = function(){ "use strict";

let addYourName = document.getElementById("addYourName");    
let addCatName = document.getElementById("addCatName");
let addColor = document.getElementById("addColor");
let addBreed = document.getElementById("addBreed");
let addImg = document.getElementById("addImg");
let addBtn = document.getElementById("add");                         
let table = document.getElementById("table");
let totalCats = 0;

/***Event listeners***/  
                           
addBtn.addEventListener("click", function(event){
    saveToFirebase();
    addProductToTable();
});                          
                         
                         
/***Functions***/  
getAndWrite();                         
                         
function saveToFirebase(){ 
    let object = {
        yourName: addYourName.value,
        catName: addCatName.value,
        color: addColor.value,
        breed: addBreed.value,
        img: addImg.value,
        id: totalCats
    }
    
    firebase.database().ref('cats/' + totalCats).set(object);
    addYourName.value = "";
    addCatName.value = ""; 
    addColor.value = ""; 
    addBreed.value = "";
    addImg.value = "";
};
                         
 function getAndWrite(){                           
    firebase.database().ref("cats/").on("value", function(snapshot) {
        let data = snapshot.val();
        totalCats = data.length;
        table.innerHTML = "";
        addProductToTable(data);
    })
};                        
    
function addProductToTable(data) { //Funktion som lägger till inputvalue i tabellen
    for (let object in data) {
    let tr = document.createElement("tr");
    tr.innerHTML = "<td>" + data[object].yourName + "<td>" + data[object].catName + "<td>" + data[object].color + "<td>" + data[object].breed + "<td>" + "<img src=" + data[object].img + ">";
    table.appendChild(tr);
    console.log("Tillagt i tabellen");
        }
    
    };
                           
    
}