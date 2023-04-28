import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useMemo } from "react";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFavorites } = useFavorites();
  const isFavorite = useMemo(() => {
    const userFavorites = currentUser?.favoriteIds || [];

    return userFavorites.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavoriteHandler = async () => {
    const response = await (isFavorite
      ? axios.delete(`/api/favorites/${movieId}`)
      : axios.put("/api/favorites", { movieId }));
    const updatedUser = response.data;

    mutateCurrentUser({ ...currentUser, favoriteIds: updatedUser.favoriteIds });
    mutateFavorites()
  };

  const Icon = useMemo(() => (isFavorite ? CheckIcon : PlusIcon), [isFavorite]);
  return (
    <div
      onClick={toggleFavoriteHandler}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};

export default FavoriteButton;
