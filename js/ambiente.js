const imagemsol = document.querySelector('.sol')
const imagemlua = document.querySelector('.lua')

imagemsol.addEventListener('click', function(){
    document.body.classList.toggle('light')
    
})
imagemlua.addEventListener('click', function(){
    document.body.classList.toggle('light')
    
})


function checkedInput(){
    const checkbox = document.querySelector("#meuCheckbox")
    const caixaSelecao = document.querySelector('.checkbox-wrapper')
    const label = document.querySelector('.labelMain')
    if(checkbox.checked == true){        
        label.style.content = "\2713"
        label.style.color = "var(--light-tema)"
        caixaSelecao.style.backgroundColor = "var(--global-check)"
    }else{
        label.style.content = "\u2713"
        label.style.color = "transparent"
        caixaSelecao.style.backgroundColor = "transparent"
    }
}