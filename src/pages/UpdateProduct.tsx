import { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../context/firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../types/Product";

const UpdateProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [,setError] = useState<string | null>(null);
    const [productData, setProductData] = useState<Omit<Product, 'id'>>({
        title: '',
        description: '',
        price: 0,
        category: '',
        stock: 0,
        image: '',
        rating: { rate: 0, count: 0 }
    });

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProductData(docSnap.data() as Omit<Product, 'id'>);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form submission/page refresh
        if (!id) return;
        try {
            const docRef = doc(db, "products", id);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await updateDoc(docRef, productData as any);
            alert("Product updated successfully!");
            navigate("/product-db");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            console.error("Error updating product:", error);
            alert("Failed to update product: " + errorMessage);
        }
    };

    const deleteProduct = async () => {
      if (!id) return;

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return;

      try {
        await deleteDoc(doc(db, "products", id));
        alert("Product deleted successfully!");
        navigate("/products-db");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        setError("Failed to delete product");
        console.error(error);
        alert("Failed to delete product: " + errorMessage);
      }
    };


    
    return (
        <Container>
            <h2>Update Product</h2>
            <Form onSubmit={handleUpdate}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={productData.title} onChange={(e) => setProductData({...productData, title: e.target.value})} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={productData.description} onChange={(e) => setProductData({...productData, description: e.target.value})} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" value={productData.price} onChange={(e) => setProductData({...productData, price: Number(e.target.value)})} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" value={productData.category} onChange={(e) => setProductData({...productData, category: e.target.value})} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number" value={productData.stock} onChange={(e) => setProductData({...productData, stock: Number(e.target.value)})} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" value={productData.image} onChange={(e) => setProductData({...productData, image: e.target.value})} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control type="number" value={productData.rating.rate} onChange={(e) => setProductData({...productData, rating: { rate: Number(e.target.value), count: productData.rating.count } })} />
                </Form.Group>
                <Button type="submit" variant="primary">Update Product</Button>
                <Button variant="danger" onClick={deleteProduct} className="ms-2">Delete Product</Button>
            </Form>
        </Container>
    );
};

export default UpdateProduct;