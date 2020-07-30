// file khởi tạo dự án của mình ( bắt sự kiện)
const init = () => {
    console.log('Windown loaded');
    view.setAtiveScreen('registerScreen');
    // gọi hàm setAtive trong view
    view.setAtiveScreen('loginScreen');


    /////////////////
    let firebaseConfig = {
        apiKey: "AIzaSyAiS9K-gUxihQtCR1mHMN10xmvYqFmlHtE",
        authDomain: "chat-app-7371e.firebaseapp.com",
        databaseURL: "https://chat-app-7371e.firebaseio.com",
        projectId: "chat-app-7371e",
        storageBucket: "chat-app-7371e.appspot.com",
        messagingSenderId: "710788543449",
        appId: "1:710788543449:web:131d1989b5a6c736421fc8",
        measurementId: "G-5M3E942D66"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      console.log(firebase.app().name);

      // cái thằng này nó thực hiện khi mà người dùng thay đổi trạng thái: đăng kí, đăng nhập, đang
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          view.setAtiveScreen('chatScreen');
          // User is signed in.
        }
      });


    //   firebase.analytics();
    // view.setAtiveScreen('registerScreen;')
}
window.onload = init; // sau khi load xong hết các js thì mới bắt đầu chạy đéne cái windown.onload này






// có thể dùng 2 hàm này để tự addEventListenner.
// function toRegister(){
//     view.setAtiveScreen('registerScreen');
// }
// function toLogin(){
//     view.setAtiveScreen('loginScreen');
// }
///////////////////////////////////////

