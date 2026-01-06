import { useQuery } from '@tanstack/react-query';
import { fetchCryto } from '@/lib/api';



export const useCrypto = () => {
    return useQuery({
        queryKey: ['cryptoData'],
        queryFn: fetchCryto,
        refetchInterval: 30000, // Refetch every 60 seconds 
        staleTime: 20000
    });
    }