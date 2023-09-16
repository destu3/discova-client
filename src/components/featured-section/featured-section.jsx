import { useState, useEffect, useContext, useRef } from 'react';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import HeaderCard from '../../components/header-card/header-card';
import SkeletonHeader from '../../components/skeleton-loaders/skeleton-header';
import Card from '../card/card';
import { AlertContext } from '../../contexts/alert.context';
import { showAlert } from '../../utils/alert-utils';
import './featured-section.component.css';
import Skeleton from '../skeleton-loaders/skeleton';
import { QueryContext } from '../../contexts/query.context';

const FeaturedSection = props => {
  // Destructure props
  const { dataFetcher, featuredHeader, title, filter } = props;
  const isTouchDevice = 'ontouchstart' in window;

  const swiperConfig = {
    navigation: false,
    class: 'results-container w-full',
    'slides-per-view': 'auto',
    'slides-per-group-auto': true,
    'css-mode': true,
    'free-mode': true,
  };

  // State for loading and data
  const [state, setState] = useState({ loading: true, data: [] });
  const { loading, data } = state;
  const swiperRef = useRef(null);
  const { setQuery } = useContext(QueryContext);
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

    if (!featuredHeader && isTouchDevice) {
      const { current } = swiperRef;
      const params = {
        // array with CSS styles
        injectStyles: [
          '.swiper-button-prev svg, .swiper-button-next svg { display: none }',
        ],
      };
      Object.assign(current, params);
      current.initialize();
    }
  }, []);

  const determineRender = () =>
    isTouchDevice ? (
      <swiper-container init="false" ref={swiperRef} {...swiperConfig}>
        {loading
          ? Array.from({ length: 20 }).map((_, index) => (
              <swiper-slide
                class="flex flex-col mr-5 items-center overflow-hidden w-fit rounded-[4px]"
                key={index}
              >
                <Skeleton featured={true} />
              </swiper-slide>
            ))
          : data.map(anime => (
              <swiper-slide
                class="card mr-5 w-[145px] md:w-[160px] aspect-[37/53] relative overflow-hidden rounded-[4px]"
                style={{
                  color: 'var(--main-text)',
                  '--main-color': anime.coverImage.color,
                }}
                key={anime.id}
              >
                <Card anime={anime} />
              </swiper-slide>
            ))}
      </swiper-container>
    ) : (
      <section className="featured-grid w-full">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <div
                className="flex flex-col items-center w-full skeleton-card"
                key={index}
              >
                <Skeleton />
              </div>
            ))
          : data.slice(0, 9).map(anime => (
              <div
                className="card w-full mr-5 relative overflow-hidden rounded-[4px]"
                style={{
                  color: 'var(--main-text)',
                  '--main-color': anime.coverImage.color,
                }}
                key={anime.id}
              >
                <Card anime={anime} />
              </div>
            ))}
      </section>
    );

  const resetQuery = () => {
    return {
      search: '',
      page: 1,
      genres: new Set(),
      year: null,
      season: undefined,
      sort: undefined,
    };
  };

  return (
    <section className="featured-section">
      {!featuredHeader ? (
        <>
          <header className="flex items-center justify-between mb-2">
            <h2 className="sect-title font-semibold text-lg sm:text-xl text-[var(--heading-grey)]">
              {title}
            </h2>
            <Link
              onClick={() => {
                setQuery({ ...resetQuery(), ...filter });
              }}
              className="text-sm font-medium text-[var(--secondary-text)] transition-all hover:text-[var(--main-text)]"
              to="search"
            >
              View more
            </Link>
          </header>
          {determineRender()}
        </>
      ) : (
        <Carousel
          className={`results-container w-full featured-sect ${
            featuredHeader && 'featured-header'
          }`}
          autoplay
          autoplaySpeed={10000}
          slidesToShow={1}
        >
          {loading ? (
            <SkeletonHeader />
          ) : (
            data.map(anime => (
              <div
                className="w-full h-[200px] md:h-[250px] lg:h-[300px] relative"
                key={anime.id}
              >
                <HeaderCard anime={anime} />
              </div>
            ))
          )}
        </Carousel>
      )}
    </section>
  );
};

export default FeaturedSection;
