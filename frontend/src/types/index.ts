export type UserRole = 'ADMIN' | 'MANAGER' | 'DRIVER' | 'PASSENGER';

export type DriverRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface DriverVehicle {
  plate: string;
  state: string;
  model: string;
  brand: string;
  year: number;
  hasAC: boolean;
  hasUSB: boolean;
  hasPowerOutlet?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  role: UserRole;
  isCoopMember: boolean;
  isSubscribed?: boolean;
  rating: number;
  totalTrips: number;
  vehicle?: DriverVehicle;
  driverRequestStatus?: DriverRequestStatus;
  pixKey?: string;
}

export interface Ride {
  id: string;
  driverId: string;
  driverName: string;
  driverAvatar: string;
  driverRating: number;
  driverTripsCount: number;
  isCoopMember: boolean;
  
  originCity: string;
  originSpot: string;
  destinationCity: string;
  destinationSpot: string;
  
  departureDate: string; // YYYY-MM-DD
  departureTime: string; // HH:mm
  estimatedDuration: string; // e.g., "1h 30m"
  estimatedArrivalTime: string; // HH:mm
  
  pricePerSeat: number; // in BRL, e.g., 35.00
  totalSeats: number;
  availableSeats: number;
  
  vehicle: DriverVehicle;
  notes?: string;
  status: 'PUBLISHED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export interface Booking {
  id: string;
  rideId: string;
  passengerId: string;
  passengerName: string;
  seatsBooked: number;
  totalAmount: number;
  amountPaidSignal: number; // 50%
  amountDueFinal: number; // 50%
  status: 'AWAITING_PAYMENT' | 'SIGNAL_CONFIRMED' | 'FULLY_PAID' | 'CANCELLED';
  pixQrCodeUrl: string;
  pixCopyPasteCode: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  rideId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  createdAt: string;
}

export interface DriverRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  cnhNumber: string;
  vehicle: DriverVehicle;
  status: DriverRequestStatus;
  createdAt: string;
  rejectionReason?: string;
}

export interface RideReview {
  id: string;
  rideId: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}
