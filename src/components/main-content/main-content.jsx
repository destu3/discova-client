import { Tabs } from 'antd';
import ActionButton from '../action-button/action-button';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { AlertContext } from '../../contexts/alert.context';
import Card from '../card/card';
import AnimeOverview from '../anime-overview/anime-overview';
import ThemeSection from '../theme-section/theme-section';
import { useListStatus, cardButtonsConfig } from '../../hooks/useListStatus';
import { calculateDaysToAiring, showAiringInfo } from '../../utils/anime-utils';
import { addEntry, removeEntry } from '../../utils/anime-utils';
import './main-content.component.css';
import { Link } from 'react-router-dom';

const MainContent = ({ animeInfo }) => {
  const { id: animeId } = animeInfo;
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  const renderOpt = useListStatus(animeId);

  const addToList = listType => {
    addEntry({ animeId, listType }, { currentUser, setCurrentUser }, setAlert);
  };

  const removeFromList = listType => {
    removeEntry(
      { animeId, listType },
      { currentUser, setCurrentUser },
      setAlert
    );
  };

  const tabItems = [
    {
      key: 'overview',
      label: `Overview`,
      children: <AnimeOverview animeInfo={animeInfo} />,
    },
    {
      key: 'themes',
      label: `Themes`,
      children: <ThemeSection />,
    },
    {
      key: 'recommendations',
      label: `Recommendations`,
    },

    // { key: 'Reviews', label: `Reviews`, children: `Content of Reviews` },
  ];

  if (animeInfo?.recommendations.nodes.length > 0) {
    tabItems[2].children = (
      <>
        <h3 className="font-semibold text-[1.15rem] md:text-[1.3rem] mb-3">
          You may also like
        </h3>
        <div className="rec-cards">
          {animeInfo.recommendations.nodes
            .filter(({ mediaRecommendation }) => mediaRecommendation !== null)
            .map(({ mediaRecommendation: media }) => (
              <div
                className="card overflow-hidden relative text-[var(--main-text)]"
                style={{
                  color: 'var(--main-text)',
                  '--main-color': media.coverImage.color,
                }}
                key={media.id}
              >
                <Card anime={media} />
              </div>
            ))}
        </div>
      </>
    );
  } else
    tabItems[2].children = (
      <div className="pb-14">No recommendations for this anime</div>
    );

  const buttons = cardButtonsConfig(addToList, removeFromList)[renderOpt];

  return (
    <section className="main-content mt-2 lg:px-5 2xl:px-20">
      <>
        <div className="w-full text-[var(--main-text)]">
          <header className="relative mb-6">
            <div className="img-cover absolute bottom-0 left-0 aspect-[37/53] xs:w-[130px] sm:w-[160px] md:w-[200px]">
              <img
                className="w-full h-full rounded absolute left-0 top-0 object-cover poster"
                src={animeInfo.coverImage.extraLarge}
                alt={`Cover image for ${
                  animeInfo.title.english ||
                  animeInfo.title.romaji ||
                  animeInfo.title.native
                }`}
                loading="lazy"
              />
            </div>

            <div className="xs:left-[145px] sm:left-[180px] md:left-[220px] relative xs:w-[calc(100%_-_145px)] sm:w-[calc(100%_-_180px)] md:w-[calc(100%_-_220px)]">
              <h1 className="title font-bold text-[1.1rem] sm:text-[1.2rem] md:text-[1.5rem]">
                {animeInfo.title.english ||
                  animeInfo.title.romaji ||
                  animeInfo.title.native}
              </h1>

              {animeInfo.status === 'RELEASING' ? (
                <p className="airing-info text-[var(--secondary-text)] text-[0.95rem] font-bold mb-1">
                  {calculateDaysToAiring(animeInfo)}
                </p>
              ) : (
                <p className="airing-info text-[var(--secondary-text)] text-[0.95rem] font-bold mb-1">
                  {showAiringInfo(animeInfo)}
                </p>
              )}

              <div className="text-[var(--secondary-text)] text-[0.95rem] mb-3 font-bold">
                {animeInfo.genres.join(', ')}
              </div>

              <div className="buttons flex gap-2">
                {!renderOpt ? (
                  <Link to={'/login'}>
                    <button className="bg-[#804fbd] transition-all hover:shadow-[rgba(50,50,93,0.25)_0px_13px_27px_-5px,rgba(0,0,0,0.3)_0px_8px_16px_-8px] py-3 px-10 rounded-md font-medium">
                      Add to List
                    </button>
                  </Link>
                ) : (
                  buttons.map(button => (
                    <ActionButton
                      listTarget={button.listTarget}
                      key={button.iconClassName}
                      handler={button.handler}
                      title={button.title}
                      iconClassName={button.iconClassName}
                    />
                  ))
                )}
              </div>
            </div>
          </header>

          <Tabs
            className="font-semibold font-[Roboto]"
            defaultActiveKey="1"
            items={tabItems}
          />
        </div>
      </>
    </section>
  );
};

export default MainContent;
