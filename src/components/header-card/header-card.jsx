import { Link } from 'react-router-dom';
import { generateUrl, sanitize } from '../../utils/anime-utils';
import './header-card.component.css';

const HeaderCard = ({ anime }) => {
  return (
    <>
      {/* Background element */}
      <div
        className={`background absolute top-0 right-0 left-0 bottom-0 blur-sm bg-center ${
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
        <Link
          to={generateUrl(anime)}
          className="hidden sm:block h-[200px] md:h-[250px] lg:h-[300px] aspect-[37/53] relative"
        >
          <img
            className="featured-poster w-full h-full absolute left-0 top-0 object-cover"
            src={anime.coverImage.extraLarge}
            alt="featured poster"
          />
        </Link>

        {/* Featured info */}
        <div className="featured-info p-2 sm:p-4 overflow-hidden flex-1">
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
            className="text-[0.95rem] md:text-[1.05rem] font-semibold mb-3 lg:mb-5 text-[var(--main-text)] featured-desc"
          ></p>

          {/* Genres */}
          <div className="text-[var(--main-text)] items-center featured-genres max-w-[100%]">
            <div className="genres flex flex-wrap items-center">
              <i className="hidden sm:inline fa-solid fa-tags lg:text-lg text-[var(--main-text)] pr-2" />

              {/* Genre links */}
              {anime.genres.map(genre => (
                <div
                  key={Math.random() * 100000}
                  className="mr-4 text-[0.95rem] md:text-[1.05rem] font-medium"
                >
                  {genre}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderCard;
