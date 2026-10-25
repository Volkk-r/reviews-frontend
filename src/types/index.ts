
export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string | null;
}

export interface AuthResponse {
  user: User;
  token: string;
}
