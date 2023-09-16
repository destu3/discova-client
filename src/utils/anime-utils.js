import moment from 'moment/moment';
import DOMPurify from 'dompurify';
import slugify from 'slugify';
import { showAlert } from './alert-utils';
import { addEntryToList, removeAnimeFromList } from '../services/api/user';

// Retrieves the current year.
export function getYear() {
  const currentSeason = getSeason();

  const year = new Date().getFullYear();

  // Get the current year
  return currentSeason === 'Winter' ? year + 1 : year;
}

// determines the season and year based on a release date argument
function getAnimeSeasonYear(releaseDate) {
  // Extract year, month, and day from the input object
  const year = releaseDate.year;
  const month = releaseDate.month;

  // Determine the anime season based on the month
  let season;

  if (month) {
    if (1 <= month && month <= 3) {
      season = 'Winter';
    } else if (4 <= month && month <= 6) {
      season = 'Spring';
    } else if (7 <= month && month <= 9) {
      season = 'Summer';
    } else {
      season = 'Fall';
    }
  }

  // If the release date is before April, consider it as the previous year's Winter season
  const seasonYear = month < 4 ? year - 1 : year;

  if (!month) return year;

  return season ? `${season} ${seasonYear}` : year;
}

// Retrieves the current season.
export function getSeason() {
  // Get the current month and determine the season
  const date = new Date();
  const month = date.getMonth() + 1;
  let season = 'Winter';

  if (month >= 10 && month <= 12) {
    season = 'Fall';
  } else if (month >= 4 && month <= 6) {
    season = 'Spring';
  } else if (month >= 7 && month <= 9) {
    season = 'Summer';
  }

  // Convert the season to uppercase and return it
  return season;
}

// Retrieves the next season based on the current season.
export function getNextSeason() {
  const season = getSeason();

  // Get the next season based on the current season
  if (season === 'Winter') {
    return 'Spring';
  } else if (season === 'Spring') {
    return 'Summer';
  } else if (season === 'Summer') {
    return 'Fall';
  } else {
    return 'Winter';
  }
}

// Calculates the number of days until the next airing episode of an anime.
export const calculateDaysToAiring = anime => {
  const { nextAiringEpisode } = anime;
  const currentDate = moment();
  const airingDateMs = nextAiringEpisode?.airingAt * 1000; // multiply unix timestamp by 1000 to get milliseconds
  const airingDate = moment(airingDateMs);
  const episode = nextAiringEpisode?.episode;

  if (!nextAiringEpisode) {
    return showAiringInfo(anime);
  }

  // Calculate the difference between the dates
  const duration = moment.duration(airingDate.diff(currentDate));

  // Check if the difference is more than 24 hours (1 day)
  if (duration.asHours() >= 24) {
    const daysDiff = Math.floor(duration.asDays());
    if (daysDiff > 30) {
      const formattedDate = airingDate.format('Do MMM YYYY');
      return `Ep ${episode} airing ${formattedDate}`;
    }
    return `Ep ${episode} airing in ${daysDiff} day${daysDiff > 1 ? 's' : ''}`;
  } else if (duration.asHours() >= 1) {
    const hoursDiff = Math.floor(duration.asHours());
    return `Ep ${episode} airing in ${hoursDiff} hour${
      hoursDiff > 1 ? 's' : ''
    }`;
  } else {
    const minutesDiff = Math.floor(duration.asMinutes());
    return `Ep ${episode} airing in ${minutesDiff} min${
      minutesDiff !== 1 ? 's' : ''
    }`;
  }
};

// returns the airing information of an anime
export const showAiringInfo = anime => {
  const { season, seasonYear, episodes } = anime;

  if (!anime.startDate) {
    return 'Coming Soon';
  }

  if (!season || !seasonYear) {
    if (Object.values(anime.startDate).every(value => value !== null))
      return `${getAnimeSeasonYear(anime.startDate)} • ${
        anime.episodes && anime.episodes
      } Eps`;
    else if (anime.startDate.year) {
      return anime.startDate.year;
    } else {
      return 'Coming Soon';
    }
  }

  if (anime.nextAiringEpisode?.airingAt) {
    return calculateDaysToAiring(anime);
  }

  const capitalized = season?.charAt(0) + season?.slice(1).toLowerCase();

  return `${capitalized} ${seasonYear} ${
    episodes ? `• ${episodes} ${episodes > 1 ? 'Eps' : 'Ep'}` : ''
  }`;
};

// generates a url for an anime resource
export const generateUrl = anime => {
  const title = anime.title.english || anime.title.romaji || anime.title.native;

  // Generating a URL-friendly slug for the anime title.
  const slug = slugify(title, {
    lower: true,
    remove: /[$*_+~.()'"!:;@/?]/g,
  });

  return `/anime/${slug}/${anime.id}`;
};

// sanitizes html text
export const sanitize = anime => {
  return {
    __html: DOMPurify.sanitize(anime.description),
  };
};

export const capitalizeWords = str =>
  str
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const parseThemeSlug = slug => {
  const type = slug.startsWith('OP') ? 'OP' : 'ED';
  return `${type} ${slug.slice(2).replace('-', ' ')}`;
};

export const addEntry = async (animeOpts, userState, setAlert) => {
  const { animeId, listType } = animeOpts;
  const { currentUser, setCurrentUser } = userState;

  try {
    const updatedList = await addEntryToList(animeId, listType);
    showAlert('Entry added successfully', setAlert);
    setCurrentUser({ ...currentUser, [listType]: updatedList });
  } catch (err) {
    showAlert('Failed to add entry. Please try later', setAlert, true);
  }
};

export const removeEntry = async (animeOpts, userState, setAlert) => {
  const { animeId, listType } = animeOpts;
  const { currentUser, setCurrentUser } = userState;

  try {
    const updatedList = await removeAnimeFromList(animeId, listType);
    showAlert('Entry removed successfully', setAlert);
    setCurrentUser({ ...currentUser, [listType]: updatedList });
  } catch (err) {
    showAlert('Failed to remove entry. Please try later', setAlert, true);
  }
};
