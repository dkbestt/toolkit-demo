import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: "AIzaSyCRhYc70PKF2IKpcmmgAQb4EcdRgVL4wFc",
    // authDomain: "newotppro.firebaseapp.com",
    // projectId: "newotppro",
    // storageBucket: "newotppro.appspot.com",
    // messagingSenderId: "356115805940",
    // appId: "1:356115805940:web:93f644ea8eb86281a390a1",
    // measurementId: "G-6CEPL0F70F"

    //.. ME
    apiKey: "AIzaSyDrMMma56sxA54menQbD_ghfxMi2W6Y9D0",
    authDomain: "triftel-app.firebaseapp.com",
    projectId: "triftel-app",
    storageBucket: "triftel-app.appspot.com",
    messagingSenderId: "519886282578",
    appId: "1:519886282578:web:0862a8d20a55ef6b3e248b",
    measurementId: "G-B96QNF2L2N"

    //.. Main
    // apiKey: "AIzaSyAZql0f6Ae1AgEML0bzJzvG8C8jp6Rcyns",
    // authDomain: "triftel-b7728.firebaseapp.com",
    // projectId: "triftel-b7728",
    // storageBucket: "triftel-b7728.appspot.com",
    // messagingSenderId: "170308493922",
    // appId: "1:170308493922:web:e4afd4dfde4eb7efd2a73b",
    // measurementId: "G-KQZXHEP2B2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

export const Authentication = getAuth(app)