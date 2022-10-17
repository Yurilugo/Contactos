// // CODIGO ORIGINAL 

const { method } = require("lodash");

const form = document.querySelector('#create-contact');
const inputName = document.querySelector('#input-text');
const inputTel = document.querySelector('#input-num');
const lista = document.querySelector('#list');
const eliminarbtns = document.querySelectorAll('.delete-list')
const formBtn = document.querySelector('#boton-create')
const errorMessage = document.querySelector('.error')
const Phone_Regex = /^([0-9]){3}-[0-9]{7}$/;



form.addEventListener('submit', async e => {

    e.preventDefault();
    const response = await fetch ('http://localhost:3004/name&number', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre:inputName.value, num: inputTel.value}) 
    });

    const usuarioCreado = await response.json()
    const listItem = document.createElement('li')
    listItem.id = usuarioCreado.id
    listItem.innerHTML = `
        ${usuarioCreado.nombre} ${usuarioCreado.num}
        <svg xmlns="http://www.w3.org/2000/svg" class="boton delete-list" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
    `;

    const btnDelete = listItem.children[0];
    btnDelete.addEventListener('click', e => {
        e.target.parentElement.remove();
    });



    listItem.classList.add('list-contact');
    lista.append(listItem)
    inputName.value = "";
    inputTel.value = "";
    inputTel.classList.remove('correct');
    formBtn.setAttribute('disabled', true);


});



eliminarbtns.forEach(eliminarbtns => {
    eliminarbtns.addEventListener('click', async e => {
        if (e.target.parentElement.classList.contains('delete-list')) {
            const id = e.target.parentElement.id
            await fetch (`http://localhost:3004/name&number/${id}`, {method: 'DELETE'});
            e.target.parentElement.parentElement.remove();

        }
        e.target.parentElement.remove();
    });
});


inputTel.addEventListener('input', e => {
    const isValid = Phone_Regex.test(e.target.value);

    if (isValid) {
        formBtn.removeAttribute('disabled');
        errorMessage.classList.remove('show');
        inputTel.classList.add('correct');
        inputTel.classList.remove('wrong');
    } else {
        errorMessage.classList.add('show');
        inputTel.classList.remove('correct');
        inputTel.classList.add('wrong');
    }
});
