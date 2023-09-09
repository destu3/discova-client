import StreamingLinks from '../streaming-links/streaming-links';
import { parseThemeSlug } from '../../utils/anime-utils';

const ThemeCard = ({ theme }) => {
  const { songTitle, artists } = theme;
  const slug = parseThemeSlug(theme.slug);

  return (
    <div className="theme-card rounded text-sm md:text-[0.95rem] font-medium bg-[#1c1c1c] p-3 gap-3 flex items-center">
      <div className="theme-details flex-1">
        {`${slug} - ${songTitle} ${
          artists.length > 0 ? `by ${artists[0].name}` : ''
        }`}
      </div>
      <StreamingLinks
        forOverlay={false}
        theme={theme}
        slug={slug}
        iconSize="text-xl"
      />
    </div>
  );
};

export default ThemeCard;
