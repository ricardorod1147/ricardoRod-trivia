const API = "https://opentdb.com/api.php?amount=50";
const numPreguntas = document.getElementById("numQuestions");
const dificultad = document.getElementById("difficulty");
const category = document.getElementById("category");
const typeQuestions = document.getElementById("typeQuestions");
const boton = document.getElementById("submitSearch");
const formTrivia = document.getElementById("form-trivia");
const container = document.getElementsByClassName("container");
const containerPreguntas = document.getElementById("renderPreguntas");
const holaa = document.getElementById("botoN");

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
// handleSearchQuestIONS();
const handleSearchQuestIONS = e =>{
    e.preventDefault();
    // console.log(`${numPreguntas.value} la segunda es  ${category.value}  
    // la dificutad es    ${dificultad.value}   y el tipo de pregunta es  ${typeQuestions.value} `)
    const Arrcategorias = [
        'General Knowledge',
        'Entertainment: Books',
        'Entertainment: Film',
        'Entertainment: Music',
        'Entertainment: Musicals & Theatres',
        'Entertainment: Television',
        'Entertainment: Video Games',
        'Entertainment: Board Games',
        'Science & Nature',
        'Science: Computers',
        'Science: Mathematics',
        'Mythology',
        'Sports',
        'Geography',
        'History',
        'Politics',
        'Art',
        'Celebrities',
        'Animals',
        'Vehicles',
        'Entertainment: Comics',
        'Science: Gadgets',
        'Entertainment: Japanese Anime & Manga',
        'Entertainment: Cartoon & Animations',
        ];
        let apiDinamic = ""; 
    let cateAPI
    const numeroCate = retorno(Arrcategorias);
        if(numeroCate>0){cateAPI = "&category="+numeroCate;
        }else{cateAPI = "";
        }
        const returDificultad = retornoDificultad();
        const returType = returnTipo();
        apiDinamic = `https://opentdb.com/api.php?amount=${numPreguntas.value}${cateAPI}${returDificultad}${returType}`;
        renderQuestions(apiDinamic);
    
}
//RENDERIZAR PREGUNTAS BAJO LA URL DE API DINAMICA
const renderQuestions = async api =>{
    const fetchDos = await fetch(api);
    const resulDinamic = await fetchDos.json();
    renderFormat(resulDinamic);
}
const renderFormat=(objetoRender)=>{
    let count = 0;
    let arrayQuestions = objetoRender.results;
    let incorrectQuestion = arrayQuestions[count].incorrect_answers;
    let puntajeUno = 0;
    let arrRespuestas = [];
    console.log(arrayQuestions);  
    containerPreguntas.innerHTML = ``;

    if(incorrectQuestion.length>=2){ 
        let render = ()=> { 
            let resCorrect = arrayQuestions[count].correct_answer;
            arrRespuestas = [incorrectQuestion[2],incorrectQuestion[1],incorrectQuestion[0],arrayQuestions[count].correct_answer];
            console.log(arrRespuestas);
            arrRes = [...arrRespuestas];
            arrRes = arrRes.sort(function() {return Math.random() -0.5});
            console.log(arrRes);
        containerPreguntas.innerHTML =`<div class="active">
        <div class="zoneQuestion">
        <h2>Pregunta  ${count+1}</h2>
        <p>${arrayQuestions[count].question}</p>
        </div>
        <div class="zoneAnswer">
        <input type="button" id="resUno" value="${arrRes[2]}" class="botonRespuesta">
        <input type="button" id="resDos" value="${arrRes[1]}" class="botonRespuesta">
        <input type="button" id="resTres" value="${arrRes[0]}" class="botonRespuesta">
        <input type="button" id="resCuatro" value="${arrRes[3]}" class="botonRespuesta">
        </div>
        </div>`;

                const resUno = document.getElementById("resUno");
                const resDos = document.getElementById("resDos");
                const resTres = document.getElementById("resTres");
                const resCuatro = document.getElementById("resCuatro");

                console.log(resCorrect);

                const handleUno = (valor) =>{
                        if(resCorrect == valor){
                            puntajeUno++;
                            console.log(`El puntaje es ${puntajeUno} el valor es ${valor}`)
                            saludo();
                        }else{
                            console.log("Incorrecta");
                            saludo();
                        }
                }

                resUno.onclick = () =>{
                    handleUno(resUno.value);
                }
                resDos.onclick = () =>{
                    handleUno(resDos.value);
                }
                resTres.onclick = () =>{
                    handleUno(resTres.value);
                }
                resCuatro.onclick = () =>{
                    handleUno(resCuatro.value);
                }

// FUNCION PARA DAR SIGUIENTE PREGUNTA

        const saludo = () => {
            
        if(count<(arrayQuestions.length-1)){
            count++;
            render();
        }else{
            let promedio = ((puntajeUno*100)/arrayQuestions.length).toFixed();
            let promedioTotal = promedio > 70 ? "¡Ganaste! :)" : "mmmm Perdiste :(";

            containerPreguntas.innerHTML =
            `<div class="active">
            <div class="zoneQuestion">
            <h2>${promedioTotal}</h2>
            <h2>Su puntaje es  ${puntajeUno} de ${arrayQuestions.length} Efectividad de ${promedio} %</h2>
            <button class="botonTry" onclick="window.location.reload();">Try Again</button>
            </div>
            <div class="zoneAnswer">
            </div>`
        }
        }
    }
    render();

    }else{
        let puntajeCorrect = 0;
        
// FUNCION PARA RENDERIZAR EN EL CASO QUE SEA DEL TIPO BOOLEAN
        let renderDos = () => {
            let respuestaUno = incorrectQuestion[0];
            let respuestaDos = arrayQuestions[count].correct_answer;
        containerPreguntas.innerHTML =`<div class="active">
        <div class="zoneQuestion">
        <p>Pregunta${count+1}</p>
        <p>${arrayQuestions[count].question}</p>
        </div>
        <div class="zoneAnswer">
        <input type="button" id="resUno" value="${respuestaUno}" class="botonRespuesta">
        <input type="button"  id="resDos" value="${respuestaDos}" class="botonRespuesta">
        </div>
        </div> `;
        console.log(`La mala es ${incorrectQuestion[0]} la buena es ${arrayQuestions[count].correct_answer}`);
       
// FIN FUNCION RENDERIZAR EN EL CASO QUE SEA DEL TIPO BOOLEAN

// RESPUESTA CORRECTA
        
                                const ansOne = document.getElementById("resUno");
                                const ansTwo = document.getElementById("resDos");

                                const handlecorrect = (valor) =>{  
                                  if(valor==respuestaDos){
                                    puntajeCorrect++;
                                    siguienteDos();
                                  }else{
                                    siguienteDos();
                                  }
                            }

                                ansOne.onclick = () => { handlecorrect(ansOne.value);
                                }
                                ansTwo.onclick = () => { handlecorrect(ansTwo.value);
                                }

// FIN  RESPUESTA CORRECTA

        const siguienteDos = () => {
            
        if(count<(arrayQuestions.length-1)){
            count++;
            renderDos();
        }else{

            let promedio = ((puntajeUno*100)/arrayQuestions.length).toFixed();
            let promedioTotal = promedio > 70 ? "¡Ganaste! :)" : "mmmm Perdiste :("; 

            containerPreguntas.innerHTML =
            `<div class="active">
            <div class="zoneQuestion">
            <h2>${promedioTotal}</h2>
            <h2>Su puntaje es  ${puntajeUno} de ${arrayQuestions.length} Efectividad de ${promedio} %</h2>
            <button class="botonTry" onclick="window.location.reload();">Try Again</button>         
            </div>
            <div class="zoneAnswer">
            </div>`
        }
        }
    }
    renderDos();
}
}

// FUNCION DIFICULTAD
const retornoDificultad = () => {
    if(dificultad.value!="AnyDifficulty"){return "&difficulty="+dificultad.value;
    }else{return "";
    }}
const runDificult = difi =>{
difi.results.forEach(difArr => {
    if(!(arrdi.includes(difArr.difficulty))){
        arrdi.push(difArr.difficulty); 
    }
});
dificultad.innerHTML = `<option value="AnyDifficulty">Any Difficulty</option>`;
arrdi.forEach(cont => {
dificultad.innerHTML += `<option value="${cont}">${cont}</option>`;
})}
// FUNCION CATEGORIA
const retorno = (categorias) => {
    if(categorias.includes(category.value)){let cateNumero = (categorias.indexOf(category.value))+9;
        return cateNumero;
       }else{cateNumero = "";
           return cateNumero;
       }}
const runCategory = difi =>{
    difi.results.forEach(difArr => {
        if(!(arrCat.includes(difArr.category))){
            arrCat.push(difArr.category); 
        }});
    category.innerHTML = `<option value="AnyCategory">AnyCategory</option>`;
    arrCat.forEach(cont => {
        category.innerHTML += `<option value="${cont}">${cont}</option>`;
        // console.log(cont);
    })
    // console.log(arrCat);
    }
// FUNCION TIPO DE PREGUNTA

const returnTipo = () => { 
    if(typeQuestions.value!="AnyType"){return "&type="+typeQuestions.value;
    }else{return "";
    }}
const runTypeQuestions = difi =>{
    difi.results.forEach(difArr => {
        if(!(arrype.includes(difArr.type))){arrype.push(difArr.type); 
        }
    });
    typeQuestions.innerHTML = `<option value="AnyType">Any Type</option>`;
    arrype.forEach(cont => {
        typeQuestions.innerHTML += `<option value="${cont}">${cont}</option>`;
    })
    }
document.addEventListener("DOMContentLoaded", fetchAPI);
formTrivia.onsubmit = handleSearchQuestIONS;



