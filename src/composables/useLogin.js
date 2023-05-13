import { ref } from "vue";
import { projectAuth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const error = ref(null);
const isPending = ref(false);

async function login(email, password) {
  isPending.value = true;
  error.value = null;
  try {
    const response = await signInWithEmailAndPassword(
      projectAuth,
      email,
      password
    );
    if (!response) {
      throw new Error("Could not sign in.");
    }
    console.log(response.user);
    return response;
  } catch (err) {
    console.log(err.code);
    error.value = err.message;
  } finally {
    isPending.value = false;
  }
}

export function useLogin() {
  return { error, isPending, login };
}
