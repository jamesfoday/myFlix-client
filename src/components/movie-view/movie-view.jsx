import { Button, Card, Row, Col, Image } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <Card className="p-4 shadow-sm mt-4">
            <Row className="g-4">
                <Col md={4} className="text-center">
                    <Image
                        src={movie.ImagePath}
                        alt={movie.Title}
                        fluid
                        rounded
                        style={{ maxHeight: "400px", objectFit: "cover" }}
                    />
                </Col>

                <Col md={8}>
                    <Card.Body>
                        <Card.Title className="mb-3 fs-3 fw-bold">
                            {movie.Title}
                        </Card.Title>

                        <Card.Text>
                            <strong>Description:</strong> {movie.Description}
                        </Card.Text>

                        <Card.Text>
                            <strong>Genre:</strong> {movie.Genre?.Name || "N/A"}
                        </Card.Text>

                        <Card.Text>
                            <strong>Director:</strong> {movie.Director?.Name || "N/A"}
                        </Card.Text>

                        <Button variant="primary" onClick={onBackClick} className="mt-3">
                            ← Back to Movies
                        </Button>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};
