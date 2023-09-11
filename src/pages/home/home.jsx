import { useEffect, useContext } from 'react';
import FeaturedSection from '../../components/featured-section/featured-section';
import FeaturedSectionWatchlist from '../../components/featured-section/featured-section-watchlist';
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

      <main className="w-11/12 mt-10 sm:mt-20 mx-auto px-2 pb-5">
        {/* List */}
        {/* {currentUser?.watchList.length > 0 && (
          <FeaturedSectionWatchlist
            dataFetcher={getWatchlistAnime}
            title="My List"
          />
        )} */}

        {/* Trending Section */}
        <FeaturedSection
          dataFetcher={getTrending}
          ariaLabel="Trending Section"
          title="Currently Trending"
        />

        {/* Seasons trending section */}
        <FeaturedSection
          dataFetcher={getPopularThisSeason}
          ariaLabel="Seasons trending section"
          title={`Popular this Season - ${season} ${year}`}
        />

        {/* Upcoming Section */}
        <FeaturedSection
          dataFetcher={getUpcoming}
          ariaLabel="Upcoming Section"
          title={`Coming next Season - ${nextSeason} ${year}`}
        />

        {/* Popular Section */}
        <FeaturedSection
          dataFetcher={getPopular}
          ariaLabel="Popular Section"
          title="Most Popular"
        />
      </main>
    </>
  );
};

export default Home;
