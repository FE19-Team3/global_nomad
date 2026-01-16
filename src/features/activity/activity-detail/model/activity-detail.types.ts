export type ActivityDetailSchedule = {
  date: string;
  times: {
    id: number;
    startTime: string;
    endTime: string;
  }[];
};

export type ActivityDetail = {
  id: number;
  title: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  userId: number;
  description: string;
  subImages: {
    id: number;
    imageUrl: string;
  }[];
  schedules: ActivityDetailSchedule[];
  createdAt: string;
  updatedAt: string;
};
