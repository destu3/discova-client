import moment from 'moment/moment';

/**
 * Retrieves the current year.
 * @returns {number} The current year.
 */
export function getYear() {
  // Get the current year
  return new Date().getFullYear();
}

/**
 * Retrieves the current season.
 * @returns {string} The current season in uppercase.
 */
export function getSeason() {
  // Get the current month and determine the season
  const date = new Date();
  const month = date.getMonth() + 1;
  let season = 'winter';

  if (month >= 10 && month <= 12) {
    season = 'fall';
  } else if (month >= 4 && month <= 6) {
    season = 'spring';
  } else if (month >= 7 && month <= 9) {
    season = 'summer';
  }

  // Convert the season to uppercase and return it
  return season.toUpperCase();
}

/**
 * Retrieves the next season based on the current season.
 * @param {string} season - The current season.
 * @returns {string} The next season.
 */
export function getNextSeason(season) {
  // Get the next season based on the current season
  if (season === 'WINTER') {
    return 'SPRING';
  } else if (season === 'SPRING') {
    return 'SUMMER';
  } else if (season === 'SUMMER') {
    return 'FALL';
  } else {
    return 'WINTER';
  }
}

/**
 * Calculates the number of days until the next airing episode of an anime.
 * @param {Object} anime - The anime object.
 * @param {Object} anime.nextAiringEpisode - The next airing episode object.
 * @param {number} anime.nextAiringEpisode.airingAt - The Unix timestamp of the next airing episode.
 * @returns {string} The number of days until the next airing episode.
 */
export const calculateDaysToAiring = ({ nextAiringEpisode }) => {
  const currentDate = moment();
  const airingDateMs = nextAiringEpisode?.airingAt * 1000; // multiply unix timestamp by 1000 to get milliseconds
  const airingDate = moment(airingDateMs);
  const episode = nextAiringEpisode?.episode;

  // Calculate the difference between the dates
  const duration = moment.duration(airingDate.diff(currentDate));

  // Check if the difference is more than 24 hours (1 day)
  if (duration.asHours() >= 24) {
    const daysDiff = Math.floor(duration.asDays());
    if (daysDiff > 30) {
      const formattedDate = airingDate.format('Do MMM YYYY');
      return `Episode ${episode} airing ${formattedDate}`;
    }
    return `Episode ${episode} airing in ${daysDiff} day${
      daysDiff > 1 ? 's' : ''
    }`;
  } else if (duration.asHours() >= 1) {
    const hoursDiff = Math.floor(duration.asHours());
    const minutesDiff = Math.floor(duration.asMinutes()) % 60;
    return `Episode ${episode} airing in ${hoursDiff} hour${
      hoursDiff > 1 ? 's' : ''
    } and ${minutesDiff} minute${minutesDiff !== 1 ? 's' : ''}`;
  } else {
    const minutesDiff = Math.floor(duration.asMinutes());
    const secondsDiff = Math.floor(duration.asSeconds()) % 60;
    return `Episode ${episode} airing in ${minutesDiff} minute${
      minutesDiff !== 1 ? 's' : ''
    } and ${secondsDiff} second${secondsDiff !== 1 ? 's' : ''}`;
  }
};

export const showAiringInfo = anime => {
  const { season, seasonYear, episodes } = anime;

  if (!season || !seasonYear) return 'Coming Soon';

  if (anime.nextAiringEpisode?.airingAt) {
    return calculateDaysToAiring(anime);
  }

  const capitalized = season?.charAt(0) + season?.slice(1).toLowerCase();

  return `${capitalized} ${seasonYear} ${
    episodes ? `• ${episodes} ${episodes > 1 ? 'Episodes' : 'Episode'}` : ''
  }`;
};
