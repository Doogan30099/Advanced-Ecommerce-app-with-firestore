import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../context/api";
import type { Product } from "../types/Product";
import { Container, Carousel, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function HomePage() {
    const { data: products, isLoading, isError } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });

    if (isLoading)
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
            </div>
        );

    if (isError || !products) return <p>Error loading products</p>;

    const featured = [...products].sort(() => 0.5 - Math.random()).slice(0, 3);

    return (
      <>
        <Container className="my-4">
          <p>Admin page incorporated ©</p>
          <h2 className="text-center mb-4">Featured Products</h2>
          <Carousel variant="dark">
            {featured.map((product) => (
              <Carousel.Item key={product.id}>
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    onError={(e) =>
                      (e.currentTarget.src = "https://via.placeholder.com/300")
                    }
                    style={{ maxHeight: "300px", objectFit: "contain" }}
                  />
                  <Carousel.Caption>
                    <Link
                      to={`/product/${product.id}`}
                      className="text-decoration-none text-white"
                    >
                      <h5 id="product-title" className="mb-2">
                        {product.title}
                      </h5>
                      <p id="product-price" className="fw-bold">
                        ${product.price.toFixed(2)}
                      </p>
                    </Link>
                  </Carousel.Caption>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>

        <Container className="my-5">
          <h2 className="text-center mb-4">Our Story</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Started Small</Card.Title>
                  <Card.Text>
                    What began as a small online marketplace quickly grew into a
                    community-loved shopping destination.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Our Mission</Card.Title>
                  <Card.Text>
                    To bring quality and affordability together, powered by
                    technology and care for our customers.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Future Vision</Card.Title>
                  <Card.Text>
                    Expanding globally while keeping our roots local — providing
                    ethical products for everyone.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
};