import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import ThemeCard from '../theme-card/theme-card';
import { getThemes } from '../../services/api/anime';

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
            <div className="openings mb-5">
              <h3 className="font-semibold text-[1.15rem] md:text-[1.2rem] mb-3">
                Openings
              </h3>
              <div className="theme-cards flex flex-col gap-2">
                {themes.ops.map(theme => (
                  <ThemeCard theme={theme} key={theme.songId + theme.slug} />
                ))}
              </div>
            </div>

            <div className="endings mb-5">
              <h3 className="font-semibold text-[1.15rem] md:text-[1.2rem] mb-3">
                Endings
              </h3>
              <div className="theme-cards flex flex-col gap-2">
                {themes.eds.map(theme => (
                  <ThemeCard theme={theme} key={theme.songId + theme.slug} />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : themes === null ? (
        <div className="my-14 flex flex-col gap-4 items-center">
          <BeatLoader color="#bb86fc" />
        </div>
      ) : (
        <div className="pb-14">There are no themes for this anime</div>
      )}
    </section>
  );
};

export default ThemeSection;
