import { FC, useEffect, useReducer } from 'react';
import { DetailItem } from '../detail/details';
import { IHero } from '../../models/hero/hero';
import './list.scss';
import { GetData, SetData, SetError, initialState, reducer } from './listReducer';
import femalePhoto from '../detail/images/female.png'
import malePhoto from '../detail/images/male.png';
import emptyPhoto from '../detail/images/mark.png';


const PageList: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getHeroes = async () => {
    try {
      dispatch(GetData());
      const response = await fetch('https://swapi.dev/api/people');
      const data = await response.json();
      dispatch(SetData(data.results));
    } catch (err) {
      dispatch(SetError());
    }
  };

  useEffect(() => {
    getHeroes();
  }, []);

  const renderHeroes = state.data?.map((hero: IHero) => (
    <div className="list-item" key={hero.name}>
      {hero.gender !== 'n/a' && (
      <img
      src={hero.gender === 'female' ? femalePhoto : malePhoto}
      alt={hero.gender === 'female' ? 'Female hero' : 'Male hero'}
      className="gender-image"
      />
      )}
      {hero.gender === 'n/a'  && (
        <img
        src={emptyPhoto}
        alt="Empty photo"
        className="gender-image"
        />
      )}
      
    <DetailItem
        hero={hero}
        onclick={() => alert(`Hero detils: ${hero.name}`)} key={''} url={''} femalePhoto={''} malePhoto={''} emptyPhoto={''}/>
    </div>
  ));

  return (
    <div className="page-list__wrapper">
      <div className="page-list">
        <h1 className="page-list__header">Star Wars Heroes</h1>
        {state.isLoading && <p className="page-list__loading">Loading...</p>}
        {!state.isLoading && <div className="page-list__list">{renderHeroes}</div>}
      </div>
    </div>
  );
};

export { PageList };
