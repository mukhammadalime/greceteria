export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  photo: string;
  role: string;
  status: string;
  addresses: AddressItem[];
  token: string;
}

export interface AddressItem {
  _id: string;
  name: string;
  phoneNumber: number;
  city: string;
  address1: string;
  address2?: string;
  postalCode: number;
}
