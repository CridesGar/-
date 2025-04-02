let userName = "";
let userEmail = "";
let userPhone = "";
let isAuthenticated = false;

const AUTH_BUTTON_LOGOUT_TEXT = "Выйти";
const AUTH_BUTTON_LOGIN_REGISTER_TEXT = "Войти/Регистрация";

// Функция для открытия диалогового окна входа
function openLoginDialog() {
    const email = prompt("Введите ваш email:", userEmail);
    if (email !== null) {
        const password = prompt("Введите ваш пароль:", "");
        if (password !== null) {
            const phone = prompt("Введите ваш номер телефона:", "");
            if (phone !== null) {
                // Проверка на "пасхалку" для admin
                if (email === "admin" && password === "Karasik228") {
                    userName = "Твой повелитель";
                    userEmail = "Повелителю информация не нужна, повелителю нужен товар";
                    userPhone = "Секретно";
                    updateUserInformation();
                    setAuthenticatedState(true);
                } else {
                    userName = "Имя пользователя";
                    userEmail = email;
                    userPhone = phone;
                    updateUserInformation();
                    setAuthenticatedState(true);
                }
            }
        }
    }
}

// Функция для открытия диалогового окна регистрации
function openRegisterDialog() {
    const name = prompt("Введите ваше имя:", userName);
    if (name !== null) {
        const email = prompt("Введите ваш email:", userEmail);
        if (email !== null) {
            const password = prompt("Придумайте пароль:", "");
            if (password !== null) {
                const phone = prompt("Введите ваш номер телефона:", "");
                if (phone !== null) {
                    userName = name;
                    userEmail = email;
                    userPhone = phone;
                    updateUserInformation();
                    setAuthenticatedState(true);
                }
            }
        }
    }
}

function updateUserInformation() {
    document.getElementById("user-name").innerText = userName;
    document.getElementById("user-email").innerText = userEmail;
    document.getElementById("user-phone").innerText = userPhone;
    document.getElementById("user-avatar").innerText = userName.charAt(0).toUpperCase();
}

function toggleAuth() {
    if (isAuthenticated) {
        //Выходим из системы
        userName = "";
        userEmail = "";
        userPhone = "";
        updateUserInformation();
        setAuthenticatedState(false);
    } else {
        //Спрашиваем войти или зарегистрироваться
        const choice = confirm("Войти?");
        if (choice) {
            openLoginDialog();
        } else {
            openRegisterDialog();
        }
    }
}

function setAuthenticatedState(newState) {
    isAuthenticated = newState;
    const container = document.querySelector('.cont');

    if (isAuthenticated) {
        container.classList.add('authenticated');
    } else {
        container.classList.remove('authenticated');
    }

    document.getElementById("auth-button").innerText = isAuthenticated ? AUTH_BUTTON_LOGOUT_TEXT : AUTH_BUTTON_LOGIN_REGISTER_TEXT;
}