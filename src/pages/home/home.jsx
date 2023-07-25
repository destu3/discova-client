import FeaturedSection from '../../components/featured-section/featured-section';
import {
  getTrending,
  getPopular,
  getPopularThisSeason,
  getUpcoming,
} from '../../services/aniList/aniList-api';
import '@splidejs/react-splide/css';

const Home = () => {
  return (
    <>
      {/* Featured Header Section */}
      <FeaturedSection
        className="featured-header h-[220px] md:h-[350px] w-full"
        options={{
          speed: 1500,
          type: 'loop',
          autoplay: true,
          drag: true,
          snap: true,
          waitForTransition: true,
          pagination: false,
          interval: 7500,
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
          title="Trending"
        />

        {/* Seasons trending section */}
        <FeaturedSection
          className="featured-sect results-container w-full featured-sect splide"
          dataFetcher={getPopularThisSeason}
          ariaLabel="Seasons trending section"
          title="Popular this Season"
        />

        {/* Upcoming Section */}
        <FeaturedSection
          className="featured-sect results-container w-full featured-sect splide"
          dataFetcher={getUpcoming}
          ariaLabel="Upcoming Section"
          title="Coming Next Season"
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
