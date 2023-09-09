import { useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '../skeleton-loaders/skeleton';
import ActionButtons from '../action-buttons/action-buttons';
import {
  generateUrl,
  calculateDaysToAiring,
  showAiringInfo,
} from '../../utils/anime-utils';
import './card.component.css';

const Card = ({ anime }) => {
  const [posterLoaded, setPosterLoaded] = useState(false);

  const { status, coverImage } = anime;
  const title = anime.title.english || anime.title.romaji || anime.title.native;

  const showPoster = () => {
    setPosterLoaded(true);
  };

  const airingInfo =
    status === 'RELEASING'
      ? calculateDaysToAiring(anime)
      : showAiringInfo(anime);

  return (
    <div className="aspect-[37/53] w-full relative rounded-[4px] overflow-hidden">
      <Link
        className={`img-cover relative transition-all block w-full h-full duration-[400ms] rounded-[4px] ${
          posterLoaded ? 'block' : 'opacity-0'
        }`}
        to={generateUrl(anime)}
      >
        <img
          className="w-full h-full absolute left-0 top-0 object-cover rounded-[4px] poster transition-all duration-[400ms]"
          src={coverImage.extraLarge}
          alt={`Cover image for ${title}`}
          onLoad={showPoster}
          loading="lazy"
        />
      </Link>

      {/* Inline conditional rendering for the skeleton */}
      {!posterLoaded && (
        <Skeleton className="absolute top-0 left-0 h-full rounded-[4px] bg-[var(--overlay-grey)] img-skeleton overflow-hidden z-30 justify-center w-full aspect-[37/53] items-center" />
      )}

      <div className="card-overlay rounded-b-[4px] absolute bottom-0 left-0 w-full p-2">
        <Link
          to={generateUrl(anime)}
          className="hover:text-[var(--main-text)] transition-all duration-[400ms] mb-[2px] leading-4 title font-semibold relative text-[0.82rem] z-10 md:text-[0.9rem]"
          title={title}
        >
          {title}
        </Link>
        <p className="airing-info text-xs md:text-[0.84rem] font-bold">
          {airingInfo}
        </p>
      </div>

      {/* use the current user state to determine which action buttons will be rendered */}
      <ActionButtons animeId={anime.id} />
    </div>
  );
};

export default Card;
