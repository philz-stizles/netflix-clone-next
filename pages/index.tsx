import Billboard from '@/components/home/Billboard';
import MovieList from '@/components/home/MovieList';
import Navbar from '@/components/layout/navbar/Navbar';
import InfoModal from '@/components/ui/modals/InfoModal';
import useFavorites from '@/hooks/useFavorites';
import useMovieList from '@/hooks/useMovieList';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

const Home = () => {
  const { data: movies = [], isLoading: isLoadingMovies, error: moviesError } = useMovieList();
  const { data: favorites = [], isLoading: isLoadingFavorites, error: favoritesError} = useFavorites();
  const { isOpen, closeModal } = useInfoModalStore();
  console.log(movies)
   console.log(favorites)

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />  
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
};

export default Home;
      