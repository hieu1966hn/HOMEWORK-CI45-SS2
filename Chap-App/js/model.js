const model = {};
model.currentUser = undefined;

// 2 cai duoi dung de luu du lieu cuoc tro chuyen
model.conversations = undefined;  // thuoc tinh luu lai nhung cuoc tro chuyen va dat vao trong conversations
model.currentConversation = undefined; //cuoc tro chuyen dang duoc show len man hinh (cuoc tro chuyen hien tai @@) -> sau nay lam cho tien. @@.

model.collectionName = `conversations`;
// luu  cai nay de lam gi ?: luu lai cai ten collection cua minh tren firebase 



model.register = async (data) => {
    try {
        await firebase.auth().createUserWithEmailAndPassword(data.email, data.password) //dòng nay can thời gian phản hồi từ server -> chạy thằng dưới luôn
        firebase.auth().currentUser.updateProfile({
            displayName: data.firstName + " " + data.lastName,
        });
        firebase.auth().currentUser.sendEmailVerification();
        alert("the email has been registed, please check your email");
        view.setAtiveScreen('loginScreen');
    } catch (err) { // no se ban error qua cai catch nay
        console.log(err);
        alert(err.message);
    }
}

model.login = async (dataLogin) => {
    try {
        const response = await firebase.auth()
            .signInWithEmailAndPassword(dataLogin.email, dataLogin.password);
        // sau do fire return 1 Object User
        // console.log(response);
        // if (response.user.emailVerified === false) {
        //     alert("please Verified your email");
        // }
        // else {
        //     // model.currentUser = {
        //     //     displayName: response.user.displayName,
        //     //     email: response.user.email,
        //     // }
        //     view.setAtiveScreen('chatScreen');// de day de chuan bi viet them
        // }


        ///////////////////// tại sao phải comment đoạn này ?????: 
    } catch (err) {
        if (err.code == 'auth/user-not-found' || err.code == 'auth/invalid-email') {
            document.getElementById('email-error').innerText = `*${err.message}`
        } else if (err.code == 'auth/wrong-password') {
            document.getElementById('password-error').innerText = `*${err.message}`
        }
    }
}
/// thich dung them cung dc
// .then((res) => {
//     // 
//     
// }).catch(err => {
//     console.log(err);
// });



model.addMessage = (message) => { // nhan vao la 1 tin nhan
    const dataToUpDate = {
        messages: firebase.firestore.FieldValue.arrayUnion(message), /// cu phap cua firebase de update them vao trong cac truong cua no
    }
    firebase.firestore().collection(model.collectionName).doc(model.currentConversation.id).update(dataToUpDate);
}

model.loadConversations = async () => {
    console.log('kkkk');
    const response = await firebase.firestore().collection(model.collectionName).where("users", "array-contains", model.currentUser.email).get(); // goi firebase de lay ve
    // array-contains: 
    console.log(getDataFromDocs(response.docs));
    model.conversations = getDataFromDocs(response.docs); // lay du lieu ve
    if (model.conversations.length > 0) { // xet dk tranh truong hop khong ton tai cuoc tro chuyen nao ca
        model.currentConversation = model.conversations[0];
        view.showCurrentConversation();
    }
    //co the them o day thu xem
    view.showConversation();
    // else {
    //     alert("you don't have any conversations. Please make one!!");
    // }
}

model.listenConversationsChange = () => {
    let isFirstRun = true;
    firebase.firestore().collection(model.collectionName)
        .where('users', 'array-contains', model.currentUser.email)
        .onSnapshot((res) => { // lang nghe thay doi khi 1 ban ghi nao do bi thay doi
            if (isFirstRun) {
                isFirstRun = false;
                return // nhu nay la no se thoat ra luon => tu lan thu 2: isFirstRun se luon la false  ===>> only 1 lan duy nhat la true;
            }
            //docChanges() : ham co san firebase cung cap cho minh.
            const docChanges = res.docChanges(); // de lam gi ??? 1 list cac document bi thay doi => sd for de show ra
            // console.log(res.docChanges()); // de lam gi????
            for (oneChange of docChanges) {
                // console.log(oneChange);
                const type = oneChange.type;
                if (type == `modified`) {
                    const docData = getDataFromDoc(oneChange.doc); //doc o day la du lieu trong document
                    console.log(docData);
                    // updata lai model.conversations
                    for (let index = 0; index < model.conversations.length; index++) {
                        if (model.conversations[index].id === docData.id) {
                            model.conversations[index] = docData; // buoc dong bo firestore giong voi ca local cua minh @@
                        }
                    }

                    // update model.currentConversation
                    if (docData.id === model.currentConversation.id) { // ve doc lai doan nay nhe
                        model.currentConversation = docData;
                        // them 1 tin nhan cuoi cung la dep => do ton bo nho @@
                        const lastMessage = docData.messages[docData.messages.length - 1];
                        view.addMessage(lastMessage);
                        view.scrollToEndElement();
                    }
                }
                if(type ===`added`){
                    const docData = getDataFromDoc(oneChange.doc);
                    model.conversations.push(docData);
                    view.addConversation(docData);
                }
            }
        });
}
model.createConversation = (data) => {
    firebase.firestore().collection(model.collectionName).add(data);
    view.setAtiveScreen('chatScreen',true); // them true vao de tranh hàm lắng nghe thay đổi nó thêm 1 lần nữa
}