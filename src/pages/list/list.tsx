import { FC, useEffect, useState } from 'react';
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
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);

  const fetchHeroesData = async (url: string) => {
    try {
      dispatch(getDataStart());
      const response = await fetch(url);
      const responseData = await response.json();
      dispatch(getDataSuccess(responseData.results));
      setNextPageUrl(responseData.next);
      setPrevPageUrl(responseData.previous);
    } catch (error) {
      dispatch(getDataError('Error fetching data'));
    }
  };

  const renderButtons = () => {
    return (
      <div className="page-list__buttons">
        {isLoading && <p className="page-list__loading">Loading...</p>}
        {!isLoading && (
           <>
           <div className="page-list__buttons"></div>
           <button onClick={handlePrevPage} disabled={!prevPageUrl}>
            Previous Page
          </button><button onClick={handleNextPage} disabled={!nextPageUrl}>
              Next Page
            </button></>
        )}
      </div>
    );
  };

  useEffect(() => {
    fetchHeroesData('https://swapi.dev/api/people');
  }, []);

  const handleNextPage = () => {
    if (nextPageUrl) {
      fetchHeroesData(nextPageUrl);
    }
  };

  const handlePrevPage = () => {
    if (prevPageUrl) {
      fetchHeroesData(prevPageUrl);
    }
  };

  const renderHeroes = data?.map((hero: IHero) => (
    <div className="list-item" key={hero.name}>
      <div className="hero-image--container" style={{ backgroundColor: hero.gender === 'female' ? 'pink' : hero.gender == 'male' ? 'lightblue' : 'lightgray'}}></div>
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
        {!isLoading && !isError && (
          <div className="page-list__list">{renderHeroes}</div>
        )}
        {isError && <p className="page-list__error">Error fetching data.</p>}
        {renderButtons()}
      </div>
    </div>
  );
};

export { PageList };