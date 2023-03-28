export class Client {
  constructor(name, lastName, surname, contacts=[]) {
    this.id = null;
    this.name = name;
    this.surname = surname;
    this.lastName = lastName;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.contacts = contacts;
  }
}


export class CustomSelect {
  constructor(el, list = []) {
    this.el = el;
    this.list = list;
    this.render();
    this._value = list.length ? list[0] : '';
  }

  get value() {
    return this.el.querySelector('.select__value').textContent;
  }

  set value(option) {
    this.el.querySelector('.select__value').textContent = option;
  }

  open() {
    this.el.classlist.add('open')
  }

  close() {
    this.el.classlist.remove('open')
  }

  render() {
    this.el.append(createDropDown(this.list))
  }
}

function createDropDown(list) {
  function choiseOption() {
    console.log(this.textContent);
    selectValue.textContent = this.textContent;
    select.classList.remove('open');
  }
  const select = document.createElement('div');
  select.classList.add('select');
  const header = document.createElement('div');
  header.classList.add('select__header');
  header.addEventListener('click', () => {
    select.classList.toggle('open')
  })
  const selectValue = document.createElement('span')
  selectValue.classList.add('select__value')
  selectValue.textContent = list.length > 0 ? list[0] : 'Список пуст';
  const arrow = document.createElement('div')
  arrow.classList.add('arrow')
  header.append(selectValue, arrow);
  const ul = document.createElement('ul');
  ul.classList.add('select__ul')
  list.forEach(element => {
    const li = document.createElement('li')
    li.addEventListener('click', choiseOption)
    li.classList.add('select__li');
    li.textContent = element;
    ul.append(li);
  });
  select.append(header, ul);
  return select;
}






