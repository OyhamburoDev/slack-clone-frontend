import { jwtDecode } from "jwt-decode";
import { getAuthorizationToken } from "../constants/http";

/**
 * Obtiene los datos del usuario desde el token JWT
 * @returns {Object|null} - Retorna un objeto con los datos del usuario o null si no hay token
 */
export const getUserDataFromToken = () => {
  try {
    const token = getAuthorizationToken();

    if (!token) {
      return null;
    }
    const decodedToken = jwtDecode(token);

    return {
      id: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role,
      created_at: decodedToken.created_at,
    };
  } catch (error) {
    return null;
  }
};
