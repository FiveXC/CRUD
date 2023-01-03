/*||*/
//IMPORTANDO TUDO PRO JS============================================================
let mostrarDom = document.querySelector(".mostrarDom")
let btnRegistro = document.querySelector(".btnRegistro")
let AreaCadastro = document.querySelector(".AreaCadastro")
let btnX = document.querySelector(".btnX")
let Preencha = document.querySelector(".Preencha")
let inptNome = document.querySelector(".inptNome")
let inptProf = document.querySelector(".inptProf")
let inptEmail = document.querySelector(".inptEmail")
let inptCidade = document.querySelector(".inptCidade")
let btnCadastrar = document.querySelector(".btnCadastrar")
let btnCancelar = document.querySelector(".btnCancelar")
let inptHidden  = document.querySelector(".inptHidden")
//IMPORTANDO TUDO PRO JS============================================================

//EVENTOS CSS=======================================================================
btnRegistro.addEventListener("click",()=>{
   AreaCadastro.classList.toggle("aparecer")
   inptHidden.value = ``
   inptNome.value = ``
   inptProf.value = ``
   inptEmail.value = ``
   inptCidade.value = ``
})
btnX.addEventListener("click",()=>{
   AreaCadastro.classList.toggle("aparecer")
   inptHidden.value = ``
   inptNome.value = ``
   inptProf.value = ``
   inptEmail.value = ``
   inptCidade.value = ``
})
btnCancelar.addEventListener("click",()=>{
   AreaCadastro.classList.toggle("aparecer")
   inptHidden.value = ``
   inptNome.value = ``
   inptProf.value = ``
   inptEmail.value = ``
   inptCidade.value = ``
})
//EVENTOS CSS=======================================================================

//FAZENDO A VALIDAÇÃO===============================================================
btnCadastrar.addEventListener("click", validando)

function validando(event){
event.preventDefault()

/*Essa é uma função de validação, o if verifica se alguns dos campos estão vazios, para rodar o if tudo
que está dentro do () tem q ser verdadeiro como o vazio é falso com o !(not) transformamos ele em verdadeiro
assim o if consegue rodar sem problemas*/
if(!inptNome.value|| !inptProf.value || !inptEmail.value || !inptCidade.value ){

Preencha.innerHTML = `Preencha os campos`
}
/*Esse else if verifica se o valor de inptHidden está preechido se ele estiver o else if
redireciona para a function editando */ 
else if(inptHidden.value){
   editando()
}
/*Esse else if verifica se o valor de inptHidden é vazio se ele for ele vai redirecionar para a função salvando()*/ 
else if(!inptHidden.value){ 
   spanNome.innerHTML = ``
   salvando(event)

}
}
//FAZENDO A VALIDAÇÃO===============================================================

//SALVANDO LOCALSTORAGE=============================================================

/*Aqui estamos criando uma variavel e colocando dentro dela a "__Chave__" essa chave contém os dados
estamos pegando essa chave como o "getItem" e transformando ela em array com JSON.parse mas como essa chave
ainda não existe o primeiro dados é salvo no  []*/ 
let pegandoChave = JSON.parse(localStorage.getItem("__Chave__")) || []

/*Essa a primeira parte dessa função usa o event.preventDefault() para o form não atualizar, depois cria uma 
variavel chamada dados que vai armazenar um objeto com todos os valores dos inptus e com o nmrind que é a quantidade
de itens armazenados dentro de pegandoChave +1 ou seja se pegandoChave tem zero itens, o primeiro item vai receber o
nmrind = 1 se pegandoChave tem 1 item o segundo item vai receber o nmrind = 2, depois de criar a variavel a função vai
botar essa variavel com os dados dentro de pegandoChave usando o ".push" e depois vai redirecionar para a função criandoDom()*/ 
function salvando(event){
event.preventDefault()

let dados = {
  nmrind: pegandoChave.length + 1,
  Nome: inptNome.value,
  Profissão: inptNome.value,
  Email: inptEmail.value,
  Cidade: inptCidade.value,
}

pegandoChave.push(dados)
criandoDom()
AreaCadastro.classList.toggle("aparecer")

}
//SALVANDO LOCALSTORAGE=============================================================

//EDITANDO==========================================================================

/*Essa função editando() usa o forEach para varrer todos os dados que estão dentro de pegandoChave
e com o if vai perguntar se o infosPessoais.nmrind do localstorage é igual ao valor de inptHidden.value
e ele é,pois quando clicamos no botão de editar ele recebe o valor do nmrind do localstorage, quando
o if ver que os valores são iguais ele vai trocar os valores que já estão salvos pelos valores novos
redirecionando pra criandoDom(), afinal em criandoDom()está o código que seta as infos ou sejá atualizando
o localstorage*/ 

function editando(){

pegandoChave.forEach(function(infosPessoais){

if(infosPessoais.nmrind == inptHidden.value){
infosPessoais.Nome = inptNome.value
infosPessoais.Profissão = inptProf.value
infosPessoais.Email = inptEmail.value
infosPessoais.Cidade = inptCidade.value
}
}
)
criandoDom()
AreaCadastro.classList.toggle("aparecer")
}
  
      

//EDITANDO==========================================================================

//CRIANDO DOM=======================================================================

/*Essa função primeiramente cria a "__Chave__" usando o "setItem" e coloca dentro dessa chave o pegandoChave
que tem os dados dentro dele mas para ele entrar ele precisa está em formato de array por isso usamos o JSON.stringify

"mostrarDom.innerHTML = `` "  Aqui estamos ocultando todos os outros dados para quando vc preencher o cadastro e cliclar em salvar
só aparecer aquele que vc acabou de cadastrar, e não os outros dados que já foram cadastrados
*/

function criandoDom(){
   localStorage.setItem("__Chave__", JSON.stringify(pegandoChave))
   mostrarDom.innerHTML = ``
  
   /*Aqui estamos criando o Dom, com forEach estamos varrendo todos os itens(array) dentro de pegandoChave e chamando
   itens atraves do nome dele EX: `${infos.Nome}` assim poderemos exibir os dados que estão no localstorage 
   no frontend*/ 
   pegandoChave.forEach(function(infos){

      let trDom = document.createElement("tr");
      trDom.setAttribute("scope", "col")
      mostrarDom.appendChild(trDom)

     let tdnmrInd = document.createElement("td")
     tdnmrInd.innerHTML = `${infos.nmrind}`
     trDom.appendChild(tdnmrInd )

     let tdNome = document.createElement("td")
     tdNome.innerHTML = `${infos.Nome}`
     trDom.appendChild(tdNome)

     let tdprof = document.createElement("td")
     tdprof.innerHTML = `${infos.Profissão}`
     trDom.appendChild(tdprof)

     let tdEmail= document.createElement("td")
     tdEmail.innerHTML = `${infos.Email}`
     trDom.appendChild(tdEmail)

     let tdCidade = document.createElement("td")
     tdCidade.innerHTML = `${infos.Cidade}`
     trDom.appendChild(tdCidade)

     let tdBtnEditar = document.createElement("td")
     trDom.appendChild(tdBtnEditar)

     let tdBtnExcluir = document.createElement("td")
     trDom.appendChild(tdBtnExcluir)

     let btnEditar = document.createElement("button")
     btnEditar.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
     btnEditar.classList.add("btnEditar")
     tdBtnEditar.appendChild(btnEditar)

     /*Aqui estamos dizendo que ao clicar no botão de editar ele vai varrer todos os itens(array) que
     estão dentro de pegandoChave com for e vai ver se o nmrind do item que a gente acabou de clicar é igual
     a algum nmrind que tem no localstorage,se for ele vai botar os itens(array) que já estão salvos no localstorage
     dentro dos campos de input*/ 
     btnEditar.onclick = ()=>{
     AreaCadastro.classList.toggle("aparecer")
      for(let i=0; i<pegandoChave.length; i++){
         if(pegandoChave[i].nmrind == infos.nmrind){
            inptHidden.value = infos.nmrind
            inptNome.value = infos.Nome
            inptProf.value = infos.Profissão
            inptEmail.value = infos.Email
            inptCidade.value = infos.Cidade
         }
      } 
    }
    let btnExcluir = document.createElement("button")
    btnExcluir.innerHTML = `<i class="fa-solid fa-trash"></i>`
    btnExcluir.classList.add("btnExcluir")
    tdBtnExcluir.appendChild(btnExcluir) 
    /*Aqui estamos dizendo que ao clicar no botão de excluir ele vai varrer todos os itens(array) que
     estão dentro de pegandoChave com for e vai ver se o nmrind do item que a gente acabou de clicar é igual
     a algum nmrind que tem no localstorage,se for ele vai excluir esse item(array) usando o splice e depois
     vai seta isso redirecionando para o criandoDom que vai atualizar e não vai ter mais esse item(array)
    */
    btnExcluir.onclick = ()=>{
      for(let i=0; i < pegandoChave.length; i++){
         if(pegandoChave[i].nmrind == infos.nmrind){
            pegandoChave.splice(i, 1)
         }
      }
      criandoDom()
    }
   })
}
criandoDom()
/*Aqui a gente ta dizendo que ao iniciar o site rode o criandoDom() ou seja
quando vc iniciar o site ou da f5 ele vai criar o Dom varrer o pegandoChave com forEach e
exibir esse dados do localstorage para o usúario ver*/

//CRIANDO DOM=======================================================================


/*<tr scope = "col">
   <td>${infos.nmrInd}</td>
   <td>${infos.Nome}</td>
   <td>${infos.Senha}</td>
   <td>${infos.Email}</td>
   <td>${infos.Cidade}</td>
   <td><button class = "bntEditar">`<i class="fa-solid fa-pen-to-square"></i>`</button></td>
   <td><button class = "bntExcluir">`<i class="fa-solid fa-trash"></i>`</button></td>
   </tr>*/ 






