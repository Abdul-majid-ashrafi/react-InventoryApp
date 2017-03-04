import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCwVXDoJ0KnkagYkyqUa2m5xj6j6LNAnic",
    authDomain: "react-inventory.firebaseapp.com",
    databaseURL: "https://react-inventory.firebaseio.com",
    storageBucket: "react-inventory.appspot.com",
    messagingSenderId: "510462222867"
};
firebase.initializeApp(config);
export class FirebaseService {

    static firebaseTimeStamp = firebase.database['ServerValue'].TIMESTAMP;
    static ref = firebase.database().ref();
    static storage = firebase.storage().ref();
    static auth = firebase.auth();

    // constructor() { }

    // static customAuth(user) {
    //     return this.auth.createUserWithEmailAndPassword(user.email, user.pass);
    // } //AuthNewUser

    static customLogin(user) {
        return this.auth.signInWithEmailAndPassword(user.email, user.pass);
    } //loginUser

    // static addNewUser(user) {
    //     return this.ref.child(user).set();
    // } //AuthNewUser

    // // static getPushRef(path) {
    //     return this.ref.child(path).push();
    // }
    // static uploadImageOnStorageBlob(path, blob) {
    //     return new Promise(res => {
    //         this.storage.child(path).put(blob).then((snapshot) => {
    //             console.log('Uploaded a blob or file!');
    //             // The promise will resolve with a Download URL provided by Firebase Storage
    //             res(snapshot.downloadURL);
    //         })
    //     });
    // }

}