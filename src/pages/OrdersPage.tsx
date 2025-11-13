import { Container, Card, Table, Badge, Spinner, Alert } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useUserOrders } from "../hooks/useOrders";
import { Navigate } from "react-router-dom";
import type { OrderStatus } from "../types/Order";

const OrdersPage = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const {
    data: orders,
    isLoading: ordersLoading,
    error,
  } = useUserOrders(user?.id);

  if (authLoading || ordersLoading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
        <p className="mt-3">Loading your orders...</p>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const getStatusBadge = (status: OrderStatus) => {
    const statusColors: Record<OrderStatus, string> = {
      pending: "warning",
      processing: "info",
      shipped: "primary",
      delivered: "success",
      cancelled: "danger",
    };
    return statusColors[status] || "secondary";
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Container className="my-5" style={{ maxWidth: "1200px" }}>
      <h2 className="mb-4">My Orders</h2>
      <p className="text-muted">Welcome back, {user?.name}!</p>

      {error && (
        <Alert variant="danger">
          Failed to load orders. Please try again later.
        </Alert>
      )}

      {orders && orders.length === 0 ? (
        <Alert variant="info">
          You haven't placed any orders yet. Start shopping to see your order
          history!
        </Alert>
      ) : (
        <div className="orders-list">
          {orders?.map((order) => (
            <Card key={order.id} className="mb-4 shadow-sm">
              <Card.Header className="bg-light">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Order #{order.id.slice(-8)}</strong>
                    <br />
                    <small className="text-muted">
                      Placed on {formatDate(order.createdAt)}
                    </small>
                  </div>
                  <Badge
                    bg={getStatusBadge(order.status)}
                    className="text-uppercase"
                  >
                    {order.status}
                  </Badge>
                </div>
              </Card.Header>

              <Card.Body>
                <div className="mb-3">
                  <strong>Shipping Address:</strong>
                  <p className="mb-0">
                    {order.shippingAddress.address}
                    <br />
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.zip}
                  </p>
                </div>

                <strong>Items:</strong>
                <Table striped bordered hover size="sm" className="mt-2">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.title}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>{item.quantity}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <div className="text-end">
                  <h5>
                    <strong>Total: ${order.totalAmount.toFixed(2)}</strong>
                  </h5>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default OrdersPage;
