export interface GeneratedImage {
  id: string;
  original: string;
  result: string;
  prompt: string;
  timestamp: number;
  type: 'edit' | 'merch';
}

export interface MerchProduct {
  id: string;
  name: string;
  icon: string; // URL or Lucide icon name equivalent
  description: string;
}