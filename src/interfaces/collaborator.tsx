export interface IToken {
  uuid_collaborator: string;
  uuid_business: string;
  creation_date: string;
  exp: number;
}

export interface Collaborator {
  uuidcollaborator: string;
  name: string;
  lastname: string;
  documenttype: string;
  documentnumber: string;
  phonenumber?: string;
  email?: string;
  status: string;
  changePassword: boolean;
  emailVerify: boolean;
  urlprofile?: string;
}

export interface ProfileForm {
  email: string;
  phone: string;
  image?: File;
}

export interface SecurityForm {
  oldpassword: string;
  newpassword: string;
}
