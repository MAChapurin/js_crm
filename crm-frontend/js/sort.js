export function sortById (array) {
  const sortedArray = array.sort((a, b) => {
    if (Number(a.id) > Number(b.id)) return -1;
    if (Number(a.id) < Number(b.id)) return 1;
    return 0;
  });
  return sortedArray;
}

export function sortByName (array) {
  const sortedArray = array.sort((a, b) => a.surname.localeCompare(b.surname));
  return sortedArray;
}

export function sortedByDate(array, option) {
  const sortedArray = array.sort((a,b)=> {
    if(new Date(a[option]).getTime() > new Date(b[option]).getTime()) return -1;
    if(new Date(a[option]).getTime() < new Date(b[option]).getTime()) return 1;
    return 0;
  })
  return sortedArray;
}

export function setCurrentSortMethod(method) {
  if(localStorage.getItem('method') === method) {
    return true;
  }
  localStorage.setItem('method', method);
  return false;
}

export function arrowUp(element) {
  const arrows = document.querySelectorAll('th');
  arrows.forEach(el => el.classList.remove('arrow-up'));
  console.log('arrow:', element);
  element.classList.add('arrow-up');
}

