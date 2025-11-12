import { useState } from "react";
import ProductCard from "./ProductCard";
import { Container, Spinner, Alert, Form } from "react-bootstrap";
import { useCategories } from "../hooks/UseCategories";
import { useCombinedProducts } from "../hooks/useCombinedProducts";

export interface Props {
  selectedCategory?: string;
}

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { data: categories } = useCategories();

  // Use the combined hook to fetch both API and Firestore products
  const {
    data: products,
    isLoading,
    error,
  } = useCombinedProducts(selectedCategory);

  return (
    <Container className="my-4" style={{ maxWidth: "1400px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Products</h2>
        <Form.Select
          className="shadow-sm border-0 bg-light"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ maxWidth: "250px" }}
        >
          <option value="">All Categories</option>
          {categories?.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </Form.Select>
      </div>

      {isLoading && (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      )}
      {error && <Alert variant="danger">Failed to load products.</Alert>}
      <div className="row">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
}
