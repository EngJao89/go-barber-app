export interface Scheduling {
  id: string;
  userId: string;
  barberId: string;
  dayAt: string;
  hourAt: string;
  serviceType: string;
  status: 'confirmado' | 'pendente' | 'cancelado' | 'concluido';
  createdAt: string;
  updatedAt: string;
}

export interface CreateSchedulingRequest {
  userId: string;
  barberId: string;
  dayAt: string;
  hourAt: string;
  serviceType: string;
}

export interface UpdateSchedulingRequest {
  status?: Scheduling['status'];
  dayAt?: string;
  hourAt?: string;
  serviceType?: string;
}
