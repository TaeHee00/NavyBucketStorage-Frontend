import { useQuery, useQueryClient } from '@tanstack/react-query'

export const useReactQueryState = <T,>(key: string, initialData: T): [T, (newData: T | ((prev: T) => T)) => void] => {
    const queryClient = useQueryClient()

    const { data } = useQuery<T>({
        queryKey: [key],
        queryFn: () => initialData,
        initialData,
    })

    const setState = (newData: T | ((prev: T) => T)) => {
        queryClient.setQueryData<T>([key], (oldData) => {
            if (typeof newData === 'function') {
                return (newData as (prev: T) => T)(oldData as T);
            }
            return newData;
        });
    }

    return [data as T, setState]
}