import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { queryClient } from '../services/api/queryClient';

type UseCustomMutationProps<TData, TVariables, TError> = {
  mutationFn: (variables: TVariables) => Promise<TData>;
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>;
};

export function useCustomMutation<TData = unknown, TVariables = void, TError = unknown>({
  mutationFn,
  options,
}: UseCustomMutationProps<TData, TVariables, TError>) {
  return useMutation({
    mutationFn,
    ...options,
  }, queryClient);
}