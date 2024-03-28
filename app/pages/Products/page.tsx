import Products from '@/app/components/Products'
import Filters from '@/app/components/Filters';


const ProductsPage = () => {

  return (
    <div>
      Products Page
      <Filters />
      <Products />
    </div>
  )
}

export default ProductsPage