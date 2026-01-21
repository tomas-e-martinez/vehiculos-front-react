const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5125';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface VehicleType {
  id: number;
  name: string;
}

export interface CreateVehicleRequest {
  brand: string;
  model: string;
  year: number;
  kilometers: number;
  vehicleTypeId: number;
}

export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  kilometers: number;
  vehicleTypeId: number;
  vehicleType?: VehicleType;
}

class ApiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      let errorMessage = 'Ocurrió un error. Por favor intenta de nuevo.';

      try {
        const errorData: ApiError = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // If we can't parse the error, use status-based messages
        if (response.status === 401) {
          errorMessage = 'Credenciales incorrectas. Verifica tu correo y contraseña.';
        } else if (response.status === 400) {
          errorMessage = 'Datos inválidos. Por favor verifica la información.';
        } else if (response.status === 409) {
          errorMessage = 'Este correo electrónico ya está registrado.';
        } else if (response.status >= 500) {
          errorMessage = 'Error del servidor. Por favor intenta más tarde.';
        }
      }

      throw new Error(errorMessage);
    }

    return response.json();
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/users/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getVehicleTypes(): Promise<VehicleType[]> {
    return this.request<VehicleType[]>('/vehicle-types');
  }

  async createVehicle(data: CreateVehicleRequest): Promise<Vehicle> {
    return this.request<Vehicle>('/vehicles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiService(API_BASE_URL);
