'use client'
import { useGetProducts } from '@/app/helper/hooks';
import { store } from '@/app/helper/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import React, { useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation';
import ClearFilterButtons from '../ClearFiltersButton';

const Filters = () => {
  const router = useRouter();
  const pathname = usePathname()

  const queryClient = useQueryClient()
  const [selectFilters, setSelectedFilters] = useState<Record<string, string>>({})
  const { data, error, isLoading } = useGetProducts(selectFilters)
  const [initialFilters, setInitialFilters] = useState<typeof data | null>(null);

  useEffect(() => {
    if (data && !initialFilters) {
      setInitialFilters(data.filters.available);
    }
  }, [data]);

  const handleFilterChange = (filterCode: string, selectedOption: string) => {
    setSelectedFilters(prev => ({ ...prev, [filterCode]: selectedOption }));
  
    // Since state updates are asynchronous, create the new filters object manually
    const updatedFilters = { ...selectFilters, [filterCode]: selectedOption };
    
    const sp = new URLSearchParams();
    
    for (const [key, value] of Object.entries(updatedFilters)) {
      if (value) {
        sp.set(key, value);
      } else {
        sp.delete(key);
      }
    }
    
    router.push(`${pathname}?${sp.toString()}`)
  };

  const clearParams = () => {
    router.push(pathname);
    setSelectedFilters({})
  };

  if(error) return <div>Error</div>

  if(isLoading) return <div>Loading...</div>

  return (
    <div className='p-4 bg-white shadow-md rounded-lg mb-6'>
      {initialFilters?.map((filter: AvailableFilter, index: number) => (
        <div key={index} className='mb-4'>
          <label htmlFor={filter.code} className='block text-gray-700 text-sm font-bold mb-2'>
            {filter.name}
          </label>
          <select
            id={filter.code}
            value={selectFilters[filter.code] || ''}
            onChange={(e) => { handleFilterChange(filter.code, e.target.value) }}
            className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight 
              focus:outline-none focus:bg-white focus:border-gray-500'
          >
            <option value="">Select {filter.name}</option>
            {filter.options.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
      <ClearFilterButtons clearParams={clearParams} />
    </div>
  )
}
  
export default Filters



























// 'use client'
// import { useGetProducts } from '@/app/helper/hooks';
// import { store } from '@/app/helper/store';
// import { useMutation, useQueryClient } from '@tanstack/react-query';

// import React, { useEffect, useState } from 'react'

// import { usePathname, useRouter } from 'next/navigation';

// const Filters = () => {
//   const router = useRouter();
//   const pathname = usePathname()

//   const queryClient = useQueryClient()
//   const [selectFilters, setSelectedFilters] = useState<Record<string, string>>({})
//   const { data, error, isLoading } = useGetProducts(selectFilters)
//   const [initialFilters, setInitialFilters] = useState<typeof data | null>(null);

//   const handleFilterChange = (filterCode: string, selectedOption: string) => {
//     setSelectedFilters(prev => ({ ...prev, [filterCode]: selectedOption }));

//     const sp = new URLSearchParams();
    
//     for (const [key, value] of Object.entries(selectFilters)) {
//       if (value) {
//         sp.set(key, value);
//       } else {
//         sp.delete(key); 
//       }
//     }
    
//     router.push(`${pathname}?${sp.toString()}`)

//     mutation.mutate(selectFilters);
//   };

//   useEffect(() => {
//     if (data && !initialFilters) {
//       setInitialFilters(data.filters.available);
//     }
//   }, [data]);

//   useEffect(() => {
//     mutation.mutate(selectFilters);
//   }, [selectFilters]);

//   const mutation = useMutation({
//     mutationKey: ['selectFilters'],
//     mutationFn: (selectFilters: unknown) => store.setSelectedFilters(selectFilters),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['selectFilters'] });
//     }
//   });

//   if(error) return <div>Error</div>

//   if(isLoading) return <div>Loading...</div>

//   return (
//     <div className='p-4 bg-white shadow-md rounded-lg mb-6'>
//       {initialFilters?.map((filter: AvailableFilter, index: number) => (
//         <div key={index} className='mb-4'>
//           <label htmlFor={filter.code} className='block text-gray-700 text-sm font-bold mb-2'>
//             {filter.name}
//           </label>
//           <select
//             id={filter.code}
//             value={selectFilters[filter.code] || ''}
//             onChange={(e) => { handleFilterChange(filter.code, e.target.value) }}
//             className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight 
//               focus:outline-none focus:bg-white focus:border-gray-500'
//           >
//             <option value="">Select {filter.name}</option>
//             {filter.options.map((option: string, index: number) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>
//       ))}
//     </div>
//   )
// }
  
// export default Filters
































// 'use client'
// import { useGetProducts } from '@/app/helper/hooks';
// import { store } from '@/app/helper/store';
// import { useMutation, useQueryClient } from '@tanstack/react-query';

// import React, { useEffect, useState } from 'react'

// import { useRouter } from 'next/navigation';

// const Filters = () => {
//   const router = useRouter();

//   const queryClient = useQueryClient()
//   const [selectFilters, setSelectedFilters] = useState<Record<string, string>>({})
//   const { data, error, isLoading } = useGetProducts(selectFilters)
//   const [initialFilters, setInitialFilters] = useState<typeof data | null>(null);

//   const handleFilterChange = (filterCode: string, selectedOption: string) => {
//     setSelectedFilters(prev => ({ ...prev, [filterCode]: selectedOption }));
    
//     const url = new URL(window.location.href);
//     if (selectedOption) {
//       url.searchParams.set(filterCode, selectedOption); 
//     } else {
//       url.searchParams.delete(filterCode); 
//     }
  
//     window.history.pushState(null, '', url);

//     mutation.mutate(selectFilters);
//   };

//   useEffect(() => {
//     if (data && !initialFilters) {
//       setInitialFilters(data.filters.available);
//     }
//   }, [data]);

//   useEffect(() => {
//     mutation.mutate(selectFilters);
//   }, [selectFilters]);

//   const mutation = useMutation({
//     mutationKey: ['selectFilters'],
//     mutationFn: (selectFilters: unknown) => store.setSelectedFilters(selectFilters),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['selectFilters'] });
//     }
//   });

//   if(error) return <div>Error</div>

//   if(isLoading) return <div>Loading...</div>

//   return (
//     <div className='p-4 bg-white shadow-md rounded-lg mb-6'>
//       {initialFilters?.map((filter: AvailableFilter, index: number) => (
//         <div key={index} className='mb-4'>
//           <label htmlFor={filter.code} className='block text-gray-700 text-sm font-bold mb-2'>
//             {filter.name}
//           </label>
//           <select
//             id={filter.code}
//             value={selectFilters[filter.code] || ''}
//             onChange={(e) => { handleFilterChange(filter.code, e.target.value) }}
//             className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight 
//               focus:outline-none focus:bg-white focus:border-gray-500'
//           >
//             <option value="">Select {filter.name}</option>
//             {filter.options.map((option: string, index: number) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>
//       ))}
//     </div>
//   )
// }
  
// export default Filters