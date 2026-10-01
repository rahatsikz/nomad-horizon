import React from 'react';
import ServiceDetailsContent from './ServiceDetailsContent';
import { notFound } from 'next/navigation';
import { getService, getServiceList } from '@/server/api/service';
import { ServerApiError } from '@/lib/server-api';
import { ServiceStatus } from '@/types/common';

export async function generateStaticParams() {
  const services = await getServiceList({ status: ServiceStatus.AVAILABLE });

  return services.map((service) => ({ id: String(service.id) }));
}

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const response = await getService(id);
    if (response.data.status !== ServiceStatus.AVAILABLE) {
      return { title: 'Nomad Horizon' };
    }

    return { title: response.data.serviceName + ' - Nomad Horizon' };
  } catch (error) {
    if (error instanceof ServerApiError && error.status === 404) {
      return { title: 'Service not found' };
    }

    return { title: 'Service details' };
  }
}

export default async function ServiceDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const response = await getService(id);
    if (response.data.status !== ServiceStatus.AVAILABLE) {
      notFound();
    }
    return <ServiceDetailsContent id={id} initialService={response.data} />;
  } catch (error) {
    if (error instanceof ServerApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }
}
