export function dateFormat(date) {
  function addNull (num) {
    if (num < 10) {
      return `0${num}`
    }
    return num;
  }
  const formatDate = new Date(date)
  const dateBlock = document.createElement('div');
  dateBlock.classList.add('date');
  const dateDDMMYY = document.createElement('span');
  dateDDMMYY.classList.add('date__date');
  dateDDMMYY.textContent = `${addNull(formatDate.getDate())}.${addNull(formatDate.getMonth()+1)}.${addNull(formatDate.getFullYear())}`
  const time = document.createElement('span');
  time.classList.add('date__time');
  time.textContent = ` ${addNull(formatDate.getHours())}:${addNull(formatDate.getMinutes())}`
  dateBlock.append(dateDDMMYY, time)
  return dateBlock;
}


