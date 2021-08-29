const API = "https://opentdb.com/api.php?amount=50";
const numPreguntas = document.getElementById("numQuestions");
const dificultad = document.getElementById("difficulty");
const category = document.getElementById("category");
const typeQuestions = document.getElementById("typeQuestions");
const boton = document.getElementById("submitSearch");

let arrNum = [];
let arrdi = [];
let arrCat = [];
let arrype = [];

//FETCH QUE ALIMENTA EL FORMULARIO
const fetchAPI = async e => {
e.preventDefault();
const fetchApi = await fetch(`${API}`);
const result = await fetchApi.json();

// LLAMADO DE FUNCIONES DENTRO DEL FETCH
runNumQuestions(result);
runDificult(result);
runCategory(result);
runTypeQuestions(result);
}
// EVENTOS DE LLAMADO A FUNCIONES

// handleSearchQuestIONS();

const handleSearchQuestIONS = () =>{
    
}

// FUNCION NUMERO DE PREGUNTAS
const runNumQuestions = difi =>{
    let i = 1;
    difi.results.forEach(difArr => {
        arrNum.push(i);
        i++;            
    });
    arrNum.forEach(cont => {
        numPreguntas.innerHTML += `<option value="${cont}">${cont}</option>`;
    })
    }
// FUNCION DIFICULTAD
const runDificult = difi =>{
difi.results.forEach(difArr => {
    if(!(arrdi.includes(difArr.difficulty))){
        arrdi.push(difArr.difficulty); 
    }
});
dificultad.innerHTML = `<option value="AnyDifficulty">Any Difficulty</option>`;
arrdi.forEach(cont => {
dificultad.innerHTML += `<option value="${cont}">${cont}</option>`;
})
}
// FUNCION CATEGORIA
const runCategory = difi =>{
    difi.results.forEach(difArr => {
        if(!(arrCat.includes(difArr.category))){
            arrCat.push(difArr.category); 
        }
    });
    category.innerHTML = `<option value="AnyCategory">AnyCategory</option>`;
    arrCat.forEach(cont => {
        category.innerHTML += `<option value="${cont}">${cont}</option>`;
    })
    console.log(arrCat);
    }
// FUNCION TIPO DE PREGUNTA
const runTypeQuestions = difi =>{
    difi.results.forEach(difArr => {
        if(!(arrype.includes(difArr.type))){
            arrype.push(difArr.type); 
        }
    });
    typeQuestions.innerHTML = `<option value="AnyType">Any Type</option>`;
    arrype.forEach(cont => {
        typeQuestions.innerHTML += `<option value="${cont}">${cont}</option>`;
    })
    }
document.addEventListener("DOMContentLoaded", fetchAPI);

