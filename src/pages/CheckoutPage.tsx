import { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/UseAppDispatch";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { db } from "../context/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

export const Checkout = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        zip: user.zipcode || "",
      });
    }
  }, [isAuthenticated, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    try {
      // Create order document with user reference
      await addDoc(collection(db, "orders"), {
        // User reference - CRITICAL for querying orders by user
        userId: user?.id || "guest",
        userName: formData.name,
        userEmail: formData.email,
        
        // Shipping information
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
        },
        
        // Order details
        items: cartItems,
        totalAmount,
        status: "pending",
        
        // Timestamps
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Clear cart and show success
      dispatch(clearCart());
      sessionStorage.removeItem("cart");
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 4000);
    } catch (error) {
      console.error("Error adding order to Firestore:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: "600px" }}>
      <div className="p-4 rounded-4 shadow-sm bg-light"> 
      <h2 className="text-center mb-4 text-primary">Checkout</h2>

      {success ? (
        <Alert variant="primary" className="text-center">
            Thank you, {formData.name || "Customer"}! Your order has been
          successfully placed.
        </Alert>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="123 Main St"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3" controlId="zip">
                <Form.Label>ZIP</Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center">
            <Button variant="primary" type="submit" size="lg">
              Place Order
            </Button>
          </div>
        </Form>
      )}
      </div> 
    </Container>
  );
};


