import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../context/firebaseConfig";
import { fetchProducts, fetchProductsByCategory } from "../context/api";
import type { Product } from "../types/Product";


export const useCombinedProducts = (selectedCategory?: string) => {
  return useQuery<Product[]>({
    queryKey: ["combined-products", selectedCategory],
    queryFn: async () => {
      try {
        const [apiProducts, firestoreSnapshot] = await Promise.all([
          selectedCategory
            ? fetchProductsByCategory(selectedCategory)
            : fetchProducts(),
          getDocs(collection(db, "products")),
        ]);

        const firestoreProducts: Product[] = firestoreSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Product, "id">),
          })
        );

        const filteredFirestoreProducts = selectedCategory
          ? firestoreProducts.filter(
              (product) =>
                product.category.toLowerCase() ===
                selectedCategory.toLowerCase()
            )
          : firestoreProducts;

        return [...apiProducts, ...filteredFirestoreProducts];
      } catch (error) {
        console.error("Error fetching combined products:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, 
  });
};


export const useFirestoreProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["firestore-products"],
    queryFn: async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        return querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));
      } catch (error) {
        console.error("Error fetching Firestore products:", error);
        throw error;
      }
    },
  });
};
