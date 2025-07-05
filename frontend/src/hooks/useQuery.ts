import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';

type UseCustomQueryProps<TData, TError> = {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  options?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey' | 'queryFn'>;
};

export function useCustomQuery<TData = unknown, TError = unknown>({
  queryKey,
  queryFn,
  options,
}: UseCustomQueryProps<TData, TError>) {
  return useQuery({ 
    queryKey, 
    queryFn, 
    ...options 
  });
}