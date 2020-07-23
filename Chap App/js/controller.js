const controller = {};
controller.register = (data) => {
    if (data.firstName === "") {
        document.getElementById("first-name-error").
            innerText = '*Please input first name';
    }
    else {
        document.getElementById("first-name-error").
            innerText = '';
    }
    if (data.lastName === "") {
        document.getElementById("last-name-error").
            innerText = `*Please input last name`
    }
    else {
        document.getElementById("last-name-error").
            innerText = '';
    }
    if (data.email === "") {
        document.getElementById("email-error").
            innerText = `*Please input email`
    }
    else {
        document.getElementById("email-error").
            innerText = '';
    }
    if (data.password === "") {
        document.getElementById("password-error").
            innerText = `*Please type password`
    }
    else {
        document.getElementById("password-error").
            innerText = '';
    }
    if (data.lastName === "") {
        document.getElementById("confirm-password-error").
            innerText = `*Please confirm password`
    }
    else {
        document.getElementById("confirm-password-error").
            innerText = '';
    }
};
//////// thao tác trong login 
controller.login = (data) =>{
    if (data.email === "") {
        document.getElementById("email-error").
            innerText = `*Please input email`
    }
    else {
        document.getElementById("email-error").
            innerText = '';
    }
    if (data.password === "") {
        document.getElementById("password-error").
            innerText = `*Please type password`
    }
    else {
        document.getElementById("password-error").
            innerText = '';
    }
};