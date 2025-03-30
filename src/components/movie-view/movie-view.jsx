export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.ImagePath} alt={movie.Title} style={{ width: "300px" }} />
            </div>
            <div>
                <strong>Title:</strong> {movie.Title}
            </div>
            <div>
                <strong>Description:</strong> {movie.Description}
            </div>
            <div>
                <strong>Genre:</strong> {movie.Genre?.Name || "N/A"}
            </div>
            <div>
                <strong>Director:</strong> {movie.Director?.Name || "N/A"}
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};
