import React, { StrictMode } from 'react';
import { LocaleProvider } from 'antd-mobile';
import en_US from 'antd-mobile/lib/locale-provider/en_US'; // 英文

import RouterComponent from './router';

const Local = () => (
  <LocaleProvider locale={en_US}>
    <StrictMode>
      <RouterComponent />
    </StrictMode>
  </LocaleProvider>
);

export default Local;
