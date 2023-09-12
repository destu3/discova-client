import { useState, useEffect, useContext, useRef } from 'react';
import { Carousel } from 'antd';
import HeaderCard from '../../components/header-card/header-card';
import SkeletonHeader from '../../components/skeleton-loaders/skeleton-header';
import Card from '../card/card';
import { AlertContext } from '../../contexts/alert.context';
import { UserContext } from '../../contexts/user.context';
import { showAlert } from '../../utils/alert-utils';
import './featured-section.component.css';
import Skeleton from '../skeleton-loaders/skeleton';

const FeaturedSectionWatchList = props => {
  // Destructure props
  const { dataFetcher, featuredHeader, title } = props;
  const isTouchDevice = 'ontouchstart' in window;

  const swiperConfig = {
    navigation: !isTouchDevice,
    class: 'results-container w-full featured-sect',
    'slides-per-view': 'auto',
    'slides-per-group-auto': true,
    speed: 700,
    'allow-touch-move': isTouchDevice,
    'free-mode': isTouchDevice,
  };

  // State for loading and data
  const [state, setState] = useState({ loading: true, data: [] });
  const { loading, data } = state;
  const swiperRef = useRef(null);
  const { currentUser } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (!featuredHeader) {
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

  const determineRender = () =>
    loading
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
            class="card mr-5 aspect-[37/53] relative w-[150px] md:w-[180px] overflow-hidden rounded-[4px]"
            style={{
              color: 'var(--main-text)',
              '--main-color': anime.coverImage.color,
            }}
            key={anime.id}
          >
            <Card anime={anime} />
          </swiper-slide>
        ));

  return (
    <>
      {!featuredHeader ? (
        <>
          <h2 className="sect-title font-semibold mb-3 text-lg sm:text-xl text-[var(--heading-grey)]">
            {title}
          </h2>
          <swiper-container init="false" ref={swiperRef} {...swiperConfig}>
            {determineRender()}
          </swiper-container>
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
    </>
  );
};

export default FeaturedSectionWatchList;
