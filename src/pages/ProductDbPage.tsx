import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../context/firebaseConfig";
import type { Product } from "../types/Product";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const ProductDbPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [, setError] = useState<string | null>(null);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));
        setProducts(productsList);
      } catch (error) {
        setError("Failed to fetch products");
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <h1>Products Database</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} onClick={() => navigate("update-product/" + product.id)}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.price.toFixed(2)}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>{product.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
        <Link to="/admin" className="btn btn-primary">
          Back to Admin
        </Link>
    </Container>
  );
};

export default ProductDbPage;
