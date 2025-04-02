function loadHeader() {
    fetch('хух.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);

            // Обработчик для выпадающего списка "Каталог"
            const dropdownButton = document.querySelector('.dropbtn');
            const dropdownContent = document.querySelector('.dropdown-content');

            if (dropdownButton && dropdownContent) { // Проверяем, что элементы существуют
                dropdownButton.addEventListener('click', function(event) {
                    event.preventDefault();
                    dropdownContent.classList.toggle('show');
                });

                // Закрываем выпадающий список при клике вне его
                window.addEventListener('click', function(event) {
                    if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown')) {
                        if (dropdownContent.classList.contains('show')) {
                            dropdownContent.classList.remove('show');
                        }
                    }
                });
            } else {
                console.warn('Не найдены элементы .dropbtn или .dropdown-content');
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке шапки:', error);
        });
}

loadHeader();