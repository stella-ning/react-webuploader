jest.unmock('../src/Components/Card.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Card from '../src/Components/Card.jsx';

describe('Card', () => {
    it('A card rendered correctly', () => {
        const card = TestUtils.renderIntoDocument(<Card />);
        const cardNode = ReactDOM.findDOMNode(card);
        expect(cardNode.textContent).toEqual('This is Card');
    });
})
