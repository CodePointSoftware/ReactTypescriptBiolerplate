import { FC, useEffect, useReducer } from 'react';
import { DetailItem } from '../detail/details';
import { ListItem } from '../../components/listItem/listItem';
import { IHero } from '../../models/hero/hero';
import './list.scss';
import { GetData, SetData, SetError, initialState, reducer } from './listReducer';

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
    <DetailItem
    hero={hero}
    onclick={() => alert(`Detale bohatera: ${hero.name}`)}
    />
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
