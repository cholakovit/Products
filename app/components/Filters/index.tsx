"use client";
import { useFilterSelection, useInitialFilters } from "@/app/helper/hooks";
import ClearFilterButtons from "@/app/components/ClearFiltersButton";
import { FC } from "react";

const Filters: FC = () => {
  const { selectedFilters, handleFilterChange, clearFilters } =
    useFilterSelection();
  const { initialFilters, error, isLoading } =
    useInitialFilters(selectedFilters);

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-6">
      {initialFilters?.map((filter: AvailableFilter, index: number) => (
        <div key={index} className="mb-4">
          <label
            htmlFor={filter.code}
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {filter.name}
          </label>
          <select
            id={filter.code}
            value={selectedFilters[filter.code] || ""}
            onChange={(e) => {
              handleFilterChange(filter.code, e.target.value);
            }}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight 
              focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="">Select or remove {filter.name}</option>
            {filter.options.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
      <ClearFilterButtons clearParams={clearFilters} />
    </div>
  );
};

export default Filters;
