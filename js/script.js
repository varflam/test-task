'use strict';

//OPTIONS

let dayOptions = '<option value="" selected disabled hidden>День</option>';
const daySelect = document.querySelector('#day');

for (let i = 1; i <= 31; i++) {
    dayOptions += `<option value="${i}">${i}</option>`;
}

daySelect.innerHTML = dayOptions;

let monthOptions = '<option value="">Месяц</option>';
const monthSelect = document.querySelector('#month');
const months = ['Январь', 'Ферваль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

for (let i = 0; i < months.length; i++) {
    monthOptions += `<option value="${i + 1}">${months[i]}</option>`;
}

monthSelect.innerHTML = monthOptions;


let yearOptions = '<option value="">Год</option>';
const yearSelect = document.querySelector('#year');

for (let i = 1940; i <= 2003; i++) {
    yearOptions += `<option value="${i}">${i}</option>`;
}

yearSelect.innerHTML = yearOptions;


//PAGE OFFSET

const letUs = document.querySelector('.promo__let-us'),
      prediction = document.querySelector('.prediction'),
      question = document.querySelector('.question');

const displayElementsByScroll = (offset, elem) => {
    window.addEventListener('scroll', () => {
        if (window.scrollY >= offset) {
            elem.classList.add('appear');
        }
    });
};



if (window.matchMedia("(min-width: 444px)").matches) {
    displayElementsByScroll(750, letUs);
    displayElementsByScroll(1200, prediction);
    displayElementsByScroll(1800, question);
} else {
    displayElementsByScroll(400, letUs);
    displayElementsByScroll(750, prediction);
    displayElementsByScroll(1100, question);
}

//FIRST BUTTON CLICK

const buttonYes = document.querySelector('#yes');

buttonYes.addEventListener('click', () => {
    window.scrollTo({
        top: 2200,
        behavior: "smooth"
    });
});

//QUIZ

const answerText = document.querySelector('.result'),
      questionBtns = document.querySelectorAll('.question__btn'),
      newQuestions = document.querySelectorAll('.question__new'),
      spinner = document.querySelector('.spinner'),
      micro = document.querySelector('.micro'),
      selects = document.querySelectorAll('.question__select select');

const changeSections = (sectionShow, sectionHide) => {
    sectionShow.classList.add('visible');
    sectionShow.classList.remove('hidden');
    sectionHide.classList.add('hidden');
    sectionHide.classList.remove('visible');
};

const showResult = (text) => {
    answerText.textContent = text;
};

let count = 0;

questionBtns.forEach((btn, i) => {
    if (i !== 6 && i !== 10 && i !== 11) {
        btn.addEventListener('click', () => {
            newQuestions[count].classList.add('hidden');
            newQuestions[count + 1].classList.add('visible');
            newQuestions[count + 1].classList.remove('hidden');
            count++;
        });
    } else if (i === 6) {
        //INVALID SELECT
        selects.forEach(select => {
            select.addEventListener('change', () => {
                if(select.value) {
                    select.classList.remove('invalid');
                }
                if (daySelect.value && monthSelect.value && yearSelect.value) {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        newQuestions[count].classList.add('hidden');
                        newQuestions[count + 1].classList.add('visible');
                        newQuestions[count + 1].classList.remove('hidden');
                        count++;
                        changeSections(spinner, question);
                        setTimeout(() => {
                            changeSections(question, spinner);
                            window.scrollTo({
                                top: 2200,
                                behavior: "smooth"
                            });
                        }, 2000);
                    });
                } 
            });
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if(!select.value) {
                    select.classList.add('invalid');
                }
            });
        });

        yearSelect.addEventListener('change', () => {
            if (yearSelect.value <= 2003 && yearSelect.value >= 1986) {
                console.log('bblanal');
                showResult('По вам скучает очень близкий человек, которого больше нет в мире живых.');
            } else if (yearSelect.value <= 1985 && yearSelect.value >= 1976) {
                showResult('По вам скучает очень близкий человек, которого больше нет в мире живых. Возможно это дедушка или бабушка.');
            } else if (yearSelect.value < 1976 && yearSelect.value !== '') {
                showResult('По вам скучает очень близкий человек, которого больше нет в мире живых. Возможно это кто-то из Ваших родителей.');
            }
        });
    } else if (i === 10 || i === 11) {
        btn.addEventListener('click', () => {
            changeSections(micro, question);
        });
    }
});

//Result

const microAnimation = document.querySelector('.micro__animation'),
      final = document.querySelector('.final'),
      date = final.querySelector('.date'),
      progressBar = micro.querySelector('.micro__progressbar > span');

microAnimation.addEventListener('animationend', () => {
    changeSections(final, micro);
});

const today = new Date();
date.textContent = `${today.getDate() + 1}.0${today.getMonth() + 1}.${today.getFullYear()}`;

//DATA DISPLAY
const btnCall = document.querySelector('.btn_call');

const getData = async (url) => {
    let res = await fetch(url, {
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        throw new Error(`Could not reach ${url}, status: ${res.status}`);
    }
    
    return await res.json();
};

const stringData = (obj) => {
    let newData = [];
    for (let key in obj) {
        if(typeof(obj[key]) === 'object') {
            obj[key] = obj[key].join(', ');
        }
        newData.push(` ${key}: ${obj[key]}`);
    }
    return [...newData];
};

btnCall.addEventListener('click', (e) => {
    e.preventDefault();
    getData('https://swapi.dev/api/people/1/')
    .then(data => {
        data = stringData(data);
        let userData = document.createElement('div');
        final.append(userData);
        userData.classList.add('final__descr');
        userData.innerHTML = data;
    });
});

//FOOTER

const footer = document.querySelector('footer'),
      hiddenText = footer.querySelector('.footer__text span');

footer.addEventListener('click', () => {
    hiddenText.classList.add('appear');
});