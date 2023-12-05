// import { FC } from 'react';
import React from 'react';
import { IHero } from '../../models/hero/hero';
import './listItem.scss';
interface IListItemProps {
  key: string;
  url: string;
  hero: IHero;
  openModal: () => void;
}

 const ListItem: React.FC<IListItemProps> = ({ key, hero, openModal }) => {
  return (
    <div key={key} className="list-item" onClick={openModal}>
      <h3 className="list-item__name">{hero.name}</h3>
    </div>
  );
};

export { ListItem };
