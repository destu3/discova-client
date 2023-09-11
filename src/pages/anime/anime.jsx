import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import MainContent from '../../components/main-content/main-content';
import Loader from '../../components/loader/loader';

import { getAnimeInfo } from '../../services/api/anime';

const Anime = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const [animeInfo, setAnimeInfo] = useState(null);

  useEffect(() => {
    document.title = 'Discova - Anime';
  }, []);

  useEffect(() => {
    setAnimeInfo(null);
    getAnimeInfo(id).then(({ animeInfo }) => {
      setAnimeInfo(animeInfo);
      document.title = `Discova - ${
        animeInfo.title.english ||
        animeInfo.title.romaji ||
        animeInfo.title.native
      }`;
    });
  }, [pathname]);

  // Create spring animations for opacity and scale
  const contentProps = useSpring({
    opacity: animeInfo ? 1 : 0,
  });

  return (
    <div className="wrapper absolute top-0 left-0 w-full">
      {animeInfo ? (
        <animated.div
          aria-label="anime-content"
          className="anime-content"
          style={contentProps}
        >
          <div
            style={{
              backgroundImage: `url(${
                animeInfo.bannerImage || animeInfo.coverImage.extraLarge
              })`,
              backgroundPosition: 'center',
              backgroundRepeat: 'repeat',
              backgroundSize: animeInfo.bannerImage ? 'cover' : 'contain',
            }}
            className={`banner xs:h-44 sm:h-[250px] lg:h-[300px] ${
              !animeInfo.bannerImage ? 'blur-[6px]' : ''
            }`}
          ></div>
          <div
            style={{
              backgroundImage: `url(${animeInfo.coverImage.extraLarge})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
            className="poster-banner xs:hidden w-full h-[400px]"
          ></div>
          <main className="mt-2 pt-[2px] p-2 pb-4 sm:container mx-auto">
            <MainContent animeInfo={animeInfo} />
          </main>
        </animated.div>
      ) : (
        <div
          aria-label="loader-div"
          className="text-[var(--main-text)] h-screen flex justify-center items-center"
        >
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Anime;
