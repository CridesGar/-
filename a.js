document.querySelector('.book-single-cart-button').addEventListener('click', function() {
    const productId = this.dataset.productId;
    const productName = this.dataset.productName;
    const productPrice = this.dataset.productPrice;
    const productImage = this.dataset.productImage;

    //  1. Получаем текущую корзину из localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    //  2. Проверяем, есть ли уже этот товар в корзине
    const existingItemIndex = cart.findIndex(item => item.id === productId);

    if (existingItemIndex > -1) {
        //  Если товар уже есть в корзине, увеличиваем его количество
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
    } else {
        //  Если товара нет в корзине, добавляем его с количеством 1
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }

    //  3. Сохраняем обновленную корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    //  Перенаправляем на страницу корзины
    window.location.href = 'a.html';
});


document.addEventListener('DOMContentLoaded', function() { // Оборачиваем, чтобы скрипт работал после загрузки DOM

    const addToFavoritesButtons = document.querySelectorAll('.book-single-favorite-button'); // Ищем все кнопки "В избранное"
    
    addToFavoritesButtons.forEach(button => { // Обрабатываем каждую кнопку
    
      button.addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем отправку формы (если кнопка в форме)
    
        const productId = this.dataset.productId;
        const productName = this.dataset.productName;
        const productPrice = this.dataset.productPrice;
        const productImage = this.dataset.productImage;
    
        // 1. Получаем текущий список избранного из localStorage
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Используем другой ключ 'favorites'
    
        // 2. Проверяем, есть ли уже этот товар в избранном
        const existingItemIndex = favorites.findIndex(item => item.id === productId);
    
        if (existingItemIndex === -1) { // Если товара нет в избранном, добавляем его
          favorites.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
          });
    
          // 3. Сохраняем обновленный список избранного в localStorage
          localStorage.setItem('favorites', JSON.stringify(favorites)); // Сохраняем под ключом 'favorites'
    
          alert('Товар добавлен в избранное!'); // Опционально: уведомление
    
        } else {
          alert('Этот товар уже есть в избранном!');
        }
    
        // Никакого перенаправления, чтобы не конфликтовать с корзиной
      });
    });
    });
      // Функция для отображения списка избранного
      function displayFavorites(favorites) {
        favoritesList.innerHTML = ''; // Очищаем список
    
        if (favorites.length === 0) {
          favoritesList.innerHTML = '<p class="empty-message">Ваш список избранного пуст.</p>';
          return;
        }
    
        const ul = document.createElement('ul');
        favorites.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `
            <span>${item.name} - ${item.price} руб.</span>
            <button class="remove-from-favorites" data-product-id="${item.id}">Удалить</button>
          `;
          ul.appendChild(li);
        });
        favoritesList.appendChild(ul);
    
        // Добавляем обработчики для кнопок "Удалить"
        const removeButtons = document.querySelectorAll('.remove-from-favorites');
        removeButtons.forEach(button => {
          button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            removeFromFavorites(productId);
          });
        });
      }