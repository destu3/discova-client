import fields from './graphql/fields';
import { getYear, getNextSeason, getSeason } from '../../helpers/anime-utils';
import { handleResponse } from '../../helpers/api-utils';

const BASE_URL = 'https://graphql.anilist.co';

// Helper function to fetch media array with given GraphQL query
export const getMediaArray = async query => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        page: 1,
        perPage: 20,
      },
    }),
  });

  const data = await handleResponse(response);
  const pageInfo = data.data.Page.pageInfo;
  const mediaArray = data.data.Page.media;

  // Throw error if request was successful but an empty media array is returned
  if (mediaArray.length === 0) {
    throw new Error('No results found. Please try again later');
  }

  return { mediaArray, pageInfo };
};

// Function to fetch popular anime for current season
export const getPopularThisSeason = async () => {
  const season = getSeason();
  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
        }
        media(type: ANIME, season: ${season}, seasonYear: ${getYear()}, sort: POPULARITY_DESC, isAdult: false) {
          ${fields}
        }
      }
    }
  `;

  // Call getMediaArray with query and return media array
  const { mediaArray } = await getMediaArray(query);
  return mediaArray;
};

// Function to fetch trending anime
export const getTrending = async () => {
  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
        }
        media(type: ANIME, sort: TRENDING_DESC, isAdult: false) {
          ${fields}
        }
      }
    }
  `;

  // Call getMediaArray with query and return media array
  const { mediaArray } = await getMediaArray(query);
  return mediaArray;
};

// Function to fetch upcoming anime for next season
export const getUpcoming = async () => {
  const nextSeason = getNextSeason();
  const year = getYear();

  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
        }
        media(type: ANIME, status: NOT_YET_RELEASED, season: ${nextSeason}, seasonYear: ${year}, sort: POPULARITY_DESC, isAdult: false) {
          ${fields}
        }
      }
    }
  `;

  // Call getMediaArray with query and return media array
  const { mediaArray } = await getMediaArray(query);
  return mediaArray;
};

// Function to fetch popular anime
export const getPopular = async () => {
  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
        }
        media(type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
          ${fields}
        }
      }
    }
  `;

  const { mediaArray } = await getMediaArray(query);
  return mediaArray;
};
