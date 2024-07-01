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
  stars: number;
  newsletters: boolean;
  preferences?: Preferences;
}

export interface Preferences {
  whatdoyouwant?: string[] | null;
  topproducts?: string[] | null;
  topservices?: string[] | null;
  toppromotions?: string[] | null;
  prefercommunication?: string[] | null;
  otherprefercommunication?: string | null;
}

export interface ProfileForm {
  email?: string;
  phone: string;
  image?: File;
  acceptPublicity: boolean;
  terms: boolean;
}

export interface SecurityForm {
  oldpassword: string;
  newpassword: string;
}
