// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDEWWqrIv6UaFN_tGc98xbNdCsaQBOl2Fc",
    authDomain: "swp391-gea.firebaseapp.com",
    projectId: "swp391-gea",
    storageBucket: "swp391-gea.appspot.com",
    messagingSenderId: "922875514490",
    appId: "1:922875514490:web:db63cec04e85313fb0b5c3",
    measurementId: "G-0ZTWKWK0Y4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);