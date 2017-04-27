window.onload = function(){ "use strict";

    
let addName = document.getElementById("addName");
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
        name: addName.value,
        color: addColor.value,
        breed: addBreed.value,
        //img: img,
        id: totalCats
    }
    
    firebase.database().ref('cats/' + totalCats).set(object);
    addName.value = ""; 
    addColor.value = ""; 
    addBreed.value = "";
    //addImg.value = "";
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
    tr.innerHTML = "<td>" + data[object].name + "<td>" + data[object].color + "<td>" + data[object].breed;
    table.appendChild(tr);
    console.log("Tillagt i tabellen");
    }
    
};
                         
 function addToTable(data){
    let newTr = document.createElement("tr");
    newTr.innerHTML = "<td>" + data.name + "<td>" + data.color + "<td>" + data.breed;
    table.appendChild(newTr);
 }                        
    
}