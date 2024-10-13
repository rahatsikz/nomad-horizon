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

export type NewsProps = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  content: string;
};

export type BlogProps = {
  id: string;
  title: string;
  author: string;
  publishDate: string;
  image: string;
  content: string;
};

export type ScheduleTimeProps = {
  sessionStarts: string;
  sessionEnds: string;
  available: boolean;
};

export type TableColumnProps = {
  tableHeader: string;
  dataIndex: string;
  renders?: any;
};

export type ResponseSuccessType<T> = T & { meta: IMeta };

export type IMeta = {
  page: number;
  limit: number;
  total: number;
};
