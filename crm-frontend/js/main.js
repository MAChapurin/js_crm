import { CustomSelect, Client } from "./dropDown.js";
import { dateFormat } from "./date-format.js";
import { sortByName, sortedByDate, sortById, setCurrentSortMethod, arrowUp } from "./sort.js";
import { searchByName } from "./search.js";
import { renderModal, renderModalFixed, createModalDelete, deleteModale } from "./modal.js";

const page = {
  app: document.getElementById('app'),
  search: document.querySelector('.search_input'),
  table: document.querySelector('.table'),
  addBtn: document.querySelector('main__button'),
}

const app = page.app;
let clientsStore = [];

function createEl(tagName) {
  return document.createElement(tagName)
}


function renderHeader() {
  const header = createEl('div');
  header.classList.add('header');
  const logo = createEl('img');
  logo.classList.add('logo');
  logo.src = "img/skb.png";
  logo.alt = "логотип компании skb";
  const input = createEl('input');
  input.addEventListener('input', () => {
    console.log(input.value);
    renderClients(searchByName(clientsStore, input.value));
  })
  input.classList.add('search_input');
  input.type = 'text';
  input.name = 'search_input';
  input.placeholder = 'Введите запрос';
  header.append(logo, input);
  page.app.append(header);
}


function renderMain() {
  const main = createEl('div');
  main.classList.add('main');
  const h1 = createEl('h1');
  h1.classList.add('h1');
  h1.textContent = 'Клиенты';
  const tableHead = createEl('table');
  tableHead.classList.add('table');
  const tableWrap = createEl('div');
  tableWrap.classList.add('table-wrap');
  const tableBody = createEl('table');
  tableBody.classList.add('table-body')
  const thead = document.createElement('thead');
  thead.classList.add('thead');
  const tbody = document.createElement('tbody');
  tbody.classList.add('tbody');
  const tr = createEl('tr');
  const titles = ['ID', 'Фамилия Имя Отчество', 'Дата и время создания', 'Последние изменения', 'Контакты', 'Действия'];
  titles.forEach((title, index) => {
    const th = createEl('th');
    th.classList.add(`th${index}`)
    th.textContent = title;
    tr.append(th);
  })
  thead.append(tr);

  const btn = createEl('button');
  btn.classList.add('main__button');
  const img = createEl('img');
  img.src = 'img/client.svg';
  img.alt = 'Профиль потенциального клиента';
  btn.addEventListener('click', () => {
    renderModal(addClient);
  })
  btn.append(img);
  btn.append('Добавить клиента');
  tableHead.append(thead);
  tableBody.append(tbody)
  tableWrap.append(tableBody)
  main.append(h1, tableHead, tableWrap, btn);
  page.app.append(main);
}


function createArrow(text = '') {
  const arrowBlock = document.createElement('div');
  arrowBlock.classList.add('arrow-down');
  const arrow = document.createElement('img');
  arrow.alt = 'arrow to down';
  arrow.src = 'img/arrow.svg';
  const span = document.createElement('span');
  span.textContent = text;
  arrowBlock.append(arrow, span)
  return arrowBlock;
}


function addSortedListeners() {

  const th0 = document.querySelector('.th0');
  th0.addEventListener('click', (e) => {
    arrowUp(th0);
    if (setCurrentSortMethod('id')) {
      renderClients(clientsStore.reverse())
    } else {
      renderClients(sortById(clientsStore));
    }
  })
  th0.append(createArrow());

  const th1 = document.querySelector('.th1');
  th1.addEventListener('click', () => {
    arrowUp(th1);
    if (setCurrentSortMethod('name')) {
      renderClients(clientsStore.reverse())
    } else {
      renderClients(sortByName(clientsStore));
    }
  });
  th1.append(createArrow('А-Я'))


  const th2 = document.querySelector('.th2');
  th2.addEventListener('click', () => {
    arrowUp(th2);
    if (setCurrentSortMethod('createdAt')) {
      renderClients(clientsStore.reverse())
    } else {
      renderClients(sortedByDate(clientsStore, 'createdAt'));
    }
  });
  th2.append(createArrow())


  const th3 = document.querySelector('.th3');
  th3.addEventListener('click', () => {
    arrowUp(th3);
    if (setCurrentSortMethod('updatedAt')) {
      renderClients(clientsStore.reverse())
    } else {
      renderClients(sortedByDate(clientsStore, 'updatedAt'));
    }
  });
  th3.append(createArrow());
}


function renderClients(list = []) {
  document.querySelector('.tbody').innerHTML = '';
  list.forEach((client) => {
    const tr = createEl('tr');
    const id = createEl('td');
    id.classList.add('td0');
    id.textContent = client.id;
    const name = createEl('td');
    name.classList.add('td1');
    name.textContent = `${client.surname} ${client.name} ${client.lastName}`;
    const dateCreate = createEl('td');
    dateCreate.classList.add('td2');
    dateCreate.append(dateFormat(client.createdAt))
    const dateChange = createEl('td');
    dateChange.classList.add('td3')
    dateChange.append(dateFormat(client.updatedAt))
    const contacts = createEl('td');
    contacts.classList.add('td4');
    const contactsWrap = document.createElement('div');
    contactsWrap.classList.add('contacts-wrap');
    client.contacts.forEach(contact => {
      const imgWrap = document.createElement('div');
      imgWrap.classList.add('img-wrap');
      const img = document.createElement('img');
      img.src = `img/${contact.type}.svg`;
      img.alt = contact.type;
      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.innerHTML = `${contact.type.includes('phone') ? '' : contact.type + ':'} <a href="${contact.value}">${contact.value}</a>`;
      imgWrap.append(img, tooltip);
      contactsWrap.append(imgWrap)
    })
    contacts.append(contactsWrap);
    const action = createEl('td');
    action.classList.add('td5');
    const btnWrap = document.createElement('div');
    btnWrap.classList.add('table__btn-wrap');
    const btnChange = document.createElement('button');
    btnChange.classList.add('table__button');
    btnChange.innerHTML = '<img src="img/fix.svg" alt="fix"> Изменить';
    btnChange.addEventListener('click', () => {
      console.log(client);
      renderModalFixed(client, deleteModale, updateClient);
    })
    const btnDelete = document.createElement('button');
    btnDelete.addEventListener('click', () => {
      createModalDelete(deleteClient, client.id);
    })
    btnDelete.classList.add('table__button');
    btnDelete.innerHTML = ` <img src="img/delete.svg" alt="del">
    Удалить`;
    btnWrap.append(btnChange, btnDelete);
    action.append(btnWrap);
    tr.append(id, name, dateCreate, dateChange, contacts, action)
    document.querySelector('.tbody').append(tr);
  })
}


function addClient(client) {
  fetch(`http://localhost:3000/api/clients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;'
    },
    body: JSON.stringify(client)
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(e => console.log(e))
    .finally(() => {
      deleteModale();
      getData();
    });
}

function updateClient(client) {
  fetch(`http://localhost:3000/api/clients/${client.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;'
    },
    body: JSON.stringify(client)
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(e => console.log(e))
    .finally(() => {
      deleteModale();
      getData();
    });
}

function deleteClient(id) {
  fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'DELETE',
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
    .finally(() => {
      deleteModale();
      getData();
    })
}


const getData = () => {
  fetch(`http://localhost:3000/api/clients`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      clientsStore = [...data]
      renderClients(sortByName(clientsStore));
    })
}


(() => {
  const body = document.body;
  body.addEventListener('click', (e) => {
    if (e.target.dataset.type === 'modal') {
      deleteModale();
    }
  })
  renderHeader()
  renderMain()
  addSortedListeners();
  renderClients();
  getData();
})();
