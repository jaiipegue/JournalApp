import {
  loginWithEmailPassword,
  logoutFirebase,
  sigInWithGoogle,
} from "../../../src/firebase/providers";
import {
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers");

describe("pruebas en auth thunks", () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("debe de invocar el checkingCredentials", async () => {
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSigIn debe de llamar checkingCredentials y login - Exito", async () => {
    const loginData = { ok: true, ...demoUser };
    await sigInWithGoogle.mockResolvedValue(loginData);
    //Thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSigIn debe de llamar checkingCredentials y logout - Error", async () => {
    const loginData = { ok: false, errorMessage: "Un error en google" };
    await sigInWithGoogle.mockResolvedValue(loginData);
    //Thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test("startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: "123456" };

    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(demoUser));
  });
  //   Error - startcreaithinuseWuthEmailPassword t-

  test("startLogout debe de llamar logoutFirebase, clearNotes y logout", async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
