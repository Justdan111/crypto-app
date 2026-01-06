import { useQuery } from '@tanstack/react-query';
import { fetchCrypto } from '@/lib/api';

export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export const useCrypto = () => {
    return useQuery<CryptoData[]>({
        queryKey: ['cryptoData'],
        queryFn: fetchCrypto,
        refetchInterval: 30000,
        staleTime: 20000
    });
};