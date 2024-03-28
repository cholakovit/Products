'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ProductsPage from "@/app/pages/Products/page";

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 60000, gcTime: 10 * (60 * 1000) } } })

export default function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ProductsPage />
      </QueryClientProvider>
    </>
  );
}
