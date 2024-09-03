export interface Ireg extends Ilogin {
  name: string;
  rePassword: string;
  phone: string;
}
export interface Ilogin {
  password: string;
  email: string;
}
