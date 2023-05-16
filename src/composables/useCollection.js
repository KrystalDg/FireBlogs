import { ref } from "vue";
import { projectFirestore } from "../firebase";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";

const useCollection = (name) => {
  const errorStore = ref(null);

  async function addRecord(userId, record) {
    errorStore.value = null;
    try {
      if (!userId) {
        const response = await addDoc(
          collection(projectFirestore, name),
          record
        );
        return response;
      } else {
        const response = await setDoc(
          doc(projectFirestore, name, userId),
          record
        );
        return response;
      }
    } catch (err) {
      console.log(err.code);
      errorStore.value = err.message;
    }
  }
  return { errorStore, addRecord };
};

export default useCollection;
