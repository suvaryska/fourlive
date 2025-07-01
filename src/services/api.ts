const API_BASE_URL = 'http://localhost:3001/api';

// API response tipleri
interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

interface UserData {
  id: number;
  username: string;
  characterName: string;
  level: number;
  experience: number;
  nextLevelExp: number;
  money: number;
  bank: number;
  job: string;
  faction: string;
  playTime: string;
  joinDate: string;
  lastSeen: string;
  reputation: number;
  avatar: string;
}

interface LoginResponse extends ApiResponse {
  user: UserData;
}

interface RegisterResponse extends ApiResponse {
  userId: number;
}

interface UserResponse extends ApiResponse {
  user: UserData;
}

// API çağrıları için yardımcı fonksiyon
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Bir hata oluştu');
    }
    
    return data;
  } catch (error) {
    console.error('API çağrısı hatası:', error);
    throw error;
  }
}

// Kullanıcı girişi
export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  return apiCall<LoginResponse>('/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
};

// Kullanıcı kaydı
export const registerUser = async (username: string, password: string, email: string): Promise<RegisterResponse> => {
  return apiCall<RegisterResponse>('/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, email }),
  });
};

// Kullanıcı bilgilerini getir
export const getUserData = async (userId: number): Promise<UserResponse> => {
  return apiCall<UserResponse>(`/user/${userId}`, {
    method: 'GET',
  });
};

// Kullanıcı bilgilerini güncelle
export const updateUserData = async (userId: number, updateData: Partial<UserData>): Promise<ApiResponse> => {
  return apiCall<ApiResponse>(`/user/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(updateData),
  });
};

// Kullanıcının araçlarını getir
export const getUserVehicles = async (userId: number): Promise<{ success: boolean; vehicles: any[] }> => {
  return apiCall(`/user/${userId}/vehicles`, {
    method: 'GET',
  });
};

// Kullanıcının evlerini getir
export const getUserHouses = async (userId: number): Promise<{ success: boolean; houses: any[] }> => {
  return apiCall(`/user/${userId}/houses`, {
    method: 'GET',
  });
};

// Sunucu durumu kontrolü
export const checkServerStatus = async (): Promise<ApiResponse> => {
  return apiCall<ApiResponse>('/status', {
    method: 'GET',
  });
};

// Tip dışa aktarımları
export type { UserData, LoginResponse, RegisterResponse, UserResponse, ApiResponse }; 