export enum ServiceStatus {
  AVAILABLE = 'available',
  UPCOMING = 'upcoming',
}

export type ServiceProps = {
  id: string;
  createdAt: string;
  updatedAt: string;
  serviceName: string;
  content: string;
  image: string;
  status: ServiceStatus;
  price: number;
  category?: string;
};

export type ServiceScheduleProps = {
  daysOfWeek: string;
  startTime: string;
  endTime: string;
  eachSessionDuration?: number;
};

export type ServiceDetailProps = ServiceProps & {
  schedules?: ServiceScheduleProps[];
};

export type ApiResponse<T> = {
  data: T;
};

export type ServiceListResponse = {
  data: ServiceProps[];
  meta?: {
    totalPage?: number;
    page?: number;
    limit?: number;
    total?: number;
  };
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
  title: string;
  date: string;
  city: string;
  country: string;
  content: string;
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
