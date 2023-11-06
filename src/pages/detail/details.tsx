import { FC, useState } from 'react';
import { IHero } from '../../models/hero/hero';
import '../../pages/list/list.scss';
import './details.scss';

interface IListItemProps {
  key: string;
  url: string
  hero: IHero;
  onclick: () => void;
}

interface IListItemState {
    detailsVisible: boolean;
}

const DetailItem: FC<IListItemProps> = ({ hero }) => {
  const [state, setState] = useState<IListItemState>({
   detailsVisible: false, 
  });

  const handleDetailsClick = () => {
    setState({
    detailsVisible: !state.detailsVisible,
  });
};

  const renderDetails = () => {
    if (state.detailsVisible) {
    return (
      <div className="detail-item">
      <ul className="detail-item--ul">
        <li className="detail-item--header">Name: {hero.name}</li>
        <li>Height: {hero.height}</li>
        <li>Mass: {hero.mass}</li>
        <li>Hair color: {hero.hair_color}</li>
        <li>Skin color: {hero.skin_color}</li>
        <li>Eye color: {hero.eye_color}</li>
        <li>Birth year: {hero.birth_year}</li>
        <li>Gender: {hero.gender}</li>
      </ul>
      </div>
    );
  }
};

  return (
    <li  className="detail-item--li" onClick={handleDetailsClick}>
      <h2 className="detail-item--h2">{hero.name}</h2>
      {renderDetails()}
    </li>
  );
};

export { DetailItem };
