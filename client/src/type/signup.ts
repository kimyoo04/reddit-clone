export interface ISignInForm {
  email: string;
  password: string;
  extraError?: string;
}

export interface ISignUpForm {
  email: string;
  username: string;
  phone: string;
  password: string;
  passwordCheck: string;
  extraError?: string;
}
