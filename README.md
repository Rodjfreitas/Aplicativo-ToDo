# Lista de tarefas ToDo

Para este projeto, o objetivo é aprimorar os conhecimentos em html e css, com a utilização das boas práticas como tags semânticas em html, declaração de variáveis em css, e apresentar um código limpo e organizado.
Outro objetivo é a evolução e desenvolvimento de habilidades em javascript. Estou me propondo a estudar funções em javascript e desenvolver o domínio sobre elas.



function arrastarDivs(){
const DIV = document.querySelector('.minhas-divs')
// Adiciona o evento de arrastar para as DIVs
document.querySelectorAll('[draggable="true"]').forEach(div => {
    div.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', e.target.id);
      e.target.classList.add('dragging');
    });
  
    div.addEventListener('dragend', e => {
      e.target.classList.remove('dragging');
    });
  });
  
  // Adiciona o evento de soltar para a área onde as DIVs podem ser soltas
  const dropArea = document.getElementById('drop-area');
  dropArea.addEventListener('dragover', e => {
    e.preventDefault();
  });
  
  dropArea.addEventListener('drop', e => {
    e.preventDefault();
    const droppedId = e.dataTransfer.getData('text/plain');
    const droppedElement = document.getElementById(droppedId);
    const dropTarget = e.target.closest('.drop-target');
    dropTarget.insertBefore(droppedElement, e.target);
  });
  
}