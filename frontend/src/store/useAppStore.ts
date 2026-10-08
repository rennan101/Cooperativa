import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Ride, Booking, User, UserRole, ChatMessage, DriverRequest, RideReview, DriverVehicle } from '../types';

interface AppState {
  currentUser: User;
  role: UserRole;
  rides: Ride[];
  bookings: Booking[];
  messages: ChatMessage[];
  driverRequests: DriverRequest[];
  reviews: RideReview[];
  searchParams: {
    origin: string;
    destination: string;
    date: string;
    seats: number;
  };
  
  setRole: (role: UserRole) => void;
  setSearchParams: (params: Partial<AppState['searchParams']>) => void;
  addRide: (ride: Omit<Ride, 'id' | 'driverId' | 'driverName' | 'driverAvatar' | 'driverRating' | 'driverTripsCount' | 'isCoopMember'>) => Ride;
  bookRide: (rideId: string, seats: number) => Booking;
  confirmBookingPayment: (bookingId: string) => void;
  cancelBooking: (bookingId: string) => { refundPercent: number; refundAmount: number };
  
  // Driver Access Flow
  submitDriverRequest: (cnh: string, vehicle: DriverVehicle) => void;
  approveDriverRequest: (requestId: string) => void;
  rejectDriverRequest: (requestId: string, reason: string) => void;
  
  // Real-time Chat
  sendMessage: (rideId: string, text: string) => void;
  addSimulatedReply: (rideId: string, text: string, senderName: string, senderAvatar: string) => void;
  
  // Ratings
  submitReview: (rideId: string, toUserId: string, rating: number, comment?: string) => void;
  
  // Profile & System
  updateUserPixKey: (pixKey: string) => void;
  resetToDefaults: () => void;
  releaseCustody: (bookingId: string) => void;
}

const initialMockUser: User = {
  id: 'usr_01',
  name: 'Carlos Alberto Silva',
  email: 'carlos.silva@empresa.com.br',
  phone: '(11) 98765-4321',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'PASSENGER', // default passenger
  isCoopMember: true,
  rating: 4.9,
  totalTrips: 12,
  pixKey: 'carlos.silva@empresa.com.br',
  driverRequestStatus: undefined,
  vehicle: {
    plate: 'ABC-4E21',
    state: 'SP',
    brand: 'Toyota',
    model: 'Corolla Sedan 2.0',
    year: 2023,
    hasAC: true,
    hasUSB: true,
    hasPowerOutlet: true,
  }
};

const initialMockRides: Ride[] = [
  {
    id: 'ride_01',
    driverId: 'drv_101',
    driverName: 'Marcos Vinicius',
    driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    driverRating: 4.9,
    driverTripsCount: 88,
    isCoopMember: true,
    originCity: 'São Paulo, SP',
    originSpot: 'Metrô Portuguesa-Tietê (Entrada Principal)',
    destinationCity: 'Campinas, SP',
    destinationSpot: 'Shopping Dom Pedro / Rodoviária',
    departureDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    departureTime: '08:30',
    estimatedDuration: '1h 20m',
    estimatedArrivalTime: '09:50',
    pricePerSeat: 35.00,
    totalSeats: 3,
    availableSeats: 2,
    vehicle: {
      plate: 'BRA-2E19',
      state: 'SP',
      brand: 'Honda',
      model: 'Civic 2.0',
      year: 2022,
      hasAC: true,
      hasUSB: true,
    },
    notes: 'Saída pontual. Espaço para 1 mala de mão por pessoa.',
    status: 'PUBLISHED',
  },
  {
    id: 'ride_02',
    driverId: 'drv_102',
    driverName: 'Renata Oliveira',
    driverAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    driverRating: 5.0,
    driverTripsCount: 142,
    isCoopMember: true,
    originCity: 'São Paulo, SP',
    originSpot: 'Av. Paulista (Próximo ao MASP)',
    destinationCity: 'São José dos Campos, SP',
    destinationSpot: 'Centro Empresarial DCTA',
    departureDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    departureTime: '07:15',
    estimatedDuration: '1h 10m',
    estimatedArrivalTime: '08:25',
    pricePerSeat: 40.00,
    totalSeats: 4,
    availableSeats: 3,
    vehicle: {
      plate: 'SJC-8921',
      state: 'SP',
      brand: 'Jeep',
      model: 'Compass Longitude',
      year: 2023,
      hasAC: true,
      hasUSB: true,
      hasPowerOutlet: true,
    },
    notes: 'Ar-condicionado e carregador disponíveis.',
    status: 'PUBLISHED',
  },
  {
    id: 'ride_03',
    driverId: 'drv_103',
    driverName: 'Eduardo Castro',
    driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    driverRating: 4.8,
    driverTripsCount: 45,
    isCoopMember: false,
    originCity: 'Belo Horizonte, MG',
    originSpot: 'Praça da Savassi',
    destinationCity: 'Ouro Preto, MG',
    destinationSpot: 'Praça Tiradentes',
    departureDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    departureTime: '09:00',
    estimatedDuration: '1h 40m',
    estimatedArrivalTime: '10:40',
    pricePerSeat: 45.00,
    totalSeats: 3,
    availableSeats: 3,
    vehicle: {
      plate: 'MGH-4412',
      state: 'MG',
      brand: 'Volkswagen',
      model: 'T-Cross 1.4 TSI',
      year: 2021,
      hasAC: true,
      hasUSB: true,
    },
    notes: 'Parada rápida para café se os passageiros concordarem.',
    status: 'PUBLISHED',
  },
  {
    id: 'ride_04',
    driverId: 'drv_104',
    driverName: 'Patrícia Lima',
    driverAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    driverRating: 4.9,
    driverTripsCount: 62,
    isCoopMember: true,
    originCity: 'São Paulo, SP',
    originSpot: 'Metrô Jabaquara',
    destinationCity: 'Santos, SP',
    destinationSpot: 'Gonzaga / Canal 3',
    departureDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    departureTime: '18:00',
    estimatedDuration: '1h 15m',
    estimatedArrivalTime: '19:15',
    pricePerSeat: 30.00,
    totalSeats: 3,
    availableSeats: 3,
    vehicle: {
      plate: 'STS-3301',
      state: 'SP',
      brand: 'Toyota',
      model: 'Yaris Sedan',
      year: 2022,
      hasAC: true,
      hasUSB: true,
    },
    notes: 'Viagem tranquila direto pela Imigrantes.',
    status: 'PUBLISHED',
  },
  {
    id: 'ride_05',
    driverId: 'drv_105',
    driverName: 'Lucas Ferreira',
    driverAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    driverRating: 4.7,
    driverTripsCount: 29,
    isCoopMember: false,
    originCity: 'Campinas, SP',
    originSpot: 'Terminal Rodoviário Ramos de Azevedo',
    destinationCity: 'São Paulo, SP',
    destinationSpot: 'Metrô Barra Funda',
    departureDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    departureTime: '06:45',
    estimatedDuration: '1h 20m',
    estimatedArrivalTime: '08:05',
    pricePerSeat: 35.00,
    totalSeats: 3,
    availableSeats: 1,
    vehicle: {
      plate: 'CMP-7782',
      state: 'SP',
      brand: 'Nissan',
      model: 'Kicks 1.6',
      year: 2023,
      hasAC: true,
      hasUSB: true,
    },
    notes: 'Destino final na Barra Funda para conexão rápida.',
    status: 'PUBLISHED',
  }
];

const initialMockDriverRequests: DriverRequest[] = [
  {
    id: 'req_01',
    userId: 'usr_88',
    userName: 'Juliana Mendes',
    userEmail: 'juliana.mendes@tech.com',
    userPhone: '(11) 97123-4455',
    cnhNumber: '05489123890',
    vehicle: {
      plate: 'FTW-9912',
      state: 'SP',
      brand: 'Chevrolet',
      model: 'Onix Plus Premier',
      year: 2023,
      hasAC: true,
      hasUSB: true,
    },
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'req_02',
    userId: 'usr_89',
    userName: 'Fernando Costa',
    userEmail: 'fernando.costa@logistica.com',
    userPhone: '(19) 98844-3322',
    cnhNumber: '09812377654',
    vehicle: {
      plate: 'FNC-1029',
      state: 'SP',
      brand: 'Volkswagen',
      model: 'Nivus Highline',
      year: 2022,
      hasAC: true,
      hasUSB: true,
    },
    status: 'APPROVED',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

const initialMockMessages: ChatMessage[] = [
  {
    id: 'msg_01',
    rideId: 'ride_01',
    senderId: 'drv_101',
    senderName: 'Marcos Vinicius',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    text: 'Olá! Estarei no portão 2 do Metrô Tietê às 08:20 com o Civic prata.',
    createdAt: '08:00',
  }
];

const initialMockBookings: Booking[] = [
  {
    id: 'book_demo_01',
    rideId: 'ride_01',
    passengerId: 'usr_01',
    passengerName: 'Carlos Alberto Silva',
    seatsBooked: 1,
    totalAmount: 35.00,
    amountPaidSignal: 17.50,
    amountDueFinal: 17.50,
    status: 'SIGNAL_CONFIRMED',
    pixQrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020126580014BR.GOV.BCB.PIX0136cooperativa-custodia520400005303986540517.50',
    pixCopyPasteCode: '00020126580014BR.GOV.BCB.PIX0136cooperativa-custodia520400005303986540517.505802BR5916COOPERATIVA6009SAOPAULO62070503***6304ABCD',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  }
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: initialMockUser,
      role: 'PASSENGER',
      rides: initialMockRides,
      bookings: initialMockBookings,
      messages: initialMockMessages,
      driverRequests: initialMockDriverRequests,
      reviews: [],
      searchParams: {
        origin: 'São Paulo, SP',
        destination: 'Campinas, SP',
        date: new Date().toISOString().split('T')[0],
        seats: 1,
      },

      setRole: (role) => set((state) => ({
        role,
        currentUser: {
          ...state.currentUser,
          role,
        }
      })),

      setSearchParams: (params) => set((state) => ({
        searchParams: { ...state.searchParams, ...params }
      })),

      addRide: (newRideData) => {
        const state = get();
        const newRide: Ride = {
          ...newRideData,
          id: `ride_${Date.now()}`,
          driverId: state.currentUser.id,
          driverName: state.currentUser.name,
          driverAvatar: state.currentUser.avatarUrl,
          driverRating: state.currentUser.rating,
          driverTripsCount: state.currentUser.totalTrips,
          isCoopMember: false,
          status: 'PUBLISHED',
        };

        set({ rides: [newRide, ...state.rides] });
        return newRide;
      },

      bookRide: (rideId, seats) => {
        const state = get();
        const ride = state.rides.find(r => r.id === rideId);
        if (!ride) throw new Error('Viagem não encontrada');

        const totalAmount = ride.pricePerSeat * seats;
        const amountPaidSignal = totalAmount * 0.5;
        const amountDueFinal = totalAmount * 0.5;

        const newBooking: Booking = {
          id: `book_${Date.now()}`,
          rideId,
          passengerId: state.currentUser.id,
          passengerName: state.currentUser.name,
          seatsBooked: seats,
          totalAmount,
          amountPaidSignal,
          amountDueFinal,
          status: 'AWAITING_PAYMENT',
          pixQrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020126580014BR.GOV.BCB.PIX0136cooperativa-custodia5204000053039865405${amountPaidSignal.toFixed(2)}`,
          pixCopyPasteCode: `00020126580014BR.GOV.BCB.PIX0136cooperativa-custodia5204000053039865405${amountPaidSignal.toFixed(2)}5802BR5916COOPERATIVA6009SAOPAULO62070503***6304ABCD`,
          createdAt: new Date().toISOString(),
        };

        const updatedRides = state.rides.map(r => {
          if (r.id === rideId) {
            return { ...r, availableSeats: Math.max(0, r.availableSeats - seats) };
          }
          return r;
        });

        set({
          bookings: [newBooking, ...state.bookings],
          rides: updatedRides,
        });

        return newBooking;
      },

      confirmBookingPayment: (bookingId) => {
        set((state) => ({
          bookings: state.bookings.map(b => 
            b.id === bookingId ? { ...b, status: 'SIGNAL_CONFIRMED' } : b
          )
        }));
      },

      cancelBooking: (bookingId) => {
        const state = get();
        const booking = state.bookings.find(b => b.id === bookingId);
        if (!booking) return { refundPercent: 0, refundAmount: 0 };

        const refundPercent = 70;
        const refundAmount = (booking.amountPaidSignal * refundPercent) / 100;

        const updatedRides = state.rides.map(r => {
          if (r.id === booking.rideId) {
            return { ...r, availableSeats: r.availableSeats + booking.seatsBooked };
          }
          return r;
        });

        set({
          bookings: state.bookings.map(b => 
            b.id === bookingId ? { ...b, status: 'CANCELLED' } : b
          ),
          rides: updatedRides,
        });

        return { refundPercent, refundAmount };
      },

      submitDriverRequest: (cnh, vehicle) => {
        const state = get();
        const newRequest: DriverRequest = {
          id: `req_${Date.now()}`,
          userId: state.currentUser.id,
          userName: state.currentUser.name,
          userEmail: state.currentUser.email,
          userPhone: state.currentUser.phone,
          cnhNumber: cnh,
          vehicle,
          status: 'PENDING',
          createdAt: new Date().toISOString(),
        };

        set({
          driverRequests: [newRequest, ...state.driverRequests],
          currentUser: {
            ...state.currentUser,
            driverRequestStatus: 'PENDING',
            vehicle,
          }
        });
      },

      approveDriverRequest: (requestId) => {
        set((state) => {
          const targetReq = state.driverRequests.find(r => r.id === requestId);
          const isCurrentUser = targetReq?.userId === state.currentUser.id;

          return {
            driverRequests: state.driverRequests.map(r => 
              r.id === requestId ? { ...r, status: 'APPROVED' } : r
            ),
            role: isCurrentUser ? 'DRIVER' : state.role,
            currentUser: isCurrentUser ? {
              ...state.currentUser,
              role: 'DRIVER',
              driverRequestStatus: 'APPROVED',
            } : state.currentUser,
          };
        });
      },

      rejectDriverRequest: (requestId, reason) => {
        set((state) => {
          const targetReq = state.driverRequests.find(r => r.id === requestId);
          const isCurrentUser = targetReq?.userId === state.currentUser.id;

          return {
            driverRequests: state.driverRequests.map(r => 
              r.id === requestId ? { ...r, status: 'REJECTED', rejectionReason: reason } : r
            ),
            currentUser: isCurrentUser ? {
              ...state.currentUser,
              driverRequestStatus: 'REJECTED',
            } : state.currentUser,
          };
        });
      },

      sendMessage: (rideId, text) => {
        const state = get();
        const newMsg: ChatMessage = {
          id: `msg_${Date.now()}`,
          rideId,
          senderId: state.currentUser.id,
          senderName: state.currentUser.name,
          senderAvatar: state.currentUser.avatarUrl,
          text,
          createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        set({ messages: [...state.messages, newMsg] });
      },

      addSimulatedReply: (rideId, text, senderName, senderAvatar) => {
        const newMsg: ChatMessage = {
          id: `msg_sim_${Date.now()}`,
          rideId,
          senderId: 'drv_sim',
          senderName,
          senderAvatar,
          text,
          createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        set((state) => ({ messages: [...state.messages, newMsg] }));
      },

      submitReview: (rideId, toUserId, rating, comment) => {
        const state = get();
        const newReview: RideReview = {
          id: `rev_${Date.now()}`,
          rideId,
          fromUserId: state.currentUser.id,
          fromUserName: state.currentUser.name,
          toUserId,
          rating,
          comment,
          createdAt: new Date().toISOString(),
        };

        set({ reviews: [newReview, ...state.reviews] });
      },

      updateUserPixKey: (pixKey) => {
        set((state) => ({
          currentUser: {
            ...state.currentUser,
            pixKey,
          }
        }));
      },

      releaseCustody: (bookingId) => {
        set((state) => ({
          bookings: state.bookings.map(b =>
            b.id === bookingId ? { ...b, status: 'FULLY_PAID' } : b
          )
        }));
      },

      resetToDefaults: () => {
        set({
          currentUser: initialMockUser,
          role: 'PASSENGER',
          rides: initialMockRides,
          bookings: initialMockBookings,
          messages: initialMockMessages,
          driverRequests: initialMockDriverRequests,
          reviews: [],
          searchParams: {
            origin: 'São Paulo, SP',
            destination: 'Campinas, SP',
            date: new Date().toISOString().split('T')[0],
            seats: 1,
          },
        });
      },
    }),
    {
      name: 'cooperativa_app_state_v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
