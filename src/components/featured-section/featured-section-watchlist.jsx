import { useState, useEffect, useContext } from 'react';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import HeaderCard from '../header-card/header-card';
import SkeletonHeader from '../skeleton-loaders/skeleton-header';
import Card from '../card/card';
import { UserContext } from '../../contexts/user.context';
import { AlertContext } from '../../contexts/alert.context';
import { showAlert } from '../../utils/alert-utils';
import './featured-section.component.css';
import Skeleton from '../skeleton-loaders/skeleton';

const FeaturedSectionWatchlist = props => {
  // Destructure props
  const { dataFetcher, className, options, ariaLabel, featuredHeader, title } =
    props;

  // State for loading and data
  const [state, setState] = useState({ loading: true, data: [] });
  const { loading, data } = state;
  const { currentUser } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    (async () => {
      try {
        const data = await dataFetcher();
        const stateClone = { ...state, data: data, loading: false };
        setState(stateClone);
      } catch (err) {
        showAlert(err.message, setAlert, true);
      }
    })();
  }, [currentUser]);

  // Determine what to render based on the featuredHeader and loading values
  const determineRender = () => {
    if (!featuredHeader) {
      return loading
        ? Array.from({ length: 20 }).map((_, index) => (
            <SplideSlide
              className={`flex flex-col items-center skeleton overflow-hidden splide__slide`}
              key={index}
            >
              <Skeleton featured={true} />
            </SplideSlide>
          ))
        : data.map(anime => (
            <SplideSlide
              className={`card relative w-[150px] md:w-[180px] overflow-hidden`}
              style={{
                color: 'var(--main-text)',
                '--main-color': anime.coverImage.color,
              }}
              key={anime.id}
            >
              <Card anime={anime} />
            </SplideSlide>
          ));
    } else {
      return loading ? (
        <SkeletonHeader />
      ) : (
        data.map(anime => (
          <SplideSlide className="h-full w-full" key={anime.id}>
            <HeaderCard anime={anime} />
          </SplideSlide>
        ))
      );
    }
  };

  return (
    <Splide
      hasTrack={false}
      tag="section"
      className={className}
      options={
        options
          ? options
          : {
              autoWidth: true,
              gap: 20,
              pagination: false,
              drag: 'free',
              rewind: true,
              snap: false,
              updateOnMove: true,
              perMove: 5,
              speed: 1000,
              arrows: true,
              breakpoints: {
                640: {
                  perMove: 2,
                },
                1024: {
                  perMove: 3,
                },
              },
            }
      }
      aria-label={ariaLabel}
    >
      {/* Render title if not featuredHeader */}
      {!featuredHeader && (
        <h2 className="sect-title font-semibold mb-3 text-lg sm:text-xl text-[var(--heading-grey)]">
          {title}
        </h2>
      )}

      <SplideTrack className="h-full overflow-visible">
        {/* Render slides */}
        {determineRender()}
      </SplideTrack>
    </Splide>
  );
};

export default FeaturedSectionWatchlist;
