import { useContext } from 'react';
import ActionButton from '../action-button/action-button';
import { UserContext } from '../../contexts/user.context';
import { AlertContext } from '../../contexts/alert.context';
import { addEntryToList, removeAnimeFromList } from '../../services/api/user';
import { showAlert } from '../../utils/alert-utils';
import './action-buttons.component.css';

const buttonConfig = (addToList, removeFromList) => ({
  unauth: [],
  auth_not_in_wl_or_fav: [
    {
      handler: addToList,
      title: 'Add to list',
      iconClassName: 'fa-solid text-lg fa-plus',
      listTarget: 'watchList',
    },
    {
      handler: addToList,
      title: 'Add to favourites',
      iconClassName: 'fa-regular text-lg fa-thumbs-up',
      listTarget: 'favourites',
    },
  ],
  auth_in_wl_and_fav: [
    {
      handler: removeFromList,
      title: 'Remove from list',
      iconClassName: 'text-lg fa-solid fa-xmark',
      listTarget: 'watchList',
    },
    {
      handler: removeFromList,
      title: 'Remove from favourites',
      iconClassName: 'text-lg fa-regular fa-thumbs-down',
      listTarget: 'favourites',
    },
  ],
  auth_in_wl_not_in_fav: [
    {
      handler: removeFromList,
      title: 'Remove from list',
      iconClassName: 'text-lg fa-solid fa-xmark',
      listTarget: 'watchList',
    },
    {
      handler: addToList,
      title: 'Add to favourites',
      iconClassName: 'fa-regular text-lg fa-thumbs-up',
      listTarget: 'favourites',
    },
  ],
  auth_in_fav_not_in_wl: [
    {
      handler: removeFromList,
      title: 'Remove from list',
      iconClassName: 'text-lg fa-solid fa-xmark',
      listTarget: 'watchList',
    },
    {
      handler: removeFromList,
      title: 'Remove from favourites',
      iconClassName: 'text-lg fa-regular fa-thumbs-down',
      listTarget: 'favourites',
    },
  ],
});

const ActionButtons = ({ animeId }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);

  const addToList = async listType => {
    try {
      const updatedList = await addEntryToList(animeId, listType);
      showAlert('Entry added successfully', setAlert);
      setCurrentUser({ ...currentUser, [listType]: updatedList });
    } catch (err) {
      showAlert('Failed to add entry. Please try later', setAlert, true);
    }
  };

  const removeFromList = async listType => {
    try {
      const updatedList = await removeAnimeFromList(animeId, listType);
      showAlert('Entry removed successfully', setAlert);
      setCurrentUser({ ...currentUser, [listType]: updatedList });
    } catch (err) {
      showAlert('Failed to remove entry. Please try later', setAlert, true);
    }
  };

  const determineRenderOutput = () => {
    if (!currentUser) {
      return null;
    }

    const isInWatchlist = currentUser.watchList.includes(animeId);
    const isInFavorites = currentUser.favourites.includes(animeId);

    const renderOpt =
      isInWatchlist && isInFavorites
        ? 'auth_in_wl_and_fav'
        : isInWatchlist && !isInFavorites
        ? 'auth_in_wl_not_in_fav'
        : !isInWatchlist && isInFavorites
        ? 'auth_in_fav_not_in_wl'
        : 'auth_not_in_wl_or_fav';

    const buttons = buttonConfig(addToList, removeFromList)[renderOpt];

    return buttons.map(button => (
      <ActionButton
        listTarget={button.listTarget}
        key={button.iconClassName}
        handler={button.handler}
        title={button.title}
        iconClassName={button.iconClassName}
      />
    ));
  };

  return (
    <div className="action-btns absolute top-0 right-0 pt-2 pr-2">
      {determineRenderOutput()}
    </div>
  );
};

export default ActionButtons;
