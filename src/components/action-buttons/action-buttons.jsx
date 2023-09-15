import { useContext } from 'react';
import ActionButton from '../action-button/action-button';
import { useListStatus, cardButtonsConfig } from '../../hooks/useListStatus';
import { UserContext } from '../../contexts/user.context';
import { AlertContext } from '../../contexts/alert.context';
import { addEntry, removeEntry } from '../../utils/anime-utils';
import './action-buttons.component.css';

const ActionButtons = ({ animeId }) => {
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

  const determineRenderOutput = () => {
    if (!renderOpt) {
      return;
    }

    const buttons = cardButtonsConfig(addToList, removeFromList)[renderOpt];

    return buttons.map(button => (
      <ActionButton
        cardBtn={true}
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
