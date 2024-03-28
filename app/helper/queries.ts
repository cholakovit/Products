export const getProductsQuery = `
fragment StoreProduct on Product {
  id
  brand
  name
  qty
  image
  sku
  variant {
    size
    color
  }
  price {
    regular 
    special
  }
}

query GetProducts($filters: [CatalogFilter!]) {
  catalog(filter: {
    size: 20
    page: 1
    filters: $filters
  }) {
    products {
      ...StoreProduct
    }
    page
    productsCount
    filters {
      applied {
        name
        option 
      }
      available {
        code
        name
        options 
      }
    }
  }
}
`;
