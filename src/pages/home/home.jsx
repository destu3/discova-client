import { useEffect } from 'react';
import FeaturedSection from '../../components/featured-section/featured-section';
import {
  getTrending,
  getPopular,
  getPopularThisSeason,
  getUpcoming,
} from '../../services/aniList/aniList-api';
import {
  getYear,
  getSeason,
  capitalizeWords,
  getNextSeason,
} from '../../helpers/anime-utils';
import '@splidejs/react-splide/css';

const Home = () => {
  const season = capitalizeWords(getSeason(getYear));
  const nextSeason = capitalizeWords(getNextSeason());
  const year = getYear();

  useEffect(() => {
    document.title = 'Discova - Home';
  }, []);
  return (
    <>
      {/* Featured Header Section */}
      <FeaturedSection
        className="featured-header h-[250px] md:h-[350px] w-full"
        options={{
          speed: 500,
          type: 'loop',
          autoplay: true,
          drag: true,
          snap: true,
          waitForTransition: true,
          pagination: false,
          interval: 10000,
          perPage: 1,
          pauseOnFocus: true,
        }}
        dataFetcher={getPopularThisSeason}
        ariaLabel="Featured Header Section"
        featuredHeader={true}
      />

      <main className="w-11/12 mt-10 sm:mt-20 mx-auto px-2 pb-5">
        {/* Trending Section */}
        <FeaturedSection
          className="featured-sect results-container w-full featured-sect splide"
          dataFetcher={getTrending}
          ariaLabel="Trending Section"
          title="Currently Trending"
        />

        {/* Seasons trending section */}
        <FeaturedSection
          className="featured-sect results-container w-full featured-sect splide"
          dataFetcher={getPopularThisSeason}
          ariaLabel="Seasons trending section"
          title={`Popular this Season - ${season} ${year}`}
        />

        {/* Upcoming Section */}
        <FeaturedSection
          className="featured-sect results-container w-full featured-sect splide"
          dataFetcher={getUpcoming}
          ariaLabel="Upcoming Section"
          title={`Coming next Season - ${nextSeason} ${year} `}
        />

        {/* Popular Section */}
        <FeaturedSection
          className="featured-sect results-container w-full featured-sect splide"
          dataFetcher={getPopular}
          ariaLabel="Popular Section"
          title="Most Popular"
        />
      </main>
    </>
  );
};

export default Home;
