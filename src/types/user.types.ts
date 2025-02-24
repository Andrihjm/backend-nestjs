export interface CreateUserTypes {
  email: string;
  username: string;
  password: string;
}

export interface LoginUserTypes {
  email: string;
  username: string;
  password: string;
}

export interface CreateProfileTypes {
  displayName: string;
  gender: string;
  birthday: string;
  height?: number;
  weight?: number;
  image?: string;
}
