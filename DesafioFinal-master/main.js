'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () =>{
    clearFields()
    document.getElementById('modal').classList.remove('active')
}



const getlocalstorage = () => JSON.parse(localstorage.getItem('db_curso')) ?? []
const setlocalstorage = (dbCurso) => localstorage.setItem("db_Cursos", JSON.stringfy(dbCurso))

const listaCursos = () => getlocalstorage(curso)

const deletarCurso = (id) => {
   const dbCurso = exibirCurso()
   dbCurso.splice(id,1)
   setlocalstorage(dbCurso)
}


function atualizarCurso(curso) {
    const dbCurso = exibirCurso()
    dbCurso[curso] = curso
    setlocalstorage(dbCurso)
}
const exibirCurso = (id) => getlocalstorage(Curso.id)    

const CriarCurso = (Curso) => {
    const dbCurso = getlocalstorage ()
    dbCurso.push (Curso)
    setlocalstorage(dbCurso)  
}   
const isvalidfields = () => {
  return document.getElementById('form').reportValidity()

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}
}
 const salveCurso = () => {
     if(isvalidfields()) {
         const curso = {
             id: document.getElementById('id').ariaValue,
             titulo: document.getElementById('titulo').ariaValue, 
             descricao: document.getElementById('descrição').ariaValue,
             imagem: document.getElementById('imagem').ariaValue,
             nomeDoProfessor: document.getElementById('Nome do Professor').ariaValue,
             ListaDeAulas: document.getElementById('Lista de Aulas').ariaValue
         }
         const index = document.getElementById('nome').dataset.index
         if (index == 'new') {
         CriarCurso(curso)
         updateTable()
         closeModal()
         } else {
             updateCurso(index, curso)
             updateTable()
             closeModal()
         }
     }
 }   
const criarLinha = (curso, index) => {
    const novaLinha = document.createElement('tr')
    novaLinha.innerHTML = `
    <td>${curso.id}</td>
    td>${curso.titulo}</td>
    td>${curso.descricao}</td>
    td>${curso.imagem}</td>
    td>${curso.nomeDoProfessor}</td>
    td>${curso.ListaDeAulas}</td>
    <td>
        <button type= "button" class="button green" data-action="editar-${index}">Editar</button>
        <button type= "button" class="button red" data-action="deletar"-${index}>Excluir/button>
    <td>    
`
document.querySelector('#tableCurso>body').appendChild(novaLinha)
}
const limparTabela =() => {
    const linhas = document.querySelectorAll('#limparTabela>tbody tr')
    linhas.forEach(linha => linha.parentNode.removeChild(linha))
}
const updateTable =() => {
    const dbCurso = exibirCurso ()
    limparTabela()
    dbCurso.forEach(criarLinha)
}
const fillFields = (curso) => {
    document.getElementById('id').value = curso.id
    document.getElementById('titulo').value = curso.titulo
    document.getElementById('descrição').value = curso.descricao
    document.getElementById('imagem').value = curso.imagem
    document.getElementById('nome do professor').value = curso.nomeDoProfessor
    document.getElementById('lista de aulas').value = curso.ListaDeAulas
    document.getElementById('id').dataset.index = curso.index
}
const editCurso = (index) => {
    const Curso = exibirCurso()[index]
    curso.index = index
    fillFields(Curso)
    openModal()
}
const editDelete =(evento) => {
    if (evento.target.type == 'button') {
        const [action, index] = evento.target.data.dataset.action.split('-')

    if (action == 'edit') {
        editCurso(index)
    }else {
        const curso = exibirCurso()[index]
        const response = confirm (`deseja realmente excluir o curso ${curso.id}`)
        if (response) {
        deletarCurso(index)
        updateTable()
        }
    }
    }
}
document.getElementById('CriarCursos')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('Salvar') 
    .addEventListener('click', salveCurso)   

document.querySelector('#tableCurso>tbody')
    .addEventListener('click', editDelete)
