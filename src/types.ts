export type CategoryId = 'all' | 'bundles' | 'wigs' | 'supplies' | 'fashion';

export interface ProductLengthOption {
  length: string;
  price: number;
  originalPrice: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryId;
  categoryName: string;
  image: string;
  tag: string;
  tagType: 'pink' | 'gold' | 'navy' | 'green';
  rating: number;
  reviewCount: number;
  lengthOptions: ProductLengthOption[];
  defaultLengthIndex: number;
  description: string;
  badge?: string;
  features: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  length: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  tag: string;
}

export interface BundleDealTier {
  id: string;
  lengths: string; // e.g. "14\" + 16\" + 18\""
  texture: string;
  dealPrice: number;
  retailPrice: number;
  savings: number;
  popular?: boolean;
}
