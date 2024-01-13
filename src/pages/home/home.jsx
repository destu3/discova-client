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
import { getYear, getSeason, getNextSeason } from '../../utils/anime-utils';
import { getWatchlistAnime } from '../../services/api/anime';

// register swiper web component
register();

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const season = getSeason();
  const nextSeason = getNextSeason();
  let year = getYear();
  year = nextSeason === 'WINTER' ? year + 1 : year;

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
          filter={{ sort: 'Popularity', season, year }}
        />

        {/* Upcoming Section */}
        <FeaturedSection
          dataFetcher={getUpcoming}
          ariaLabel="Upcoming Section"
          title="Coming next Season"
          filter={{
            sort: 'Popularity',
            season: nextSeason,
            year,
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
