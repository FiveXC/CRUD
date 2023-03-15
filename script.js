/*||*/
//IMPORTANDO TUDO PRO JS============================================================
let mostrarDom = document.querySelector(".mostrarDom")
let btnRegistro = document.querySelector(".btnRegistro")
let form  = document.querySelector(".form")
let input = document.querySelectorAll(".input")
let btnCadastrar = document.querySelector(".btnCadastrar")
let areasInputs = document.querySelectorAll(".areasInputs")
let span = document.querySelectorAll(".span")
let span2 = document.querySelectorAll(".span2")
let inputHidden = document.querySelector(".inputVazio")
let inputFiltro = document.querySelector(".inputFiltro")
let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//IMPORTANDO TUDO PRO JS============================================================

btnRegistro.addEventListener('click', ()=>{
   resetandoInputs()
   form.classList.toggle("aparecer")
})

btnCadastrar.addEventListener('click', (e)=>{

e.preventDefault();

   if(!input[0].value || !input[1].value ||  !input[2].value){
      nomeVazio()
      idadeVazio()
      emailVazio()
   }
   else if(input[1].value  < 18 || input[1].value.length > 3){
      idadeVazio()
   }
   else if(!inputHidden.value){ 
      salvando()
      form.classList.toggle("aparecer")
    }
   else if(inputHidden.value){
      editando()
      form.classList.toggle("aparecer")
    }

 

})

function nomeVazio(){
   if(!input[0].value){
      erro(0)
   }
   else{
      resolvido(0)
   }
}

function idadeVazio(){
  
   if(input[1].value.length > 3  ){
      input[1].value =  input[1].value.slice(0,3);
   }
   if( input[1].value > 115){
      input[1].value =  input[1].value.slice(0,2);
   }
   
   
   if(!input[1].value){
      erro(1)
   }
   else{
   resolvido(1)
   }  
   
  if(input[1].value >= 1 && input[1].value  < 18 ){

   areasInputs[1].style.border = "1px solid red"
   span2[0].innerHTML = `Você precisa ser maior de idade`
   }
   else{
      span2[0].innerHTML = ``
   }

}

function emailVazio(){

if(!emailRegex.test(input[2].value)){
   erro(2)  
}else{
   resolvido(2)     
}

if(!input[2].value){
   span[2].style.display = "none"
   span2[1].innerHTML = `Preencha este campo`
}
else{
   span2[1].innerHTML = ``
}

}
function erro(index){
   areasInputs[index].style.border = "1px solid red"
   span[index].style.display = "block"

}


function resolvido(index){
   areasInputs[index].style.border = ""
   span[index].style.display = ""
}


function editando(){

pegandoChave.forEach(function(infosPessoais){

if(infosPessoais.ID == inputHidden.value){
   infosPessoais.nome = input[0].value.toLowerCase()
   infosPessoais.idade = input[1].value.toLowerCase()
   infosPessoais.email = input[2].value.toLowerCase()
}

if(inputFiltro){
   setando()
   filtro()
}
 else{
   setando()
   pegandoChaveCompleto()
   resetandoInputs()
 }  



})
alert("Alterado com sucesso")
}   


let pegandoChave = JSON.parse(localStorage.getItem("chave")) || []
 
function salvando(){

let dados = {
   ID: pegandoChave.length  + 1,
   nome: input[0].value.toLowerCase(),
   idade: input[1].value.toLowerCase(),
   email: input[2].value.toLowerCase(),
}

let registrar = false
for(let i = 0; i < pegandoChave.length; i++){
   if(pegandoChave[i].email === input[2].value ){
      alert("Esse Email já foi salvo")
       registrar = true
   }
}

if(!registrar){
      pegandoChave.push(dados)
      pegandoChaveCompleto()
      resetandoInputs()
}
}

function pegandoChaveCompleto(){
   mostrarDom.innerHTML = ""
   setando()
   pegandoChave.forEach(function(infos){
      adicionandoTabelas(infos)
   })
}
pegandoChaveCompleto()


function filtro(){

   if(!inputFiltro.value){
      pegandoChaveCompleto()
   }
   else{
    let pegandoChaveFiltrado =  pegandoChave.filter(function(todosItens){
      mostrarDom.innerHTML = "" 
          return todosItens.nome.includes(inputFiltro.value.toLowerCase().trim())
      })

      pegandoChaveFiltrado.forEach(function(infos){ 
 
         adicionandoTabelas(infos)
      })
   }


}

function adicionandoTabelas(infos){
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

     let tdBtnExcluir = document.createElement("td")
     trDom.appendChild(tdBtnExcluir)

     let btnEditar = document.createElement("button")
     btnEditar.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
     btnEditar.classList.add("btnEditar")
     tdBtnEditar.appendChild(btnEditar)

     btnEditar.onclick = ()=>{
      resetandoInputs()
     form.classList.toggle("aparecer")
      for(let i=0; i< pegandoChave.length; i++){
         if(pegandoChave[i].ID == infos.ID){
            inputHidden.value = infos.ID
            input[0].value = infos.nome
            input[1].value = infos.idade
            input[2].value = infos.email
         }
      } 
      setando()
      inputFiltro.value = ""
    }
    let btnExcluir = document.createElement("button")
    btnExcluir.innerHTML = `<i class="fa-solid fa-trash"></i>`
    btnExcluir.classList.add("btnExcluir")
    tdBtnExcluir.appendChild(btnExcluir) 

    btnExcluir.onclick = ()=>{
      for(let i=0; i < pegandoChave.length; i++){
         if(pegandoChave[i].ID == infos.ID){
            pegandoChave.splice(i, 1)
         }
      }
      setando()
      pegandoChaveCompleto()
      alert("Excluido com sucesso")
      inputFiltro.value = ""
    }
}

/*FUNÇÕES AUXILIARES=========================================================*/ 
function setando(){
   localStorage.setItem("chave", JSON.stringify(pegandoChave))
}


function resetandoInputs(){
   input[0].value = ""
   input[1].value = ""
   input[2].value = ""
   inputHidden.value = ""
   resolvido(0)
   resolvido(1)
   resolvido(2)
  
}

/*FUNÇÕES AUXILIARES=========================================================*/ 
