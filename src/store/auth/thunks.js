import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  sigInWithGoogle,
} from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (enail, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await sigInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));
    dispatch(login(result));
  };
};

export const StartCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({
        email,
        password,
        displayName,
      });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, errorMessage, displayName, photoURL } =
      await loginWithEmailPassword({
        email,
        password,
      });
    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(logout());
  };
};
