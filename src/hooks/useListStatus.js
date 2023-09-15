import { useContext } from 'react';
import { UserContext } from '../contexts/user.context';

export const useListStatus = animeId => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) return null;

  const isInWatchlist = currentUser.watchList.includes(animeId);
  const isInFavorites = currentUser.favourites.includes(animeId);

  let renderOpt;
  switch (true) {
    case isInWatchlist && isInFavorites:
      renderOpt = 'auth_in_wl_and_fav';
      break;
    case isInWatchlist && !isInFavorites:
      renderOpt = 'auth_in_wl_not_in_fav';
      break;
    case !isInWatchlist && isInFavorites:
      renderOpt = 'auth_in_fav_not_in_wl';
      break;
    default:
      renderOpt = 'auth_not_in_wl_or_fav';
  }

  return renderOpt;
};

export const cardButtonsConfig = (addToList, removeFromList) => ({
  unauth: [],
  auth_not_in_wl_or_fav: [
    {
      handler: addToList,
      title: 'Add to list',
      iconClassName: 'fa-solid fa-plus',
      listTarget: 'watchList',
    },
    {
      handler: addToList,
      title: 'Add to favourites',
      iconClassName: 'fa-regular fa-thumbs-up',
      listTarget: 'favourites',
    },
  ],
  auth_in_wl_and_fav: [
    {
      handler: removeFromList,
      title: 'Remove from list',
      iconClassName: 'fa-solid fa-xmark',
      listTarget: 'watchList',
    },
    {
      handler: removeFromList,
      title: 'Remove from favourites',
      iconClassName: 'fa-regular fa-thumbs-down',
      listTarget: 'favourites',
    },
  ],
  auth_in_wl_not_in_fav: [
    {
      handler: removeFromList,
      title: 'Remove from list',
      iconClassName: 'fa-solid fa-xmark',
      listTarget: 'watchList',
    },
    {
      handler: addToList,
      title: 'Add to favourites',
      iconClassName: 'fa-regular fa-thumbs-up',
      listTarget: 'favourites',
    },
  ],
  auth_in_fav_not_in_wl: [
    {
      handler: addToList,
      title: 'Add to list',
      iconClassName: 'fa-solid fa-plus',
      listTarget: 'watchList',
    },
    {
      handler: removeFromList,
      title: 'Remove from favourites',
      iconClassName: 'fa-regular fa-thumbs-down',
      listTarget: 'favourites',
    },
  ],
});
