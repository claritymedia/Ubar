// This file simulates a backend database. 
// In a real production environment (AWS/Firebase), this data would live on a secure server.

export interface DriverProfile {
  id: string;
  pin: string;
  name: string;
  vehicle: string;
  rating: number;
  totalRides: number;
  earnings: string;
  onlineTime: string;
  avatar: string;
}

export const AUTHORIZED_DRIVERS: DriverProfile[] = [
  {
    id: 'UB-ADMIN',
    pin: '2026',
    name: 'Neon Dave (Lead)',
    vehicle: 'Sprinter VIP Lounge X1',
    rating: 5.0,
    totalRides: 1420,
    earnings: '$450.00',
    onlineTime: '6h 30m',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'UB-8842',
    pin: '1234',
    name: 'Sarah Jenkins',
    vehicle: 'Cadillac Escalade ESV',
    rating: 4.9,
    totalRides: 842,
    earnings: '$142.50',
    onlineTime: '4h 12m',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'UB-9901',
    pin: '7777',
    name: 'Marcus Ford',
    vehicle: 'Mercedes Sprinter Party Bus',
    rating: 4.8,
    totalRides: 120,
    earnings: '$85.00',
    onlineTime: '1h 05m',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  }
];

export const checkCredentials = (id: string, pin: string): DriverProfile | undefined => {
  return AUTHORIZED_DRIVERS.find(d => d.id.toUpperCase() === id.toUpperCase() && d.pin === pin);
};