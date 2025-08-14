
import type { AtmLocation } from '../types';

export const atmData: AtmLocation[] = [
  // Basseterre, St. Kitts
  { id: '1', name: 'SKNANB (St. Kitts-Nevis-Anguilla National Bank)', lat: 17.2965, lng: -62.7236, feeLevel: 'free', address: 'The Circus, Basseterre' },
  { id: '2', name: 'Republic Bank', lat: 17.2950, lng: -62.7225, feeLevel: 'low', address: 'Fort Street, Basseterre' },
  { id: '3', name: 'CIBC FirstCaribbean', lat: 17.2978, lng: -62.7210, feeLevel: 'high', address: 'Bay Road, Basseterre' },
  { id: '4', name: 'The Bank of Nevis (BON)', lat: 17.2945, lng: -62.7248, feeLevel: 'free', address: 'Cayon Street, Basseterre' },
  { id: '5', name: 'Rams Supermarket ATM', lat: 17.3001, lng: -62.7200, feeLevel: 'high', address: 'Bay Road, Basseterre' },

  // Frigate Bay, St. Kitts
  { id: '6', name: 'SKNANB', lat: 17.2880, lng: -62.6950, feeLevel: 'free', address: 'Zenway Boulevard, Frigate Bay' },
  { id: '7', name: 'Royal St. Kitts Hotel ATM', lat: 17.2915, lng: -62.6895, feeLevel: 'high', address: 'Frigate Bay Road' },
  { id: '8', name: 'St. Kitts Marriott Resort ATM', lat: 17.2865, lng: -62.6850, feeLevel: 'high', address: '858 Frigate Bay Road' },
  
  // RLB International Airport, St. Kitts
  { id: '9', name: 'SKNANB Airport ATM', lat: 17.3114, lng: -62.7185, feeLevel: 'free', address: 'Inside RLB Airport Arrivals Hall' },

  // Charlestown, Nevis
  { id: '10', name: 'The Bank of Nevis (BON) HQ', lat: 17.1390, lng: -62.6245, feeLevel: 'free', address: 'Main Street, Charlestown' },
  { id: '11', name: 'SKNANB (Nevis Branch)', lat: 17.1405, lng: -62.6230, feeLevel: 'free', address: 'Prince William Street, Charlestown' },
  { id: '12', name: 'Alexandra Hospital ATM', lat: 17.1450, lng: -62.6255, feeLevel: 'high', address: 'Government Road, Charlestown' },
  { id: '13', name: 'CIBC FirstCaribbean', lat: 17.1388, lng: -62.6252, feeLevel: 'high', address: 'Main Street, Charlestown' },

  // Other Nevis Locations
  { id: '14', name: 'BON (Vance Amory Airport)', lat: 17.2040, lng: -62.5900, feeLevel: 'free', address: 'Vance W. Amory International Airport' },
  { id: '15', name: 'Four Seasons Resort ATM', lat: 17.1180, lng: -62.6390, feeLevel: 'high', address: 'Pinney\'s Beach, Nevis' },
];