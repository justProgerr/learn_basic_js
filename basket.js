const featuredBox = document.querySelector('.featuredItems');
const featuredItems = document.querySelectorAll('.featuredItem');
const cartIcon = document.querySelector('.cartIcon');
const basketEl = document.querySelector('.basket');
const basketCounter = document.querySelector('.cartIconWrap span')
const basketTbody = document.querySelector('.basket tbody');
const basket = {};
const header = document.querySelector('.header');
let basketCount = 0;

basketEl.style.top = header.clientHeight + 'px';

/**
 *  функция обрабатывает и обновляет переданный объект
 * @param {object} obj 
 * @param {string} id 
 * @param {string} name 
 * @param {string} price 
 * @returns ни чего не возвращает. Только обновляет объект 
 */
function addToCart(obj, id, name, price) {
  if (obj[id]) {
    obj[id].count++;
    obj[id].priceTotal = 
      '$' + obj[id].price.replace(/[^0-9.]/g, '') * obj[id].count;
    return;
  }

  obj[id] = {
    name, 
    price, 
    count: 1,
    priceTotal: price,
  };
};

cartIcon.addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
});

/* 
  Добавим всем элементам с классом 'featuredItem' data- атрибуты с id, 
  наименованием и ценой товара
*/
featuredItems.forEach((featuredItem, index) => {
  featuredItem.dataset.id = index;
  featuredItem.dataset.name = featuredItem
    .querySelector('.featuredName').innerHTML.trim();
  featuredItem.dataset.price = featuredItem
    .querySelector('.featuredPrice').innerHTML.trim();
});

featuredBox.addEventListener('click', (event) => {
  let target = event.target.closest('button');

  if (!target) {
    return;
  }

  basketCounter.innerHTML = ++basketCount;

  const featuredItem = target.closest('.featuredItem');
  const id = featuredItem.dataset.id;
  const name = featuredItem.dataset.name;
  const price = featuredItem.dataset.price;
  let basketInner = '';

  addToCart(basket, id, name, price);

  for (let product in basket) {
    let tr = 
    `
      <tr>
        <td> ${basket[product].name} </td>
        <td> ${basket[product].count} </td>
        <td> ${basket[product].price} </td>
        <td> ${basket[product].priceTotal} </td>
      </tr>
    `;

    basketInner += tr
  }

  basketTbody.innerHTML = basketInner;
});


/* 
  При решении данной задачи, у меня возник вот такой вопрос.

  Когда я начала выполнять работу, я долго не мог определиться с 
  выбором решения. У меня было сильное желание переделать код так, чтобы все 
  товары были добавлены через js, хорошая ли это идея? В реальном проекте 
  товары создаются при помощи html или при помощи js? Я думаю что есть 
  возможность делать и так и так, просто представляю если мне в будущем 
  попадётся подобный заказ, мне нужно будет переписывать html под js (имею ввиду
  продукты), или продолжать тот стиль написания кода который уже был. 

  Возможно я плохо сформулировал свой вопрос. Если из вопроса будет ни чего не 
  понятно, то ни чего, я потом переформулирую в телеграмме, если можно.

*/