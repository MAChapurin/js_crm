const page = {
  app: document.getElementById('app'),
  search: document.querySelector('.search_input'),
  table: document.querySelector('.table'),
  addBtn: document.querySelector('main__button'),
  modalNewClient: document.querySelector('.modal-new-client')
}

class Client {
  constructor(id, name, middlename, surname, contacts) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.middlename = middlename;
    this.contacts = contacts;
  }
}

function createEl(tagName) {
  return document.createElement(tagName)
}

function renderHeader() {
  const header = createEl('div');
  header.classList.add('header');
  const logo = createEl('img');
  logo.classList.add('logo');
  logo.src = "img/skb.svg";
  logo.alt = "логотип компании skb";
  const input = createEl('input');
  input.addEventListener('input', () => console.log(input.value))
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
  const table = createEl('table');
  table.classList.add('table');
  const tr = createEl('tr');
  const titles = ['ID', 'Фамилия Имя Отчество', 'Дата и время создания', 'Последние изменения', 'Контакты', 'Действия'];
  titles.forEach(title => {
    const th = createEl('th');
    th.textContent = title;
    tr.append(th);
  })
  const btn = createEl('button');
  btn.classList.add('main__button');
  const img = createEl('img');
  img.src = 'img/client.svg';
  img.alt = 'Профиль потенциального клиента';
  btn.addEventListener('click', ()=> {
    page.modalNewClient.classList.remove('modal-hide');
  })
  btn.append(img);
  btn.append('Добавить клиента');
  table.append(tr);
  main.append(h1, table, btn);
  page.app.append(main);
}

function addClient() {
  const client = new Client('76hy', 'Jack', 'Sparrow', 'Pirat');
  const tr = createEl('tr');
  const id = createEl('td');
  id.textContent = client.id;
  const name = createEl('td');
  name.textContent = `${client.name} ${client.middlename} ${client.surname}`;
  const dateCreate = createEl('td');
  dateCreate.textContent = Date();
  const dateChange = createEl('td');
  dateChange.textContent = Date();
  const contacts = createEl('td');
  contacts.innerHTML = ` <img src="img/vk.svg" alt="vk">
  <img src="img/fb.svg" alt="fb">
  <img src="img/phone.svg" alt="phone">
  <img src="img/mail.svg" alt="mail">`;
  const action = createEl('td');
  action.innerHTML = `<div class="table__btn-wrap">
  <button class="table__button">
    <img src="img/fix.svg" alt="fix">
    Изменить
  </button>
  <button class="table__button">
    <img src="img/delete.svg" alt="del">
    Удалить
  </button>
</div>`
  tr.append(id, name, dateCreate, dateChange, contacts, action)
  document.querySelector('.table').append(tr);
}

{/* <div class="modal modal-new-client modal-hide">
<div class="modal__header">
  <h2 class="modal__h2">Новый клиент</h2>
  <button class="modal__close"></button>
</div>
<input class="modal__input" name="surname" type="text" placeholder="Фамилия*">
<input class="modal__input" name="name" type="text" placeholder="Имя*">
<input class="modal__input" name="middlename" type="text" placeholder="Отчество">
<button class="modal__add">Добавить контакт</button>
<button class="modal__save">Сохранить</button>
<button class="modal__back">Отмена </button>
</div> */}

function renderModal() {
  const modal = createEl('div');
  modal.classList.add('modal','modal-new-client','modal-hide');
  const header = createEl('div');
  header.classList.add('modal__header');
  const h2 = createEl('h2');
  h2.classList.add('h2');
  h2.textContent = 'Новый клиент';
  const btnClose = createEl('button');
  btnClose.classList.add('modal__close');
  header.append(h2, btnClose);
  const inputName = createEl('input');
  inputName.type = 'text';
  inputName.placeholder = 'Имя*';
  inputName.name = 'name';
}


(() => {
  renderHeader()
  renderMain()
  addClient()
  addClient()
})();
