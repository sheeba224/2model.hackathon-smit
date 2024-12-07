import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc, query, where, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyCJdjc3lxEmOgkYoF13hc1MWH_HqkunrWY",
    authDomain: "my-first-project-d8e81.firebaseapp.com",
    projectId: "my-first-project-d8e81",
    storageBucket: "my-first-project-d8e81.firebasestorage.app",
    messagingSenderId: "193078634586",
    appId: "1:193078634586:web:6fa5c1520d7f7434a85063",
    measurementId: "G-T5Z8E72TJH"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Cloud Firestore and get a reference to the service
  const db = firebase.firestore();
  
  function writeData() {
    db.collection("users")
      .add({
        firstName: "Ada",
        lastName: "Lovelace",
        email: "iqra@gmail.com",
        phone: 123456789,
        city: "Karachi",
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
  
  // writeData();
  
  function getData() {
    db.collection("users")
      .get()
      .then((data) => {
        // console.log(data)
        data.forEach((doc) => {
          console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
      });
  }
  
  // getData()
  
  async function getDataByEmail(email) {
      let users = [];
   
      // Await the Firestore query to get the data
      const data = await db.collection("users")
        .where("email", "==", email)
        .get();
   
      // Process the Firestore data after the query resolves
      data.forEach((doc) => {
        users.push(doc.id)
      });
   
      console.log('--------------', users);
      return users; // Ensure this happens after the Firestore query is resolved
    }
   
  
  const user = getDataByEmail("alishba497@gmail.com");
  
  function writeProductData() {
    db.collection("products")
      .add({
        itemId: 1,
        title: "book",
        price: 45,
        qty: 30,
      })
      .then((docRef) => {
        console.log("Product added with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
  
  // writeProductData()
  
  function writeOrderData() {
    db.collection("orders")
      .add({
        itemId: 1,
        qty: 2,
        email: "iqra@gmail.com",
        date: new Date().toLocaleString(),
      })
      .then((docRef) => {
        console.log("Product added with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
  
  // writeOrderData()
  
  function getOrder() {
    db.collection("orders")
      .get()
      .then((data) => {
        console.log("orders ..............", data);
        data.forEach((doc) => {
          console.log(`${doc.id} => ${JSON.stringify(doc.data())} orderssssssss`);
          let userEmail = doc.data().email;
          console.log(userEmail);
          getDataByEmail(userEmail);
        });
      });
  }
  
  // getOrder()
  
  function updateUserDetails(email) {
    getDataByEmail(email).then((users) => {
      console.log("user id: ", users); // This will now have the correct data
      var userRef = db.collection("users").doc(users[0]);
  
      // Set the "capital" field of the city 'DC'
      return userRef
        .update({
          firstName: "New User",
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    });
  }
  
  // updateUserDetails("iqra@gmail.com");
  
  function deleteUserData(email) {
      getDataByEmail(email).then((users) => {
          console.log("user id: ", users); // This will now have the correct data
          var userRef = db.collection("users").doc(users[0]);
  
          return userRef.delete().then(() => {
              console.log("Document successfully deleted!");
          }).catch((error) => {
              console.error("Error removing document: ", error);
          });
      })
  }
  
  deleteUserData('alishba497@gmail.com')

        constapp = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        // Handle Sign Up Form Submission
        const signupForm = document.getElementById('signup-form');
        const messageDiv = document.getElementById('message');

        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent form reload
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                messageDiv.textContent = "Sign up successful! Welcome, " + userCredential.user.email;
                messageDiv.className = "success";
            } catch (error) {
                messageDiv.textContent = error.message;
                messageDiv.className = "error";
            }
        });