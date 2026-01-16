export type ManageActivityCardProps = {
  activity: {
    id: number;
    title: string;
    rating: number;
    reviewCount: number;
    price: number;
    bannerImageUrl: string;
  };
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};
