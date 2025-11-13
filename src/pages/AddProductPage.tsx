import type { Product } from "../types/Product";
import {  db } from "../context/firebaseConfig";
import { collection, addDoc,} from "firebase/firestore";
import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";





const AddProduct = () => {
    const navigate = useNavigate();
    const [productData, setProductData] = useState<Omit<Product, 'id'>>({
        title: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        image: '',
        rating: { rate: 0, count: 0 }
    });



    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value,
        });
        
    };
        const handleSubmit  = async (e: React.FormEvent) => {
            e.preventDefault();
            
            // Validate image URL
            if (productData.image && !productData.image.startsWith('http')) {
                alert("Image must be a valid URL starting with http:// or https://");
                return;
            }
            
            try {
                const docRef = await addDoc(collection(db, "products"), productData);
                console.log("Document written with ID: ", docRef.id);
                setProductData({
                    title: '',
                    description: '',
                    price: 0,
                    stock: 0,
                    category: '',
                    image: '',
                    rating: { rate: 0, count: 0 }
                });
                alert("Product added successfully!");
                navigate("/product-db");
            } catch (e) {
                console.error("Error adding document: ", e);
                alert("Failed to add product: " + e);
            }
        };

        return (
            <div>
                <Container className="my-4">
                    <h2 className="mb-4">Add New Product</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={productData.title}
                                onChange={handleChange}
                                placeholder="Title"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={productData.description}
                                onChange={handleChange}
                                placeholder="Description"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={productData.price}
                                onChange={handleChange}
                                placeholder="Price"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="stock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                name="stock"
                                value={productData.stock}
                                onChange={handleChange}
                                placeholder="Stock"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                value={productData.category}
                                onChange={handleChange}
                                placeholder="Category"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="url"
                                name="image"
                                value={productData.image}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                required
                            />
                            <Form.Text className="text-muted">
                                Enter a full image URL starting with http:// or https:// (e.g., https://i.imgur.com/example.jpg)
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">Add Product</Button>
                    </Form>

                </Container>
            </div>
        );
};

    export default AddProduct;