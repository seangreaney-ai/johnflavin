export type UserRole = "customer" | "admin";

export interface WishlistItem {
  id: string;
  name: string;
  image: string;
  category: string;
  note?: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  created_at: string;
}

export type OptionType = "wood" | "finish" | "handle" | "worktop";

export interface Option {
  id: string;
  type: OptionType;
  name: string;
  image: string | null;
  description: string | null;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string | null;
  hero_image: string | null;
  gallery: string[];
  is_featured: boolean;
  sort_order: number;
}

export type ItemType = "product" | "option";

export interface Favourite {
  id: string;
  user_id: string;
  item_type: ItemType;
  item_id: string;
  created_at: string;
}

export type EnquiryStatus = "new" | "reviewed" | "met";

export interface Enquiry {
  id: string;
  user_id: string;
  submitted_at: string;
  status: EnquiryStatus;
  note: string | null;
}

export interface EnquiryItem {
  id: string;
  enquiry_id: string;
  item_type: ItemType;
  name: string;
  image: string | null;
  category: string | null;
  details: string | null;
}
