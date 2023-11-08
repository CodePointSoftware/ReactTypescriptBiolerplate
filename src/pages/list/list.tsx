import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DetailItem } from '../detail/details';
import { IHero } from '../../models/hero/hero';
import './list.scss';
import { getDataStart, getDataSuccess, getDataError } from './listSlice';
import { useAppDispatch } from '../../../src/store/root';
import femalePhoto from '../detail/images/female.png'
import malePhoto from '../detail/images/male.png';
import emptyPhoto from '../detail/images/mark.png';

const PageList: FC = () => {
  const data = useSelector((state: any) => state.list.data);
  const isLoading = useSelector((state: any) => state.list.isLoading)
  const isError = useSelector((state: any) => state.list.error);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDataStart());
    fetch('https://swapi.dev/api/people')
      .then((response) => response.json())
      .then((data) => {
        dispatch(getDataSuccess(data.results));
      })
      .catch((_err) => {
        dispatch(getDataError('Error fetching data'));
      });
  }, [dispatch]);

  const renderHeroes = data?.map((hero: IHero) => (
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
        onclick={() => alert(`Hero detils: ${hero.name}`)} 
        key={''} 
        url={''} 
        femalePhoto={''} 
        malePhoto={''} 
        emptyPhoto={''}
        />
    </div>
  ));

  return (
    <div className="page-list__wrapper">
      <div className="page-list">
        <h1 className="page-list__header">Star Wars Heroes</h1>
        {isLoading && <p className="page-list__loading">Loading...</p>}
        {!isLoading && !isError && (
          <div className="page-list__list">{renderHeroes}</div>
        )}
        {isError && <p className="page-list__error">Error fetching data.</p>}
      </div>
    </div>
  );
};

export { PageList };