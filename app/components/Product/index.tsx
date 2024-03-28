import Image from 'next/image'
import React from 'react'

const Product = ({ product }: { product: Product }) => {

  return (
    <div className="bg-slate-50 shadow-lg rounded-lg overflow-hidden">
      <Image
        src={product.image}
        alt={product.name}
        layout="responsive"
        width={0}
        height={0}
        objectFit="cover" 
        objectPosition="center" 
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600">Brand: {product.brand}</p>
        <p className="text-gray-600">SKU: {product.sku}</p>
        {product?.variant.map((variant: Variant, vIndex: number) => (
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
  )
}

export default Product