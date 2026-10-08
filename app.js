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
    vehicles: [
      {
        id: 'veh-001',
        brand: 'Toyota',
        model: 'Corolla Sedan 2.0',
        plate: 'BRA-2E19',
        renavam: '98765432101',
        year: 2023,
        hasAC: true,
        hasUSB: true,
        isPrimary: true,
      }
    ],
    vehicle: {
      id: 'veh-001',
      plate: 'BRA-2E19',
      state: 'CE',
      brand: 'Toyota',
      model: 'Corolla Sedan 2.0',
      renavam: '98765432101',
      year: 2023,
      hasAC: true,
      hasUSB: true,
      isPrimary: true,
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

  addVehicle({ brand, model, plate, renavam, year, hasAC, hasUSB, isPrimary }) {
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
      plate: (plate || '').toUpperCase().trim(),
      renavam: (renavam || '').trim(),
      year: parseInt(year, 10) || new Date().getFullYear(),
      hasAC: !!hasAC,
      hasUSB: !!hasUSB,
      isPrimary: shouldBePrimary,
    };

    this.state.currentUser.vehicles.unshift(newVehicle);
    if (shouldBePrimary) {
      this.state.currentUser.vehicle = newVehicle;
    }
    this.saveState();
    renderApp();
  }

  updateVehicle(vehicleId, { brand, model, plate, renavam, year, hasAC, hasUSB, isPrimary }) {
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
      plate: (plate || '').toUpperCase().trim(),
      renavam: (renavam || '').trim(),
      year: parseInt(year, 10) || this.state.currentUser.vehicles[idx].year,
      hasAC: !!hasAC,
      hasUSB: !!hasUSB,
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
    SoundEngine.play('message');
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
  const dropdown = document.getElementById('veh-model-dropdown');
  const previewImg = document.getElementById('veh-modal-preview-img');

  if (input) input.value = `${brand} ${model}`;
  if (brandInput) brandInput.value = brand;
  if (modelInput) modelInput.value = model;
  if (previewImg) previewImg.src = getVehicleImage(brand, model);

  if (dropdown) dropdown.classList.add('hidden');
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

function getVehicleImage(vehicleOrBrand, model = '') {
  let brand = '';
  let mod = '';
  if (typeof vehicleOrBrand === 'object' && vehicleOrBrand !== null) {
    brand = vehicleOrBrand.brand || '';
    mod = vehicleOrBrand.model || '';
  } else {
    brand = vehicleOrBrand || '';
    mod = model || '';
  }

  const category = getVehicleCategory(brand, mod);
  return `assets/vehicles/${category}.svg`;
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
});

function renderHeroSearchBar() {
  const { origin, destination, date, seats } = store.state.searchParams;
  const todayStr = new Date().toISOString().split('T')[0];

  return `
    <div class="w-full max-w-6xl xl:max-w-7xl mx-auto relative overflow-visible">
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
                value="${origin}"
                placeholder="Origem (Ex: Fortaleza, CE)"
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
                value="${destination}"
                placeholder="Destino (Ex: Juazeiro, CE)"
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

        <div class="flex items-center gap-2.5 text-uber-iron shrink-0">
          ${ride.vehicle.hasAC ? `<span title="Ar-condicionado" class="flex items-center">${icon('ac_unit', { size: 'sm', className: 'text-uber-iron' })}</span>` : ''}
          ${ride.vehicle.hasUSB ? `<span title="Carregador USB" class="flex items-center">${icon('usb', { size: 'sm', className: 'text-uber-iron' })}</span>` : ''}
          <div class="flex items-center gap-1.5 bg-uber-gray px-2 py-1 rounded-md border border-uber-border">
            <img src="${getVehicleImage(ride.vehicle)}" alt="${ride.vehicle.model}" class="w-8 h-5 object-contain shrink-0" />
            <span title="${ride.vehicle.model}" class="text-xs text-uber-black font-semibold hidden sm:inline truncate max-w-[120px]">
              ${ride.vehicle.model}
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
        <div class="relative z-20 max-w-6xl xl:max-w-7xl mx-auto text-center flex flex-col items-center gap-4 w-full">
          
          <h1 class="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight text-white drop-shadow-md">
            Viagens Compartilhadas pelo Nordeste
          </h1>

          <p class="text-white/90 text-sm sm:text-base max-w-2xl font-medium drop-shadow-md">
            Encontre motoristas verificados, garanta sua vaga com 50% no PIX e pague o restante na chegada.
          </p>

          <div class="w-full mt-4">
            ${renderHeroSearchBar()}
          </div>
        </div>
      </section>

      <!-- Popular Routes with Location Photos (Nordeste) -->
      <section class="max-w-6xl xl:max-w-7xl mx-auto px-4 w-full">
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
    <div class="max-w-6xl xl:max-w-7xl mx-auto px-4 py-6 text-left animate-fade-in">
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
            <div class="w-24 h-16 bg-uber-gray border border-uber-border rounded-lg flex items-center justify-center p-1.5 shrink-0 overflow-hidden shadow-2xs">
              <img src="${getVehicleImage(ride.vehicle)}" alt="${ride.vehicle.brand} ${ride.vehicle.model}" class="w-full h-full object-contain" />
            </div>
            <div>
              <span class="text-[10px] font-bold text-uber-iron uppercase tracking-wider block">Veículo Confirmado</span>
              <h4 class="text-sm sm:text-base font-bold text-uber-black">${ride.vehicle.brand} ${ride.vehicle.model}</h4>
              <div class="flex items-center gap-2 mt-1 text-xs text-uber-charcoal">
                <span class="font-mono font-bold bg-uber-gray px-1.5 py-0.5 rounded border border-uber-border text-[11px]">${ride.vehicle.plate}</span>
                <span class="text-uber-border">•</span>
                <span>Ano ${ride.vehicle.year}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 text-xs font-semibold text-uber-charcoal w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-uber-border">
            ${ride.vehicle.hasAC ? `<span class="inline-flex items-center gap-1 bg-uber-gray px-2.5 py-1 rounded-md text-[11px] border border-uber-border">${icon('ac_unit', { size: 'sm' })} Ar-condicionado</span>` : ''}
            ${ride.vehicle.hasUSB ? `<span class="inline-flex items-center gap-1 bg-uber-gray px-2.5 py-1 rounded-md text-[11px] border border-uber-border">${icon('usb', { size: 'sm' })} USB</span>` : ''}
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
            const isAccepted = b.status === 'ACCEPTED' || b.status === 'SIGNAL_CONFIRMED' || b.status === 'FULLY_PAID';
            const isAwaiting = b.status === 'AWAITING_DRIVER';

            return `
              <div class="p-4 border border-uber-border bg-white rounded-xl">
                <div class="flex justify-between items-center pb-3 border-b border-uber-border text-xs">
                  <span class="font-mono font-medium text-uber-iron">${b.id}</span>
                  ${isAwaiting ? `
                    <span class="flex items-center gap-1.5 font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full text-[11px] border border-amber-200">
                      ${icon('hourglass_top', { size: 'sm', className: 'text-amber-700' })}
                      <span>Aguardando Motorista</span>
                    </span>
                  ` : isAccepted ? `
                    <span class="flex items-center gap-1.5 font-bold text-uber-black bg-uber-gray px-2.5 py-1 rounded-full text-[11px]">
                      ${icon('check_circle', { size: 'sm', className: 'text-uber-black' })}
                      <span>Viagem Confirmada</span>
                    </span>
                  ` : `
                    <span class="flex items-center gap-1.5 font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full text-[11px]">
                      ${icon('cancel', { size: 'sm', className: 'text-red-600' })}
                      <span>${b.status === 'REJECTED_BY_DRIVER' ? 'Recusada pelo Motorista' : 'Cancelada'}</span>
                    </span>
                  `}
                </div>

                ${ride ? `
                  <div class="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div class="flex items-center gap-3">
                      <div class="w-14 h-10 rounded-lg bg-uber-gray border border-uber-border flex items-center justify-center p-1 shrink-0 overflow-hidden shadow-2xs">
                        <img src="${getVehicleImage(ride.vehicle)}" alt="${ride.vehicle.model}" class="w-full h-full object-contain" />
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

      <!-- Driver Section -->
      ${role === 'DRIVER' ? `
        <div class="space-y-4">
          ${myPublished.length > 0 ? myPublished.map(ride => {
            const rideBookings = bookings.filter(b => b.rideId === ride.id && b.status !== 'CANCELLED');

            return `
              <div class="p-4 sm:p-5 border border-uber-border bg-white rounded-xl flex flex-col gap-3">
                <div class="flex justify-between items-center pb-3 border-b border-uber-border text-xs">
                  <span class="font-bold text-sm sm:text-base text-uber-black">${ride.originCity} ➔ ${ride.destinationCity}</span>
                  <span class="flex items-center gap-1.5 font-bold text-uber-black bg-uber-gray px-2.5 py-1 rounded-full text-[11px]">
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
                  <a href="#/chat/${ride.id}" class="font-semibold text-uber-black hover:bg-uber-border flex items-center gap-1.5 px-3 py-1.5 bg-uber-gray rounded-lg transition-colors active:scale-95">
                    ${icon('chat', { size: 'sm' })}
                    <span>Abrir Chat</span>
                  </a>
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

function handleDriverAcceptBooking(bookingId) {
  store.acceptBooking(bookingId);
  showToast('Reserva aceita com sucesso! O chat foi liberado para o passageiro.', 'success');
}

function handleDriverRejectBooking(bookingId) {
  store.rejectBooking(bookingId);
  showToast('Reserva recusada.', 'warning');
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

// View: Chat em Tela Cheia (Fullscreen)
function viewChat(rideId) {
  const ride = store.state.rides.find(r => r.id === rideId);
  const rideMessages = store.state.messages.filter(m => m.rideId === rideId);
  const myId = store.state.currentUser.id;
  const isDriver = store.state.role === 'DRIVER';
  const myBooking = store.state.bookings.find(b => b.rideId === rideId && b.passengerId === myId);

  // Se for passageiro e a reserva ainda não foi aceita pelo motorista
  if (!isDriver && myBooking && myBooking.status === 'AWAITING_DRIVER') {
    return `
      <div class="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div class="w-16 h-16 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center mb-4 border border-amber-200">
          ${icon('hourglass_top', { size: 'lg' })}
        </div>
        <h2 class="text-xl font-bold text-uber-black">Aguardando Confirmação do Motorista</h2>
        <p class="text-uber-iron text-xs sm:text-sm font-normal mt-1.5 max-w-sm">
          O chat em tela cheia com o motorista será liberado assim que o motorista aceitar sua solicitação de reserva.
        </p>
        <div class="mt-6 flex flex-col sm:flex-row gap-2 w-full max-w-xs">
          <button onclick="window.history.back()" class="w-full h-11 bg-uber-gray text-uber-black font-semibold rounded-xl text-sm">
            Voltar
          </button>
          <a href="#/minhas-viagens" class="w-full h-11 bg-black text-white font-bold rounded-xl text-sm flex items-center justify-center">
            Minhas Reservas
          </a>
        </div>
      </div>
    `;
  }

  return `
    <div class="fixed inset-0 z-50 bg-white flex flex-col h-screen w-full animate-fade-in overflow-hidden">
      
      <!-- Fullscreen Top Bar -->
      <div class="bg-white border-b border-uber-border px-4 py-3 flex items-center justify-between shrink-0 shadow-xs">
        <div class="flex items-center gap-3 min-w-0">
          <button onclick="window.history.back()" class="p-2 hover:bg-uber-gray rounded-xl transition-colors text-uber-black shrink-0" aria-label="Voltar">
            ${icon('arrow_back', { size: 'md' })}
          </button>
          <img src="${ride ? ride.driverAvatar : DEFAULT_BLANK_AVATAR}" alt="${ride ? ride.driverName : 'Motorista'}" class="w-10 h-10 rounded-full object-cover border border-uber-border bg-uber-gray shrink-0" />
          <div class="text-left min-w-0">
            <div class="flex items-center gap-1.5">
              <h1 class="text-sm font-bold text-uber-black leading-tight truncate">${ride ? ride.driverName : 'Motorista'}</h1>
              <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Online"></span>
            </div>
            <p class="text-[11px] font-medium text-uber-iron truncate">
              ${ride ? `${ride.originCity} ➔ ${ride.destinationCity}` : 'Chat Direto'}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-1 shrink-0">
          <a href="#/viagem/${rideId}" class="p-2 hover:bg-uber-gray rounded-xl text-uber-black transition-colors" title="Ver Detalhes da Viagem">
            ${icon('info', { size: 'md' })}
          </a>
        </div>
      </div>

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
            <p class="mt-1 text-uber-iron leading-relaxed">Combine ponto de encontro, bagagens e horários diretamente com o motorista.</p>
          </div>
        `}
      </div>

      <!-- Sticky Input Form (Icon only for submit, NO 'Enviar' text) -->
      <div class="p-3 bg-white border-t border-uber-border shrink-0">
        <form onsubmit="handleSendChat(event, '${rideId}')" class="max-w-3xl mx-auto flex items-center gap-2">
          <input
            id="chat-input"
            type="text"
            placeholder="Digite sua mensagem para o motorista..."
            required
            autocomplete="off"
            class="flex-1 h-12 bg-uber-gray border border-uber-border focus:border-uber-black focus:bg-white text-uber-black font-medium px-4 rounded-xl focus:outline-none text-xs sm:text-sm transition-all"
          />
          <button
            type="submit"
            aria-label="Enviar Mensagem"
            title="Enviar"
            class="w-12 h-12 shrink-0 font-bold bg-black text-white hover:bg-neutral-900 rounded-xl flex items-center justify-center transition-transform active:scale-90 shadow-md"
          >
            ${icon('send', { size: 'sm' })}
          </button>
        </form>
      </div>
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
                ${currentUser.vehicles.map(veh => `
                  <div class="p-3.5 sm:p-4 bg-uber-gray border border-uber-border rounded-xl flex flex-col gap-3 transition-all hover:border-uber-charcoal">
                    <div class="flex items-start justify-between gap-3">
                      <div class="flex items-center gap-3 min-w-0">
                        <div class="w-16 h-11 bg-white border border-uber-border rounded-lg flex items-center justify-center p-1 shrink-0 overflow-hidden shadow-2xs">
                          <img src="${getVehicleImage(veh)}" alt="${veh.brand} ${veh.model}" class="w-full h-full object-contain" />
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
                          <p class="text-[11px] text-uber-iron mt-0.5">Ano ${veh.year} • Placa ${veh.plate}</p>
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
                        <span class="font-medium text-uber-iron block text-[10px] uppercase tracking-wider">RENAVAM</span>
                        <p class="font-mono font-bold text-uber-black mt-0.5 text-xs">${veh.renavam || 'Não inf.'}</p>
                      </div>
                      <div class="p-2.5 bg-white border border-uber-border rounded-lg">
                        <span class="font-medium text-uber-iron block text-[10px] uppercase tracking-wider">Ano</span>
                        <p class="font-bold text-uber-black mt-0.5 text-xs">${veh.year}</p>
                      </div>
                      <div class="p-2.5 bg-white border border-uber-border rounded-lg">
                        <span class="font-medium text-uber-iron block text-[10px] uppercase tracking-wider">Recursos</span>
                        <div class="flex items-center gap-1.5 mt-0.5 text-uber-black font-semibold text-[11px] flex-wrap">
                          ${veh.hasAC ? `<span title="Ar-condicionado" class="inline-flex items-center gap-0.5">${icon('ac_unit', { size: 'sm', className: 'text-uber-charcoal' })} Ar</span>` : ''}
                          ${veh.hasUSB ? `<span title="Entrada USB" class="inline-flex items-center gap-0.5">${icon('usb', { size: 'sm', className: 'text-uber-charcoal' })} USB</span>` : ''}
                          ${!veh.hasAC && !veh.hasUSB ? '<span class="text-uber-iron font-normal">Básico</span>' : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                `).join('')}
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

function openVehicleModal(vehicleId = null) {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  const isEdit = !!vehicleId;
  const veh = isEdit 
    ? (store.state.currentUser.vehicles || []).find(v => v.id === vehicleId) 
    : null;

  const currentYear = new Date().getFullYear();
  const selectedYear = veh ? veh.year : currentYear;

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
              <p class="text-xs text-uber-iron font-normal">Informações para viagens e conformidade com a Cooperativa</p>
            </div>
          </div>
          <button type="button" onclick="closeModal()" class="text-uber-iron hover:text-uber-black p-1.5 rounded-lg hover:bg-uber-gray transition-colors cursor-pointer" aria-label="Fechar">
            ${icon('close', { size: 'md' })}
          </button>
        </div>

        <form onsubmit="handleSaveVehicle(event, '${vehicleId || ''}')" class="pt-4 space-y-4">
          <!-- Real-time Vehicle Visual Preview Card (Uber Style) -->
          <div class="p-3 bg-uber-gray border border-uber-border rounded-xl flex items-center gap-3.5">
            <div class="w-20 h-13 bg-white border border-uber-border rounded-lg flex items-center justify-center p-1 shrink-0 overflow-hidden shadow-2xs">
              <img id="veh-modal-preview-img" src="${getVehicleImage(brandVal, modelVal)}" alt="Prévia do Veículo" class="w-full h-full object-contain" />
            </div>
            <div class="min-w-0">
              <span class="text-[10px] font-bold uppercase tracking-wider text-uber-iron block">Render do Modelo</span>
              <span class="text-xs font-bold text-uber-black truncate block">Atualizado automaticamente conforme o modelo</span>
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

          <!-- Recursos do Carro (Checkboxes) -->
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
            </div>
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

function handleSaveVehicle(e, vehicleId = null) {
  e.preventDefault();
  const plate = document.getElementById('veh-form-plate').value.trim().toUpperCase();
  const renavam = document.getElementById('veh-form-renavam').value.trim();
  const rawInput = document.getElementById('veh-brand-model-input').value.trim();
  let brand = document.getElementById('veh-brand').value.trim();
  let model = document.getElementById('veh-model').value.trim();
  const year = parseInt(document.getElementById('veh-form-year').value, 10);
  const hasAC = document.getElementById('veh-form-has-ac').checked;
  const hasUSB = document.getElementById('veh-form-has-usb').checked;
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
    store.updateVehicle(vehicleId, { brand, model, plate, renavam, year, hasAC, hasUSB, isPrimary });
    showToast('Veículo atualizado com sucesso!', 'success');
  } else {
    store.addVehicle({ brand, model, plate, renavam, year, hasAC, hasUSB, isPrimary });
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
                <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
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
            <div class="w-28 h-18 bg-uber-gray border border-uber-border rounded-xl flex items-center justify-center p-2 shrink-0 overflow-hidden shadow-2xs">
              <img src="${getVehicleImage(driver.vehicle)}" alt="${driver.vehicle.brand} ${driver.vehicle.model}" class="w-full h-full object-contain" />
            </div>

            <div class="flex-1 w-full grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div class="p-2.5 bg-uber-gray border border-uber-border rounded-lg">
                <span class="font-semibold text-uber-iron block text-[10px] uppercase tracking-wider">Modelo</span>
                <p class="font-bold text-uber-black mt-0.5 text-xs">${driver.vehicle.brand} ${driver.vehicle.model}</p>
              </div>
              <div class="p-2.5 bg-uber-gray border border-uber-border rounded-lg">
                <span class="font-semibold text-uber-iron block text-[10px] uppercase tracking-wider">Placa</span>
                <p class="font-mono font-bold text-uber-black mt-0.5 text-xs">${driver.vehicle.plate}</p>
              </div>
              <div class="p-2.5 bg-uber-gray border border-uber-border rounded-lg col-span-2 sm:col-span-1">
                <span class="font-semibold text-uber-iron block text-[10px] uppercase tracking-wider">Conforto</span>
                <p class="font-bold text-uber-black mt-0.5 text-xs">${driver.vehicle.hasAC ? 'Ar-condicionado' : ''} ${driver.vehicle.hasUSB ? '• USB' : ''}</p>
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
                      <span class="text-[10px] font-semibold text-uber-black bg-white border border-uber-border px-2 py-0.5 rounded-full">${t}</span>
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

// Suporte a gesto de arrastar na tela para trocar de aba (Swipe Navigation)
function setupSwipeNavigation() {
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  const minSwipeDistance = 60; // distância mínima em px para considerar swipe
  const maxPerpendicularDistance = 80; // tolerância vertical para não confundir com rolagem

  window.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipeGesture();
  }, { passive: true });

  function handleSwipeGesture() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Se o movimento vertical for maior que a tolerância, o usuário estava apenas rolando a página
    if (Math.abs(diffY) > maxPerpendicularDistance) return;

    if (Math.abs(diffX) < minSwipeDistance) return;

    const role = store.state.role;
    const currentPath = window.location.hash.slice(1) || '/';

    const tabs = [
      { href: '#/buscar', isActive: currentPath === '/' || currentPath === '/buscar' }
    ];

    if (role === 'DRIVER') {
      tabs.push({ href: '#/publicar', isActive: currentPath === '/publicar' });
    }
    if (role === 'ADMIN' || role === 'MANAGER') {
      tabs.push({ href: '#/admin', isActive: currentPath === '/admin' });
    }
    tabs.push(
      { href: '#/minhas-viagens', isActive: currentPath === '/minhas-viagens' },
      { href: '#/perfil', isActive: currentPath === '/perfil' }
    );

    let activeIdx = tabs.findIndex(t => t.isActive);
    if (activeIdx === -1) return; // se estiver em subpáginas de detalhe, não dispara swipe acidental

    if (diffX < 0) {
      // Swipe para a esquerda -> Próxima aba (tela surge da direita)
      if (activeIdx < tabs.length - 1) {
        if (typeof SoundEngine !== 'undefined') SoundEngine.play('info');
        const appRoot = document.getElementById('app-root');
        if (appRoot) {
          appRoot.classList.remove('animate-slide-left', 'animate-slide-right', 'animate-fade-in');
          void appRoot.offsetWidth; // trigger reflow
          appRoot.classList.add('animate-slide-left');
        }
        window.location.hash = tabs[activeIdx + 1].href;
      }
    } else {
      // Swipe para a direita -> Aba anterior (tela surge da esquerda)
      if (activeIdx > 0) {
        if (typeof SoundEngine !== 'undefined') SoundEngine.play('info');
        const appRoot = document.getElementById('app-root');
        if (appRoot) {
          appRoot.classList.remove('animate-slide-left', 'animate-slide-right', 'animate-fade-in');
          void appRoot.offsetWidth; // trigger reflow
          appRoot.classList.add('animate-slide-right');
        }
        window.location.hash = tabs[activeIdx - 1].href;
      }
    }
  }
}


window.addEventListener('hashchange', renderApp);
window.addEventListener('DOMContentLoaded', () => {
  renderFooter();
  renderApp();
  setupSwipeNavigation();
});

