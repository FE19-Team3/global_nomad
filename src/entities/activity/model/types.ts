export interface Activity {
  id: number;
  title: string;
  rating?: number;
  reviewCount?: number;
  price: number;
  imageUrl?: string;
  category?: string;
  address?: string;
  description?: string;
}
