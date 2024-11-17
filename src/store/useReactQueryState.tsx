import { useQuery, useQueryClient } from '@tanstack/react-query'

export const useReactQueryState = <T,>(key: string, initialData: T): [T, (newData: T) => void] => {
    const queryClient = useQueryClient()

    const { data } = useQuery<T>({
        queryKey: [key],
        queryFn: () => initialData,
        initialData,
    })

    const setState = (newData: T) => {
        queryClient.setQueryData([key], newData)
    }

    return [data as T, setState]
}