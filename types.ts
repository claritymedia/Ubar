export enum Tab {
  RIDE = 'RIDE',
  PASSES = 'PASSES',
  SPONSORSHIPS = 'SPONSORSHIPS',
  EVENTS = 'EVENTS',
  PODCAST = 'PODCAST',
  DRIVER = 'DRIVER'
}

export interface PassOption {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
}

export interface User {
  email: string;
  name: string;
  type: 'guest' | 'user';
}