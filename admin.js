import { db, auth } from "./firebase-config.js";
import {
collection,
getDocs,
doc,
getDoc,
setDoc,
deleteDoc
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

import {
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const collegeSelect = document.getElementById("collegeSelect");
const adminCollegeList = document.getElementById("adminCollegeList");

onAuthStateChanged(auth,(user)=>{
if(!user){
window.location.href="login.html";
}else{
loadColleges();
}
});

async function loadColleges(){
adminCollegeList.innerHTML="";

const querySnapshot = await getDocs(collection(db,"colleges"));

querySnapshot.forEach((docSnap)=>{
const option=document.createElement("option");
option.value=docSnap.id;
adminCollegeList.appendChild(option);
});
}

window.loadCollege = async function(){
const id=collegeSelect.value;
if(!id) return;

const docRef=doc(db,"colleges",id);
const snap=await getDoc(docRef);

if(!snap.exists()) return;

const data=snap.data();

document.getElementById("collegeNameBn").value=data.collegeNameBn || "";
document.getElementById("collegeNameEn").value=data.collegeNameEn || "";
document.getElementById("established").value=data.established || "";
document.getElementById("transparentLogo").value=data.transparentLogo || "";
document.getElementById("whiteLogo").value=data.whiteLogo || "";
document.getElementById("principalSignature").value=data.principalSignature || "";
document.getElementById("website").value=data.website || "";
document.getElementById("email").value=data.email || "";
document.getElementById("phone").value=data.phone || "";
document.getElementById("address").value=data.address || "";
};

window.saveCollege = async function(){
const id=collegeSelect.value;
if(!id) return alert("Select college");

await setDoc(doc(db,"colleges",id),{
collegeNameBn:document.getElementById("collegeNameBn").value,
collegeNameEn:document.getElementById("collegeNameEn").value,
established:document.getElementById("established").value,
transparentLogo:document.getElementById("transparentLogo").value,
whiteLogo:document.getElementById("whiteLogo").value,
principalSignature:document.getElementById("principalSignature").value,
website:document.getElementById("website").value,
email:document.getElementById("email").value,
phone:document.getElementById("phone").value,
address:document.getElementById("address").value
});

alert("Saved successfully");
};

window.addCollege = async function(){
const id=document.getElementById("newCollegeId").value.trim();
const name=document.getElementById("newCollegeName").value.trim();

if(!id || !name) return alert("Fill fields");

await setDoc(doc(db,"colleges",id),{
collegeNameEn:name,
collegeNameBn:name,
established:"",
transparentLogo:"",
whiteLogo:"",
principalSignature:"",
website:"",
email:"",
phone:"",
address:""
});

alert("College added");
loadColleges();
};

window.deleteCollege = async function(){
const id=collegeSelect.value;
if(!id) return;

await deleteDoc(doc(db,"colleges",id));

alert("Deleted");
loadColleges();
};

window.logout = async function(){
await signOut(auth);
window.location.href="login.html";
};