import * as React from 'react';
import { mount } from 'enzyme';

import App from '../App';

describe('APP', () => {
    let component;
    beforeEach(() => {
        component = mount(<App />);
    });

    it('renders the heading', () => {
        expect(component).toMatchSnapshot();
    });

    it('increments counter properly', () => {
        expect(component.find('.counter').text()).toEqual('0')
        component.find('button').at(0).simulate('click');
        expect(component.find('.counter').text()).toEqual('1')
    });

    it('decrements counter properly', () => {
        expect(component.find('.counter').text()).toEqual('0')
        component.find('button').at(1).simulate('click');
        expect(component.find('.counter').text()).toEqual('-1')
    })
});
