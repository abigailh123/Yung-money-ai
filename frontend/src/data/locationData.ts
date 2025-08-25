import type { LocationData } from '../types';

export const locationData: LocationData[] = [
  // Banks - St. Kitts
  {
    type: 'bank',
    id: 'bank-sknanb-circus',
    name: 'SKNANB (Main Branch)',
    lat: 17.2965,
    lng: -62.7236,
    address: 'The Circus, Basseterre',
    hours: 'Mon-Thu 8am-2pm, Fri 8am-4pm',
    features: ['ASPIRE Program Accounts', 'Student Accounts', 'Good for Teens', 'Largest bank in ECCU'],
  },
  {
    type: 'bank',
    id: 'bank-republic-fort',
    name: 'Republic Bank',
    lat: 17.2950,
    lng: -62.7225,
    address: 'Fort Street, Basseterre',
    hours: 'Mon-Thu 8am-2pm, Fri 8am-4pm',
    features: ['Strong Mobile App', 'Regional Presence', 'Online Banking'],
  },
  {
    type: 'bank',
    id: 'bank-cibc-bay',
    name: 'CIBC FirstCaribbean',
    lat: 17.2978,
    lng: -62.7210,
    address: 'Bay Road, Basseterre',
    hours: 'Mon-Fri 8am-2pm',
    features: ['Good for students studying abroad', 'Regional Bank'],
  },
  {
    type: 'bank',
    id: 'bank-bon-cayon',
    name: 'The Bank of Nevis (St. Kitts Branch)',
    lat: 17.2945,
    lng: -62.7248,
    address: 'Cayon Street, Basseterre',
    hours: 'Mon-Thu 8am-2pm, Fri 8am-4pm',
    features: ['Popular for Youth Accounts', 'Good Mobile App'],
  },
   {
    type: 'bank',
    id: 'bank-dbskn',
    name: 'Development Bank of St. Kitts & Nevis',
    lat: 17.2938,
    lng: -62.7220,
    address: 'Church Street, Basseterre',
    hours: 'Mon-Fri 8am-3pm',
    features: ['Student Loans', 'Youth Entrepreneurship Support', 'Small Business Loans'],
  },

  // Credit Unions - St. Kitts
  {
    type: 'credit-union',
    id: 'cu-skccu',
    name: 'St. Kitts Co-operative Credit Union',
    lat: 17.2985,
    lng: -62.7250,
    address: 'Bladen Commercial Development, Basseterre',
    hours: 'Mon-Fri 8am-3pm',
    features: ['Great for Teens (low min. deposit)', 'Excellent Mobile App'],
  },
  
  // Banks - Nevis
  {
    type: 'bank',
    id: 'bank-bon-hq',
    name: 'The Bank of Nevis (HQ)',
    lat: 17.1390,
    lng: -62.6245,
    address: 'Main Street, Charlestown',
    hours: 'Mon-Thu 8am-2pm, Fri 8am-4pm',
    features: ['Popular for Youth Accounts', 'Good Mobile App', 'Headquarters'],
  },
  {
    type: 'bank',
    id: 'bank-sknanb-nevis',
    name: 'SKNANB (Nevis Branch)',
    lat: 17.1405,
    lng: -62.6230,
    address: 'Prince William Street, Charlestown',
    hours: 'Mon-Thu 8am-2pm, Fri 8am-4pm',
    features: ['ASPIRE Program Accounts', 'Student Accounts'],
  },

  // Credit Unions - Nevis
  {
    type: 'credit-union',
    id: 'cu-nccu',
    name: 'Nevis Co-operative Credit Union',
    lat: 17.1412,
    lng: -62.6248,
    address: 'Chapel Street, Charlestown',
    hours: 'Mon-Fri 8am-3pm',
    features: ['For SKN citizens/nationals ONLY', 'No international transfers'],
  },
  
  // ATMs - Basseterre, St. Kitts
  { type: 'atm', id: 'atm-1', name: 'SKNANB ATM', lat: 17.2965, lng: -62.7236, feeLevel: 'free', address: 'The Circus, Basseterre' },
  { type: 'atm', id: 'atm-2', name: 'Republic Bank ATM', lat: 17.2950, lng: -62.7225, feeLevel: 'low', address: 'Fort Street, Basseterre' },
  { type: 'atm', id: 'atm-3', name: 'CIBC FirstCaribbean ATM', lat: 17.2978, lng: -62.7210, feeLevel: 'high', address: 'Bay Road, Basseterre' },
  { type: 'atm', id: 'atm-4', name: 'The Bank of Nevis (BON) ATM', lat: 17.2945, lng: -62.7248, feeLevel: 'free', address: 'Cayon Street, Basseterre' },
  { type: 'atm', id: 'atm-5', name: 'Rams Supermarket ATM', lat: 17.3001, lng: -62.7200, feeLevel: 'high', address: 'Bay Road, Basseterre' },

  // ATMs - Frigate Bay, St. Kitts
  { type: 'atm', id: 'atm-6', name: 'SKNANB ATM', lat: 17.2880, lng: -62.6950, feeLevel: 'free', address: 'Zenway Boulevard, Frigate Bay' },
  { type: 'atm', id: 'atm-7', name: 'Royal St. Kitts Hotel ATM', lat: 17.2915, lng: -62.6895, feeLevel: 'high', address: 'Frigate Bay Road' },
  { type: 'atm', id: 'atm-8', name: 'St. Kitts Marriott Resort ATM', lat: 17.2865, lng: -62.6850, feeLevel: 'high', address: '858 Frigate Bay Road' },
  
  // ATMs - RLB International Airport, St. Kitts
  { type: 'atm', id: 'atm-9', name: 'SKNANB Airport ATM', lat: 17.3114, lng: -62.7185, feeLevel: 'free', address: 'Inside RLB Airport Arrivals Hall' },

  // ATMs - Charlestown, Nevis
  { type: 'atm', id: 'atm-10', name: 'The Bank of Nevis (BON) HQ ATM', lat: 17.1390, lng: -62.6245, feeLevel: 'free', address: 'Main Street, Charlestown' },
  { type: 'atm', id: 'atm-11', name: 'SKNANB (Nevis Branch) ATM', lat: 17.1405, lng: -62.6230, feeLevel: 'free', address: 'Prince William Street, Charlestown' },
  { type: 'atm', id: 'atm-12', name: 'Alexandra Hospital ATM', lat: 17.1450, lng: -62.6255, feeLevel: 'high', address: 'Government Road, Charlestown' },
  { type: 'atm', id: 'atm-13', name: 'CIBC FirstCaribbean ATM', lat: 17.1388, lng: -62.6252, feeLevel: 'high', address: 'Main Street, Charlestown' },

  // ATMs - Other Nevis Locations
  { type: 'atm', id: 'atm-14', name: 'BON (Vance Amory Airport) ATM', lat: 17.2040, lng: -62.5900, feeLevel: 'free', address: 'Vance W. Amory International Airport' },
  { type: 'atm', id: 'atm-15', name: 'Four Seasons Resort ATM', lat: 17.1180, lng: -62.6390, feeLevel: 'high', address: 'Pinney\'s Beach, Nevis' },
];

