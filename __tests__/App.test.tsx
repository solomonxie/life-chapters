/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';
import { createMemoryRepository } from '../src/data/memory';

jest.mock('../src/data/sqlite', () => ({ createSqliteRepository: jest.fn() }));

test('renders first run on an empty plan', async () => {
  let tree: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(async () => {
    tree = ReactTestRenderer.create(<App repository={createMemoryRepository()} />);
  });
  await ReactTestRenderer.act(async () => {});
  expect(JSON.stringify(tree!.toJSON())).toContain('When were you born?');
  await ReactTestRenderer.act(async () => tree!.unmount());
});
