import { useQuery } from "@tanstack/react-query"
import { getProducts } from "./fn"
import { useSearchParams } from "next/navigation";

export const useGetProducts = (selectFilters: unknown = {}) => {
  //console.log('useGetProducts selectFilters: ', selectFilters)
  const filtersKey = JSON.stringify(selectFilters);

  const { data, error, isLoading } = useQuery({
    queryKey: ['products', filtersKey],
    queryFn: () => getProducts(selectFilters),
    staleTime: 4000,
    refetchOnWindowFocus: false,
    retry: 5,
  })

  return { data, error, isLoading }
}

export const useGetProductFiltersFromURL = () => {
  const searchParams = useSearchParams()
  const size = searchParams.get('size')
  const brand = searchParams.get('brand')
  const color = searchParams.get('color')

  const filters = {
    ...(size !== null && size !== undefined && { size }), 
    ...(brand !== null && brand !== undefined && { brand }), 
    ...(color !== null && color !== undefined && { color }) 
  };
  
  return filters
}