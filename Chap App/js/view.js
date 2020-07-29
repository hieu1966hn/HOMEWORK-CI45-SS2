const view = {}; // dùng để hiển thị lên màn hình giao diện cho người dùng

view.setAtiveScreen = (screenName) => {
    switch (screenName) {
        case 'welcomeScreen':
            document.getElementById("app").innerHTML = components.welcomeScreen;
            // lí do có thể link đc với các file js khác ( do đều nhúng vào html);
            break;
        //////////////////////////
        case `loginScreen`:
            //// in ra màn hình đăng nhập
            document.getElementById("app").innerHTML = components.loginScreen;
            document.getElementById("redirect-to-register").addEventListener("click", () => {
                view.setAtiveScreen('registerScreen');
            });
            const loginForm = document.getElementById("login-form");
            loginForm.addEventListener("submit", (event) => {
                event.preventDefault();
                const data = {
                    email: loginForm.email.value,
                    password: loginForm.password.value,
                };
                console.log(data);
                controller.login(data);
            });
            break;
        //////////////////////////
        case 'registerScreen':
            // in ra man hinh đăng kí
            document.getElementById("app").innerHTML = components.registerScreen;
            document.getElementById("redirect-to-login").addEventListener("click", () => {
                view.setAtiveScreen('loginScreen');
            });
            const registerForm = document.getElementById("register-form");
            registerForm.addEventListener("submit", (event) => {
                event.preventDefault();  // không cho trình duyệt thực hiện hành động default này nữa
                const data = {
                    // lấy đc dũ liệu người dùng nhập thông qua lệnh
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value,
                };
                console.log(data);
                controller.register(data);
            });
            break;
        ///////////// màn hình chatScreen
        case `chatScreen`:
            document.getElementById("app").innerHTML = components.chatScreen;
            // document.getElementById("redirect-to-chatScreen").
            //     addEventListener("submit", () => {
            //         view.setAtiveScreen("chatScreen");
            //     });
            // document.getElementById("welcome-user").innerText =  `Welcome to ${model.currentUser.displayName} to the chat app`;
            const sendMessageForm = document.getElementById("send-messages-form")
            sendMessageForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const message = {
                    content: sendMessageForm.message.value,
                    owner: model.currentUser.email,
                }
                const botMessage = {
                    content: sendMessageForm.message.value,
                    owner: `Bot`,
                }
                view.addMessage(message);
                view.addMessage(botMessage);
                sendMessageForm.message.value = '';

            });
            break;
    }
}

view.addMessage = (message) => {
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message-container'); // them class cho the do
    if (message.owner === model.currentUser.email) {
        messageWrapper.classList.add('mine');
        if (message.content === message.content.trim() && message.content.trim() != "") {
            messageWrapper.innerHTML = `
        <div class="content">
            ${message.content}
        </div>
        `;
        }
    }
    else {
        messageWrapper.classList.add('their');
        if (message.content === (message.content.trim() +" ") && message.content.trim() != "") {
            messageWrapper.innerHTML = `
            <div class = "owner">
            ${message.owner}
            </div>
            <div class = "content">
            ${message.content}
            </div>
            `;
        }
    }
    document.querySelector(".list-messages").appendChild(messageWrapper);
    //  dau la cha -> sau . la con
}

