import { getProductsQuery } from "./queries";

export async function getProducts(selectFilters: Object = {}) {
  try {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const filters = Object.entries(selectFilters).map(([key, value]) => ({
      filterCode: key,
      filterOption: value,
    }));

    const response = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_URL}`, {
      method: "POST",
      signal: signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: getProductsQuery,
        variables: { filters },
      }),
    });

    const data = await response.json();

    if (!response.ok || data.errors) {
      throw new Error(data.errors ? data.errors[0].message : `HTTP error! status: ${response.status}`);
    }

    return data.data.catalog;
  } catch (error) {
    console.error("Fetching products failed:", error);
    // Re-throw the error to be handled or displayed by the calling component
    throw error;
  }
}
