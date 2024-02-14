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
  _id?: string;
  name: string;
  phoneNumber: string;
  city: string;
  address1: string;
  address2?: string;
  postalCode: number;
}

export interface ProductItemTypes {
  id: string;
  name: string;
  slug: string;
  price: number;
  features: string;
  weight: string;
  brandName: string;
  description: string;
  discountPercent: number;
  store: string;
  images: ImageItemTypes[];
  inStock: boolean;
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: Date;
  category: { name: string; _id: string };
  reviews: ReviewItemTypes[];
}

export interface ReviewItemTypes {
  _id: string;
  rating: number;
  review: string;
  createdAt: Date;
  user: { name: string; photo: string; username: string };
}

export interface CategoryItemTypes {
  _id: string;
  name: string;
  numberOfProducts: number;
  image: ImageItemTypes;
  products?: ProductItemTypes[];
}

export interface ImageItemTypes {
  imageUrl: string;
  cloudinaryId?: string;
  _id?: string;
  name?: string;
}

export interface NewsItemTypes {
  _id: string;
  title: string;
  images: ImageItemTypes[];
  text: string;
  createdAt: Date;
}
