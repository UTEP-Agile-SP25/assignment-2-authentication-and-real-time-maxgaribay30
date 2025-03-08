import { doc, setDoc, collection, deleteDoc, onSnapshot} from "firebase/firestore";
import { signUp, logout, login, onAuthSatateChanged } from "./auth"
import { db } from "./config";


const saveSong = async function(){
    const songName = document.getElementById("songname").value.trim()
    const artistName = document.getElementById("artistname").value.trim()

    try{

        const songRef = doc(db, "songs", songName.toLowerCase()+"-"+artistName.toLowerCase())

        await setDoc(songRef,{
            name: songName,
            artist: artistName,

            time: new Date()
        })
        console.log("Song succesfully added")
        document.getElementById("songname").value =""
        document.getElementById("artistname").value =""
    }catch(error){
        console.error("Error saving song", error)
    }
}

const deleteSong = async function(collection, docID){
    try{
        await deleteDoc(doc(db, collection, docID))
        console.log(`Document with ID ${docID} deleted successfully`)
    }catch(error){
        console.error("Error deleting song ", error)
    }
}

const songCollection = collection(db, "songs")
onSnapshot(songCollection, (snapshot)=>{
    const tableBody = document.getElementById("table-body")
    tableBody.innerHTML = ""

    snapshot.forEach((doc)=>{
        const data = doc.data()
        const row = document.createElement("tr")

        row.innerHTML = `
    <td> ${doc.id}</td>
    <td> ${data.name}</td>
    <td> ${data.artist}</td>
    `
    tableBody.appendChild(row)
    })
})

const addSongForm = document.querySelector("#addSong")
addSongForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    saveSong()
})

const deleteSongForm = document.querySelector("#deleteSong")
deleteSongForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    const song = document.getElementById("songID").value
    deleteSong("songs", song)
})