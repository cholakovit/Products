'use client'
import useUrlParamWatcher, { useGetProducts } from '@/app/helper/hooks';
import { store } from '@/app/helper/store';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';


const Catalog = () => {
  let lastElement;
  const size = useUrlParamWatcher('size');
  const brand = useUrlParamWatcher('brand');
  const color = useUrlParamWatcher('color');

  const currentFilters = {
    ...(size && { size }),
    ...(brand && { brand }),
    ...(color && { color }),
  };

  const { data: selectedFilters } = useQuery({
    queryKey: ['formData'],
    queryFn: store.getSelectedFilters
  })

  if (Array.isArray(selectedFilters) && selectedFilters.length > 0) {
    lastElement = selectedFilters.pop(); 
  }

  //const getLast = selectedFilters.pop()
  console.log("Catalog selectedFilters: ", selectedFilters)
  console.log("Catalog getLast: ", lastElement)
  console.log("Catalog currentFilters: ", currentFilters)

  //const { data, error, isLoading } = useGetProducts(currentFilters);
  const { data, error, isLoading } = useGetProducts(currentFilters);


  if(error) return <div>Error</div>

  if(isLoading) return <div>Loading...</div>

  //console.log("Catalog: data: ", data)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {data?.products && data.products.map((product: Product, pIndex: number) => (
        <div key={pIndex} className="bg-slate-50 shadow-lg rounded-lg overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-56 object-cover object-center" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600">Brand: {product.brand}</p>
            <p className="text-gray-600">SKU: {product.sku}</p>
            {product.variant.map((variant: Variant, vIndex: number) => (
              <div key={vIndex} className="mt-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Size: {variant.size}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  Color: {variant.color}
                </span>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold text-gray-900">${product.price.regular}</span>
              <button className="px-3 py-1 bg-blue-500 text-white text-xs font-bold uppercase rounded hover:bg-blue-600">Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Catalog

















// 'use client'
// import { useGetProducts } from "@/app/helper/hooks"
// import { useState } from "react";

// const Catalog = () => {

//   const [selectFilters, setSelectFilters] = useState({brand: "Adidas"});
  
//   const { data, error, isLoading } = useGetProducts(selectFilters)

//   if(error) return <div>Error</div>

//   if(isLoading) return <div>Loading...</div>

//   console.log("data: ", data)

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//       {data?.products && data.products.map((product: Product, pIndex: number) => (
//         <div key={pIndex} className="bg-slate-50 shadow-lg rounded-lg overflow-hidden">
//           <img src={product.image} alt={product.name} className="w-full h-56 object-cover object-center" />
//           <div className="p-4">
//             <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
//             <p className="text-gray-600">Brand: {product.brand}</p>
//             <p className="text-gray-600">SKU: {product.sku}</p>
//             {product.variant.map((variant: Variant, vIndex: number) => (
//               <div key={vIndex} className="mt-2">
//                 <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
//                   Size: {variant.size}
//                 </span>
//                 <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
//                   Color: {variant.color}
//                 </span>
//               </div>
//             ))}
//             <div className="flex justify-between items-center mt-4">
//               <span className="text-xl font-bold text-gray-900">${product.price.regular}</span>
//               <button className="px-3 py-1 bg-blue-500 text-white text-xs font-bold uppercase rounded hover:bg-blue-600">Add to Cart</button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default Catalog