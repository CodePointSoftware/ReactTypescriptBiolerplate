import { FC, useEffect, useReducer, useState } from 'react';
import { ListItem } from '../../components/listItem/listItem';
import { IHero } from '../../models/hero/hero';
import './list.scss';
import { GetData, SetData, SetError, initialState, reducer } from './listReducer';
import femalePhoto from '../detail/images/female.png'
import malePhoto from '../detail/images/male.png';
import emptyPhoto from '../detail/images/mark.png';

export const OpenModal = (hero: IHero) => ({
  type: 'OPEN_MODAL',
  payload: hero,
});

const PageList: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedHero, setSelectedHero] = useState<IHero | null>(null); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [, setNextPage] = useState<string | null>(null);

  const getHeroes = async (page: number) => {
    try {
      dispatch(GetData());
      const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
      const data = await response.json();
      dispatch(SetData(data.results));
      setTotalPages(Math.ceil(data.count / itemsPerPage));
      setNextPage(data.next);
    } catch (err) {
      dispatch(SetError());
    }
  };

  useEffect(() => {
    getHeroes(currentPage);
  }, [currentPage]);

  const openModal = (hero: IHero) => {
    console.log('Opening modal for:', hero);
    if (!selectedHero) {
      setSelectedHero(hero);
    }
  };

const closeModal = () => {
  setSelectedHero(null);
};

  const renderHeroes = state.data?.map((hero: IHero) => (
    <div className="list-item" key={hero.name}>
      <div className="hero-image--container" style={{ backgroundColor: hero.gender === 'female' ? 'pink' : hero.gender == 'male' ? 'lightblue' : 'lightgray'}}></div>
      {hero.gender !== 'n/a' && hero.gender !== 'hermaphrodite' && hero.gender !== 'none' && (
      <img
      src={hero.gender === 'female' ? femalePhoto : malePhoto}
      alt={hero.gender === 'female' ? 'Female hero' : 'Male hero'}
      className="gender-image"
      />
      )}
      {(hero.gender === 'n/a' || hero.gender === 'hermaphrodite' || hero.gender === 'none') && (
        <img
        src={emptyPhoto}
        alt="Empty photo"
        className="gender-image"
        />
      )}
    <ListItem 
      key={hero.name} 
      url="https://swapi.dev/api/people/1/" 
      hero={hero} 
      openModal={() => openModal(hero)} />  
      </div>
  ));
  
  return (
    <div className="page-list__wrapper">
      <div className="page-list">
        <h1 className="page-list__header">Star Wars Heroes</h1>
        {state.isLoading && <p className="page-list__loading">Loading...</p>}
        {!state.isLoading && (
          <div>
            <div className="page-list__list">{renderHeroes}</div>
            <div className="page-list__buttons">
              <button onClick={() => setCurrentPage(currentPage -1)} disabled={currentPage === 1}>
              Previous
              </button>
              <span>{`Page ${currentPage} of ${totalPages || ''}`}</span>
              <button onClick={() => setCurrentPage(currentPage +1)} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
        )}
        {selectedHero && (
          <div>
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
              &times;
              </span>
              <div className="modal-content__wrapper">
                <div className="modal-content__image-container">
                  {selectedHero.gender === "female" ? (
                    <img src={femalePhoto} alt="Female hero image" className="img" />
                  ) : selectedHero.gender === "male" ? (
                    <img src={malePhoto} alt="Male hero image" className="img" />
                  ) : (
                    <img src={emptyPhoto} alt="Empty hero image" className="img-empty" />
          )}
          </div>
          <div className="modal-conent__details">
              <h2 className="modal-content__heading">{selectedHero.name}</h2>
              <p className="modal-content__details">Gender: {selectedHero.gender}</p>
              <p className="modal-content__details">Birth year: {selectedHero.birth_year}</p>
              <p className="modal-content__details">Hair color: {selectedHero.hair_color}</p>
              <p className="modal-content__details">Skin color: {selectedHero.skin_color}</p>
              <p className="modal-content__details">Eye color: {selectedHero.eye_color}</p>
              <p className="modal-content__details">Mass: {selectedHero.mass}</p>
              <p className="modal-content__details">Height: {selectedHero.height}</p>
              </div>
              </div>
              </div>
              </div>
              </div>
        )}
      </div>
    </div>
  );
};

export { PageList };