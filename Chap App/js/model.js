const model = {};
model.currentUser = undefined;
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

// code moi o day thu xem co bi ra man hinh login nua khong nhe

// model.chatScreen = async(dataChat)=>{
//     try {
//         const noReload = await firebase.auth().onAuthStateChanged(function(user) {
//             if (user) {
//               // User is signed in.
//                 view.setAtiveScreen('chatScreen');
//                 // console.log(user);
//             }
//           });
//     }
//     catch(err) {
//         alert(err.message);
//     }
// }




    /// thich dung them cung dc
    // .then((res) => {
    //     // 
    //     
    // }).catch(err => {
    //     console.log(err);
    // });


