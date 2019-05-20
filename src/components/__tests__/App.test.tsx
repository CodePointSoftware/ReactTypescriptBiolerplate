import * as React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

it('renders the heading', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
});
