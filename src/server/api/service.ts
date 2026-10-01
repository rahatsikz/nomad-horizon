import 'server-only';

import { ServerApiError, serverFetch } from '@/lib/server-api';
import { ServiceStatus } from '@/types/common';
import type {
  ApiResponse,
  ServiceDetailProps,
  ServiceListResponse,
  ServiceProps,
} from '@/types/common';

const SERVICE_PATH = '/services';
const SERVICE_REVALIDATE_SECONDS = 3600;

type GetServiceListOptions = {
  status?: ServiceStatus;
  limit?: number;
};

export async function getServiceList({
  status = ServiceStatus.AVAILABLE,
  limit = 100,
}: GetServiceListOptions = {}): Promise<ServiceProps[]> {
  const services: ServiceProps[] = [];
  let page = 1;
  let totalPage = 1;

  do {
    const response = await serverFetch<ApiResponse<ServiceListResponse>>(SERVICE_PATH, {
      params: { page, limit, status },
      next: { revalidate: SERVICE_REVALIDATE_SECONDS },
    });

    services.push(...response.data.data);
    totalPage = response.data.meta?.totalPage ?? page;
    page += 1;
  } while (page <= totalPage);

  return services;
}

export async function getService(id: string): Promise<ApiResponse<ServiceDetailProps>> {
  const response = await serverFetch<ApiResponse<ServiceDetailProps | null>>(
    `${SERVICE_PATH}/${id}`,
    {
      next: { revalidate: SERVICE_REVALIDATE_SECONDS },
    },
  );

  if (!response.data) {
    throw new ServerApiError('Service not found', 404, response);
  }

  return response as ApiResponse<ServiceDetailProps>;
}
