import { signinUser, UserToken, loginUser } from "app/lib/apiUsers";
import { createSession } from "app/lib/session";

export interface ActionResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const signinAction = async (
  _state: ActionResponse,
  formData: FormData
): Promise<ActionResponse> => {
  try {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      return { success: false, message: "Faltan datos de registro" };
    }
	
	const response = await signinUser(username, password)
	
	if (response.status === 400) {
		return { success: false, message: "El nombre de usuario ya existe" }
	}

    if (!response.ok) {
      return { success: false, message: "Error al registrarse" };
    }
	
    const data = await response.json() as UserToken;
	await createSession(data.token, data.username);
    return { success: true, message: "Registro exitoso", data };
  } catch (error) {
    return { success: false, message: "Error interno en el servidor" };
  }
};

export const loginAction = async (
  _state: ActionResponse,
  formData: FormData
): Promise<ActionResponse> => {
  try {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      return { success: false, message: "Faltan datos de registro" };
    }
	
	const response = await loginUser(username, password)
	
	if (response.status === 400) {
		return { success: false, message: "Usuario o contraseña incorrectos" }
	}

    if (!response.ok) {
      return { success: false, message: "Error al iniciar sesión" };
    }
	
    const data = await response.json() as UserToken;
	await createSession(data.token, data.username);
    return { success: true, message: "Inicio de sesión exitoso", data };
  } catch (error) {
    return { success: false, message: "Error interno en el servidor" };
  }
};


