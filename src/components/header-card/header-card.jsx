import { Link } from 'react-router-dom';
import { generateUrl, sanitize } from '../../helpers/anime-utils';
import './header-card.component.css';

const HeaderCard = ({ anime }) => {
  return (
    <>
      {/* Background element */}
      <div
        className={`background absolute top-0 right-0 left-0 bottom-0 blur-[6px] bg-center ${
          anime.bannerImage ? 'bg-cover' : 'bg-contain'
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${
            anime.bannerImage ? anime.bannerImage : anime.coverImage.extraLarge
          })`,
        }}
      ></div>

      {/* Slider content */}
      <div className="slider-content w-full absolute left-0 top-0 right-0 bottom-0 flex">
        {/* Featured poster */}
        <img
          className="featured-poster h-0 sm:h-full w-auto"
          src={anime.coverImage.extraLarge}
          alt="featured poster"
        />

        {/* Featured info */}
        <div className="featured-info p-2 sm:p-4 flex-1 overflow-hidden">
          {/* Title */}
          <Link to={generateUrl(anime)}>
            <h2 className="text-xl md:text-2xl font-bold text-[var(--main-brand)] mb-2">
              {anime.title.english || anime.title.romaji || anime.title.native}
            </h2>
          </Link>

          {/* Description */}
          <p
            // Sanitized HTML to prevent potential XSS attacks
            dangerouslySetInnerHTML={sanitize(anime)}
            className="md:text-lg font-medium mb-3 lg:mb-5 text-[var(--main-text)] featured-desc"
          ></p>

          {/* Genres */}
          <div className="text-[var(--main-text)] items-center featured-genres max-w-[100%]">
            <div className="genres flex flex-wrap items-center">
              <i className="hidden sm:inline fa-solid fa-tags lg:text-lg text-[var(--main-text)] pr-2" />

              {/* Genre links */}
              {anime.genres.map(genre => (
                <Link
                  key={Math.random() * 100000} // Using Math.random() as a temporary key, will change to a proper identifier
                  to={`/search?genre=${genre.toLowerCase()}`}
                  className="mr-4 md:text-lg font-medium transition-all hover:text-[var(--main-brand)]"
                >
                  {genre}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderCard;
