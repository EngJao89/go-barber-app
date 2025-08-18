export interface BarberScheduling {
  id: string;
  barberId: string;
  dayAt: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBarberSchedulingRequest {
  barberId: string;
  dayAt: string;
  startTime: string;
  endTime: string;
}

export interface UpdateBarberSchedulingRequest {
  dayAt?: string;
  startTime?: string;
  endTime?: string;
} 