import { Link } from 'react-router-dom';
import { generateUrl, capitalizeWords } from '../../utils/anime-utils';

const RelationCard = ({ relation, cardType }) => {
  let title, relationType, type, status;

  if (cardType !== 'character') {
    title =
      relation.node.title.english ||
      relation.node.title.romaji ||
      relation.node.title.native;
    relationType = capitalizeWords(relation.relationType);
    type = capitalizeWords(relation.node.type);
    status = capitalizeWords(relation.node.status);
  }

  return cardType !== 'character' ? (
    <div className="relation-card">
      {type !== 'Anime' ? (
        <div className="cover aspect-[37/53]">
          <img
            className="w-full h-full object-cover rounded-sm"
            src={`${relation.node.coverImage.large}`}
            alt="relation cover image"
          />
        </div>
      ) : (
        <Link to={generateUrl(relation.node)}>
          <div className="cover aspect-[37/53]">
            <img
              className="w-full h-full object-cover rounded-sm"
              src={`${relation.node.coverImage.large}`}
              alt="relation cover image"
            />
          </div>
        </Link>
      )}

      <div className="py-3">
        <div
          title={title}
          className="title text-[var(--main-text)] leading-5 text-[0.9rem]"
        >
          {title}
        </div>
        <div className="relation-type text-[var(--secondary-text)] text-[0.82rem]">
          {relationType}
        </div>

        <footer className="flex text-[var(--secondary-text)] flex-1">
          <div className="text-[0.82rem]">
            {`${type} • ${status.startsWith('Not') ? 'Unreleased' : status}`}
          </div>
        </footer>
      </div>
    </div>
  ) : (
    <div className="character-card">
      <div className="cover aspect-[37/53]">
        <img
          className="w-full h-full object-cover rounded-sm"
          src={`${relation.node.image.large}`}
          alt="relation cover image"
        />
      </div>

      <div className="py-3">
        <div
          title={relation.node.name.full}
          className="char-name text-[var(--main-text)] leading-5 text-[0.9rem]"
        >
          {relation.node.name.full}
        </div>
        <div className="char-role text-[var(--secondary-text)] text-[0.82rem]">
          {capitalizeWords(relation.role)}
        </div>
      </div>
    </div>
  );
};

export default RelationCard;
