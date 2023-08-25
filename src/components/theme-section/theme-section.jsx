import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import ThemeCard from '../theme-card/theme-card';
import { getThemes } from '../../services/internal-api/anime';

const ThemeSection = () => {
  const [themes, setThemes] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const retrieveTracks = async () => {
      const { themes } = await getThemes(id);
      setThemes(themes);
    };

    retrieveTracks();
  }, []);

  return (
    <section className="themes w-full">
      {themes ? (
        <>
          <section className="themes">
            <h3 className="font-semibold text-[1.15rem] md:text-[1.3rem] mb-3">
              Openings and Endings
            </h3>

            <div className="theme-cards flex flex-col gap-2">
              {themes.map(theme => (
                <ThemeCard theme={theme} key={theme.songId + theme.slug} />
              ))}
            </div>
          </section>
        </>
      ) : themes !== undefined ? (
        <div className="my-14 flex flex-col gap-4 items-center">
          <HashLoader size={50} color="#bb86fc" />
        </div>
      ) : (
        <div className="pb-14">There are no themes for this anime</div>
      )}
    </section>
  );
};

export default ThemeSection;
