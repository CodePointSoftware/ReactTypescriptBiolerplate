import { FC } from 'react';
import { IHero } from '../../models/hero/hero';

import './listItem.scss';
interface IListItemProps {
  url: string;
  hero: IHero;
}
const ListItem: FC<IListItemProps> = ({ hero }) => {
  return <div className="list-item">{hero.name}</div>;
};

export { ListItem };
