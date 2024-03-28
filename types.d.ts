type Price = {
  id: ID!;
  regular: Float!;
  special: Float;
};

type Variant = {
  id: ID!;
  size: String;
  color: String;
};

type Product = {
  id: ID!;
  qty: Int!;
  image: string!;
  name: string!;
  brand: String!;
  sku: String!;
  variant: [Variant!]!;
  price: Price!;
};

type AvailableFilter = {
  name: string!;
  code: string!;
  options: [string!]!;
};

type AppliedFilter = {
  name: String!;
  option: String!;
};

type Filters = {
  available: [AvailableFilter]!;
  applied: [AppliedFilter]!;
};

type CatalogData = {
  filters: Filters!;
  products: [Product!]!;
  page: Int!;
  productsCount: Int!;
};

type ClearFilterButtonsProps = {
  clearParams: () => void;
};

// input CatalogFilter {
//   filterCode: String!
//   filterOption: String!
// }

// input CatalogFilters {
//   page: Int!
//   size: Int!
//   filters: [CatalogFilter!]
// }

// type CartItem {
//   id: ID!
//   quantity: Int!
//   product: Product!
// }

// type Cart {
//   id: ID!
//   token: String!
//   items: CartItem!
// }

// type Query {
//   catalog(filter: CatalogFilters): CatalogData
//   initCart: Cart
//   addToCart(cartId: String, productId: ID!, quantity: Int!): Cart
// }
