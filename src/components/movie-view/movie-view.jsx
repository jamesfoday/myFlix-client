import { useParams } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m._id === movieId);

    if (!movie) return <div>Movie not found.</div>;

    return (
        <Container className="py-4">
            <Card className="p-4 shadow-sm bg-light-subtle">
                <Card.Img
                    variant="top"
                    src={movie.ImagePath}
                    alt={movie.Title}
                    style={{ height: "400px", objectFit: "cover" }}
                    className="mb-4"
                />
                <Card.Body>
                    <Card.Title className="fw-bold fs-3">{movie.Title}</Card.Title>
                    <Card.Text>
                        <strong>Description:</strong> {movie.Description}
                    </Card.Text>
                    <Card.Text>
                        <strong>Genre:</strong> {movie.Genre?.Name || "N/A"}
                    </Card.Text>
                    <Card.Text>
                        <strong>Director:</strong> {movie.Director?.Name || "N/A"}
                    </Card.Text>
                    <Button variant="success" href="/">
                        ⬅ Back to Movies
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};
