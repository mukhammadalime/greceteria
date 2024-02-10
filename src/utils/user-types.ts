export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  photo: string;
  role: string;
  addresses: AddressItemTypes[];
  token: string;
  phoneNumber: string;
}

export interface AddressItemTypes {
  _id: string;
  name: string;
  phoneNumber: string;
  city: string;
  address1: string;
  address2?: string;
  postalCode: number;
}
