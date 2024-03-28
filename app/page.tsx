'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ProductsPage from "@/app/pages/Products/page";

const queryClient = new QueryClient()

export default function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ProductsPage />
      </QueryClientProvider>
    </>
  );
}
