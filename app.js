/**
 * Cooperativa de Viagens Compartilhadas
 * Arquitetura Vanilla JavaScript ES6 Pura (Zero-Build)
 * Design System: Uber (Monochrome, Transit Kiosk, Tactile Microinteractions)
 * Foco Regional: Nordeste Brasileiro (Cidades, Capitais e Polos Regionais)
 */

// ==========================================
// 1. AVATAR PADRÃO SVG ("BLANK PROFILE")
// ==========================================

const DEFAULT_BLANK_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23767676'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

const GOOGLE_SAMPLE_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80";

// ==========================================
// 2. DADOS GEOGRÁFICOS DO NORDESTE BRASIL
// ==========================================

const NORDESTE_LOCATIONS = [
  // Ceará
  { city: 'Fortaleza, CE', spot: 'Terminal Rodoviário Engenheiro João Thomé' },
  { city: 'Fortaleza, CE', spot: 'Shopping Iguatemi Bosque' },
  { city: 'Fortaleza, CE', spot: 'Aeroporto Pinto Martins' },
  { city: 'Juazeiro do Norte, CE', spot: 'Cariri Garden Shopping' },
  { city: 'Juazeiro do Norte, CE', spot: 'Praça Padre Cícero' },
  { city: 'Sobral, CE', spot: 'Arco de Nossa Senhora de Fátima' },
  { city: 'Sobral, CE', spot: 'Rodoviária de Sobral' },
  { city: 'Quixadá, CE', spot: 'Praça José de Barros (Praça do Leão)' },
  { city: 'Jericoacoara (Jijoca), CE', spot: 'Ponto dos Jardineiras / Vila' },
  { city: 'Crateús, CE', spot: 'Rodoviária Municipal' },
  { city: 'Iguatu, CE', spot: 'Praça da Matriz' },

  // Pernambuco
  { city: 'Recife, PE', spot: 'TIP - Terminal Integrado de Passageiros' },
  { city: 'Recife, PE', spot: 'Shopping Recife (Boa Viagem)' },
  { city: 'Recife, PE', spot: 'Praça do Derby' },
  { city: 'Caruaru, PE', spot: 'Pátio de Eventos Luiz Gonzaga' },
  { city: 'Caruaru, PE', spot: 'Caruaru Shopping' },
  { city: 'Petrolina, PE', spot: 'Orla de Petrolina' },
  { city: 'Petrolina, PE', spot: 'River Shopping Petrolina' },
  { city: 'Garanhuns, PE', spot: 'Relógio das Flores' },
  { city: 'Porto de Galinhas (Ipojuca), PE', spot: 'Praça das Piscinas Naturais' },

  // Bahia
  { city: 'Salvador, BA', spot: 'Rodoviária Central de Salvador' },
  { city: 'Salvador, BA', spot: 'Shopping da Bahia (Iguatemi)' },
  { city: 'Salvador, BA', spot: 'Aeroporto Internacional de Salvador' },
  { city: 'Feira de Santana, BA', spot: 'Boulevard Shopping Feira' },
  { city: 'Feira de Santana, BA', spot: 'Terminal Rodoviário' },
  { city: 'Vitória da Conquista, BA', spot: 'Boulevard Shopping Conquista' },
  { city: 'Ilhéus, BA', spot: 'Praça Castro Alves (Av. Soares Lopes)' },
  { city: 'Itabuna, BA', spot: 'Shopping Jequitibá' },
  { city: 'Porto Seguro, BA', spot: 'Passarela do Descobrimento' },
  { city: 'Juazeiro, BA', spot: 'Orla 1 de Juazeiro' },

  // Paraíba
  { city: 'João Pessoa, PB', spot: 'Manaíra Shopping' },
  { city: 'João Pessoa, PB', spot: 'Terminal Rodoviário Severino Camelo' },
  { city: 'João Pessoa, PB', spot: 'Busto de Tamandaré (Tambaú)' },
  { city: 'Campina Grande, PB', spot: 'Parque do Povo' },
  { city: 'Campina Grande, PB', spot: 'Partage Shopping' },
  { city: 'Patos, PB', spot: 'Praça Edvaldo Motta' },
  { city: 'Sousa, PB', spot: 'Vale dos Dinossauros / Centro' },

  // Rio Grande do Norte
  { city: 'Natal, RN', spot: 'Midway Mall' },
  { city: 'Natal, RN', spot: 'Rodoviária Nova de Natal' },
  { city: 'Natal, RN', spot: 'Praia de Ponta Negra' },
  { city: 'Mossoró, RN', spot: 'Partage Shopping Mossoró' },
  { city: 'Mossoró, RN', spot: 'Estação das Artes Elizeu Ventania' },
  { city: 'Pipa (Tibau do Sul), RN', spot: 'Avenida Baía dos Golfinhos' },
  { city: 'Caicó, RN', spot: 'Ilha de Sant’Ana' },

  // Alagoas
  { city: 'Maceió, AL', spot: 'Parque Shopping Maceió (Cruz das Almas)' },
  { city: 'Maceió, AL', spot: 'Terminal Rodoviário João Paulo II' },
  { city: 'Maceió, AL', spot: 'Orla de Ponta Verde' },
  { city: 'Arapiraca, AL', spot: 'Bosque das Arapiracas' },
  { city: 'Arapiraca, AL', spot: 'Garden Shopping Arapiraca' },
  { city: 'Maragogi, AL', spot: 'Praça Central da Orla' },

  // Maranhão
  { city: 'São Luís, MA', spot: 'São Luís Shopping' },
  { city: 'São Luís, MA', spot: 'Terminal Rodoviário de São Luís' },
  { city: 'São Luís, MA', spot: 'Avenida Litorânea' },
  { city: 'Imperatriz, MA', spot: 'Imperial Shopping' },
  { city: 'Imperatriz, MA', spot: 'Beira-Rio de Imperatriz' },
  { city: 'Caxias, MA', spot: 'Praça do Pantheon' },
  { city: 'Barreirinhas (Lençóis), MA', spot: 'Avenida Beira-Rio' },

  // Piauí
  { city: 'Teresina, PI', spot: 'Teresina Shopping' },
  { city: 'Teresina, PI', spot: 'Terminal Rodoviário Lucídio Portela' },
  { city: 'Teresina, PI', spot: 'Ponte Estaiada' },
  { city: 'Parnaíba, PI', spot: 'Porto das Barcas' },
  { city: 'Parnaíba, PI', spot: 'Parnaíba Shopping' },
  { city: 'Picos, PI', spot: 'Picos Plaza Shopping' },

  // Sergipe
  { city: 'Aracaju, SE', spot: 'Shopping Jardins' },
  { city: 'Aracaju, SE', spot: 'Terminal Rodoviário José Rollemberg Leite' },
  { city: 'Aracaju, SE', spot: 'Orla de Atalaia (Arcos)' },
  { city: 'Itabaiana, SE', spot: 'Shopping Peixoto' },
  { city: 'Lagarto, SE', spot: 'Praça da Matriz Nossa Senhora da Piedade' }
];

const NORDESTE_CITIES = Array.from(new Set(NORDESTE_LOCATIONS.map(l => l.city))).sort();

// Rotas em destaque com fotos reais de alta qualidade
const POPULAR_ROUTES = [
  {
    origin: 'Fortaleza, CE',
    destination: 'Juazeiro do Norte, CE',
    label: 'Fortaleza ➔ Juazeiro do Norte',
    price: 75.00,
    photoUrl: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?w=300&auto=format&fit=crop&q=80',
  },
  {
    origin: 'Recife, PE',
    destination: 'Caruaru, PE',
    label: 'Recife ➔ Caruaru',
    price: 35.00,
    photoUrl: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=300&auto=format&fit=crop&q=80',
  },
  {
    origin: 'Salvador, BA',
    destination: 'Feira de Santana, BA',
    label: 'Salvador ➔ Feira de Santana',
    price: 30.00,
    photoUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=300&auto=format&fit=crop&q=80',
  },
  {
    origin: 'João Pessoa, PB',
    destination: 'Campina Grande, PB',
    label: 'João Pessoa ➔ Campina Grande',
    price: 32.00,
    photoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&auto=format&fit=crop&q=80',
  },
  {
    origin: 'Natal, RN',
    destination: 'Mossoró, RN',
    label: 'Natal ➔ Mossoró',
    price: 55.00,
    photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80',
  },
  {
    origin: 'Maceió, AL',
    destination: 'Arapiraca, AL',
    label: 'Maceió ➔ Arapiraca',
    price: 35.00,
    photoUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300&auto=format&fit=crop&q=80',
  }
];

// ==========================================
// 3. ESTADO E DADOS INICIAIS (LOCAL STORAGE)
// ==========================================

const INITIAL_STATE = {
  role: 'PASSENGER', // 'PASSENGER' | 'DRIVER' | 'ADMIN'
  currentUser: {
    id: 'user-001',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@empresa.com.br',
    cpf: '123.456.789-00',
    phone: '(85) 98765-4321',
    pixKey: 'carlos.oliveira@empresa.com.br',
    avatarUrl: DEFAULT_BLANK_AVATAR, // Padrão SVG blank profile
    rating: 4.9,
    totalTrips: 28,
    vehicle: {
      plate: 'BRA-2E19',
      state: 'CE',
      brand: 'Toyota',
      model: 'Corolla Sedan 2.0',
      year: 2023,
      hasAC: true,
      hasUSB: true,
    }
  },
  searchParams: {
    origin: 'Fortaleza, CE',
    destination: 'Juazeiro do Norte, CE',
    date: new Date().toISOString().split('T')[0],
    seats: 1,
  },
  rides: [
    {
      id: 'ride-101',
      driverId: 'drv-01',
      driverName: 'Marcos Silva',
      driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      driverRating: 4.95,
      driverTripsCount: 142,
      originCity: 'Fortaleza, CE',
      originSpot: 'Shopping Iguatemi Bosque',
      destinationCity: 'Juazeiro do Norte, CE',
      destinationSpot: 'Cariri Garden Shopping',
      departureDate: new Date().toISOString().split('T')[0],
      departureTime: '06:30',
      estimatedDuration: '6h 30m',
      estimatedArrivalTime: '13:00',
      pricePerSeat: 75.00,
      totalSeats: 4,
      availableSeats: 3,
      vehicle: {
        brand: 'Toyota',
        model: 'Corolla 2.0',
        plate: 'CE-FOR-2023',
        year: 2023,
        hasAC: true,
        hasUSB: true,
      },
      status: 'PUBLISHED',
      notes: 'Saída pontual. Parada para lanche em Quixadá.',
    },
    {
      id: 'ride-102',
      driverId: 'drv-02',
      driverName: 'Fernanda Costa',
      driverAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      driverRating: 4.92,
      driverTripsCount: 98,
      originCity: 'Recife, PE',
      originSpot: 'Shopping Recife (Boa Viagem)',
      destinationCity: 'Caruaru, PE',
      destinationSpot: 'Pátio de Eventos Luiz Gonzaga',
      departureDate: new Date().toISOString().split('T')[0],
      departureTime: '08:00',
      estimatedDuration: '2h 00m',
      estimatedArrivalTime: '10:00',
      pricePerSeat: 35.00,
      totalSeats: 4,
      availableSeats: 2,
      vehicle: {
        brand: 'Honda',
        model: 'Civic Touring',
        plate: 'PE-REC-9988',
        year: 2023,
        hasAC: true,
        hasUSB: true,
      },
      status: 'PUBLISHED',
      notes: 'Carro espaçoso e ar-condicionado duplo.',
    },
    {
      id: 'ride-103',
      driverId: 'drv-03',
      driverName: 'Rafael Guimarães',
      driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      driverRating: 4.88,
      driverTripsCount: 65,
      originCity: 'Salvador, BA',
      originSpot: 'Shopping da Bahia (Iguatemi)',
      destinationCity: 'Feira de Santana, BA',
      destinationSpot: 'Boulevard Shopping Feira',
      departureDate: new Date().toISOString().split('T')[0],
      departureTime: '17:30',
      estimatedDuration: '1h 30m',
      estimatedArrivalTime: '19:00',
      pricePerSeat: 30.00,
      totalSeats: 4,
      availableSeats: 4,
      vehicle: {
        brand: 'Volkswagen',
        model: 'T-Cross',
        plate: 'BA-SSA-4411',
        year: 2022,
        hasAC: true,
        hasUSB: true,
      },
      status: 'PUBLISHED',
      notes: 'Direto pela BR-324, sem desvios.',
    },
    {
      id: 'ride-104',
      driverId: 'drv-04',
      driverName: 'Juliana Mendes',
      driverAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      driverRating: 5.0,
      driverTripsCount: 42,
      originCity: 'João Pessoa, PB',
      originSpot: 'Manaíra Shopping',
      destinationCity: 'Campina Grande, PB',
      destinationSpot: 'Parque do Povo',
      departureDate: new Date().toISOString().split('T')[0],
      departureTime: '07:30',
      estimatedDuration: '1h 45m',
      estimatedArrivalTime: '09:15',
      pricePerSeat: 32.00,
      totalSeats: 3,
      availableSeats: 2,
      vehicle: {
        brand: 'Jeep',
        model: 'Renegade Longitude',
        plate: 'PB-JPA-5522',
        year: 2023,
        hasAC: true,
        hasUSB: true,
      },
      status: 'PUBLISHED',
      notes: 'Porta-malas livre para bagagens médias.',
    }
  ],
  bookings: [
    {
      id: 'BK-8941',
      rideId: 'ride-101',
      passengerId: 'user-001',
      passengerName: 'Carlos Oliveira',
      passengerPhone: '(85) 98765-4321',
      seatsBooked: 1,
      totalAmount: 75.00,
      amountPaidSignal: 37.50,
      amountDueFinal: 37.50,
      status: 'SIGNAL_CONFIRMED',
      rated: false,
      pixCopyPasteCode: '00020126580014br.gov.bcb.pix0136cooperativa-viagens-custodia-bk8941520400005303986540537.505802BR5925COOPERATIVA VIAGENS LTDA6009FORTALEZA62070503***6304D1A9',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    }
  ],
  messages: [
    {
      id: 'msg-1',
      rideId: 'ride-101',
      senderId: 'drv-01',
      senderName: 'Marcos Silva',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      text: 'Olá Carlos! Estarei no estacionamento do Shopping Iguatemi às 06:25 em um Corolla prata.',
      createdAt: '06:10',
    }
  ],
  driverRequests: [
    {
      id: 'req-01',
      userId: 'usr-99',
      userName: 'Luciano Prado',
      userEmail: 'luciano.prado@eng.com.br',
      userPhone: '(85) 97711-2233',
      cnhNumber: '04981273910',
      vehicle: {
        brand: 'Chevrolet',
        model: 'Tracker Premier',
        plate: 'LUC-9988',
        year: 2023,
        hasAC: true,
        hasUSB: true,
      },
      status: 'PENDING',
      createdAt: 'Hoje, 09:30',
    }
  ]
};

// Store Wrapper
class AppStore {
  constructor() {
    this.loadState();
  }

  loadState() {
    const saved = localStorage.getItem('cooperativa_state_v3');
    if (saved) {
      try {
        this.state = JSON.parse(saved);
        if (!this.state.currentUser.avatarUrl) {
          this.state.currentUser.avatarUrl = DEFAULT_BLANK_AVATAR;
        }
      } catch (e) {
        this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
      }
    } else {
      this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
      this.saveState();
    }
  }

  saveState() {
    localStorage.setItem('cooperativa_state_v3', JSON.stringify(this.state));
  }

  setRole(newRole) {
    this.state.role = newRole;
    this.saveState();
    renderApp();
    renderHeader();
    renderMobileNav();
  }

  setSearchParams(params) {
    this.state.searchParams = { ...this.state.searchParams, ...params };
    this.saveState();
  }

  updateUserProfile({ name, cpf, pixKey, avatarUrl }) {
    if (name) this.state.currentUser.name = name;
    if (cpf) this.state.currentUser.cpf = cpf;
    if (pixKey) this.state.currentUser.pixKey = pixKey;
    if (avatarUrl) this.state.currentUser.avatarUrl = avatarUrl;
    this.saveState();
    renderApp();
    renderHeader();
  }

  connectGoogleAccount() {
    this.state.currentUser.avatarUrl = GOOGLE_SAMPLE_AVATAR;
    this.saveState();
    renderApp();
    renderHeader();
  }

  resetAvatarToDefault() {
    this.state.currentUser.avatarUrl = DEFAULT_BLANK_AVATAR;
    this.saveState();
    renderApp();
    renderHeader();
  }

  markRideAsRated(rideId) {
    const booking = this.state.bookings.find(b => b.rideId === rideId);
    if (booking) {
      booking.rated = true;
      this.saveState();
    }
  }

  bookRide(rideId, seats) {
    const ride = this.state.rides.find(r => r.id === rideId);
    if (!ride) return null;

    const totalAmount = ride.pricePerSeat * seats;
    const signal = totalAmount * 0.5;
    const finalVal = totalAmount * 0.5;
    const bookingId = 'BK-' + Math.floor(1000 + Math.random() * 9000);

    const newBooking = {
      id: bookingId,
      rideId,
      passengerId: this.state.currentUser.id,
      passengerName: this.state.currentUser.name,
      passengerPhone: this.state.currentUser.phone,
      seatsBooked: seats,
      totalAmount,
      amountPaidSignal: signal,
      amountDueFinal: finalVal,
      status: 'SIGNAL_CONFIRMED',
      rated: false,
      pixCopyPasteCode: `00020126580014br.gov.bcb.pix0136cooperativa-viagens-custodia-${bookingId.toLowerCase()}5204000053039865405${signal.toFixed(2)}5802BR5925COOPERATIVA VIAGENS LTDA6009RECIFE62070503***6304C9E2`,
      createdAt: new Date().toISOString(),
    };

    ride.availableSeats = Math.max(0, ride.availableSeats - seats);
    this.state.bookings.unshift(newBooking);
    this.saveState();
    return newBooking;
  }

  cancelBooking(bookingId) {
    const booking = this.state.bookings.find(b => b.id === bookingId);
    if (!booking) return { refundAmount: 0 };

    booking.status = 'CANCELLED';
    const ride = this.state.rides.find(r => r.id === booking.rideId);
    if (ride) {
      ride.availableSeats += booking.seatsBooked;
    }

    const refundAmount = booking.amountPaidSignal * 0.70;
    this.saveState();
    return { refundAmount };
  }

  addRide(rideData) {
    const newRide = {
      id: 'ride-' + Math.floor(100 + Math.random() * 900),
      driverId: this.state.currentUser.id,
      driverName: this.state.currentUser.name,
      driverAvatar: this.state.currentUser.avatarUrl,
      driverRating: this.state.currentUser.rating,
      driverTripsCount: this.state.currentUser.totalTrips,
      ...rideData
    };
    this.state.rides.unshift(newRide);
    this.saveState();
    return newRide;
  }

  sendMessage(rideId, text) {
    const newMsg = {
      id: 'msg-' + Date.now(),
      rideId,
      senderId: this.state.currentUser.id,
      senderName: this.state.currentUser.name,
      senderAvatar: this.state.currentUser.avatarUrl,
      text,
      createdAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    this.state.messages.push(newMsg);
    this.saveState();
  }

  addSimulatedReply(rideId, text, name, avatar) {
    const newMsg = {
      id: 'msg-' + Date.now(),
      rideId,
      senderId: 'driver-partner',
      senderName: name,
      senderAvatar: avatar,
      text,
      createdAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    this.state.messages.push(newMsg);
    this.saveState();
    renderApp();
  }

  approveDriverRequest(reqId) {
    const req = this.state.driverRequests.find(r => r.id === reqId);
    if (req) {
      req.status = 'APPROVED';
      this.saveState();
    }
  }

  rejectDriverRequest(reqId, reason) {
    const req = this.state.driverRequests.find(r => r.id === reqId);
    if (req) {
      req.status = 'REJECTED';
      req.rejectionReason = reason;
      this.saveState();
    }
  }

  releaseCustody(bookingId) {
    const b = this.state.bookings.find(bk => bk.id === bookingId);
    if (b) {
      b.status = 'FULLY_PAID';
      this.saveState();
    }
  }

  resetToDefaults() {
    this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
    this.saveState();
    renderApp();
    renderHeader();
    renderMobileNav();
  }
}

const store = new AppStore();

// ==========================================
// 4. HELPER DE ÍCONES E TOASTS
// ==========================================

function icon(name, { size = 'md', fill = false, className = '' } = {}) {
  const sizeClasses = {
    sm: 'text-[18px]',
    md: 'text-[22px]',
    lg: 'text-[28px]',
    xl: 'text-[36px]',
  };
  const sizeClass = sizeClasses[size] || 'text-[22px]';
  const fillClass = fill ? 'fill-icon' : '';
  return `<span class="material-symbols-outlined ${sizeClass} ${fillClass} ${className}">${name}</span>`;
}

function showToast(message, type = 'info') {
  const toastRoot = document.getElementById('toast-root');
  if (!toastRoot) return;

  const id = 'toast-' + Date.now();
  const iconName = type === 'success' ? 'check_circle' : type === 'warning' ? 'warning' : type === 'error' ? 'error' : 'info';
  const iconColor = type === 'success' ? 'text-white' : type === 'warning' ? 'text-amber-400' : type === 'error' ? 'text-red-400' : 'text-white';

  const toastHTML = `
    <div id="${id}" class="pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border border-uber-charcoal bg-uber-black text-white shadow-xl animate-fade-in">
      <div class="flex items-center gap-3 min-w-0">
        ${icon(iconName, { size: 'md', fill: true, className: `${iconColor} shrink-0` })}
        <span class="text-xs sm:text-sm font-semibold leading-tight text-left truncate">${message}</span>
      </div>
      <button onclick="document.getElementById('${id}')?.remove()" class="text-uber-slate hover:text-white p-1 rounded-sm transition-colors shrink-0" aria-label="Fechar">
        ${icon('close', { size: 'sm' })}
      </button>
    </div>
  `;

  toastRoot.insertAdjacentHTML('beforeend', toastHTML);

  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.remove();
  }, 4000);
}

// ==========================================
// 5. LAYOUT FIXO: HEADER, NAV, FOOTER
// ==========================================

function renderHeader() {
  const headerRoot = document.getElementById('header-root');
  const role = store.state.role;
  const currentPath = window.location.hash.slice(1) || '/';
  const isSearchActive = currentPath === '/' || currentPath === '/buscar';
  const avatar = store.state.currentUser.avatarUrl || DEFAULT_BLANK_AVATAR;

  headerRoot.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
      <!-- Logo -->
      <a href="#/" class="flex items-center gap-2.5 shrink-0 group">
        <div class="bg-white text-uber-black w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-transform group-hover:scale-105">
          ${icon('directions_car', { size: 'sm' })}
        </div>
        <div class="flex flex-col text-left">
          <span class="font-extrabold text-lg tracking-tight text-white leading-none">Cooperativa</span>
          <span class="text-[10px] font-semibold text-uber-iron uppercase tracking-wider">Nordeste</span>
        </div>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-6 h-full">
        <a href="#/buscar" class="h-full flex items-center gap-1.5 text-sm font-semibold transition-colors border-b-2 ${isSearchActive ? 'text-white border-white' : 'text-uber-slate border-transparent hover:text-white'}">
          ${icon('search', { size: 'sm' })}
          <span>Buscar</span>
        </a>

        ${role === 'DRIVER' ? `
          <a href="#/publicar" class="h-full flex items-center gap-1.5 text-sm font-semibold transition-colors border-b-2 ${currentPath === '/publicar' ? 'text-white border-white' : 'text-uber-slate border-transparent hover:text-white'}">
            ${icon('add', { size: 'sm' })}
            <span>Nova Viagem</span>
          </a>
        ` : ''}

        <a href="#/minhas-viagens" class="h-full flex items-center gap-1.5 text-sm font-semibold transition-colors border-b-2 ${currentPath === '/minhas-viagens' ? 'text-white border-white' : 'text-uber-slate border-transparent hover:text-white'}">
          ${icon('history', { size: 'sm' })}
          <span>Viagens</span>
        </a>

        ${(role === 'ADMIN' || role === 'MANAGER') ? `
          <a href="#/admin" class="h-full flex items-center gap-1.5 text-sm font-semibold transition-colors border-b-2 ${currentPath === '/admin' ? 'text-white border-white' : 'text-uber-slate border-transparent hover:text-white'}">
            ${icon('admin_panel_settings', { size: 'sm' })}
            <span>Painel</span>
          </a>
        ` : ''}

        <a href="#/perfil" class="h-full flex items-center gap-2 text-sm font-semibold transition-colors border-b-2 ${currentPath === '/perfil' ? 'text-white border-white' : 'text-uber-slate border-transparent hover:text-white'}">
          <img src="${avatar}" alt="Avatar" class="w-5 h-5 rounded-full object-cover bg-uber-gray border border-white/20" />
          <span>Perfil</span>
        </a>
      </nav>

      <!-- Role Switcher & Profile Quick Action -->
      <div class="flex items-center gap-3 shrink-0">
        <a href="#/perfil" class="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white hover:opacity-90">
          <img src="${avatar}" alt="Avatar" class="w-6 h-6 rounded-full object-cover bg-uber-gray border border-white/30" />
          <span class="hidden sm:inline">${store.state.currentUser.name.split(' ')[0]}</span>
        </a>

        <button onclick="toggleRole()" title="Alternar Perfil para Teste" class="h-8 px-3 flex items-center gap-1.5 text-xs font-semibold text-white bg-uber-charcoal hover:bg-uber-iron/30 rounded-full transition-colors active:scale-95">
          ${icon('swap_horiz', { size: 'sm', className: 'text-uber-slate' })}
          <span class="text-[11px] font-bold">${role === 'DRIVER' ? 'Motorista' : role === 'ADMIN' ? 'Admin' : 'Passageiro'}</span>
        </button>
      </div>
    </div>
  `;
}

function renderMobileNav() {
  const mobileNavRoot = document.getElementById('mobile-nav-root');
  const role = store.state.role;
  const currentPath = window.location.hash.slice(1) || '/';
  const isSearchActive = currentPath === '/' || currentPath === '/buscar';

  mobileNavRoot.innerHTML = `
    <a href="#/buscar" class="flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-150 active:scale-95 ${isSearchActive ? 'text-uber-black font-bold' : 'text-uber-iron hover:text-uber-black font-medium'}">
      <div class="relative flex items-center justify-center">
        ${icon('search', { size: 'md', fill: isSearchActive })}
        ${isSearchActive ? '<span class="absolute -bottom-1 w-1.5 h-1.5 bg-uber-black rounded-full"></span>' : ''}
      </div>
      <span class="text-[11px] leading-tight mt-0.5">Buscar</span>
    </a>

    ${role === 'DRIVER' ? `
      <a href="#/publicar" class="flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-150 active:scale-95 ${currentPath === '/publicar' ? 'text-uber-black font-bold' : 'text-uber-iron hover:text-uber-black font-medium'}">
        <div class="bg-uber-black text-white w-7 h-7 rounded-lg flex items-center justify-center transition-transform active:scale-90">
          ${icon('add', { size: 'sm' })}
        </div>
        <span class="text-[11px] leading-tight font-bold text-uber-black mt-0.5">Nova Viagem</span>
      </a>
    ` : ''}

    ${(role === 'ADMIN' || role === 'MANAGER') ? `
      <a href="#/admin" class="flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-150 active:scale-95 ${currentPath === '/admin' ? 'text-uber-black font-bold' : 'text-uber-iron hover:text-uber-black font-medium'}">
        <div class="relative flex items-center justify-center">
          ${icon('admin_panel_settings', { size: 'md', fill: currentPath === '/admin' })}
          ${currentPath === '/admin' ? '<span class="absolute -bottom-1 w-1.5 h-1.5 bg-uber-black rounded-full"></span>' : ''}
        </div>
        <span class="text-[11px] leading-tight mt-0.5">Painel</span>
      </a>
    ` : ''}

    <a href="#/minhas-viagens" class="flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-150 active:scale-95 ${currentPath === '/minhas-viagens' ? 'text-uber-black font-bold' : 'text-uber-iron hover:text-uber-black font-medium'}">
      <div class="relative flex items-center justify-center">
        ${icon('history', { size: 'md', fill: currentPath === '/minhas-viagens' })}
        ${currentPath === '/minhas-viagens' ? '<span class="absolute -bottom-1 w-1.5 h-1.5 bg-uber-black rounded-full"></span>' : ''}
      </div>
      <span class="text-[11px] leading-tight mt-0.5">Viagens</span>
    </a>

    <a href="#/perfil" class="flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-150 active:scale-95 ${currentPath === '/perfil' ? 'text-uber-black font-bold' : 'text-uber-iron hover:text-uber-black font-medium'}">
      <div class="relative flex items-center justify-center">
        ${icon('account_circle', { size: 'md', fill: currentPath === '/perfil' })}
        ${currentPath === '/perfil' ? '<span class="absolute -bottom-1 w-1.5 h-1.5 bg-uber-black rounded-full"></span>' : ''}
      </div>
      <span class="text-[11px] leading-tight mt-0.5">Perfil</span>
    </a>
  `;
}

function renderFooter() {
  const footerRoot = document.getElementById('footer-root');
  footerRoot.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2 h-8">
          <div class="bg-white text-uber-black w-7 h-7 rounded-md flex items-center justify-center font-bold">
            ${icon('directions_car', { size: 'sm' })}
          </div>
          <span class="font-extrabold text-lg text-white">Cooperativa</span>
        </div>
        <p class="text-uber-slate text-xs leading-relaxed font-normal">
          Plataforma de viagens compartilhadas para o Nordeste brasileiro. Conectando capitais e cidades polo com economia e segurança.
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-1.5 h-8 font-bold text-white text-sm">
          ${icon('verified_user', { size: 'sm', className: 'text-white' })}
          <span>Garantia e Segurança</span>
        </div>
        <ul class="space-y-1.5 text-xs text-uber-slate font-normal">
          <li class="flex items-center gap-2">
            ${icon('check', { size: 'sm', className: 'text-white shrink-0' })}
            <span>Sinal de 50% via PIX em custódia protegida</span>
          </li>
          <li class="flex items-center gap-2">
            ${icon('check', { size: 'sm', className: 'text-white shrink-0' })}
            <span>Resgate garantido para o motorista em até 72h</span>
          </li>
          <li class="flex items-center gap-2">
            ${icon('check', { size: 'sm', className: 'text-white shrink-0' })}
            <span>Motoristas com validação cadastral prévia</span>
          </li>
        </ul>
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-1.5 h-8 font-bold text-white text-sm">
          ${icon('headset_mic', { size: 'sm', className: 'text-white' })}
          <span>Atendimento Simples</span>
        </div>
        <p class="text-uber-slate text-xs leading-relaxed font-normal">
          Dúvidas sobre reservas, comprovantes digitais ou estornos automáticos? Conte com o suporte direto da cooperativa.
        </p>
        <div class="flex items-center gap-2 text-xs text-white bg-uber-charcoal p-2.5 rounded-lg border border-uber-iron/30 font-medium">
          ${icon('lock', { size: 'sm', className: 'text-white' })}
          <span>Transações 100% auditadas com recibo digital</span>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 pt-6 mt-6 border-t border-uber-charcoal text-center text-xs text-uber-iron font-normal">
      Cooperativa de Viagens do Nordeste. Todos os direitos reservados.
    </div>
  `;
}

function toggleRole() {
  const current = store.state.role;
  const next = current === 'PASSENGER' ? 'DRIVER' : current === 'DRIVER' ? 'ADMIN' : 'PASSENGER';
  store.setRole(next);
  showToast(`Perfil alterado para: ${next === 'DRIVER' ? 'Motorista' : next === 'ADMIN' ? 'Admin' : 'Passageiro'}`, 'info');
}

// ==========================================
// 6. COMPONENTES REUTILIZÁVEIS
// ==========================================

function renderDatalists() {
  return `
    <datalist id="nordeste-cities-list">
      ${NORDESTE_CITIES.map(c => `<option value="${c}">`).join('')}
    </datalist>
  `;
}

function renderHeroSearchBar() {
  const { origin, destination, date, seats } = store.state.searchParams;
  const todayStr = new Date().toISOString().split('T')[0];

  return `
    ${renderDatalists()}
    <div class="w-full max-w-4xl mx-auto relative">
      <form id="hero-search-form" onsubmit="handleSearchSubmit(event)" class="bg-white border border-uber-border shadow-2xl rounded-2xl p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
        
        <!-- Origin Input Dropdown Box -->
        <div class="flex-1 relative flex items-center gap-3 px-3.5 h-12 bg-uber-gray rounded-xl border border-uber-border hover:border-uber-iron focus-within:border-uber-black focus-within:bg-white transition-all">
          <div class="w-2.5 h-2.5 rounded-full bg-uber-black shrink-0"></div>
          <div class="flex-1 text-left min-w-0">
            <input
              id="search-origin"
              type="text"
              list="nordeste-cities-list"
              value="${origin}"
              placeholder="Origem no Nordeste (Ex: Fortaleza, CE)"
              class="w-full bg-transparent font-semibold text-uber-black focus:outline-none text-sm placeholder-uber-iron truncate"
              required
            />
          </div>
        </div>

        <!-- Swap Button -->
        <button type="button" onclick="swapSearchCities()" title="Inverter Cidades" class="w-9 h-9 self-center bg-uber-gray hover:bg-uber-border text-uber-black rounded-full flex items-center justify-center transition-all duration-150 active:scale-90 shrink-0 border border-uber-border">
          ${icon('swap_horiz', { size: 'sm' })}
        </button>

        <!-- Destination Input Dropdown Box -->
        <div class="flex-1 relative flex items-center gap-3 px-3.5 h-12 bg-uber-gray rounded-xl border border-uber-border hover:border-uber-iron focus-within:border-uber-black focus-within:bg-white transition-all">
          <div class="w-2.5 h-2.5 bg-uber-black shrink-0"></div>
          <div class="flex-1 text-left min-w-0">
            <input
              id="search-dest"
              type="text"
              list="nordeste-cities-list"
              value="${destination}"
              placeholder="Destino no Nordeste (Ex: Juazeiro, CE)"
              class="w-full bg-transparent font-semibold text-uber-black focus:outline-none text-sm placeholder-uber-iron truncate"
              required
            />
          </div>
        </div>

        <!-- Date & Seats Row -->
        <div class="flex items-center gap-2 flex-initial">
          <div class="flex-1 md:flex-initial flex items-center gap-2 px-3 h-12 bg-uber-gray rounded-xl border border-uber-border hover:border-uber-iron focus-within:border-uber-black focus-within:bg-white min-w-[155px] transition-all">
            ${icon('calendar_today', { size: 'sm', className: 'text-uber-iron shrink-0' })}
            <input
              id="search-date"
              type="date"
              min="${todayStr}"
              value="${date}"
              class="w-full bg-transparent font-semibold text-uber-black focus:outline-none text-xs sm:text-sm cursor-pointer"
              required
            />
          </div>

          <div class="flex-1 md:flex-initial flex items-center gap-2 px-3 h-12 bg-uber-gray rounded-xl border border-uber-border hover:border-uber-iron focus-within:border-uber-black focus-within:bg-white min-w-[115px] transition-all">
            ${icon('group', { size: 'sm', className: 'text-uber-iron shrink-0' })}
            <select
              id="search-seats"
              class="w-full bg-transparent font-bold text-uber-black focus:outline-none text-xs sm:text-sm cursor-pointer"
            >
              <option value="1" ${seats === 1 ? 'selected' : ''}>1 lugar</option>
              <option value="2" ${seats === 2 ? 'selected' : ''}>2 lugares</option>
              <option value="3" ${seats === 3 ? 'selected' : ''}>3 lugares</option>
              <option value="4" ${seats === 4 ? 'selected' : ''}>4 lugares</option>
              <option value="5" ${seats === 5 ? 'selected' : ''}>5 lugares</option>
              <option value="6" ${seats === 6 ? 'selected' : ''}>6 lugares</option>
              <option value="7" ${seats === 7 ? 'selected' : ''}>7 lugares</option>
            </select>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full md:w-auto h-12 px-7 shrink-0 font-bold bg-black text-white hover:bg-neutral-900 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-md"
        >
          ${icon('search', { size: 'sm' })}
          <span>Buscar</span>
        </button>
      </form>
    </div>
  `;
}

function renderRideCard(ride) {
  return `
    <div
      onclick="window.location.hash = '#/viagem/${ride.id}'"
      class="p-4 sm:p-5 flex flex-col gap-4 text-left border border-uber-border hover:border-uber-black hover:bg-uber-gray/30 rounded-xl transition-all bg-white cursor-pointer select-none active:scale-[0.99]"
    >
      <!-- Route & Price Row -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        
        <!-- Route Details -->
        <div class="flex-1 flex flex-col gap-2 min-w-0 w-full sm:w-auto">
          
          <!-- Departure -->
          <div class="flex items-center gap-3">
            <span class="text-sm sm:text-base font-bold text-uber-black w-12 shrink-0">${ride.departureTime}</span>
            <div class="w-2.5 h-2.5 rounded-full bg-uber-black shrink-0"></div>
            <span class="text-sm sm:text-base font-semibold text-uber-black truncate">${ride.originCity}</span>
            <span class="text-xs text-uber-iron truncate hidden md:inline">(${ride.originSpot})</span>
          </div>

          <!-- Stepper Line + Duration -->
          <div class="flex items-center gap-3 pl-12 -my-1">
            <div class="w-0.5 h-4 bg-uber-border ml-[4px]"></div>
            <div class="flex items-center gap-1 text-[11px] font-medium text-uber-iron pl-3">
              ${icon('schedule', { size: 'sm', className: 'text-uber-iron' })}
              <span>${ride.estimatedDuration}</span>
            </div>
          </div>

          <!-- Arrival -->
          <div class="flex items-center gap-3">
            <span class="text-sm sm:text-base font-bold text-uber-black w-12 shrink-0">${ride.estimatedArrivalTime}</span>
            <div class="w-2.5 h-2.5 bg-uber-black shrink-0"></div>
            <span class="text-sm sm:text-base font-semibold text-uber-black truncate">${ride.destinationCity}</span>
            <span class="text-xs text-uber-iron truncate hidden md:inline">(${ride.destinationSpot})</span>
          </div>
        </div>

        <!-- Price & Seats -->
        <div class="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-uber-border shrink-0">
          <div class="flex items-baseline gap-1">
            <span class="text-xs text-uber-iron sm:hidden">Valor:</span>
            <span class="text-xl sm:text-2xl font-extrabold text-uber-black tracking-tight">
              R$ ${ride.pricePerSeat.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <div class="flex items-center gap-1.5 text-xs font-semibold text-uber-charcoal mt-1">
            ${icon('airline_seat_recline_normal', { size: 'sm', className: 'text-uber-black' })}
            <span>${ride.availableSeats} ${ride.availableSeats === 1 ? 'lugar' : 'lugares'}</span>
          </div>
        </div>

      </div>

      <!-- Driver and Amenities Row -->
      <div class="flex items-center justify-between pt-3 border-t border-uber-border">
        <div class="flex items-center gap-2.5 min-w-0">
          <img src="${ride.driverAvatar}" alt="${ride.driverName}" class="w-7 h-7 rounded-full object-cover border border-uber-border shrink-0 bg-uber-gray" />
          <div class="flex items-center gap-1.5 truncate">
            <span class="font-semibold text-xs text-uber-black truncate">${ride.driverName}</span>
            <span class="text-uber-border">•</span>
            <div class="flex items-center gap-0.5 text-xs text-uber-black font-semibold shrink-0">
              ${icon('star', { size: 'sm', fill: true, className: 'star-gold' })}
              <span>${ride.driverRating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2 text-uber-iron shrink-0">
          ${ride.vehicle.hasAC ? `<span title="Ar-condicionado" class="flex items-center">${icon('ac_unit', { size: 'sm', className: 'text-uber-iron' })}</span>` : ''}
          ${ride.vehicle.hasUSB ? `<span title="Carregador USB" class="flex items-center">${icon('usb', { size: 'sm', className: 'text-uber-iron' })}</span>` : ''}
          <span title="${ride.vehicle.model}" class="flex items-center text-xs text-uber-iron font-medium hidden sm:inline">
            ${icon('directions_car', { size: 'sm', className: 'text-uber-iron mr-1' })}
            ${ride.vehicle.model}
          </span>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// 7. TELAS E VIEWS (SPA ROUTER)
// ==========================================

function handleSearchSubmit(e) {
  e.preventDefault();
  const origin = document.getElementById('search-origin').value;
  const destination = document.getElementById('search-dest').value;
  const date = document.getElementById('search-date').value;
  const seats = Number(document.getElementById('search-seats').value);

  store.setSearchParams({ origin, destination, date, seats });
  window.location.hash = '#/buscar';
}

function swapSearchCities() {
  const originEl = document.getElementById('search-origin');
  const destEl = document.getElementById('search-dest');
  if (originEl && destEl) {
    const tmp = originEl.value;
    originEl.value = destEl.value;
    destEl.value = tmp;
  }
}

function selectPopularRoute(origin, destination) {
  store.setSearchParams({
    origin,
    destination,
    date: new Date().toISOString().split('T')[0],
    seats: 1,
  });
  window.location.hash = '#/buscar';
}

// View: Home
function viewHome() {
  const role = store.state.role;

  return `
    <div class="flex flex-col gap-10 md:gap-14 pb-12 text-left animate-fade-in">
      
      <!-- Hero Section with Background Video & Tempered Glass (Blur) Overlay -->
      <section class="relative bg-uber-black text-white pt-12 pb-16 px-4 overflow-hidden min-h-[380px] sm:min-h-[420px] flex items-center justify-center">
        
        <!-- Background Video with Loop & Mobile Autoplay -->
        <video
          id="hero-bg-video"
          autoplay
          loop
          muted
          playsinline
          webkit-playsinline
          preload="auto"
          class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0 scale-105"
        >
          <source src="assets/video/homevideo.mp4" type="video/mp4" />
        </video>

        <!-- Frosted Tempered Glass (Dark Glassmorphism) Overlay (Calibrated 45% Transparency) -->
        <div class="absolute inset-0 hero-glass-overlay z-10"></div>

        <!-- Hero Content Layer -->
        <div class="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center gap-4 w-full">
          
          <h1 class="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-2xl leading-tight text-white drop-shadow-md">
            Viagens Compartilhadas pelo Nordeste
          </h1>

          <p class="text-white/90 text-sm sm:text-base max-w-xl font-medium drop-shadow-md">
            Encontre motoristas verificados, garanta sua vaga com 50% no PIX e pague o restante na chegada.
          </p>

          <div class="w-full mt-4">
            ${renderHeroSearchBar()}
          </div>
        </div>
      </section>

      <!-- Popular Routes with Location Photos (Nordeste) -->
      <section class="max-w-4xl mx-auto px-4 w-full">
        <div class="flex items-center justify-between mb-4 h-8">
          <h2 class="text-lg sm:text-xl font-bold text-uber-black flex items-center gap-2">
            ${icon('trending_up', { size: 'sm', className: 'text-uber-black' })}
            <span>Rotas Mais Procuradas no Nordeste</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          ${POPULAR_ROUTES.map(route => `
            <div
              onclick="selectPopularRoute('${route.origin}', '${route.destination}')"
              class="p-3 border border-uber-border hover:border-uber-black rounded-xl bg-white cursor-pointer transition-all active:scale-[0.98] flex items-center justify-between gap-3 group hover:shadow-md"
            >
              <div class="flex items-center gap-3 min-w-0">
                <img
                  src="${route.photoUrl}"
                  alt="${route.label}"
                  class="w-14 h-14 rounded-lg object-cover border border-uber-border shrink-0 group-hover:scale-105 transition-transform"
                />
                <div class="truncate">
                  <p class="font-bold text-xs sm:text-sm text-uber-black truncate group-hover:text-black">${route.label}</p>
                  <p class="text-[11px] font-semibold text-uber-charcoal mt-0.5">A partir de R$ ${route.price.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
              <div class="p-1 rounded-full group-hover:bg-uber-gray transition-colors shrink-0">
                ${icon('chevron_right', { size: 'sm', className: 'text-uber-iron' })}
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Driver CTA -->
      ${role === 'DRIVER' ? `
        <section class="max-w-4xl mx-auto px-4 w-full">
          <div class="bg-uber-black text-white rounded-xl p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-uber-charcoal">
            <div class="max-w-lg">
              <h2 class="text-lg sm:text-xl font-bold mb-1 text-white">Vai viajar pelo Nordeste? Ofereça seus lugares livres.</h2>
              <p class="text-uber-slate text-xs sm:text-sm leading-relaxed font-normal">
                Publique com pelo menos 2h de antecedência e receba resgate via PIX em até 72h.
              </p>
            </div>
            <a href="#/publicar" class="w-full sm:w-auto h-12 px-6 shrink-0 font-bold bg-white text-black hover:bg-neutral-100 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95">
              ${icon('add', { size: 'sm' })}
              <span>Nova Viagem</span>
            </a>
          </div>
        </section>
      ` : ''}

    </div>
  `;
}

// View: Search Results
let searchFilterAC = false;
let searchSortBy = 'EARLIEST';

function toggleFilterAC() {
  searchFilterAC = !searchFilterAC;
  renderApp();
}

function handleSortChange(val) {
  searchSortBy = val;
  renderApp();
}

function viewSearchResults() {
  const { rides, searchParams } = store.state;

  const originQuery = (searchParams.origin || '').toLowerCase().split(',')[0].trim();
  const destQuery = (searchParams.destination || '').toLowerCase().split(',')[0].trim();

  const filtered = rides.filter(ride => {
    const matchOrigin = !originQuery || 
      ride.originCity.toLowerCase().includes(originQuery) ||
      ride.originSpot.toLowerCase().includes(originQuery);

    const matchDest = !destQuery || 
      ride.destinationCity.toLowerCase().includes(destQuery) ||
      ride.destinationSpot.toLowerCase().includes(destQuery);

    const matchSeats = ride.availableSeats >= (searchParams.seats || 1);
    const matchAC = !searchFilterAC || ride.vehicle.hasAC;

    return matchOrigin && matchDest && matchSeats && matchAC;
  }).sort((a, b) => {
    if (searchSortBy === 'CHEAPEST') return a.pricePerSeat - b.pricePerSeat;
    return a.departureTime.localeCompare(b.departureTime);
  });

  return `
    <div class="max-w-4xl mx-auto px-4 py-6 text-left animate-fade-in">
      <div class="mb-6">
        ${renderHeroSearchBar()}
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center justify-between gap-2.5 bg-white p-3 rounded-xl border border-uber-border shadow-xs mb-5 h-auto sm:h-14">
        <div class="flex items-center gap-2 overflow-x-auto py-1">
          <button
            type="button"
            onclick="toggleFilterAC()"
            class="h-9 px-3.5 flex items-center gap-2 text-xs font-semibold rounded-full border transition-all shrink-0 active:scale-95 ${searchFilterAC ? 'bg-uber-black text-white border-uber-black' : 'bg-white text-uber-black border-uber-border hover:bg-uber-gray'}"
          >
            ${icon('ac_unit', { size: 'sm', className: searchFilterAC ? 'text-white' : 'text-uber-iron' })}
            <span>Ar-condicionado</span>
          </button>
        </div>

        <div class="flex items-center gap-2 h-9 shrink-0">
          ${icon('sort', { size: 'sm', className: 'text-uber-iron' })}
          <select
            onchange="handleSortChange(this.value)"
            class="h-9 bg-uber-gray border border-uber-border rounded-lg px-3 text-xs font-semibold text-uber-black focus:outline-none focus:border-uber-black cursor-pointer"
          >
            <option value="EARLIEST" ${searchSortBy === 'EARLIEST' ? 'selected' : ''}>Mais cedo</option>
            <option value="CHEAPEST" ${searchSortBy === 'CHEAPEST' ? 'selected' : ''}>Menor preço</option>
          </select>
        </div>
      </div>

      <!-- Header -->
      <div class="flex items-center justify-between mb-3.5 px-1">
        <span class="text-sm font-bold text-uber-black">
          ${filtered.length} ${filtered.length === 1 ? 'viagem encontrada no Nordeste' : 'viagens encontradas no Nordeste'}
        </span>
        <span class="text-xs font-normal text-uber-iron">
          Data: ${new Date(searchParams.date + 'T00:00:00').toLocaleDateString('pt-BR')}
        </span>
      </div>

      <!-- List -->
      <div class="flex flex-col gap-3">
        ${filtered.length > 0 ? filtered.map(r => renderRideCard(r)).join('') : `
          <div class="bg-white border border-uber-border rounded-xl p-10 text-center flex flex-col items-center gap-3">
            <div class="w-12 h-12 bg-uber-gray text-uber-iron rounded-full flex items-center justify-center">
              ${icon('search_off', { size: 'md' })}
            </div>
            <div>
              <h3 class="text-base font-bold text-uber-black">Nenhuma viagem disponível nesta rota</h3>
              <p class="text-uber-iron text-xs font-normal mt-1">Tente buscar por cidades como Fortaleza, Recife, Salvador, João Pessoa, Natal, Maceió, Teresina ou Aracaju.</p>
            </div>
            <button
              onclick="searchFilterAC = false; store.setSearchParams({ origin: '', destination: '' }); renderApp();"
              class="mt-2 h-9 px-4 bg-uber-gray text-uber-black font-semibold rounded-lg hover:bg-uber-border text-xs"
            >
              Ver Todas as Viagens
            </button>
          </div>
        `}
      </div>
    </div>
  `;
}

// View: Ride Details
let selectedSeatsDetail = 1;

function viewRideDetails(rideId) {
  const ride = store.state.rides.find(r => r.id === rideId);
  const role = store.state.role;
  const isDriverMode = role === 'DRIVER';

  if (!ride) {
    return `
      <div class="max-w-md mx-auto py-16 px-4 text-center animate-fade-in">
        ${icon('error_outline', { size: 'xl', className: 'text-red-600 mb-2' })}
        <h2 class="text-xl font-bold text-uber-black">Viagem não encontrada</h2>
        <a href="#/" class="mt-4 inline-block px-4 py-2 bg-black text-white rounded-lg font-semibold text-sm">Voltar para Início</a>
      </div>
    `;
  }

  const effectiveSeats = Math.min(selectedSeatsDetail, ride.availableSeats || 1);
  const totalAmount = ride.pricePerSeat * effectiveSeats;
  const signalAmount = totalAmount * 0.5;
  const finalAmount = totalAmount * 0.5;

  return `
    <div class="max-w-3xl mx-auto px-4 py-6 text-left pb-40 md:pb-12 animate-fade-in">
      <button onclick="window.history.back()" class="flex items-center gap-1.5 text-xs font-bold text-uber-black hover:text-uber-iron mb-4 transition-colors">
        ${icon('arrow_back', { size: 'sm' })}
        <span>Voltar</span>
      </button>

      <div class="flex flex-col gap-4">
        
        <!-- Main Route Card -->
        <div class="p-4 sm:p-5 border border-uber-border bg-white rounded-xl">
          <div class="flex items-center justify-between pb-3 border-b border-uber-border">
            <div class="flex items-center gap-2">
              ${icon('calendar_today', { size: 'sm', className: 'text-uber-black' })}
              <span class="text-xs sm:text-sm font-bold text-uber-black">${ride.departureDate}</span>
            </div>
            <div class="flex items-center gap-1 text-xs font-semibold text-uber-charcoal">
              ${icon('airline_seat_recline_normal', { size: 'sm', className: 'text-uber-black' })}
              <span>${ride.availableSeats} ${ride.availableSeats === 1 ? 'lugar restante' : 'lugares restantes'}</span>
            </div>
          </div>

          <!-- Timeline -->
          <div class="py-4 flex flex-col gap-3">
            <div class="flex items-start gap-3">
              <div class="flex flex-col items-center">
                <div class="w-2.5 h-2.5 rounded-full bg-uber-black shrink-0 mt-1.5"></div>
                <div class="w-0.5 h-10 bg-uber-border my-1"></div>
              </div>
              <div>
                <div class="flex items-baseline gap-2">
                  <span class="text-base font-bold text-uber-black">${ride.departureTime}</span>
                  <span class="text-sm font-semibold text-uber-black">${ride.originCity}</span>
                </div>
                <div class="text-xs text-uber-iron mt-0.5">
                  <span>Ponto de Encontro: <strong class="text-uber-black font-semibold">${ride.originSpot}</strong></span>
                </div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-2.5 h-2.5 bg-uber-black shrink-0 mt-1.5"></div>
              <div>
                <div class="flex items-baseline gap-2">
                  <span class="text-base font-bold text-uber-black">${ride.estimatedArrivalTime}</span>
                  <span class="text-sm font-semibold text-uber-black">${ride.destinationCity}</span>
                </div>
                <div class="text-xs text-uber-iron mt-0.5">
                  <span>Ponto de Chegada: <strong class="text-uber-black font-semibold">${ride.destinationSpot}</strong></span>
                </div>
              </div>
            </div>
          </div>

          ${ride.notes ? `
            <div class="pt-3 border-t border-uber-border text-xs text-uber-charcoal bg-uber-gray p-3 rounded-lg font-normal">
              <span class="font-bold text-uber-black block mb-0.5">Observações do Motorista:</span>
              ${ride.notes}
            </div>
          ` : ''}
        </div>

        <!-- Driver Card -->
        <div class="p-4 sm:p-5 border border-uber-border bg-white rounded-xl">
          <div class="flex items-center justify-between pb-3 border-b border-uber-border h-12">
            <div class="flex items-center gap-3">
              <img src="${ride.driverAvatar}" alt="${ride.driverName}" class="w-10 h-10 rounded-full object-cover border border-uber-border bg-uber-gray" />
              <div>
                <span class="text-sm font-bold text-uber-black block leading-tight">${ride.driverName}</span>
                <div class="flex items-center gap-1.5 text-xs text-uber-iron font-medium mt-0.5">
                  <span class="flex items-center gap-0.5 text-uber-black font-bold">
                    ${icon('star', { size: 'sm', fill: true, className: 'star-gold' })}
                    ${ride.driverRating.toFixed(1)}
                  </span>
                  <span>•</span>
                  <span>${ride.driverTripsCount} viagens</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 text-uber-iron">
              ${ride.vehicle.hasAC ? `<span title="Ar-condicionado" class="p-1.5 bg-uber-gray rounded-lg border border-uber-border">${icon('ac_unit', { size: 'sm', className: 'text-uber-black' })}</span>` : ''}
              ${ride.vehicle.hasUSB ? `<span title="USB" class="p-1.5 bg-uber-gray rounded-lg border border-uber-border">${icon('usb', { size: 'sm', className: 'text-uber-black' })}</span>` : ''}
            </div>
          </div>

          <div class="pt-3 flex items-center justify-between text-xs text-uber-charcoal h-6 font-medium">
            <span>Veículo: <strong class="text-uber-black font-semibold">${ride.vehicle.brand} ${ride.vehicle.model}</strong></span>
            <span>Placa: <strong class="text-uber-black font-semibold">${ride.vehicle.plate}</strong></span>
          </div>
        </div>

        <!-- Booking Section (Non-driver) -->
        ${!isDriverMode ? `
          <div class="p-4 sm:p-5 border border-uber-border bg-white rounded-xl">
            <div class="flex items-center justify-between pb-3 border-b border-uber-border">
              <span class="text-xs font-bold text-uber-black uppercase tracking-wider">Lugares para reservar</span>
              <select
                onchange="selectedSeatsDetail = Number(this.value); renderApp();"
                class="h-10 bg-uber-gray border border-uber-border rounded-lg px-3 font-semibold text-uber-black focus:outline-none focus:border-uber-black text-sm cursor-pointer"
              >
                ${Array.from({ length: Math.min(ride.availableSeats, 7) }, (_, i) => i + 1).map(num => `
                  <option value="${num}" ${effectiveSeats === num ? 'selected' : ''}>
                    ${num} ${num === 1 ? 'lugar' : 'lugares'} (R$ ${(ride.pricePerSeat * num).toFixed(2).replace('.', ',')})
                  </option>
                `).join('')}
              </select>
            </div>

            <div class="grid grid-cols-2 gap-3 my-4">
              <div class="p-3 bg-uber-gray rounded-lg border border-uber-border text-left">
                <span class="text-xs font-semibold text-uber-iron block">Sinal Agora (50%):</span>
                <span class="text-xl font-extrabold text-uber-black">R$ ${signalAmount.toFixed(2).replace('.', ',')}</span>
              </div>
              <div class="p-3 bg-uber-gray rounded-lg border border-uber-border text-left">
                <span class="text-xs font-semibold text-uber-iron block">Na Chegada (50%):</span>
                <span class="text-xl font-extrabold text-uber-black">R$ ${finalAmount.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <div class="border border-uber-border rounded-lg p-3.5 bg-uber-gray flex items-start gap-3 text-left">
              ${icon('info', { size: 'md', className: 'text-uber-black mt-0.5 shrink-0' })}
              <p class="text-xs text-uber-charcoal font-normal">
                Cancelamento com devolução de 70% (>1h) ou 50% (<1h) via PIX.
              </p>
            </div>

            <div class="hidden md:block mt-4">
              <button
                type="button"
                onclick="handleStartBooking('${ride.id}')"
                class="w-full h-12 bg-black text-white hover:bg-neutral-900 rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
              >
                ${icon('payments', { size: 'md' })}
                <span>Reservar com PIX (50%)</span>
              </button>
            </div>
          </div>
        ` : ''}

      </div>

      <!-- Mobile Sticky Footer -->
      ${!isDriverMode ? `
        <div class="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-uber-border p-3 shadow-lg flex items-center justify-between gap-3">
          <div class="text-left">
            <span class="text-[11px] font-semibold text-uber-iron block leading-none">Sinal 50%</span>
            <span class="text-xl font-extrabold text-uber-black">R$ ${signalAmount.toFixed(2).replace('.', ',')}</span>
          </div>
          <button
            type="button"
            onclick="handleStartBooking('${ride.id}')"
            class="flex-1 h-11 bg-black text-white rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95"
          >
            ${icon('payments', { size: 'sm' })}
            <span>Reservar com PIX</span>
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

function handleStartBooking(rideId) {
  const booking = store.bookRide(rideId, selectedSeatsDetail);
  if (booking) {
    openPixModal(booking);
  }
}

// View: My Trips
function viewMyTrips() {
  const { bookings, rides, currentUser, role } = store.state;
  const myPublished = rides.filter(r => r.driverId === currentUser.id);

  return `
    <div class="max-w-3xl mx-auto px-4 py-6 text-left pb-24 md:pb-12 animate-fade-in">
      
      <div class="flex justify-between items-center gap-3 mb-6 h-10">
        <h1 class="text-xl sm:text-2xl font-bold text-uber-black">
          ${role === 'DRIVER' ? 'Minhas Viagens' : 'Minhas Reservas'}
        </h1>

        ${role === 'PASSENGER' ? `
          <a href="#/buscar" class="h-9 px-3.5 text-xs font-semibold rounded-full bg-uber-gray hover:bg-uber-border flex items-center gap-1.5 text-uber-black">
            ${icon('search', { size: 'sm' })}
            <span>Buscar</span>
          </a>
        ` : ''}
      </div>

      <!-- Passenger Section -->
      ${role === 'PASSENGER' ? `
        <div class="space-y-3">
          ${bookings.length > 0 ? bookings.map(b => {
            const ride = rides.find(r => r.id === b.rideId);
            return `
              <div class="p-4 border border-uber-border bg-white rounded-xl">
                <div class="flex justify-between items-center pb-3 border-b border-uber-border text-xs">
                  <span class="font-mono font-medium text-uber-iron">${b.id}</span>
                  ${b.status === 'SIGNAL_CONFIRMED' ? `
                    <span class="flex items-center gap-1.5 font-bold text-uber-black bg-uber-gray px-2.5 py-1 rounded-full text-[11px]">
                      ${icon('check_circle', { size: 'sm', className: 'text-uber-black' })}
                      <span>Sinal 50% Pago</span>
                    </span>
                  ` : b.status === 'FULLY_PAID' ? `
                    <span class="flex items-center gap-1.5 font-bold text-uber-black bg-uber-gray px-2.5 py-1 rounded-full text-[11px]">
                      ${icon('verified', { size: 'sm', className: 'text-uber-black' })}
                      <span>100% Concluído</span>
                    </span>
                  ` : `
                    <span class="flex items-center gap-1.5 font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full text-[11px]">
                      ${icon('cancel', { size: 'sm', className: 'text-red-600' })}
                      <span>Cancelada</span>
                    </span>
                  `}
                </div>

                ${ride ? `
                  <div class="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-uber-gray flex items-center justify-center shrink-0">
                        ${icon('directions_car', { size: 'sm', className: 'text-uber-black' })}
                      </div>
                      <div>
                        <p class="font-bold text-sm sm:text-base text-uber-black">${ride.originCity} ➔ ${ride.destinationCity}</p>
                        <p class="text-uber-iron font-normal mt-0.5">${ride.departureDate} às ${ride.departureTime} • ${ride.driverName}</p>
                      </div>
                    </div>
                    <div class="text-left sm:text-right mt-1 sm:mt-0">
                      <span class="font-bold text-uber-black text-sm block">Sinal: R$ ${b.amountPaidSignal.toFixed(2).replace('.', ',')}</span>
                      <span class="text-uber-iron font-normal text-xs">Final: R$ ${b.amountDueFinal.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                ` : ''}

                ${b.status !== 'CANCELLED' ? `
                  <div class="pt-3 border-t border-uber-border flex flex-wrap justify-end gap-2 text-xs">
                    ${ride ? `
                      <a href="#/chat/${ride.id}" class="font-semibold text-uber-black hover:bg-uber-border flex items-center gap-1.5 px-3 py-1.5 bg-uber-gray rounded-lg transition-colors active:scale-95">
                        ${icon('chat', { size: 'sm' })}
                        <span>Conversar</span>
                      </a>
                      
                      ${b.rated ? `
                        <button disabled class="font-semibold text-uber-iron bg-uber-gray px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-default opacity-80 select-none">
                          ${icon('check', { size: 'sm', className: 'text-green-600' })}
                          <span>Avaliado</span>
                        </button>
                      ` : `
                        <a href="#/avaliar/${ride.id}" class="font-semibold text-uber-black hover:bg-uber-border flex items-center gap-1.5 px-3 py-1.5 bg-uber-gray rounded-lg transition-colors active:scale-95">
                          ${icon('star', { size: 'sm', fill: true, className: 'star-gold' })}
                          <span>Avaliar</span>
                        </a>
                      `}
                    ` : ''}

                    <button onclick="openReceiptModalById('${b.id}')" class="font-semibold text-uber-black hover:bg-uber-border flex items-center gap-1.5 px-3 py-1.5 bg-uber-gray rounded-lg transition-colors active:scale-95">
                      ${icon('receipt', { size: 'sm' })}
                      <span>Comprovante</span>
                    </button>
                    <button onclick="openCancelModalById('${b.id}')" class="font-semibold text-red-600 hover:bg-red-100 flex items-center gap-1.5 px-3 py-1.5 bg-red-50 rounded-lg transition-colors active:scale-95">
                      ${icon('cancel', { size: 'sm' })}
                      <span>Cancelar</span>
                    </button>
                  </div>
                ` : ''}
              </div>
            `;
          }).join('') : `
            <div class="bg-white border border-uber-border rounded-xl p-8 text-center text-uber-iron text-xs font-normal">
              Nenhuma reserva encontrada.
            </div>
          `}
        </div>
      ` : ''}

      <!-- Driver Section -->
      ${role === 'DRIVER' ? `
        <div class="space-y-3">
          ${myPublished.length > 0 ? myPublished.map(ride => `
            <div class="p-4 border border-uber-border bg-white rounded-xl">
              <div class="flex justify-between items-center pb-3 border-b border-uber-border text-xs">
                <span class="font-bold text-sm sm:text-base text-uber-black">${ride.originCity} ➔ ${ride.destinationCity}</span>
                <span class="flex items-center gap-1.5 font-bold text-uber-black bg-uber-gray px-2.5 py-1 rounded-full text-[11px]">
                  ${icon('airline_seat_recline_normal', { size: 'sm', className: 'text-uber-black' })}
                  <span>${ride.availableSeats}/${ride.totalSeats} lugares</span>
                </span>
              </div>

              <div class="py-3 flex justify-between items-center text-xs">
                <span class="text-uber-iron font-normal">${ride.departureDate} às ${ride.departureTime}</span>
                <span class="font-bold text-uber-black text-sm">R$ ${ride.pricePerSeat.toFixed(2).replace('.', ',')} / lugar</span>
              </div>

              <div class="pt-3 border-t border-uber-border flex justify-end gap-2 text-xs">
                <a href="#/chat/${ride.id}" class="font-semibold text-uber-black hover:bg-uber-border flex items-center gap-1.5 px-3 py-1.5 bg-uber-gray rounded-lg transition-colors active:scale-95">
                  ${icon('chat', { size: 'sm' })}
                  <span>Mensagens</span>
                </a>
                <a href="#/viagem/${ride.id}" class="font-bold text-uber-black hover:underline flex items-center gap-1.5 px-3 py-1.5">
                  ${icon('visibility', { size: 'sm' })}
                  <span>Ver Detalhes</span>
                </a>
              </div>
            </div>
          `).join('') : `
            <div class="bg-white border border-uber-border rounded-xl p-8 text-center text-uber-iron text-xs font-normal">
              Você ainda não cadastrou nenhuma viagem como motorista.
            </div>
          `}
        </div>
      ` : ''}

      <!-- Admin Section -->
      ${(role === 'ADMIN' || role === 'MANAGER') ? `
        <div class="space-y-3">
          <p class="text-xs font-medium text-uber-iron mb-2">Visão geral administrativa das viagens cadastradas na plataforma:</p>
          ${rides.map(r => `
            <div class="p-4 border border-uber-border bg-white rounded-xl">
              <div class="flex justify-between items-center pb-2.5 border-b border-uber-border text-xs">
                <span class="font-bold text-uber-black">${r.originCity} ➔ ${r.destinationCity}</span>
                <span class="font-medium text-uber-iron">Motorista: ${r.driverName}</span>
              </div>
              <div class="pt-2.5 flex justify-between items-center text-xs">
                <span class="text-uber-iron font-normal">${r.departureDate} às ${r.departureTime}</span>
                <span class="font-bold text-uber-black">R$ ${r.pricePerSeat.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

    </div>
  `;
}

// View: Publish Ride (Driver only)
function viewPublishRide() {
  const role = store.state.role;

  if (role !== 'DRIVER') {
    return `
      <div class="max-w-md mx-auto py-16 px-4 text-center animate-fade-in">
        <div class="w-14 h-14 bg-uber-gray text-uber-black rounded-full flex items-center justify-center mx-auto mb-3">
          ${icon('lock', { size: 'lg' })}
        </div>
        <h2 class="text-xl font-bold text-uber-black">Acesso Restrito</h2>
        <p class="text-uber-iron text-xs sm:text-sm font-normal mt-1 mb-5">
          Apenas motoristas credenciados podem cadastrar viagens na plataforma.
        </p>
        <a href="#/" class="inline-block w-full h-11 py-2.5 bg-black text-white font-bold rounded-lg text-sm">
          Voltar para o Início
        </a>
      </div>
    `;
  }

  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  return `
    ${renderDatalists()}
    <div class="max-w-2xl mx-auto px-4 py-6 text-left pb-24 md:pb-12 animate-fade-in">
      <div class="mb-6">
        <button onclick="window.history.back()" class="flex items-center gap-1.5 text-xs font-bold text-uber-black hover:text-uber-iron mb-3 transition-colors">
          ${icon('arrow_back', { size: 'sm' })}
          <span>Voltar</span>
        </button>
        <h1 class="text-2xl sm:text-3xl font-bold text-uber-black">Nova Viagem</h1>
        <p class="text-uber-iron text-xs sm:text-sm font-normal mt-0.5">
          Cadastre uma nova rota no Nordeste e receba passageiros verificados.
        </p>
      </div>

      <form onsubmit="handlePublishSubmit(event)" class="flex flex-col gap-4">
        <!-- Step 1: Trajeto -->
        <div class="p-4 sm:p-5 border border-uber-border rounded-xl flex flex-col gap-3 bg-white">
          <div class="flex items-center gap-2 pb-3 border-b border-uber-border h-8">
            ${icon('route', { size: 'sm', className: 'text-uber-black' })}
            <h2 class="font-bold text-sm sm:text-base text-uber-black">1. Trajeto</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1.5">Cidade de Partida</label>
              <input id="pub-origin-city" type="text" list="nordeste-cities-list" placeholder="Ex: Fortaleza, CE" required class="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-sm font-semibold rounded-lg h-12 px-4 focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1.5">Ponto de Encontro</label>
              <input id="pub-origin-spot" type="text" placeholder="Ex: Shopping Iguatemi / Rodoviária" required class="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-sm font-semibold rounded-lg h-12 px-4 focus:outline-none" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1.5">Cidade de Destino</label>
              <input id="pub-dest-city" type="text" list="nordeste-cities-list" placeholder="Ex: Juazeiro do Norte, CE" required class="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-sm font-semibold rounded-lg h-12 px-4 focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1.5">Ponto de Chegada</label>
              <input id="pub-dest-spot" type="text" placeholder="Ex: Cariri Garden Shopping / Praça Central" required class="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-sm font-semibold rounded-lg h-12 px-4 focus:outline-none" />
            </div>
          </div>
        </div>

        <!-- Step 2: Data e Horário -->
        <div class="p-4 sm:p-5 border border-uber-border rounded-xl flex flex-col gap-3 bg-white">
          <div class="flex items-center gap-2 pb-3 border-b border-uber-border h-8">
            ${icon('schedule', { size: 'sm', className: 'text-uber-black' })}
            <h2 class="font-bold text-sm sm:text-base text-uber-black">2. Data e Horário</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1.5">Data da Viagem</label>
              <input id="pub-date" type="date" value="${tomorrow}" required class="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-sm font-semibold rounded-lg h-12 px-4 focus:outline-none cursor-pointer" />
            </div>
            <div>
              <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1.5">Horário de Saída</label>
              <input id="pub-time" type="time" value="08:00" required class="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-sm font-semibold rounded-lg h-12 px-4 focus:outline-none cursor-pointer" />
            </div>
          </div>

          <div class="flex items-center gap-2 text-xs font-semibold text-uber-black bg-uber-gray p-3 rounded-lg border border-uber-border">
            ${icon('check_circle', { size: 'sm', className: 'text-uber-black shrink-0' })}
            <span>Antecedência mínima de 2h respeitada.</span>
          </div>
        </div>

        <!-- Step 3: Vagas e Valor (Até 7 Lugares) -->
        <div class="p-4 sm:p-5 border border-uber-border rounded-xl flex flex-col gap-3 bg-white">
          <div class="flex items-center gap-2 pb-3 border-b border-uber-border h-8">
            ${icon('payments', { size: 'sm', className: 'text-uber-black' })}
            <h2 class="font-bold text-sm sm:text-base text-uber-black">3. Vagas e Valor</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1.5">Vagas Livres</label>
              <select id="pub-seats" class="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-uber-black rounded-lg h-[48px] px-3 font-semibold text-sm cursor-pointer transition-all focus:outline-none">
                <option value="1">1 passageiro</option>
                <option value="2">2 passageiros</option>
                <option value="3">3 passageiros</option>
                <option value="4" selected>4 passageiros</option>
                <option value="5">5 passageiros</option>
                <option value="6">6 passageiros</option>
                <option value="7">7 passageiros</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1.5">Valor por Pessoa (R$)</label>
              <input id="pub-price" type="number" step="0.50" value="45.00" required class="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-sm font-semibold rounded-lg h-12 px-4 focus:outline-none" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1.5">Observações (Opcional)</label>
            <textarea id="pub-notes" rows="2" placeholder="Ex: Tolerância de 10 minutos no ponto de encontro." class="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white font-normal rounded-lg p-3 text-xs text-uber-black focus:outline-none transition-all"></textarea>
          </div>
        </div>

        <button type="submit" class="w-full h-12 mt-2 font-bold bg-black text-white hover:bg-neutral-900 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-98">
          ${icon('check_circle', { size: 'md' })}
          <span>Publicar Nova Viagem</span>
        </button>
      </form>
    </div>
  `;
}

function handlePublishSubmit(e) {
  e.preventDefault();
  const originCity = document.getElementById('pub-origin-city').value;
  const originSpot = document.getElementById('pub-origin-spot').value;
  const destinationCity = document.getElementById('pub-dest-city').value;
  const destinationSpot = document.getElementById('pub-dest-spot').value;
  const departureDate = document.getElementById('pub-date').value;
  const departureTime = document.getElementById('pub-time').value;
  const totalSeats = Number(document.getElementById('pub-seats').value);
  const pricePerSeat = parseFloat(document.getElementById('pub-price').value) || 35.0;
  const notes = document.getElementById('pub-notes').value;

  // Validation: 2 hours advance
  const targetDate = new Date(`${departureDate}T${departureTime}:00`);
  const minValid = new Date(Date.now() + 2 * 60 * 60 * 1000);

  if (targetDate < minValid) {
    showToast('A viagem deve ser cadastrada com pelo menos 2 horas de antecedência.', 'error');
    return;
  }

  const vehicle = store.state.currentUser.vehicle || {
    plate: 'CE-FOR-2023',
    state: 'CE',
    brand: 'Toyota',
    model: 'Corolla 2.0',
    year: 2023,
    hasAC: true,
    hasUSB: true,
  };

  store.addRide({
    originCity,
    originSpot,
    destinationCity,
    destinationSpot,
    departureDate,
    departureTime,
    estimatedDuration: '2h 30m',
    estimatedArrivalTime: '10:30',
    pricePerSeat,
    totalSeats,
    availableSeats: totalSeats,
    vehicle,
    notes,
    status: 'PUBLISHED',
  });

  showToast(`Viagem para ${destinationCity} publicada com sucesso!`, 'success');
  window.location.hash = '#/minhas-viagens';
}

// View: Chat
function viewChat(rideId) {
  const ride = store.state.rides.find(r => r.id === rideId);
  const rideMessages = store.state.messages.filter(m => m.rideId === rideId);
  const myId = store.state.currentUser.id;

  return `
    <div class="max-w-2xl mx-auto px-4 py-6 text-left pb-24 md:pb-12 flex flex-col h-[85vh] animate-fade-in">
      <div class="flex items-center justify-between pb-3 border-b border-uber-border mb-3 shrink-0">
        <button onclick="window.history.back()" class="flex items-center gap-1 text-xs font-bold text-uber-black hover:text-uber-iron transition-colors">
          ${icon('arrow_back', { size: 'sm' })}
          <span>Voltar</span>
        </button>
        <div class="text-center">
          <h1 class="text-sm font-bold text-uber-black">${ride ? `${ride.originCity} ➔ ${ride.destinationCity}` : 'Chat da Viagem'}</h1>
          <p class="text-[11px] font-normal text-uber-iron">Comunicação direta com o motorista e passageiros</p>
        </div>
        <div class="w-12"></div>
      </div>

      <!-- Messages Box -->
      <div id="chat-box" class="flex-1 p-4 border border-uber-border bg-white rounded-xl flex flex-col gap-3 overflow-y-auto">
        ${rideMessages.length > 0 ? rideMessages.map(msg => {
          const isMe = msg.senderId === myId;
          return `
            <div class="flex gap-2.5 max-w-[85%] ${isMe ? 'self-end flex-row-reverse' : 'self-start'} animate-fade-in">
              <img src="${msg.senderAvatar}" alt="${msg.senderName}" class="w-7 h-7 rounded-full object-cover border border-uber-border shrink-0 mt-1 bg-uber-gray" />
              <div class="p-3 rounded-xl text-xs ${isMe ? 'bg-uber-black text-white text-left' : 'bg-uber-gray text-uber-black text-left'}">
                <p class="font-bold text-[11px] mb-0.5 ${isMe ? 'text-uber-slate' : 'text-uber-black'}">${msg.senderName}</p>
                <p class="leading-relaxed font-normal">${msg.text}</p>
                <span class="text-[10px] block text-right mt-1 font-medium text-uber-iron">${msg.createdAt}</span>
              </div>
            </div>
          `;
        }).join('') : `
          <div class="m-auto text-center text-uber-iron text-xs font-normal">
            ${icon('chat', { size: 'lg', className: 'text-uber-border mb-1' })}
            <p>Nenhuma mensagem ainda. Inicie a conversa sobre pontos de encontro ou horários.</p>
          </div>
        `}
      </div>

      <!-- Input Form -->
      <form onsubmit="handleSendChat(event, '${rideId}')" class="mt-3 flex gap-2 shrink-0">
        <input id="chat-input" type="text" placeholder="Digite sua mensagem..." required class="flex-1 h-12 bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-uber-black font-medium px-4 rounded-xl focus:outline-none text-xs sm:text-sm transition-all" />
        <button type="submit" class="h-12 px-5 font-bold bg-black text-white hover:bg-neutral-900 rounded-xl flex items-center justify-center gap-1.5 transition-transform active:scale-95">
          ${icon('send', { size: 'sm' })}
          <span>Enviar</span>
        </button>
      </form>
    </div>
  `;
}

function handleSendChat(e, rideId) {
  e.preventDefault();
  const input = document.getElementById('chat-input');
  if (!input || !input.value.trim()) return;

  const text = input.value.trim();
  store.sendMessage(rideId, text);
  input.value = '';
  renderApp();

  const chatBox = document.getElementById('chat-box');
  if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;

  // Driver simulated response
  setTimeout(() => {
    const isQuestion = text.includes('?') || text.toLowerCase().includes('onde') || text.toLowerCase().includes('horário');
    const replyText = isQuestion
      ? 'Perfeito! Ponto de encontro combinado. Qualquer dúvida nos falamos aqui.'
      : 'Mensagem recebida! Te aguardo no horário combinado.';
    
    const ride = store.state.rides.find(r => r.id === rideId);
    store.addSimulatedReply(
      rideId,
      replyText,
      ride ? ride.driverName : 'Motorista',
      ride ? ride.driverAvatar : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    );
  }, 1500);
}

// View: Rating
let ratingScore = 5;
let ratingTags = [];

function toggleRatingTag(tag) {
  if (ratingTags.includes(tag)) {
    ratingTags = ratingTags.filter(t => t !== tag);
  } else {
    ratingTags.push(tag);
  }
  renderApp();
}

function handleCommentInput(e) {
  const countEl = document.getElementById('comment-char-count');
  if (countEl) {
    const len = e.target.value.length;
    countEl.textContent = `${len}/100`;
  }
}

function viewRating(rideId) {
  const ride = store.state.rides.find(r => r.id === rideId);
  const availableTags = ['Pontualidade', 'Direção Segura', 'Carro Limpo', 'Boa Comunicação', 'Confortável', 'Respeitoso'];

  return `
    <div class="max-w-xl mx-auto px-4 py-8 text-left pb-24 md:pb-12 animate-fade-in">
      <div class="mb-6">
        <button onclick="window.history.back()" class="flex items-center gap-1.5 text-xs font-bold text-uber-black hover:text-uber-iron mb-3 transition-colors">
          ${icon('arrow_back', { size: 'sm' })}
          <span>Voltar</span>
        </button>
        <h1 class="text-2xl font-bold text-uber-black">Avaliar Experiência</h1>
        <p class="text-uber-iron text-xs font-normal mt-0.5">
          ${ride ? `${ride.originCity} ➔ ${ride.destinationCity} com ${ride.driverName}` : 'Sua avaliação ajuda a manter a qualidade e segurança da Cooperativa.'}
        </p>
      </div>

      <div class="p-5 sm:p-6 border border-uber-border rounded-xl bg-white shadow-sm">
        <form onsubmit="handleRatingSubmit(event, '${rideId}')" class="flex flex-col gap-5">
          
          <!-- Golden Rating Stars -->
          <div class="text-center py-4 bg-uber-gray border border-uber-border rounded-xl">
            <span class="text-xs font-bold text-uber-black block mb-3 uppercase tracking-wider">Nota da Viagem:</span>
            <div class="flex justify-center gap-2">
              ${[1, 2, 3, 4, 5].map(star => `
                <button
                  type="button"
                  onclick="ratingScore = ${star}; renderApp();"
                  class="p-1 hover:scale-110 active:scale-95 transition-transform focus:outline-none"
                >
                  ${icon('star', { size: 'xl', fill: star <= ratingScore, className: star <= ratingScore ? 'star-gold' : 'star-empty' })}
                </button>
              `).join('')}
            </div>
            <span class="text-xs font-bold text-amber-600 mt-2 block">
              ${ratingScore === 5 ? 'Excelente! (5 estrelas)' : ratingScore === 4 ? 'Muito Bom (4 estrelas)' : ratingScore === 3 ? 'Regular (3 estrelas)' : ratingScore === 2 ? 'Ruim (2 estrelas)' : 'Muito Ruim (1 estrela)'}
            </span>
          </div>

          <!-- Tags -->
          <div>
            <span class="text-xs font-bold text-uber-black block mb-2 uppercase tracking-wider">Destaques da viagem:</span>
            <div class="flex flex-wrap gap-2">
              ${availableTags.map(tag => {
                const isSelected = ratingTags.includes(tag);
                return `
                  <button
                    type="button"
                    onclick="toggleRatingTag('${tag}')"
                    class="h-9 px-3.5 text-xs font-semibold rounded-full border transition-all flex items-center gap-1.5 active:scale-95 ${isSelected ? 'bg-uber-black text-white border-uber-black' : 'bg-white text-uber-black border-uber-border hover:bg-uber-gray'}"
                  >
                    ${icon(isSelected ? 'check' : 'add', { size: 'sm', className: isSelected ? 'text-white' : 'text-uber-iron' })}
                    <span>${tag}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Comment with 0/100 limit -->
          <div>
            <div class="flex justify-between items-center mb-1.5">
              <label class="text-xs font-bold text-uber-black uppercase tracking-wider">Comentário:</label>
              <span id="comment-char-count" class="text-xs font-mono font-medium text-uber-iron">0/100</span>
            </div>
            <textarea
              id="rating-comment"
              rows="3"
              maxlength="100"
              oninput="handleCommentInput(event)"
              placeholder="Conte como foi sua viagem com o motorista (máximo 100 caracteres)..."
              class="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white font-normal rounded-xl p-3 text-xs text-uber-black focus:outline-none transition-all resize-none"
            ></textarea>
          </div>

          <div class="border border-uber-border rounded-lg p-3 bg-uber-gray text-left">
            <p class="text-xs font-normal text-uber-charcoal">Sua avaliação fica registrada no perfil do motorista na cooperativa.</p>
          </div>

          <button type="submit" class="w-full h-12 font-bold bg-black text-white hover:bg-neutral-900 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-98">
            ${icon('star', { size: 'sm', fill: true, className: 'text-amber-400' })}
            <span>Enviar Avaliação</span>
          </button>
        </form>
      </div>
    </div>
  `;
}

function handleRatingSubmit(e, rideId) {
  e.preventDefault();
  store.markRideAsRated(rideId);
  showToast('Avaliação enviada com sucesso! Obrigado por fortalecer a cooperativa.', 'success');
  window.location.hash = '#/minhas-viagens';
}

// View: Admin Dashboard
let adminTab = 'REQUESTS';
let adminReqFilter = 'ALL';

function viewAdmin() {
  const { driverRequests, bookings, role } = store.state;

  if (role !== 'ADMIN' && role !== 'MANAGER') {
    return `
      <div class="max-w-md mx-auto py-16 px-4 text-center animate-fade-in">
        ${icon('lock', { size: 'xl', className: 'text-red-600 mb-2' })}
        <h2 class="text-xl font-bold text-uber-black">Acesso Restrito</h2>
        <p class="text-xs font-normal text-uber-iron mt-1 mb-4">Esta área é restrita a administradores da Cooperativa.</p>
        <a href="#/" class="inline-block px-4 py-2 bg-black text-white rounded-lg font-bold text-sm">Voltar ao Início</a>
      </div>
    `;
  }

  const totalVolume = bookings.reduce((acc, b) => acc + b.totalAmount, 0) + 1540.00;
  const custodyBalance = bookings.filter(b => b.status === 'SIGNAL_CONFIRMED').reduce((acc, b) => acc + b.amountPaidSignal, 0) + 420.00;
  const pendingRequests = driverRequests.filter(r => r.status === 'PENDING');

  const filteredRequests = driverRequests.filter(req => {
    if (adminReqFilter === 'ALL') return true;
    return req.status === adminReqFilter;
  });

  return `
    <div class="max-w-4xl mx-auto px-4 py-6 text-left pb-24 md:pb-12 animate-fade-in">
      <div class="flex justify-between items-center mb-6 h-10">
        <h1 class="text-xl sm:text-2xl font-bold text-uber-black">Painel de Gestão</h1>
        <div class="flex items-center gap-1.5 text-xs font-bold text-uber-black bg-uber-gray px-3 py-1 rounded-full border border-uber-border">
          ${icon('shield', { size: 'sm' })}
          <span>Perfil ${role === 'ADMIN' ? 'Administrador' : 'Gestor'}</span>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div class="p-4 border border-uber-border bg-white rounded-xl">
          <div class="flex items-center justify-between pb-2 text-uber-iron text-xs font-semibold">
            <span>Volume Transacionado</span>
            ${icon('payments', { size: 'sm', className: 'text-uber-black' })}
          </div>
          <p class="text-2xl font-extrabold text-uber-black">R$ ${totalVolume.toFixed(2).replace('.', ',')}</p>
          <span class="text-[11px] text-uber-iron font-normal">Sinais e valores totais</span>
        </div>

        <div class="p-4 border border-uber-border bg-white rounded-xl">
          <div class="flex items-center justify-between pb-2 text-uber-iron text-xs font-semibold">
            <span>Saldo em Custódia</span>
            ${icon('lock', { size: 'sm', className: 'text-uber-black' })}
          </div>
          <p class="text-2xl font-extrabold text-uber-black">R$ ${custodyBalance.toFixed(2).replace('.', ',')}</p>
          <span class="text-[11px] text-uber-iron font-normal">Garantia ativa até o fim da viagem</span>
        </div>

        <div class="p-4 border border-uber-border bg-white rounded-xl">
          <div class="flex items-center justify-between pb-2 text-uber-iron text-xs font-semibold">
            <span>Solicitações Pendentes</span>
            ${icon('person_add', { size: 'sm', className: 'text-uber-black' })}
          </div>
          <p class="text-2xl font-extrabold text-uber-black">${pendingRequests.length}</p>
          <span class="text-[11px] text-uber-iron font-normal">Motoristas aguardando análise</span>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex border-b border-uber-border mb-6">
        <button
          onclick="adminTab = 'REQUESTS'; renderApp();"
          class="py-2.5 px-4 text-xs font-bold border-b-2 transition-colors ${adminTab === 'REQUESTS' ? 'border-uber-black text-uber-black' : 'border-transparent text-uber-iron hover:text-uber-black'}"
        >
          Credenciamento de Motoristas
        </button>
        <button
          onclick="adminTab = 'FINANCE'; renderApp();"
          class="py-2.5 px-4 text-xs font-bold border-b-2 transition-colors ${adminTab === 'FINANCE' ? 'border-uber-black text-uber-black' : 'border-transparent text-uber-iron hover:text-uber-black'}"
        >
          Custódia Financeira (PIX 50%)
        </button>
      </div>

      ${adminTab === 'REQUESTS' ? `
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-uber-black uppercase tracking-wider">Filtrar Solicitações:</span>
            <div class="flex gap-1.5">
              ${['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map(st => `
                <button
                  onclick="adminReqFilter = '${st}'; renderApp();"
                  class="px-3 py-1 rounded-full text-xs font-semibold border transition-all ${adminReqFilter === st ? 'bg-uber-black text-white border-uber-black' : 'bg-white text-uber-black border-uber-border hover:bg-uber-gray'}"
                >
                  ${st === 'ALL' ? 'Todas' : st === 'PENDING' ? 'Pendentes' : st === 'APPROVED' ? 'Aprovadas' : 'Recusadas'}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="space-y-3">
            ${filteredRequests.length > 0 ? filteredRequests.map(req => `
              <div class="p-4 border border-uber-border bg-white rounded-xl">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-uber-border">
                  <div>
                    <h3 class="font-bold text-sm text-uber-black">${req.userName}</h3>
                    <p class="text-xs text-uber-iron font-normal">${req.userEmail} • ${req.userPhone}</p>
                  </div>
                  <span class="inline-flex items-center gap-1 font-bold text-xs px-2.5 py-1 rounded-full ${req.status === 'PENDING' ? 'bg-amber-100 text-amber-900' : req.status === 'APPROVED' ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}">
                    ${req.status === 'PENDING' ? 'Pendente' : req.status === 'APPROVED' ? 'Aprovado' : 'Recusado'}
                  </span>
                </div>

                <div class="py-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div>
                    <span class="text-uber-iron font-normal block text-[11px]">CNH:</span>
                    <span class="font-mono font-bold text-uber-black">${req.cnhNumber}</span>
                  </div>
                  <div>
                    <span class="text-uber-iron font-normal block text-[11px]">Veículo:</span>
                    <span class="font-bold text-uber-black">${req.vehicle.brand} ${req.vehicle.model}</span>
                  </div>
                  <div>
                    <span class="text-uber-iron font-normal block text-[11px]">Placa:</span>
                    <span class="font-mono font-bold text-uber-black">${req.vehicle.plate}</span>
                  </div>
                  <div>
                    <span class="text-uber-iron font-normal block text-[11px]">Ano:</span>
                    <span class="font-bold text-uber-black">${req.vehicle.year}</span>
                  </div>
                </div>

                ${req.status === 'PENDING' ? `
                  <div class="pt-3 border-t border-uber-border flex justify-end gap-2 text-xs">
                    <button onclick="handleRejectDriver('${req.id}')" class="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-bold transition-colors">
                      Recusar
                    </button>
                    <button onclick="handleApproveDriver('${req.id}')" class="px-4 py-2 bg-black text-white hover:bg-neutral-900 rounded-lg font-bold transition-transform active:scale-95">
                      Aprovar Motorista
                    </button>
                  </div>
                ` : ''}
              </div>
            `).join('') : `
              <div class="bg-white border border-uber-border rounded-xl p-8 text-center text-xs text-uber-iron font-normal">
                Nenhuma solicitação encontrada neste filtro.
              </div>
            `}
          </div>
        </div>
      ` : `
        <div class="space-y-4">
          <p class="text-xs text-uber-iron font-normal">Gestão e liberação de resgates para motoristas após a conclusão das viagens.</p>
          <div class="space-y-3">
            ${bookings.map(b => `
              <div class="p-4 border border-uber-border bg-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span class="font-mono font-medium text-uber-iron block text-[11px]">${b.id} • Passageiro: ${b.passengerName}</span>
                  <p class="font-bold text-sm text-uber-black mt-0.5">Sinal em Custódia: R$ ${b.amountPaidSignal.toFixed(2).replace('.', ',')}</p>
                  <span class="text-uber-iron font-normal text-[11px]">Total da Viagem: R$ ${b.totalAmount.toFixed(2).replace('.', ',')}</span>
                </div>

                <div class="flex items-center gap-2">
                  ${b.status === 'SIGNAL_CONFIRMED' ? `
                    <button onclick="handleReleaseCustodyAdmin('${b.id}', ${b.amountPaidSignal})" class="px-3.5 py-2 bg-black text-white hover:bg-neutral-900 rounded-lg font-bold text-xs transition-transform active:scale-95">
                      Liberar Resgate (PIX)
                    </button>
                  ` : b.status === 'FULLY_PAID' ? `
                    <span class="font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full text-xs">
                      Repasse Concluído
                    </span>
                  ` : `
                    <span class="font-bold text-red-700 bg-red-50 px-3 py-1.5 rounded-full text-xs">
                      Reserva Cancelada
                    </span>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `}
    </div>
  `;
}

function handleApproveDriver(id) {
  store.approveDriverRequest(id);
  showToast('Motorista aprovado com sucesso!', 'success');
  renderApp();
}

function handleRejectDriver(id) {
  const reason = prompt('Informe o motivo da recusa:') || 'Documentação ilegível';
  store.rejectDriverRequest(id, reason);
  showToast('Solicitação recusada e notificada.', 'info');
  renderApp();
}

function handleReleaseCustodyAdmin(id, amount) {
  store.releaseCustody(id);
  showToast(`Repasse de R$ ${amount.toFixed(2).replace('.', ',')} liberado com sucesso!`, 'success');
  renderApp();
}

// View: Profile (Edição completa: Foto, Google, Nome, CPF, Senha, PIX)
let isPasswordVisible = false;

function togglePasswordVisibility() {
  isPasswordVisible = !isPasswordVisible;
  const input = document.getElementById('profile-password');
  if (input) {
    input.type = isPasswordVisible ? 'text' : 'password';
  }
}

function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    showToast('A imagem deve ter menos de 2MB.', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    store.updateUserProfile({ avatarUrl: dataUrl });
    showToast('Foto de perfil atualizada com sucesso!', 'success');
  };
  reader.readAsDataURL(file);
}

function viewProfile() {
  const { currentUser, role } = store.state;
  const avatar = currentUser.avatarUrl || DEFAULT_BLANK_AVATAR;

  return `
    <div class="max-w-3xl mx-auto px-4 py-6 text-left pb-24 md:pb-12 animate-fade-in">
      <div class="flex justify-between items-center mb-6 h-10">
        <h1 class="text-xl sm:text-2xl font-bold text-uber-black">Meu Perfil</h1>
        <div class="flex items-center gap-1.5 text-xs font-bold text-uber-black bg-uber-gray px-3 py-1 rounded-full border border-uber-border">
          ${icon('person', { size: 'sm' })}
          <span>${role === 'DRIVER' ? 'Motorista' : role === 'ADMIN' ? 'Administrador' : 'Passageiro'}</span>
        </div>
      </div>

      <div class="flex flex-col gap-5">
        
        <!-- Profile Form Card -->
        <div class="p-5 sm:p-6 border border-uber-border bg-white rounded-2xl shadow-sm">
          
          <!-- Avatar & Social Header -->
          <div class="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 pb-5 border-b border-uber-border">
            <div class="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div class="relative group">
                <img
                  id="profile-avatar-preview"
                  src="${avatar}"
                  alt="${currentUser.name}"
                  class="w-20 h-20 rounded-full object-cover border-2 border-uber-border bg-uber-gray shadow-sm"
                />
                <label for="avatar-file-input" class="absolute bottom-0 right-0 w-7 h-7 bg-uber-black text-white rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-neutral-800 transition-transform active:scale-90" title="Trocar Foto">
                  ${icon('photo_camera', { size: 'sm' })}
                </label>
                <input id="avatar-file-input" type="file" accept="image/*" onchange="handleAvatarUpload(event)" class="hidden" />
              </div>

              <div>
                <h2 class="text-lg font-bold text-uber-black">${currentUser.name}</h2>
                <p class="text-xs text-uber-iron font-normal">${currentUser.email}</p>
                
                <div class="flex items-center gap-1 text-xs text-uber-black font-semibold mt-1 justify-center sm:justify-start">
                  ${icon('star', { size: 'sm', fill: true, className: 'star-gold' })}
                  <span>${currentUser.rating.toFixed(1)} de reputação</span>
                  <span class="text-uber-border">•</span>
                  <span class="text-uber-charcoal font-normal">${currentUser.totalTrips} viagens concluídas</span>
                </div>
              </div>
            </div>

            <!-- Social / Quick Actions -->
            <div class="flex flex-wrap sm:flex-col gap-2 shrink-0">
              <button
                type="button"
                onclick="store.connectGoogleAccount(); showToast('Conectado com Google! Foto e dados sincronizados.', 'success');"
                class="h-9 px-3.5 bg-white border border-uber-border hover:bg-uber-gray text-uber-black font-semibold rounded-lg text-xs flex items-center gap-2 transition-all active:scale-95 shadow-xs"
              >
                ${icon('account_circle', { size: 'sm', className: 'text-uber-black' })}
                <span>Puxar Foto do Google</span>
              </button>

              <button
                type="button"
                onclick="store.resetAvatarToDefault(); showToast('Foto restaurada para o padrão.', 'info');"
                class="h-9 px-3.5 bg-uber-gray hover:bg-uber-border text-uber-iron font-medium rounded-lg text-xs flex items-center gap-1.5 transition-all active:scale-95"
              >
                ${icon('delete', { size: 'sm' })}
                <span>Remover Foto</span>
              </button>
            </div>
          </div>

          <!-- Main Profile Edit Form -->
          <form onsubmit="handleSaveFullProfile(event)" class="pt-5 space-y-4">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Name -->
              <div>
                <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1.5">Nome Completo</label>
                <input
                  id="profile-name"
                  type="text"
                  value="${currentUser.name}"
                  required
                  class="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-sm font-semibold rounded-xl h-12 px-4 focus:outline-none transition-all"
                />
              </div>

              <!-- CPF -->
              <div>
                <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1.5">CPF</label>
                <input
                  id="profile-cpf"
                  type="text"
                  value="${currentUser.cpf || '123.456.789-00'}"
                  placeholder="000.000.000-00"
                  required
                  class="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-sm font-semibold rounded-xl h-12 px-4 focus:outline-none transition-all font-mono"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Password -->
              <div>
                <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1.5">Alterar Senha</label>
                <div class="relative flex items-center">
                  <input
                    id="profile-password"
                    type="password"
                    placeholder="Digite nova senha..."
                    class="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-sm font-semibold rounded-xl h-12 px-4 pr-11 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onclick="togglePasswordVisibility()"
                    class="absolute right-3 p-1 text-uber-iron hover:text-uber-black transition-colors"
                  >
                    ${icon('visibility', { size: 'sm' })}
                  </button>
                </div>
              </div>

              <!-- PIX Key -->
              <div>
                <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1.5">Chave PIX (Estornos & Resgates)</label>
                <input
                  id="profile-pix-key"
                  type="text"
                  value="${currentUser.pixKey}"
                  required
                  class="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-sm font-semibold rounded-xl h-12 px-4 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div class="pt-2 flex justify-end">
              <button
                type="submit"
                class="w-full sm:w-auto h-12 px-8 bg-black text-white font-bold rounded-xl hover:bg-neutral-900 flex items-center justify-center gap-2 active:scale-95 shadow-md"
              >
                ${icon('save', { size: 'sm' })}
                <span>Salvar Alterações do Perfil</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Vehicle Details (Driver only) -->
        ${role === 'DRIVER' && currentUser.vehicle ? `
          <div class="p-4 sm:p-5 border border-uber-border bg-white rounded-xl">
            <div class="flex items-center gap-2 pb-3 border-b border-uber-border">
              ${icon('directions_car', { size: 'md', className: 'text-uber-black' })}
              <h3 class="font-bold text-base text-uber-black">Veículo Cadastrado</h3>
            </div>
            <div class="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div class="p-3 bg-uber-gray border border-uber-border rounded-lg">
                <span class="font-semibold text-uber-iron block text-[11px]">Marca/Modelo</span>
                <p class="font-bold text-uber-black mt-0.5">${currentUser.vehicle.brand} ${currentUser.vehicle.model}</p>
              </div>
              <div class="p-3 bg-uber-gray border border-uber-border rounded-lg">
                <span class="font-semibold text-uber-iron block text-[11px]">Placa</span>
                <p class="font-mono font-bold text-uber-black mt-0.5">${currentUser.vehicle.plate}</p>
              </div>
              <div class="p-3 bg-uber-gray border border-uber-border rounded-lg">
                <span class="font-semibold text-uber-iron block text-[11px]">Ano</span>
                <p class="font-bold text-uber-black mt-0.5">${currentUser.vehicle.year}</p>
              </div>
              <div class="p-3 bg-uber-gray border border-uber-border rounded-lg">
                <span class="font-semibold text-uber-iron block text-[11px]">Recursos</span>
                <p class="font-bold text-uber-black mt-0.5">${currentUser.vehicle.hasAC ? 'Ar-condicionado' : ''} ${currentUser.vehicle.hasUSB ? '• USB' : ''}</p>
              </div>
            </div>
          </div>
        ` : ''}

        <div class="pt-2 text-center">
          <button onclick="store.resetToDefaults(); showToast('Dados de demonstração restaurados.', 'info');" class="text-xs text-uber-iron hover:text-red-600 underline font-normal transition-colors">
            Restaurar Dados de Demonstração (Reset Local)
          </button>
        </div>
      </div>
    </div>
  `;
}

function handleSaveFullProfile(e) {
  e.preventDefault();
  const name = document.getElementById('profile-name').value;
  const cpf = document.getElementById('profile-cpf').value;
  const pixKey = document.getElementById('profile-pix-key').value;
  const pass = document.getElementById('profile-password').value;

  store.updateUserProfile({ name, cpf, pixKey });
  if (pass) {
    showToast('Perfil e nova senha atualizados com sucesso!', 'success');
  } else {
    showToast('Perfil atualizado com sucesso!', 'success');
  }
}

// ==========================================
// 8. MODAIS (PIX, COMPROVANTE, CANCELAMENTO)
// ==========================================

function openPixModal(booking) {
  const modalRoot = document.getElementById('modal-root');
  modalRoot.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-uber-black/80 backdrop-blur-xs animate-fade-in">
      <div class="bg-white rounded-t-2xl sm:rounded-2xl border border-uber-border shadow-2xl max-w-md w-full p-5 sm:p-6 text-left max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-3 border-b border-uber-border">
          <div class="flex items-center gap-3">
            <div class="bg-uber-gray text-uber-black p-2 rounded-lg flex items-center justify-center">
              ${icon('qr_code_2', { size: 'md' })}
            </div>
            <div>
              <h3 class="font-bold text-lg text-uber-black leading-tight">Pagamento PIX (50%)</h3>
              <p class="text-xs text-uber-iron font-normal">Garantia de vaga na carona</p>
            </div>
          </div>
          <button onclick="closeModal()" class="text-uber-iron hover:text-uber-black p-1.5 rounded-lg hover:bg-uber-gray transition-colors">
            ${icon('close', { size: 'md' })}
          </button>
        </div>

        <div class="my-4 bg-uber-gray border border-uber-border rounded-xl p-4 flex flex-col gap-2">
          <div class="flex justify-between items-center h-8">
            <span class="text-sm font-semibold text-uber-black flex items-center gap-1.5">
              ${icon('payments', { size: 'sm', className: 'text-uber-black' })}
              Sinal agora (50%):
            </span>
            <span class="text-2xl font-extrabold text-uber-black">R$ ${booking.amountPaidSignal.toFixed(2).replace('.', ',')}</span>
          </div>
          <div class="flex justify-between items-center text-xs text-uber-iron pt-2 border-t border-uber-border h-6 font-normal">
            <span>Restante no fim da viagem:</span>
            <span class="font-bold text-uber-black">R$ ${booking.amountDueFinal.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>

        <div class="space-y-2 mb-4">
          <div class="flex items-center gap-3 p-2.5 bg-uber-gray rounded-lg border border-uber-border text-xs font-medium text-uber-black h-11">
            <div class="w-5 h-5 rounded-full bg-uber-black text-white font-bold flex items-center justify-center shrink-0 text-[10px]">1</div>
            <span class="flex-1 truncate">Copie o código PIX abaixo</span>
            ${icon('content_copy', { size: 'sm', className: 'text-uber-iron shrink-0' })}
          </div>
          <div class="flex items-center gap-3 p-2.5 bg-uber-gray rounded-lg border border-uber-border text-xs font-medium text-uber-black h-11">
            <div class="w-5 h-5 rounded-full bg-uber-black text-white font-bold flex items-center justify-center shrink-0 text-[10px]">2</div>
            <span class="flex-1 truncate">Abra seu banco e escolha PIX Copia e Cola</span>
            ${icon('account_balance', { size: 'sm', className: 'text-uber-iron shrink-0' })}
          </div>
          <div class="flex items-center gap-3 p-2.5 bg-uber-gray rounded-lg border border-uber-border text-xs font-medium text-uber-black h-11">
            <div class="w-5 h-5 rounded-full bg-uber-black text-white font-bold flex items-center justify-center shrink-0 text-[10px]">3</div>
            <span class="flex-1 truncate">Cole e confirme o pagamento</span>
            ${icon('check_circle', { size: 'sm', className: 'text-uber-black shrink-0' })}
          </div>
        </div>

        <div class="mb-4 flex gap-2">
          <input id="pix-code-input" type="text" readonly value="${booking.pixCopyPasteCode}" class="flex-1 bg-uber-gray border border-uber-border rounded-lg px-3 h-11 text-xs font-mono font-medium text-uber-black select-all" />
          <button onclick="copyPixCode()" class="h-11 px-4 font-bold bg-black text-white hover:bg-neutral-900 rounded-lg flex items-center gap-1.5 text-xs">
            ${icon('content_copy', { size: 'sm' })}
            <span>Copiar</span>
          </button>
        </div>

        <div class="border border-uber-border rounded-lg p-3 bg-uber-gray text-left mb-4">
          <p class="text-xs font-normal text-uber-charcoal">Valor em custódia protegida pela Cooperativa até o fim do trajeto.</p>
        </div>

        <div class="flex gap-2.5 pt-1">
          <button onclick="closeModal()" class="flex-1 h-12 font-semibold bg-uber-gray text-uber-black rounded-lg hover:bg-uber-border">Voltar</button>
          <button onclick="confirmPixPaymentModal('${booking.id}')" class="flex-1 h-12 font-bold bg-black text-white rounded-lg hover:bg-neutral-900 flex items-center justify-center gap-1.5">
            ${icon('check_circle', { size: 'sm' })}
            <span>Confirmar PIX</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function copyPixCode() {
  const input = document.getElementById('pix-code-input');
  if (input) {
    navigator.clipboard.writeText(input.value);
    showToast('Código PIX copiado para a área de transferência!', 'success');
  }
}

function confirmPixPaymentModal(bookingId) {
  closeModal();
  showToast('Pagamento do sinal confirmado com sucesso! Vaga garantida.', 'success');
  window.location.hash = '#/minhas-viagens';
}

function openReceiptModalById(bookingId) {
  const b = store.state.bookings.find(bk => bk.id === bookingId);
  const r = store.state.rides.find(rd => rd.id === b?.rideId);
  if (!b) return;

  const modalRoot = document.getElementById('modal-root');
  modalRoot.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-uber-black/80 backdrop-blur-xs animate-fade-in">
      <div class="bg-white rounded-2xl border border-uber-border shadow-2xl max-w-lg w-full p-5 sm:p-7 text-left max-h-[92vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-3 border-b border-uber-border">
          <div class="flex items-center gap-3">
            <div class="bg-uber-black text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold">
              ${icon('receipt_long', { size: 'sm' })}
            </div>
            <div>
              <h3 class="font-bold text-lg text-uber-black leading-tight">Comprovante Digital</h3>
              <p class="text-[11px] font-normal text-uber-iron">Cooperativa de Viagens do Nordeste</p>
            </div>
          </div>
          <button onclick="closeModal()" class="text-uber-iron hover:text-uber-black p-1.5 rounded-lg hover:bg-uber-gray transition-colors">
            ${icon('close', { size: 'md' })}
          </button>
        </div>

        <div class="py-4 space-y-4 text-xs text-uber-charcoal">
          <div class="bg-uber-gray border border-uber-border rounded-xl p-3.5 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              ${icon('verified', { size: 'md', fill: true, className: 'text-uber-black shrink-0' })}
              <div>
                <p class="font-bold text-xs text-uber-black">Pagamento Garantido em Custódia</p>
                <p class="text-[11px] font-normal text-uber-iron">Sinal de 50% confirmado via PIX</p>
              </div>
            </div>
            <span class="font-mono text-[11px] font-medium text-uber-black bg-white px-2 py-0.5 rounded-md border border-uber-border">${b.id}</span>
          </div>

          <div class="grid grid-cols-2 gap-3 p-3.5 bg-uber-gray border border-uber-border rounded-xl">
            <div>
              <span class="text-[10px] font-semibold text-uber-iron uppercase tracking-wider block">Passageiro:</span>
              <p class="font-bold text-uber-black mt-0.5">${b.passengerName}</p>
            </div>
            <div>
              <span class="text-[10px] font-semibold text-uber-iron uppercase tracking-wider block">Motorista:</span>
              <p class="font-bold text-uber-black mt-0.5">${r ? r.driverName : 'Motorista Credenciado'}</p>
            </div>
            <div>
              <span class="text-[10px] font-semibold text-uber-iron uppercase tracking-wider block">Data da Emissão:</span>
              <p class="font-medium text-uber-black mt-0.5">${new Date(b.createdAt).toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <span class="text-[10px] font-semibold text-uber-iron uppercase tracking-wider block">Lugares:</span>
              <p class="font-bold text-uber-black mt-0.5">${b.seatsBooked} lugar(es)</p>
            </div>
          </div>

          ${r ? `
            <div class="p-3.5 border border-uber-border rounded-xl space-y-2">
              <span class="text-[10px] font-semibold text-uber-iron uppercase tracking-wider block">Itinerário:</span>
              <div class="flex items-center justify-between text-xs font-bold text-uber-black">
                <span>${r.originCity} (${r.originSpot})</span>
                <span class="text-uber-black">➔</span>
                <span>${r.destinationCity} (${r.destinationSpot})</span>
              </div>
              <p class="text-[11px] font-normal text-uber-iron">Partida: <strong class="text-uber-black">${r.departureDate} às ${r.departureTime}</strong></p>
            </div>
          ` : ''}

          <div class="p-3.5 bg-uber-gray border border-uber-border rounded-xl space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="font-normal text-uber-iron">Valor Total da Corrida:</span>
              <span class="font-bold text-uber-black">R$ ${b.totalAmount.toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="flex justify-between items-center text-xs pt-1.5 border-t border-uber-border">
              <span class="font-semibold text-uber-black">Sinal 50% Pago (Custódia):</span>
              <span class="font-extrabold text-uber-black text-sm">R$ ${b.amountPaidSignal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="flex justify-between items-center text-xs pt-1.5 border-t border-uber-border">
              <span class="font-normal text-uber-iron">Saldo Restante na Chegada:</span>
              <span class="font-bold text-uber-black">R$ ${b.amountDueFinal.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <div class="text-[10px] text-uber-iron font-mono text-center p-2.5 bg-white border border-uber-border rounded-lg truncate">
            Autenticação Bancária: BCB-PIX-CUSTODIA-${b.id}
          </div>
        </div>

        <div class="flex gap-2.5 pt-2 border-t border-uber-border">
          <button onclick="window.print()" class="flex-1 h-11 font-semibold bg-uber-gray text-uber-black rounded-lg hover:bg-uber-border flex items-center justify-center gap-1.5">
            ${icon('print', { size: 'sm' })}
            <span>Imprimir / PDF</span>
          </button>
          <button onclick="closeModal()" class="flex-1 h-11 font-bold bg-black text-white rounded-lg hover:bg-neutral-900">
            Concluir
          </button>
        </div>
      </div>
    </div>
  `;
}

// Modal de Cancelamento com botão exatamente "Cancelamento"
function openCancelModalById(bookingId) {
  const b = store.state.bookings.find(bk => bk.id === bookingId);
  const r = store.state.rides.find(rd => rd.id === b?.rideId);
  if (!b) return;

  const refundAmount = b.amountPaidSignal * 0.70;
  const operationalFee = b.amountPaidSignal - refundAmount;

  const modalRoot = document.getElementById('modal-root');
  modalRoot.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-uber-black/80 backdrop-blur-xs animate-fade-in">
      <div class="bg-white rounded-2xl border border-uber-border shadow-2xl max-w-md w-full p-5 sm:p-6 text-left max-h-[92vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-3 border-b border-uber-border">
          <div class="flex items-center gap-3">
            <div class="bg-red-50 text-red-600 w-9 h-9 rounded-full flex items-center justify-center font-bold">
              ${icon('warning', { size: 'md' })}
            </div>
            <div>
              <h3 class="font-bold text-lg text-uber-black leading-tight">Cancelar Reserva</h3>
              <p class="text-[11px] font-normal text-uber-iron">Confirmação de estorno via PIX</p>
            </div>
          </div>
          <button onclick="closeModal()" class="text-uber-iron hover:text-uber-black p-1.5 rounded-lg hover:bg-uber-gray transition-colors">
            ${icon('close', { size: 'md' })}
          </button>
        </div>

        <div class="py-4 space-y-3.5 text-xs text-uber-charcoal">
          <p class="text-uber-black font-medium leading-relaxed">
            Tem certeza de que deseja cancelar sua reserva na viagem ${r ? `para ${r.destinationCity}` : ''}?
          </p>

          <div class="bg-uber-gray border border-uber-border rounded-xl p-4 space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="font-normal text-uber-iron">Sinal pago anteriormente:</span>
              <span class="font-bold text-uber-black">R$ ${b.amountPaidSignal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="flex justify-between items-center text-xs pt-1.5 border-t border-uber-border">
              <span class="font-semibold text-uber-black">Valor a ser estornado (70%):</span>
              <span class="font-extrabold text-uber-black text-sm">R$ ${refundAmount.toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="flex justify-between items-center text-[11px] text-uber-iron pt-1.5 border-t border-uber-border">
              <span>Retenção operacional:</span>
              <span>R$ ${operationalFee.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <div class="flex items-start gap-2.5 bg-uber-gray p-3 rounded-xl border border-uber-border text-[11px] text-uber-charcoal font-normal">
            ${icon('info', { size: 'sm', className: 'text-uber-black shrink-0 mt-0.5' })}
            <span>O estorno de R$ ${refundAmount.toFixed(2).replace('.', ',')} será enviado automaticamente para sua chave PIX cadastrada.</span>
          </div>
        </div>

        <div class="flex gap-2.5 pt-2 border-t border-uber-border">
          <button onclick="closeModal()" class="flex-1 h-11 font-semibold bg-uber-gray text-uber-black rounded-lg hover:bg-uber-border">Manter Reserva</button>
          <button onclick="executeCancelBooking('${b.id}')" class="flex-1 h-11 font-bold bg-black text-white hover:bg-red-700 rounded-lg flex items-center justify-center gap-1.5">
            ${icon('cancel', { size: 'sm' })}
            <span>Cancelamento</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function executeCancelBooking(bookingId) {
  const result = store.cancelBooking(bookingId);
  closeModal();
  showToast(`Reserva cancelada. Estorno de R$ ${result.refundAmount.toFixed(2).replace('.', ',')} enviado via PIX.`, 'warning');
  renderApp();
}

function closeModal() {
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
}

// ==========================================
// 9. ROTEADOR SPA & CICLO DE VIDA
// ==========================================

function renderApp() {
  const appRoot = document.getElementById('app-root');
  const path = window.location.hash.slice(1) || '/';

  renderHeader();
  renderMobileNav();

  if (path === '/' || path === '') {
    appRoot.innerHTML = viewHome();
  } else if (path === '/buscar') {
    appRoot.innerHTML = viewSearchResults();
  } else if (path.startsWith('/viagem/')) {
    const id = path.replace('/viagem/', '');
    appRoot.innerHTML = viewRideDetails(id);
  } else if (path === '/minhas-viagens') {
    appRoot.innerHTML = viewMyTrips();
  } else if (path === '/publicar') {
    appRoot.innerHTML = viewPublishRide();
  } else if (path.startsWith('/chat/')) {
    const rideId = path.replace('/chat/', '');
    appRoot.innerHTML = viewChat(rideId);
  } else if (path.startsWith('/avaliar/')) {
    const rideId = path.replace('/avaliar/', '');
    appRoot.innerHTML = viewRating(rideId);
  } else if (path === '/admin') {
    appRoot.innerHTML = viewAdmin();
  } else if (path === '/perfil') {
    appRoot.innerHTML = viewProfile();
  } else {
    appRoot.innerHTML = viewHome();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  ensureHeroVideoPlays();
}

function ensureHeroVideoPlays() {
  const vid = document.getElementById('hero-bg-video');
  if (vid) {
    vid.muted = true;
    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const resumeVideo = () => {
          vid.play().catch(() => {});
          window.removeEventListener('touchstart', resumeVideo);
          window.removeEventListener('click', resumeVideo);
        };
        window.addEventListener('touchstart', resumeVideo, { once: true, passive: true });
        window.addEventListener('click', resumeVideo, { once: true, passive: true });
      });
    }
  }
}

window.addEventListener('hashchange', renderApp);
window.addEventListener('DOMContentLoaded', () => {
  renderFooter();
  renderApp();
});
