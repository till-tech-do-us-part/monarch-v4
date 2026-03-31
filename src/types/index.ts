export interface SaleRecord {
  buyer: string;
  avatar?: string;
  price: string;
  serial: string;
  date: string;
}

export interface Collector {
  rank: number;
  username: string;
  avatar: string;
  count: number;
}

export interface RelatedCard {
  id: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  player: string;
  title: string;
  lowestAsk: string;
  avgSale: string;
}

export interface PlayerCard {
  id: string;
  playerName: string;
  position: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  serial: {
    current: number;
    total: number;
  };
  team: string;
  stats: {
    rating: number;
    height: string;
    weight: string;
  };
  price: {
    current: string;
    currency: string;
    avgSale: string;
  };
  availability: {
    forSale: number;
    totalSupply: number;
    unlisted: number;
    locked: number;
    burned: number;
  };
  images: string[];
  description: string;
  gameStats: {
    team: string;
    opponent: string;
    teamScore: number;
    opponentScore: number;
    playerStats: {
      receptions: number;
      yards: number;
      touchdowns: number;
    };
  };
  seasonAverages: {
    games: number;
    receptions: number;
    yards: number;
    touchdowns: number;
    avgYards: number;
  };
  salesHistory: {
    top: SaleRecord[];
    recent: SaleRecord[];
  };
  topCollectors: Collector[];
}
