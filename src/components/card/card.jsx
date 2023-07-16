import { useState } from 'react';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import SkeletonCard from '../skeleton-loaders/skeleton-card';
import './card.component.css';

const Card = ({ anime }) => {
  const [posterLoaded, setPosterLoaded] = useState(false);

  const title = anime.title.english || anime.title.romaji || anime.title.native;

  const slug = slugify(title, {
    lower: true,
    remove: /[$*_+~.()'"!:;@]/g,
  });

  const showPoster = () => {
    setPosterLoaded(true);
  };

  return (
    <div className="aspect-[37/53] w-full relative cursor-pointer rounded-[4px] overflow-hidden">
      <Link
        className={`img-cover cursor-pointer relative transition-all block w-full h-full duration-[400ms] rounded-[4px] ${
          posterLoaded ? 'block' : 'opacity-0'
        }`}
        to={`/anime/${slug}/${anime.id}`}
      >
        <img
          className="w-full h-full absolute left-0 top-0 object-cover rounded-[4px] poster transition-all duration-[400ms]"
          src={anime.coverImage.extraLarge}
          alt={`Cover image for ${title}`}
          onLoad={showPoster}
          loading="lazy"
        />
      </Link>

      {!posterLoaded && (
        <SkeletonCard
          className="absolute top-0 left-0 h-full rounded-[4px] bg-[var(--overlay-grey)] img-skeleton overflow-hidden z-30 justify-center w-full aspect-[37/53] items-center"
          text={false}
        />
      )}

      <div className="card-overlay flex rounded-b-[4px] absolute bottom-0 left-0 w-full p-2">
        <Link
          to={`/anime/${slug}/${anime.id}`}
          className="transition-all duration-[400ms] title font-semibold relative text-[0.9rem] z-10 md:text-[0.85rem]"
          title={title}
        >
          {title}
        </Link>
      </div>
    </div>
  );
};

export default Card;
