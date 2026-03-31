import type { PlayerCard, RelatedCard } from '@/types';

export const playerCardData: PlayerCard = {
  id: 'marcus-green-epic-002',
  playerName: 'MARCUS GREEN - RARE',
  position: 'Wide Receiver',
  rarity: 'epic',
  serial: {
    current: 2,
    total: 100,
  },
  team: 'Alabama',
  stats: {
    rating: 91,
    height: "6'0\"",
    weight: '195 lbs',
  },
  price: {
    current: '1.8',
    currency: 'ETH',
    avgSale: '1.5',
  },
  availability: {
    forSale: 12,
    totalSupply: 100,
    unlisted: 45,
    locked: 28,
    burned: 15,
  },
  images: [
    '/images/player-card-main.jpg',
    '/images/player-thumb-1.jpg',
    '/images/player-thumb-2.jpg',
    '/images/player-thumb-3.jpg',
  ],
  description: "Marcus Green is a standout wide receiver from Alabama, known for his exceptional route running and game-breaking speed. At 6'0\" and 195 lbs, he combines athleticism with precise technique. This EPIC collectible captures his record-breaking performance with 3 touchdowns and 180 receiving yards in the state championship game.",
  gameStats: {
    team: 'Thompson High',
    opponent: 'Central Academy',
    teamScore: 42,
    opponentScore: 28,
    playerStats: {
      receptions: 8,
      yards: 180,
      touchdowns: 3,
    },
  },
  seasonAverages: {
    games: 12,
    receptions: 78,
    yards: 1245,
    touchdowns: 14,
    avgYards: 16.0,
  },
  salesHistory: {
    top: [
      { buyer: 'CryptoKing', price: '5.2 ETH', serial: '#1', date: 'Feb 20, 2026' },
      { buyer: 'NFTCollector', price: '3.8 ETH', serial: '#2', date: 'Feb 18, 2026' },
      { buyer: 'SportsFan', price: '2.9 ETH', serial: '#5', date: 'Feb 15, 2026' },
    ],
    recent: [
      { buyer: 'CardHunter', price: '1.8 ETH', serial: '#23', date: 'Feb 23, 2026' },
      { buyer: 'ETHWhale', price: '1.75 ETH', serial: '#31', date: 'Feb 22, 2026' },
      { buyer: 'RookieFan', price: '1.6 ETH', serial: '#45', date: 'Feb 21, 2026' },
      { buyer: 'GridIronPro', price: '1.55 ETH', serial: '#52', date: 'Feb 20, 2026' },
      { buyer: 'BamaFanatic', price: '1.5 ETH', serial: '#61', date: 'Feb 19, 2026' },
    ],
  },
  topCollectors: [
    { rank: 1, username: 'CardKing', avatar: '/images/avatar-1.jpg', count: 42 },
    { rank: 2, username: 'SportsNFT', avatar: '/images/avatar-2.jpg', count: 38 },
    { rank: 3, username: 'AlabamaFan', avatar: '/images/avatar-3.jpg', count: 27 },
    { rank: 4, username: 'CryptoCollector', avatar: '/images/avatar-4.jpg', count: 19 },
    { rank: 5, username: 'RookieHunter', avatar: '/images/avatar-5.jpg', count: 15 },
  ],
};

export const relatedCards: RelatedCard[] = [
  {
    id: 'qb-legendary-001',
    image: '/images/related-1.jpg',
    rarity: 'legendary',
    player: 'QB Prospect',
    title: 'State Championship TD',
    lowestAsk: '8.5 ETH',
    avgSale: '7.2 ETH',
  },
  {
    id: 'rb-rare-002',
    image: '/images/related-2.jpg',
    rarity: 'rare',
    player: 'Running Back',
    title: 'Record-Breaking Run',
    lowestAsk: '2.3 ETH',
    avgSale: '2.1 ETH',
  },
  {
    id: 'lb-epic-003',
    image: '/images/related-3.jpg',
    rarity: 'epic',
    player: 'Linebacker',
    title: 'Game-Winning Tackle',
    lowestAsk: '1.5 ETH',
    avgSale: '1.3 ETH',
  },
  {
    id: 'k-common-004',
    image: '/images/related-4.jpg',
    rarity: 'common',
    player: 'Kicker',
    title: '50-Yard Field Goal',
    lowestAsk: '0.3 ETH',
    avgSale: '0.25 ETH',
  },
];

export const announcementItems = [
  'TOP SALE: QB ROOKIE CARD 4.2 ETH',
  'NEW DROP: FRIDAY 8PM EST',
  'LIVE: WEST HIGH VS. NORTH CENTRAL',
];
