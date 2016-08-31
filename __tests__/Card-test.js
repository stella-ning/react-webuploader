jest.unmock('../src/Components/Card.jsx');
jest.mock('react/lib/ReactDefaultInjection');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import renderer from 'react-test-renderer';
import Card from '../src/Components/Card.jsx';

describe('Card', () => {
    it('A card rendered correctly', () => {
        const card = TestUtils.renderIntoDocument(<Card />);
        const cardNode = ReactDOM.findDOMNode(card);
        expect(cardNode).not.toEqual(null);
    });
    it('take Snapshot', () => {
        const component = renderer.create(
            <Card title="A simple title" status={'wu-upload-progress'} percent={10}>
                <p>here is content</p>
                <p>here is content</p>
                <p>here is content</p>
            </Card>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
