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

input[1].addEventListener('keydown', function(event) {
    // permite somente números e as teclas de navegação (setas, backspace, delete)
if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Backspace" && event.key !== "Delete" && isNaN(parseInt(event.key))) {
      event.preventDefault();
    }
 });


function aparecendoFormZerandoInputs(){
    form.classList.toggle("aparecer")
    input[0].value = ""
    input[1].value = ""
    input[2].value = ""
    inputFiltro.value = ""
    inputHidden.value = ""
    span[0].style.display = "none"
    span[1].style.display = "none"
    span[2].style.display = "none"
    span2[0].innerHTML = ``
    span2[1].innerHTML = ``
    areasInputs[0].style.border = ""
    areasInputs[1].style.border = ""
    areasInputs[2].style.border = ""
}


btnAparecerModal.addEventListener("click", ()=>{
    aparecendoFormZerandoInputs()
})

//VALIDAÇÕES========================================================================

btnSalvar.addEventListener("click", (e)=>{
e.preventDefault()

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

//VALIDAÇÕES AO ESCREVER NO INPUT===================================================
function nomeVazio(){

    if(input[0].value){
        resolvido(0)
    }
    else{
        erro(0)
    }
}

function idadeVazio(){

    if(input[1].value ){
        resolvido(1)
    }
    else{
        erro(1)
   }
 
   if (input[1].value !== '' && input[1].value < 18) {
        span2[0].innerHTML = "Você precisa ser maior de idade"
        areasInputs[1].style.border = "1px solid red"
    } else {
        span2[0].innerHTML = ""
    }

   if(input[1].value.length > 3){
        input[1].value = input[1].value.slice(0,3)
   }
 
   if(input[1].value > 116){
    alert("116 é a idade limite")
    input[1].value = input[1].value.slice(0,2)
    if(input[1].value < 18){
      span2[0].innerHTML = "Você precisa ser maior de idade"
      areasInputs[1].style.border = "1px solid red"
    }
    else{
      span2[0].innerHTML = ""
    }
   }

}

function emailVazio(){
    if(emailRegex.test(input[2].value)){
        resolvido(2)
    }
    else{
        erro(2)
    }

    if(input[2].value){
        span2[1].innerHTML = ""
    }
    else{
        span2[1].innerHTML = "Preencha este campo"
        span[2].style.display = "none"
    }
}

function resolvido(index){
    span[index].style.display = "none"
    areasInputs[index].style.border = ""
}
function  erro(index){
    span[index].style.display = "block"
    areasInputs[index].style.border = "1px solid red"
}

//VALIDAÇÕES AO ESCREVER NO INPUT===================================================



//INSERINDO DADOS NO LOCAL==========================================================
let pegandoChave = JSON.parse(localStorage.getItem("chave")) || []

function inserindoDadosNolocal(){

let dados = {
    nome: input[0].value.toLowerCase(),
    idade: input[1].value.toLowerCase(),
    email: input[2].value.toLowerCase(),
}

let temNoLocal = false 

for(let i = 0; i < pegandoChave.length; i++){
    if(pegandoChave[i].email === input[2].value){
        alert("Esse email já está salvo")
        temNoLocal = true 
    }
}

if(!temNoLocal){
    pegandoChave.push(dados)
    pegandoChaveCompleto()
    aparecendoFormZerandoInputs()
}

}
//INSERINDO DADOS NO LOCAL==========================================================


function pegandoChaveCompleto(){

    mostrarDom.innerHTML = ""
    localStorage.setItem("chave", JSON.stringify(pegandoChave))

    pegandoChave.forEach(function(infos){
        criandoTabela(infos)
    })
}
pegandoChaveCompleto()

//INSERINDO DADOS NO LOCAL==========================================================


//FILTRO============================================================================

function filtro(){
   
    if(!inputFiltro.value){
        pegandoChaveCompleto()
    }
    else{
    let pegandoChaveFiltrado = pegandoChave.filter(function(infosFiltradas){
        mostrarDom.innerHTML = ""
        return infosFiltradas.nome.includes(inputFiltro.value.toLowerCase().trim())
    })
    
    pegandoChaveFiltrado.forEach(function(infos){
        criandoTabela(infos)
    })
    }
}

//FILTRO============================================================================

function criandoTabela(infos){

    let trDom = document.createElement("tr");
    trDom.setAttribute("scope", "col")
    trDom.classList.add("trDom")
    mostrarDom.appendChild(trDom)


   let tdNome = document.createElement("td")
   tdNome.innerHTML = `${infos.nome}`
   trDom.appendChild(tdNome)

   let tdsenha = document.createElement("td")
   tdsenha.innerHTML = `${infos.idade}`
   trDom.appendChild(tdsenha)

   let tdEmail= document.createElement("td")
   tdEmail.innerHTML = `${infos.email}`
   trDom.appendChild(tdEmail)


   let tdBtnEditar = document.createElement("td")
   trDom.appendChild(tdBtnEditar)

   let btnEditar = document.createElement("button")
   btnEditar.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
   btnEditar.classList.add("btnEditar")
   tdBtnEditar.appendChild(btnEditar)

   btnEditar.onclick = ()=>{
   form.classList.toggle("aparecer")
    for(let i=0; i< pegandoChave.length; i++){
       if(pegandoChave[i].email == infos.email){
          inputHidden.value = infos.email
          input[0].value = infos.nome
          input[1].value = infos.idade
          input[2].value = infos.email
       }
    } 
  }

   let tdBtnExcluir = document.createElement("td")
   trDom.appendChild(tdBtnExcluir)

   let btnExcluir = document.createElement("button")
    btnExcluir.innerHTML = `<i class="fa-solid fa-trash"></i>`
    btnExcluir.classList.add("btnExcluir")
    tdBtnExcluir.appendChild(btnExcluir) 

    btnExcluir.onclick = ()=>{

      for(let i=0; i < pegandoChave.length; i++){
         if(pegandoChave[i].email == infos.email){
            pegandoChave.splice(i, 1)
         }
      }
      pegandoChaveCompleto()
      inputFiltro.value = ""
      alert("Excluido com sucesso")
    }
}


//EDITANDO====================================

function editando(){

    pegandoChave.forEach(function(infosPessoais){
    
    if(infosPessoais.email == inputHidden.value){
       infosPessoais.nome = input[0].value.toLowerCase()
       infosPessoais.idade = input[1].value.toLowerCase()
       infosPessoais.email = input[2].value.toLowerCase()
       pegandoChaveCompleto()
       aparecendoFormZerandoInputs()
       alert("Editado com sucesso")
    }     
    })

}  
//EDITANDO====================================
