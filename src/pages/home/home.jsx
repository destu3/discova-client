import { useEffect, useContext } from 'react';
import { register } from 'swiper/element/bundle';
import FeaturedSection from '../../components/featured-section/featured-section';
import FeaturedSectionWatchList from '../../components/featured-section/featured-section-watchlist';
import { UserContext } from '../../contexts/user.context';
import {
  getTrending,
  getPopular,
  getPopularThisSeason,
  getUpcoming,
} from '../../services/api/anime';
import {
  getYear,
  getSeason,
  capitalizeWords,
  getNextSeason,
} from '../../utils/anime-utils';
import { getWatchlistAnime } from '../../services/api/anime';

// register swiper web component
register();

const Home = () => {
  const season = capitalizeWords(getSeason(getYear));
  const nextSeason = capitalizeWords(getNextSeason());
  const year = getYear();

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    document.title = 'Discova - Home';
  }, []);
  return (
    <>
      {/* Featured Header Section */}
      <FeaturedSection
        dataFetcher={getPopularThisSeason}
        featuredHeader={true}
      />

      <main className="w-full md:w-11/12 mt-5 mx-auto p-1 sm:p-2 pb-5">
        {/* List */}
        {currentUser?.watchList.length > 0 && (
          <FeaturedSectionWatchList
            dataFetcher={getWatchlistAnime}
            title="My List"
          />
        )}

        {/* Trending Section */}
        <FeaturedSection
          dataFetcher={getTrending}
          ariaLabel="Trending Section"
          title="Currently Trending"
          filter={{ sort: 'Trending' }}
        />

        {/* Seasons trending section */}
        <FeaturedSection
          dataFetcher={getPopularThisSeason}
          ariaLabel="Seasons trending section"
          title="Popular this Season"
          filter={{ sort: 'Popularity', season: getSeason(), year: getYear() }}
        />

        {/* Upcoming Section */}
        <FeaturedSection
          dataFetcher={getUpcoming}
          ariaLabel="Upcoming Section"
          title="Coming next Season"
          filter={{
            sort: 'Popularity',
            season: getNextSeason(),
            year: getYear(),
          }}
        />

        {/* Popular Section */}
        <FeaturedSection
          dataFetcher={getPopular}
          ariaLabel="Popular Section"
          title="Most Popular"
          filter={{ sort: 'Popularity' }}
        />
      </main>
    </>
  );
};

export default Home;
