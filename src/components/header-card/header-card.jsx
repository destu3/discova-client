import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './header-card.component.css';

const HeaderCard = ({ anime }) => {
  return (
    <>
      {/* Background element */}
      <div
        className={`background absolute top-0 right-0 left-0 bottom-0 blur bg-center ${
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
        <div className="featured-info p-4 flex-1 overflow-hidden">
          {/* Title */}
          <h2 className="text-base md:text-2xl font-bold text-[var(--main-brand)] mb-2">
            {anime.title.english || anime.title.romaji || anime.title.native}
          </h2>

          {/* Description */}
          <p
            // Sanitized HTML to prevent potential XSS attacks
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(anime.description),
            }}
            className="lg:text-lg font-medium mb-3 lg:mb-5 text-[var(--main-text)] featured-desc"
          ></p>

          {/* Genres */}
          <div className="text-[var(--main-text)] items-center featured-genres max-w-[100%] whitespace-nowrap overflow-hidden overflow-ellipsis">
            <div className="genres flex flex-wrap items-center">
              <i className="fa-solid fa-tags lg:text-lg text-[var(--main-text)] pr-2" />

              {/* Genre links */}
              {anime.genres.map(genre => (
                <Link
                  key={Math.random() * 100000} // Using Math.random() as a temporary key, will change to a proper identifier
                  to={`/search/anime?genre=${genre.toLowerCase()}`}
                  className="mr-4 lg:text-lg font-medium transition-all hover:text-[var(--main-brand)]"
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
