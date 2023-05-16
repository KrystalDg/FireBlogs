import { ref } from "vue";
import { projectAuth, projectFirestore } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

const user = ref(projectAuth.currentUser);

onAuthStateChanged(projectAuth, (_user) => {
  if (_user) {
    // console.log(_user);
    user.value = _user;
  }
});

function getUser() {
  return { user };
}

async function getUserInfo(name) {
  const docRef = doc(projectFirestore, name, user.value.uid);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  data.id = user.value.uid;

  if (data) {
    console.log("Document data:", data.email);
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  return data;
}
async function getBlogInfo(name) {
  const docRef = query(
    collection(projectFirestore, name),
    where("profileId", "==", user.value.uid),
    orderBy("date", "desc")
  );
  const docSnap = await getDocs(docRef);
  return docSnap;
}

export function useUser() {
  return { getUser, getUserInfo, getBlogInfo };
}
