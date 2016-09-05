jest.unmock('../src/Components/WebUploader.jsx');
jest.mock('react/lib/ReactDefaultInjection');

import React from 'react';
import ReactDOM from 'react-dom';
// import TestUtils from 'react-addons-test-utils';
import renderer from 'react-test-renderer';
import Card from '../src/Components/WebUploader.jsx';

describe('Card', () => {
    it('List', () => {
        const list = [{status: 'wu-upload-success', percent: null},{status: 'wu-upload-success', percent: null}];
        const component = renderer.create(
            <WebUploader uploaderConfig={{server: 'http://localhost/test.php/Home/Index/upload', pick: '#pick', auto: true}} styleConfig={{type: 'square', width: 240}}/>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
