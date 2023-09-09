import moment from 'moment';
import { capitalizeWords } from '../../utils/anime-utils';
import './anime-info.component.css';

const AnimeInfo = ({ animeInfo }) => {
  const startDate = {
    ...animeInfo.startDate,
    month: animeInfo.startDate.month - 1,
  };

  const endDate = {
    ...animeInfo.endDate,
    month: animeInfo.endDate.month - 1,
  };

  return (
    <section aria-label="anime-info">
      <h3 className="font-semibold mb-2 text-[1.15rem] md:text-[1.3rem]">
        Information
      </h3>
      <div className="info-grid text-[0.96rem] leading-[22px]">
        {animeInfo.averageScore && (
          <div className="avg-score">
            <h4>Average Score</h4>
            <div className="text-[var(--secondary-text)]">
              {animeInfo.averageScore}
            </div>
          </div>
        )}

        {animeInfo.duration && (
          <div className="duration">
            <h4>Duration</h4>
            <div className=" text-[var(--secondary-text)]">
              {animeInfo.duration} mins
            </div>
          </div>
        )}

        {animeInfo.episodes && (
          <div className="episodes">
            <h4>Episodes</h4>
            <div className=" text-[var(--secondary-text)]">
              {animeInfo.episodes}
            </div>
          </div>
        )}

        {animeInfo.format && (
          <div className="format">
            <h4>Format</h4>
            <div className=" text-[var(--secondary-text)]">
              {animeInfo.format.startsWith('O') || animeInfo.format === 'TV'
                ? animeInfo.format
                : capitalizeWords(animeInfo.format)}
            </div>
          </div>
        )}

        {animeInfo.startDate &&
          Object.values(animeInfo.startDate).every(value => value !== null) && (
            <div className="start-date">
              <h4>Start Date</h4>
              <div className=" text-[var(--secondary-text)]">
                {moment(startDate).format('Do MMM YYYY')}
              </div>
            </div>
          )}

        {animeInfo.endDate &&
          Object.values(animeInfo.endDate).every(value => value !== null) && (
            <div className="end-date">
              <h4>End Date</h4>
              <div className=" text-[var(--secondary-text)]">
                {moment(endDate).format('Do MMM YYYY')}
              </div>
            </div>
          )}

        {animeInfo.status && (
          <div className="status">
            <h4>Status</h4>
            <div className=" text-[var(--secondary-text)]">
              {animeInfo.status !== 'NOT_YET_RELEASED'
                ? capitalizeWords(animeInfo.status)
                : 'Unreleased'}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AnimeInfo;
