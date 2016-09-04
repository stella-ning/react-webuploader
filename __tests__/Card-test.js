jest.unmock('../src/Components/Card.jsx');
jest.mock('react/lib/ReactDefaultInjection');

import React from 'react';
import ReactDOM from 'react-dom';
// import TestUtils from 'react-addons-test-utils';
import renderer from 'react-test-renderer';
import Card from '../src/Components/Card.jsx';

describe('Card', () => {
    it('List', () => {
        const list = [{status: 'wu-upload-success', percent: null},{status: 'wu-upload-success', percent: null}];
        const component = renderer.create(
            <Card status={""} percent={null}>
                <span onClick={() => {}}>Add new</span>
            </Card>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
