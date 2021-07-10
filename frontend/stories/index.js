import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { storiesOf } from '@storybook/react';

import i18n from '../src/scripts/libs/i18n';
import App from '../src/scripts/components/App';
import '../src/styles/style.css';

const i18nDecorator = storyFn => (
  <I18nextProvider i18n={i18n}>{storyFn()}</I18nextProvider>
);

storiesOf('React Dmarc Sift', module)
  .addDecorator(i18nDecorator)
  .add('App', () => <App />);