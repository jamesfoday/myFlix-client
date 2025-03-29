export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div style={{ padding: "1rem" }}>
            <img
                src={movie.image}
                alt={movie.title}
                style={{ width: "200px", marginBottom: "1rem" }}
            />
            <div><strong>Title:</strong> {movie.title}</div>
            <div><strong>Description:</strong> {movie.description}</div>
            <div><strong>Genre:</strong> {movie.genre}</div>
            <div><strong>Director:</strong> {movie.director}</div>
            <button onClick={onBackClick} style={{ marginTop: "1rem" }}>Back</button>
        </div>
    );
};
