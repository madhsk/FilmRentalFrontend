export interface Staff {
    staffId?: number;
    firstName: string;
    lastName: string;
    email: string;
    store?: { id?: number;
      name?: string;
    };
    address?: { 
      id?: number; 
      details?: string; 
    };
    username: string;
    password: string;
    active: boolean;
  }