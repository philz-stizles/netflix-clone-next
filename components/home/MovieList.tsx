import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";
import { Movie } from "@prisma/client";

interface MovieListProps {
  title: string;
  data: Movie[];
  loading?: boolean;
  error?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ title, data, loading, error }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
