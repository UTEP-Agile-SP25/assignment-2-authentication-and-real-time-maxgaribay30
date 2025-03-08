import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDocs, setDoc, collection } from "firebase/firestore";
import { auth } from "./config";
import { db } from "./config";



onAuthStateChanged(auth, async (user)=>{
    if(user){
        console.log("Logged In User: ", user.email)
        await fetchUserData(user.uid)
    }else{
        console.log("no user is signed in")
    }
})

async function fetchUserData(userID){
    try{
        const userDoc = await getDocs(collection(db, "users"))
        const userData = userDoc.docs.find(doc => doc.id===userID)?.data()
        console.log("User data: ", userData)
        document.getElementById("greeting").innerHTML = "<h1>Hi, "+userData.firstname +"</h1>"
    }catch(error){
        console.error("error getting user data: ", error)
    }
}

export async function signUp(firstName, lastName, email, password){
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        console.log("User signed up:", userCredential.user.email)
        console.log("User ID:", userCredential.user.uid)
        const userRef = doc(db, "users", userCredential.user.uid)

        await setDoc(userRef,{
            firstname:firstName,
            lastname:lastName,
            timestamp: new Date()
        })
    }catch(error){
        console.error("Error fetching user data: ", error)
    }
}

export async function login(email, password){
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        window.location.href = "songs.html"
    }catch(error){
        console.error("Login error: "+error.message)
    }
}

export async function logout(){
    try{
        await signOut(auth)
        console.log("User Logged Out")
    }catch(error){
        console.error("Logout error: ", error.message)
    }
}