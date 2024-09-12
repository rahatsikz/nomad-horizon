export type ServiceProps = {
  id: string;
  createdAt: string;
  updatedAt: string;
  serviceName: string;
  content: string;
  image: string;
  status: string;
  price: number;
  categoryId: number;
};

export type ReviewProps = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  review: string;
  city: string;
};

export type EventProps = {
  id?: string;
  eventName: string;
  eventDate: string;
  location: string;
  description: string;
  category: string;
};
