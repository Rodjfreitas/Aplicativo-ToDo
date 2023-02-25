const imagemsol = document.querySelector('.sol')
const imagemlua = document.querySelector('.lua')
const divs = document.querySelectorAll('.minhas-divs')
const resumo = document.querySelector('.resume')
const divElements = document.getElementById('#secaoMain')
let temLabelChecada = false
var arrayDeDivs = []
let x = 0
let lancamentoAnterior;


//Os dois eventos abaixo são responsáveis pela alteração de temas
imagemsol.addEventListener('click', function(){
    document.body.classList.toggle('light')
    
})
imagemlua.addEventListener('click', function(){
    document.body.classList.toggle('light')
    
})



//Esta função estiliza o circulo da caixa principal
function checkedInput(){
    const checkbox = document.querySelector("#meuCheckbox")
    const caixaSelecao = document.querySelector('.checkbox-wrapper')
    const label = document.querySelector('label')
    if(checkbox.checked == true){
        label.style.color = "var(--light-tema)"
        caixaSelecao.style.backgroundColor = "var(--global-check)"
        
    }else{
        label.style.color = "var(--light-tema)"
        caixaSelecao.style.backgroundColor = "var(--global-check)"
    }
}



//Evento de Clique automático no filtro todos para atualizar sempre que adicionado nova tarefa
function cliqueLabelAll(){
    const filterAll = document.querySelector('.all')
    const cliqueEvent = new MouseEvent('click')
    filterAll.dispatchEvent(cliqueEvent)
}



//Esta função é responsável por criar os elementos de tarefas adicionados
function createDivs(){
    const checkCaixa = document.querySelector('#meuCheckbox')
    const inputText = document.querySelector('.inputTodo') 


    //cria a div que armazena todo conteúdo de cada tarefa inserida
    const caixa = document.createElement('div')
    caixa.setAttribute('class',`minhas-divs div${x}`)
    caixa.setAttribute('draggable','true')
    caixa.setAttribute('dragstart',dragStart)
    

    if(checkCaixa.checked == true){
        if(inputText.value != ""){
            //cria a div que armazena a label e o input
            const chk = document.createElement('div')
            chk.setAttribute('class',`checkbox-wrapper num${x}`)

            //cria o input
            const selecao = document.createElement('input')
            selecao.setAttribute('id',`meuCheckbox-${x}`)
            selecao.setAttribute('class','meuCheckbox')
            selecao.setAttribute('type','checkbox')
            selecao.setAttribute('onclick','colorirOption()') 

            //cria label
            const textLabel = document.createElement('label')
            textLabel.setAttribute('class',`labelMain lm${x}`)
            textLabel.setAttribute('for',`meuCheckbox-${x}`)
            textLabel.content = "\u2713"

            //adiciona uma valor a x para histórico da próxima tarefa criadad
            x++

            //armazena texto inserido na caixa principal
            const textoInput = document.createElement('p')
            textoInput.setAttribute('class','inputTodo')
            textoInput.innerText = inputText.value

            //Inclui todos os elementos criados na div principal e no array
            chk.appendChild(textLabel)
            chk.appendChild(selecao)
            caixa.appendChild(chk)
            caixa.appendChild(textoInput)
            arrayDeDivs.push(caixa)

            const secaoMain = document.querySelector('#secaoMain')
             //eventos para mover e arrastar na div secaoMain
            secaoMain.setAttribute('drop',drop)
            secaoMain.setAttribute('dragover',allowDrop) 
            secaoMain.appendChild(caixa)

            //atualiza as informações
            checkCaixa.checked = false
            inputText.value = ""
            cliqueLabelAll()
            inputText.focus()

            mostrarResumo()            
            verificarChecked()

        }else{
            //mensagem de erro quando nenhum texto é inserido na caixa principal
            alert('Adicione uma tarefa antes de clicar.')
            checkCaixa.checked = false        
            inputText.focus()
        }
    }  

}



//Esta função atribui uma cor para uma dos filtros selecionados no rodapé da página
function colorirLabel(){
    const divLabels = document.querySelector('.resume')
    var labels = divLabels.getElementsByTagName('label')

    for(var i = 0; i < labels.length; i++){
        var input = document.getElementById(labels[i].htmlFor)
        if(input.checked){
            labels[i].style.color = "var(--label-selected)"
        }else{
            labels[i].style.color = ""
        }
    } 
}



//Esta função atribui um estilo para quando clica no circulo de alguma tarefa inserida
function colorirOption(){
    var mydivs = document.querySelector(`#secaoMain`)
    var labels = mydivs.getElementsByTagName('label')
    
    for(var i = 0; i < labels.length; i++){
        const opt = document.querySelector(`.num${i}`)
        var input = document.getElementById(labels[i].htmlFor)

        const divSet = document.querySelector(`.div${i}`)
        var paragraphText = divSet.querySelector('p')

        if(input.checked){            
            opt.style.backgroundColor = "var(--global-check)"
            labels[i].style.color = "var(--light-tema)"
            paragraphText.style.textDecoration = "line-through"
        }else{
            opt.style.backgroundColor = ""
            labels[i].style.color = ""
            paragraphText.style.textDecoration = ""
        }
    }  

    verificarChecked()
}



//Esta função mostra o resumo com as opções de filtros caso exista alguma tarefa inserida   
function mostrarResumo(){
    if(arrayDeDivs.length > 0){
        resumo.style.display = "flex"
    }else{
        resumo.style.display = "none"
    }
}



//Esta função atualiza a quantidade total de itens adicionados à lista
function atualizarResume(n){    
    let qtdItens = document.querySelector('.qtdResumo')    
    qtdItens.innerText = `${Number(arrayDeDivs.length - n)} items left`
}



//função que adiciona um valor de contagem para ser subtraido do total de itens quando um item for checked
function verificarChecked(){
    var mydivs = document.querySelector(`#secaoMain`)
    var labels = mydivs.getElementsByTagName('label')
    var contagem = 0
    for(var i = 0; i < labels.length; i++){
        var input = document.getElementById(labels[i].htmlFor)        
        

        if(input.checked){            
            contagem++            
        }
        atualizarResume(contagem)
    } 
}



//Parâmetro para as opções de filtros
function filtros(opcoes){
    if(opcoes.checked){
        return true
    }else{
        return false
    }
}



//selecionando a opção de filtro Todos
function filtrandoTudo(){
    let filterAll = document.querySelector('#filterAll')
    if(filtros(filterAll)){

        var mydivs = document.querySelector(`#secaoMain`)
        var labels = mydivs.getElementsByTagName('label')
        
        for(var i = 0; i < labels.length; i++){
            const tarefa = document.querySelector(`.div${i}`)
            var input = document.getElementById(labels[i].htmlFor)
    
            if(input.checked){            
                tarefa.style.display = "flex"
            }else{
                tarefa.style.display = "flex"
            }
        } 

    }
    //atualiza a contagem
    verificarChecked() 
}



//selecionando a opção de filtro Ativos
function filtrandoAtivos(){
    let filterAct = document.querySelector('#filterAct')
    if(filtros(filterAct)){

        var mydivs = document.querySelector(`#secaoMain`)
        var labels = mydivs.getElementsByTagName('label')
        
        
        for(var i = 0; i < labels.length; i++){
            const tarefa = document.querySelector(`.div${i}`)
            var input = document.getElementById(labels[i].htmlFor)
    
            if(input.checked){            
                tarefa.style.display = "none"
                
            }else{
                tarefa.style.display = "flex"
                
            }
        } 

    }
    //atualiza a contagem
    verificarChecked() 
}



//selecionando a opção de filtro completos
function filtrandoCompletos(){
    let filterCom = document.querySelector('#filterCom')
    let qtdItens = document.querySelector('.qtdResumo')
    if(filtros(filterCom)){

        var mydivs = document.querySelector(`#secaoMain`)
        var labels = mydivs.getElementsByTagName('label')
        var contagem = 0
        
        for(var i = 0; i < labels.length; i++){
            const tarefa = document.querySelector(`.div${i}`)
            var input = document.getElementById(labels[i].htmlFor)
    
            if(input.checked){            
                tarefa.style.display = "flex"
                contagem++
            }else{
                tarefa.style.display = "none"
            }
        } 

    }

    //atualiza a contagem (neste caso apenas os itens que foram marcados)    
    qtdItens.innerText = `${Number(contagem)} items completed` 
}



//Esta direciona o clique de clear completes verificando se há itens checados ou não
function chamarExclusao(){
    verificarTarefasSelecionada()

    if(!temLabelChecada){
        alert('Não há tarefas marcadas para exclusão.')
    }else{
        ClearChecked() 
    }
}



//Esta função é responsável por verificar se existe alguma tarefa checada
function verificarTarefasSelecionada(){
    var mydivs = document.querySelector(`#secaoMain`)
    var labels = mydivs.getElementsByTagName('label')
    

    for(let i = 0; i < arrayDeDivs.length;i++){
        var input = document.getElementById(labels[i].htmlFor)

        if(input.checked){
            temLabelChecada = true
            break
        }
    }
}



//Esta função é responsável por apgar as tarefas selecionadas e renomear as restantes
function ClearChecked(){

    var mydivs = document.querySelector(`#secaoMain`)
    var labels = mydivs.getElementsByTagName('label')
    var checados = [] 
    var naochecados =[]
    var novos = []
    

 
    
    //faz o levantamento dos índices de quais itens foram marcados e os coloca em um array
    for(var i = 0; i < labels.length; i++){
        
        var input = document.getElementById(labels[i].htmlFor)     
        
             
        //identifica quais índices foram checados e quais não foram
        if(input.checked){ 
            checados.push(i)
                                             
        } else{
            naochecados.push(i)
        }

        
        console.log(naochecados.length)
    } 
    //exclui todos os itens marcados através dos índices indicados no array
    for(var i = 0; i < checados.length;i++){
        var j = checados[i]
        const tarefa = mydivs.querySelector(`.div${j}`)
        tarefa.remove()
        //exluir arrays referente as divs apagadas
        const index = arrayDeDivs.indexOf(tarefa)
        if(index > -1){ 
        arrayDeDivs.splice(index,1)        
        }
        lancamentoAnterior = x
        x--
    }

    for(var i = 0; i < naochecados.length; i++){
        novos.push(i)        
    }

    
    //renomear os elementos para reordenação
    for(var i = 0; i < arrayDeDivs.length; i++){

        var alt = naochecados[i]       
        var newOrder = novos[i]
        const mydivs = document.querySelector(`#secaoMain`)
        const divPrincipal = document.querySelector(`.minhas-divs.div${alt}`)
        const divSecundaria = document.querySelector(`.checkbox-wrapper.num${alt}`)
        const inputPrincipal = document.getElementById(`meuCheckbox-${alt}`)
        const labelPrincipal = document.querySelector(`.labelMain.lm${alt}`)

          
        
        console.log(`valor do alt: ${alt}`)
        if(divPrincipal !== null){
            
            labelPrincipal.setAttribute('class',`labelMain lm${newOrder}`)
            labelPrincipal.setAttribute('for',`meuCheckbox-${newOrder}`)
            inputPrincipal.setAttribute('id',`meuCheckbox-${newOrder}`)
            divSecundaria.setAttribute('class',`checkbox-wrapper num${newOrder}`)
            divPrincipal.setAttribute('class',`minhas-divs div${newOrder}`)
            
        }


    }
    
    //volta os itens checados para falso
    temLabelChecada = false
    
    cliqueLabelAll()
}






function dragStart(event){
    //define o id da div sendo arrastada
    event.dataTransfer.setData('text/plain', event.target.id)
}



function drop(event) {
    event.preventDefault()

    //pega o id da div sendo arrastada
    const data = event.dataTransfer.getData('text/plain')

    //move a div arrastada para o destino
    const element =document.getElementById(data)
    event.target.appendChild(element)
}

function allowDrop(event){
    event.preventDefault()
}



