/*||*/
//IMPORTANDO TUDO PRO JS============================================================
let mostrarDom = document.querySelector(".mostrarDom")
let btnAparecerModal = document.querySelector(".btnAparecerModal")
let form  = document.querySelector(".form")
let input = document.querySelectorAll(".input")
let btnSalvar = document.querySelector(".btnSalvar")
let areasInputs = document.querySelectorAll(".areasInputs")
let span = document.querySelectorAll(".span")
let span2 = document.querySelectorAll(".span2")
let inputHidden = document.querySelector(".inputVazio")
let inputFiltro = document.querySelector(".inputFiltro")
let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//IMPORTANDO TUDO PRO JS============================================================

//IMPEDINDO CARACTERES EXPECIFICOS SEREM ADICIONADO=================================
input[0].addEventListener('keydown', (event) => {
    let regexLetras = /[A-Za-zÀ-ÖØ-öø-ÿ]/; // regex para letras e acentuações
  
    if (!regexLetras.test(event.key)) {
      event.preventDefault(); // impede a inserção do caractere
    }
})
  
input[1].addEventListener('keydown', function(event) {
      // permite somente números e as teclas de navegação (setas, backspace, delete)
  if (isNaN(parseInt(event.key)) && event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Backspace" && event.key !== "Delete" ) {
        event.preventDefault();
      }
});
//IMPEDINDO CARACTERES EXPECIFICOS SEREM ADICIONADO=================================


//APARECENDO MODAL E ZERANDO INPUTS=================================================
function aparecendoFormZerandoInputs(){
  form.classList.toggle("aparecer")

  input.forEach(function(input){
    input.value = ""
  })

  span.forEach(function(span){
    span.style.display = "none"
  })
  
  span2.forEach(function(span2){
    span2.innerHTML = ""
  })

  areasInputs.forEach(function(area){
    area.style.border = ""
  })

  inputHidden.value = ""
  inputFiltro.value = ""

}

btnAparecerModal.addEventListener("click", ()=>{
  aparecendoFormZerandoInputs()
})
//APARECENDO MODAL E ZERANDO INPUTS=================================================

//VALIDAÇÕES AO ESCREVER NO INPUT===================================================
function nomeVazio(){
  if(!input[0].value){
      erro(0)
  }
  else{
    resolvido(0)
  }
}

function idadeVazio(){

  if(!input[1].value){
    erro(1)
   }
  else{
   resolvido(1)
  }

  if(input[1].value.length > 3){
    input[1].value = input[1].value.slice(0,3)
  }

  if(input[1].value > 116){
    input[1].value = input[1].value.slice(0,2)
    alert("A idade máxima é 116")
  }
  
  if(input[1].value != "" && input[1].value < 18){
    span2[0].innerHTML = "Você precisa ser maior de idade"
    areasInputs[1].style.border = "1px solid red"
  }
  else{
    span2[0].innerHTML = ""
  }

}

function emailVazio(){
 
  if(!emailRegex.test(input[2].value)){
    erro(2)
  }
  else{
    resolvido(2)
  }
  if(!input[2].value){
    span2[1].innerHTML = "Preencha este campo"
    span[2].style.display = "none"
  }
  else{
    span2[1].innerHTML = ""
  }
  
}


function erro(index){
  span[index].style.display = "block"
  areasInputs[index].style.border = "1px solid red"
}

function resolvido(index){
  span[index].style.display = "none"
  areasInputs[index].style.border = ""
}
//VALIDAÇÕES AO ESCREVER NO INPUT===================================================

//VALIDAÇÕES========================================================================
btnSalvar.addEventListener("click", (event)=>{
event.preventDefault()

  if(!input[0].value || !input[1].value ||  !input[2].value){
    nomeVazio()
    idadeVazio()
    emailVazio()
  }
  else if(input[1].value < 18){
    idadeVazio()
  }
  else if(!emailRegex.test(input[2].value)){
    emailVazio()
  }
  else if(inputHidden.value){
    editando()
  }
  else{
    inserindoDadosNolocal()
  }
})
//VALIDAÇÕES========================================================================

//INSERINDO DADOS NO LOCAL==========================================================
let pegandoChave = JSON.parse(localStorage.getItem("chaveValores")) || []
  

function inserindoDadosNolocal(){

  let valores = {
    nome: input[0].value.toLowerCase(),
    idade: input[1].value.toLowerCase(),
    email: input[2].value.toLowerCase()
  }

let temNoLocal = false

for(let i = 0; i < pegandoChave.length; i++){
    if(pegandoChave[i].email == valores.email){
        alert("Esse email já está salvo, coloque outro.") 
        temNoLocal = true        
    }
}

if(!temNoLocal){
  pegandoChave.push(valores)
  localStorage.setItem("chaveValores", JSON.stringify(pegandoChave))
  todosItensDoPegandoChave()
  aparecendoFormZerandoInputs()
}

}
//INSERINDO DADOS NO LOCAL==========================================================


//EXIBINDO VALORES DOS INPUTS=======================================================
function todosItensDoPegandoChave(){
  mostrarDom.innerHTML = ""

  pegandoChave.forEach(function(referencia){
    criandoTabela(referencia)
  })
}
todosItensDoPegandoChave()

function filtro(){
  
  if(!inputFiltro){
    todosItensDoPegandoChave()
  }
  else{
    mostrarDom.innerHTML = ""
    let itensPegandoChaveFiltrados = pegandoChave.filter(function(referencia){
            return referencia.nome.includes(inputFiltro.value.toLowerCase().trim());
    })
    
    itensPegandoChaveFiltrados.forEach(function(referencia){
      criandoTabela(referencia)
      
    })

  }

}

function criandoTabela(referencia){

    let trDom = document.createElement("tr");
    trDom.setAttribute("scope", "col")
    trDom.classList.add("trDom")
    mostrarDom.appendChild(trDom)


   let tdNome = document.createElement("td")
   tdNome.innerHTML = `${referencia.nome}`
   trDom.appendChild(tdNome)

   let tdsenha = document.createElement("td")
   tdsenha.innerHTML = `${referencia.idade}`
   trDom.appendChild(tdsenha)

   let tdEmail= document.createElement("td")
   tdEmail.innerHTML = `${referencia.email}`
   trDom.appendChild(tdEmail)


   let tdBtnEditar = document.createElement("td")
   trDom.appendChild(tdBtnEditar)

   let btnEditar = document.createElement("button")
   btnEditar.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
   btnEditar.classList.add("btnEditar")
   tdBtnEditar.appendChild(btnEditar)

   btnEditar.onclick = ()=>{

          form.classList.toggle("aparecer")
          inputHidden.value = referencia.email
          input[0].value = referencia.nome
          input[1].value = referencia.idade
          input[2].value = referencia.email 
  }

   let tdBtnExcluir = document.createElement("td")
   trDom.appendChild(tdBtnExcluir)

   let btnExcluir = document.createElement("button")
    btnExcluir.innerHTML = `<i class="fa-solid fa-trash"></i>`
    btnExcluir.classList.add("btnExcluir")
    tdBtnExcluir.appendChild(btnExcluir) 

    btnExcluir.onclick = ()=>{

      for(let i=0; i < pegandoChave.length; i++){
         if(pegandoChave[i].email == referencia.email){
          pegandoChave.splice(i, 1)
         }
      }
      localStorage.setItem("chaveValores", JSON.stringify(pegandoChave))
      todosItensDoPegandoChave()
      inputFiltro.value = ""
      alert("Excluido com sucesso")
    }
}
//EXIBINDO VALORES DOS INPUTS=======================================================

//EDITANDO VALORES DOS VALORES SALVOS===============================================
function editando(){
  pegandoChave.forEach(function(referencia){

  if(referencia.nome == input[0].value &&  referencia.idade == input[1].value && referencia.email == input[2].value){
    alert("Nenhuma Alteração feita")
    todosItensDoPegandoChave()
    inputFiltro.value = ""   
    form.classList.toggle("aparecer")
  
  }
   else if(referencia.email == inputHidden.value){
      item.nome = input[0].value
      item.idade = input[1].value
      item.email = input[2].value
      localStorage.setItem("chaveValores", JSON.stringify(pegandoChave))
      todosItensDoPegandoChave()
      inputFiltro.value = ""   
      form.classList.toggle("aparecer")
      alert("Alteração salva")
    }

  })
}
//EDITANDO VALORES DOS VALORES SALVOS===============================================
