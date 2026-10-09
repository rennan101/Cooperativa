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
// 2.1 BASE COMPLETA DE VEÍCULOS NO BRASIL
// ==========================================

const BRAZIL_VEHICLES_DATABASE = [
  // CHEVROLET
  { brand: 'Chevrolet', model: 'Onix' },
  { brand: 'Chevrolet', model: 'Onix Plus' },
  { brand: 'Chevrolet', model: 'Tracker' },
  { brand: 'Chevrolet', model: 'Spin' },
  { brand: 'Chevrolet', model: 'Montana' },
  { brand: 'Chevrolet', model: 'S10' },
  { brand: 'Chevrolet', model: 'Cruze' },
  { brand: 'Chevrolet', model: 'Cruze Sport6' },
  { brand: 'Chevrolet', model: 'Prisma' },
  { brand: 'Chevrolet', model: 'Cobalt' },
  { brand: 'Chevrolet', model: 'Celta' },
  { brand: 'Chevrolet', model: 'Corsa' },
  { brand: 'Chevrolet', model: 'Astra' },
  { brand: 'Chevrolet', model: 'Vectra' },
  { brand: 'Chevrolet', model: 'Zafira' },
  { brand: 'Chevrolet', model: 'Meriva' },
  { brand: 'Chevrolet', model: 'Trailblazer' },
  { brand: 'Chevrolet', model: 'Equinox' },

  // FIAT
  { brand: 'Fiat', model: 'Argo' },
  { brand: 'Fiat', model: 'Mobi' },
  { brand: 'Fiat', model: 'Cronos' },
  { brand: 'Fiat', model: 'Pulse' },
  { brand: 'Fiat', model: 'Fastback' },
  { brand: 'Fiat', model: 'Strada' },
  { brand: 'Fiat', model: 'Toro' },
  { brand: 'Fiat', model: 'Titano' },
  { brand: 'Fiat', model: 'Uno' },
  { brand: 'Fiat', model: 'Palio' },
  { brand: 'Fiat', model: 'Palio Weekend' },
  { brand: 'Fiat', model: 'Siena' },
  { brand: 'Fiat', model: 'Grand Siena' },
  { brand: 'Fiat', model: 'Punto' },
  { brand: 'Fiat', model: 'Linea' },
  { brand: 'Fiat', model: 'Doblo' },
  { brand: 'Fiat', model: 'Idea' },
  { brand: 'Fiat', model: 'Bravo' },
  { brand: 'Fiat', model: 'Fiorino' },

  // VOLKSWAGEN
  { brand: 'Volkswagen', model: 'Gol' },
  { brand: 'Volkswagen', model: 'Polo' },
  { brand: 'Volkswagen', model: 'Polo Track' },
  { brand: 'Volkswagen', model: 'Virtus' },
  { brand: 'Volkswagen', model: 'Nivus' },
  { brand: 'Volkswagen', model: 'T-Cross' },
  { brand: 'Volkswagen', model: 'Taos' },
  { brand: 'Volkswagen', model: 'Saveiro' },
  { brand: 'Volkswagen', model: 'Amarok' },
  { brand: 'Volkswagen', model: 'Fox' },
  { brand: 'Volkswagen', model: 'CrossFox' },
  { brand: 'Volkswagen', model: 'SpaceFox' },
  { brand: 'Volkswagen', model: 'Voyage' },
  { brand: 'Volkswagen', model: 'Jetta' },
  { brand: 'Volkswagen', model: 'Up!' },
  { brand: 'Volkswagen', model: 'Tiguan' },
  { brand: 'Volkswagen', model: 'Passat' },
  { brand: 'Volkswagen', model: 'Golf' },
  { brand: 'Volkswagen', model: 'Bora' },

  // TOYOTA
  { brand: 'Toyota', model: 'Corolla' },
  { brand: 'Toyota', model: 'Corolla Sedan 2.0' },
  { brand: 'Toyota', model: 'Corolla Hybrid' },
  { brand: 'Toyota', model: 'Corolla Cross' },
  { brand: 'Toyota', model: 'Yaris Hatch' },
  { brand: 'Toyota', model: 'Yaris Sedan' },
  { brand: 'Toyota', model: 'Etios Hatch' },
  { brand: 'Toyota', model: 'Etios Sedan' },
  { brand: 'Toyota', model: 'Hilux' },
  { brand: 'Toyota', model: 'SW4' },
  { brand: 'Toyota', model: 'RAV4' },
  { brand: 'Toyota', model: 'Camry' },

  // HYUNDAI
  { brand: 'Hyundai', model: 'HB20' },
  { brand: 'Hyundai', model: 'HB20S' },
  { brand: 'Hyundai', model: 'HB20X' },
  { brand: 'Hyundai', model: 'Creta' },
  { brand: 'Hyundai', model: 'Tucson' },
  { brand: 'Hyundai', model: 'ix35' },
  { brand: 'Hyundai', model: 'Santa Fe' },
  { brand: 'Hyundai', model: 'i30' },
  { brand: 'Hyundai', model: 'Elantra' },
  { brand: 'Hyundai', model: 'Azera' },
  { brand: 'Hyundai', model: 'HR' },

  // HONDA
  { brand: 'Honda', model: 'Civic' },
  { brand: 'Honda', model: 'Civic Touring' },
  { brand: 'Honda', model: 'HR-V' },
  { brand: 'Honda', model: 'City Hatch' },
  { brand: 'Honda', model: 'City Sedan' },
  { brand: 'Honda', model: 'Fit' },
  { brand: 'Honda', model: 'WR-V' },
  { brand: 'Honda', model: 'CR-V' },
  { brand: 'Honda', model: 'Accord' },
  { brand: 'Honda', model: 'ZR-V' },

  // JEEP
  { brand: 'Jeep', model: 'Renegade' },
  { brand: 'Jeep', model: 'Compass' },
  { brand: 'Jeep', model: 'Commander' },
  { brand: 'Jeep', model: 'Grand Cherokee' },
  { brand: 'Jeep', model: 'Wrangler' },

  // NISSAN
  { brand: 'Nissan', model: 'Kicks' },
  { brand: 'Nissan', model: 'Versa' },
  { brand: 'Nissan', model: 'Sentra' },
  { brand: 'Nissan', model: 'Frontier' },
  { brand: 'Nissan', model: 'March' },
  { brand: 'Nissan', model: 'Tiida' },
  { brand: 'Nissan', model: 'Livina' },
  { brand: 'Nissan', model: 'Grand Livina' },

  // RENAULT
  { brand: 'Renault', model: 'Kwid' },
  { brand: 'Renault', model: 'Sandero' },
  { brand: 'Renault', model: 'Stepway' },
  { brand: 'Renault', model: 'Logan' },
  { brand: 'Renault', model: 'Duster' },
  { brand: 'Renault', model: 'Duster Oroch' },
  { brand: 'Renault', model: 'Captur' },
  { brand: 'Renault', model: 'Kardian' },
  { brand: 'Renault', model: 'Fluence' },
  { brand: 'Renault', model: 'Megane' },
  { brand: 'Renault', model: 'Clio' },
  { brand: 'Renault', model: 'Master' },

  // FORD
  { brand: 'Ford', model: 'Ka' },
  { brand: 'Ford', model: 'Ka Sedan' },
  { brand: 'Ford', model: 'EcoSport' },
  { brand: 'Ford', model: 'Ranger' },
  { brand: 'Ford', model: 'Territory' },
  { brand: 'Ford', model: 'Maverick' },
  { brand: 'Ford', model: 'Fiesta' },
  { brand: 'Ford', model: 'Focus' },
  { brand: 'Ford', model: 'Focus Sedan' },
  { brand: 'Ford', model: 'Fusion' },
  { brand: 'Ford', model: 'Bronco Sport' },
  { brand: 'Ford', model: 'Edge' },

  // PEUGEOT
  { brand: 'Peugeot', model: '208' },
  { brand: 'Peugeot', model: '2008' },
  { brand: 'Peugeot', model: '3008' },
  { brand: 'Peugeot', model: '206' },
  { brand: 'Peugeot', model: '207' },
  { brand: 'Peugeot', model: '307' },
  { brand: 'Peugeot', model: '308' },
  { brand: 'Peugeot', model: '408' },
  { brand: 'Peugeot', model: 'Partner' },
  { brand: 'Peugeot', model: 'Expert' },
  { brand: 'Peugeot', model: 'Boxer' },

  // CITROËN
  { brand: 'Citroën', model: 'C3' },
  { brand: 'Citroën', model: 'C3 Aircross' },
  { brand: 'Citroën', model: 'C3 Picasso' },
  { brand: 'Citroën', model: 'C4 Cactus' },
  { brand: 'Citroën', model: 'C4 Lounge' },
  { brand: 'Citroën', model: 'C4 Pallas' },
  { brand: 'Citroën', model: 'AirCross' },
  { brand: 'Citroën', model: 'Jumpy' },

  // MITSUBISHI
  { brand: 'Mitsubishi', model: 'L200 Triton' },
  { brand: 'Mitsubishi', model: 'Eclipse Cross' },
  { brand: 'Mitsubishi', model: 'Outlander' },
  { brand: 'Mitsubishi', model: 'Pajero TR4' },
  { brand: 'Mitsubishi', model: 'Pajero Sport' },
  { brand: 'Mitsubishi', model: 'Pajero Full' },
  { brand: 'Mitsubishi', model: 'Pajero Dakar' },
  { brand: 'Mitsubishi', model: 'ASX' },
  { brand: 'Mitsubishi', model: 'Lancer' },

  // CAOA CHERY
  { brand: 'Caoa Chery', model: 'Tiggo 5X' },
  { brand: 'Caoa Chery', model: 'Tiggo 5X Pro' },
  { brand: 'Caoa Chery', model: 'Tiggo 7' },
  { brand: 'Caoa Chery', model: 'Tiggo 7 Pro' },
  { brand: 'Caoa Chery', model: 'Tiggo 8' },
  { brand: 'Caoa Chery', model: 'Arrizo 6' },
  { brand: 'Caoa Chery', model: 'Arrizo 6 Pro' },
  { brand: 'Caoa Chery', model: 'Tiggo 2' },
  { brand: 'Caoa Chery', model: 'Tiggo 3X' },
  { brand: 'Caoa Chery', model: 'iCar' },

  // BYD
  { brand: 'BYD', model: 'Dolphin' },
  { brand: 'BYD', model: 'Dolphin Mini' },
  { brand: 'BYD', model: 'Dolphin Plus' },
  { brand: 'BYD', model: 'Song Plus' },
  { brand: 'BYD', model: 'Song Pro' },
  { brand: 'BYD', model: 'Yuan Plus' },
  { brand: 'BYD', model: 'Yuan Pro' },
  { brand: 'BYD', model: 'Seal' },
  { brand: 'BYD', model: 'King' },
  { brand: 'BYD', model: 'Shark' },
  { brand: 'BYD', model: 'Tan' },
  { brand: 'BYD', model: 'Han' },

  // GWM
  { brand: 'GWM', model: 'Haval H6' },
  { brand: 'GWM', model: 'Haval H6 HEV' },
  { brand: 'GWM', model: 'Haval H6 PHEV' },
  { brand: 'GWM', model: 'Haval H6 GT' },
  { brand: 'GWM', model: 'Ora 03' },
  { brand: 'GWM', model: 'Ora 03 GT' },
  { brand: 'GWM', model: 'Poer' },
  { brand: 'GWM', model: 'Tank 300' },

  // BMW
  { brand: 'BMW', model: 'Série 3 (320i)' },
  { brand: 'BMW', model: 'Série 3 (330e)' },
  { brand: 'BMW', model: 'X1' },
  { brand: 'BMW', model: 'X3' },
  { brand: 'BMW', model: 'X4' },
  { brand: 'BMW', model: 'X5' },
  { brand: 'BMW', model: 'Série 1 (118i)' },
  { brand: 'BMW', model: 'Série 2 Gran Coupé' },

  // MERCEDES-BENZ
  { brand: 'Mercedes-Benz', model: 'Classe C (C180)' },
  { brand: 'Mercedes-Benz', model: 'Classe C (C200)' },
  { brand: 'Mercedes-Benz', model: 'Classe C (C300)' },
  { brand: 'Mercedes-Benz', model: 'Classe A (A200)' },
  { brand: 'Mercedes-Benz', model: 'GLA 200' },
  { brand: 'Mercedes-Benz', model: 'GLB 200' },
  { brand: 'Mercedes-Benz', model: 'GLC 300' },
  { brand: 'Mercedes-Benz', model: 'CLA 200' },

  // AUDI
  { brand: 'Audi', model: 'A3 Sedan' },
  { brand: 'Audi', model: 'A3 Sportback' },
  { brand: 'Audi', model: 'A4 Sedan' },
  { brand: 'Audi', model: 'A5 Sportback' },
  { brand: 'Audi', model: 'Q3' },
  { brand: 'Audi', model: 'Q3 Sportback' },
  { brand: 'Audi', model: 'Q5' },

  // VOLVO
  { brand: 'Volvo', model: 'XC40' },
  { brand: 'Volvo', model: 'XC60' },
  { brand: 'Volvo', model: 'XC90' },
  { brand: 'Volvo', model: 'EX30' },
  { brand: 'Volvo', model: 'C40' },

  // KIA
  { brand: 'Kia', model: 'Sportage' },
  { brand: 'Kia', model: 'Cerato' },
  { brand: 'Kia', model: 'Seltos' },
  { brand: 'Kia', model: 'Picanto' },
  { brand: 'Kia', model: 'Stonic' },
  { brand: 'Kia', model: 'Carnival' },
  { brand: 'Kia', model: 'Soul' },
  { brand: 'Kia', model: 'Niro' },

  // RAM
  { brand: 'RAM', model: 'Rampage' },
  { brand: 'RAM', model: '1500' },
  { brand: 'RAM', model: '2500' },
  { brand: 'RAM', model: '3500' },

  // SUZUKI
  { brand: 'Suzuki', model: 'Jimny' },
  { brand: 'Suzuki', model: 'Jimny Sierra' },
  { brand: 'Suzuki', model: 'Vitara' },
  { brand: 'Suzuki', model: 'Grand Vitara' },
  { brand: 'Suzuki', model: 'SX4' },
  { brand: 'Suzuki', model: 'S-Cross' },

  // JAC MOTORS
  { brand: 'JAC Motors', model: 'E-JS1' },
  { brand: 'JAC Motors', model: 'T40' },
  { brand: 'JAC Motors', model: 'T50' },
  { brand: 'JAC Motors', model: 'T60' },
  { brand: 'JAC Motors', model: 'J3' },
  { brand: 'JAC Motors', model: 'J5' },
  { brand: 'JAC Motors', model: 'J6' }
];

// ==========================================
// 3. ESTADO E DADOS INICIAIS (LOCAL STORAGE)
// ==========================================

const DEFAULT_PLATFORM_SETTINGS = {
  driverPayoutPercent: 85,      // % repassado ao motorista (ex.: 85%)
  platformFeePercent: 15,       // % taxa de manutenção da cooperativa (ex.: 15%) -> Soma = 100%
  signalPercent: 50,            // % exigido no PIX para confirmação da reserva (ex.: 50%)
  payOnArrivalPercent: 50,      // % pago diretamente no embarque/desembarque (ex.: 50%) -> Soma = 100%
  earlyRefundPercent: 70,       // % estornado em cancelamento com antecedência >1h (ex.: 70%)
  earlyRetentionPercent: 30,    // % retido para custos operacionais (>1h) (ex.: 30%) -> Soma = 100%
  lateRefundPercent: 50,        // % estornado em cancelamento com <1h (ex.: 50%)
  lateRetentionPercent: 50,     // % retido em cancelamento de última hora (<1h) (ex.: 50%) -> Soma = 100%
};

const INITIAL_STATE = {
  role: 'PASSENGER', // 'PASSENGER' | 'DRIVER' | 'ADMIN'
  notifications: [], // Central de notificações (badge + dropdown no header)
  platformSettings: { ...DEFAULT_PLATFORM_SETTINGS },
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
    wallet: {
      balance: 150.00,
      pending: 37.50,
      transactions: [
        {
          id: 'tx-001',
          type: 'CREDIT',
          amount: 150.00,
          description: 'Repasse de viagem concluída',
          status: 'CONFIRMED',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
        },
        {
          id: 'tx-002',
          type: 'DEBIT',
          amount: 37.50,
          description: 'Sinal PIX - Viagem Fortaleza',
          status: 'PENDING',
          createdAt: new Date(Date.now() - 3600000).toISOString()
        }
      ]
    },
    vehicles: [
      {
        id: 'veh-001',
        brand: 'Toyota',
        model: 'Corolla Sedan 2.0',
        color: 'prata',
        plate: 'BRA-2E19',
        renavam: '98765432101',
        year: 2023,
        hasAC: true,
        hasUSB: true,
        noSmoking: true,
        noPets: false,
        luggagePolicy: '1_MEDIUM',
        isPrimary: true,
      }
    ],
    vehicle: {
      id: 'veh-001',
      plate: 'BRA-2E19',
      state: 'CE',
      brand: 'Toyota',
      model: 'Corolla Sedan 2.0',
      color: 'prata',
      renavam: '98765432101',
      year: 2023,
      hasAC: true,
      hasUSB: true,
      noSmoking: true,
      noPets: false,
      luggagePolicy: '1_MEDIUM',
      isPrimary: true,
    }
  },
  searchParams: {
    origin: '',
    destination: '',
    date: new Date().toISOString().split('T')[0],
    seats: 1,
  },
  rides: [
    {
      id: 'ride-101',
      driverId: 'drv-01',
      driverName: 'Marcos Silva',
      driverCpf: '341.892.510-44',
      driverPhone: '(85) 98822-1144',
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
      luggagePolicy: '1_MEDIUM',
      vehicle: {
        brand: 'Toyota',
        model: 'Corolla 2.0',
        color: 'prata',
        plate: 'CE-FOR-2023',
        year: 2023,
        hasAC: true,
        hasUSB: true,
        noSmoking: true,
        noPets: false,
        luggagePolicy: '1_MEDIUM',
      },
      status: 'PUBLISHED',
      notes: 'Saída pontual. Parada para lanche em Quixadá.',
    },
    {
      id: 'ride-102',
      driverId: 'drv-02',
      driverName: 'Fernanda Costa',
      driverCpf: '452.981.621-55',
      driverPhone: '(81) 99112-3344',
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
      luggagePolicy: '1_LARGE',
      vehicle: {
        brand: 'Honda',
        model: 'Civic Touring',
        color: 'preto',
        plate: 'PE-REC-9988',
        year: 2023,
        hasAC: true,
        hasUSB: true,
        noSmoking: true,
        noPets: true,
        luggagePolicy: '1_LARGE',
      },
      status: 'PUBLISHED',
      notes: 'Carro espaçoso e ar-condicionado duplo.',
    },
    {
      id: 'ride-103',
      driverId: 'drv-03',
      driverName: 'Rafael Guimarães',
      driverCpf: '563.072.732-66',
      driverPhone: '(71) 98765-1122',
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
      luggagePolicy: '1_MEDIUM',
      vehicle: {
        brand: 'Volkswagen',
        model: 'T-Cross',
        color: 'vermelho',
        plate: 'BA-SSA-4411',
        year: 2022,
        hasAC: true,
        hasUSB: true,
        noSmoking: false,
        noPets: false,
        luggagePolicy: '1_MEDIUM',
      },
      status: 'PUBLISHED',
      notes: 'Direto pela BR-324, sem desvios.',
    },
    {
      id: 'ride-104',
      driverId: 'drv-04',
      driverName: 'Juliana Mendes',
      driverCpf: '674.183.843-77',
      driverPhone: '(83) 99887-6655',
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
      luggagePolicy: 'HAND',
      vehicle: {
        brand: 'Jeep',
        model: 'Renegade Longitude',
        color: 'azul',
        plate: 'PB-JPA-5522',
        year: 2023,
        hasAC: true,
        hasUSB: true,
        noSmoking: true,
        noPets: false,
        luggagePolicy: 'HAND',
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
      passengerCpf: '123.456.789-00',
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
        // Migração suave para configurações da plataforma
        if (!this.state.platformSettings) {
          this.state.platformSettings = { ...DEFAULT_PLATFORM_SETTINGS };
        } else {
          this.state.platformSettings = {
            ...DEFAULT_PLATFORM_SETTINGS,
            ...this.state.platformSettings,
          };
        }
        if (this.state.searchParams) {
          this.state.searchParams.origin = '';
          this.state.searchParams.destination = '';
        } else {
          this.state.searchParams = { origin: '', destination: '', date: new Date().toISOString().split('T')[0], seats: 1 };
        }
        // Migração suave de CPFs em viagens e reservas
        if (Array.isArray(this.state.rides)) {
          const sampleCpfs = ['341.892.510-44', '452.981.621-55', '563.072.732-66', '674.183.843-77'];
          this.state.rides.forEach((r, idx) => {
            if (!r.driverCpf) r.driverCpf = sampleCpfs[idx % sampleCpfs.length];
            if (!r.driverPhone) r.driverPhone = '(85) 98822-1144';
          });
        }
        if (Array.isArray(this.state.bookings)) {
          this.state.bookings.forEach(b => {
            if (!b.passengerCpf) b.passengerCpf = this.state.currentUser.cpf || '123.456.789-00';
            if (!b.passengerPhone) b.passengerPhone = this.state.currentUser.phone || '(85) 98765-4321';
          });
        }
        // Migração suave para lista de veículos
        if (!Array.isArray(this.state.currentUser.vehicles) || this.state.currentUser.vehicles.length === 0) {
          const defaultVeh = this.state.currentUser.vehicle || {
            id: 'veh-001',
            brand: 'Toyota',
            model: 'Corolla Sedan 2.0',
            plate: 'BRA-2E19',
            renavam: '98765432101',
            year: 2023,
            hasAC: true,
            hasUSB: true,
            isPrimary: true,
          };
          if (!defaultVeh.id) defaultVeh.id = 'veh-001';
          if (!defaultVeh.renavam) defaultVeh.renavam = '98765432101';
          defaultVeh.isPrimary = true;
          this.state.currentUser.vehicles = [defaultVeh];
          this.state.currentUser.vehicle = defaultVeh;
        } else {
          const hasPrimary = this.state.currentUser.vehicles.some(v => v.isPrimary);
          if (!hasPrimary && this.state.currentUser.vehicles.length > 0) {
            this.state.currentUser.vehicles[0].isPrimary = true;
          }
          const primaryVeh = this.state.currentUser.vehicles.find(v => v.isPrimary) || this.state.currentUser.vehicles[0];
          this.state.currentUser.vehicle = primaryVeh;
        }
        // Migração suave para notificações (estado salvo antes da feature)
        if (!Array.isArray(this.state.notifications)) {
          this.state.notifications = [];
          this.saveState();
        }
        // Migração suave para carteira (wallet)
        if (!this.state.currentUser.wallet) {
          this.state.currentUser.wallet = {
            balance: 0,
            pending: 0,
            transactions: []
          };
          this.saveState();
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

  updatePlatformSettings(newSettings) {
    this.state.platformSettings = {
      ...DEFAULT_PLATFORM_SETTINGS,
      ...this.state.platformSettings,
      ...newSettings,
    };
    this.saveState();
  }

  resetPlatformSettings() {
    this.state.platformSettings = { ...DEFAULT_PLATFORM_SETTINGS };
    this.saveState();
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

  addVehicle({ brand, model, plate, renavam, year, color, hasAC, hasUSB, noSmoking, noPets, luggagePolicy, isPrimary }) {
    if (!Array.isArray(this.state.currentUser.vehicles)) {
      this.state.currentUser.vehicles = [];
    }
    const newId = 'veh-' + Date.now();
    const isFirst = this.state.currentUser.vehicles.length === 0;
    const shouldBePrimary = isPrimary || isFirst;

    if (shouldBePrimary) {
      this.state.currentUser.vehicles.forEach(v => { v.isPrimary = false; });
    }

    const newVehicle = {
      id: newId,
      brand: (brand || '').trim(),
      model: (model || '').trim(),
      color: (color || 'branco').trim().toLowerCase(),
      plate: (plate || '').toUpperCase().trim(),
      renavam: (renavam || '').trim(),
      year: parseInt(year, 10) || new Date().getFullYear(),
      hasAC: !!hasAC,
      hasUSB: !!hasUSB,
      noSmoking: !!noSmoking,
      noPets: !!noPets,
      luggagePolicy: luggagePolicy || '1_MEDIUM',
      isPrimary: shouldBePrimary,
    };

    this.state.currentUser.vehicles.unshift(newVehicle);
    if (shouldBePrimary) {
      this.state.currentUser.vehicle = newVehicle;
    }
    this.saveState();
    renderApp();
  }

  updateVehicle(vehicleId, { brand, model, plate, renavam, year, color, hasAC, hasUSB, noSmoking, noPets, luggagePolicy, isPrimary }) {
    if (!Array.isArray(this.state.currentUser.vehicles)) return;
    const idx = this.state.currentUser.vehicles.findIndex(v => v.id === vehicleId);
    if (idx === -1) return;

    if (isPrimary) {
      this.state.currentUser.vehicles.forEach(v => { v.isPrimary = false; });
    }

    const updated = {
      ...this.state.currentUser.vehicles[idx],
      brand: (brand || '').trim(),
      model: (model || '').trim(),
      color: (color || this.state.currentUser.vehicles[idx].color || 'branco').trim().toLowerCase(),
      plate: (plate || '').toUpperCase().trim(),
      renavam: (renavam || '').trim(),
      year: parseInt(year, 10) || this.state.currentUser.vehicles[idx].year,
      hasAC: !!hasAC,
      hasUSB: !!hasUSB,
      noSmoking: !!noSmoking,
      noPets: !!noPets,
      luggagePolicy: luggagePolicy || this.state.currentUser.vehicles[idx].luggagePolicy || '1_MEDIUM',
      isPrimary: isPrimary !== undefined ? !!isPrimary : this.state.currentUser.vehicles[idx].isPrimary,
    };

    this.state.currentUser.vehicles[idx] = updated;
    const primaryVeh = this.state.currentUser.vehicles.find(v => v.isPrimary) || this.state.currentUser.vehicles[0];
    this.state.currentUser.vehicle = primaryVeh;

    this.saveState();
    renderApp();
  }

  deleteVehicle(vehicleId) {
    if (!Array.isArray(this.state.currentUser.vehicles)) return;
    this.state.currentUser.vehicles = this.state.currentUser.vehicles.filter(v => v.id !== vehicleId);
    if (this.state.currentUser.vehicles.length > 0) {
      const hasPrimary = this.state.currentUser.vehicles.some(v => v.isPrimary);
      if (!hasPrimary) {
        this.state.currentUser.vehicles[0].isPrimary = true;
      }
      this.state.currentUser.vehicle = this.state.currentUser.vehicles.find(v => v.isPrimary) || this.state.currentUser.vehicles[0];
    } else {
      this.state.currentUser.vehicle = null;
    }
    this.saveState();
    renderApp();
  }

  setPrimaryVehicle(vehicleId) {
    if (!Array.isArray(this.state.currentUser.vehicles)) return;
    this.state.currentUser.vehicles.forEach(v => {
      v.isPrimary = v.id === vehicleId;
    });
    this.state.currentUser.vehicle = this.state.currentUser.vehicles.find(v => v.id === vehicleId) || null;
    this.saveState();
    renderApp();
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
    if (this.state.role === 'DRIVER') return null;
    const ride = this.state.rides.find(r => r.id === rideId);
    if (!ride) return null;

    const settings = this.state.platformSettings || DEFAULT_PLATFORM_SETTINGS;
    const signalRate = (settings.signalPercent || 50) / 100;
    const totalAmount = ride.pricePerSeat * seats;
    const signal = Math.round(totalAmount * signalRate * 100) / 100;
    const finalVal = Math.round((totalAmount - signal) * 100) / 100;
    const bookingId = 'BK-' + Math.floor(1000 + Math.random() * 9000);

    const newBooking = {
      id: bookingId,
      rideId,
      passengerId: this.state.currentUser.id,
      passengerName: this.state.currentUser.name,
      passengerCpf: this.state.currentUser.cpf || '123.456.789-00',
      passengerPhone: this.state.currentUser.phone,
      passengerAvatar: this.state.currentUser.avatarUrl || DEFAULT_BLANK_AVATAR,
      seatsBooked: seats,
      totalAmount,
      amountPaidSignal: signal,
      amountDueFinal: finalVal,
      status: 'AWAITING_DRIVER', // Inicial: Aguardando motorista aceitar a viagem
      rated: false,
      pixCopyPasteCode: `00020126580014br.gov.bcb.pix0136cooperativa-viagens-custodia-${bookingId.toLowerCase()}5204000053039865405${signal.toFixed(2)}5802BR5925COOPERATIVA VIAGENS LTDA6009RECIFE62070503***6304C9E2`,
      createdAt: new Date().toISOString(),
    };

    ride.availableSeats = Math.max(0, ride.availableSeats - seats);
    this.state.bookings.unshift(newBooking);
    this.saveState();
    return newBooking;
  }

  acceptBooking(bookingId) {
    const booking = this.state.bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.status = 'ACCEPTED';
      this.saveState();
      renderApp();
    }
  }

  rejectBooking(bookingId) {
    const booking = this.state.bookings.find(b => b.id === bookingId);
    if (!booking) return;

    booking.status = 'REJECTED_BY_DRIVER';
    const ride = this.state.rides.find(r => r.id === booking.rideId);
    if (ride) {
      ride.availableSeats += booking.seatsBooked;
    }
    this.saveState();
    renderApp();
  }

  cancelBooking(bookingId, isEarly = true) {
    const booking = this.state.bookings.find(b => b.id === bookingId);
    if (!booking) return { refundAmount: 0, retainedAmount: 0 };

    booking.status = 'CANCELLED';
    const ride = this.state.rides.find(r => r.id === booking.rideId);
    if (ride) {
      ride.availableSeats += booking.seatsBooked;
    }

    const settings = this.state.platformSettings || DEFAULT_PLATFORM_SETTINGS;
    const refundPct = (isEarly ? (settings.earlyRefundPercent || 70) : (settings.lateRefundPercent || 50)) / 100;
    const refundAmount = Math.round(booking.amountPaidSignal * refundPct * 100) / 100;
    const retainedAmount = Math.round((booking.amountPaidSignal - refundAmount) * 100) / 100;
    this.saveState();
    return { refundAmount, retainedAmount };
  }

  addRide(rideData) {
    const newRide = {
      id: 'ride-' + Math.floor(100 + Math.random() * 900),
      driverId: this.state.currentUser.id,
      driverName: this.state.currentUser.name,
      driverCpf: this.state.currentUser.cpf || '123.456.789-00',
      driverPhone: this.state.currentUser.phone || '(85) 98765-4321',
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
    SoundEngine.play('message');

    // Notifications for Chat
    const ride = this.state.rides.find(r => r.id === rideId);
    if (ride) {
      if (this.state.currentUser.id === ride.driverId) {
        // Driver sent a message, notify passengers
        const bookings = this.state.bookings.filter(b => b.rideId === rideId && ['SIGNAL_CONFIRMED', 'AWAITING_DRIVER'].includes(b.status));
        bookings.forEach(b => {
          pushNotification({
            title: `Nova mensagem de ${this.state.currentUser.name}`,
            body: `"${text.substring(0, 30)}${text.length > 30 ? '...' : ''}"`,
            icon: 'chat',
            href: `#/chat/${rideId}`,
            category: 'message',
            role: 'PASSENGER',
            userId: b.passengerId
          });
        });
      } else {
        // Passenger sent a message, notify driver
        pushNotification({
          title: `Nova mensagem de ${this.state.currentUser.name}`,
          body: `"${text.substring(0, 30)}${text.length > 30 ? '...' : ''}"`,
          icon: 'chat',
          href: `#/chat/${rideId}`,
          category: 'message',
          role: 'DRIVER',
          userId: ride.driverId
        });
      }
    }
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
    SoundEngine.play('message');
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
// 4. MOTOR DE ÁUDIO NATIVO (WEB AUDIO API) & TOASTS
// ==========================================

const SoundEngine = {
  ctx: null,
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },
  play(type = 'info') {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === 'success') {
        // Acorde maior brilhante e cristalino (C5 - E5 - G5)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.07);
        osc.frequency.setValueAtTime(783.99, now + 0.14);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
        osc.start(now);
        osc.stop(now + 0.42);
      } else if (type === 'message') {
        // Pop duplo sutil de conversa / chat
        osc.type = 'sine';
        osc.frequency.setValueAtTime(840, now);
        osc.frequency.setValueAtTime(1180, now + 0.05);
        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'warning') {
        // Tom descendente suave de cautela/aviso
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.setValueAtTime(440, now + 0.1);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
        osc.start(now);
        osc.stop(now + 0.32);
      } else if (type === 'error') {
        // Tom de alerta suave grave
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(170, now + 0.09);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else {
        // Pop limpo para informações e ações gerais
        osc.type = 'sine';
        osc.frequency.setValueAtTime(620, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (e) {
      // Ignora silenciosamente se o áudio não estiver inicializado
    }
  }
};

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
  SoundEngine.play(type);
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

// ==========================================
// NOTIFICAÇÕES: store methods + dropdown
// ==========================================
function pushNotification({ title, body, icon = 'notifications', href = null, category = 'system', userId = null, role = null, priority = 'normal' }) {
  if (!Array.isArray(store.state.notifications)) store.state.notifications = [];
  const n = {
    id: 'notif-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
    userId,
    role,
    category,
    title,
    body: body || '',
    icon,
    href,
    read: false,
    priority,
    createdAt: new Date().toISOString(),
  };
  store.state.notifications.unshift(n);
  saveNotifications();
  updateNotificationBadge();
  return n;
}

function saveNotifications() {
  try {
    localStorage.setItem('coop.notifications', JSON.stringify(store.state.notifications));
  } catch (e) { /* storage indisponível */ }
}

function loadNotifications() {
  try {
    const raw = localStorage.getItem('coop.notifications');
    if (raw) store.state.notifications = JSON.parse(raw) || [];
  } catch (e) { /* ignora */ }
}

function unreadCount() {
  return store.state.notifications.filter(n => !n.read && (!n.userId || n.userId === store.state.currentUser.id) && (!n.role || n.role === store.state.role)).length;
}

function updateNotificationBadge() {
  const badge = document.getElementById('notif-badge');
  if (!badge) return;
  const count = unreadCount();
  if (count > 0) {
    badge.style.display = 'flex';
    badge.textContent = count > 99 ? '99+' : count;
  } else {
    badge.style.display = 'none';
  }
}

function toggleNotificationCenter() {
  const panel = document.getElementById('notification-panel');
  const isOpen = panel && panel.style.display !== 'none';
  if (isOpen) { panel.style.display = 'none'; return; }
  SoundEngine.play('info');
  renderNotificationPanel();
  if (panel) panel.style.display = 'block';
}

function markNotificationRead(id) {
  const n = store.state.notifications.find(x => x.id === id);
  if (n && !n.read) { n.read = true; saveNotifications(); }
  updateNotificationBadge();
  const panel = document.getElementById('notification-panel');
  if (panel) panel.style.display = 'none';
  renderNotificationPanel();
}

function markAllNotificationsRead() {
  store.state.notifications.forEach(n => { n.read = true; });
  saveNotifications();
  updateNotificationBadge();
  renderNotificationPanel();
}

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'agora';
  if (m < 60) return `${m}min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

function renderNotificationPanel() {
  const panel = document.getElementById('notification-panel');
  if (!panel) return;
  const list = store.state.notifications;
  const items = list.length ? list.map(n => `
    <button onclick="markNotificationRead('${n.id}')${n.href ? `; window.location.hash='${n.href}'` : ''}"
      class="w-full text-left flex items-start gap-3 px-4 py-3 hover:bg-uber-gray transition-colors ${n.read ? '' : 'bg-uber-gray/60'}">
      <span class="shrink-0 mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center ${n.read ? 'bg-uber-gray text-uber-iron' : 'bg-uber-black text-white'}">
        ${icon(n.icon, { size: 'sm' })}
      </span>
      <span class="min-w-0 flex-1">
        <span class="block text-xs font-bold text-uber-black truncate">${n.title}</span>
        ${n.body ? `<span class="block text-[11px] text-uber-iron font-normal truncate">${n.body}</span>` : ''}
      </span>
      <span class="shrink-0 text-[10px] text-uber-slate font-semibold">${timeAgo(n.createdAt)}</span>
    </button>
  `).join('') : `
    <div class="px-4 py-10 text-center">
      ${icon('notifications_off', { size: 'lg', className: 'text-uber-border mx-auto' })}
      <p class="mt-2 text-xs font-semibold text-uber-iron">Nenhuma notificação</p>
    </div>
  `;
  panel.innerHTML = `
    <div class="flex items-center justify-between px-4 py-3 border-b border-uber-border bg-white">
      <span class="text-sm font-extrabold text-uber-black">Notificações</span>
      ${unreadCount() > 0 ? `<button onclick="markAllNotificationsRead()" class="text-[11px] font-bold text-uber-iron hover:text-uber-black transition-colors">Marcar todas como lidas</button>` : ''}
    </div>
    <div class="max-h-[60vh] sm:max-h-96 overflow-y-auto divide-y divide-uber-border">
      ${items}
    </div>
  `;
}

function renderHeader() {
  const headerRoot = document.getElementById('header-root');
  const role = store.state.role;
  const currentPath = window.location.hash.slice(1) || '/';
  const isSearchActive = currentPath === '/' || currentPath === '/buscar';
  const avatar = store.state.currentUser.avatarUrl || DEFAULT_BLANK_AVATAR;

  headerRoot.innerHTML = `
    <div class="max-w-4xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between gap-2 sm:gap-4">
      <!-- Logo -->
      <a href="#/" class="flex items-center gap-2 sm:gap-2.5 shrink-0 group" aria-label="Página inicial Cooperativa">
        <div class="bg-white text-uber-black w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-transform group-hover:scale-105">
          ${icon('directions_car', { size: 'sm' })}
        </div>
        <div class="flex flex-col text-left">
          <span class="font-extrabold text-base sm:text-lg tracking-tight text-white leading-none">Cooperativa</span>
          <span class="text-[9px] sm:text-[10px] font-semibold text-uber-iron uppercase tracking-wider">Nordeste</span>
        </div>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-2 lg:gap-6 h-full" aria-label="Navegação desktop">
        <a href="#/buscar" class="h-full flex items-center gap-1.5 text-xs lg:text-sm font-semibold transition-colors border-b-2 ${isSearchActive ? 'text-white border-white' : 'text-uber-slate border-transparent hover:text-white'}">
          ${icon('search', { size: 'sm' })}
          <span>Buscar</span>
        </a>

        ${role === 'DRIVER' ? `
          <a href="#/publicar" class="h-full flex items-center gap-1.5 text-xs lg:text-sm font-semibold transition-colors border-b-2 ${currentPath === '/publicar' ? 'text-white border-white' : 'text-uber-slate border-transparent hover:text-white'}">
            ${icon('add', { size: 'sm' })}
            <span>Nova Viagem</span>
          </a>
        ` : ''}

        <a href="#/minhas-viagens" class="h-full flex items-center gap-1.5 text-xs lg:text-sm font-semibold transition-colors border-b-2 ${currentPath === '/minhas-viagens' ? 'text-white border-white' : 'text-uber-slate border-transparent hover:text-white'}">
          ${icon('history', { size: 'sm' })}
          <span>Viagens</span>
        </a>

        ${(role === 'ADMIN' || role === 'MANAGER') ? `
          <a href="#/admin" class="h-full flex items-center gap-1.5 text-xs lg:text-sm font-semibold transition-colors border-b-2 ${currentPath === '/admin' ? 'text-white border-white' : 'text-uber-slate border-transparent hover:text-white'}">
            ${icon('admin_panel_settings', { size: 'sm' })}
            <span>Painel</span>
          </a>
        ` : ''}

        <a href="#/perfil" class="h-full flex items-center gap-1.5 lg:gap-2 text-xs lg:text-sm font-semibold transition-colors border-b-2 ${currentPath === '/perfil' ? 'text-white border-white' : 'text-uber-slate border-transparent hover:text-white'}">
          <img src="${avatar}" alt="Avatar" class="w-5 h-5 rounded-md object-cover bg-uber-gray border border-white/20" />
          <span>Perfil</span>
        </a>
      </nav>

      <!-- Role Switcher & Profile Quick Action -->
      <div class="flex items-center gap-1.5 sm:gap-3 shrink-0">
        <!-- Notifications Bell + Badge -->
        <div class="relative">
          <button onclick="toggleNotificationCenter()" title="Notificações" aria-label="Abrir central de notificações"
            class="relative h-8 w-8 flex items-center justify-center rounded-lg hover:bg-uber-charcoal transition-colors active:scale-95">
            ${icon('notifications', { size: 'sm' })}
            <span id="notif-badge"
              class="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 items-center justify-center rounded-md bg-red-500 text-white text-[10px] font-bold leading-none"
              style="display:none">0</span>
          </button>
          <!-- Notification dropdown -->
          <div id="notification-panel"
            class="hidden fixed sm:absolute top-16 sm:top-10 left-3 right-3 sm:left-auto sm:right-0 max-w-sm sm:max-w-none sm:w-96 mx-auto sm:mx-0 bg-white rounded-xl border border-uber-border shadow-2xl z-50 overflow-hidden"
            style="display:none"></div>
        </div>

        <a href="#/perfil" class="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-white hover:opacity-90" aria-label="Ver perfil">
          <img src="${avatar}" alt="Avatar" class="w-6 h-6 rounded-md object-cover bg-uber-gray border border-white/30" />
          <span class="hidden sm:inline">${store.state.currentUser.name.split(' ')[0]}</span>
        </a>

        <button onclick="toggleRole()" title="Alternar Perfil para Teste" aria-label="Alternar perfil: ${role === 'DRIVER' ? 'Motorista' : role === 'ADMIN' ? 'Admin' : 'Passageiro'}"
          class="h-8 px-2 sm:px-3 flex items-center gap-1 sm:gap-1.5 text-xs font-semibold text-white bg-uber-charcoal hover:bg-uber-iron/30 rounded-lg transition-colors active:scale-95">
          ${icon('swap_horiz', { size: 'sm', className: 'text-uber-slate' })}
          <span class="header-role-label text-[11px] font-bold hidden xs:inline">${role === 'DRIVER' ? 'Motorista' : role === 'ADMIN' ? 'Admin' : 'Passageiro'}</span>
        </button>
      </div>
    </div>
  `;

  // Reaplica o estado do badge de não lidas após re-renderizar o header
  updateNotificationBadge();
}

function renderMobileNav() {
  const mobileNavRoot = document.getElementById('mobile-nav-root');
  if (!mobileNavRoot) return;

  const role = store.state.role;
  const currentPath = window.location.hash.slice(1) || '/';

  // Configuração das abas disponíveis de acordo com o papel do usuário
  const tabs = [
    {
      id: 'buscar',
      label: 'Buscar',
      iconName: 'search',
      href: '#/buscar',
      isActive: currentPath === '/' || currentPath === '/buscar' || currentPath.startsWith('/viagem/')
    }
  ];

  if (role === 'DRIVER') {
    tabs.push({
      id: 'publicar',
      label: 'Publicar',
      iconName: 'add_circle',
      href: '#/publicar',
      isActive: currentPath === '/publicar'
    });
  }

  if (role === 'ADMIN' || role === 'MANAGER') {
    tabs.push({
      id: 'admin',
      label: 'Painel',
      iconName: 'admin_panel_settings',
      href: '#/admin',
      isActive: currentPath === '/admin'
    });
  }

  tabs.push(
    {
      id: 'viagens',
      label: 'Viagens',
      iconName: 'directions_car',
      href: '#/minhas-viagens',
      isActive: currentPath === '/minhas-viagens'
    },
    {
      id: 'perfil',
      label: 'Perfil',
      iconName: 'account_circle',
      href: '#/perfil',
      isActive: currentPath === '/perfil' || currentPath.startsWith('/motorista/')
    }
  );

  mobileNavRoot.innerHTML = `
    <div class="mobile-bottom-bar w-full flex items-center justify-around px-2 bg-white border-t border-uber-border shadow-xs select-none">
      ${tabs.map(tab => {
        const isActive = tab.isActive;
        return `
          <a 
            href="${tab.href}" 
            onclick="if(typeof SoundEngine !== 'undefined') SoundEngine.play('info');"
            class="flex-1 h-full flex flex-col items-center justify-center transition-colors duration-150 ${isActive ? 'text-uber-black font-bold' : 'text-uber-iron hover:text-uber-black font-medium'}"
            aria-label="${tab.label}"
          >
            <div class="flex items-center justify-center transition-transform duration-150 active:scale-90">
              ${icon(tab.iconName, { 
                size: 'md', 
                fill: isActive, 
                className: isActive ? 'text-uber-black font-bold' : 'text-uber-iron hover:text-uber-black' 
              })}
            </div>
            <span class="text-[11px] leading-tight mt-0.5 tracking-tight ${isActive ? 'font-bold text-uber-black' : 'font-medium text-uber-iron'}">${tab.label}</span>
          </a>
        `;
      }).join('')}
    </div>
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
// 6. BASE DE DADOS DE MOTORISTAS & PERFIL PÚBLICO
// ==========================================

const DRIVERS_DATABASE = {
  'drv-01': {
    id: 'drv-01',
    name: 'Marcos Silva',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 4.95,
    totalTrips: 142,
    memberSince: 'Março de 2023',
    city: 'Fortaleza, CE',
    bio: 'Motorista com mais de 8 anos de experiência em viagens intermunicipais no Ceará. Carro sempre higienizado, direção defensiva e pontualidade.',
    vehicle: {
      brand: 'Toyota',
      model: 'Corolla 2.0 XEi',
      color: 'prata',
      plate: 'CE-FOR-2023',
      year: 2023,
      hasAC: true,
      hasUSB: true,
    },
    badges: [
      { name: 'Motorista Verificado', iconName: 'verified_user', desc: 'Identidade e CNH validadas' },
      { name: 'Super Pontual', iconName: 'schedule', desc: '99% de partidas no horário' },
      { name: 'Veículo Inspecionado', iconName: 'car_repair', desc: 'Revisões em dia na cooperativa' }
    ],
    reviews: [
      { passenger: 'Carlos Oliveira', rating: 5, date: 'Há 2 dias', comment: 'Excelente motorista! Viagem muito tranquila de Fortaleza até Juazeiro. Carro impecável e ar-condicionado funcionando perfeitamente.', tags: ['Pontualidade', 'Direção Segura'] },
      { passenger: 'Juliana Mendes', rating: 5, date: 'Há 1 semana', comment: 'Super educado e pontual. Parou certinho no ponto combinado e ajudou com as bagagens.', tags: ['Carro Limpo', 'Boa Comunicação'] },
      { passenger: 'Rodrigo Lima', rating: 5, date: 'Há 2 semanas', comment: 'Já viajei várias vezes com o Marcos. Sempre 10/10.', tags: ['Confortável', 'Respeitoso'] }
    ]
  },
  'drv-02': {
    id: 'drv-02',
    name: 'Fernanda Costa',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    rating: 4.92,
    totalTrips: 98,
    memberSince: 'Maio de 2023',
    city: 'Recife, PE',
    bio: 'Engenheira, viajo com frequência entre Recife e Caruaru. Carro muito espaçoso e confortável com ar duplo.',
    vehicle: {
      brand: 'Honda',
      model: 'Civic Touring 1.5 Turbo',
      color: 'preto',
      plate: 'PE-REC-9988',
      year: 2023,
      hasAC: true,
      hasUSB: true,
    },
    badges: [
      { name: 'Motorista Verificada', iconName: 'verified_user', desc: 'Identidade e CNH validadas' },
      { name: 'Viagem Confortável', iconName: 'airline_seat_recline_extra', desc: 'Espaço e ar duplo' }
    ],
    reviews: [
      { passenger: 'Mariana Souza', rating: 5, date: 'Há 3 dias', comment: 'Fernanda é nota mil! Carro muito limpo e conversa agradável.', tags: ['Direção Segura', 'Carro Limpo'] },
      { passenger: 'Lucas Silveira', rating: 5, date: 'Há 2 semanas', comment: 'Chegamos no horário exato em Caruaru.', tags: ['Pontualidade'] }
    ]
  },
  'drv-03': {
    id: 'drv-03',
    name: 'Rafael Guimarães',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    rating: 4.98,
    totalTrips: 210,
    memberSince: 'Janeiro de 2023',
    city: 'Salvador, BA',
    bio: 'Viagens frequentes entre Salvador e Feira de Santana. Segurança total, pontualidade e respeito.',
    vehicle: {
      brand: 'Jeep',
      model: 'Compass Limited',
      color: 'vermelho',
      plate: 'BA-SAL-1020',
      year: 2024,
      hasAC: true,
      hasUSB: true,
    },
    badges: [
      { name: 'Motorista Verificado', iconName: 'verified_user', desc: 'Identidade e CNH validadas' },
      { name: 'Top Avaliado', iconName: 'star', desc: 'Nota 4.98 em mais de 200 viagens' }
    ],
    reviews: [
      { passenger: 'Bruno Castro', rating: 5, date: 'Há 1 dia', comment: 'Melhor opção de carona em Salvador. Rafael é extremamente profissional.', tags: ['Pontualidade', 'Direção Segura', 'Confortável'] }
    ]
  }
};

function getDriverProfile(driverId) {
  if (DRIVERS_DATABASE[driverId]) return DRIVERS_DATABASE[driverId];
  const ride = store.state.rides.find(r => r.driverId === driverId);
  return {
    id: driverId,
    name: ride ? ride.driverName : 'Motorista Credenciado',
    avatar: ride ? ride.driverAvatar : DEFAULT_BLANK_AVATAR,
    rating: ride ? ride.driverRating : 4.9,
    totalTrips: ride ? ride.driverTripsCount : 45,
    memberSince: '2023',
    city: ride ? ride.originCity : 'Nordeste',
    bio: 'Motorista credenciado na Cooperativa de Viagens do Nordeste com histórico de viagens verificadas.',
    vehicle: ride ? ride.vehicle : { brand: 'Toyota', model: 'Corolla', plate: 'BRA-2E19', year: 2023, hasAC: true, hasUSB: true },
    badges: [
      { name: 'Motorista Verificado', iconName: 'verified_user', desc: 'Identidade e CNH validadas' }
    ],
    reviews: [
      { passenger: 'Passageiro Cooperativa', rating: 5, date: 'Recente', comment: 'Viagem muito pontual e segura!', tags: ['Pontualidade', 'Direção Segura'] }
    ]
  };
}

function renderDatalists() {
  return `
    <datalist id="nordeste-cities-list">
      ${NORDESTE_CITIES.map(c => `<option value="${c}"></option>`).join('')}
    </datalist>
  `;
}

// ==========================================
// 7. AUTOCOMPLETE ESTILO UBER (LUGARES DO NORDESTE)
// ==========================================

function handleLocationFocus(inputId, dropdownId, type) {
  handleLocationInput(inputId, dropdownId, type);
}

function handleLocationInput(inputId, dropdownId, type) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  if (!input || !dropdown) return;

  const query = (input.value || '').toLowerCase().trim();
  let matches = [];

  if (!query) {
    matches = NORDESTE_LOCATIONS.slice(0, 10);
  } else {
    matches = NORDESTE_LOCATIONS.filter(loc => 
      loc.city.toLowerCase().includes(query) || loc.spot.toLowerCase().includes(query)
    ).slice(0, 12);
  }

  if (matches.length === 0) {
    dropdown.innerHTML = `
      <div class="p-3.5 text-center text-xs text-uber-iron font-medium">
        Nenhum ponto ou cidade encontrado no Nordeste.
      </div>
    `;
    dropdown.classList.remove('hidden');
    return;
  }

  dropdown.innerHTML = matches.map((loc, idx) => {
    const fullLocationText = `${loc.spot} - ${loc.city}`;
    const safeDisplay = fullLocationText.replace(/'/g, "\\'");
    const safeCity = loc.city.replace(/'/g, "\\'");
    const safeSpot = loc.spot.replace(/'/g, "\\'");
    return `
      <div
        onmousedown="selectAutocompleteLocation('${inputId}', '${dropdownId}', '${safeDisplay}', '${safeCity}', '${safeSpot}')"
        class="flex items-center gap-3 p-3 hover:bg-uber-gray cursor-pointer transition-colors text-left group select-none"
      >
        <div class="w-8 h-8 rounded-full bg-uber-gray group-hover:bg-uber-border flex items-center justify-center text-uber-black shrink-0 transition-colors">
          ${icon('location_on', { size: 'sm', className: 'text-uber-black' })}
        </div>
        <div class="min-w-0 flex-1">
          <p class="font-bold text-xs sm:text-sm text-uber-black truncate group-hover:text-black">${loc.spot}</p>
          <p class="text-[11px] font-medium text-uber-iron truncate">${loc.city}</p>
        </div>
        <div class="text-uber-iron group-hover:text-uber-black shrink-0">
          ${icon('north_west', { size: 'sm' })}
        </div>
      </div>
    `;
  }).join('');

  dropdown.classList.remove('hidden');
}

function selectAutocompleteLocation(inputId, dropdownId, displayText, city, spot) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  if (input) {
    input.value = displayText;
    // Sincronizar com o store state para persistência rica
    if (inputId === 'search-origin') {
      store.state.searchParams.origin = displayText;
    } else if (inputId === 'search-dest') {
      store.state.searchParams.destination = displayText;
    }
    // Disparar evento de input/change para qualquer listener ativo
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }
  if (dropdown) {
    dropdown.classList.add('hidden');
  }
}

// Dropdown Dinâmico de Marcas/Modelos de Veículos (Brasil)
function handleVehicleSearchFocus() {
  handleVehicleSearchInput();
}

function handleVehicleSearchInput() {
  const input = document.getElementById('veh-brand-model-input');
  const dropdown = document.getElementById('veh-model-dropdown');
  if (!input || !dropdown) return;

  const query = (input.value || '').toLowerCase().trim();
  let matches = [];

  if (!query) {
    matches = BRAZIL_VEHICLES_DATABASE.slice(0, 15);
  } else {
    matches = BRAZIL_VEHICLES_DATABASE.filter(v =>
      v.brand.toLowerCase().includes(query) ||
      v.model.toLowerCase().includes(query) ||
      `${v.brand} ${v.model}`.toLowerCase().includes(query)
    ).slice(0, 15);
  }

  if (matches.length === 0) {
    dropdown.innerHTML = `
      <div class="p-3 text-center text-xs text-uber-iron font-medium">
        <span>Nenhum modelo padrão encontrado. Você pode continuar digitando o modelo personalizado acima.</span>
      </div>
    `;
    dropdown.classList.remove('hidden');
    return;
  }

  dropdown.innerHTML = matches.map(v => {
    const fullText = `${v.brand} ${v.model}`;
    const safeBrand = v.brand.replace(/'/g, "\\'");
    const safeModel = v.model.replace(/'/g, "\\'");
    return `
      <button
        type="button"
        onclick="selectVehicleModel('${safeBrand}', '${safeModel}')"
        class="w-full px-3.5 py-2.5 text-left flex items-center justify-between hover:bg-uber-gray transition-colors group cursor-pointer border-b border-gray-100 last:border-0"
      >
        <div class="flex items-center gap-2.5 min-w-0">
          <div class="text-uber-iron group-hover:text-uber-black transition-colors shrink-0">
            ${icon('directions_car', { size: 'sm' })}
          </div>
          <div class="truncate">
            <span class="text-xs font-bold text-uber-black block group-hover:text-black">${v.brand} <span class="font-semibold text-uber-charcoal">${v.model}</span></span>
          </div>
        </div>
        <span class="text-[10px] text-uber-iron uppercase tracking-wider font-semibold group-hover:text-uber-black">Selecionar</span>
      </button>
    `;
  }).join('');

  dropdown.classList.remove('hidden');
}

function selectVehicleModel(brand, model) {
  const input = document.getElementById('veh-brand-model-input');
  const brandInput = document.getElementById('veh-brand');
  const modelInput = document.getElementById('veh-model');
  const colorInput = document.getElementById('veh-form-color');
  const dropdown = document.getElementById('veh-model-dropdown');
  const previewImg = document.getElementById('veh-modal-preview-img');

  if (input) input.value = `${brand} ${model}`;
  if (brandInput) brandInput.value = brand;
  if (modelInput) modelInput.value = model;
  
  const currentColor = colorInput ? colorInput.value : 'branco';
  if (previewImg) previewImg.src = getVehicleImage(brand, model, currentColor);

  if (dropdown) dropdown.classList.add('hidden');
}

// ==========================================
// PALETA E DINÂMICA DE CORES DE VEÍCULOS
// ==========================================

const VEHICLE_COLORS = [
  { id: 'branco', name: 'Branco', hex: '#FFFFFF', stops: ['#CECBCB', '#FFFFFF'], border: 'border-slate-300', textClass: 'text-slate-800' },
  { id: 'prata', name: 'Prata', hex: '#CBD5E1', stops: ['#94A3B8', '#F1F5F9'], border: 'border-slate-400', textClass: 'text-slate-800' },
  { id: 'cinza', name: 'Cinza / Chumbo', hex: '#4B5563', stops: ['#374151', '#6B7280'], border: 'border-gray-600', textClass: 'text-white' },
  { id: 'preto', name: 'Preto', hex: '#18181B', stops: ['#18181B', '#474747'], border: 'border-black', textClass: 'text-white' },
  { id: 'vermelho', name: 'Vermelho', hex: '#DC2626', stops: ['#7F1D1D', '#EF4444'], border: 'border-red-600', textClass: 'text-white' },
  { id: 'azul', name: 'Azul', hex: '#2563EB', stops: ['#1E3A8A', '#60A5FA'], border: 'border-blue-600', textClass: 'text-white' },
  { id: 'vinho', name: 'Vinho / Bordô', hex: '#831843', stops: ['#500724', '#BE185D'], border: 'border-pink-900', textClass: 'text-white' },
  { id: 'verde', name: 'Verde', hex: '#059669', stops: ['#064E3B', '#34D399'], border: 'border-emerald-600', textClass: 'text-white' },
  { id: 'amarelo', name: 'Amarelo / Dourado', hex: '#EAB308', stops: ['#713F12', '#FACC15'], border: 'border-amber-500', textClass: 'text-slate-900' }
];

function normalizeVehicleColor(color) {
  if (!color) return 'branco';
  const c = String(color).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  if (c.includes('pret') || c.includes('black')) return 'preto';
  if (c.includes('prat') || c.includes('silver')) return 'prata';
  if (c.includes('cinz') || c.includes('chumb') || c.includes('gray') || c.includes('grey') || c.includes('grafit')) return 'cinza';
  if (c.includes('verm') || c.includes('red')) return 'vermelho';
  if (c.includes('azul') || c.includes('blue')) return 'azul';
  if (c.includes('vinh') || c.includes('bordo') || c.includes('wine')) return 'vinho';
  if (c.includes('verd') || c.includes('green')) return 'verde';
  if (c.includes('amar') || c.includes('dourad') || c.includes('yellow') || c.includes('gold')) return 'amarelo';
  return 'branco';
}

function getVehicleColorName(colorId) {
  const norm = normalizeVehicleColor(colorId);
  const found = VEHICLE_COLORS.find(c => c.id === norm);
  return found ? found.name : 'Branco';
}

function getVehicleColorObj(colorId) {
  const norm = normalizeVehicleColor(colorId);
  return VEHICLE_COLORS.find(c => c.id === norm) || VEHICLE_COLORS[0];
}

function colorizeVehicleSvg(svgStr, colorId) {
  const norm = normalizeVehicleColor(colorId);
  const colorDef = VEHICLE_COLORS.find(c => c.id === norm) || VEHICLE_COLORS[0];
  const [stop0, stop1] = colorDef.stops;
  return svgStr.replace(/<linearGradient id="paint[45]_linear[^>]*>([\s\S]*?)<\/linearGradient>/g, (match) => {
    return match.replace(/<stop\s+stop-color="[^"]*"\/>/g, `<stop stop-color="${stop0}"/>`)
                .replace(/<stop\s+offset="[^"]*"\s+stop-color="[^"]*"\/>/g, `<stop offset="1" stop-color="${stop1}"/>`);
  });
}

// Mapeamento e Resolução de Renders de Veículos (estilo Uber, 99, inDrive, Bolt)
function getVehicleCategory(brand = '', model = '') {
  const text = `${brand} ${model}`.toLowerCase();

  // PICKUPS / CAMIONETES
  if (/toro|hilux|s10|ranger|amarok|strada|saveiro|montana|rampage|oroch|maverick|triton|l200|frontier|titano|poer|1500|2500|3500/.test(text)) {
    return 'pickup';
  }

  // ELECTRIC / EV
  if (/dolphin|ora\s*03|icar|e-js1|seal|yuan|song\s*pro|song\s*plus|king|shark|tan|han|niro|ex30|c40/.test(text)) {
    return 'electric';
  }

  // MINIVAN / MULTIVAN
  if (/spin|doblo|zafira|meriva|carnival|partner|expert|jumpy|boxer|master|livina/.test(text)) {
    return 'minivan';
  }

  // LUXURY / EXECUTIVE
  if (/bmw|mercedes|audi|volvo|classe\s*c|série\s*3|320i|a4|a5|a3|c180|c200|c300|xc60|xc90|camry|accord|fusion|azera|passat/.test(text)) {
    return 'luxury';
  }

  // SUVS / CROSSOVERS
  if (/suv|tracker|creta|compass|renegade|commander|t-cross|nivus|taos|tiguan|kicks|duster|captur|kardian|pulse|fastback|hr-v|wr-v|cr-v|zr-v|corolla\s*cross|sw4|rav4|tiggo|haval|crossfox|aircross|cactus|ecosport|territory|bronco|2008|3008|jimny|vitara|asx|outlander|pajero|t40|t50|t60|sportage|seltos/.test(text)) {
    return 'suv';
  }

  // HATCHBACKS
  if (/hatch|onix(?!\s*plus)|hb20(?!\s*s)|polo|argo|gol|mobi|kwid|up!|uno|palio|fox|celta|corsa|clio|sandero|stepway|fit|yaris\s*hatch|etios\s*hatch|208|207|206|c3(?!\s*aircross)|ka(?!\s*sedan)|fiesta|i30|picanto|stonic|soul/.test(text)) {
    return 'hatch';
  }

  // SEDANS
  if (/sedan|corolla|civic|onix\s*plus|hb20s|cronos|virtus|voyage|siena|grand\s*siena|prisma|cobalt|cruze|sentra|versa|city|jetta|logan|fluence|ka\s*sedan|fiesta\s*sedan|focus\s*sedan|cerato|elantra|yaris\s*sedan|etios\s*sedan|arrizo/.test(text)) {
    return 'sedan';
  }

  return 'sedan';
}

function getVehicleImage(vehicleOrBrand, model = '', color = '') {
  let brand = '';
  let mod = '';
  let col = '';

  if (typeof vehicleOrBrand === 'object' && vehicleOrBrand !== null) {
    brand = vehicleOrBrand.brand || '';
    mod = vehicleOrBrand.model || '';
    col = vehicleOrBrand.color || color || '';
  } else {
    brand = vehicleOrBrand || '';
    mod = model || '';
    col = color || '';
  }

  const category = getVehicleCategory(brand, mod);
  const normColor = normalizeVehicleColor(col);

  if (typeof VEHICLE_SVG_TEMPLATES !== 'undefined' && VEHICLE_SVG_TEMPLATES && VEHICLE_SVG_TEMPLATES[category]) {
    const rawSvg = VEHICLE_SVG_TEMPLATES[category];
    const coloredSvg = colorizeVehicleSvg(rawSvg, normColor);
    return `data:image/svg+xml;utf8,${encodeURIComponent(coloredSvg)}`;
  }

  return `assets/vehicles/${category}.svg`;
}

// Resolução e Formatação de Preferências de Bagagem / Malas
function getLuggageInfo(vehOrRide) {
  let policy = '1_MEDIUM';
  if (typeof vehOrRide === 'string') {
    policy = vehOrRide;
  } else if (vehOrRide && typeof vehOrRide === 'object') {
    policy = vehOrRide.luggagePolicy || vehOrRide.vehicle?.luggagePolicy || (vehOrRide.acceptsLuggage === false ? 'NONE' : '1_MEDIUM');
  }

  switch (policy) {
    case 'NONE':
      return {
        key: 'NONE',
        label: 'Sem malas (apenas mochila de mão no colo)',
        shortLabel: 'Sem malas',
        badgeText: 'Sem malas',
        iconName: 'backpack',
        accepts: false,
        quantity: 0
      };
    case 'HAND':
      return {
        key: 'HAND',
        label: 'Bagagem de mão pequena (até 10kg)',
        shortLabel: 'Mala de mão',
        badgeText: 'Mala de mão',
        iconName: 'work',
        accepts: true,
        quantity: 1
      };
    case '1_MEDIUM':
      return {
        key: '1_MEDIUM',
        label: '1 mala média por passageiro (até 15kg)',
        shortLabel: '1 mala média',
        badgeText: '1 mala média',
        iconName: 'luggage',
        accepts: true,
        quantity: 1
      };
    case '1_LARGE':
      return {
        key: '1_LARGE',
        label: '1 mala grande por passageiro (até 23kg)',
        shortLabel: '1 mala grande',
        badgeText: '1 mala grande',
        iconName: 'luggage',
        accepts: true,
        quantity: 1
      };
    case '2_BAGS':
      return {
        key: '2_BAGS',
        label: 'Até 2 malas por passageiro',
        shortLabel: 'Até 2 malas',
        badgeText: 'Até 2 malas',
        iconName: 'luggage',
        accepts: true,
        quantity: 2
      };
    default:
      return {
        key: '1_MEDIUM',
        label: '1 mala média por passageiro',
        shortLabel: '1 mala média',
        badgeText: '1 mala média',
        iconName: 'luggage',
        accepts: true,
        quantity: 1
      };
  }
}

// Fechar autocompletes ao clicar fora
document.addEventListener('click', (e) => {
  if (!e.target.closest('#hero-search-form')) {
    const d1 = document.getElementById('autocomplete-origin-dropdown');
    const d2 = document.getElementById('autocomplete-dest-dropdown');
    if (d1) d1.classList.add('hidden');
    if (d2) d2.classList.add('hidden');
  }
  if (!e.target.closest('#veh-model-picker-container')) {
    const d3 = document.getElementById('veh-model-dropdown');
    if (d3) d3.classList.add('hidden');
  }
  if (!e.target.closest('.pub-autocomplete-container')) {
    document.querySelectorAll('.pub-autocomplete-dropdown').forEach(el => el.classList.add('hidden'));
  }
});

// ==========================================
// 7.1 AUTOCOMPLETE PARA PUBLICAÇÃO DE VIAGEM (CIDADES E PONTOS)
// ==========================================

function handlePublishCityFocus(inputId, dropdownId, role) {
  handlePublishCityInput(inputId, dropdownId, role);
}

function handlePublishCityInput(inputId, dropdownId, role) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  if (!input || !dropdown) return;

  const query = (input.value || '').toLowerCase().trim();
  let matches = [];

  if (!query) {
    matches = NORDESTE_CITIES.slice(0, 12);
  } else {
    matches = NORDESTE_CITIES.filter(city => 
      city.toLowerCase().includes(query)
    ).slice(0, 15);
  }

  if (matches.length === 0) {
    dropdown.innerHTML = `
      <div class="p-3.5 text-center text-xs text-uber-iron font-medium">
        Nenhuma cidade encontrada no Nordeste.
      </div>
    `;
    dropdown.classList.remove('hidden');
    return;
  }

  dropdown.innerHTML = matches.map(cityName => {
    const safeCity = cityName.replace(/'/g, "\\'");
    return `
      <div
        onmousedown="selectPublishCity('${inputId}', '${dropdownId}', '${safeCity}', '${role}')"
        class="flex items-center gap-3 p-3 hover:bg-uber-gray cursor-pointer transition-colors text-left group select-none"
      >
        <div class="w-8 h-8 rounded-lg bg-uber-gray group-hover:bg-uber-border flex items-center justify-center text-uber-black shrink-0 transition-colors">
          ${icon('location_city', { size: 'sm', className: 'text-uber-black' })}
        </div>
        <div class="min-w-0 flex-1">
          <p class="font-bold text-xs sm:text-sm text-uber-black truncate group-hover:text-black">${cityName}</p>
          <p class="text-[11px] font-medium text-uber-iron">Nordeste • Brasil</p>
        </div>
        <div class="text-uber-iron group-hover:text-uber-black shrink-0">
          ${icon('north_west', { size: 'sm' })}
        </div>
      </div>
    `;
  }).join('');

  dropdown.classList.remove('hidden');
}

function selectPublishCity(inputId, dropdownId, cityName, role) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  if (input) {
    input.value = cityName;
    if (role === 'origin') {
      publishWizardState.originCity = cityName;
      const defaultSpot = NORDESTE_LOCATIONS.find(l => l.city.toLowerCase() === cityName.toLowerCase());
      if (defaultSpot) {
        const spotInput = document.getElementById('pub-origin-spot');
        if (spotInput && (!spotInput.value || spotInput.value.includes('Shopping') || spotInput.value.includes('Centro') || spotInput.value.includes('Rodoviária'))) {
          spotInput.value = defaultSpot.spot;
          publishWizardState.originSpot = defaultSpot.spot;
        }
      }
    } else if (role === 'dest') {
      publishWizardState.destinationCity = cityName;
      const defaultSpot = NORDESTE_LOCATIONS.find(l => l.city.toLowerCase() === cityName.toLowerCase());
      if (defaultSpot) {
        const spotInput = document.getElementById('pub-dest-spot');
        if (spotInput && (!spotInput.value || spotInput.value.includes('Shopping') || spotInput.value.includes('Centro') || spotInput.value.includes('Rodoviária'))) {
          spotInput.value = defaultSpot.spot;
          publishWizardState.destinationSpot = defaultSpot.spot;
        }
      }
    }
    updatePublishRouteMetrics();
  }
  if (dropdown) dropdown.classList.add('hidden');
}

function handlePublishSpotFocus(inputId, dropdownId, role) {
  handlePublishSpotInput(inputId, dropdownId, role);
}

function handlePublishSpotInput(inputId, dropdownId, role) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  if (!input || !dropdown) return;

  const currentCity = (role === 'origin' ? (document.getElementById('pub-origin-city')?.value || publishWizardState.originCity) : (document.getElementById('pub-dest-city')?.value || publishWizardState.destinationCity) || '').toLowerCase().trim();
  const query = (input.value || '').toLowerCase().trim();

  let matches = [];

  // Filtrar primeiro por locais da cidade selecionada
  const cityLocations = NORDESTE_LOCATIONS.filter(l => currentCity && l.city.toLowerCase().includes(currentCity.split(',')[0].trim().toLowerCase()));

  if (cityLocations.length > 0) {
    if (!query) {
      matches = cityLocations;
    } else {
      matches = cityLocations.filter(l => l.spot.toLowerCase().includes(query) || l.city.toLowerCase().includes(query));
      if (matches.length === 0) {
        matches = NORDESTE_LOCATIONS.filter(l => l.spot.toLowerCase().includes(query) || l.city.toLowerCase().includes(query)).slice(0, 10);
      }
    }
  } else {
    if (!query) {
      matches = NORDESTE_LOCATIONS.slice(0, 10);
    } else {
      matches = NORDESTE_LOCATIONS.filter(l => l.spot.toLowerCase().includes(query) || l.city.toLowerCase().includes(query)).slice(0, 12);
    }
  }

  if (matches.length === 0) {
    dropdown.innerHTML = `
      <div class="p-3.5 text-center text-xs text-uber-iron font-medium">
        Ponto não listado. Você pode digitar livremente o local desejado.
      </div>
    `;
    dropdown.classList.remove('hidden');
    return;
  }

  dropdown.innerHTML = matches.map(loc => {
    const safeSpot = loc.spot.replace(/'/g, "\\'");
    const safeCity = loc.city.replace(/'/g, "\\'");
    return `
      <div
        onmousedown="selectPublishSpot('${inputId}', '${dropdownId}', '${safeSpot}', '${safeCity}', '${role}')"
        class="flex items-center gap-3 p-3 hover:bg-uber-gray cursor-pointer transition-colors text-left group select-none"
      >
        <div class="w-8 h-8 rounded-lg bg-uber-gray group-hover:bg-uber-border flex items-center justify-center text-uber-black shrink-0 transition-colors">
          ${icon('pin_drop', { size: 'sm', className: 'text-uber-black' })}
        </div>
        <div class="min-w-0 flex-1">
          <p class="font-bold text-xs sm:text-sm text-uber-black truncate group-hover:text-black">${loc.spot}</p>
          <p class="text-[11px] font-medium text-uber-iron truncate">${loc.city}</p>
        </div>
        <div class="text-uber-iron group-hover:text-uber-black shrink-0">
          ${icon('north_west', { size: 'sm' })}
        </div>
      </div>
    `;
  }).join('');

  dropdown.classList.remove('hidden');
}

function selectPublishSpot(inputId, dropdownId, spotName, cityName, role) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  if (input) {
    input.value = spotName;
    if (role === 'origin') {
      publishWizardState.originSpot = spotName;
      const cityInput = document.getElementById('pub-origin-city');
      if (cityInput && (!cityInput.value || !cityInput.value.trim())) {
        cityInput.value = cityName;
        publishWizardState.originCity = cityName;
        updatePublishRouteMetrics();
      }
    } else if (role === 'dest') {
      publishWizardState.destinationSpot = spotName;
      const cityInput = document.getElementById('pub-dest-city');
      if (cityInput && (!cityInput.value || !cityInput.value.trim())) {
        cityInput.value = cityName;
        publishWizardState.destinationCity = cityName;
        updatePublishRouteMetrics();
      }
    }
  }
  if (dropdown) dropdown.classList.add('hidden');
}

function swapPublishCities() {
  const origCityInput = document.getElementById('pub-origin-city');
  const origSpotInput = document.getElementById('pub-origin-spot');
  const destCityInput = document.getElementById('pub-dest-city');
  const destSpotInput = document.getElementById('pub-dest-spot');

  const oldOrigCity = origCityInput?.value || publishWizardState.originCity;
  const oldOrigSpot = origSpotInput?.value || publishWizardState.originSpot;
  const oldDestCity = destCityInput?.value || publishWizardState.destinationCity;
  const oldDestSpot = destSpotInput?.value || publishWizardState.destinationSpot;

  if (origCityInput) origCityInput.value = oldDestCity;
  if (origSpotInput) origSpotInput.value = oldDestSpot;
  if (destCityInput) destCityInput.value = oldOrigCity;
  if (destSpotInput) destSpotInput.value = oldOrigSpot;

  publishWizardState.originCity = oldDestCity;
  publishWizardState.originSpot = oldDestSpot;
  publishWizardState.destinationCity = oldOrigCity;
  publishWizardState.destinationSpot = oldOrigSpot;

  updatePublishRouteMetrics();
}

function renderHeroSearchBar(keepValues = false) {
  const { origin, destination, date, seats } = store.state.searchParams;
  const originVal = keepValues ? (origin || '') : '';
  const destVal = keepValues ? (destination || '') : '';
  const todayStr = new Date().toISOString().split('T')[0];

  return `
    <div class="w-full max-w-6xl xl:max-w-7xl mx-auto relative overflow-visible z-30">
      <form id="hero-search-form" onsubmit="handleSearchSubmit(event)" class="bg-white border border-uber-border shadow-2xl rounded-2xl p-3 sm:p-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 overflow-visible relative z-30">
        
        <!-- Origin Input with Uber-Style Autocomplete Dropdown -->
        <div class="flex-1 relative overflow-visible">
          <div class="flex items-center gap-3 px-3.5 h-12 bg-uber-gray rounded-xl border border-uber-border hover:border-uber-iron focus-within:border-uber-black focus-within:bg-white transition-all">
            <div class="w-2.5 h-2.5 rounded-full bg-uber-black shrink-0"></div>
            <div class="flex-1 text-left min-w-0">
              <input
                id="search-origin"
                type="text"
                autocomplete="off"
                value="${originVal}"
                placeholder="Cidade ou ponto de partida"
                class="w-full bg-transparent font-semibold text-uber-black focus:outline-none text-sm placeholder-uber-iron truncate"
                onfocus="handleLocationFocus('search-origin', 'autocomplete-origin-dropdown', 'origin')"
                oninput="handleLocationInput('search-origin', 'autocomplete-origin-dropdown', 'origin')"
                required
              />
            </div>
          </div>
          <div id="autocomplete-origin-dropdown" class="hidden absolute top-full left-0 right-0 mt-2 bg-white border border-uber-border rounded-xl shadow-2xl z-[100] max-h-72 overflow-y-auto divide-y divide-uber-gray"></div>
        </div>

        <!-- Swap Button -->
        <button type="button" onclick="swapSearchCities()" title="Inverter Cidades" class="w-9 h-9 self-center bg-uber-gray hover:bg-uber-border text-uber-black rounded-full flex items-center justify-center transition-all duration-150 active:scale-90 shrink-0 border border-uber-border">
          ${icon('swap_horiz', { size: 'sm' })}
        </button>

        <!-- Destination Input with Uber-Style Autocomplete Dropdown -->
        <div class="flex-1 relative overflow-visible">
          <div class="flex items-center gap-3 px-3.5 h-12 bg-uber-gray rounded-xl border border-uber-border hover:border-uber-iron focus-within:border-uber-black focus-within:bg-white transition-all">
            <div class="w-2.5 h-2.5 bg-uber-black shrink-0"></div>
            <div class="flex-1 text-left min-w-0">
              <input
                id="search-dest"
                type="text"
                autocomplete="off"
                value="${destVal}"
                placeholder="Cidade ou ponto de destino"
                class="w-full bg-transparent font-semibold text-uber-black focus:outline-none text-sm placeholder-uber-iron truncate"
                onfocus="handleLocationFocus('search-dest', 'autocomplete-dest-dropdown', 'dest')"
                oninput="handleLocationInput('search-dest', 'autocomplete-dest-dropdown', 'dest')"
                required
              />
            </div>
          </div>
          <div id="autocomplete-dest-dropdown" class="hidden absolute top-full left-0 right-0 mt-2 bg-white border border-uber-border rounded-xl shadow-2xl z-[100] max-h-72 overflow-y-auto divide-y divide-uber-gray"></div>
        </div>


        <!-- Date & Seats Row -->
        <div class="flex items-center gap-2 flex-initial w-full md:w-auto">
          <div class="flex-1 md:flex-initial flex items-center gap-2 px-3 h-12 bg-uber-gray rounded-xl border border-uber-border hover:border-uber-iron focus-within:border-uber-black focus-within:bg-white min-w-0 md:min-w-[155px] transition-all">
            ${icon('calendar_today', { size: 'sm', className: 'text-uber-iron shrink-0' })}
            <input
              id="search-date"
              type="date"
              min="${todayStr}"
              value="${date}"
              class="w-full max-w-full bg-transparent font-semibold text-uber-black focus:outline-none text-xs sm:text-sm cursor-pointer"
              required
            />
          </div>

          <div class="flex-1 md:flex-initial flex items-center gap-2 px-3 h-12 bg-uber-gray rounded-xl border border-uber-border hover:border-uber-iron focus-within:border-uber-black focus-within:bg-white min-w-0 md:min-w-[115px] transition-all">
            ${icon('group', { size: 'sm', className: 'text-uber-iron shrink-0' })}
            <select
              id="search-seats"
              class="w-full max-w-full bg-transparent font-bold text-uber-black focus:outline-none text-xs sm:text-sm cursor-pointer"
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
      class="p-4 sm:p-5 flex flex-col gap-4 text-left border border-uber-border hover:border-uber-black hover:bg-uber-gray/30 rounded-xl shadow-sm hover:shadow-md transition-all bg-white cursor-pointer select-none active:scale-[0.99]"
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
            <span class="text-sm sm:text-base font-bold text-uber-black w-12 shrink-0">${ride.estimatedArrivalTime || '—'}</span>
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

      <!-- Driver and Amenities Row (Clickable Driver Profile) -->
      <div class="flex items-center justify-between pt-3 border-t border-uber-border">
        <div
          onclick="event.stopPropagation(); window.location.hash = '#/motorista/${ride.driverId}';"
          title="Ver perfil completo do motorista"
          class="flex items-center gap-2.5 min-w-0 group hover:opacity-80 transition-opacity"
        >
          <img src="${ride.driverAvatar}" alt="${ride.driverName}" class="w-7 h-7 rounded-full object-cover border border-uber-border shrink-0 bg-uber-gray group-hover:scale-105 transition-transform" />
          <div class="flex items-center gap-1.5 truncate">
            <span class="font-semibold text-xs text-uber-black truncate group-hover:underline">${ride.driverName}</span>
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
          ${ride.vehicle.noSmoking ? `<span title="Cigarro não, por favor" class="flex items-center">${icon('smoke_free', { size: 'sm', className: 'text-uber-iron' })}</span>` : ''}
          ${ride.vehicle.noPets ? `<span title="Prefiro não viajar com animais" class="flex items-center">${icon('pets', { size: 'sm', className: 'text-uber-iron' })}</span>` : ''}
          <span title="${getLuggageInfo(ride).label}" class="flex items-center">${icon(getLuggageInfo(ride).iconName, { size: 'sm', className: 'text-uber-iron' })}</span>
          <div class="flex items-center gap-1.5 bg-uber-gray px-2.5 py-1 rounded-md border border-uber-border">
            <img src="${getVehicleImage(ride.vehicle)}" alt="${ride.vehicle.model}" class="w-8 h-5 object-contain shrink-0" />
            <span title="${ride.vehicle.model} • ${getVehicleColorName(ride.vehicle.color)}" class="text-xs text-uber-black font-semibold hidden sm:inline truncate max-w-[140px]">
              ${ride.vehicle.model} • <span class="text-uber-charcoal font-normal">${getVehicleColorName(ride.vehicle.color)}</span>
            </span>
          </div>
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
    store.state.searchParams.origin = originEl.value;
    store.state.searchParams.destination = destEl.value;
    store.saveState();
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
  store.state.searchParams.origin = '';
  store.state.searchParams.destination = '';
  store.saveState();

  return `
    <div class="flex flex-col gap-10 md:gap-14 pb-12 text-left animate-fade-in overflow-visible">
      
      <!-- Hero Section with Background Video & Tempered Glass (Blur) Overlay -->
      <section class="relative bg-uber-black text-white pt-12 pb-16 px-4 min-h-[380px] sm:min-h-[420px] flex items-center justify-center relative z-30 overflow-visible">
        
        <!-- Background Video with Loop & Mobile Autoplay (Isolated overflow-hidden wrapper) -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <video
            id="hero-bg-video"
            autoplay
            loop
            muted
            playsinline
            webkit-playsinline
            preload="auto"
            class="absolute inset-0 w-full h-full object-cover object-center scale-105"
          >
            <source src="assets/video/homevideo.mp4" type="video/mp4" />
          </video>

          <!-- Frosted Tempered Glass (Dark Glassmorphism) Overlay (Calibrated 45% Transparency) -->
          <div class="absolute inset-0 hero-glass-overlay z-10"></div>
        </div>

        <!-- Hero Content Layer -->
        <div class="relative z-20 max-w-6xl xl:max-w-7xl mx-auto text-center flex flex-col items-center gap-4 w-full overflow-visible">
          
          <h1 class="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight text-white drop-shadow-md">
            Viagens Compartilhadas pelo Nordeste
          </h1>

          <p class="text-white/90 text-sm sm:text-base max-w-2xl font-medium drop-shadow-md">
            Encontre motoristas verificados, garanta sua vaga com 50% no PIX e pague o restante na chegada.
          </p>

          <div class="w-full mt-4 relative z-30 overflow-visible">
            ${renderHeroSearchBar(false)}
          </div>
        </div>
      </section>

      <!-- Popular Routes with Location Photos (Nordeste) -->
      <section class="max-w-6xl xl:max-w-7xl mx-auto px-4 w-full relative z-10">
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
        <section class="max-w-6xl xl:max-w-7xl mx-auto px-4 w-full">
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

  const rawOrigin = (searchParams.origin || '').toLowerCase().trim();
  const rawDest = (searchParams.destination || '').toLowerCase().trim();

  // Dividir termos por traço, vírgula ou parênteses para busca flexível por cidade ou ponto
  const originTerms = rawOrigin.split(/[-–,()]+/).map(t => t.trim()).filter(Boolean);
  const destTerms = rawDest.split(/[-–,()]+/).map(t => t.trim()).filter(Boolean);

  const filtered = rides.filter(ride => {
    const rideOriginCity = ride.originCity.toLowerCase();
    const rideOriginSpot = ride.originSpot.toLowerCase();
    const rideDestCity = ride.destinationCity.toLowerCase();
    const rideDestSpot = ride.destinationSpot.toLowerCase();

    const matchOrigin = originTerms.length === 0 || originTerms.some(term => 
      rideOriginCity.includes(term) || rideOriginSpot.includes(term)
    );

    const matchDest = destTerms.length === 0 || destTerms.some(term => 
      rideDestCity.includes(term) || rideDestSpot.includes(term)
    );

    const matchSeats = ride.availableSeats >= (searchParams.seats || 1);
    const matchAC = !searchFilterAC || ride.vehicle.hasAC;

    return matchOrigin && matchDest && matchSeats && matchAC;
  }).sort((a, b) => {
    if (searchSortBy === 'CHEAPEST') return a.pricePerSeat - b.pricePerSeat;
    return a.departureTime.localeCompare(b.departureTime);
  });


  return `
    <div class="max-w-6xl xl:max-w-7xl mx-auto px-4 py-6 text-left animate-fade-in overflow-visible">
      <div class="mb-6 relative z-30 overflow-visible">
        ${renderHeroSearchBar(true)}
      </div>


      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center justify-between gap-2.5 bg-white p-3 rounded-xl border border-uber-border shadow-xs mb-5 h-auto sm:h-14">
        <div class="flex items-center gap-2 overflow-x-auto py-1">
          <button
            type="button"
            onclick="toggleFilterAC()"
            class="h-9 px-3.5 flex items-center gap-2 text-xs font-semibold rounded-lg border transition-all shrink-0 active:scale-95 ${searchFilterAC ? 'bg-uber-black text-white border-uber-black' : 'bg-white text-uber-black border-uber-border hover:bg-uber-gray'}"
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
                  <span class="text-base font-bold text-uber-black">${ride.estimatedArrivalTime || '—'}</span>
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

        <!-- Driver Card (Clickable to Driver Profile) -->
        <div onclick="window.location.hash = '#/motorista/${ride.driverId}'" class="p-4 sm:p-5 border border-uber-border bg-white rounded-xl cursor-pointer hover:border-uber-black hover:bg-uber-gray/20 transition-all group shadow-xs">
          <div class="flex items-center justify-between pb-3 border-b border-uber-border h-12">
            <div class="flex items-center gap-3">
              <img src="${ride.driverAvatar}" alt="${ride.driverName}" class="w-10 h-10 rounded-full object-cover border border-uber-border bg-uber-gray group-hover:scale-105 transition-transform" />
              <div>
                <div class="flex items-center gap-1.5">
                  <span class="text-sm font-bold text-uber-black block leading-tight group-hover:underline">${ride.driverName}</span>
                  ${icon('verified', { size: 'sm', className: 'text-emerald-600' })}
                </div>
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
              <span class="text-xs font-semibold text-uber-black bg-uber-gray px-2.5 py-1 rounded-lg border border-uber-border group-hover:bg-black group-hover:text-white transition-colors flex items-center gap-1">
                <span>Ver Perfil</span>
                ${icon('chevron_right', { size: 'sm' })}
              </span>
            </div>
          </div>
        </div>

        <!-- Vehicle Showcase Card (Uber/99 Style) -->
        <div class="p-4 sm:p-5 border border-uber-border bg-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div class="flex items-center gap-4 w-full sm:w-auto">
            <div class="w-28 h-20 sm:w-32 sm:h-22 flex items-center justify-center shrink-0">
              <img src="${getVehicleImage(ride.vehicle)}" alt="${ride.vehicle.brand} ${ride.vehicle.model}" class="w-full h-full object-contain drop-shadow-sm" />
            </div>
            <div>
              <span class="text-[10px] font-bold text-uber-iron uppercase tracking-wider block">Veículo Confirmado</span>
              <h4 class="text-sm sm:text-base font-bold text-uber-black">${ride.vehicle.brand} ${ride.vehicle.model}</h4>
              <div class="flex items-center gap-2 mt-1 text-xs text-uber-charcoal flex-wrap">
                <span class="font-mono font-bold bg-uber-gray px-1.5 py-0.5 rounded border border-uber-border text-[11px]">${ride.vehicle.plate}</span>
                <span class="text-uber-border">•</span>
                <span class="inline-flex items-center gap-1 font-medium">
                  <span class="w-2.5 h-2.5 rounded-xs inline-block border ${getVehicleColorObj(ride.vehicle.color).border}" style="background-color: ${getVehicleColorObj(ride.vehicle.color).hex}"></span>
                  <span>Cor ${getVehicleColorName(ride.vehicle.color)}</span>
                </span>
                <span class="text-uber-border">•</span>
                <span>Ano ${ride.vehicle.year}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 text-xs font-semibold text-uber-charcoal w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-uber-border flex-wrap">
            ${ride.vehicle.hasAC ? `<span class="inline-flex items-center gap-1 bg-uber-gray px-2.5 py-1 rounded-md text-[11px] border border-uber-border">${icon('ac_unit', { size: 'sm' })} Ar-condicionado</span>` : ''}
            ${ride.vehicle.hasUSB ? `<span class="inline-flex items-center gap-1 bg-uber-gray px-2.5 py-1 rounded-md text-[11px] border border-uber-border">${icon('usb', { size: 'sm' })} USB</span>` : ''}
            ${ride.vehicle.noSmoking ? `<span class="inline-flex items-center gap-1 bg-uber-gray px-2.5 py-1 rounded-md text-[11px] border border-uber-border">${icon('smoke_free', { size: 'sm' })} Cigarro não</span>` : ''}
            ${ride.vehicle.noPets ? `<span class="inline-flex items-center gap-1 bg-uber-gray px-2.5 py-1 rounded-md text-[11px] border border-uber-border">${icon('pets', { size: 'sm' })} Sem animais</span>` : ''}
            <span class="inline-flex items-center gap-1 bg-uber-gray px-2.5 py-1 rounded-md text-[11px] border border-uber-border">${icon(getLuggageInfo(ride).iconName, { size: 'sm' })} ${getLuggageInfo(ride).label}</span>
          </div>
        </div>

        <!-- Booking Section (Passageiro vs Motorista) -->
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
                class="w-full h-12 bg-black text-white hover:bg-neutral-900 rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer"
              >
                ${icon('payments', { size: 'md' })}
                <span>Reservar com PIX (50%)</span>
              </button>
            </div>
          </div>
        ` : `
          <!-- Painel Informativo para o Modo Motorista -->
          <div class="p-4 sm:p-5 border border-uber-border bg-uber-gray rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 bg-white border border-uber-border rounded-lg flex items-center justify-center text-uber-black shrink-0 mt-0.5 shadow-2xs">
                ${icon('visibility', { size: 'sm' })}
              </div>
              <div>
                <h4 class="font-bold text-xs sm:text-sm text-uber-black">Modo Motorista (Apenas Consulta)</h4>
                <p class="text-xs text-uber-iron mt-0.5 leading-relaxed">Você pode consultar rotas e detalhes de viagens publicadas, mas não pode reservar vagas como motorista. Para reservar um lugar, mude para o perfil de Passageiro.</p>
              </div>
            </div>
            <button
              type="button"
              onclick="store.setRole('PASSENGER')"
              class="px-4 py-2.5 bg-black hover:bg-neutral-900 text-white font-bold rounded-lg text-xs shrink-0 active:scale-95 transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              ${icon('person', { size: 'xs' })}
              <span>Mudar para Passageiro</span>
            </button>
          </div>
        `}

      </div>

      <!-- Mobile Sticky Footer (Apenas Passageiro) -->
      ${!isDriverMode ? `
        <div class="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-uber-border p-3 shadow-lg flex items-center justify-between gap-3">
          <div class="text-left">
            <span class="text-[11px] font-semibold text-uber-iron block leading-none">Sinal 50%</span>
            <span class="text-xl font-extrabold text-uber-black">R$ ${signalAmount.toFixed(2).replace('.', ',')}</span>
          </div>
          <button
            type="button"
            onclick="handleStartBooking('${ride.id}')"
            class="flex-1 h-11 bg-black text-white rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
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
  if (store.state.role === 'DRIVER') {
    showToast('Motoristas não podem reservar viagens. Mude para o perfil de Passageiro.', 'warning');
    return;
  }
  const booking = store.bookRide(rideId, selectedSeatsDetail);
  if (booking) {
    openPixModal(booking);
  }
}

// Estado Administrativo de Filtros de Viagens da Plataforma
let adminTripsMonthFilter = new Date().toISOString().slice(0, 7); // Padrão: Mês atual 'YYYY-MM'
let adminTripsStatusFilter = 'ALL'; // 'ALL' | 'WITH_BOOKINGS' | 'PAID' | 'CANCELLED'
let adminTripsSearchQuery = '';

function formatMonthName(monthStr) {
  if (!monthStr || monthStr === 'ALL') return 'Todos os Meses';
  const [year, month] = monthStr.split('-');
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const mIndex = parseInt(month, 10) - 1;
  return `${months[mIndex] || month} de ${year}`;
}

function getAvailableMonths(rides = []) {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthSet = new Set();
  monthSet.add(currentMonth);

  const now = new Date();
  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const nextDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  monthSet.add(prevDate.toISOString().slice(0, 7));
  monthSet.add(nextDate.toISOString().slice(0, 7));

  rides.forEach(r => {
    if (r.departureDate) {
      monthSet.add(r.departureDate.slice(0, 7));
    }
  });

  return Array.from(monthSet).sort().reverse();
}

function normalizeSearchTerm(str = '') {
  return (str || '').toLowerCase().replace(/[.\-\s()/]/g, '');
}

function matchCpfOrText(targetStr = '', query = '') {
  if (!query) return true;
  const rawTarget = (targetStr || '').toLowerCase();
  const rawQuery = (query || '').toLowerCase().trim();
  if (rawTarget.includes(rawQuery)) return true;

  const normTarget = normalizeSearchTerm(targetStr);
  const normQuery = normalizeSearchTerm(query);
  return normTarget.length >= 3 && normQuery.length >= 3 && normTarget.includes(normQuery);
}

let adminTripsViewMode = 'ALL'; // 'ALL' | 'DRIVERS' | 'PASSENGERS'
let expandedDriverHistories = new Set();
let expandedPassengerHistories = new Set();

function toggleAdminDriverAccordion(driverKey) {
  if (expandedDriverHistories.has(driverKey)) {
    expandedDriverHistories.delete(driverKey);
  } else {
    expandedDriverHistories.add(driverKey);
  }
  updateAdminTripsLiveView();
}

function toggleAdminPassengerAccordion(passengerKey) {
  if (expandedPassengerHistories.has(passengerKey)) {
    expandedPassengerHistories.delete(passengerKey);
  } else {
    expandedPassengerHistories.add(passengerKey);
  }
  updateAdminTripsLiveView();
}

function switchAdminTripsToDriver(driverCpfOrName) {
  adminTripsViewMode = 'DRIVERS';
  adminTripsSearchQuery = driverCpfOrName;
  renderApp();
}

function switchAdminTripsToPassenger(passengerCpfOrName) {
  adminTripsViewMode = 'PASSENGERS';
  adminTripsSearchQuery = passengerCpfOrName;
  renderApp();
}

function getAdminFilteredRides(rides = [], bookings = [], monthFilter = 'ALL', statusFilter = 'ALL', searchQuery = '') {
  return rides.filter(ride => {
    // 1. Filtro Mensal
    if (monthFilter !== 'ALL') {
      const rideMonth = ride.departureDate ? ride.departureDate.slice(0, 7) : '';
      if (rideMonth !== monthFilter) return false;
    }

    // 2. Filtro de Status
    const rideBookings = bookings.filter(b => b.rideId === ride.id);
    if (statusFilter === 'WITH_BOOKINGS' && rideBookings.length === 0) {
      return false;
    }
    if (statusFilter === 'PAID') {
      const hasPaid = rideBookings.some(b => b.status === 'FULLY_PAID' || b.status === 'SIGNAL_CONFIRMED');
      if (!hasPaid) return false;
    }
    if (statusFilter === 'CANCELLED') {
      const hasCancelled = rideBookings.some(b => b.status === 'CANCELLED' || b.status === 'REJECTED_BY_DRIVER');
      if (!hasCancelled) return false;
    }

    // 3. Busca Textual e por CPF Rápida
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchRoute = `${ride.originCity} ${ride.destinationCity} ${ride.originSpot || ''} ${ride.destinationSpot || ''}`.toLowerCase().includes(q);
      const matchDriver = `${ride.driverName} ${ride.vehicle?.model || ''} ${ride.vehicle?.plate || ''}`.toLowerCase().includes(q);
      const matchDriverCpf = matchCpfOrText(ride.driverCpf, q);
      const matchDriverPhone = matchCpfOrText(ride.driverPhone, q);
      const matchPassenger = rideBookings.some(b => 
        `${b.passengerName} ${b.passengerPhone || ''} ${b.id}`.toLowerCase().includes(q) ||
        matchCpfOrText(b.passengerCpf, q) ||
        matchCpfOrText(b.passengerPhone, q)
      );
      if (!matchRoute && !matchDriver && !matchDriverCpf && !matchDriverPhone && !matchPassenger) return false;
    }

    return true;
  });
}

function renderAdminTripsKpisHtml(filteredRides = [], bookings = []) {
  let totalMonthPassengers = 0;
  let totalMonthVolume = 0;
  let totalMonthCustody = 0;

  filteredRides.forEach(ride => {
    const rBookings = bookings.filter(b => b.rideId === ride.id && b.status !== 'CANCELLED' && b.status !== 'REJECTED_BY_DRIVER');
    rBookings.forEach(b => {
      totalMonthPassengers += b.seatsBooked || 1;
      totalMonthVolume += b.totalAmount || 0;
      if (b.status === 'SIGNAL_CONFIRMED') {
        totalMonthCustody += b.amountPaidSignal || 0;
      }
    });
  });

  return `
    <div class="p-3.5 bg-white border border-uber-border rounded-xl shadow-xs hover:shadow-md transition-shadow">
      <span class="text-[10px] font-bold text-uber-iron uppercase tracking-wider block">Viagens no Mês</span>
      <div class="flex items-center gap-1.5 mt-1">
        ${icon('directions_car', { size: 'sm', className: 'text-uber-black' })}
        <span class="text-xl font-extrabold text-uber-black">${filteredRides.length}</span>
      </div>
    </div>

    <div class="p-3.5 bg-white border border-uber-border rounded-xl shadow-xs hover:shadow-md transition-shadow">
      <span class="text-[10px] font-bold text-uber-iron uppercase tracking-wider block">Passageiros no Mês</span>
      <div class="flex items-center gap-1.5 mt-1">
        ${icon('group', { size: 'sm', className: 'text-uber-black' })}
        <span class="text-xl font-extrabold text-uber-black">${totalMonthPassengers}</span>
      </div>
    </div>

    <div class="p-3.5 bg-white border border-uber-border rounded-xl shadow-xs hover:shadow-md transition-shadow">
      <span class="text-[10px] font-bold text-uber-iron uppercase tracking-wider block">Volume Transacionado</span>
      <div class="flex items-center gap-1 mt-1">
        <span class="text-xs font-bold text-uber-iron">R$</span>
        <span class="text-xl font-extrabold text-uber-black">${totalMonthVolume.toFixed(2).replace('.', ',')}</span>
      </div>
    </div>

    <div class="p-3.5 bg-white border border-uber-border rounded-xl shadow-xs hover:shadow-md transition-shadow">
      <span class="text-[10px] font-bold text-uber-iron uppercase tracking-wider block">Sinais em Custódia</span>
      <div class="flex items-center gap-1 mt-1">
        <span class="text-xs font-bold text-emerald-700">R$</span>
        <span class="text-xl font-extrabold text-emerald-800">${totalMonthCustody.toFixed(2).replace('.', ',')}</span>
      </div>
    </div>
  `;
}

function renderAdminTripsListHtml(filteredRides = [], bookings = []) {
  if (filteredRides.length === 0) {
    return `
      <div class="bg-white border border-uber-border rounded-xl p-8 sm:p-12 text-center space-y-2 shadow-xs">
        <div class="w-12 h-12 bg-uber-gray text-uber-iron rounded-xl flex items-center justify-center mx-auto mb-2">
          ${icon('search_off', { size: 'md' })}
        </div>
        <h3 class="text-base font-bold text-uber-black">Nenhuma viagem encontrada</h3>
        <p class="text-xs text-uber-iron max-w-sm mx-auto font-normal">
          Não foram encontradas viagens para o mês de <strong>${formatMonthName(adminTripsMonthFilter)}</strong> com os filtros aplicados. Tente buscar pelo CPF, nome ou selecionar outro mês.
        </p>
        <button
          type="button"
          onclick="adminTripsMonthFilter = 'ALL'; adminTripsStatusFilter = 'ALL'; clearAdminTripsSearch(); renderApp();"
          class="mt-2 px-4 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-neutral-900 transition-transform active:scale-95 cursor-pointer shadow-xs"
        >
          Exibir Todas as Viagens da Plataforma
        </button>
      </div>
    `;
  }

  return filteredRides.map(ride => {
    const rideBookings = bookings.filter(b => b.rideId === ride.id);
    const activeBookings = rideBookings.filter(b => b.status !== 'CANCELLED' && b.status !== 'REJECTED_BY_DRIVER');
    const occupiedSeats = activeBookings.reduce((sum, b) => sum + (b.seatsBooked || 1), 0);
    const colorObj = getVehicleColorObj(ride.vehicle.color);
    const luggage = getLuggageInfo(ride);

    return `
      <div class="border border-uber-border bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        
        <!-- Topo do Card: Trajeto, Horário, Vagas e Tarifa -->
        <div class="p-4 bg-neutral-50/70 border-b border-uber-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-mono font-semibold text-uber-iron bg-white border border-uber-border px-1.5 py-0.5 rounded text-[10px]">${ride.id}</span>
              <h3 class="font-extrabold text-sm sm:text-base text-uber-black">${ride.originCity} ➔ ${ride.destinationCity}</h3>
            </div>
            <div class="flex items-center gap-2 text-uber-iron flex-wrap">
              <span class="flex items-center gap-1 font-semibold text-uber-black">
                ${icon('calendar_today', { size: 'xs' })}
                ${ride.departureDate} às ${ride.departureTime}
              </span>
              <span>•</span>
              <span>Duração: ~${ride.estimatedDuration || '2h 00m'}</span>
              <span>•</span>
              <span class="text-uber-charcoal truncate">Embarque: ${ride.originSpot || 'Centro'}</span>
            </div>
          </div>

          <div class="flex items-center gap-3 shrink-0">
            <div class="text-left sm:text-right">
              <span class="font-extrabold text-sm sm:text-base text-uber-black block">R$ ${ride.pricePerSeat.toFixed(2).replace('.', ',')} <span class="text-[10px] font-normal text-uber-iron">/ lugar</span></span>
              <span class="text-[11px] font-bold text-uber-charcoal">${occupiedSeats}/${ride.totalSeats} lugares ocupados (${ride.availableSeats} livres)</span>
            </div>
          </div>
        </div>

        <!-- Bloco do Motorista e Veículo -->
        <div class="p-4 border-b border-uber-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs bg-white">
          <div class="flex items-center gap-3.5">
            <div class="w-16 h-12 flex items-center justify-center shrink-0">
              <img src="${getVehicleImage(ride.vehicle)}" alt="${ride.vehicle.model}" class="w-full h-full object-contain drop-shadow-2xs" />
            </div>
            <div>
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="font-bold text-sm text-uber-black">${ride.driverName}</span>
                <span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  ${icon('verified', { size: 'xs' })} Motorista
                </span>
                <span class="font-mono text-[11px] text-uber-iron bg-uber-gray border border-uber-border px-1.5 py-0.2 rounded" title="CPF do Motorista">
                  CPF: ${ride.driverCpf || '341.892.510-44'}
                </span>
                <span class="flex items-center gap-0.5 font-bold text-uber-black ml-0.5">
                  ${icon('star', { size: 'xs', fill: true, className: 'star-gold' })}
                  ${ride.driverRating.toFixed(1)}
                </span>
              </div>
              <div class="flex items-center gap-1.5 text-[11px] text-uber-iron mt-0.5 flex-wrap">
                <span class="font-semibold text-uber-black">${ride.vehicle.brand} ${ride.vehicle.model}</span>
                <span>•</span>
                <span class="font-mono font-bold">${ride.vehicle.plate}</span>
                <span>•</span>
                <span class="inline-flex items-center gap-1">
                  <span class="w-2 h-2 rounded-xs border ${colorObj.border}" style="background-color: ${colorObj.hex}"></span>
                  <span>${colorObj.name}</span>
                </span>
                <span>•</span>
                <span title="${luggage.label}" class="inline-flex items-center gap-0.5 font-semibold text-uber-charcoal">
                  ${icon(luggage.iconName, { size: 'xs' })} ${luggage.shortLabel}
                </span>
              </div>
            </div>
          </div>

          <!-- Botões de Suporte e Histórico do Motorista -->
          <div class="flex items-center gap-2 self-start sm:self-center shrink-0">
            <button
              type="button"
              onclick="switchAdminTripsToDriver('${ride.driverCpf || ride.driverName}')"
              class="px-2.5 py-1.5 bg-uber-gray hover:bg-neutral-200 text-uber-black font-semibold rounded-lg transition-colors flex items-center gap-1 text-xs cursor-pointer"
              title="Ver todas as viagens publicadas por este motorista"
            >
              ${icon('person_search', { size: 'xs' })}
              <span class="hidden sm:inline">Histórico</span>
            </button>
            <button
              type="button"
              onclick="openAdminContactSupportModal('${ride.driverName}', '${ride.driverPhone || '(85) 98765-4321'}', 'Motorista', '${ride.id}')"
              class="px-3 py-1.5 bg-black hover:bg-neutral-900 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 text-xs cursor-pointer active:scale-95 shadow-2xs"
            >
              ${icon('support_agent', { size: 'sm' })}
              <span>Suporte</span>
            </button>
            <a
              href="#/viagem/${ride.id}"
              class="p-1.5 text-uber-iron hover:text-uber-black hover:bg-uber-gray rounded-lg transition-colors"
              title="Ver detalhes públicos da viagem"
            >
              ${icon('visibility', { size: 'sm' })}
            </a>
          </div>
        </div>

        <!-- Lista de Passageiros e Condições Financeiras -->
        <div class="p-4 bg-neutral-50/40 space-y-3">
          <div class="flex items-center justify-between text-xs pb-1">
            <span class="font-bold text-uber-black uppercase tracking-wider text-[11px] flex items-center gap-1">
              ${icon('group', { size: 'sm', className: 'text-uber-black' })}
              Passageiros e Condição de Pagamento (${rideBookings.length} ${rideBookings.length === 1 ? 'reserva' : 'reservas'}):
            </span>
          </div>

          ${rideBookings.length > 0 ? `
            <div class="space-y-2.5">
              ${rideBookings.map(bk => {
                const isSignalPaid = bk.status === 'SIGNAL_CONFIRMED';
                const isFullyPaid = bk.status === 'FULLY_PAID';
                const isAwaiting = bk.status === 'AWAITING_DRIVER';
                const isCancelled = bk.status === 'CANCELLED';
                const isRejected = bk.status === 'REJECTED_BY_DRIVER';

                return `
                  <div class="p-3 bg-white border border-uber-border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs">
                    
                    <!-- Perfil do Passageiro com CPF -->
                    <div class="flex items-center gap-2.5 min-w-0">
                      <img src="${bk.passengerAvatar || DEFAULT_BLANK_AVATAR}" class="w-8 h-8 rounded-full object-cover bg-uber-gray border border-uber-border shrink-0" />
                      <div class="min-w-0">
                        <div class="flex items-center gap-1.5 flex-wrap">
                          <span class="font-bold text-uber-black text-xs sm:text-sm">${bk.passengerName}</span>
                          <span class="font-mono text-[10px] text-uber-iron bg-uber-gray border border-uber-border px-1.5 py-0.2 rounded" title="CPF do Passageiro">
                            CPF: ${bk.passengerCpf || '123.456.789-00'}
                          </span>
                          <span class="font-mono text-uber-iron text-[10px]">(${bk.id})</span>
                          <span class="text-[10px] font-bold text-uber-charcoal bg-uber-gray border border-uber-border px-1.5 py-0.2 rounded">
                            ${bk.seatsBooked} ${bk.seatsBooked === 1 ? 'lugar' : 'lugares'}
                          </span>
                        </div>
                        <p class="text-uber-iron font-normal text-[11px] mt-0.5">
                          Tel: ${bk.passengerPhone || '(85) 98765-4321'}
                        </p>
                      </div>
                    </div>

                    <!-- Valores e Status Financeiro -->
                    <div class="flex flex-col sm:items-end gap-1 shrink-0">
                      <div class="flex items-center gap-2">
                        ${isSignalPaid ? `
                          <span class="inline-flex items-center gap-1 text-[11px] font-bold text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                            ${icon('account_balance_wallet', { size: 'xs', className: 'text-blue-700' })}
                            <span>Sinal PIX Pago (Custódia)</span>
                          </span>
                        ` : isFullyPaid ? `
                          <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                            ${icon('check_circle', { size: 'xs', className: 'text-emerald-700' })}
                            <span>Repasse Concluído</span>
                          </span>
                        ` : isAwaiting ? `
                          <span class="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                            ${icon('hourglass_top', { size: 'xs', className: 'text-amber-700' })}
                            <span>Aguardando Aceite</span>
                          </span>
                        ` : isCancelled ? `
                          <span class="inline-flex items-center gap-1 text-[11px] font-bold text-red-900 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                            ${icon('cancel', { size: 'xs', className: 'text-red-700' })}
                            <span>Cancelada (Estorno PIX)</span>
                          </span>
                        ` : isRejected ? `
                          <span class="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-800 bg-neutral-100 border border-neutral-300 px-2 py-0.5 rounded-md">
                            ${icon('cancel', { size: 'xs' })}
                            <span>Recusada (Estorno 100%)</span>
                          </span>
                        ` : ''}
                      </div>

                      <div class="text-[11px] text-uber-charcoal">
                        <span>Sinal: <strong>R$ ${bk.amountPaidSignal.toFixed(2).replace('.', ',')}</strong></span>
                        <span class="text-uber-border mx-1">•</span>
                        <span>Total: <strong>R$ ${bk.totalAmount.toFixed(2).replace('.', ',')}</strong></span>
                      </div>
                    </div>

                    <!-- Ações Administrativas de Suporte por Reserva -->
                    <div class="flex items-center gap-1.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-uber-border shrink-0 flex-wrap justify-end">
                      <button
                        type="button"
                        onclick="switchAdminTripsToPassenger('${bk.passengerCpf || bk.passengerName}')"
                        class="px-2.5 py-1.5 bg-uber-gray hover:bg-neutral-200 text-uber-black font-semibold rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        title="Ver todas as viagens reservadas por este passageiro"
                      >
                        ${icon('person_search', { size: 'xs' })}
                        <span>Histórico</span>
                      </button>

                      ${isSignalPaid ? `
                        <button
                          type="button"
                          onclick="handleReleaseCustodyAdmin('${bk.id}', ${bk.amountPaidSignal})"
                          class="px-2.5 py-1.5 bg-black hover:bg-neutral-900 text-white font-bold rounded-lg text-xs flex items-center gap-1 transition-transform active:scale-95 shadow-2xs cursor-pointer"
                          title="Liberar repasse de sinal para a chave PIX do motorista"
                        >
                          ${icon('payments', { size: 'sm' })}
                          <span>Liberar PIX</span>
                        </button>
                      ` : ''}

                      <button
                        type="button"
                        onclick="openReceiptModalById('${bk.id}')"
                        class="px-2.5 py-1.5 bg-uber-gray hover:bg-neutral-200 text-uber-black font-semibold rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        title="Ver comprovante da transação"
                      >
                        ${icon('receipt_long', { size: 'sm' })}
                        <span>Recibo</span>
                      </button>

                      <button
                        type="button"
                        onclick="openAdminContactSupportModal('${bk.passengerName}', '${bk.passengerPhone || '(85) 98765-4321'}', 'Passageiro', '${bk.id}')"
                        class="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        title="Abrir canal de suporte com o passageiro"
                      >
                        ${icon('support_agent', { size: 'sm' })}
                        <span>Suporte</span>
                      </button>

                      ${!isCancelled && !isRejected ? `
                        <button
                          type="button"
                          onclick="openAdminCancelBookingModal('${bk.id}')"
                          class="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-semibold rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
                          title="Cancelar reserva e processar estorno assistido"
                        >
                          ${icon('cancel', { size: 'sm' })}
                          <span>Estornar</span>
                        </button>
                      ` : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          ` : `
            <div class="p-3 bg-white rounded-lg border border-dashed border-uber-border text-center text-xs text-uber-iron">
              Nenhum passageiro reservou esta viagem ainda. As ${ride.availableSeats} vagas continuam abertas na plataforma.
            </div>
          `}
        </div>

      </div>
    `;
  }).join('');
}

// Renderizador da Sub-Aba: "Por Motorista"
function renderAdminDriversViewHtml(rides = [], bookings = [], searchQuery = '', monthFilter = 'ALL') {
  // Filtrar viagens pelo mês selecionado
  const filteredRides = monthFilter === 'ALL'
    ? rides
    : rides.filter(r => r.departureDate && r.departureDate.slice(0, 7) === monthFilter);

  // Consolidar motoristas únicos a partir das viagens do período
  const driverMap = new Map();
  filteredRides.forEach(r => {
    const key = r.driverId || r.driverName;
    if (!driverMap.has(key)) {
      driverMap.set(key, {
        id: r.driverId,
        name: r.driverName,
        cpf: r.driverCpf || '341.892.510-44',
        phone: r.driverPhone || '(85) 98822-1144',
        avatar: r.driverAvatar,
        rating: r.driverRating || 4.9,
        tripsCount: r.driverTripsCount || 0,
        vehicle: r.vehicle,
        publishedRides: []
      });
    }
    driverMap.get(key).publishedRides.push(r);
  });

  let drivers = Array.from(driverMap.values());

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    drivers = drivers.filter(d => 
      d.name.toLowerCase().includes(q) ||
      matchCpfOrText(d.cpf, q) ||
      matchCpfOrText(d.phone, q) ||
      `${d.vehicle?.brand || ''} ${d.vehicle?.model || ''} ${d.vehicle?.plate || ''}`.toLowerCase().includes(q)
    );
  }

  if (drivers.length === 0) {
    return `
      <div class="bg-white border border-uber-border rounded-xl p-8 sm:p-12 text-center space-y-2 shadow-xs">
        <div class="w-12 h-12 bg-uber-gray text-uber-iron rounded-xl flex items-center justify-center mx-auto mb-2">
          ${icon('search_off', { size: 'md' })}
        </div>
        <h3 class="text-base font-bold text-uber-black">Nenhum motorista encontrado</h3>
        <p class="text-xs text-uber-iron max-w-sm mx-auto font-normal">
          ${searchQuery ? `Não foram localizados motoristas com os critérios <strong>"${searchQuery}"</strong> no período selecionado.` : 'Não há viagens de motoristas registradas para o mês selecionado.'}
        </p>
        <button
          type="button"
          onclick="clearAdminTripsSearch()"
          class="mt-2 px-4 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-neutral-900 transition-transform active:scale-95 cursor-pointer shadow-xs"
        >
          Limpar Filtro de Busca
        </button>
      </div>
    `;
  }

  return drivers.map(d => {
    const totalPublished = d.publishedRides.length;
    const allDriverBookings = bookings.filter(b => d.publishedRides.some(r => r.id === b.rideId));
    const activeDriverBookings = allDriverBookings.filter(b => b.status !== 'CANCELLED' && b.status !== 'REJECTED_BY_DRIVER');
    const totalPassengers = activeDriverBookings.reduce((sum, b) => sum + (b.seatsBooked || 1), 0);
    const totalRevenue = activeDriverBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    const isExpanded = expandedDriverHistories.has(d.id || d.name);

    return `
      <div class="border border-uber-border bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div class="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3.5 min-w-0">
            <img src="${d.avatar || DEFAULT_BLANK_AVATAR}" class="w-12 h-12 rounded-full object-cover bg-uber-gray border border-uber-border shrink-0 shadow-2xs" />
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="font-extrabold text-base text-uber-black">${d.name}</h3>
                <span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-0.5">
                  ${icon('verified', { size: 'xs' })} Motorista
                </span>
                <span class="flex items-center gap-0.5 font-bold text-uber-black text-xs">
                  ${icon('star', { size: 'xs', fill: true, className: 'star-gold' })}
                  ${d.rating.toFixed(1)}
                </span>
              </div>
              <div class="flex items-center gap-2 text-xs text-uber-iron mt-1 flex-wrap font-normal">
                <span class="font-mono font-bold text-uber-black bg-uber-gray border border-uber-border px-1.5 py-0.5 rounded text-[11px]">
                  CPF: ${d.cpf}
                </span>
                <span>•</span>
                <span>Tel: <strong>${d.phone}</strong></span>
                <span>•</span>
                <span class="text-uber-charcoal">${d.vehicle ? `${d.vehicle.brand} ${d.vehicle.model} (${d.vehicle.plate})` : 'Veículo Ativo'}</span>
              </div>
            </div>
          </div>

          <!-- Ações e KPIs Rápidos do Motorista -->
          <div class="flex items-center gap-3 shrink-0 self-start sm:self-center">
            <div class="text-left sm:text-right text-xs">
              <span class="font-extrabold text-sm text-uber-black block">${totalPublished} ${totalPublished === 1 ? 'viagem no mês' : 'viagens no mês'}</span>
              <span class="text-[11px] text-uber-iron">${totalPassengers} passageiros transportados</span>
            </div>
            <button
              type="button"
              onclick="toggleAdminDriverAccordion('${d.id || d.name}')"
              class="px-3.5 py-2 bg-uber-gray hover:bg-neutral-200 text-uber-black font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95"
            >
              <span>${isExpanded ? 'Ocultar Viagens' : 'Ver Viagens'}</span>
              ${icon(isExpanded ? 'expand_less' : 'expand_more', { size: 'sm' })}
            </button>
          </div>
        </div>

        <!-- Gaveta Expansível com Todas as Viagens do Motorista -->
        ${isExpanded ? `
          <div class="p-4 bg-neutral-50/70 border-t border-uber-border space-y-3 animate-fade-in">
            <div class="flex justify-between items-center text-xs pb-1">
              <span class="font-bold text-uber-black uppercase tracking-wider text-[11px]">
                Histórico de Viagens do Período (${d.publishedRides.length}):
              </span>
              <span class="text-xs font-bold text-emerald-800">
                Faturamento: R$ ${totalRevenue.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <div class="space-y-3">
              ${d.publishedRides.map(ride => {
                const rBookings = bookings.filter(b => b.rideId === ride.id);
                return `
                  <div class="p-3.5 bg-white border border-uber-border rounded-xl shadow-2xs space-y-2.5 text-xs">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-uber-border pb-2">
                      <div class="flex items-center gap-2 flex-wrap">
                        <span class="font-mono font-bold text-uber-iron bg-uber-gray px-1.5 py-0.5 rounded text-[10px]">${ride.id}</span>
                        <h4 class="font-bold text-sm text-uber-black">${ride.originCity} ➔ ${ride.destinationCity}</h4>
                        <span class="text-uber-iron font-normal">• ${ride.departureDate} às ${ride.departureTime}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <span class="font-extrabold text-uber-black">R$ ${ride.pricePerSeat.toFixed(2).replace('.', ',')} / assento</span>
                        <a href="#/viagem/${ride.id}" class="p-1 text-uber-iron hover:text-uber-black" title="Abrir viagem">${icon('visibility', { size: 'sm' })}</a>
                      </div>
                    </div>

                    <!-- Lista de Passageiros desta Viagem -->
                    <div class="space-y-1.5">
                      <span class="text-[11px] font-bold text-uber-iron block uppercase">Passageiros desta saída (${rBookings.length}):</span>
                      ${rBookings.length > 0 ? rBookings.map(bk => `
                        <div class="p-2.5 bg-neutral-50 rounded-lg border border-uber-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div class="flex items-center gap-2 min-w-0">
                            <span class="font-bold text-uber-black">${bk.passengerName}</span>
                            <span class="font-mono text-[10px] text-uber-iron">CPF: ${bk.passengerCpf || '123.456.789-00'}</span>
                            <span class="text-uber-iron">(${bk.passengerPhone || 'Sem tel'})</span>
                          </div>
                          <div class="flex items-center gap-2">
                            <span class="font-bold text-uber-black">R$ ${bk.totalAmount.toFixed(2).replace('.', ',')}</span>
                            <span class="text-[10px] font-bold px-2 py-0.5 rounded-md ${bk.status === 'SIGNAL_CONFIRMED' ? 'bg-blue-50 text-blue-900 border border-blue-200' : bk.status === 'FULLY_PAID' ? 'bg-green-50 text-green-900 border border-green-200' : 'bg-neutral-100 text-neutral-700'}">
                              ${bk.status === 'SIGNAL_CONFIRMED' ? 'Sinal PIX Pago' : bk.status === 'FULLY_PAID' ? 'Concluído' : bk.status}
                            </span>
                          </div>
                        </div>
                      `).join('') : `
                        <span class="text-xs text-uber-iron font-normal">Nenhum passageiro reservou esta viagem ainda.</span>
                      `}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

// Renderizador da Sub-Aba: "Por Passageiro"
function renderAdminPassengersViewHtml(rides = [], bookings = [], searchQuery = '', monthFilter = 'ALL') {
  // Filtrar reservas pelo mês selecionado (baseado na data da viagem associada ou na data da reserva)
  const filteredBookings = monthFilter === 'ALL'
    ? bookings
    : bookings.filter(b => {
        const associatedRide = rides.find(r => r.id === b.rideId);
        const rideMonth = associatedRide && associatedRide.departureDate
          ? associatedRide.departureDate.slice(0, 7)
          : (b.createdAt ? b.createdAt.slice(0, 7) : '');
        return rideMonth === monthFilter;
      });

  // Consolidar passageiros únicos a partir de filteredBookings
  const passengerMap = new Map();
  filteredBookings.forEach(b => {
    const key = b.passengerId || b.passengerName;
    if (!passengerMap.has(key)) {
      passengerMap.set(key, {
        id: b.passengerId,
        name: b.passengerName,
        cpf: b.passengerCpf || '123.456.789-00',
        phone: b.passengerPhone || '(85) 98765-4321',
        avatar: b.passengerAvatar,
        bookingsList: []
      });
    }
    passengerMap.get(key).bookingsList.push(b);
  });

  let passengers = Array.from(passengerMap.values());

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    passengers = passengers.filter(p => 
      p.name.toLowerCase().includes(q) ||
      matchCpfOrText(p.cpf, q) ||
      matchCpfOrText(p.phone, q) ||
      p.bookingsList.some(bk => bk.id.toLowerCase().includes(q))
    );
  }

  if (passengers.length === 0) {
    return `
      <div class="bg-white border border-uber-border rounded-xl p-8 sm:p-12 text-center space-y-2 shadow-xs">
        <div class="w-12 h-12 bg-uber-gray text-uber-iron rounded-xl flex items-center justify-center mx-auto mb-2">
          ${icon('search_off', { size: 'md' })}
        </div>
        <h3 class="text-base font-bold text-uber-black">Nenhum passageiro encontrado</h3>
        <p class="text-xs text-uber-iron max-w-sm mx-auto font-normal">
          ${searchQuery ? `Não foram localizados passageiros com os critérios <strong>"${searchQuery}"</strong> no período selecionado.` : 'Não há reservas de passageiros registradas para o mês selecionado.'}
        </p>
        <button
          type="button"
          onclick="clearAdminTripsSearch()"
          class="mt-2 px-4 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-neutral-900 transition-transform active:scale-95 cursor-pointer shadow-xs"
        >
          Limpar Filtro de Busca
        </button>
      </div>
    `;
  }

  return passengers.map(p => {
    const totalBookings = p.bookingsList.length;
    const totalSpent = p.bookingsList.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    const totalSignals = p.bookingsList.reduce((sum, b) => sum + (b.amountPaidSignal || 0), 0);
    const isExpanded = expandedPassengerHistories.has(p.id || p.name);

    return `
      <div class="border border-uber-border bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div class="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3.5 min-w-0">
            <img src="${p.avatar || DEFAULT_BLANK_AVATAR}" class="w-12 h-12 rounded-full object-cover bg-uber-gray border border-uber-border shrink-0 shadow-2xs" />
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="font-extrabold text-base text-uber-black">${p.name}</h3>
                <span class="text-[11px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded flex items-center gap-0.5">
                  ${icon('person', { size: 'xs' })} Passageiro
                </span>
              </div>
              <div class="flex items-center gap-2 text-xs text-uber-iron mt-1 flex-wrap font-normal">
                <span class="font-mono font-bold text-uber-black bg-uber-gray border border-uber-border px-1.5 py-0.5 rounded text-[11px]">
                  CPF: ${p.cpf}
                </span>
                <span>•</span>
                <span>Tel: <strong>${p.phone}</strong></span>
              </div>
            </div>
          </div>

          <!-- Ações e KPIs Rápidos do Passageiro -->
          <div class="flex items-center gap-3 shrink-0 self-start sm:self-center">
            <div class="text-left sm:text-right text-xs">
              <span class="font-extrabold text-sm text-uber-black block">${totalBookings} ${totalBookings === 1 ? 'reserva no mês' : 'reservas no mês'}</span>
              <span class="text-[11px] text-uber-iron">Total em Sinais: R$ ${totalSignals.toFixed(2).replace('.', ',')}</span>
            </div>
            <button
              type="button"
              onclick="toggleAdminPassengerAccordion('${p.id || p.name}')"
              class="px-3.5 py-2 bg-uber-gray hover:bg-neutral-200 text-uber-black font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95"
            >
              <span>${isExpanded ? 'Ocultar Reservas' : 'Ver Reservas'}</span>
              ${icon(isExpanded ? 'expand_less' : 'expand_more', { size: 'sm' })}
            </button>
          </div>
        </div>

        <!-- Gaveta Expansível com Todas as Reservas do Passageiro -->
        ${isExpanded ? `
          <div class="p-4 bg-neutral-50/70 border-t border-uber-border space-y-3 animate-fade-in">
            <div class="flex justify-between items-center text-xs pb-1">
              <span class="font-bold text-uber-black uppercase tracking-wider text-[11px]">
                Histórico de Reservas do Período (${p.bookingsList.length}):
              </span>
              <span class="text-xs font-bold text-uber-black">
                Total do Período: R$ ${totalSpent.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <div class="space-y-3">
              ${p.bookingsList.map(bk => {
                const ride = rides.find(r => r.id === bk.rideId);
                const isSignalPaid = bk.status === 'SIGNAL_CONFIRMED';
                const isFullyPaid = bk.status === 'FULLY_PAID';
                const isCancelled = bk.status === 'CANCELLED';

                return `
                  <div class="p-3.5 bg-white border border-uber-border rounded-xl shadow-2xs space-y-2.5 text-xs">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-uber-border pb-2">
                      <div>
                        <div class="flex items-center gap-2 flex-wrap">
                          <span class="font-mono font-bold text-uber-iron bg-uber-gray px-1.5 py-0.5 rounded text-[10px]">${bk.id}</span>
                          <h4 class="font-bold text-sm text-uber-black">${ride ? `${ride.originCity} ➔ ${ride.destinationCity}` : 'Viagem ' + bk.rideId}</h4>
                        </div>
                        <p class="text-uber-iron text-[11px] mt-0.5">
                          ${ride ? `Data: ${ride.departureDate} às ${ride.departureTime} • Motorista: ${ride.driverName} (CPF: ${ride.driverCpf || '341.892.510-44'})` : ''}
                        </p>
                      </div>

                      <div class="flex items-center gap-2">
                        <span class="text-[11px] font-bold px-2 py-0.5 rounded-md ${isSignalPaid ? 'bg-blue-50 text-blue-900 border border-blue-200' : isFullyPaid ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : isCancelled ? 'bg-red-50 text-red-900 border border-red-200' : 'bg-neutral-100 text-neutral-800'}">
                          ${isSignalPaid ? 'Sinal Pago (Custódia)' : isFullyPaid ? 'Repasse Concluído' : isCancelled ? 'Cancelada' : bk.status}
                        </span>
                        <button onclick="openReceiptModalById('${bk.id}')" class="px-2 py-1 bg-uber-gray hover:bg-neutral-200 text-uber-black font-semibold rounded text-[11px] flex items-center gap-0.5 cursor-pointer">
                          ${icon('receipt_long', { size: 'xs' })} Recibo
                        </button>
                        ${!isCancelled ? `
                          <button onclick="openAdminCancelBookingModal('${bk.id}')" class="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-semibold rounded text-[11px] flex items-center gap-0.5 cursor-pointer">
                            ${icon('cancel', { size: 'xs' })} Estornar
                          </button>
                        ` : ''}
                      </div>
                    </div>

                    <div class="flex justify-between items-center text-xs text-uber-charcoal">
                      <span>Lugares: <strong>${bk.seatsBooked}</strong></span>
                      <span>Sinal: <strong>R$ ${bk.amountPaidSignal.toFixed(2).replace('.', ',')}</strong></span>
                      <span>Valor Total: <strong>R$ ${bk.totalAmount.toFixed(2).replace('.', ',')}</strong></span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

function updateAdminTripsLiveView() {
  const { bookings, rides } = store.state;
  
  if (adminTripsViewMode === 'ALL') {
    const filtered = getAdminFilteredRides(rides, bookings, adminTripsMonthFilter, adminTripsStatusFilter, adminTripsSearchQuery);
    const kpisContainer = document.getElementById('admin-trips-kpis-container');
    const listContainer = document.getElementById('admin-trips-list-container');
    if (kpisContainer && listContainer) {
      kpisContainer.innerHTML = renderAdminTripsKpisHtml(filtered, bookings);
      listContainer.innerHTML = renderAdminTripsListHtml(filtered, bookings);
    } else {
      renderApp();
    }
  } else if (adminTripsViewMode === 'DRIVERS') {
    const driversContainer = document.getElementById('admin-trips-drivers-container');
    if (driversContainer) {
      driversContainer.innerHTML = renderAdminDriversViewHtml(rides, bookings, adminTripsSearchQuery, adminTripsMonthFilter);
    } else {
      renderApp();
    }
  } else if (adminTripsViewMode === 'PASSENGERS') {
    const passengersContainer = document.getElementById('admin-trips-passengers-container');
    if (passengersContainer) {
      passengersContainer.innerHTML = renderAdminPassengersViewHtml(rides, bookings, adminTripsSearchQuery, adminTripsMonthFilter);
    } else {
      renderApp();
    }
  }
}

function handleAdminTripsSearchInput(value) {
  adminTripsSearchQuery = value;
  const clearBtn = document.getElementById('admin-trips-search-clear-btn');
  if (clearBtn) {
    clearBtn.classList.toggle('hidden', !value);
  }
  updateAdminTripsLiveView();
}

function clearAdminTripsSearch() {
  adminTripsSearchQuery = '';
  const searchInput = document.getElementById('admin-trips-search-input');
  if (searchInput) {
    searchInput.value = '';
    searchInput.focus();
  }
  const clearBtn = document.getElementById('admin-trips-search-clear-btn');
  if (clearBtn) {
    clearBtn.classList.add('hidden');
  }
  updateAdminTripsLiveView();
}

// View: My Trips / Viagens da Plataforma
function viewMyTrips() {
  const { bookings, rides, currentUser, role } = store.state;
  const isAdmin = role === 'ADMIN' || role === 'MANAGER';
  const myPublished = rides.filter(r => r.driverId === currentUser.id);

  // Filtros administrativos para a visão de Admin / Gestor
  let adminFilteredRides = [];
  if (isAdmin) {
    adminFilteredRides = getAdminFilteredRides(rides, bookings, adminTripsMonthFilter, adminTripsStatusFilter, adminTripsSearchQuery);
  }

  const currentMonthStr = new Date().toISOString().slice(0, 7);
  const availableMonths = getAvailableMonths(rides);

  return `
    <div class="max-w-4xl mx-auto px-4 py-6 text-left pb-24 md:pb-12 animate-fade-in">
      
      <!-- Cabeçalho Principal -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-uber-border">
        <div>
          <div class="flex items-center gap-2.5">
            ${isAdmin ? `
              <div class="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold shrink-0">
                ${icon('shield', { size: 'sm' })}
              </div>
            ` : ''}
            <h1 class="text-xl sm:text-2xl font-extrabold text-uber-black">
              ${isAdmin ? 'Viagens da Plataforma' : role === 'DRIVER' ? 'Minhas Viagens' : 'Minhas Reservas'}
            </h1>
          </div>
          <p class="text-xs text-uber-iron font-normal mt-1">
            ${isAdmin 
              ? 'Gestão operacional, busca por CPF, suporte a motoristas e passageiros e acompanhamento financeiro em tempo real.' 
              : role === 'DRIVER' 
              ? 'Gerencie suas viagens publicadas, aceite passageiros e inicie conversas.' 
              : 'Acompanhe suas viagens reservadas, realize pagamentos e acesse comprovantes.'}
          </p>
        </div>

        ${role === 'PASSENGER' ? `
          <a href="#/buscar" class="h-9 px-3.5 text-xs font-semibold rounded-lg bg-uber-gray hover:bg-uber-border flex items-center gap-1.5 text-uber-black self-start sm:self-center">
            ${icon('search', { size: 'sm' })}
            <span>Buscar Viagens</span>
          </a>
        ` : ''}

        ${isAdmin ? `
          <div class="flex items-center gap-2 self-start sm:self-center">
            <span class="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs">
              ${icon('support_agent', { size: 'sm', className: 'text-emerald-700' })}
              <span>Central de Suporte & Gestão</span>
            </span>
          </div>
        ` : ''}
      </div>

      <!-- SEÇÃO EXCLUSIVA DO ADMINISTRADOR: VIAGENS DA PLATAFORMA -->
      ${isAdmin ? `
        <div class="space-y-5">
          
          <!-- Sub-Abas de Navegação Rápida: Todas as Viagens | Por Motorista | Por Passageiro -->
          <div class="flex items-center gap-2 border-b border-uber-border pb-3 overflow-x-auto">
            <button
              type="button"
              onclick="adminTripsViewMode = 'ALL'; renderApp();"
              class="px-3.5 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${adminTripsViewMode === 'ALL' ? 'bg-black text-white shadow-xs' : 'bg-uber-gray hover:bg-neutral-200 text-uber-black border border-uber-border'}"
            >
              ${icon('route', { size: 'xs' })}
              <span>Todas as Viagens</span>
            </button>
            <button
              type="button"
              onclick="adminTripsViewMode = 'DRIVERS'; renderApp();"
              class="px-3.5 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${adminTripsViewMode === 'DRIVERS' ? 'bg-black text-white shadow-xs' : 'bg-uber-gray hover:bg-neutral-200 text-uber-black border border-uber-border'}"
            >
              ${icon('directions_car', { size: 'xs' })}
              <span>Por Motorista</span>
            </button>
            <button
              type="button"
              onclick="adminTripsViewMode = 'PASSENGERS'; renderApp();"
              class="px-3.5 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${adminTripsViewMode === 'PASSENGERS' ? 'bg-black text-white shadow-xs' : 'bg-uber-gray hover:bg-neutral-200 text-uber-black border border-uber-border'}"
            >
              ${icon('group', { size: 'xs' })}
              <span>Por Passageiro</span>
            </button>
          </div>

          <!-- Barra de Filtros e Busca Administrativa por CPF / Nome / Rota -->
          <div class="p-4 bg-white border border-uber-border rounded-xl shadow-xs space-y-3.5">
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              
              <!-- Seletor de Mês (Disponível em todas as sub-abas: Todas, Motoristas e Passageiros) -->
              <div class="flex items-center gap-2 min-w-0 flex-1 sm:max-w-xs">
                <div class="text-uber-black shrink-0">
                  ${icon('calendar_month', { size: 'sm' })}
                </div>
                <div class="w-full">
                  <label class="block text-[10px] font-bold text-uber-iron uppercase tracking-wider mb-0.5">Mês de Referência</label>
                  <select
                    id="admin-month-filter"
                    onchange="adminTripsMonthFilter = this.value; renderApp();"
                    class="w-full h-10 bg-uber-gray border border-uber-border rounded-lg px-3 text-xs font-bold text-uber-black focus:outline-none focus:border-uber-black cursor-pointer"
                  >
                    ${availableMonths.map(m => `
                      <option value="${m}" ${adminTripsMonthFilter === m ? 'selected' : ''}>
                        ${formatMonthName(m)} ${m === currentMonthStr ? '(Mês Atual)' : ''}
                      </option>
                    `).join('')}
                    <option value="ALL" ${adminTripsMonthFilter === 'ALL' ? 'selected' : ''}>Todos os Meses</option>
                  </select>
                </div>
              </div>

              <!-- Campo de Busca por CPF / Nome / Rota -->
              <div class="flex-1 min-w-0">
                <label class="block text-[10px] font-bold text-uber-iron uppercase tracking-wider mb-0.5">
                  ${adminTripsViewMode === 'DRIVERS' ? 'Buscar Motorista (CPF, Nome, Telefone ou Placa)' : adminTripsViewMode === 'PASSENGERS' ? 'Buscar Passageiro (CPF, Nome, Telefone ou Reserva)' : 'Busca Rápida por CPF, Nome, Código ou Cidade'}
                </label>
                <div class="relative">
                  <input
                    id="admin-trips-search-input"
                    type="text"
                    value="${adminTripsSearchQuery}"
                    placeholder="${adminTripsViewMode === 'DRIVERS' ? 'Digite o CPF do motorista (ex: 341.892... ou 341892), nome ou placa...' : adminTripsViewMode === 'PASSENGERS' ? 'Digite o CPF do passageiro (ex: 123.456... ou 123456), nome ou telefone...' : 'Buscar CPF do motorista/passageiro, nome, rota ou código...'}"
                    oninput="handleAdminTripsSearchInput(this.value)"
                    class="w-full h-10 bg-uber-gray border border-uber-border focus:border-uber-black focus:bg-white text-xs font-semibold rounded-lg pl-9 pr-8 focus:outline-none transition-all"
                  />
                  <div class="absolute left-3 top-2.5 text-uber-iron pointer-events-none">
                    ${icon('search', { size: 'sm' })}
                  </div>
                  <button
                    id="admin-trips-search-clear-btn"
                    type="button"
                    onclick="clearAdminTripsSearch()"
                    class="absolute right-2.5 top-2.5 text-uber-iron hover:text-uber-black ${adminTripsSearchQuery ? '' : 'hidden'}"
                    title="Limpar busca"
                  >
                    ${icon('close', { size: 'sm' })}
                  </button>
                </div>
              </div>
            </div>

            <!-- Filtros de Status (Exibido na visão geral) -->
            ${adminTripsViewMode === 'ALL' ? `
              <div class="flex items-center gap-2 overflow-x-auto pt-1 border-t border-uber-border text-xs">
                <span class="text-[11px] font-bold text-uber-iron uppercase tracking-wider shrink-0 mr-1">Filtrar:</span>
                <button
                  type="button"
                  onclick="adminTripsStatusFilter = 'ALL'; renderApp();"
                  class="px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${adminTripsStatusFilter === 'ALL' ? 'bg-black text-white' : 'bg-uber-gray hover:bg-neutral-200 text-uber-black border border-uber-border'}"
                >
                  Todas as Viagens
                </button>
                <button
                  type="button"
                  onclick="adminTripsStatusFilter = 'WITH_BOOKINGS'; renderApp();"
                  class="px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${adminTripsStatusFilter === 'WITH_BOOKINGS' ? 'bg-black text-white' : 'bg-uber-gray hover:bg-neutral-200 text-uber-black border border-uber-border'}"
                >
                  Com Passageiros
                </button>
                <button
                  type="button"
                  onclick="adminTripsStatusFilter = 'PAID'; renderApp();"
                  class="px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${adminTripsStatusFilter === 'PAID' ? 'bg-black text-white' : 'bg-uber-gray hover:bg-neutral-200 text-uber-black border border-uber-border'}"
                >
                  Sinal / Pagas
                </button>
                <button
                  type="button"
                  onclick="adminTripsStatusFilter = 'CANCELLED'; renderApp();"
                  class="px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${adminTripsStatusFilter === 'CANCELLED' ? 'bg-black text-white' : 'bg-uber-gray hover:bg-neutral-200 text-uber-black border border-uber-border'}"
                >
                  Canceladas
                </button>
              </div>
            ` : ''}
          </div>

          <!-- RENDERIZAÇÃO DA ABA 1: TODAS AS VIAGENS -->
          ${adminTripsViewMode === 'ALL' ? `
            <!-- Resumo e Indicadores do Período Filtrado -->
            <div id="admin-trips-kpis-container" class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              ${renderAdminTripsKpisHtml(adminFilteredRides, bookings)}
            </div>

            <!-- Lista Detalhada de Viagens da Plataforma -->
            <div id="admin-trips-list-container" class="space-y-4">
              ${renderAdminTripsListHtml(adminFilteredRides, bookings)}
            </div>
          ` : adminTripsViewMode === 'DRIVERS' ? `
            <!-- RENDERIZAÇÃO DA ABA 2: POR MOTORISTA -->
            <div id="admin-trips-drivers-container" class="space-y-4">
              ${renderAdminDriversViewHtml(rides, bookings, adminTripsSearchQuery)}
            </div>
          ` : `
            <!-- RENDERIZAÇÃO DA ABA 3: POR PASSAGEIRO -->
            <div id="admin-trips-passengers-container" class="space-y-4">
              ${renderAdminPassengersViewHtml(rides, bookings, adminTripsSearchQuery)}
            </div>
          `}

        </div>
      ` : ''}

      <!-- SEÇÃO EXCLUSIVA DO PASSAGEIRO -->
      ${role === 'PASSENGER' ? `
        <div class="space-y-3">
          ${bookings.length > 0 ? bookings.map(b => {
            const ride = rides.find(r => r.id === b.rideId);
            const isAccepted = b.status === 'ACCEPTED' || b.status === 'SIGNAL_CONFIRMED' || b.status === 'FULLY_PAID';
            const isAwaiting = b.status === 'AWAITING_DRIVER';

            return `
              <div class="p-4 border border-uber-border bg-white rounded-xl">
                <div class="flex justify-between items-center pb-3 border-b border-uber-border text-xs">
                  <span class="font-mono font-medium text-uber-iron">${b.id}</span>
                  ${isAwaiting ? `
                    <span class="flex items-center gap-1.5 font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md text-[11px] border border-amber-200">
                      ${icon('hourglass_top', { size: 'sm', className: 'text-amber-700' })}
                      <span>Aguardando Motorista</span>
                    </span>
                  ` : isAccepted ? `
                    <span class="flex items-center gap-1.5 font-bold text-uber-black bg-uber-gray px-2.5 py-1 rounded-md text-[11px]">
                      ${icon('check_circle', { size: 'sm', className: 'text-uber-black' })}
                      <span>Viagem Confirmada</span>
                    </span>
                  ` : `
                    <span class="flex items-center gap-1.5 font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-md text-[11px]">
                      ${icon('cancel', { size: 'sm', className: 'text-red-600' })}
                      <span>${b.status === 'REJECTED_BY_DRIVER' ? 'Recusada pelo Motorista' : 'Cancelada'}</span>
                    </span>
                  `}
                </div>

                ${ride ? `
                  <div class="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div class="flex items-center gap-3">
                      <div class="w-16 h-12 flex items-center justify-center shrink-0">
                        <img src="${getVehicleImage(ride.vehicle)}" alt="${ride.vehicle.model}" class="w-full h-full object-contain drop-shadow-2xs" />
                      </div>
                      <div>
                        <p class="font-bold text-sm sm:text-base text-uber-black">${ride.originCity} ➔ ${ride.destinationCity}</p>
                        <p class="text-uber-iron font-normal mt-0.5">${ride.departureDate} às ${ride.departureTime} • ${ride.driverName} (${ride.vehicle.model})</p>
                      </div>
                    </div>
                    <div class="text-left sm:text-right mt-1 sm:mt-0">
                      <span class="font-bold text-uber-black text-sm block">Sinal: R$ ${b.amountPaidSignal.toFixed(2).replace('.', ',')}</span>
                      <span class="text-uber-iron font-normal text-xs">Final: R$ ${b.amountDueFinal.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                ` : ''}

                ${b.status !== 'CANCELLED' && b.status !== 'REJECTED_BY_DRIVER' ? `
                  <div class="pt-3 border-t border-uber-border flex flex-wrap justify-end gap-2 text-xs">
                    ${ride ? `
                      ${isAccepted ? `
                        <a href="#/chat/${ride.id}" class="font-bold text-white bg-black hover:bg-neutral-900 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors active:scale-95 shadow-xs">
                          ${icon('chat', { size: 'sm' })}
                          <span>Conversar</span>
                        </a>
                      ` : `
                        <button disabled class="font-semibold text-uber-iron bg-uber-gray px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-not-allowed opacity-75 select-none" title="Aguardando motorista aceitar a viagem para liberar o chat">
                          ${icon('chat', { size: 'sm' })}
                          <span>Aguardando Aceite</span>
                        </button>
                      `}
                      
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

      <!-- SEÇÃO EXCLUSIVA DO MOTORISTA -->
      ${role === 'DRIVER' ? `
        <div class="space-y-4">
          ${myPublished.length > 0 ? myPublished.map(ride => {
            const rideBookings = bookings.filter(b => b.rideId === ride.id && b.status !== 'CANCELLED');

            return `
              <div class="p-4 sm:p-5 border border-uber-border bg-white rounded-xl flex flex-col gap-3">
                <div class="flex justify-between items-center pb-3 border-b border-uber-border text-xs">
                  <span class="font-bold text-sm sm:text-base text-uber-black">${ride.originCity} ➔ ${ride.destinationCity}</span>
                  <span class="flex items-center gap-1.5 font-bold text-uber-black bg-uber-gray px-2.5 py-1 rounded-md text-[11px]">
                    ${icon('airline_seat_recline_normal', { size: 'sm', className: 'text-uber-black' })}
                    <span>${ride.availableSeats}/${ride.totalSeats} lugares livres</span>
                  </span>
                </div>

                <div class="py-1 flex justify-between items-center text-xs">
                  <span class="text-uber-iron font-normal">${ride.departureDate} às ${ride.departureTime}</span>
                  <span class="font-bold text-uber-black text-sm">R$ ${ride.pricePerSeat.toFixed(2).replace('.', ',')} / lugar</span>
                </div>

                <!-- Passageiros e Solicitações de Reserva -->
                <div class="border-t border-uber-border pt-3 space-y-2">
                  <span class="text-xs font-bold text-uber-black uppercase tracking-wider block">Passageiros & Reservas:</span>
                  ${rideBookings.length > 0 ? rideBookings.map(bk => `
                    <div class="p-3 bg-uber-gray rounded-lg border border-uber-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div class="flex items-center gap-2.5">
                        <img src="${bk.passengerAvatar || DEFAULT_BLANK_AVATAR}" class="w-7 h-7 rounded-full object-cover bg-white border border-uber-border shrink-0" />
                        <div>
                          <p class="font-bold text-uber-black">${bk.passengerName} <span class="font-normal text-uber-iron">(${bk.seatsBooked} lugar${bk.seatsBooked > 1 ? 'es' : ''})</span></p>
                          <p class="text-[11px] text-uber-charcoal">Sinal PIX 50%: R$ ${bk.amountPaidSignal.toFixed(2).replace('.', ',')}</p>
                        </div>
                      </div>

                      <div class="flex items-center gap-2">
                        ${bk.status === 'AWAITING_DRIVER' ? `
                          <button onclick="handleDriverRejectBooking('${bk.id}')" class="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-bold text-xs transition-colors">
                            Recusar
                          </button>
                          <button onclick="handleDriverAcceptBooking('${bk.id}')" class="px-3 py-1.5 bg-black text-white hover:bg-neutral-900 rounded-lg font-bold text-xs transition-transform active:scale-95 shadow-xs">
                            Aceitar Viagem
                          </button>
                        ` : bk.status === 'ACCEPTED' || bk.status === 'SIGNAL_CONFIRMED' ? `
                          <span class="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">Aceito</span>
                          <a href="#/chat/${ride.id}" class="font-bold text-uber-black bg-white hover:bg-neutral-100 border border-uber-border flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs">
                            ${icon('chat', { size: 'sm' })}
                            <span>Conversar</span>
                          </a>
                        ` : `
                          <span class="text-xs text-red-600 font-semibold">Cancelado</span>
                        `}
                      </div>
                    </div>
                  `).join('') : `
                    <p class="text-xs text-uber-iron font-normal">Nenhuma reserva solicitada para esta viagem ainda.</p>
                  `}
                </div>

                <div class="pt-2 border-t border-uber-border flex justify-end gap-2 text-xs">
                  ${rideBookings.length > 0 ? `
                    <a href="#/chat/${ride.id}" class="font-semibold text-uber-black hover:bg-uber-border flex items-center gap-1.5 px-3 py-1.5 bg-uber-gray rounded-lg transition-colors active:scale-95">
                      ${icon('chat', { size: 'sm' })}
                      <span>Abrir Chat</span>
                    </a>
                  ` : `
                    <span title="O chat será ativado quando um passageiro solicitar esta viagem" class="text-xs text-uber-iron flex items-center gap-1 px-3 py-1.5 bg-uber-gray/60 rounded-lg cursor-not-allowed">
                      ${icon('chat_bubble_outline', { size: 'sm', className: 'text-uber-iron' })}
                      <span>Chat (aguardando passageiro)</span>
                    </span>
                  `}
                  <a href="#/viagem/${ride.id}" class="font-bold text-uber-black hover:underline flex items-center gap-1.5 px-3 py-1.5">
                    ${icon('visibility', { size: 'sm' })}
                    <span>Ver Detalhes</span>
                  </a>
                </div>
              </div>
            `;
          }).join('') : `
            <div class="bg-white border border-uber-border rounded-xl p-8 text-center text-uber-iron text-xs font-normal">
              Você ainda não cadastrou nenhuma viagem como motorista.
            </div>
          `}
        </div>
      ` : ''}

    </div>
  `;
}

// Modais e Ações Administrativas de Suporte
function openAdminContactSupportModal(targetName, targetPhone, roleLabel, bookingOrRideId = '') {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  const cleanPhone = (targetPhone || '').replace(/\D/g, '');
  const waLink = cleanPhone ? `https://wa.me/55${cleanPhone}` : '#';

  modalRoot.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-uber-black/80 backdrop-blur-xs animate-fade-in">
      <div class="bg-white rounded-2xl border border-uber-border shadow-2xl max-w-md w-full p-5 sm:p-6 text-left space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-uber-border">
          <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 bg-emerald-50 text-emerald-800 rounded-xl flex items-center justify-center border border-emerald-200">
              ${icon('support_agent', { size: 'md' })}
            </div>
            <div>
              <h3 class="font-bold text-base text-uber-black">Canal de Suporte & Mediação</h3>
              <p class="text-xs text-uber-iron font-normal">Atendimento direto pela administração da cooperativa</p>
            </div>
          </div>
          <button onclick="closeModal()" class="p-1 text-uber-iron hover:text-uber-black rounded-lg hover:bg-uber-gray transition-colors cursor-pointer" aria-label="Fechar">
            ${icon('close', { size: 'sm' })}
          </button>
        </div>

        <div class="p-3.5 bg-uber-gray rounded-xl border border-uber-border space-y-2 text-xs">
          <div class="flex justify-between items-center">
            <span class="text-uber-iron font-medium uppercase tracking-wider text-[10px]">Contato (${roleLabel}):</span>
            <span class="font-bold text-uber-black">${targetName}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-uber-iron font-medium uppercase tracking-wider text-[10px]">Telefone / WhatsApp:</span>
            <span class="font-mono font-bold text-uber-black text-sm">${targetPhone || '(85) 98765-4321'}</span>
          </div>
          ${bookingOrRideId ? `
            <div class="flex justify-between items-center pt-1 border-t border-uber-border text-[11px]">
              <span class="text-uber-iron">Referência / Código:</span>
              <span class="font-mono font-semibold text-uber-charcoal">${bookingOrRideId}</span>
            </div>
          ` : ''}
        </div>

        <div class="space-y-2 pt-1">
          <a
            href="${waLink}"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
          >
            ${icon('chat', { size: 'sm' })}
            <span>Conversar via WhatsApp</span>
          </a>

          <a
            href="tel:${cleanPhone || '85987654321'}"
            class="w-full h-11 bg-uber-gray hover:bg-uber-border text-uber-black font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            ${icon('call', { size: 'sm' })}
            <span>Ligar para ${targetName.split(' ')[0]}</span>
          </a>
        </div>

        <div class="pt-2 border-t border-uber-border text-right">
          <button onclick="closeModal()" class="px-4 py-2 bg-uber-gray text-uber-black hover:bg-uber-border rounded-lg text-xs font-bold transition-colors">
            Fechar
          </button>
        </div>
      </div>
    </div>
  `;
}

function openAdminCancelBookingModal(bookingId) {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;
  const booking = store.state.bookings.find(b => b.id === bookingId);
  if (!booking) return;
  const ride = store.state.rides.find(r => r.id === booking.rideId);

  modalRoot.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-uber-black/80 backdrop-blur-xs animate-fade-in">
      <div class="bg-white rounded-2xl border border-uber-border shadow-2xl max-w-md w-full p-5 sm:p-6 text-left space-y-4">
        <div class="flex items-center gap-3 pb-3 border-b border-uber-border">
          <div class="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center border border-red-200">
            ${icon('warning', { size: 'md' })}
          </div>
          <div>
            <h3 class="font-bold text-base text-uber-black">Cancelamento & Estorno de Suporte</h3>
            <p class="text-xs text-uber-iron font-normal">Mediação administrativa da cooperativa</p>
          </div>
        </div>

        <div class="p-3.5 bg-uber-gray rounded-xl border border-uber-border space-y-1.5 text-xs">
          <p><strong>Passageiro:</strong> ${booking.passengerName} (${booking.passengerPhone})</p>
          <p><strong>Viagem:</strong> ${ride ? `${ride.originCity} ➔ ${ride.destinationCity}` : booking.rideId}</p>
          <p><strong>Sinal Pago:</strong> R$ ${booking.amountPaidSignal.toFixed(2).replace('.', ',')}</p>
          <p class="text-[11px] text-uber-iron pt-1">O cancelamento administrativo liberará o estorno integral para o passageiro e reabrirá as vagas no veículo.</p>
        </div>

        <div class="flex gap-2.5 pt-2 border-t border-uber-border">
          <button onclick="closeModal()" class="flex-1 h-11 font-semibold bg-uber-gray text-uber-black rounded-lg hover:bg-uber-border text-xs">
            Voltar
          </button>
          <button onclick="handleExecuteAdminCancelBooking('${booking.id}')" class="flex-1 h-11 font-bold bg-black text-white hover:bg-red-700 rounded-lg flex items-center justify-center gap-1.5 text-xs transition-colors">
            ${icon('cancel', { size: 'sm' })}
            <span>Confirmar Estorno</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function handleExecuteAdminCancelBooking(bookingId) {
  const result = store.cancelBooking(bookingId);
  closeModal();
  showToast(`Reserva ${bookingId} cancelada pelo suporte. Estorno PIX registrado com sucesso.`, 'success');
  renderApp();
}

function handleDriverAcceptBooking(bookingId) {
  store.acceptBooking(bookingId);
  const b = store.state.bookings.find(x => x.id === bookingId);
  if (b) {
    pushNotification({
      title: 'Reserva confirmada',
      body: `Sua reserva foi aceita pelo motorista!`,
      icon: 'check_circle',
      href: `#/viagem/${b.rideId}`,
      category: 'booking',
      role: 'PASSENGER',
      userId: b.passengerId
    });
  }
  showToast('Reserva aceita com sucesso! O chat foi liberado para o passageiro.', 'success');
}

function handleDriverRejectBooking(bookingId) {
  const b = store.state.bookings.find(x => x.id === bookingId);
  if (b) {
    pushNotification({
      title: 'Reserva recusada',
      body: `O motorista não pôde aceitar sua reserva.`,
      icon: 'cancel',
      href: '#/minhas-viagens',
      category: 'booking',
      role: 'PASSENGER',
      userId: b.passengerId
    });
  }
  store.rejectBooking(bookingId);
  showToast('Reserva recusada.', 'warning');
}

// ==========================================
// MATRIZ DE ROTAS E PRECIFICAÇÃO INTELIGENTE
// ==========================================

const ROUTE_METRICS_DATABASE = {
  // Ceará
  'fortaleza, ce|juazeiro do norte, ce': { distanceKm: 490, duration: '6h 30m' },
  'fortaleza, ce|sobral, ce': { distanceKm: 235, duration: '3h 15m' },
  'fortaleza, ce|quixada, ce': { distanceKm: 168, duration: '2h 30m' },
  'fortaleza, ce|mossoro, rn': { distanceKm: 245, duration: '3h 30m' },
  'fortaleza, ce|natal, rn': { distanceKm: 535, duration: '7h 15m' },
  'fortaleza, ce|teresina, pi': { distanceKm: 600, duration: '8h 30m' },
  
  // Pernambuco
  'recife, pe|caruaru, pe': { distanceKm: 135, duration: '2h 00m' },
  'recife, pe|petrolina, pe': { distanceKm: 710, duration: '9h 30m' },
  'recife, pe|joao pessoa, pb': { distanceKm: 120, duration: '1h 45m' },
  'recife, pe|maceio, al': { distanceKm: 258, duration: '3h 45m' },
  'recife, pe|garanhuns, pe': { distanceKm: 230, duration: '3h 20m' },
  'recife, pe|campina grande, pb': { distanceKm: 195, duration: '2h 45m' },

  // Bahia
  'salvador, ba|feira de santana, ba': { distanceKm: 110, duration: '1h 30m' },
  'salvador, ba|vitoria da conquista, ba': { distanceKm: 518, duration: '7h 00m' },
  'salvador, ba|aracaju, se': { distanceKm: 325, duration: '4h 30m' },
  'salvador, ba|ilheus, ba': { distanceKm: 460, duration: '6h 45m' },
  'salvador, ba|itabuna, ba': { distanceKm: 435, duration: '6h 15m' },

  // Paraíba / RN / Alagoas / Sergipe / Piauí / Maranhão
  'joao pessoa, pb|campina grande, pb': { distanceKm: 130, duration: '1h 45m' },
  'natal, rn|mossoro, rn': { distanceKm: 278, duration: '3h 50m' },
  'maceio, al|aracaju, se': { distanceKm: 275, duration: '3h 40m' },
  'teresina, pi|parnaiba, pi': { distanceKm: 340, duration: '4h 45m' },
  'sao luis, ma|imperatriz, ma': { distanceKm: 630, duration: '8h 30m' }
};

function normalizeCityKey(city) {
  return String(city || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function getRouteMetrics(origin, destination) {
  const o = normalizeCityKey(origin);
  const d = normalizeCityKey(destination);
  const directKey = `${o}|${d}`;
  const reverseKey = `${d}|${o}`;

  if (ROUTE_METRICS_DATABASE[directKey]) return ROUTE_METRICS_DATABASE[directKey];
  if (ROUTE_METRICS_DATABASE[reverseKey]) return ROUTE_METRICS_DATABASE[reverseKey];

  // Heurística para rotas não mapeadas exatamente
  return { distanceKm: 180, duration: '2h 30m' };
}

function calculateSmartPrice(distanceKm) {
  const km = Math.max(20, Number(distanceKm) || 150);
  const baseRate = 12.00; // Taxa base de partida
  const ratePerKm = 0.15; // R$ 0,15 por km rateado por passageiro
  const suggested = Math.max(20, Math.round(baseRate + km * ratePerKm));
  const minPrice = Math.max(15, Math.round(suggested * 0.65));
  const maxPrice = Math.max(35, Math.round(suggested * 1.45));

  return { suggested, minPrice, maxPrice, distanceKm: km };
}

// ==========================================
// CONTROLE DE ANTECEDÊNCIA TEMPORAL (MÍNIMO 2 HORAS)
// ==========================================

function getAdvanceDateTime(hoursAhead = 2) {
  const d = new Date(Date.now() + hoursAhead * 60 * 60 * 1000);
  // Arredondar para os próximos 5 minutos para um horário limpo e profissional
  const remainder = d.getMinutes() % 5;
  if (remainder !== 0) {
    d.setMinutes(d.getMinutes() + (5 - remainder));
  }
  d.setSeconds(0);
  d.setMilliseconds(0);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  return {
    dateStr: `${year}-${month}-${day}`,
    timeStr: `${hours}:${minutes}`,
    dateObj: d,
    formattedDate: `${day}/${month}/${year}`,
    formattedTime: `${hours}:${minutes}`
  };
}

function checkDepartureAdvance(dateStr, timeStr) {
  if (!dateStr || !timeStr) {
    return {
      isValid: false,
      message: 'Informe a data e o horário de saída da viagem.',
      minValid: getAdvanceDateTime(2)
    };
  }

  const selectedDate = new Date(`${dateStr}T${timeStr}:00`);
  const now = new Date();

  if (isNaN(selectedDate.getTime())) {
    return {
      isValid: false,
      message: 'Data ou horário com formato inválido.',
      minValid: getAdvanceDateTime(2)
    };
  }

  const diffMs = selectedDate.getTime() - now.getTime();
  const diffMinutes = Math.floor(diffMs / (60 * 1000));

  if (diffMinutes < 120) {
    const minValid = getAdvanceDateTime(2);
    const isToday = dateStr === new Date().toISOString().split('T')[0];
    
    let fixAdvice = '';
    if (isToday) {
      fixAdvice = `Para viagens hoje (${minValid.formattedDate}), o primeiro horário permitido é a partir das ${minValid.formattedTime}.`;
    } else {
      fixAdvice = `Selecione uma data/horário a partir das ${minValid.formattedTime} de ${minValid.formattedDate}.`;
    }

    return {
      isValid: false,
      diffMinutes,
      isToday,
      message: `A viagem precisa ser agendada com no mínimo 2 horas de antecedência. ${fixAdvice}`,
      minValid
    };
  }

  return {
    isValid: true,
    diffMinutes,
    minValid: getAdvanceDateTime(2)
  };
}

function validatePublishDepartureDateTime() {
  const dateInput = document.getElementById('pub-date');
  const timeInput = document.getElementById('pub-time');
  const container = document.getElementById('pub-datetime-feedback-container');
  if (!dateInput || !timeInput || !container) return;

  const dateVal = dateInput.value;
  const timeVal = timeInput.value;
  const check = checkDepartureAdvance(dateVal, timeVal);

  if (check.isValid) {
    container.innerHTML = `
      <div class="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 text-xs font-semibold text-emerald-950">
        <div class="flex items-center gap-2.5">
          ${icon('check_circle', { size: 'sm', className: 'text-emerald-700 shrink-0' })}
          <span>Horário confirmado com antecedência mínima de 2 horas garantida.</span>
        </div>
        <span class="text-[11px] font-bold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-md shrink-0">Válido</span>
      </div>
    `;
    dateInput.classList.remove('border-red-500', 'bg-red-50/20');
    timeInput.classList.remove('border-red-500', 'bg-red-50/20');
  } else {
    container.innerHTML = `
      <div class="p-3.5 bg-rose-50 border border-rose-300 rounded-xl space-y-2.5 text-xs font-semibold text-rose-950 animate-fade-in">
        <div class="flex items-start gap-2.5">
          ${icon('error', { size: 'sm', className: 'text-rose-700 shrink-0 mt-0.5' })}
          <div class="flex-1">
            <span class="font-bold block text-rose-900">Horário indisponível (menos de 2 horas de antecedência)</span>
            <span class="font-normal text-rose-800 mt-0.5 block leading-relaxed">${check.message}</span>
          </div>
        </div>
        <div class="flex items-center justify-end pt-1">
          <button
            type="button"
            onclick="applyMinValidDepartureTime()"
            class="px-3 py-1.5 bg-rose-900 hover:bg-black text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs active:scale-95"
          >
            ${icon('schedule', { size: 'sm' })}
            <span>Ajustar para ${check.minValid.formattedTime} (+2h)</span>
          </button>
        </div>
      </div>
    `;
    dateInput.classList.add('border-red-500', 'bg-red-50/20');
    timeInput.classList.add('border-red-500', 'bg-red-50/20');
  }
}

function applyMinValidDepartureTime() {
  const minValid = getAdvanceDateTime(2);
  const dateInput = document.getElementById('pub-date');
  const timeInput = document.getElementById('pub-time');
  if (dateInput) {
    dateInput.value = minValid.dateStr;
    publishWizardState.departureDate = minValid.dateStr;
  }
  if (timeInput) {
    timeInput.value = minValid.timeStr;
    publishWizardState.departureTime = minValid.timeStr;
  }
  validatePublishDepartureDateTime();
  showToast(`Horário ajustado para ${minValid.formattedTime} (${minValid.formattedDate}) com antecedência de 2 horas.`, 'success');
}

// Estado em memória do Wizard de Publicação
let publishWizardState = {
  step: 1, // 1: Trajeto, 2: Data/Hora, 3: Veículo/Vagas/Preço, 4: Volta (opcional), 5: Resumo
  originCity: 'Fortaleza, CE',
  originSpot: 'Shopping Iguatemi Bosque',
  destinationCity: 'Juazeiro do Norte, CE',
  destinationSpot: 'Cariri Garden Shopping',
  departureDate: getAdvanceDateTime(2).dateStr,
  departureTime: getAdvanceDateTime(2).timeStr,
  vehicleId: '',
  seats: 4,
  pricePerSeat: 75.00,
  hasReturn: false,
  returnDate: getAdvanceDateTime(6).dateStr,
  returnTime: getAdvanceDateTime(6).timeStr,
  returnSeats: 4,
  returnPrice: 75.00,
  notes: '',
  distanceKm: 490,
  duration: '6h 30m',
  priceMetrics: { suggested: 75, minPrice: 48, maxPrice: 105 }
};

function initPublishWizardState() {
  const driverVehicles = store.state.currentUser.vehicles || [];
  const primaryVeh = driverVehicles.find(v => v.isPrimary) || driverVehicles[0];
  
  if (!publishWizardState.vehicleId && primaryVeh) {
    publishWizardState.vehicleId = primaryVeh.id;
  }

  // Garantir que a data e horário de partida estejam sempre com pelo menos 2h de antecedência
  const currentDepCheck = checkDepartureAdvance(publishWizardState.departureDate, publishWizardState.departureTime);
  if (!currentDepCheck.isValid) {
    const minValid = getAdvanceDateTime(2);
    publishWizardState.departureDate = minValid.dateStr;
    publishWizardState.departureTime = minValid.timeStr;
  }
  
  const metrics = getRouteMetrics(publishWizardState.originCity, publishWizardState.destinationCity);
  publishWizardState.distanceKm = metrics.distanceKm;
  publishWizardState.duration = metrics.duration;
  publishWizardState.priceMetrics = calculateSmartPrice(metrics.distanceKm);
  if (!publishWizardState.pricePerSeat || publishWizardState.pricePerSeat === 75) {
    publishWizardState.pricePerSeat = publishWizardState.priceMetrics.suggested;
    publishWizardState.returnPrice = publishWizardState.priceMetrics.suggested;
  }
}

function updatePublishRouteMetrics() {
  const originCity = document.getElementById('pub-origin-city')?.value || publishWizardState.originCity;
  const destinationCity = document.getElementById('pub-dest-city')?.value || publishWizardState.destinationCity;
  
  const metrics = getRouteMetrics(originCity, destinationCity);
  publishWizardState.distanceKm = metrics.distanceKm;
  publishWizardState.duration = metrics.duration;
  publishWizardState.priceMetrics = calculateSmartPrice(metrics.distanceKm);

  // Atualizar estimativa no DOM se visível
  const metricEl = document.getElementById('pub-route-metrics-preview');
  if (metricEl) {
    metricEl.innerHTML = `
      <div class="flex items-center gap-4 text-xs font-semibold text-uber-charcoal">
        <span class="flex items-center gap-1">${icon('straighten', { size: 'sm', className: 'text-uber-black' })} ${metrics.distanceKm} km estimados</span>
        <span>•</span>
        <span class="flex items-center gap-1">${icon('schedule', { size: 'sm', className: 'text-uber-black' })} ~${metrics.duration} de viagem</span>
      </div>
    `;
  }
}

function setPublishWizardStep(newStep) {
  // Validações antes de avançar
  if (newStep > publishWizardState.step) {
    if (publishWizardState.step === 1) {
      const orig = document.getElementById('pub-origin-city')?.value?.trim();
      const origSpot = document.getElementById('pub-origin-spot')?.value?.trim();
      const dest = document.getElementById('pub-dest-city')?.value?.trim();
      const destSpot = document.getElementById('pub-dest-spot')?.value?.trim();

      if (!orig || !dest) {
        showToast('Informe a cidade de partida e a cidade de destino.', 'error');
        return;
      }
      if (orig.toLowerCase() === dest.toLowerCase()) {
        showToast('A cidade de partida e de destino não podem ser iguais.', 'error');
        return;
      }

      publishWizardState.originCity = orig;
      publishWizardState.originSpot = origSpot || 'Centro / Ponto principal';
      publishWizardState.destinationCity = dest;
      publishWizardState.destinationSpot = destSpot || 'Centro / Desembarque';

      const metrics = getRouteMetrics(orig, dest);
      publishWizardState.distanceKm = metrics.distanceKm;
      publishWizardState.duration = metrics.duration;
      publishWizardState.priceMetrics = calculateSmartPrice(metrics.distanceKm);
      publishWizardState.pricePerSeat = publishWizardState.priceMetrics.suggested;
      publishWizardState.returnPrice = publishWizardState.priceMetrics.suggested;
    }

    if (publishWizardState.step === 2) {
      const depDate = document.getElementById('pub-date')?.value;
      const depTime = document.getElementById('pub-time')?.value;

      const advanceCheck = checkDepartureAdvance(depDate, depTime);
      if (!advanceCheck.isValid) {
        showToast(advanceCheck.message, 'error');
        validatePublishDepartureDateTime();
        return;
      }

      publishWizardState.departureDate = depDate;
      publishWizardState.departureTime = depTime;
    }

    if (publishWizardState.step === 3) {
      const seats = parseInt(document.getElementById('pub-seats')?.value, 10) || 4;
      const price = parseFloat(document.getElementById('pub-price')?.value) || publishWizardState.priceMetrics.suggested;
      const vehId = document.getElementById('pub-selected-vehicle-id')?.value || publishWizardState.vehicleId;

      if (!vehId) {
        showToast('Selecione um veículo cadastrado para realizar a viagem.', 'error');
        return;
      }

      const { minPrice, maxPrice } = publishWizardState.priceMetrics;
      if (price < minPrice || price > maxPrice) {
        showToast(`O valor deve estar entre R$ ${minPrice.toFixed(2)} e R$ ${maxPrice.toFixed(2)}.`, 'error');
        return;
      }

      publishWizardState.seats = seats;
      publishWizardState.pricePerSeat = price;
      publishWizardState.vehicleId = vehId;
      publishWizardState.returnSeats = seats;
      publishWizardState.returnPrice = price;
    }

    if (publishWizardState.step === 4) {
      const hasRet = document.getElementById('pub-has-return')?.checked || false;
      publishWizardState.hasReturn = hasRet;

      if (hasRet) {
        const retDate = document.getElementById('pub-return-date')?.value;
        const retTime = document.getElementById('pub-return-time')?.value;
        const retPrice = parseFloat(document.getElementById('pub-return-price')?.value) || publishWizardState.pricePerSeat;
        const retSeats = parseInt(document.getElementById('pub-return-seats')?.value, 10) || publishWizardState.seats;

        if (!retDate || !retTime) {
          showToast('Informe a data e o horário da viagem de volta.', 'error');
          return;
        }

        const goDate = new Date(`${publishWizardState.departureDate}T${publishWizardState.departureTime}:00`);
        const backDate = new Date(`${retDate}T${retTime}:00`);

        if (backDate <= goDate) {
          showToast('A volta deve ser em data e horário posteriores à viagem de ida.', 'error');
          return;
        }

        publishWizardState.returnDate = retDate;
        publishWizardState.returnTime = retTime;
        publishWizardState.returnPrice = retPrice;
        publishWizardState.returnSeats = retSeats;
      }
    }
  }

  publishWizardState.step = Math.max(1, Math.min(5, newStep));
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleSelectPublishVehicle(vehId) {
  publishWizardState.vehicleId = vehId;
  const input = document.getElementById('pub-selected-vehicle-id');
  if (input) input.value = vehId;

  // Atualizar visual dos cartões de veículos
  document.querySelectorAll('.pub-vehicle-card').forEach(card => {
    const isSelected = card.getAttribute('data-veh-id') === vehId;
    if (isSelected) {
      card.classList.add('ring-2', 'ring-black', 'border-black', 'bg-neutral-50');
      card.classList.remove('border-uber-border', 'bg-white');
    } else {
      card.classList.remove('ring-2', 'ring-black', 'border-black', 'bg-neutral-50');
      card.classList.add('border-uber-border', 'bg-white');
    }
  });
}

function adjustPublishPrice(delta) {
  const input = document.getElementById('pub-price');
  if (!input) return;
  const current = parseFloat(input.value) || publishWizardState.priceMetrics.suggested;
  const { minPrice, maxPrice } = publishWizardState.priceMetrics;
  const updated = Math.max(minPrice, Math.min(maxPrice, current + delta));
  input.value = updated.toFixed(2);
  publishWizardState.pricePerSeat = updated;
  updatePublishPriceBadge(updated);
}

function updatePublishPriceBadge(value) {
  const badge = document.getElementById('pub-price-indicator-badge');
  if (!badge) return;
  const { suggested, minPrice, maxPrice } = publishWizardState.priceMetrics;
  
  if (value < suggested) {
    badge.className = 'text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md inline-flex items-center gap-1';
    badge.innerHTML = `${icon('trending_down', { size: 'sm' })} Tarifa Econômica (Abaixo da média recomendada)`;
  } else if (value === suggested) {
    badge.className = 'text-[11px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md inline-flex items-center gap-1';
    badge.innerHTML = `${icon('verified', { size: 'sm' })} Preço Ideal Recomendado (Excelente adesão)`;
  } else {
    badge.className = 'text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md inline-flex items-center gap-1';
    badge.innerHTML = `${icon('trending_up', { size: 'sm' })} Tarifa Superior (Próxima do teto permitido)`;
  }
}

function togglePublishReturn(checked) {
  publishWizardState.hasReturn = checked;
  const container = document.getElementById('pub-return-details-container');
  if (container) {
    if (checked) {
      container.classList.remove('hidden');
    } else {
      container.classList.add('hidden');
    }
  }
}

function calcArrivalTime(depTime, durationStr) {
  if (!depTime || !durationStr) return undefined;
  const [depH, depM] = depTime.split(':').map(Number);
  let addH = 0;
  let addM = 0;
  const hMatch = durationStr.match(/(\d+)\s*h/);
  if (hMatch) addH = parseInt(hMatch[1], 10);
  const mMatch = durationStr.match(/(\d+)\s*m/);
  if (mMatch) addM = parseInt(mMatch[1], 10);
  
  let newM = depM + addM;
  let carryH = Math.floor(newM / 60);
  newM = newM % 60;
  let newH = (depH + addH + carryH) % 24;
  return `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`;
}

function handleFinishPublishRide() {
  const notes = document.getElementById('pub-final-notes')?.value?.trim() || '';
  publishWizardState.notes = notes;

  const driverVehicles = store.state.currentUser.vehicles || [];
  const selectedVeh = driverVehicles.find(v => v.id === publishWizardState.vehicleId) || store.state.currentUser.vehicle || {
    brand: 'Toyota',
    model: 'Corolla 2.0',
    color: 'prata',
    plate: 'CE-FOR-2023',
    year: 2023,
    hasAC: true,
    hasUSB: true,
  };

  const arrTimeIda = calcArrivalTime(publishWizardState.departureTime, publishWizardState.duration);

  // 1. Criar Viagem de Ida
  store.addRide({
    originCity: publishWizardState.originCity,
    originSpot: publishWizardState.originSpot,
    destinationCity: publishWizardState.destinationCity,
    destinationSpot: publishWizardState.destinationSpot,
    departureDate: publishWizardState.departureDate,
    departureTime: publishWizardState.departureTime,
    estimatedDuration: publishWizardState.duration,
    estimatedArrivalTime: arrTimeIda,
    pricePerSeat: publishWizardState.pricePerSeat,
    totalSeats: publishWizardState.seats,
    availableSeats: publishWizardState.seats,
    luggagePolicy: selectedVeh.luggagePolicy || '1_MEDIUM',
    vehicle: selectedVeh,
    notes: publishWizardState.notes || 'Saída pontual no local combinado.',
    status: 'PUBLISHED',
  });

  // 2. Criar Viagem de Volta se solicitada
  if (publishWizardState.hasReturn) {
    const arrTimeVolta = calcArrivalTime(publishWizardState.returnTime, publishWizardState.duration);
    store.addRide({
      originCity: publishWizardState.destinationCity,
      originSpot: publishWizardState.destinationSpot,
      destinationCity: publishWizardState.originCity,
      destinationSpot: publishWizardState.originSpot,
      departureDate: publishWizardState.returnDate,
      departureTime: publishWizardState.returnTime,
      estimatedDuration: publishWizardState.duration,
      estimatedArrivalTime: arrTimeVolta,
      pricePerSeat: publishWizardState.returnPrice,
      totalSeats: publishWizardState.returnSeats,
      availableSeats: publishWizardState.returnSeats,
      luggagePolicy: selectedVeh.luggagePolicy || '1_MEDIUM',
      vehicle: selectedVeh,
      notes: (publishWizardState.notes ? `${publishWizardState.notes} • ` : '') + 'Viagem de retorno.',
      status: 'PUBLISHED',
    });
  }

  // Som de feedback e Toast
  if (typeof SoundEngine !== 'undefined') SoundEngine.play('success');
  
  if (publishWizardState.hasReturn) {
    showToast('Viagens de Ida e Volta publicadas com sucesso!', 'success');
  } else {
    showToast('Viagem cadastrada e publicada com sucesso!', 'success');
  }

  // Reset do Wizard
  publishWizardState.step = 1;
  publishWizardState.hasReturn = false;

  window.location.hash = '#/minhas-viagens';
}

// View Principal: Publicar Viagem Step-by-Step
function viewPublishRide() {
  const role = store.state.role;

  if (role !== 'DRIVER') {
    return `
      <div class="max-w-md mx-auto py-16 px-4 text-center animate-fade-in">
        <div class="w-14 h-14 bg-uber-gray text-uber-black rounded-xl flex items-center justify-center mx-auto mb-3">
          ${icon('lock', { size: 'lg' })}
        </div>
        <h2 class="text-xl font-bold text-uber-black">Acesso Restrito ao Motorista</h2>
        <p class="text-uber-iron text-xs sm:text-sm font-normal mt-1 mb-5 leading-relaxed">
          Apenas motoristas cadastrados e verificados podem publicar rotas na Cooperativa.
        </p>
        <a href="#/" class="inline-block w-full h-11 py-2.5 bg-black text-white font-bold rounded-xl text-sm transition-transform active:scale-98">
          Voltar para o Início
        </a>
      </div>
    `;
  }

  initPublishWizardState();
  const driverVehicles = store.state.currentUser.vehicles || [];
  const currentStep = publishWizardState.step;

  const stepTitles = [
    '1. Trajeto da Viagem',
    '2. Data e Horário',
    '3. Veículo e Preço',
    '4. Viagem de Volta',
    '5. Resumo e Publicação'
  ];

  return `
    ${renderDatalists()}
    <div class="max-w-2xl mx-auto px-4 py-6 text-left pb-28 md:pb-16 animate-fade-in">
      
      <!-- Top Navigation & Stepper Header -->
      <div class="mb-6">
        <div class="flex items-center justify-between gap-3 mb-3">
          <button
            type="button"
            onclick="${currentStep === 1 ? 'window.history.back()' : `setPublishWizardStep(${currentStep - 1})`}"
            class="inline-flex items-center gap-1.5 text-xs font-bold text-uber-black hover:text-uber-iron transition-colors cursor-pointer"
          >
            ${icon('arrow_back', { size: 'sm' })}
            <span>${currentStep === 1 ? 'Voltar' : 'Etapa Anterior'}</span>
          </button>
          <span class="text-xs font-bold uppercase tracking-wider text-uber-iron bg-uber-gray px-2.5 py-1 rounded-md border border-uber-border">
            Etapa ${currentStep} de 5
          </span>
        </div>

        <h1 class="text-xl sm:text-2xl font-extrabold text-uber-black leading-tight">${stepTitles[currentStep - 1]}</h1>
        <p class="text-xs sm:text-sm text-uber-iron mt-0.5">
          ${currentStep === 1 ? 'Defina a rota de partida e chegada no Nordeste.' : ''}
          ${currentStep === 2 ? 'Defina a data e o horário programado para saída.' : ''}
          ${currentStep === 3 ? 'Escolha o carro, número de passageiros e o valor da vaga.' : ''}
          ${currentStep === 4 ? 'Deseja também agendar o retorno no sentido inverso?' : ''}
          ${currentStep === 5 ? 'Confira todos os dados antes de publicar na Cooperativa.' : ''}
        </p>

        <!-- Visual Progress Bar (Step-by-Step) -->
        <div class="w-full bg-uber-gray h-2 rounded-md overflow-hidden mt-4 border border-uber-border">
          <div class="bg-black h-full transition-all duration-300 rounded-md" style="width: ${(currentStep / 5) * 100}%"></div>
        </div>
      </div>

      <!-- STEP 1: TRAJETO -->
      ${currentStep === 1 ? `
        <div class="p-4 sm:p-6 border border-uber-border bg-white rounded-xl shadow-xs space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
            
            <!-- Cidade de Partida (Origem) -->
            <div class="min-w-0 w-full pub-autocomplete-container relative overflow-visible">
              <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1">Cidade de Partida (Origem)</label>
              <div class="flex items-center gap-2.5 px-3.5 h-12 bg-uber-gray rounded-xl border border-transparent focus-within:border-uber-black focus-within:bg-white transition-all">
                <div class="w-2.5 h-2.5 rounded-full bg-uber-black shrink-0"></div>
                <input
                  id="pub-origin-city"
                  type="text"
                  autocomplete="off"
                  required
                  value="${publishWizardState.originCity}"
                  placeholder="Cidade de partida"
                  onfocus="handlePublishCityFocus('pub-origin-city', 'pub-origin-city-dropdown', 'origin')"
                  oninput="handlePublishCityInput('pub-origin-city', 'pub-origin-city-dropdown', 'origin')"
                  class="w-full bg-transparent font-semibold text-uber-black focus:outline-none text-sm placeholder-uber-iron truncate"
                />
              </div>
              <div id="pub-origin-city-dropdown" class="pub-autocomplete-dropdown hidden absolute top-full left-0 right-0 mt-1 bg-white border border-uber-border rounded-xl shadow-2xl z-[100] max-h-60 overflow-y-auto divide-y divide-uber-gray"></div>
            </div>

            <!-- Ponto de Encontro -->
            <div class="min-w-0 w-full pub-autocomplete-container relative overflow-visible">
              <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1">Ponto de Encontro</label>
              <div class="flex items-center gap-2.5 px-3.5 h-12 bg-uber-gray rounded-xl border border-transparent focus-within:border-uber-black focus-within:bg-white transition-all">
                <div class="text-uber-black shrink-0">${icon('pin_drop', { size: 'sm' })}</div>
                <input
                  id="pub-origin-spot"
                  type="text"
                  autocomplete="off"
                  required
                  value="${publishWizardState.originSpot}"
                  placeholder="Ponto de encontro (Ex: Shopping / Rodoviária)"
                  onfocus="handlePublishSpotFocus('pub-origin-spot', 'pub-origin-spot-dropdown', 'origin')"
                  oninput="handlePublishSpotInput('pub-origin-spot', 'pub-origin-spot-dropdown', 'origin')"
                  class="w-full bg-transparent font-semibold text-uber-black focus:outline-none text-sm placeholder-uber-iron truncate"
                />
              </div>
              <div id="pub-origin-spot-dropdown" class="pub-autocomplete-dropdown hidden absolute top-full left-0 right-0 mt-1 bg-white border border-uber-border rounded-xl shadow-2xl z-[100] max-h-60 overflow-y-auto divide-y divide-uber-gray"></div>
            </div>
          </div>

          <!-- Inverter Trajeto Button (Apenas Ícone) -->
          <div class="flex items-center justify-center -my-1">
            <button
              type="button"
              onclick="swapPublishCities()"
              title="Inverter Origem e Destino"
              aria-label="Inverter Origem e Destino"
              class="w-9 h-9 text-uber-black bg-uber-gray hover:bg-neutral-200 border border-uber-border rounded-lg flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              ${icon('swap_vert', { size: 'sm', className: 'text-uber-black' })}
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
            
            <!-- Cidade de Destino (Chegada) -->
            <div class="min-w-0 w-full pub-autocomplete-container relative overflow-visible">
              <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1">Cidade de Destino (Chegada)</label>
              <div class="flex items-center gap-2.5 px-3.5 h-12 bg-uber-gray rounded-xl border border-transparent focus-within:border-uber-black focus-within:bg-white transition-all">
                <div class="w-2.5 h-2.5 bg-uber-black shrink-0"></div>
                <input
                  id="pub-dest-city"
                  type="text"
                  autocomplete="off"
                  required
                  value="${publishWizardState.destinationCity}"
                  placeholder="Cidade de destino"
                  onfocus="handlePublishCityFocus('pub-dest-city', 'pub-dest-city-dropdown', 'dest')"
                  oninput="handlePublishCityInput('pub-dest-city', 'pub-dest-city-dropdown', 'dest')"
                  class="w-full bg-transparent font-semibold text-uber-black focus:outline-none text-sm placeholder-uber-iron truncate"
                />
              </div>
              <div id="pub-dest-city-dropdown" class="pub-autocomplete-dropdown hidden absolute top-full left-0 right-0 mt-1 bg-white border border-uber-border rounded-xl shadow-2xl z-[100] max-h-60 overflow-y-auto divide-y divide-uber-gray"></div>
            </div>

            <!-- Ponto de Desembarque (Padronizado com pin_drop) -->
            <div class="min-w-0 w-full pub-autocomplete-container relative overflow-visible">
              <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1">Ponto de Desembarque</label>
              <div class="flex items-center gap-2.5 px-3.5 h-12 bg-uber-gray rounded-xl border border-transparent focus-within:border-uber-black focus-within:bg-white transition-all">
                <div class="text-uber-black shrink-0">${icon('pin_drop', { size: 'sm' })}</div>
                <input
                  id="pub-dest-spot"
                  type="text"
                  autocomplete="off"
                  required
                  value="${publishWizardState.destinationSpot}"
                  placeholder="Ponto de desembarque (Ex: Shopping / Centro)"
                  onfocus="handlePublishSpotFocus('pub-dest-spot', 'pub-dest-spot-dropdown', 'dest')"
                  oninput="handlePublishSpotInput('pub-dest-spot', 'pub-dest-spot-dropdown', 'dest')"
                  class="w-full bg-transparent font-semibold text-uber-black focus:outline-none text-sm placeholder-uber-iron truncate"
                />
              </div>
              <div id="pub-dest-spot-dropdown" class="pub-autocomplete-dropdown hidden absolute top-full left-0 right-0 mt-1 bg-white border border-uber-border rounded-xl shadow-2xl z-[100] max-h-60 overflow-y-auto divide-y divide-uber-gray"></div>
            </div>
          </div>

          <!-- Dynamic Route Metrics Card -->
          <div id="pub-route-metrics-preview" class="p-3.5 bg-uber-gray border border-uber-border rounded-xl">
            <div class="flex items-center gap-3 text-xs font-semibold text-uber-charcoal flex-wrap">
              <span class="flex items-center gap-1">${icon('straighten', { size: 'sm', className: 'text-uber-black' })} ${publishWizardState.distanceKm} km estimados</span>
              <span>•</span>
              <span class="flex items-center gap-1">${icon('schedule', { size: 'sm', className: 'text-uber-black' })} ~${publishWizardState.duration} de viagem</span>
            </div>
          </div>

          <div class="pt-2">
            <button
              type="button"
              onclick="setPublishWizardStep(2)"
              class="w-full h-12 bg-black hover:bg-neutral-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 active:scale-98 shadow-md transition-all cursor-pointer"
            >
              <span>Continuar para Data e Horário</span>
              ${icon('arrow_forward', { size: 'sm' })}
            </button>
          </div>
        </div>
      ` : ''}

      <!-- STEP 2: DATA E HORÁRIO -->
      ${currentStep === 2 ? (() => {
        const check = checkDepartureAdvance(publishWizardState.departureDate, publishWizardState.departureTime);
        return `
        <div class="p-4 sm:p-6 border border-uber-border bg-white rounded-xl shadow-xs space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
            <div class="min-w-0 w-full">
              <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1">Data da Viagem</label>
              <input
                id="pub-date"
                type="date"
                required
                min="${new Date().toISOString().split('T')[0]}"
                value="${publishWizardState.departureDate}"
                oninput="validatePublishDepartureDateTime()"
                onchange="validatePublishDepartureDateTime()"
                class="w-full max-w-full box-border bg-uber-gray border ${check.isValid ? 'border-transparent' : 'border-red-500 bg-red-50/20'} focus:border-uber-black focus:bg-white text-sm font-semibold rounded-xl h-12 px-3.5 sm:px-4 focus:outline-none cursor-pointer transition-all"
              />
            </div>
            <div class="min-w-0 w-full">
              <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1">Horário de Saída</label>
              <input
                id="pub-time"
                type="time"
                required
                value="${publishWizardState.departureTime}"
                oninput="validatePublishDepartureDateTime()"
                onchange="validatePublishDepartureDateTime()"
                class="w-full max-w-full box-border bg-uber-gray border ${check.isValid ? 'border-transparent' : 'border-red-500 bg-red-50/20'} focus:border-uber-black focus:bg-white text-sm font-semibold rounded-xl h-12 px-3.5 sm:px-4 focus:outline-none cursor-pointer transition-all"
              />
            </div>
          </div>

          <!-- Dynamic 2-Hour Advance Feedback Container -->
          <div id="pub-datetime-feedback-container">
            ${check.isValid ? `
              <div class="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 text-xs font-semibold text-emerald-950">
                <div class="flex items-center gap-2.5">
                  ${icon('check_circle', { size: 'sm', className: 'text-emerald-700 shrink-0' })}
                  <span>Horário confirmado com antecedência mínima de 2 horas garantida.</span>
                </div>
                <span class="text-[11px] font-bold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-md shrink-0">Válido</span>
              </div>
            ` : `
              <div class="p-3.5 bg-rose-50 border border-rose-300 rounded-xl space-y-2.5 text-xs font-semibold text-rose-950 animate-fade-in">
                <div class="flex items-start gap-2.5">
                  ${icon('error', { size: 'sm', className: 'text-rose-700 shrink-0 mt-0.5' })}
                  <div class="flex-1">
                    <span class="font-bold block text-rose-900">Horário indisponível (menos de 2 horas de antecedência)</span>
                    <span class="font-normal text-rose-800 mt-0.5 block leading-relaxed">${check.message}</span>
                  </div>
                </div>
                <div class="flex items-center justify-end pt-1">
                  <button
                    type="button"
                    onclick="applyMinValidDepartureTime()"
                    class="px-3 py-1.5 bg-rose-900 hover:bg-black text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs active:scale-95"
                  >
                    ${icon('schedule', { size: 'sm' })}
                    <span>Ajustar para ${check.minValid.formattedTime} (+2h)</span>
                  </button>
                </div>
              </div>
            `}
          </div>

          <div class="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
            <button
              type="button"
              onclick="setPublishWizardStep(1)"
              class="w-full sm:w-1/3 h-12 border border-uber-border hover:bg-uber-gray text-uber-black font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Voltar
            </button>
            <button
              type="button"
              onclick="setPublishWizardStep(3)"
              class="w-full sm:w-2/3 h-12 bg-black hover:bg-neutral-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 active:scale-98 shadow-md transition-all cursor-pointer"
            >
              <span>Continuar para Veículo e Preço</span>
              ${icon('arrow_forward', { size: 'sm' })}
            </button>
          </div>
        </div>
      `;
    })() : ''}

      <!-- STEP 3: VEÍCULO, VAGAS E PRECIFICAÇÃO INTELIGENTE -->
      ${currentStep === 3 ? `
        <div class="p-4 sm:p-6 border border-uber-border bg-white rounded-xl shadow-xs space-y-5">
          
          <!-- Seletor de Carro Cadastrado -->
          <div>
            <div class="flex items-center justify-between pb-2 mb-2 border-b border-uber-border">
              <label class="block text-xs font-bold text-uber-black uppercase tracking-wider">Selecione o Veículo</label>
              <button
                type="button"
                onclick="openVehicleModal()"
                class="text-xs font-bold text-black underline flex items-center gap-1 cursor-pointer"
              >
                ${icon('add', { size: 'sm' })}
                <span>Cadastrar Outro Carro</span>
              </button>
            </div>

            <input type="hidden" id="pub-selected-vehicle-id" value="${publishWizardState.vehicleId}" />

            ${driverVehicles.length === 0 ? `
              <div class="p-4 bg-uber-gray border border-dashed border-uber-border rounded-xl text-center">
                <p class="text-xs text-uber-iron">Nenhum veículo cadastrado no seu perfil.</p>
                <button
                  type="button"
                  onclick="openVehicleModal()"
                  class="mt-2 px-4 py-2 bg-black text-white text-xs font-bold rounded-lg"
                >
                  Cadastrar Veículo Agora
                </button>
              </div>
            ` : `
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                ${driverVehicles.map(veh => {
                  const isSelected = veh.id === publishWizardState.vehicleId;
                  const colorObj = getVehicleColorObj(veh.color);
                  return `
                    <div
                      data-veh-id="${veh.id}"
                      onclick="handleSelectPublishVehicle('${veh.id}')"
                      class="pub-vehicle-card p-3 rounded-xl border flex items-center gap-3.5 cursor-pointer transition-all ${isSelected ? 'ring-2 ring-black border-black bg-neutral-50' : 'border-uber-border bg-white hover:bg-neutral-50'}"
                    >
                      <div class="w-16 h-12 flex items-center justify-center shrink-0">
                        <img src="${getVehicleImage(veh)}" alt="${veh.brand} ${veh.model}" class="w-full h-full object-contain drop-shadow-2xs" />
                      </div>
                      <div class="min-w-0 flex-1">
                        <div class="flex items-center justify-between gap-1">
                          <span class="font-bold text-xs text-uber-black truncate">${veh.brand} ${veh.model}</span>
                          ${isSelected ? `<span class="text-black font-bold text-xs">${icon('check_circle', { size: 'sm' })}</span>` : ''}
                        </div>
                        <div class="flex items-center gap-1.5 text-[11px] text-uber-iron mt-0.5 flex-wrap">
                          <span class="font-mono font-semibold">${veh.plate}</span>
                          <span>•</span>
                          <span class="inline-flex items-center gap-1">
                            <span class="w-2 h-2 rounded-xs border ${colorObj.border}" style="background-color: ${colorObj.hex}"></span>
                            <span>${colorObj.name}</span>
                          </span>
                          ${veh.noSmoking ? `<span title="Cigarro não" class="inline-flex items-center text-uber-charcoal">${icon('smoke_free', { size: 'sm' })}</span>` : ''}
                          ${veh.noPets ? `<span title="Sem animais" class="inline-flex items-center text-uber-charcoal">${icon('pets', { size: 'sm' })}</span>` : ''}
                          <span title="${getLuggageInfo(veh).label}" class="inline-flex items-center text-uber-charcoal">${icon(getLuggageInfo(veh).iconName, { size: 'sm' })}</span>
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            `}
          </div>

          <!-- Vagas Disponíveis -->
          <div>
            <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1.5">Vagas Disponíveis para Passageiros</label>
            <select
              id="pub-seats"
              class="w-full max-w-full box-border bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-uber-black font-bold text-sm rounded-xl h-12 px-3.5 sm:px-4 focus:outline-none cursor-pointer transition-all"
            >
              ${[1, 2, 3, 4, 5, 6, 7].map(num => `
                <option value="${num}" ${num === publishWizardState.seats ? 'selected' : ''}>
                  ${num} ${num === 1 ? 'passageiro' : 'passageiros'}
                </option>
              `).join('')}
            </select>
          </div>

          <!-- Precificação Inteligente por Distância (Uber & BlaBlaCar Style) -->
          <div class="p-4 bg-uber-gray border border-uber-border rounded-xl space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-uber-border">
              <div class="flex items-center gap-2">
                ${icon('payments', { size: 'sm', className: 'text-uber-black' })}
                <span class="text-xs font-bold text-uber-black uppercase tracking-wider">Valor por Passageiro</span>
              </div>
              <span class="text-[11px] font-semibold text-uber-iron">
                Distância: ~${publishWizardState.distanceKm} km
              </span>
            </div>

            <!-- Preço Recomendado & Controles de Ajuste -->
            <div class="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <span class="text-[11px] text-uber-iron block font-medium">Faixa permitida para esta rota:</span>
                <span class="text-xs font-bold text-uber-black">
                  R$ ${publishWizardState.priceMetrics.minPrice.toFixed(2)} a R$ ${publishWizardState.priceMetrics.maxPrice.toFixed(2)}
                </span>
              </div>

              <!-- Stepper Controls de Preço -->
              <div class="flex items-center gap-1.5 bg-white border border-uber-border rounded-xl p-1 shadow-2xs">
                <button
                  type="button"
                  onclick="adjustPublishPrice(-5)"
                  title="Diminuir R$ 5,00"
                  class="w-9 h-9 flex items-center justify-center bg-uber-gray hover:bg-neutral-200 text-uber-black font-bold rounded-lg transition-colors cursor-pointer"
                >
                  ${icon('remove', { size: 'sm' })}
                </button>

                <div class="flex items-center px-2">
                  <span class="text-xs font-bold text-uber-iron mr-1">R$</span>
                  <input
                    id="pub-price"
                    type="number"
                    step="1.00"
                    min="${publishWizardState.priceMetrics.minPrice}"
                    max="${publishWizardState.priceMetrics.maxPrice}"
                    value="${publishWizardState.pricePerSeat.toFixed(2)}"
                    onchange="adjustPublishPrice(0)"
                    class="w-16 font-extrabold text-base text-uber-black text-center bg-transparent focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onclick="adjustPublishPrice(5)"
                  title="Aumentar R$ 5,00"
                  class="w-9 h-9 flex items-center justify-center bg-uber-gray hover:bg-neutral-200 text-uber-black font-bold rounded-lg transition-colors cursor-pointer"
                >
                  ${icon('add', { size: 'sm' })}
                </button>
              </div>
            </div>

            <!-- Indicator Badge de Precificação -->
            <div id="pub-price-indicator-badge" class="text-[11px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md inline-flex items-center gap-1">
              ${icon('verified', { size: 'sm' })} Preço Ideal Recomendado (Excelente adesão)
            </div>
          </div>

          <div class="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
            <button
              type="button"
              onclick="setPublishWizardStep(2)"
              class="w-full sm:w-1/3 h-12 border border-uber-border hover:bg-uber-gray text-uber-black font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Voltar
            </button>
            <button
              type="button"
              onclick="setPublishWizardStep(4)"
              class="w-full sm:w-2/3 h-12 bg-black hover:bg-neutral-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 active:scale-98 shadow-md transition-all cursor-pointer"
            >
              <span>Continuar para Viagem de Volta</span>
              ${icon('arrow_forward', { size: 'sm' })}
            </button>
          </div>
        </div>
      ` : ''}

      <!-- STEP 4: VIAGEM DE VOLTA (OPCIONAL) -->
      ${currentStep === 4 ? `
        <div class="p-4 sm:p-6 border border-uber-border bg-white rounded-xl shadow-xs space-y-4">
          
          <div class="p-4 bg-uber-gray border border-uber-border rounded-xl">
            <label class="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                id="pub-has-return"
                ${publishWizardState.hasReturn ? 'checked' : ''}
                onchange="togglePublishReturn(this.checked)"
                class="w-5 h-5 mt-0.5 rounded text-black focus:ring-black cursor-pointer shrink-0"
              />
              <div class="min-w-0 flex-1">
                <span class="font-bold text-sm text-uber-black block">Desejo cadastrar também a viagem de volta</span>
                <span class="text-xs text-uber-iron block mt-0.5 leading-relaxed break-words">
                  O trajeto contrário (${publishWizardState.destinationCity} ➔ ${publishWizardState.originCity}) será publicado automaticamente no mesmo anúncio.
                </span>
              </div>
            </label>
          </div>

          <!-- Return Trip Details (Conditional) -->
          <div id="pub-return-details-container" class="${publishWizardState.hasReturn ? '' : 'hidden'} space-y-3.5 pt-1 w-full max-w-full overflow-hidden">
            <div class="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-semibold text-uber-black flex items-center gap-2">
              ${icon('sync_alt', { size: 'sm', className: 'text-uber-black shrink-0' })}
              <span class="break-words">Percurso da Volta: <strong>${publishWizardState.destinationCity}</strong> ➔ <strong>${publishWizardState.originCity}</strong></span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
              <div class="min-w-0 w-full">
                <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1">Data de Retorno</label>
                <input
                  id="pub-return-date"
                  type="date"
                  min="${publishWizardState.departureDate}"
                  value="${publishWizardState.returnDate}"
                  class="w-full max-w-full box-border bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-sm font-semibold rounded-xl h-12 px-3.5 sm:px-4 focus:outline-none cursor-pointer transition-all"
                />
              </div>
              <div class="min-w-0 w-full">
                <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1">Horário de Saída (Volta)</label>
                <input
                  id="pub-return-time"
                  type="time"
                  value="${publishWizardState.returnTime}"
                  class="w-full max-w-full box-border bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-sm font-semibold rounded-xl h-12 px-3.5 sm:px-4 focus:outline-none cursor-pointer transition-all"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
              <div class="min-w-0 w-full">
                <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1">Vagas na Volta</label>
                <select
                  id="pub-return-seats"
                  class="w-full max-w-full box-border bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-uber-black font-bold text-sm rounded-xl h-12 px-3.5 sm:px-4 focus:outline-none cursor-pointer transition-all"
                >
                  ${[1, 2, 3, 4, 5, 6, 7].map(num => `
                    <option value="${num}" ${num === publishWizardState.returnSeats ? 'selected' : ''}>
                      ${num} ${num === 1 ? 'passageiro' : 'passageiros'}
                    </option>
                  `).join('')}
                </select>
              </div>
              <div class="min-w-0 w-full">
                <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1">Valor na Volta (R$)</label>
                <input
                  id="pub-return-price"
                  type="number"
                  step="1.00"
                  value="${publishWizardState.returnPrice.toFixed(2)}"
                  class="w-full max-w-full box-border bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-sm font-bold rounded-xl h-12 px-3.5 sm:px-4 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div class="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
            <button
              type="button"
              onclick="setPublishWizardStep(3)"
              class="w-full sm:w-1/3 h-12 border border-uber-border hover:bg-uber-gray text-uber-black font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Voltar
            </button>
            <button
              type="button"
              onclick="setPublishWizardStep(5)"
              class="w-full sm:w-2/3 h-12 bg-black hover:bg-neutral-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 active:scale-98 shadow-md transition-all cursor-pointer"
            >
              <span>Revisar e Publicar</span>
              ${icon('arrow_forward', { size: 'sm' })}
            </button>
          </div>
        </div>
      ` : ''}

      <!-- STEP 5: RESUMO E CONFIRMAÇÃO FINAL -->
      ${currentStep === 5 ? (() => {
        const driverVehicles = store.state.currentUser.vehicles || [];
        const veh = driverVehicles.find(v => v.id === publishWizardState.vehicleId) || store.state.currentUser.vehicle || {};
        const colorObj = getVehicleColorObj(veh.color);
        const maxEarningsOut = publishWizardState.pricePerSeat * publishWizardState.seats;
        const maxEarningsReturn = publishWizardState.hasReturn ? (publishWizardState.returnPrice * publishWizardState.returnSeats) : 0;
        const totalPotential = maxEarningsOut + maxEarningsReturn;

        return `
          <div class="p-4 sm:p-6 border border-uber-border bg-white rounded-xl shadow-xs space-y-4">
            
            <!-- Summary Header Card -->
            <div class="p-4 bg-uber-gray border border-uber-border rounded-xl flex items-center gap-4">
              <div class="w-20 h-14 flex items-center justify-center shrink-0">
                <img src="${getVehicleImage(veh)}" alt="${veh.brand} ${veh.model}" class="w-full h-full object-contain drop-shadow-xs" />
              </div>
              <div class="min-w-0">
                <span class="text-[10px] font-bold uppercase tracking-wider text-uber-iron block">Veículo Confirmado</span>
                <span class="font-bold text-sm text-uber-black block truncate">${veh.brand} ${veh.model}</span>
                <div class="flex items-center gap-1.5 text-[11px] text-uber-iron mt-0.5">
                  <span class="font-mono font-semibold">${veh.plate}</span>
                  <span>•</span>
                  <span class="inline-flex items-center gap-1">
                    <span class="w-2 h-2 rounded-xs border ${colorObj.border}" style="background-color: ${colorObj.hex}"></span>
                    <span>Cor ${colorObj.name}</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- Outbound Trip Summary Card -->
            <div class="p-4 border border-uber-border rounded-xl space-y-2.5">
              <div class="flex items-center justify-between text-xs pb-2 border-b border-uber-border">
                <span class="font-bold text-uber-black uppercase tracking-wider flex items-center gap-1.5">
                  ${icon('navigation', { size: 'sm' })} Viagem de Ida
                </span>
                <span class="font-bold text-uber-black">R$ ${publishWizardState.pricePerSeat.toFixed(2).replace('.', ',')} / vaga</span>
              </div>
              <div class="text-xs space-y-1 text-uber-charcoal">
                <p><strong>Trajeto:</strong> ${publishWizardState.originCity} ➔ ${publishWizardState.destinationCity}</p>
                <p><strong>Partida:</strong> ${publishWizardState.originSpot} (${publishWizardState.departureDate} às ${publishWizardState.departureTime})</p>
                <p><strong>Chegada:</strong> ${publishWizardState.destinationSpot} (~${publishWizardState.duration})</p>
                <p><strong>Vagas:</strong> ${publishWizardState.seats} assentos disponíveis</p>
                <p><strong>Bagagem:</strong> ${getLuggageInfo(veh).label}</p>
              </div>
            </div>

            <!-- Inbound Trip Summary Card (if applicable) -->
            ${publishWizardState.hasReturn ? `
              <div class="p-4 border border-uber-border rounded-xl space-y-2.5 bg-neutral-50/50">
                <div class="flex items-center justify-between text-xs pb-2 border-b border-uber-border">
                  <span class="font-bold text-uber-black uppercase tracking-wider flex items-center gap-1.5">
                    ${icon('sync_alt', { size: 'sm' })} Viagem de Retorno
                  </span>
                  <span class="font-bold text-uber-black">R$ ${publishWizardState.returnPrice.toFixed(2).replace('.', ',')} / vaga</span>
                </div>
                <div class="text-xs space-y-1 text-uber-charcoal">
                  <p><strong>Trajeto:</strong> ${publishWizardState.destinationCity} ➔ ${publishWizardState.originCity}</p>
                  <p><strong>Partida:</strong> ${publishWizardState.destinationSpot} (${publishWizardState.returnDate} às ${publishWizardState.returnTime})</p>
                  <p><strong>Chegada:</strong> ${publishWizardState.originSpot}</p>
                  <p><strong>Vagas:</strong> ${publishWizardState.returnSeats} assentos disponíveis</p>
                  <p><strong>Bagagem:</strong> ${getLuggageInfo(veh).label}</p>
                </div>
              </div>
            ` : ''}

            <!-- Estimated Total Earnings -->
            <div class="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs font-semibold text-emerald-950">
              <span class="flex items-center gap-1.5 font-bold">
                ${icon('payments', { size: 'sm', className: 'text-emerald-700' })}
                Ganhos potenciais totais:
              </span>
              <span class="text-base font-extrabold text-emerald-900">
                Até R$ ${totalPotential.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <!-- Optional Driver Notes -->
            <div>
              <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1">Observações para os Passageiros (Opcional)</label>
              <textarea
                id="pub-final-notes"
                rows="2"
                placeholder="Ex: Tolerância de 10 min no ponto de encontro, porta-malas espaçoso..."
                class="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white font-normal rounded-xl p-3 text-xs text-uber-black focus:outline-none transition-all"
              >${publishWizardState.notes}</textarea>
            </div>

            <div class="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
              <button
                type="button"
                onclick="setPublishWizardStep(4)"
                class="w-full sm:w-1/3 h-12 border border-uber-border hover:bg-uber-gray text-uber-black font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Voltar
              </button>
              <button
                type="button"
                onclick="handleFinishPublishRide()"
                class="w-full sm:w-2/3 h-12 bg-black hover:bg-neutral-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 active:scale-98 shadow-md transition-all cursor-pointer"
              >
                ${icon('check_circle', { size: 'sm' })}
                <span>Publicar Viagem na Cooperativa</span>
              </button>
            </div>
          </div>
        `;
      })() : ''}

    </div>
  `;
}

// ==========================================
// CONTROLE DE ACESSO E VALIDADE DO CHAT (5 HORAS PÓS-CORRIDA)
// ==========================================

function isRideExpiredForChat(ride) {
  if (!ride) return false;
  
  // 1. Se tem data de conclusão explícita salva na viagem
  if (ride.completedAt) {
    const completedTime = new Date(ride.completedAt).getTime();
    if (!isNaN(completedTime)) {
      return (Date.now() - completedTime) > (5 * 60 * 60 * 1000);
    }
  }

  // 2. Se a viagem está com status 'COMPLETED' ou 'FINISHED'
  if (ride.status === 'COMPLETED' || ride.status === 'FINISHED') {
    const arrTime = ride.estimatedArrivalTime || ride.departureTime || '12:00';
    const d = new Date(`${ride.departureDate}T${arrTime}:00`);
    const completedTime = !isNaN(d.getTime()) ? d.getTime() : (Date.now() - (6 * 60 * 60 * 1000));
    return (Date.now() - completedTime) > (5 * 60 * 60 * 1000);
  }

  // 3. Verificação em tempo real pela data e horário de chegada estimada
  if (ride.departureDate) {
    const arrTime = ride.estimatedArrivalTime || ride.departureTime || '23:59';
    const estimatedArrival = new Date(`${ride.departureDate}T${arrTime}:00`);
    if (!isNaN(estimatedArrival.getTime())) {
      const msSinceArrival = Date.now() - estimatedArrival.getTime();
      if (msSinceArrival > (5 * 60 * 60 * 1000)) {
        return true;
      }
    }
  }

  return false;
}

// View: Chat em Tela Cheia (Fullscreen)
function viewChat(rideId) {
  const ride = store.state.rides.find(r => r.id === rideId);
  const rideMessages = store.state.messages.filter(m => m.rideId === rideId);
  const myId = store.state.currentUser.id;
  const isDriver = store.state.role === 'DRIVER' || (ride && ride.driverId === myId);
  const rideBookings = store.state.bookings.filter(b => b.rideId === rideId && b.status !== 'CANCELLED' && b.status !== 'REJECTED_BY_DRIVER');
  const myBooking = store.state.bookings.find(b => b.rideId === rideId && b.passengerId === myId);

  if (!ride) {
    return `
      <div class="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div class="w-16 h-16 bg-neutral-100 text-uber-black rounded-2xl flex items-center justify-center mb-4 border border-uber-border">
          ${icon('error_outline', { size: 'lg' })}
        </div>
        <h2 class="text-xl font-bold text-uber-black">Viagem não encontrada</h2>
        <div class="mt-6 w-full max-w-xs">
          <button onclick="window.history.back()" class="w-full h-11 bg-black text-white font-bold rounded-xl text-sm cursor-pointer">
            Voltar
          </button>
        </div>
      </div>
    `;
  }

  // Se for MOTORISTA: só consegue abrir chat se pelo menos 1 passageiro tiver solicitado/reservado a viagem
  if (isDriver && rideBookings.length === 0) {
    return `
      <div class="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div class="w-16 h-16 bg-neutral-100 text-uber-black rounded-2xl flex items-center justify-center mb-4 border border-uber-border">
          ${icon('group', { size: 'lg' })}
        </div>
        <h2 class="text-xl font-bold text-uber-black">Aguardando Solicitações de Passageiros</h2>
        <p class="text-uber-iron text-xs sm:text-sm font-normal mt-1.5 max-w-sm leading-relaxed">
          O canal de chat desta viagem só estará disponível após um passageiro solicitar ou reservar uma vaga.
        </p>
        <div class="mt-6 flex flex-col sm:flex-row gap-2 w-full max-w-xs">
          <button onclick="window.history.back()" class="w-full h-11 bg-uber-gray hover:bg-neutral-200 text-uber-black font-semibold rounded-xl text-sm transition-colors cursor-pointer">
            Voltar
          </button>
          <a href="#/minhas-viagens" class="w-full h-11 bg-black text-white font-bold rounded-xl text-sm flex items-center justify-center hover:bg-neutral-900 transition-colors">
            Minhas Viagens
          </a>
        </div>
      </div>
    `;
  }

  // Se for PASSAGEIRO: precisa ter reserva válida
  if (!isDriver) {
    if (!myBooking || myBooking.status === 'CANCELLED' || myBooking.status === 'REJECTED_BY_DRIVER') {
      return `
        <div class="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div class="w-16 h-16 bg-neutral-100 text-uber-black rounded-2xl flex items-center justify-center mb-4 border border-uber-border">
            ${icon('payments', { size: 'lg' })}
          </div>
          <h2 class="text-xl font-bold text-uber-black">Reserva Necessária</h2>
          <p class="text-uber-iron text-xs sm:text-sm font-normal mt-1.5 max-w-sm leading-relaxed">
            Você precisa solicitar ou confirmar uma reserva nesta viagem para conversar com o motorista.
          </p>
          <div class="mt-6 flex flex-col sm:flex-row gap-2 w-full max-w-xs">
            <button onclick="window.history.back()" class="w-full h-11 bg-uber-gray hover:bg-neutral-200 text-uber-black font-semibold rounded-xl text-sm transition-colors cursor-pointer">
              Voltar
            </button>
            <a href="#/viagem/${rideId}" class="w-full h-11 bg-black text-white font-bold rounded-xl text-sm flex items-center justify-center hover:bg-neutral-900 transition-colors">
              Ver Viagem
            </a>
          </div>
        </div>
      `;
    }

    if (myBooking.status === 'AWAITING_DRIVER') {
      return `
        <div class="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div class="w-16 h-16 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center mb-4 border border-amber-200">
            ${icon('hourglass_top', { size: 'lg' })}
          </div>
          <h2 class="text-xl font-bold text-uber-black">Aguardando Confirmação do Motorista</h2>
          <p class="text-uber-iron text-xs sm:text-sm font-normal mt-1.5 max-w-sm leading-relaxed">
            O chat em tela cheia com o motorista será liberado assim que o motorista aceitar sua solicitação de reserva.
          </p>
          <div class="mt-6 flex flex-col sm:flex-row gap-2 w-full max-w-xs">
            <button onclick="window.history.back()" class="w-full h-11 bg-uber-gray hover:bg-neutral-200 text-uber-black font-semibold rounded-xl text-sm transition-colors cursor-pointer">
              Voltar
            </button>
            <a href="#/minhas-viagens" class="w-full h-11 bg-black text-white font-bold rounded-xl text-sm flex items-center justify-center hover:bg-neutral-900 transition-colors">
              Minhas Reservas
            </a>
          </div>
        </div>
      `;
    }
  }

  // Verificação de expiração de 5 horas após corrida finalizada
  const isExpired = isRideExpiredForChat(ride);

  // Avatar e Nome do Interlocutor
  const counterpartName = isDriver 
    ? (rideBookings.length === 1 ? rideBookings[0].passengerName : `${rideBookings.length} Passageiros`)
    : ride.driverName;
  const counterpartAvatar = isDriver
    ? (rideBookings.length === 1 ? (rideBookings[0].passengerAvatar || DEFAULT_BLANK_AVATAR) : DEFAULT_BLANK_AVATAR)
    : (ride.driverAvatar || DEFAULT_BLANK_AVATAR);

  return `
    <div class="fixed inset-0 z-50 bg-white flex flex-col h-screen w-full animate-fade-in overflow-hidden">
      
      <!-- Fullscreen Top Bar -->
      <div class="bg-white border-b border-uber-border px-4 py-3 flex items-center justify-between shrink-0 shadow-xs">
        <div class="flex items-center gap-3 min-w-0">
          <button onclick="window.history.back()" class="p-2 hover:bg-uber-gray rounded-xl transition-colors text-uber-black shrink-0 cursor-pointer" aria-label="Voltar">
            ${icon('arrow_back', { size: 'md' })}
          </button>
          <img src="${counterpartAvatar}" alt="${counterpartName}" class="w-10 h-10 rounded-full object-cover border border-uber-border bg-uber-gray shrink-0" />
          <div class="text-left min-w-0">
            <div class="flex items-center gap-1.5">
              <h1 class="text-sm font-bold text-uber-black leading-tight truncate">${counterpartName}</h1>
              ${!isExpired ? `<span class="inline-block w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Canal Ativo"></span>` : `<span class="inline-block w-2 h-2 rounded-full bg-neutral-400 shrink-0" title="Chat Encerrado"></span>`}
            </div>
            <p class="text-[11px] font-medium text-uber-iron truncate">
              ${ride.originCity} ➔ ${ride.destinationCity}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-1 shrink-0">
          <a href="#/viagem/${rideId}" class="p-2 hover:bg-uber-gray rounded-xl text-uber-black transition-colors" title="Ver Detalhes da Viagem">
            ${icon('info', { size: 'md' })}
          </a>
        </div>
      </div>

      <!-- Tarja de Aviso de Chat Encerrado (+5h) -->
      ${isExpired ? `
        <div class="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-center gap-2 text-xs font-semibold text-amber-900 shrink-0">
          ${icon('lock_clock', { size: 'sm', className: 'text-amber-800 shrink-0' })}
          <span>Viagem finalizada há mais de 5 horas. O canal de mensagens foi arquivado.</span>
        </div>
      ` : ''}

      <!-- Fullscreen Messages Stream -->
      <div id="chat-box" class="flex-1 p-4 bg-uber-gray/40 overflow-y-auto flex flex-col gap-3">
        ${rideMessages.length > 0 ? rideMessages.map(msg => {
          const isMe = msg.senderId === myId;
          return `
            <div class="flex gap-2.5 max-w-[85%] sm:max-w-[70%] ${isMe ? 'self-end flex-row-reverse' : 'self-start'} animate-fade-in">
              <img src="${msg.senderAvatar || DEFAULT_BLANK_AVATAR}" alt="${msg.senderName}" class="w-7 h-7 rounded-full object-cover border border-uber-border shrink-0 mt-1 bg-uber-gray" />
              <div class="p-3 rounded-2xl text-xs shadow-xs ${isMe ? 'bg-uber-black text-white text-left' : 'bg-white text-uber-black text-left border border-uber-border'}">
                <p class="font-bold text-[11px] mb-0.5 ${isMe ? 'text-uber-slate' : 'text-uber-black'}">${msg.senderName}</p>
                <p class="leading-relaxed font-normal">${msg.text}</p>
                <span class="text-[10px] block text-right mt-1 font-medium ${isMe ? 'text-uber-iron' : 'text-uber-slate'}">${msg.createdAt}</span>
              </div>
            </div>
          `;
        }).join('') : `
          <div class="m-auto text-center text-uber-iron text-xs font-normal p-6 bg-white border border-uber-border rounded-2xl max-w-sm shadow-xs">
            <div class="w-12 h-12 rounded-full bg-uber-gray flex items-center justify-center mx-auto mb-2 text-uber-black">
              ${icon('chat', { size: 'md' })}
            </div>
            <p class="font-semibold text-uber-black text-sm">Inicie a conversa!</p>
            <p class="mt-1 text-uber-iron leading-relaxed">Combine ponto de encontro, bagagens e horários diretamente.</p>
          </div>
        `}
      </div>

      <!-- Sticky Footer: Formulário de Envio ou Aviso de Chat Encerrado -->
      ${isExpired ? `
        <div class="p-4 bg-uber-gray border-t border-uber-border shrink-0 text-center">
          <div class="max-w-md mx-auto flex items-center justify-center gap-2 text-xs font-semibold text-uber-iron">
            ${icon('lock', { size: 'sm', className: 'text-uber-charcoal' })}
            <span>Envio de mensagens encerrado (limite de 5h após a corrida finalizada excedido).</span>
          </div>
        </div>
      ` : `
        <div class="p-3 bg-white border-t border-uber-border shrink-0">
          <form onsubmit="handleSendChat(event, '${rideId}')" class="max-w-3xl mx-auto flex items-center gap-2">
            <input
              id="chat-input"
              type="text"
              placeholder="Digite sua mensagem..."
              required
              autocomplete="off"
              class="flex-1 h-12 bg-uber-gray border border-uber-border focus:border-uber-black focus:bg-white text-uber-black font-medium px-4 rounded-xl focus:outline-none text-xs sm:text-sm transition-all"
            />
            <button
              type="submit"
              aria-label="Enviar Mensagem"
              title="Enviar"
              class="w-12 h-12 shrink-0 font-bold bg-black text-white hover:bg-neutral-900 rounded-xl flex items-center justify-center transition-transform active:scale-90 shadow-md cursor-pointer"
            >
              ${icon('send', { size: 'sm' })}
            </button>
          </form>
        </div>
      `}
    </div>
  `;
}

function handleSendChat(e, rideId) {
  e.preventDefault();
  const ride = store.state.rides.find(r => r.id === rideId);
  if (!ride) return;

  if (isRideExpiredForChat(ride)) {
    showToast('Este canal de chat foi encerrado (limite de 5 horas após a viagem excedido).', 'warning');
    renderApp();
    return;
  }

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
    
    const r = store.state.rides.find(rd => rd.id === rideId);
    store.addSimulatedReply(
      rideId,
      replyText,
      r ? r.driverName : 'Motorista',
      r ? r.driverAvatar : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
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
let adminSimulatedTripValue = 80;

function handleAdminRateChange(key, value) {
  let val = Math.max(0, Math.min(100, parseInt(value, 10) || 0));
  const settings = store.state.platformSettings || { ...DEFAULT_PLATFORM_SETTINGS };
  
  if (key === 'driverPayoutPercent') {
    settings.driverPayoutPercent = val;
    settings.platformFeePercent = 100 - val;
  } else if (key === 'platformFeePercent') {
    settings.platformFeePercent = val;
    settings.driverPayoutPercent = 100 - val;
  } else if (key === 'signalPercent') {
    settings.signalPercent = val;
    settings.payOnArrivalPercent = 100 - val;
  } else if (key === 'payOnArrivalPercent') {
    settings.payOnArrivalPercent = val;
    settings.signalPercent = 100 - val;
  } else if (key === 'earlyRefundPercent') {
    settings.earlyRefundPercent = val;
    settings.earlyRetentionPercent = 100 - val;
  } else if (key === 'earlyRetentionPercent') {
    settings.earlyRetentionPercent = val;
    settings.earlyRefundPercent = 100 - val;
  } else if (key === 'lateRefundPercent') {
    settings.lateRefundPercent = val;
    settings.lateRetentionPercent = 100 - val;
  } else if (key === 'lateRetentionPercent') {
    settings.lateRetentionPercent = val;
    settings.lateRefundPercent = 100 - val;
  }

  store.state.platformSettings = settings;
  updateAdminRatesDomElements();
}

function updateAdminRatesDomElements() {
  const settings = store.state.platformSettings || DEFAULT_PLATFORM_SETTINGS;
  
  const pairs = [
    {
      inA: 'rate-driver-payout', slA: 'slider-driver-payout', valA: settings.driverPayoutPercent,
      inB: 'rate-platform-fee', slB: 'slider-platform-fee', valB: settings.platformFeePercent,
      barA: 'bar-driver-payout', barB: 'bar-platform-fee',
      txtA: 'text-driver-payout', txtB: 'text-platform-fee'
    },
    {
      inA: 'rate-signal-percent', slA: 'slider-signal-percent', valA: settings.signalPercent,
      inB: 'rate-arrival-percent', slB: 'slider-arrival-percent', valB: settings.payOnArrivalPercent,
      barA: 'bar-signal-percent', barB: 'bar-arrival-percent',
      txtA: 'text-signal-percent', txtB: 'text-arrival-percent'
    },
    {
      inA: 'rate-early-refund', slA: 'slider-early-refund', valA: settings.earlyRefundPercent,
      inB: 'rate-early-retention', slB: 'slider-early-retention', valB: settings.earlyRetentionPercent,
      barA: 'bar-early-refund', barB: 'bar-early-retention',
      txtA: 'text-early-refund', txtB: 'text-early-retention'
    },
    {
      inA: 'rate-late-refund', slA: 'slider-late-refund', valA: settings.lateRefundPercent,
      inB: 'rate-late-retention', slB: 'slider-late-retention', valB: settings.lateRetentionPercent,
      barA: 'bar-late-refund', barB: 'bar-late-retention',
      txtA: 'text-late-refund', txtB: 'text-late-retention'
    }
  ];

  pairs.forEach(p => {
    const elInA = document.getElementById(p.inA);
    const elSlA = document.getElementById(p.slA);
    const elInB = document.getElementById(p.inB);
    const elSlB = document.getElementById(p.slB);
    const elBarA = document.getElementById(p.barA);
    const elBarB = document.getElementById(p.barB);
    const elTxtA = document.getElementById(p.txtA);
    const elTxtB = document.getElementById(p.txtB);

    if (elInA && document.activeElement !== elInA) elInA.value = p.valA;
    if (elSlA) elSlA.value = p.valA;
    if (elInB && document.activeElement !== elInB) elInB.value = p.valB;
    if (elSlB) elSlB.value = p.valB;
    if (elBarA) elBarA.style.width = `${p.valA}%`;
    if (elBarB) elBarB.style.width = `${p.valB}%`;
    if (elTxtA) elTxtA.textContent = `${p.valA}%`;
    if (elTxtB) elTxtB.textContent = `${p.valB}%`;
  });

  updateAdminRatesSimulator();
}

function handleAdminSimulatedValueChange(val) {
  adminSimulatedTripValue = Math.max(10, parseFloat(val) || 0);
  updateAdminRatesSimulator();
}

const RATE_HELP_TOPICS = {
  driverPayout: {
    title: 'Divisão da Tarifa (Motorista vs Cooperativa)',
    summary: 'Define a porcentagem do valor da passagem destinada ao motorista e a taxa retida pela cooperativa.',
    details: 'Ao ajustar uma porcentagem, o valor complementar se ajusta automaticamente para somar exatamente 100%. A taxa da cooperativa é destinada à manutenção técnica, infraestrutura de pagamentos e segurança das viagens.'
  },
  chargeComposition: {
    title: 'Composição da Cobrança (Sinal PIX vs Embarque)',
    summary: 'Define quanto o passageiro paga adiantado na reserva e quanto pagará diretamente no embarque.',
    details: 'O Sinal PIX pago antecipadamente fica retido em custódia segura pela plataforma para garantir a vaga. O saldo restante é pago diretamente ao motorista no momento da viagem.'
  },
  earlyCancel: {
    title: 'Cancelamento com Antecedência (>1 hora)',
    summary: 'Regra de divisão do sinal quando o cancelamento ocorre com mais de 1h de antecedência.',
    details: 'Como houve tempo suficiente para liberar a vaga a outros passageiros, a maior parte do sinal PIX é estornada ao passageiro, e uma pequena taxa operacional pode ser retida.'
  },
  lateCancel: {
    title: 'Cancelamento de Última Hora (<1 hora)',
    summary: 'Regra de divisão do sinal quando o cancelamento ocorre com menos de 1h de antecedência.',
    details: 'Como a desistência ocorre em cima da hora ou em caso de não comparecimento (no-show), a taxa de retenção compensa o motorista pelo assento que ficou bloqueado.'
  },
  simulator: {
    title: 'Simulador em Tempo Real',
    summary: 'Permite testar qualquer valor de corrida para ver a divisão exata de centavos na prática.',
    details: 'Informe o valor total da passagem para visualizar em tempo real o Sinal PIX em custódia, o Saldo no Embarque, o Ganho Líquido do Motorista e a Taxa retida pela Cooperativa.'
  }
};

function showRateHelpModal(topicKey) {
  const topic = RATE_HELP_TOPICS[topicKey];
  if (!topic) return;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  modalRoot.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div class="bg-white rounded-2xl border border-uber-border shadow-2xl max-w-md w-full p-5 sm:p-6 text-left space-y-4">
        
        <div class="flex items-start justify-between gap-3 pb-3 border-b border-uber-border">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 bg-uber-gray text-uber-black rounded-lg flex items-center justify-center shrink-0">
              ${icon('help_outline', { size: 'sm' })}
            </div>
            <h3 class="font-bold text-sm sm:text-base text-uber-black leading-tight">${topic.title}</h3>
          </div>
          <button
            type="button"
            onclick="closeModal()"
            class="text-uber-iron hover:text-uber-black p-1 rounded-lg hover:bg-uber-gray transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            ${icon('close', { size: 'sm' })}
          </button>
        </div>

        <div class="space-y-2.5 text-xs text-uber-charcoal leading-relaxed">
          <p class="font-semibold text-uber-black bg-uber-gray p-3 rounded-xl border border-uber-border">
            ${topic.summary}
          </p>
          <p class="font-normal text-uber-iron pt-1">
            ${topic.details}
          </p>
        </div>

        <div class="pt-2">
          <button
            type="button"
            onclick="closeModal()"
            class="w-full h-11 bg-black text-white hover:bg-neutral-900 rounded-xl font-bold text-xs transition-transform active:scale-95 cursor-pointer"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  `;
}

function rateHelpButton(topicKey) {
  const topic = RATE_HELP_TOPICS[topicKey];
  if (!topic) return '';

  return `
    <div class="has-tooltip inline-flex items-center">
      <button
        type="button"
        onclick="showRateHelpModal('${topicKey}')"
        title="Ajuda e detalhes"
        class="w-5 h-5 rounded-md text-uber-iron hover:text-uber-black hover:bg-uber-gray flex items-center justify-center transition-colors cursor-pointer"
        aria-label="Ajuda sobre ${topic.title}"
      >
        ${icon('help_outline', { size: 'xs' })}
      </button>
      <div class="tooltip-box absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-56 p-2 bg-uber-black text-white text-[11px] rounded-lg shadow-xl text-center leading-tight">
        ${topic.summary}
        <div class="text-[9px] text-neutral-400 mt-1 block">Clique para ver mais detalhes</div>
      </div>
    </div>
  `;
}

function renderAdminSimulatorHtml(total, signalVal, arrivalVal, driverVal, platformVal, earlyRefundVal, earlyRetentionVal, settings) {
  return `
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
      <div class="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
        <span class="text-[10px] font-bold text-blue-900 uppercase tracking-wider block">Sinal PIX (${settings.signalPercent}%)</span>
        <p class="text-base sm:text-lg font-extrabold text-blue-950 mt-0.5">R$ ${signalVal.toFixed(2).replace('.', ',')}</p>
      </div>

      <div class="p-3 bg-neutral-100 border border-neutral-300 rounded-xl">
        <span class="text-[10px] font-bold text-neutral-800 uppercase tracking-wider block">Embarque (${settings.payOnArrivalPercent}%)</span>
        <p class="text-base sm:text-lg font-extrabold text-neutral-900 mt-0.5">R$ ${arrivalVal.toFixed(2).replace('.', ',')}</p>
      </div>

      <div class="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
        <span class="text-[10px] font-bold text-emerald-900 uppercase tracking-wider block">Motorista (${settings.driverPayoutPercent}%)</span>
        <p class="text-base sm:text-lg font-extrabold text-emerald-950 mt-0.5">R$ ${driverVal.toFixed(2).replace('.', ',')}</p>
      </div>

      <div class="p-3 bg-black text-white rounded-xl">
        <span class="text-[10px] font-bold text-neutral-300 uppercase tracking-wider block">Cooperativa (${settings.platformFeePercent}%)</span>
        <p class="text-base sm:text-lg font-extrabold text-white mt-0.5">R$ ${platformVal.toFixed(2).replace('.', ',')}</p>
      </div>
    </div>
  `;
}

function updateAdminRatesSimulator() {
  const container = document.getElementById('admin-rates-simulator-results');
  if (!container) return;

  const settings = store.state.platformSettings || DEFAULT_PLATFORM_SETTINGS;
  const total = adminSimulatedTripValue;
  
  const signalVal = (total * settings.signalPercent / 100);
  const arrivalVal = (total * settings.payOnArrivalPercent / 100);
  const driverVal = (total * settings.driverPayoutPercent / 100);
  const platformVal = (total * settings.platformFeePercent / 100);
  
  const earlyRefundVal = (signalVal * settings.earlyRefundPercent / 100);
  const earlyRetentionVal = (signalVal * settings.earlyRetentionPercent / 100);

  container.innerHTML = renderAdminSimulatorHtml(total, signalVal, arrivalVal, driverVal, platformVal, earlyRefundVal, earlyRetentionVal, settings);
}

function handleSavePlatformSettings() {
  store.saveState();
  showToast('Porcentagens e taxas salvas com sucesso!', 'success');
}

function handleResetPlatformSettings() {
  store.resetPlatformSettings();
  renderApp();
  showToast('Porcentagens restauradas para o padrão.', 'info');
}

function viewAdmin() {
  const { driverRequests, bookings, role } = store.state;
  const settings = store.state.platformSettings || DEFAULT_PLATFORM_SETTINGS;

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

  const total = adminSimulatedTripValue;
  const signalVal = (total * settings.signalPercent / 100);
  const arrivalVal = (total * settings.payOnArrivalPercent / 100);
  const driverVal = (total * settings.driverPayoutPercent / 100);
  const platformVal = (total * settings.platformFeePercent / 100);
  const earlyRefundVal = (signalVal * settings.earlyRefundPercent / 100);
  const earlyRetentionVal = (signalVal * settings.earlyRetentionPercent / 100);

  return `
    <div class="max-w-4xl mx-auto px-4 py-6 text-left pb-24 md:pb-12 animate-fade-in">
      <div class="flex justify-between items-center mb-6 h-10">
        <h1 class="text-xl sm:text-2xl font-bold text-uber-black">Painel de Gestão</h1>
        <div class="flex items-center gap-1.5 text-xs font-bold text-uber-black bg-uber-gray px-3 py-1.5 rounded-lg border border-uber-border shadow-2xs">
          ${icon('shield', { size: 'sm' })}
          <span>Perfil ${role === 'ADMIN' ? 'Administrador' : 'Gestor'}</span>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div class="p-4 border border-uber-border bg-white rounded-xl shadow-xs">
          <div class="flex items-center justify-between pb-2 text-uber-iron text-xs font-semibold">
            <span>Volume Transacionado</span>
            ${icon('payments', { size: 'sm', className: 'text-uber-black' })}
          </div>
          <p class="text-2xl font-extrabold text-uber-black">R$ ${totalVolume.toFixed(2).replace('.', ',')}</p>
          <span class="text-[11px] text-uber-iron font-normal">Sinais e valores totais</span>
        </div>

        <div class="p-4 border border-uber-border bg-white rounded-xl shadow-xs">
          <div class="flex items-center justify-between pb-2 text-uber-iron text-xs font-semibold">
            <span>Saldo em Custódia</span>
            ${icon('lock', { size: 'sm', className: 'text-uber-black' })}
          </div>
          <p class="text-2xl font-extrabold text-uber-black">R$ ${custodyBalance.toFixed(2).replace('.', ',')}</p>
          <span class="text-[11px] text-uber-iron font-normal">Garantia ativa até o fim da viagem</span>
        </div>

        <div class="p-4 border border-uber-border bg-white rounded-xl shadow-xs">
          <div class="flex items-center justify-between pb-2 text-uber-iron text-xs font-semibold">
            <span>Solicitações Pendentes</span>
            ${icon('person_add', { size: 'sm', className: 'text-uber-black' })}
          </div>
          <p class="text-2xl font-extrabold text-uber-black">${pendingRequests.length}</p>
          <span class="text-[11px] text-uber-iron font-normal">Motoristas aguardando análise</span>
        </div>
      </div>

      <!-- Tabs de Gestão -->
      <div class="flex border-b border-uber-border mb-6 overflow-x-auto">
        <button
          onclick="adminTab = 'REQUESTS'; renderApp();"
          class="py-2.5 px-4 text-xs font-bold border-b-2 transition-colors shrink-0 cursor-pointer ${adminTab === 'REQUESTS' ? 'border-uber-black text-uber-black' : 'border-transparent text-uber-iron hover:text-uber-black'}"
        >
          Credenciamento de Motoristas
        </button>
        <button
          onclick="adminTab = 'FINANCE'; renderApp();"
          class="py-2.5 px-4 text-xs font-bold border-b-2 transition-colors shrink-0 cursor-pointer ${adminTab === 'FINANCE' ? 'border-uber-black text-uber-black' : 'border-transparent text-uber-iron hover:text-uber-black'}"
        >
          Custódia Financeira (PIX)
        </button>
        <button
          onclick="adminTab = 'RATES'; renderApp();"
          class="py-2.5 px-4 text-xs font-bold border-b-2 transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 ${adminTab === 'RATES' ? 'border-uber-black text-uber-black' : 'border-transparent text-uber-iron hover:text-uber-black'}"
        >
          ${icon('percent', { size: 'xs' })}
          <span>Taxas & Porcentagens</span>
        </button>
      </div>

      <!-- TAB 1: CREDENCIAMENTO -->
      ${adminTab === 'REQUESTS' ? `
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-uber-black uppercase tracking-wider">Filtrar Solicitações:</span>
            <div class="flex gap-1.5">
              ${['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map(st => `
                <button
                  onclick="adminReqFilter = '${st}'; renderApp();"
                  class="px-3 py-1 rounded-md text-xs font-semibold border transition-all cursor-pointer ${adminReqFilter === st ? 'bg-uber-black text-white border-uber-black' : 'bg-white text-uber-black border-uber-border hover:bg-uber-gray'}"
                >
                  ${st === 'ALL' ? 'Todas' : st === 'PENDING' ? 'Pendentes' : st === 'APPROVED' ? 'Aprovadas' : 'Recusadas'}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="space-y-3">
            ${filteredRequests.length > 0 ? filteredRequests.map(req => `
              <div class="p-4 border border-uber-border bg-white rounded-xl shadow-2xs">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-uber-border">
                  <div>
                    <h3 class="font-bold text-sm text-uber-black">${req.userName}</h3>
                    <p class="text-xs text-uber-iron font-normal">${req.userEmail} • ${req.userPhone}</p>
                  </div>
                  <span class="inline-flex items-center gap-1 font-bold text-xs px-2.5 py-1 rounded-md ${req.status === 'PENDING' ? 'bg-amber-100 text-amber-900' : req.status === 'APPROVED' ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}">
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
                    <button onclick="handleRejectDriver('${req.id}')" class="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-bold transition-colors cursor-pointer">
                      Recusar
                    </button>
                    <button onclick="handleApproveDriver('${req.id}')" class="px-4 py-2 bg-black text-white hover:bg-neutral-900 rounded-lg font-bold transition-transform active:scale-95 cursor-pointer">
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
      ` : adminTab === 'FINANCE' ? `
        <!-- TAB 2: CUSTÓDIA FINANCEIRA -->
        <div class="space-y-4">
          <p class="text-xs text-uber-iron font-normal">Gestão e liberação de resgates para motoristas após a conclusão das viagens.</p>
          <div class="space-y-3">
            ${bookings.map(b => `
              <div class="p-4 border border-uber-border bg-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs">
                <div>
                  <span class="font-mono font-medium text-uber-iron block text-[11px]">${b.id} • Passageiro: ${b.passengerName}</span>
                  <p class="font-bold text-sm text-uber-black mt-0.5">Sinal em Custódia: R$ ${b.amountPaidSignal.toFixed(2).replace('.', ',')}</p>
                  <span class="text-uber-iron font-normal text-[11px]">Total da Viagem: R$ ${b.totalAmount.toFixed(2).replace('.', ',')}</span>
                </div>

                <div class="flex items-center gap-2">
                  ${b.status === 'SIGNAL_CONFIRMED' ? `
                    <button onclick="handleReleaseCustodyAdmin('${b.id}', ${b.amountPaidSignal})" class="px-3.5 py-2 bg-black text-white hover:bg-neutral-900 rounded-lg font-bold text-xs transition-transform active:scale-95 cursor-pointer">
                      Liberar Resgate (PIX)
                    </button>
                  ` : b.status === 'FULLY_PAID' ? `
                    <span class="font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-md text-xs">
                      Repasse Concluído
                    </span>
                  ` : `
                    <span class="font-bold text-red-700 bg-red-50 px-3 py-1.5 rounded-md text-xs">
                      Reserva Cancelada
                    </span>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : `
        <!-- TAB 3: TAXAS E PORCENTAGENS INTERLIGADAS DA PLATAFORMA (CLEAN & INTUITIVA) -->
        <div class="space-y-4">
          
          <!-- BLOCO 1: REPASSE MOTORISTA vs TAXA PLATAFORMA (SOMA = 100%) -->
          <div class="p-4 bg-white border border-uber-border rounded-xl shadow-xs space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <h3 class="font-bold text-xs sm:text-sm text-uber-black">Divisão da Tarifa (Motorista vs Cooperativa)</h3>
                ${rateHelpButton('driverPayout')}
              </div>
              <span class="text-[11px] font-bold text-uber-iron">Total 100%</span>
            </div>

            <!-- Barra Visual Proporcional Bicolor -->
            <div class="w-full h-2.5 bg-neutral-200 rounded-md overflow-hidden flex border border-uber-border">
              <div id="bar-driver-payout" style="width: ${settings.driverPayoutPercent}%" class="bg-black transition-all duration-150"></div>
              <div id="bar-platform-fee" style="width: ${settings.platformFeePercent}%" class="bg-emerald-600 transition-all duration-150"></div>
            </div>

            <!-- Controles Interligados Compactos -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div class="p-3 bg-uber-gray rounded-lg border border-uber-border flex items-center justify-between gap-3">
                <span class="text-xs font-semibold text-uber-black">Motorista:</span>
                <div class="flex items-center gap-2 flex-1 max-w-[200px]">
                  <input
                    id="slider-driver-payout"
                    type="range"
                    min="50"
                    max="98"
                    value="${settings.driverPayoutPercent}"
                    oninput="handleAdminRateChange('driverPayoutPercent', this.value)"
                    class="w-full accent-black cursor-pointer"
                  />
                  <span id="text-driver-payout" class="text-xs font-bold text-uber-black w-10 text-right">${settings.driverPayoutPercent}%</span>
                </div>
              </div>

              <div class="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200 flex items-center justify-between gap-3">
                <span class="text-xs font-semibold text-emerald-950">Cooperativa:</span>
                <div class="flex items-center gap-2 flex-1 max-w-[200px]">
                  <input
                    id="slider-platform-fee"
                    type="range"
                    min="2"
                    max="50"
                    value="${settings.platformFeePercent}"
                    oninput="handleAdminRateChange('platformFeePercent', this.value)"
                    class="w-full accent-emerald-600 cursor-pointer"
                  />
                  <span id="text-platform-fee" class="text-xs font-bold text-emerald-800 w-10 text-right">${settings.platformFeePercent}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- BLOCO 2: SINAL PIX vs SALDO NO EMBARQUE (SOMA = 100%) -->
          <div class="p-4 bg-white border border-uber-border rounded-xl shadow-xs space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <h3 class="font-bold text-xs sm:text-sm text-uber-black">Composição da Cobrança (Sinal vs Embarque)</h3>
                ${rateHelpButton('chargeComposition')}
              </div>
              <span class="text-[11px] font-bold text-uber-iron">Total 100%</span>
            </div>

            <!-- Barra Visual Proporcional Bicolor -->
            <div class="w-full h-2.5 bg-neutral-200 rounded-md overflow-hidden flex border border-uber-border">
              <div id="bar-signal-percent" style="width: ${settings.signalPercent}%" class="bg-blue-600 transition-all duration-150"></div>
              <div id="bar-arrival-percent" style="width: ${settings.payOnArrivalPercent}%" class="bg-neutral-800 transition-all duration-150"></div>
            </div>

            <!-- Controles Interligados Compactos -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div class="p-3 bg-blue-50/70 rounded-lg border border-blue-200 flex items-center justify-between gap-3">
                <span class="text-xs font-semibold text-blue-950">Sinal PIX:</span>
                <div class="flex items-center gap-2 flex-1 max-w-[200px]">
                  <input
                    id="slider-signal-percent"
                    type="range"
                    min="10"
                    max="90"
                    value="${settings.signalPercent}"
                    oninput="handleAdminRateChange('signalPercent', this.value)"
                    class="w-full accent-blue-600 cursor-pointer"
                  />
                  <span id="text-signal-percent" class="text-xs font-bold text-blue-800 w-10 text-right">${settings.signalPercent}%</span>
                </div>
              </div>

              <div class="p-3 bg-neutral-100 rounded-lg border border-neutral-300 flex items-center justify-between gap-3">
                <span class="text-xs font-semibold text-neutral-900">Embarque:</span>
                <div class="flex items-center gap-2 flex-1 max-w-[200px]">
                  <input
                    id="slider-arrival-percent"
                    type="range"
                    min="10"
                    max="90"
                    value="${settings.payOnArrivalPercent}"
                    oninput="handleAdminRateChange('payOnArrivalPercent', this.value)"
                    class="w-full accent-neutral-800 cursor-pointer"
                  />
                  <span id="text-arrival-percent" class="text-xs font-bold text-neutral-800 w-10 text-right">${settings.payOnArrivalPercent}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- BLOCO 3: REGRAS DE CANCELAMENTO (COMPACTO COM MODAL) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            
            <!-- Cancelamento Antecipado (>1h) -->
            <div class="p-4 bg-white border border-uber-border rounded-xl shadow-xs space-y-2.5">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <h4 class="font-bold text-xs text-uber-black">Cancelamento (>1h)</h4>
                  ${rateHelpButton('earlyCancel')}
                </div>
                <span class="text-[11px] font-bold text-blue-700">Estorno: <span id="text-early-refund">${settings.earlyRefundPercent}%</span></span>
              </div>

              <input
                id="slider-early-refund"
                type="range"
                min="0"
                max="100"
                value="${settings.earlyRefundPercent}"
                oninput="handleAdminRateChange('earlyRefundPercent', this.value)"
                class="w-full accent-blue-600 cursor-pointer"
              />
              <div class="flex justify-between text-[10px] text-uber-iron">
                <span>Estorno: ${settings.earlyRefundPercent}%</span>
                <span>Taxa Retida: <span id="text-early-retention">${settings.earlyRetentionPercent}%</span></span>
              </div>
            </div>

            <!-- Cancelamento Última Hora (<1h) -->
            <div class="p-4 bg-white border border-uber-border rounded-xl shadow-xs space-y-2.5">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <h4 class="font-bold text-xs text-uber-black">Cancelamento (<1h)</h4>
                  ${rateHelpButton('lateCancel')}
                </div>
                <span class="text-[11px] font-bold text-red-700">Retenção: <span id="text-late-retention">${settings.lateRetentionPercent}%</span></span>
              </div>

              <input
                id="slider-late-retention"
                type="range"
                min="0"
                max="100"
                value="${settings.lateRetentionPercent}"
                oninput="handleAdminRateChange('lateRetentionPercent', this.value)"
                class="w-full accent-red-600 cursor-pointer"
              />
              <div class="flex justify-between text-[10px] text-uber-iron">
                <span>Estorno: <span id="text-late-refund">${settings.lateRefundPercent}%</span></span>
                <span>Taxa Retida: ${settings.lateRetentionPercent}%</span>
              </div>
            </div>

          </div>

          <!-- BLOCO 4: SIMULADOR DE VIAGEM COMPACTO -->
          <div class="p-4 bg-white border border-uber-border rounded-xl shadow-xs space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                <h3 class="font-bold text-xs sm:text-sm text-uber-black">Simulador em Tempo Real</h3>
                ${rateHelpButton('simulator')}
              </div>

              <div class="flex items-center gap-1.5">
                <span class="text-xs font-semibold text-uber-iron">Viagem:</span>
                <div class="relative flex items-center">
                  <span class="absolute left-2 text-xs font-bold text-uber-iron">R$</span>
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    step="5"
                    value="${adminSimulatedTripValue}"
                    oninput="handleAdminSimulatedValueChange(this.value)"
                    class="w-24 h-8 bg-uber-gray border border-uber-border focus:border-uber-black focus:bg-white text-xs font-bold rounded-lg pl-7 pr-2 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <!-- Resultados Dinâmicos do Simulador -->
            <div id="admin-rates-simulator-results">
              ${renderAdminSimulatorHtml(total, signalVal, arrivalVal, driverVal, platformVal, earlyRefundVal, earlyRetentionVal, settings)}
            </div>
          </div>

          <!-- BLOCO 5: BOTÕES DE AÇÃO -->
          <div class="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onclick="handleResetPlatformSettings()"
              class="px-4 py-2.5 bg-uber-gray hover:bg-neutral-200 text-uber-black font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              ${icon('restart_alt', { size: 'xs' })}
              <span>Restaurar Padrão</span>
            </button>

            <button
              type="button"
              onclick="handleSavePlatformSettings()"
              class="px-5 py-2.5 bg-black hover:bg-neutral-900 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-transform active:scale-95 shadow-sm cursor-pointer"
            >
              ${icon('save', { size: 'xs' })}
              <span>Salvar Alterações</span>
            </button>
          </div>

        </div>
      `}
    </div>
  `;
}

function handleApproveDriver(id) {
  const req = store.state.driverRequests.find(r => r.id === id);
  if (req) {
    pushNotification({
      title: 'Cadastro aprovado',
      body: 'Seu perfil de motorista foi aprovado. Você já pode publicar viagens!',
      icon: 'verified',
      href: '#/perfil',
      category: 'system',
      role: 'DRIVER',
      userId: req.userId
    });
  }
  store.approveDriverRequest(id);
  showToast('Motorista aprovado com sucesso!', 'success');
  renderApp();
}

function handleRejectDriver(id) {
  const reason = prompt('Informe o motivo da recusa:') || 'Documentação ilegível';
  const req = store.state.driverRequests.find(r => r.id === id);
  if (req) {
    pushNotification({
      title: 'Cadastro rejeitado',
      body: `Seu perfil de motorista não foi aprovado: ${reason}`,
      icon: 'cancel',
      href: '#/perfil',
      category: 'system',
      role: 'PASSENGER',
      userId: req.userId
    });
  }
  store.rejectDriverRequest(id, reason);
  showToast('Solicitação recusada e notificada.', 'info');
  renderApp();
}

function handleReleaseCustodyAdmin(id, amount) {
  const b = store.state.bookings.find(bk => bk.id === id);
  if (b) {
    const ride = store.state.rides.find(r => r.id === b.rideId);
    if (ride) {
      pushNotification({
        title: 'Repasse Liberado',
        body: `O valor de R$ ${amount.toFixed(2).replace('.', ',')} da reserva ${id} foi liberado para sua conta.`,
        icon: 'payments',
        href: '#/perfil',
        category: 'payment',
        role: 'DRIVER',
        userId: ride.driverId
      });
    }
  }
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

function renderWalletSection() {
  const { currentUser, role } = store.state;
  const w = currentUser.wallet || { balance: 0, pending: 0, transactions: [] };
  
  let adminSection = '';
  if (role === 'ADMIN') {
    const users = [
      { name: currentUser.name, balance: w.balance, pending: w.pending },
      { name: 'Marcos Silva', balance: 150.00, pending: 0 },
      { name: 'Fernanda Costa', balance: 35.00, pending: 70.00 },
      { name: 'Rafael Guimarães', balance: 0, pending: 30.00 }
    ];
    adminSection = `
      <div class="mt-6 pt-6 border-t border-uber-border">
        <h3 class="font-bold text-sm text-uber-black mb-3">Visão Geral (ADMIN)</h3>
        <div class="bg-uber-gray rounded-lg border border-uber-border overflow-hidden">
          <table class="w-full text-left text-xs">
            <thead class="bg-white border-b border-uber-border">
              <tr>
                <th class="p-3 font-semibold text-uber-iron">Usuário</th>
                <th class="p-3 font-semibold text-uber-iron text-right">Saldo</th>
                <th class="p-3 font-semibold text-uber-iron text-right">Pendente</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-uber-border">
              ${users.map(u => `
                <tr>
                  <td class="p-3 text-uber-black font-semibold">${u.name}</td>
                  <td class="p-3 text-uber-black text-right">R$ ${u.balance.toFixed(2).replace('.', ',')}</td>
                  <td class="p-3 text-uber-charcoal text-right">R$ ${u.pending.toFixed(2).replace('.', ',')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  const txs = w.transactions && w.transactions.length > 0 ? w.transactions.map(t => `
    <div class="flex items-center justify-between p-3 bg-uber-gray rounded-lg border border-uber-border">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${t.type === 'CREDIT' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}">
          ${icon(t.type === 'CREDIT' ? 'arrow_downward' : 'arrow_upward', { size: 'sm' })}
        </div>
        <div>
          <p class="text-xs font-bold text-uber-black">${t.description}</p>
          <div class="flex items-center gap-2 text-[10px] text-uber-iron mt-0.5">
            <span>${new Date(t.createdAt).toLocaleDateString('pt-BR')}</span>
            <span>•</span>
            <span class="${t.status === 'CONFIRMED' ? 'text-emerald-600' : 'text-amber-500'} font-semibold">${t.status === 'CONFIRMED' ? 'Confirmado' : 'Pendente'}</span>
          </div>
        </div>
      </div>
      <div class="text-right">
        <span class="text-sm font-bold ${t.type === 'CREDIT' ? 'text-emerald-600' : 'text-uber-black'}">${t.type === 'CREDIT' ? '+' : '-'} R$ ${t.amount.toFixed(2).replace('.', ',')}</span>
      </div>
    </div>
  `).join('') : `
    <div class="p-4 text-center text-xs text-uber-iron">Nenhuma transação recente.</div>
  `;

  return `
    <div class="p-4 sm:p-5 border border-uber-border bg-white rounded-xl shadow-sm">
      <div class="flex items-center gap-2 pb-3 border-b border-uber-border mb-4">
        ${icon('account_balance_wallet', { size: 'md', className: 'text-uber-black' })}
        <h3 class="font-bold text-base text-uber-black">Minha Carteira</h3>
      </div>
      
      <div class="grid grid-cols-2 gap-3 mb-5">
        <div class="bg-uber-gray p-4 rounded-lg border border-uber-border">
          <span class="text-[10px] uppercase font-bold text-uber-iron block mb-1">Saldo Disponível</span>
          <span class="text-2xl font-extrabold text-uber-black">R$ ${w.balance.toFixed(2).replace('.', ',')}</span>
        </div>
        <div class="bg-uber-gray p-4 rounded-lg border border-uber-border">
          <span class="text-[10px] uppercase font-bold text-uber-iron block mb-1">Pendente (Custódia)</span>
          <span class="text-2xl font-extrabold text-uber-charcoal">R$ ${w.pending.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>

      <div>
        <h4 class="font-bold text-xs text-uber-black mb-3 uppercase tracking-wider">Histórico de Transações</h4>
        <div class="flex flex-col gap-2">
          ${txs}
        </div>
      </div>

      ${adminSection}
    </div>
  `;
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

              <!-- CPF (Não editável / Desabilitado) -->
              <div>
                <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1.5">CPF (Não editável)</label>
                <input
                  id="profile-cpf"
                  type="text"
                  value="${currentUser.cpf || '123.456.789-00'}"
                  disabled
                  readonly
                  class="w-full bg-neutral-100 text-neutral-500 border border-neutral-200 rounded-xl h-12 px-4 font-mono text-sm cursor-not-allowed select-none"
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

        <!-- Wallet Card -->
        ${renderWalletSection()}

        <!-- Vehicle Details (Driver only) -->
        ${role === 'DRIVER' ? `
          <div class="p-4 sm:p-5 border border-uber-border bg-white rounded-xl shadow-sm">
            <div class="flex items-center justify-between pb-3 border-b border-uber-border">
              <div class="flex items-center gap-2">
                ${icon('directions_car', { size: 'md', className: 'text-uber-black' })}
                <h3 class="font-bold text-base text-uber-black">Veículos Cadastrados</h3>
                <span class="text-xs font-semibold px-2 py-0.5 bg-uber-gray border border-uber-border text-uber-charcoal rounded-md">${currentUser.vehicles?.length || 0}</span>
              </div>
              <button
                type="button"
                onclick="openVehicleModal()"
                title="Cadastrar novo veículo"
                aria-label="Cadastrar novo veículo"
                class="flex items-center gap-1.5 px-3.5 py-2 bg-uber-black hover:bg-neutral-900 text-white text-xs font-bold rounded-lg shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                ${icon('add', { size: 'sm' })}
                <span class="hidden sm:inline">Adicionar Veículo</span>
                <span class="sm:hidden">Novo</span>
              </button>
            </div>

            <div class="pt-4 flex flex-col gap-3">
              ${(!currentUser.vehicles || currentUser.vehicles.length === 0) ? `
                <div class="p-6 text-center bg-uber-gray border border-dashed border-uber-border rounded-lg">
                  <div class="text-uber-iron mb-2">${icon('directions_car', { size: 'lg' })}</div>
                  <p class="text-xs font-bold text-uber-black">Nenhum veículo cadastrado</p>
                  <p class="text-[11px] text-uber-iron mt-0.5">Adicione um veículo para publicar e realizar viagens.</p>
                  <button
                    type="button"
                    onclick="openVehicleModal()"
                    class="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-uber-black text-white text-xs font-bold rounded-lg hover:bg-neutral-900 transition-colors"
                  >
                    ${icon('add', { size: 'sm' })}
                    <span>Cadastrar Veículo Agora</span>
                  </button>
                </div>
              ` : `
                ${currentUser.vehicles.map(veh => {
                  const colorObj = getVehicleColorObj(veh.color);
                  return `
                  <div class="p-3.5 sm:p-4 bg-uber-gray border border-uber-border rounded-xl flex flex-col gap-3 transition-all hover:border-uber-charcoal">
                    <div class="flex items-start justify-between gap-3">
                      <div class="flex items-center gap-3.5 min-w-0">
                        <div class="w-20 h-14 flex items-center justify-center shrink-0">
                          <img src="${getVehicleImage(veh)}" alt="${veh.brand} ${veh.model}" class="w-full h-full object-contain drop-shadow-xs" />
                        </div>
                        <div class="min-w-0">
                          <div class="flex items-center gap-2 flex-wrap">
                            <span class="font-bold text-sm sm:text-base text-uber-black truncate">${veh.brand} ${veh.model}</span>
                            ${veh.isPrimary ? `
                              <span class="text-[10px] font-bold px-2 py-0.5 bg-black text-white rounded-md tracking-wider uppercase">Principal</span>
                            ` : `
                              <button
                                type="button"
                                onclick="store.setPrimaryVehicle('${veh.id}'); showToast('Veículo principal definido.', 'info');"
                                class="text-[11px] font-medium text-uber-iron hover:text-uber-black underline transition-colors cursor-pointer"
                              >
                                Tornar principal
                              </button>
                            `}
                          </div>
                          <div class="flex items-center gap-2 text-[11px] text-uber-iron mt-0.5 flex-wrap">
                            <span>Ano ${veh.year}</span>
                            <span class="text-uber-border">•</span>
                            <span class="font-mono font-semibold">${veh.plate}</span>
                            <span class="text-uber-border">•</span>
                            <span class="inline-flex items-center gap-1 font-medium text-uber-charcoal">
                              <span class="w-2 h-2 rounded-xs inline-block border ${colorObj.border}" style="background-color: ${colorObj.hex}"></span>
                              <span>${colorObj.name}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <!-- Action buttons with icons only -->
                      <div class="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onclick="openVehicleModal('${veh.id}')"
                          title="Editar informações do veículo"
                          aria-label="Editar informações do veículo"
                          class="p-2 text-uber-charcoal hover:text-uber-black hover:bg-white border border-transparent hover:border-uber-border rounded-lg transition-all active:scale-90 cursor-pointer"
                        >
                          ${icon('edit', { size: 'sm' })}
                        </button>
                        <button
                          type="button"
                          onclick="openDeleteVehicleModal('${veh.id}')"
                          title="Excluir veículo"
                          aria-label="Excluir veículo"
                          class="p-2 text-uber-iron hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-lg transition-all active:scale-90 cursor-pointer"
                        >
                          ${icon('delete', { size: 'sm' })}
                        </button>
                      </div>
                    </div>

                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div class="p-2.5 bg-white border border-uber-border rounded-lg">
                        <span class="font-medium text-uber-iron block text-[10px] uppercase tracking-wider">Placa</span>
                        <p class="font-mono font-bold text-uber-black mt-0.5 text-xs">${veh.plate}</p>
                      </div>
                      <div class="p-2.5 bg-white border border-uber-border rounded-lg">
                        <span class="font-medium text-uber-iron block text-[10px] uppercase tracking-wider">Cor</span>
                        <div class="flex items-center gap-1.5 mt-0.5">
                          <span class="w-3 h-3 rounded-xs inline-block border ${colorObj.border}" style="background-color: ${colorObj.hex}"></span>
                          <span class="font-bold text-uber-black text-xs truncate">${colorObj.name}</span>
                        </div>
                      </div>
                      <div class="p-2.5 bg-white border border-uber-border rounded-lg">
                        <span class="font-medium text-uber-iron block text-[10px] uppercase tracking-wider">Ano</span>
                        <p class="font-bold text-uber-black mt-0.5 text-xs">${veh.year}</p>
                      </div>
                      <div class="p-2.5 bg-white border border-uber-border rounded-lg">
                        <span class="font-medium text-uber-iron block text-[10px] uppercase tracking-wider">Regras / Malas</span>
                        <div class="flex items-center gap-1.5 mt-0.5 text-uber-black font-semibold text-[11px] flex-wrap">
                          ${veh.hasAC ? `<span title="Ar-condicionado" class="inline-flex items-center gap-0.5">${icon('ac_unit', { size: 'sm', className: 'text-uber-charcoal' })} Ar</span>` : ''}
                          ${veh.hasUSB ? `<span title="Entrada USB" class="inline-flex items-center gap-0.5">${icon('usb', { size: 'sm', className: 'text-uber-charcoal' })} USB</span>` : ''}
                          ${veh.noSmoking ? `<span title="Cigarro não, por favor" class="inline-flex items-center gap-0.5">${icon('smoke_free', { size: 'sm', className: 'text-uber-charcoal' })} Sem Cigarro</span>` : ''}
                          ${veh.noPets ? `<span title="Prefiro não viajar com animais" class="inline-flex items-center gap-0.5">${icon('pets', { size: 'sm', className: 'text-uber-charcoal' })} Sem Animais</span>` : ''}
                          <span title="${getLuggageInfo(veh).label}" class="inline-flex items-center gap-0.5">${icon(getLuggageInfo(veh).iconName, { size: 'sm', className: 'text-uber-charcoal' })} ${getLuggageInfo(veh).shortLabel}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                `;}).join('')}
              `}
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
  const pixKey = document.getElementById('profile-pix-key').value;
  const pass = document.getElementById('profile-password').value;

  store.updateUserProfile({ name, pixKey });
  if (pass) {
    showToast('Perfil e nova senha atualizados com sucesso!', 'success');
  } else {
    showToast('Perfil atualizado com sucesso!', 'success');
  }
}

// ==========================================
// 7.1 MODAIS DE VEÍCULOS (CADASTRO, EDIÇÃO, EXCLUSÃO)
// ==========================================

function selectVehicleColor(colorId) {
  const normColor = normalizeVehicleColor(colorId);
  const colorInput = document.getElementById('veh-form-color');
  if (colorInput) colorInput.value = normColor;

  // Atualizar visual dos botões/swatches
  const buttons = document.querySelectorAll('.veh-color-btn');
  buttons.forEach(btn => {
    const isSelected = btn.getAttribute('data-color-id') === normColor;
    if (isSelected) {
      btn.classList.add('ring-2', 'ring-black', 'border-black', 'bg-neutral-100');
      btn.classList.remove('border-uber-border');
      const checkIcon = btn.querySelector('.color-check-icon');
      if (checkIcon) checkIcon.classList.remove('opacity-0');
    } else {
      btn.classList.remove('ring-2', 'ring-black', 'border-black', 'bg-neutral-100');
      btn.classList.add('border-uber-border');
      const checkIcon = btn.querySelector('.color-check-icon');
      if (checkIcon) checkIcon.classList.add('opacity-0');
    }
  });

  // Atualizar preview da imagem do carro com a nova cor
  const brand = document.getElementById('veh-brand')?.value || '';
  const model = document.getElementById('veh-model')?.value || '';
  const previewImg = document.getElementById('veh-modal-preview-img');
  const previewLegend = document.getElementById('veh-modal-preview-legend');
  
  if (previewImg) {
    previewImg.src = getVehicleImage(brand, model, normColor);
  }
  if (previewLegend) {
    const colorName = getVehicleColorName(normColor);
    previewLegend.textContent = `${brand || 'Veículo'} ${model || ''} • Cor ${colorName}`;
  }
}

function openVehicleModal(vehicleId = null) {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  const isEdit = !!vehicleId;
  const veh = isEdit 
    ? (store.state.currentUser.vehicles || []).find(v => v.id === vehicleId) 
    : null;

  const currentYear = new Date().getFullYear();
  const selectedYear = veh ? veh.year : currentYear;
  const selectedColor = veh ? (veh.color || 'branco') : 'branco';

  // Generate Year Options
  let yearOptions = '';
  for (let y = currentYear + 1; y >= 1995; y--) {
    yearOptions += `<option value="${y}" ${y === Number(selectedYear) ? 'selected' : ''}>${y}</option>`;
  }

  const brandVal = veh ? veh.brand : '';
  const modelVal = veh ? veh.model : '';
  const searchVal = veh ? `${veh.brand} ${veh.model}` : '';

  modalRoot.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-uber-black/80 backdrop-blur-xs animate-fade-in">
      <div class="bg-white rounded-t-2xl sm:rounded-2xl border border-uber-border shadow-2xl max-w-lg w-full p-5 sm:p-6 text-left max-h-[92vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-4 border-b border-uber-border">
          <div class="flex items-center gap-3">
            <div class="bg-uber-gray text-uber-black p-2.5 rounded-xl flex items-center justify-center">
              ${icon('directions_car', { size: 'md' })}
            </div>
            <div>
              <h3 class="font-bold text-lg text-uber-black leading-tight">${isEdit ? 'Editar Veículo' : 'Cadastrar Novo Veículo'}</h3>
              <p class="text-xs text-uber-iron font-normal">Informações para viagens e identificação visual pelos passageiros</p>
            </div>
          </div>
          <button type="button" onclick="closeModal()" class="text-uber-iron hover:text-uber-black p-1.5 rounded-lg hover:bg-uber-gray transition-colors cursor-pointer" aria-label="Fechar">
            ${icon('close', { size: 'md' })}
          </button>
        </div>

        <form onsubmit="handleSaveVehicle(event, '${vehicleId || ''}')" class="pt-4 space-y-4">
          <!-- Real-time Vehicle Visual Preview Card (Uber Style) -->
          <div class="p-3 bg-uber-gray border border-uber-border rounded-xl flex items-center gap-4">
            <div class="w-24 h-16 sm:w-28 sm:h-18 flex items-center justify-center shrink-0">
              <img id="veh-modal-preview-img" src="${getVehicleImage(brandVal, modelVal, selectedColor)}" alt="Prévia do Veículo" class="w-full h-full object-contain drop-shadow-sm" />
            </div>
            <div class="min-w-0">
              <span class="text-[10px] font-bold uppercase tracking-wider text-uber-iron block">Render e Cor em Tempo Real</span>
              <span id="veh-modal-preview-legend" class="text-sm font-bold text-uber-black truncate block mt-0.5">${brandVal || 'Veículo'} ${modelVal || ''} • Cor ${getVehicleColorName(selectedColor)}</span>
            </div>
          </div>

          <!-- Placa e RENAVAM -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1">Placa do Carro</label>
              <input
                id="veh-form-plate"
                type="text"
                maxlength="8"
                required
                value="${veh ? veh.plate : ''}"
                placeholder="Ex: BRA2E19"
                class="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-sm font-mono font-bold uppercase rounded-xl h-12 px-4 focus:outline-none transition-all"
                oninput="this.value = this.value.toUpperCase().replace(/[^A-Z0-9-]/g, '')"
              />
              <span class="text-[10px] text-uber-iron mt-1 block">Padrão Mercosul ou antigo</span>
            </div>

            <div>
              <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1">RENAVAM</label>
              <input
                id="veh-form-renavam"
                type="text"
                maxlength="11"
                required
                value="${veh ? (veh.renavam || '') : ''}"
                placeholder="Ex: 12345678901"
                class="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-sm font-mono font-bold rounded-xl h-12 px-4 focus:outline-none transition-all"
                oninput="this.value = this.value.replace(/\\D/g, '')"
              />
              <span class="text-[10px] text-uber-iron mt-1 block">11 dígitos numéricos</span>
            </div>
          </div>

          <!-- Marca / Modelo com Dropdown Interativo de Veículos do Brasil -->
          <div id="veh-model-picker-container" class="relative">
            <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1">Marca e Modelo</label>
            <div class="relative">
              <input
                id="veh-brand-model-input"
                type="text"
                autocomplete="off"
                required
                value="${searchVal}"
                placeholder="Digite para buscar modelo (ex: Onix, Corolla, HB20...)"
                class="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-sm font-semibold rounded-xl h-12 px-4 pr-10 focus:outline-none transition-all"
                onfocus="handleVehicleSearchFocus()"
                oninput="handleVehicleSearchInput()"
              />
              <div class="absolute right-3 top-3.5 text-uber-iron pointer-events-none">
                ${icon('search', { size: 'sm' })}
              </div>
            </div>
            
            <input type="hidden" id="veh-brand" value="${brandVal}" />
            <input type="hidden" id="veh-model" value="${modelVal}" />

            <!-- Dropdown List Container -->
            <div
              id="veh-model-dropdown"
              class="hidden absolute top-full left-0 right-0 mt-1.5 bg-white border border-uber-border rounded-xl shadow-2xl z-[100] max-h-56 overflow-y-auto divide-y divide-gray-100"
            ></div>
            <span class="text-[10px] text-uber-iron mt-1 block">Selecione na lista de veículos do Brasil ou digite o modelo</span>
          </div>

          <!-- Cor do Veículo (Seletor Visual de Amostras Automotivas) -->
          <div>
            <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-2">Cor do Carro</label>
            <input type="hidden" id="veh-form-color" value="${selectedColor}" />
            <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
              ${VEHICLE_COLORS.map(c => `
                <button
                  type="button"
                  data-color-id="${c.id}"
                  onclick="selectVehicleColor('${c.id}')"
                  class="veh-color-btn p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${c.id === selectedColor ? 'ring-2 ring-black border-black bg-neutral-100' : 'border-uber-border hover:bg-neutral-50'}"
                >
                  <div class="w-6 h-6 rounded-md shadow-2xs flex items-center justify-center border ${c.border}" style="background-color: ${c.hex}">
                    <div class="color-check-icon ${c.id === selectedColor ? '' : 'opacity-0'} ${c.textClass} text-xs font-bold">
                      ${icon('check', { size: 'sm' })}
                    </div>
                  </div>
                  <span class="text-[11px] font-semibold text-uber-black truncate max-w-full leading-none">${c.name.split(' ')[0]}</span>
                </button>
              `).join('')}
            </div>
            <span class="text-[10px] text-uber-iron mt-1.5 block">A cor exata será aplicada no ícone do carro para identificação pelos passageiros</span>
          </div>

          <!-- Ano de Fabricação/Modelo -->
          <div>
            <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1">Ano de Fabricação / Modelo</label>
            <select
              id="veh-form-year"
              required
              class="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-sm font-semibold rounded-xl h-12 px-4 focus:outline-none cursor-pointer transition-all"
            >
              ${yearOptions}
            </select>
          </div>

          <!-- Recursos e Regras do Carro (Checkboxes) -->
          <!-- Recursos e Regras do Carro (Checkboxes) -->
          <div>
            <label class="block text-xs font-bold text-uber-black uppercase tracking-wider mb-2">Recursos Disponíveis no Carro</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label class="flex items-center gap-3 p-3 bg-uber-gray border border-uber-border rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors">
                <input
                  type="checkbox"
                  id="veh-form-has-ac"
                  ${veh ? (veh.hasAC ? 'checked' : '') : 'checked'}
                  class="w-4 h-4 rounded text-black focus:ring-black cursor-pointer"
                />
                <div class="flex items-center gap-2 text-xs font-semibold text-uber-black">
                  ${icon('ac_unit', { size: 'sm', className: 'text-uber-charcoal' })}
                  <span>Ar-condicionado</span>
                </div>
              </label>

              <label class="flex items-center gap-3 p-3 bg-uber-gray border border-uber-border rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors">
                <input
                  type="checkbox"
                  id="veh-form-has-usb"
                  ${veh ? (veh.hasUSB ? 'checked' : '') : 'checked'}
                  class="w-4 h-4 rounded text-black focus:ring-black cursor-pointer"
                />
                <div class="flex items-center gap-2 text-xs font-semibold text-uber-black">
                  ${icon('usb', { size: 'sm', className: 'text-uber-charcoal' })}
                  <span>Carregador USB</span>
                </div>
              </label>

              <label class="flex items-center gap-3 p-3 bg-uber-gray border border-uber-border rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors">
                <input
                  type="checkbox"
                  id="veh-form-no-smoking"
                  ${veh ? (veh.noSmoking ? 'checked' : '') : 'checked'}
                  class="w-4 h-4 rounded text-black focus:ring-black cursor-pointer"
                />
                <div class="flex items-center gap-2 text-xs font-semibold text-uber-black">
                  ${icon('smoke_free', { size: 'sm', className: 'text-uber-charcoal' })}
                  <span>Cigarro não, por favor</span>
                </div>
              </label>

              <label class="flex items-center gap-3 p-3 bg-uber-gray border border-uber-border rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors">
                <input
                  type="checkbox"
                  id="veh-form-no-pets"
                  ${veh ? (veh.noPets ? 'checked' : '') : 'checked'}
                  class="w-4 h-4 rounded text-black focus:ring-black cursor-pointer"
                />
                <div class="flex items-center gap-2 text-xs font-semibold text-uber-black">
                  ${icon('pets', { size: 'sm', className: 'text-uber-charcoal' })}
                  <span>Prefiro não viajar com animais</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Espaço para Malas e Bagagens (Preferências de Viagem) -->
          <div class="p-3.5 bg-uber-gray border border-uber-border rounded-xl space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-uber-border">
              <div class="flex items-center gap-2">
                ${icon('luggage', { size: 'sm', className: 'text-uber-black' })}
                <label class="block text-xs font-bold text-uber-black uppercase tracking-wider">Espaço para Malas e Bagagens</label>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label class="block text-[11px] font-semibold text-uber-iron uppercase tracking-wider mb-1">Aceita malas no porta-malas?</label>
                <select
                  id="veh-form-accepts-luggage"
                  onchange="toggleVehicleLuggageOptions(this.value)"
                  class="w-full bg-white border border-uber-border text-xs sm:text-sm font-semibold rounded-lg h-11 px-3 focus:outline-none focus:border-uber-black cursor-pointer"
                >
                  <option value="YES" ${veh && veh.luggagePolicy === 'NONE' ? '' : 'selected'}>Sim, aceito levar malas</option>
                  <option value="NO" ${veh && veh.luggagePolicy === 'NONE' ? 'selected' : ''}>Não (apenas mochila no colo)</option>
                </select>
              </div>

              <div id="veh-form-luggage-qty-container" class="${veh && veh.luggagePolicy === 'NONE' ? 'opacity-40 pointer-events-none' : ''}">
                <label class="block text-[11px] font-semibold text-uber-iron uppercase tracking-wider mb-1">Quantidade e Porte Permitido</label>
                <select
                  id="veh-form-luggage-policy"
                  class="w-full bg-white border border-uber-border text-xs sm:text-sm font-semibold rounded-lg h-11 px-3 focus:outline-none focus:border-uber-black cursor-pointer"
                >
                  <option value="1_MEDIUM" ${!veh || veh.luggagePolicy === '1_MEDIUM' || !veh.luggagePolicy ? 'selected' : ''}>1 mala média por passageiro (até 15kg)</option>
                  <option value="1_LARGE" ${veh && veh.luggagePolicy === '1_LARGE' ? 'selected' : ''}>1 mala grande por passageiro (até 23kg)</option>
                  <option value="2_BAGS" ${veh && veh.luggagePolicy === '2_BAGS' ? 'selected' : ''}>Até 2 malas por passageiro</option>
                  <option value="HAND" ${veh && veh.luggagePolicy === 'HAND' ? 'selected' : ''}>Apenas bagagem de mão pequena (10kg)</option>
                </select>
              </div>
            </div>
            <span class="text-[10px] text-uber-iron block font-normal leading-relaxed">Essas opções ficam salvas no padrão do veículo e serão aplicadas automaticamente em todas as viagens que você criar com este carro.</span>
          </div>

          <!-- Checkbox: Tornar veículo principal -->
          <div class="pt-1">
            <label class="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                id="veh-form-is-primary"
                ${veh ? (veh.isPrimary ? 'checked' : '') : 'checked'}
                class="w-4 h-4 rounded text-black focus:ring-black cursor-pointer"
              />
              <span class="text-xs font-medium text-uber-black">Definir como veículo principal para novas viagens</span>
            </label>
          </div>

          <!-- Botões de Ação do Modal -->
          <div class="pt-4 border-t border-uber-border flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
            <button
              type="button"
              onclick="closeModal()"
              class="w-full sm:w-auto h-11 px-5 border border-uber-border hover:bg-uber-gray text-uber-black text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="w-full sm:w-auto h-11 px-7 bg-black hover:bg-neutral-900 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 shadow-md transition-all cursor-pointer"
            >
              ${icon('check_circle', { size: 'sm' })}
              <span>${isEdit ? 'Salvar Alterações' : 'Cadastrar Veículo'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function toggleVehicleLuggageOptions(val) {
  const qtyContainer = document.getElementById('veh-form-luggage-qty-container');
  if (!qtyContainer) return;
  if (val === 'NO') {
    qtyContainer.classList.add('opacity-40', 'pointer-events-none');
  } else {
    qtyContainer.classList.remove('opacity-40', 'pointer-events-none');
  }
}

function handleSaveVehicle(e, vehicleId = null) {
  e.preventDefault();
  const plate = document.getElementById('veh-form-plate').value.trim().toUpperCase();
  const renavam = document.getElementById('veh-form-renavam').value.trim();
  const rawInput = document.getElementById('veh-brand-model-input').value.trim();
  let brand = document.getElementById('veh-brand').value.trim();
  let model = document.getElementById('veh-model').value.trim();
  const color = (document.getElementById('veh-form-color')?.value || 'branco').trim().toLowerCase();
  const year = parseInt(document.getElementById('veh-form-year').value, 10);
  const hasAC = document.getElementById('veh-form-has-ac').checked;
  const hasUSB = document.getElementById('veh-form-has-usb').checked;
  const noSmoking = document.getElementById('veh-form-no-smoking').checked;
  const noPets = document.getElementById('veh-form-no-pets').checked;
  const acceptsLuggage = document.getElementById('veh-form-accepts-luggage')?.value === 'YES';
  const selectedLuggagePolicy = document.getElementById('veh-form-luggage-policy')?.value || '1_MEDIUM';
  const luggagePolicy = acceptsLuggage ? selectedLuggagePolicy : 'NONE';
  const isPrimary = document.getElementById('veh-form-is-primary').checked;

  if (!plate) {
    showToast('Por favor, informe a placa do veículo.', 'error');
    return;
  }

  if (!rawInput) {
    showToast('Por favor, informe a marca e o modelo do veículo.', 'error');
    return;
  }

  // Se o usuário digitou diretamente sem clicar no dropdown
  if (!brand || !model || `${brand} ${model}`.toLowerCase() !== rawInput.toLowerCase()) {
    const parts = rawInput.split(' ');
    brand = parts[0] || 'Veículo';
    model = parts.slice(1).join(' ') || parts[0];
  }

  if (vehicleId) {
    store.updateVehicle(vehicleId, { brand, model, plate, renavam, year, color, hasAC, hasUSB, noSmoking, noPets, luggagePolicy, isPrimary });
    showToast('Veículo atualizado com sucesso!', 'success');
  } else {
    store.addVehicle({ brand, model, plate, renavam, year, color, hasAC, hasUSB, noSmoking, noPets, luggagePolicy, isPrimary });
    showToast('Novo veículo cadastrado com sucesso!', 'success');
  }

  closeModal();
}

function openDeleteVehicleModal(vehicleId) {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  const veh = (store.state.currentUser.vehicles || []).find(v => v.id === vehicleId);
  if (!veh) return;

  modalRoot.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-uber-black/80 backdrop-blur-xs animate-fade-in">
      <div class="bg-white rounded-t-2xl sm:rounded-2xl border border-uber-border shadow-2xl max-w-md w-full p-5 sm:p-6 text-left">
        <div class="flex items-center gap-3 pb-3 border-b border-uber-border">
          <div class="bg-red-50 text-red-600 p-2.5 rounded-xl flex items-center justify-center">
            ${icon('delete', { size: 'md' })}
          </div>
          <div>
            <h3 class="font-bold text-lg text-uber-black leading-tight">Excluir Veículo</h3>
            <p class="text-xs text-uber-iron font-normal">Confirmação de remoção</p>
          </div>
        </div>

        <div class="py-4 text-xs text-uber-charcoal space-y-2">
          <p>Deseja realmente remover o veículo <strong class="text-uber-black font-bold">${veh.brand} ${veh.model}</strong> (Placa: <strong class="font-mono text-uber-black font-bold">${veh.plate}</strong>)?</p>
          <div class="p-3 bg-uber-gray border border-uber-border rounded-lg text-uber-iron">
            Esta ação não pode ser desfeita. O veículo será removido do seu perfil.
          </div>
        </div>

        <div class="pt-2 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
          <button
            type="button"
            onclick="closeModal()"
            class="w-full sm:w-auto h-11 px-5 border border-uber-border hover:bg-uber-gray text-uber-black text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onclick="handleConfirmDeleteVehicle('${vehicleId}')"
            class="w-full sm:w-auto h-11 px-6 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 shadow-md transition-all cursor-pointer"
          >
            ${icon('delete', { size: 'sm' })}
            <span>Excluir Veículo</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function handleConfirmDeleteVehicle(vehicleId) {
  store.deleteVehicle(vehicleId);
  closeModal();
  showToast('Veículo removido com sucesso.', 'info');
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
  const b = store.state.bookings.find(x => x.id === bookingId);
  if (b) {
    const ride = store.state.rides.find(r => r.id === b.rideId);
    pushNotification({
      title: 'Pagamento Confirmado',
      body: 'Seu pagamento via PIX foi identificado. Vaga garantida!',
      icon: 'check_circle',
      href: '#/minhas-viagens',
      category: 'payment',
      role: 'PASSENGER',
      userId: b.passengerId
    });
    if (ride) {
      pushNotification({
        title: 'Novo passageiro confirmado',
        body: `O passageiro ${b.passengerName} pagou o sinal para a viagem a ${ride.destinationCity}.`,
        icon: 'payments',
        href: `#/viagem/${ride.id}`,
        category: 'payment',
        role: 'DRIVER',
        userId: ride.driverId
      });
      pushNotification({
        title: 'Sinal recebido em custódia',
        body: `PIX de ${b.passengerName} (Reserva ${bookingId}) foi recebido.`,
        icon: 'account_balance',
        href: '#/admin',
        category: 'payment',
        role: 'ADMIN'
      });
    }
  }
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
// 8.5. PERFIL PÚBLICO DO MOTORISTA
// ==========================================

function viewDriverProfile(driverId) {
  const driver = getDriverProfile(driverId);
  const driverRides = store.state.rides.filter(r => r.driverId === driverId);

  return `
    <div class="max-w-3xl mx-auto px-4 py-6 text-left pb-32 md:pb-16 animate-fade-in">
      <button onclick="window.history.back()" class="flex items-center gap-1.5 text-xs font-bold text-uber-black hover:text-uber-iron mb-5 transition-colors">
        ${icon('arrow_back', { size: 'sm' })}
        <span>Voltar</span>
      </button>

      <div class="space-y-5">
        
        <!-- Header Card with Verification & Reputation -->
        <div class="p-5 sm:p-6 border border-uber-border bg-white rounded-2xl shadow-sm">
          <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-5 border-b border-uber-border text-center sm:text-left">
            <div class="relative">
              <img src="${driver.avatar}" alt="${driver.name}" class="w-20 h-20 rounded-full object-cover border-2 border-uber-border bg-uber-gray shadow-xs" />
              <div class="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center border-2 border-white shadow-xs" title="Motorista Verificado">
                ${icon('check', { size: 'sm' })}
              </div>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 class="text-xl sm:text-2xl font-extrabold text-uber-black">${driver.name}</h1>
                <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                  ${icon('verified', { size: 'sm', className: 'text-emerald-600' })}
                  <span>Verificado</span>
                </span>
              </div>

              <p class="text-xs text-uber-iron font-medium mt-1">
                ${driver.city} • Membro desde ${driver.memberSince}
              </p>

              <div class="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-uber-black mt-2">
                <div class="flex items-center gap-1">
                  ${icon('star', { size: 'sm', fill: true, className: 'star-gold' })}
                  <span class="font-bold">${driver.rating.toFixed(2)}</span>
                </div>
                <span class="text-uber-border">•</span>
                <span class="text-uber-charcoal">${driver.totalTrips} viagens realizadas na cooperativa</span>
              </div>
            </div>
          </div>

          ${driver.bio ? `
            <div class="pt-4 text-xs text-uber-charcoal leading-relaxed font-normal">
              <span class="font-bold text-uber-black block mb-1">Apresentação:</span>
              <p>${driver.bio}</p>
            </div>
          ` : ''}
        </div>

        <!-- Vehicle Details -->
        <div class="p-4 sm:p-5 border border-uber-border bg-white rounded-xl">
          <div class="flex items-center justify-between pb-3 border-b border-uber-border">
            <div class="flex items-center gap-2">
              ${icon('directions_car', { size: 'md', className: 'text-uber-black' })}
              <h2 class="font-bold text-sm sm:text-base text-uber-black">Veículo de Viagem</h2>
            </div>
            <span class="text-xs font-semibold px-2 py-0.5 bg-uber-gray border border-uber-border rounded-md text-uber-charcoal">
              ${driver.vehicle.year}
            </span>
          </div>

          <div class="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <div class="w-32 h-22 flex items-center justify-center shrink-0">
              <img src="${getVehicleImage(driver.vehicle)}" alt="${driver.vehicle.brand} ${driver.vehicle.model}" class="w-full h-full object-contain filter drop-shadow-xs" />
            </div>

            <div class="flex-1 w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div class="p-2.5 bg-uber-gray border border-uber-border rounded-lg">
                <span class="font-semibold text-uber-iron block text-[10px] uppercase tracking-wider">Modelo</span>
                <p class="font-bold text-uber-black mt-0.5 text-xs">${driver.vehicle.brand} ${driver.vehicle.model}</p>
              </div>
              <div class="p-2.5 bg-uber-gray border border-uber-border rounded-lg">
                <span class="font-semibold text-uber-iron block text-[10px] uppercase tracking-wider">Cor</span>
                <div class="flex items-center gap-1.5 mt-0.5">
                  <span class="w-3 h-3 rounded-xs inline-block border ${getVehicleColorObj(driver.vehicle.color).border}" style="background-color: ${getVehicleColorObj(driver.vehicle.color).hex}"></span>
                  <span class="font-bold text-uber-black text-xs truncate">${getVehicleColorName(driver.vehicle.color)}</span>
                </div>
              </div>
              <div class="p-2.5 bg-uber-gray border border-uber-border rounded-lg">
                <span class="font-semibold text-uber-iron block text-[10px] uppercase tracking-wider">Placa</span>
                <p class="font-mono font-bold text-uber-black mt-0.5 text-xs">${driver.vehicle.plate}</p>
              </div>
              <div class="p-2.5 bg-uber-gray border border-uber-border rounded-lg">
                <span class="font-semibold text-uber-iron block text-[10px] uppercase tracking-wider">Regras / Malas</span>
                <div class="flex items-center gap-1.5 mt-0.5 text-uber-charcoal">
                  ${driver.vehicle.hasAC ? `<span title="Ar-condicionado">${icon('ac_unit', { size: 'xs' })}</span>` : ''}
                  ${driver.vehicle.hasUSB ? `<span title="Carregador USB">${icon('usb', { size: 'xs' })}</span>` : ''}
                  ${driver.vehicle.noSmoking ? `<span title="Proibido fumar">${icon('smoke_free', { size: 'xs' })}</span>` : ''}
                  ${driver.vehicle.noPets ? `<span title="Sem animais de estimação">${icon('pets', { size: 'xs', className: 'line-through opacity-60' })}</span>` : ''}
                  <span title="${getLuggageInfo(driver.vehicle).label}">${icon(getLuggageInfo(driver.vehicle).iconName, { size: 'xs' })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Passenger Reviews -->
        <div class="p-4 sm:p-5 border border-uber-border bg-white rounded-xl space-y-3">
          <div class="flex items-center justify-between pb-3 border-b border-uber-border h-8">
            <div class="flex items-center gap-2">
              ${icon('reviews', { size: 'sm', className: 'text-uber-black' })}
              <h2 class="font-bold text-sm sm:text-base text-uber-black">Avaliações dos Passageiros</h2>
            </div>
            <span class="text-xs font-bold text-amber-600 flex items-center gap-1">
              ${icon('star', { size: 'sm', fill: true, className: 'star-gold' })}
              ${driver.rating.toFixed(1)} / 5.0
            </span>
          </div>

          <div class="space-y-3 pt-1">
            ${driver.reviews && driver.reviews.length > 0 ? driver.reviews.map(rev => `
              <div class="p-3.5 bg-uber-gray rounded-xl border border-uber-border space-y-1.5">
                <div class="flex justify-between items-center text-xs">
                  <span class="font-bold text-uber-black">${rev.passenger}</span>
                  <span class="text-[11px] text-uber-iron font-normal">${rev.date}</span>
                </div>
                <div class="flex items-center gap-1">
                  ${[1, 2, 3, 4, 5].map(st => `
                    ${icon('star', { size: 'sm', fill: st <= rev.rating, className: st <= rev.rating ? 'star-gold' : 'star-empty' })}
                  `).join('')}
                </div>
                <p class="text-xs text-uber-charcoal font-normal leading-relaxed">${rev.comment}</p>
                ${rev.tags && rev.tags.length > 0 ? `
                  <div class="flex flex-wrap gap-1.5 pt-1">
                    ${rev.tags.map(t => `
                      <span class="text-[10px] font-semibold text-uber-black bg-white border border-uber-border px-2 py-0.5 rounded-md">${t}</span>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            `).join('') : `
              <p class="text-xs text-uber-iron font-normal">Nenhuma avaliação detalhada ainda.</p>
            `}
          </div>
        </div>

        <!-- Available Rides from this Driver -->
        ${driverRides.length > 0 ? `
          <div class="pt-2">
            <h3 class="font-bold text-sm sm:text-base text-uber-black mb-3">Próximas Viagens com ${driver.name.split(' ')[0]}:</h3>
            <div class="flex flex-col gap-3">
              ${driverRides.map(r => renderRideCard(r)).join('')}
            </div>
          </div>
        ` : ''}

      </div>
    </div>
  `;
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
  } else if (path.startsWith('/motorista/')) {
    const driverId = path.replace('/motorista/', '');
    appRoot.innerHTML = viewDriverProfile(driverId);
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
  loadNotifications();
  // Semear notificações de exemplo na primeira visita (badge + dropdown)
  if (!localStorage.getItem('coop.notif.seeded')) {
    pushNotification({ title: 'Nova mensagem de Marcos Silva', body: '"Chego em 5 minutos no ponto de embarque."', icon: 'chat_bubble', href: '#/chat/ride-101', category: 'message' });
    pushNotification({ title: 'Pagamento do sinal confirmado', body: 'R$ 37,50 · PIX identificado', icon: 'payments', href: '#/minhas-viagens', category: 'payment' });
    pushNotification({ title: 'Reserva confirmada', body: 'Fortaleza → Juazeiro do Norte · 06:30', icon: 'event_available', href: '#/viagem/ride-101', category: 'booking' });
    localStorage.setItem('coop.notif.seeded', '1');
  }
  renderFooter();
  renderApp();
  // Atualiza o badge DEPOIS do render (o elemento notif-badge só existe após renderApp)
  updateNotificationBadge();
  // Fecha o dropdown de notificações ao clicar fora ou pressionar Esc
  document.addEventListener('click', (e) => {
    const panel = document.getElementById('notification-panel');
    if (!panel || panel.style.display === 'none') return;
    if (!panel.contains(e.target) && !e.target.closest('[onclick*="toggleNotificationCenter"]')) {
      panel.style.display = 'none';
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const panel = document.getElementById('notification-panel');
      if (panel) panel.style.display = 'none';
    }
  });
});

