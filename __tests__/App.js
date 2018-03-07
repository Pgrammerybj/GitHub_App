import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Index from "../index";

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  );
});
