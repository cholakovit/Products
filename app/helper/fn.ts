import { getProductsQuery } from "./queries";

export async function getProducts(selectFilters: any = {}) {
  try {
    const abortController = new AbortController();
    const signal = abortController.signal;

    let filters = Object.entries(selectFilters).map(([key, value]) => ({
      filterCode: key, 
      filterOption: value,
    }));

    const response = await fetch(process.env.NEXT_PUBLIC_PRODUCT_URL!, {
      method: 'POST',
      signal: signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: getProductsQuery,
        variables: {
          filters: filters,
        },
      }), 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.catalog;

  } catch (error) {
    console.error("Fetching products failed:", error);
    throw error;
  }
}