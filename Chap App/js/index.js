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
  console.log(firebase.app().name); // cai nay de hien cai default ( chua hieu cong dung lam)
  // firestoreFuntion();

  // cái thằng này nó thực hiện khi mà người dùng thay đổi trạng thái: đăng kí, đăng nhập, đang kí

  firebase.auth().onAuthStateChanged(function (user) {
    console.log(user);
    if (user.emailVerified) {
      model.currentUser = {
        displayName: user.displayName,
        email: user.email
      };
      view.setAtiveScreen('chatScreen');
      // User is signed in.
    } else {
      view.setAtiveScreen('loginScreen');
      alert("Please check your email");
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




// code thử ở đây anh Khiêm giới thiệu... cach lam viec voi database C/R/U/D: cai nay da dc gioi thieu o khoa C4E
firestoreFuntion = async () => {
  // get one document
  const documentId = '1WwMB1rJIntUGLMEt96K';
  const response = await firebase.firestore().collection('users').doc(documentId).get();
  const user = getDataFromDoc(response);
  // console.log(user);


  // get many document
  const response2 = await firebase.firestore().collection('users').where('age', '==', '18').get();
  const listUser = getDataFromDocs(response2.docs);
  console.log(listUser);




  // add document
  const userToAdd = {
    name: 'ABC',
    age: 23,
    email: 'abcxyz@gmail.com'
  };
  // firebase.firestore().collection('users').add(userToAdd);




  // update document
  documentIdUpdate = '1WwMB1rJIntUGLMEt96K';
  const dataToUpdate = {
    age: '18',
    name: 'Soai ca',
    phoneNumber: firebase.firestore.FieldValue.arrayUnion('091'),
  }
  firebase.firestore().collection('users').doc(documentIdUpdate).update(dataToUpdate); // neu torng truong du lieu chua co ( may co update ho cho khong ta ???).





  // delete document
  const docToDelete = 'iiGpuurSQtMtS2PAjEHC';
  firebase.firestore().collection('users').doc(docToDelete).delete();



}

getDataFromDoc = (doc) => {
  const data = doc.data(); // ham data() nay de lam gi nhi??
  data.id = doc.id;
  return data;
}
getDataFromDocs = (docs) => { // lay ra 1 list doc
  return docs.map(item => getDataFromDoc(item)); // về tìm hiểu thêm hàm map() trong js;
  // for (let index = 0; index < docs.length; index++) {
  //   const element = getDataFromDoc(docs[index]);
  //   listData.push(element);
  // }
  // return listData;
}