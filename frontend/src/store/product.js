import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,

  setProducts: (products) => {
    console.log("Setting products:", products);
    set({ products });
    console.log("New state:", useProductStore.getState());
  },

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return alert("Please fill all fields");
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },

  fetchProducts: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await fetch("/api/products");

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      set({ products: data.products, isLoading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ error: error.message, isLoading: false });
    }
  },

  deleteProduct: async (productId) => {
    const res = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });
    const data = await res.json();

    //updating the UI
    if (data.success) {
      set((state) => ({
        products: state.products.filter((product) => product._id !== productId),
      }));
    }
    return data;
  },

  updateProduct: async (productId, updatedProduct) => {
    const res = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();

    //updating the UI
    if (data.success) {
      set((state) => ({
        products: state.products.map((product) =>
          product._id === productId ? data.data : product
        ),
      }));
    }
    return data;
  },
}));
