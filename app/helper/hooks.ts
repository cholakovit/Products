import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./fn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useGetProducts = (selectFilters: Object = {}) => {
  const filtersKey = JSON.stringify(selectFilters);

  const { data, error, isLoading } = useQuery({
    queryKey: ["products", filtersKey],
    queryFn: () => getProducts(selectFilters),
    refetchOnWindowFocus: false,
    retry: 5,
  });

  return { data, error, isLoading };
};

export const useGetProductFiltersFromURL = () => {
  const searchParams = useSearchParams();
  const size = searchParams.get("size");
  const brand = searchParams.get("brand");
  const color = searchParams.get("color");

  const filters = {
    ...(size !== null && size !== undefined && { size }),
    ...(brand !== null && brand !== undefined && { brand }),
    ...(color !== null && color !== undefined && { color }),
  };

  return filters;
};

export const useFilterSelection = () => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({});
  const router = useRouter();
  const pathname = usePathname();

  const handleFilterChange = (filterCode: string, selectedOption: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterCode]: selectedOption,
    }));

    // Update URL with new filter selections
    const updatedFilters = { ...selectedFilters, [filterCode]: selectedOption };
    const searchParams = new URLSearchParams();

    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });

    router.push(`${pathname}?${searchParams.toString()}`);
  };

  const clearFilters = () => {
    setSelectedFilters({});
    router.push(pathname); // Resets the URL, removing all query parameters
  };

  return { selectedFilters, handleFilterChange, clearFilters };
};

export const useInitialFilters = (selectFilters: Record<string, string>) => {
  const { data, error, isLoading } = useGetProducts(selectFilters);
  const [initialFilters, setInitialFilters] = useState<typeof data | null>(
    null
  );

  useEffect(() => {
    if (data && !initialFilters) {
      setInitialFilters(data.filters.available);
    }
  }, [data]);

  return { initialFilters, error, isLoading };
};
