interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthCredentials {
  user: User;
  token: string;
  refresh_token: string;
}

interface AuthStore {
  user: User | null;
  isAuth: boolean;
  setCredentials: (credentials: AuthCredentials) => Promise<void>;
  updateUser: (user: User) => void;
  logout: () => Promise<void>;
}
export { AuthCredentials, AuthStore, User };
