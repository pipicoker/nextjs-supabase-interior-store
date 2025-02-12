import { create } from "zustand";

interface Product {
    id: number
    created_at: string
    place: string
    category: string
    designer: string
    information: string
    pix: string
    price: number
    
  }

  interface ProductState {
    products: Product[]
    productsToShow: Product[]
    productBtn: string
    searchQuery: string
    setProducts: (products: Product[]) => void
    setProductBtn: (btn: string) => void
    setSearchQuery: (query: string) => void
    setPriceFilter: (query: string) => void
  }

 export const useProductStore = create<ProductState>((set) => ({
    products: [],
    productsToShow: [],
    productBtn: "all",
    searchQuery: "",

    setProducts: (products) => set(() => ({ 
        products, 
        productsToShow: products // Initially show all products
      })),

      setProductBtn: (btn) =>
        set((state) => {
          console.log("Updating productBtn to:", btn); // Debugging
      
          return {
            productBtn: btn, 
            productsToShow: [...state.products].filter((product) => btn === "all" || product.place === btn), // ✅ Ensure a new array
          };
        }),

        setSearchQuery: (query) =>
          set((state) => {
            const filteredProducts = state.products.filter((product) =>
              product.category.toLowerCase().includes(query.toLowerCase())
            );
      
            return {
              searchQuery: query,
              productsToShow: query ? filteredProducts : state.products, // Show all products if search is empty
            };
          }),

          setPriceFilter: (order) =>
            set((state) => {
              let filteredProducts = [...state.products];
          
              // Apply category filter if 'productBtn' is not 'all'
              if (state.productBtn !== "all") {
                filteredProducts = filteredProducts.filter(
                  (product) => product.place === state.productBtn
                );
              }
          
              // Apply search filter if there's a search query
              if (state.searchQuery) {
                filteredProducts = filteredProducts.filter((product) =>
                  product.category.toLowerCase().includes(state.searchQuery.toLowerCase())
                );
              }
          
              // Sort the filtered products by price
              const sortedProducts = filteredProducts.sort((a, b) =>
                order === "asc" ? a.price - b.price : b.price - a.price
              );
          
              return {
                productsToShow: sortedProducts,
              };
            }),
          
        
      
  }))

