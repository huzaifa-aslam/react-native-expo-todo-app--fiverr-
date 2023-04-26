import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// const firebaseConfig = {
//   apiKey: "AIzaSyDaZHLVF_uPDXOdMvOIlRwWcxyFcxLSlGg",
//   authDomain: "todoapp-78af4.firebaseapp.com",
//   projectId: "todoapp-78af4",
//   storageBucket: "todoapp-78af4.appspot.com",
//   messagingSenderId: "517925427778",
//   appId: "1:517925427778:web:a4f52c6197a1d774c96bdb",
//   measurementId: "G-K49BPM4YYV",
//   databaseURL:'https://todoapp-78af4-default-rtdb.firebaseio.com/'
// };

const firebaseConfig = {
  apiKey: "AIzaSyBjHB52QlMtRwh0OQN0dCjEMsUnWw_3VAg",
  authDomain: "todo-app-fiverr.firebaseapp.com",
  projectId: "todo-app-fiverr",
  storageBucket: "todo-app-fiverr.appspot.com",
  messagingSenderId: "156800741456",
  appId: "1:156800741456:web:0b14a4e2b466b27a126155",
  measurementId: "G-J02LR2HM4L",
  databaseURL: "https://todo-app-fiverr-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase();
export const auth = getAuth(app);
