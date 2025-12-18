export interface Friend {
  id: string;
  name: string;
  icon: string;
  avatar?: string;
  balance: number;
  status: 'active' | 'pending';
}

export interface GroupMember {
  id: string;
  name: string;
  balance: number;
}

export interface Group {
  id: string;
  name: string;
  icon: string;
  balance: number;
  membersCount: number;
  members?: GroupMember[];
}

export const MOCK_FRIENDS: Friend[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    icon: '',
    balance: 45.5,
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
    balance: 120.0,
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
    members: [
      { id: '1', name: 'Sarah Johnson', balance: 150.0 },
      { id: '2', name: 'Mike Chen', balance: 120.25 },
      { id: '3', name: 'Emma Wilson', balance: 70.0 },
      { id: '4', name: 'Alex Rodriguez', balance: 0 },
    ],
  },
  {
    id: '2',
    name: 'Office Lunch',
    icon: '🍔',
    balance: -67.8,
    membersCount: 8,
    members: [
      { id: '5', name: 'John Smith', balance: -25.5 },
      { id: '6', name: 'Lisa Brown', balance: -42.3 },
    ],
  },
  {
    id: '3',
    name: 'Roommates',
    icon: '🏠',
    balance: 0,
    membersCount: 3,
    members: [],
  },
  {
    id: '4',
    name: 'Movie Night',
    icon: '🎬',
    balance: 15.5,
    membersCount: 4,
    members: [{ id: '7', name: 'David Lee', balance: 15.5 }],
  },
  {
    id: '5',
    name: 'Ski Weekend',
    icon: '⛷️',
    balance: 0,
    membersCount: 6,
    members: [],
  },
  {
    id: '6',
    name: 'Summer BBQ',
    icon: '🍖',
    balance: 0,
    membersCount: 10,
    members: [],
  },
];
