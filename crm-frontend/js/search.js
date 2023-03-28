export function searchByName(array, value) {
  const arrayCopy = [...array]
  const filterArray = arrayCopy
  .filter(obj => `${obj.surname}${obj.name}${obj.lastName}`.toLowerCase().includes(value.toLowerCase()));
  return filterArray;
}
