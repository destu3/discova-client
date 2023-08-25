import RelationCard from '../relation-card/relation-card';
import AnimeInfo from '../anime-info/anime-info';
import { sanitize } from '../../helpers/anime-utils';
import './anime-overview.component.css';

const AnimeOverview = ({ animeInfo }) => {
  const relations = animeInfo.relations.edges;
  const characters = animeInfo.characters.edges;

  return (
    <div className="mb-2 flex flex-col gap-8">
      <AnimeInfo animeInfo={animeInfo} />

      <section aria-label="description">
        <h3 className="font-semibold text-[1.15rem] md:text-[1.3rem]">
          Description
        </h3>
        <p
          dangerouslySetInnerHTML={sanitize(animeInfo)}
          className="mt-2 text-[0.95rem] md:text-base overflow-hidden description relative font-medium text-[var(--secondary-text)]"
        ></p>
      </section>

      {animeInfo?.trailer && (
        <section className="trailer">
          <h3 className="font-semibold text-[1.15rem] md:text-[1.3rem] mb-3">
            Trailer
          </h3>
          <iframe
            loading="lazy"
            className="video w-full lg:w-2/3 aspect-video rounded-md"
            src={`https://www.youtube.com/embed/${animeInfo.trailer.id}`}
            title="trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </section>
      )}

      {animeInfo.characters.edges.length > 0 && (
        <section aria-label="characters">
          <h3 className="font-semibold text-[1.15rem] md:text-[1.3rem] mb-3">
            Characters
          </h3>
          <div className="char-cards">
            {characters.map(character => (
              <RelationCard
                cardType="character"
                relation={character}
                key={character.node.id}
              />
            ))}
          </div>
        </section>
      )}

      {animeInfo.relations.edges.length > 0 && (
        <section aria-label="relations">
          <h3 className="font-semibold text-[1.15rem] md:text-[1.3rem] mb-3">
            Relations
          </h3>
          <div className="related-cards">
            {relations.map(relation => (
              <RelationCard relation={relation} key={relation.node.id} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AnimeOverview;
