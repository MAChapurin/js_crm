import { CustomSelect, Client } from "./dropDown.js";

const values = ['phone','phone2','phone3', 'mail', 'vk', 'fb'];

function createEl(tagName) {
  return document.createElement(tagName)
}

export function deleteModale() {
  const modal = document.querySelector('.modal');
    if(modal) {
      document.body.removeChild(modal);
    }
}

export function renderModal(cbAdd) {
  const modal = createEl('div');
  modal.setAttribute('data-type', 'modal');
  modal.classList.add('modal');
  const modalBlock = document.createElement('div');
  modalBlock.classList.add('modal__block', 'modal__block--add');
  const header = createEl('div');
  header.classList.add('modal__header');
  const h2 = createEl('h2');
  h2.classList.add('modal__h2');
  h2.textContent = 'Новый клиент';
  const btnClose = createEl('button');
  btnClose.classList.add('modal__close');
  btnClose.addEventListener('click', deleteModale);
  header.append(h2, btnClose);

  const inputSurname = document.createElement('input');
  inputSurname.name = 'surname';
  inputSurname.type = 'text';
  inputSurname.placeholder = 'Фамилия*';
  inputSurname.classList.add('modal__input');

  const inputName = document.createElement('input');
  inputName.name = 'name';
  inputName.type = 'text';
  inputName.placeholder = 'Имя*';
  inputName.classList.add('modal__input');

  const inputMiddleName = document.createElement('input');
  inputMiddleName.name = 'middlename';
  inputMiddleName.type = 'text';
  inputMiddleName.placeholder = 'Отчество';
  inputMiddleName.classList.add('modal__input');

  const contactsBlock = document.createElement('div');

  const btnAdd = document.createElement('button');
  btnAdd.classList.add('modal__add');
  const plus = document.createElement('span');
  plus.classList.add('plus');
  plus.textContent = '+';
  btnAdd.append(plus)
  btnAdd.append('Добавить контакт');
  btnAdd.addEventListener('click', ()=> {
    contactsBlock.append(createDropDown());
  })

  const btnSave = document.createElement('button');
  btnSave.classList.add('modal__save');
  btnSave.textContent = 'Сохранить';
  btnSave.addEventListener('click', () => {
    const contacts = []
    contacts.length = 0;
    contactsBlock.querySelectorAll('.dropdown-block').forEach(el => {
      const contact = {}
       contact.type = el.querySelector('.select__value').textContent;
       contact.value = el.querySelector('.dropdown__input').value;
       contacts.push(contact)
    })
    const newClient = new Client(inputName.value, inputMiddleName.value, inputSurname.value, contacts);
    cbAdd(newClient);
  })

  const btnBack = document.createElement('button');
  btnBack.classList.add('modal__back');
  btnBack.textContent = 'Отмена';

  modalBlock.append(header, inputSurname, inputName, inputMiddleName, contactsBlock, btnAdd, btnSave, btnBack);
  // page.app.append(modal);
  modal.append(modalBlock);
  document.body.append(modal);
}

function createDropDownWithDelete(contact=null) {
  const dropDownBlock = document.createElement('div');
    dropDownBlock.classList.add('dropdown-block');
    const dropDownList = document.createElement('div');
    const select = new CustomSelect(dropDownList, values);
    const input = document.createElement('input');
    input.type = 'text';
    input.value = contact ? contact.value : '';
    input.placeholder = 'Введите значение';
    input.classList.add('dropdown__input');
    const btnDeleteInput = document.createElement('button');
    btnDeleteInput.classList.add('modal__btn-delete-input');
    const btnDeleteInputInside = document.createElement('span');
    btnDeleteInputInside.classList.add('modal__btn-delete-input-insisde');
    btnDeleteInputInside.innerHTML = '&#x2613;'
    btnDeleteInput.append(btnDeleteInputInside);
    btnDeleteInput.addEventListener('click', (e)=> {
      e.currentTarget.closest('.dropdown-block').remove();
    })
    dropDownBlock.append(dropDownList, input, btnDeleteInput);
    // contactsBlock.append(dropDownBlock);
    select.value = contact ? contact.type : 'phone';
    return dropDownBlock;
}

export function renderModalFixed(obj, cbDelete, cbUpdate) {
  const modal = createEl('div');
  modal.setAttribute('data-type', 'modal');
  modal.classList.add('modal');
  const modalBlock = document.createElement('div');
  modalBlock.classList.add('modal__block', 'modal__block--add');
  const header = createEl('div');
  header.setAttribute('data-type', 'modal');
  header.classList.add('modal__header');
  const h2 = createEl('h2');
  h2.classList.add('modal__h2');
  h2.textContent = 'Изменить данные';
  const spanId = document.createElement('span');
  spanId.classList.add('modal__id');
  spanId.textContent = `ID: ${obj.id}`;
  h2.append(spanId);

  const btnClose = createEl('button');
  btnClose.classList.add('modal__close');
  btnClose.addEventListener('click', cbDelete);
  header.append(h2, btnClose);

  const labelSurname = document.createElement('span');
  labelSurname.classList.add('modal__label');
  labelSurname.textContent = 'Фамилия*';

  const inputSurname = document.createElement('input');
  inputSurname.name = 'surname';
  inputSurname.type = 'text';
  inputSurname.placeholder = 'Фамилия*';
  inputSurname.value = obj.surname;
  inputSurname.classList.add('modal__input', 'modal__input--fixed');

  const labelName = document.createElement('span');
  labelName.classList.add('modal__label');
  labelName.textContent = 'Имя*';
  const inputName = document.createElement('input');
  inputName.name = 'name';
  inputName.type = 'text';
  inputName.placeholder = 'Имя*';
  inputName.value = obj.name;
  inputName.classList.add('modal__input', 'modal__input--fixed');

  const labelMiddleName = document.createElement('span');
  labelMiddleName.classList.add('modal__label');
  labelMiddleName.textContent = 'Отчество';
  const inputMiddleName = document.createElement('input');
  inputMiddleName.name = 'middlename';
  inputMiddleName.type = 'text';
  inputMiddleName.placeholder = 'Отчество';
  inputMiddleName.value = obj.lastName;
  inputMiddleName.classList.add('modal__input', 'modal__input--fixed');

  const contactsBlock = document.createElement('div');
  contactsBlock.classList.add('contacts-block');
  obj.contacts.forEach((contact)=> {
    contactsBlock.append(createDropDownWithDelete(contact))
  })

  const btnAdd = document.createElement('button');
  btnAdd.classList.add('modal__add');
  const plus = document.createElement('span');
  plus.classList.add('plus');
  plus.textContent = '+';
  btnAdd.append(plus)
  btnAdd.append('Добавить контакт');
  btnAdd.addEventListener('click', ()=> {
    contactsBlock.append(createDropDownWithDelete());
  })

  const btnSave = document.createElement('button');
  btnSave.classList.add('modal__save');
  btnSave.textContent = 'Сохранить';
  btnSave.addEventListener('click', () => {
    const contacts = []
    contacts.length = 0;
    contactsBlock.querySelectorAll('.dropdown-block').forEach(el => {
      const contact = {}
       contact.type = el.querySelector('.select__value').textContent;
       contact.value = el.querySelector('.dropdown__input').value;
       contacts.push(contact)
    })
    const now = new Date();
    const fixedClient = new Client(inputName.value, inputMiddleName.value, inputSurname.value, contacts);
    fixedClient.createdAt = obj.createdAt;
    fixedClient.updatedAt = new Date();
    fixedClient.id = obj.id;

    cbUpdate(fixedClient);
    console.log(fixedClient)
  })

  const btnBack = document.createElement('button');
  btnBack.classList.add('modal__back');
  btnBack.textContent = 'Отмена';

  modalBlock.append(header, labelSurname, inputSurname, labelName, inputName, labelMiddleName, inputMiddleName, contactsBlock, btnAdd, btnSave, btnBack);
  modal.append(modalBlock);
  document.body.append(modal);
}

export function createModalDelete(cb, id) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.setAttribute('data-type', 'modal');
  const modalBlock = document.createElement('div');
  modalBlock.classList.add('modal__block');
  const header = document.createElement('div');
  header.classList.add('modal__header');
  const h2 = document.createElement('h2');
  h2.classList.add('modal__h2');
  h2.textContent = 'Удалить клиента'
  const btnClose = document.createElement('button');
  btnClose.classList.add('modal__close');
  btnClose.addEventListener('click', deleteModale)
  const text = document.createElement('p');
  text.textContent = 'Вы действительно хотите удалить данного клиента?';
  const btnDelete = document.createElement('button');
  btnDelete.classList.add('modal__save');
  btnDelete.textContent = 'Удалить';
  btnDelete.addEventListener('click', ()=> {
    cb(id);
  });

  const btnBack = document.createElement('button');
  btnBack.classList.add('modal__back');
  btnBack.textContent = 'Отмена';
  btnBack.addEventListener('click', deleteModale);

  header.append(h2, btnClose)
  modalBlock.append(header, text, btnDelete, btnBack);
  modal.append(modalBlock);
  document.body.append(modal);
}


function createDropDown() {
  const dropDownBlock = document.createElement('div');
  dropDownBlock.classList.add('dropdown-block');
  const dropDownList = document.createElement('div');
  const values = ['phone','phone2','phone3', 'mail', 'vk', 'fb'];
  new CustomSelect(dropDownList, values);

  const input = document.createElement('input');
  input.type = 'text';
  input.value = '';
  input.placeholder = 'Введите значение';
  input.classList.add('dropdown__input');
  dropDownBlock.append(dropDownList, input);
  return dropDownBlock;
}
