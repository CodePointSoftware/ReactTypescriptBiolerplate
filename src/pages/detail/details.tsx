import { FC, useState } from 'react';
import { IHero } from '../../models/hero/hero';
import '../../pages/list/list.scss';
import './details.scss';
import femalePhoto from './images/female.png';
import malePhoto from './images/male.png';
import emptyPhoto from './images/mark.png';


interface IListItemProps {
  key: string;
  url: string
  hero: IHero;
  onclick: () => void;
  femalePhoto: string;
  malePhoto: string;
  emptyPhoto: string;
}

interface IListItemState {
    detailsVisible: boolean;
    femalePhoto: string;
    malePhoto: string;
    emptyPhoto: string;
}

const DetailItem: FC<IListItemProps> = ({ hero }) => {
  const [state, setState] = useState<IListItemState>({
   detailsVisible: false,
   femalePhoto: 'female.png',
   malePhoto: 'male.png',
   emptyPhoto: 'mark.png',
  });

  const handleDetailsClick = () => {
    setState((prevState) => ({
      ...prevState,
    detailsVisible: !state.detailsVisible,
  }));
};

  const renderDetails = () => {
  const genderClass = hero.gender === 'female' ? 'female' : hero.gender === 'male' ? 'male' : 'n/a';

  if (state.detailsVisible) {
    return (
      <div className={`detail-item ${genderClass}`}>
        <div className="image-container">
          {hero.gender === "female" && (
            <img src={femalePhoto} alt="Female hero image" className="img" />
          )}
          {hero.gender === "male" && (
            <img src={malePhoto} alt="Male hero image" className="img" />
          )}
          {hero.gender === "n/a" && (
            <img src={emptyPhoto} alt="Empty hero image" className="img" />
          )}
        </div>
        <ul className="detail-item--ul">
          <li className={`detail-item--header ${genderClass}`}>Name: {hero.name}</li>
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
    <li  className={'detail-item--li ${genderClass}'} onClick={handleDetailsClick}>
      <h2 className={'detail-item--h2 ${genderClass}'}>
        {hero.gender == 'female' ? <span style={{ color: 'pink'}}> {hero.name}</span> :
         hero.gender === 'male' ? <span style={{ color: 'lightblue' }}>{hero.name}</span> :
         hero.gender === 'n/a' ? <span style={{ color: 'grey'}}>{hero.name}</span> : null}
          </h2>
      {renderDetails()}
    </li>
  );
};

export { DetailItem };