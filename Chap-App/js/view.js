const view = {}; // dùng để hiển thị lên màn hình giao diện cho người dùng

view.setActiveScreen = (screenName, fromCreateConversation = false) => {
    switch (screenName) {
        case `loginScreen`:
            //// in ra màn hình đăng nhập
            document.getElementById("app").innerHTML = components.loginScreen;
            document.getElementById("redirect-to-register").addEventListener("click", () => {
                view.setActiveScreen('registerScreen');
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
                view.setActiveScreen('loginScreen');
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
            //     }); phải hỏi anh Chinh phần này mới được.
            // document.getElementById("welcome-user").innerText =  `Welcome to ${model.currentUser.displayName} to the chat app`;

            const sendMessageForm = document.getElementById("send-messages-form");
            sendMessageForm.addEventListener("submit", (e) => {
                e.preventDefault();
                if (sendMessageForm.message.value.trim() !== "") {
                    const message = {
                        content: sendMessageForm.message.value,
                        owner: model.currentUser.email,
                        createAt: (new Date()).toISOString(), //convert no sang string => de:
                    }
                    // const botMessage = {
                    //     content: sendMessageForm.message.value,
                    //     owner: `Bot`,
                    // }
                    model.addMessage(message);
                    // view.addMessage(botMessage);

                    sendMessageForm.message.value = '';
                }
            });

            if (!fromCreateConversation) {
                model.loadConversations();  // mới vào sẽ hiển thị lên cuộc hội thoại
                model.listenConversationsChange(); // lang nghe all change in conversation 
            }
            else { // phai co 2 doan nay moi them div con vao trong list hoi thoai sau khi click Cancel;
                view.showConversation();
                view.showCurrentConversation();
            }
            // Log out
            const signOutButton = document.getElementById("sign-out");
            signOutButton.addEventListener("click", (e) => {
                e.preventDefault();
                firebase.auth().signOut();
                view.setActiveScreen("loginScreen");
            });

            // sang man createConversation.
            document.querySelector(".create-conversation .btn").addEventListener("click", function () {
                view.setActiveScreen('createConversation');
            });

            const addUserForm = document.getElementById("add-user-form")
            addUserForm.addEventListener("submit", (e) => {
                e.preventDefault()
                const data = addUserForm.email.value;
                controller.addUserConversation(data);
                addUserForm.email.value = '';
            });
            document.querySelector("#send-messages-form input").
                addEventListener("click", () => {
                    view.hideNotification(model.currentConversation.id);
                })
                document.querySelector(".side-bar").addEventListener('click',()=>{
                    document.querySelector(".aside-right").classList.toggle('show'); // no se check trong nay co class show chua( kieu bot buoc check if else);
                    document.querySelector(".side-bar").classList.toggle('move-side-bar');
                });
            break;
        /////////// man hinh createConversation
        case `createConversation`: // man hinh createConversation
            document.getElementById("app").innerHTML = components.createConversation;
            document.querySelector("#back-to-chat").addEventListener("click", function () {
                view.setActiveScreen(`chatScreen`, true);
            });
            const createConversation = document.getElementById("create-conversation-form")
            createConversation.addEventListener("submit", (e) => {
                e.preventDefault();
                const newConversation = {
                    conversationTitle: createConversation.conversationTitle.value, // lấy dữ liệu của trương name
                    conversationEmail: createConversation.conversationEmail.value,  // lấy dữ liệu của trường email.
                };
                controller.createConversationScreen(newConversation);
                // firebase.firestore().collection('conversations').add(newConversation);
            });
            break;
    }
}

view.addMessage = (message) => {
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message-container'); // them class cho the do
    if (message.owner === model.currentUser.email) {
        messageWrapper.classList.add('mine');

        messageWrapper.innerHTML = `
        <div class="content">
            ${message.content}
        </div>
        `;

    }
    else {
        messageWrapper.classList.add('their');

        messageWrapper.innerHTML = `
            <div class = "owner">
            ${message.owner}
            </div>
            <div class = "content">
            ${message.content}
            </div>
            `;

    }
    document.querySelector(".list-messages").appendChild(messageWrapper);
    //  dau la cha -> sau . la con
}

view.showCurrentConversation = () => {
    document.querySelector(".list-messages").innerHTML = "";
    // doi ten cuoc tro chuyen
    document.getElementsByClassName("conversation-header")[0]  // tai vi tri 0
        .innerText = model.currentConversation.title;
    // in cac tin nhan len man hinh
    for (message of model.currentConversation.messages) {
        view.addMessage(message); // day tung cai tin nhan len man hinh bang vong lap for --- of 
    }
    view.scrollToEndElement();
    view.showListUsers(model.currentConversation.users);
}
view.showListUsers = (users) => {
    document.querySelector(".list-users").innerHTML = "";
    for (user of users) {
        view.addUser(user);
    }
}
view.addUser = (user) => {
    const userWrapper = document.createElement('div');
    userWrapper.classList.add('user');
    userWrapper.innerText = user;
    document.querySelector(".list-users").appendChild(userWrapper);
}

view.scrollToEndElement = () => {
    const element = document.querySelector('.list-messages');
    element.scrollTop = element.scrollHeight;
}

view.showConversation = () => {
    for (oneConversation of model.conversations) {
        view.addConversation(oneConversation);
    }
}
view.addConversation = (conversation) => {  // conversation truyền vào từ lúc đầu => về sau sẽ bị cũ => dổi cái khác
    const conversationWrapper = document.createElement('div');
    conversationWrapper.className = 'conversation cursor'; /// them 2 class vao day
    conversationWrapper.id = conversation.id;
    if (model.currentConversation.id === conversation.id) {
        conversationWrapper.classList.add('current');
    }
    conversationWrapper.innerHTML = `
    <div class = "conversation-title">${conversation.title}</div>
    <div class = "conversation-num-user">${conversation.users.length} users</div>   
    <div class = "notification"></div>
    `;
    ////

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    // console.log(mediaQuery); // sử dụng đê check xem nó có nhỏ hơn 768px thật không  @@
    if (mediaQuery.matches) { // cái này là render lần đầu tiên => vẫn cần phải set cái này. Sau lần đầu render => không sử dùng đc nữa @@
        const fistCharacter = conversation.title.charAt(0).toUpperCase();
        // console.log(conversationWrapper.firstElementChild);
        conversationWrapper.firstElementChild.innerText = fistCharacter; /// firstElementChild chi ap dung voi con dau va con cuoi
        document.querySelector(".create-conversation .btn").innerText = "+"; // co the viet the nay de thay doi lai text cho the class = btn dua vao thang cha cua no
    }
    ///
    mediaQuery.addListener((e) => { // lắng nghe sự kiện
        if (e.matches === true) {
            const fistCharacter = conversation.title.charAt(0).toUpperCase();
            conversationWrapper.firstElementChild.innerText = fistCharacter; /// firstElementChild chi ap dung voi con dau va con cuoi
            document.querySelector(".create-conversation .btn").innerText = "+";
        }
        else {
            conversationWrapper.firstElementChild.innerText = conversation.title; /// firstElementChild chi ap dung voi con dau va con cuoi
            document.querySelector(".create-conversation .btn").innerText = "+New Conversation";
        }
    })
    ////
    conversationWrapper.addEventListener('click', () => {
        // thay doi giao dien, doi current
        document.querySelector(".current").classList.remove("current");
        conversationWrapper.classList.add("current");

        for (oneConversation of model.conversations) {
            if (oneConversation.id === conversation.id) { // để ý phần conversation.id là ở view (=> không có s ở đằng sau)
                model.currentConversation = oneConversation; // duyệt mảng message đê update lại alll các tin nhắn mình vừa nhập khi mình click sang cái khác => để không bị mất đi 
            }
        }

        //thay doi model.currentConversation
        //in cac tin nhan cua model.currentConversation len man hinh
        view.showCurrentConversation();
        view.hideNotification(conversation.id); // để khi click vào nó sẽ mất đi cái chấm xanh thông báo.
    });

    document.querySelector(".list-conversation").appendChild(conversationWrapper);
}

view.setErrorMessage = (elementId, message) => {
    document.getElementById(elementId).innerText = message;
}
view.updateNumberUsers = (docId, numberUsers) => {
    const conversation = document.getElementById(docId);
    const secondChild = conversation.getElementsByTagName('div')[1];
    console.log(secondChild); // đã ra => không phải sử dụng lastElmentChild nua => chuyen sang sd cai nay
    // conversation.lastElementChild.innerText = numberUsers + ` users`; // lấy thằng con cuối cùng của nó
    secondChild.innerText = numberUsers + ` users`;
}
view.showNotification = (conversationId) => {
    const conversation = document.getElementById(conversationId);
    conversation.lastElementChild.style = 'display: block';
    /////// thu cach query nhe
    // document.querySelector(`${conversationId} .notification`); /// có 1 cái dở: query nó không chấp nhận những cái Id bắt đầu bằng số ==> ta không dùng cách này; => sd cách ở bên trên
}
view.hideNotification = (conversationId) => {
    const conversation = document.getElementById(conversationId);
    conversation.lastElementChild.style = 'display: none';
}