let dayOptions = '<option value="day" class="question__option">День</option>';
const daySelect = document.querySelector('#day');

for (let i = 1; i <= 31; i++) {
    dayOptions += `<option value="${i}" class="question__option">${i}</option>`;
}

daySelect.innerHTML = dayOptions;


let monthOptions = '<option value="month">Месяц</option>';
const monthSelect = document.querySelector('#month');
const months = ['Январь', 'Ферваль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

for (let i = 0; i < months.length; i++) {
    monthOptions += `<option value="${i + 1}">${months[i]}</option>`;
}

monthSelect.innerHTML = monthOptions;


let yearOptions = '<option value="year">Год</option>';
const yearSelect = document.querySelector('#year');

for (let i = 1940; i <= 2021; i++) {
    yearOptions += `<option value="${i}">${i}</option>`;
}

yearSelect.innerHTML = yearOptions;
