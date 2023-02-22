const imagemsol = document.querySelector('.sol')
const imagemlua = document.querySelector('.lua')
const divs = document.querySelectorAll('.minhas-divs')
const resumo = document.querySelector('.resume')
var arrayDeDivs = []
let x = 0



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
        label.style.content = "\u2713"
        label.style.color = "transparent"
        caixaSelecao.style.backgroundColor = "transparent"
    }
}



//Esta função é responsável por criar os elementos de tarefas adicionados
function createDivs(){
    const checkCaixa = document.querySelector('#meuCheckbox')
    const inputText = document.querySelector('.inputTodo')    
    const caixa = document.createElement('div')
    caixa.setAttribute('class',`minhas-divs div${x}`)

    if(checkCaixa.checked == true){
        if(inputText.value != ""){

            const chk = document.createElement('div')
            chk.setAttribute('class',`checkbox-wrapper num${x}`)
            

            const selecao = document.createElement('input')
            selecao.setAttribute('id',`meuCheckbox-${x}`)
            selecao.setAttribute('class','meuCheckbox')
            selecao.setAttribute('type','checkbox')
            selecao.setAttribute('onclick','colorirOption()')

            

            const textLabel = document.createElement('label')
            textLabel.setAttribute('class',`labelMain`)
            textLabel.setAttribute('for',`meuCheckbox-${x}`)
            textLabel.content = "\u2713"
            
            x++

            const textoInput = document.createElement('p')
            textoInput.setAttribute('class','inputTodo')
            textoInput.innerText = inputText.value


            chk.appendChild(textLabel)
            chk.appendChild(selecao)
            caixa.appendChild(chk)
            caixa.appendChild(textoInput)
            arrayDeDivs.push(caixa)

            const secaoMain = document.querySelector('#secaoMain')
            secaoMain.appendChild(caixa)

            checkCaixa.checked = false
            inputText.value = ""

            mostrarResumo()
            atualizarResume()

        }else{
        alert('Adicione uma tarefa antes de clicar.')
        checkCaixa.checked = false
        inputText.focus()
        }
    }
    
}


//Esta função atribui uma cor para uma dos filtros selecionados no rodapé da página
function colorirLabel(){
    const divLabels = document.querySelector('.textOpt')
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
            console.log(labels[i].value)
            paragraphText.style.textDecoration = "line-through"
        }else{
            opt.style.backgroundColor = ""
            labels[i].style.color = ""
            paragraphText.style.textDecoration = ""
        }
    }  


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
function atualizarResume(){
    let qtdItens = document.querySelector('.qtdResumo')

    qtdItens.innerText = `${arrayDeDivs.length} items left`
}
        






