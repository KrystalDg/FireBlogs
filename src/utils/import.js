import { projectAuth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

// kiem tra xem user da dang nhap hay chua
export let auth = projectAuth;
export const checkAuthState = onAuthStateChanged;
