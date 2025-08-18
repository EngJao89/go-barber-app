export interface Barber {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  barbershop: string;
  created_at: string;
}

export interface CreateBarberRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  barbershop: string;
}

export interface UpdateBarberRequest {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  barbershop?: string;
}

export interface BarberResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  barbershop: string;
  created_at: string;
} 