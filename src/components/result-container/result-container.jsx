import Card from '../card/card';
import Skeleton from '../skeleton-loaders/skeleton';
import './result-container.component.css';

const ResultContainer = props => {
  const { data, loading, moreLoading } = props;

  return (
    <section className="search-results w-full transition-all duration-300 p-1 pt-0">
      {/* Render skeleton cards while loading */}
      {loading
        ? Array.from({ length: 20 }).map((_, index) => (
            <div
              className={`flex flex-col items-center w-full skeleton-card`}
              key={index}
            >
              <Skeleton />
            </div>
          ))
        : /* Render data cards */
          data.map(anime => (
            <div
              className="card w-full overflow-hidden relative text-[var(--main-text)]"
              style={{
                color: 'var(--main-text)',
                '--main-color': anime.coverImage.color,
              }}
              key={anime.id}
            >
              <Card anime={anime} />
            </div>
          ))}

      {/* Render more loading skeleton cards */}
      {moreLoading &&
        Array.from({ length: 20 }).map((_, index) => (
          <div
            className={`flex flex-col items-center w-full skeleton-card`}
            key={data.length + index} // Generate unique keys for skeleton cards
          >
            <Skeleton />
          </div>
        ))}
    </section>
  );
};

export default ResultContainer;
