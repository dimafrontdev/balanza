export interface Friend {
  id: string;
  name: string;
  icon: string;
  avatar?: string;
  balance: number;
  status: 'active' | 'pending';
}

export interface Group {
  id: string;
  name: string;
  icon: string;
  balance: number;
  membersCount: number;
}

export const MOCK_FRIENDS: Friend[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    icon: '',
    balance: 45.50,
    status: 'active',
  },
  {
    id: '2',
    name: 'Mike Chen',
    icon: '',
    balance: -23.75,
    status: 'active',
  },
  {
    id: '3',
    name: 'Emma Wilson',
    icon: '',
    balance: 0,
    status: 'pending',
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    icon: '',
    balance: 120.00,
    status: 'active',
  },
  {
    id: '5',
    name: 'John Smith',
    icon: '',
    balance: 0,
    status: 'active',
  },
  {
    id: '6',
    name: 'Lisa Brown',
    icon: '',
    balance: 0,
    status: 'active',
  },
  {
    id: '7',
    name: 'David Lee',
    icon: '',
    balance: 0,
    status: 'active',
  },
];

export const MOCK_GROUPS: Group[] = [
  {
    id: '1',
    name: 'Barcelona Trip',
    icon: '✈️',
    balance: 340.25,
    membersCount: 5,
  },
  {
    id: '2',
    name: 'Office Lunch',
    icon: '🍔',
    balance: -67.80,
    membersCount: 8,
  },
  {
    id: '3',
    name: 'Roommates',
    icon: '🏠',
    balance: 0,
    membersCount: 3,
  },
  {
    id: '4',
    name: 'Movie Night',
    icon: '🎬',
    balance: 15.50,
    membersCount: 4,
  },
  {
    id: '5',
    name: 'Ski Weekend',
    icon: '⛷️',
    balance: 0,
    membersCount: 6,
  },
  {
    id: '6',
    name: 'Summer BBQ',
    icon: '🍖',
    balance: 0,
    membersCount: 10,
  },
];
