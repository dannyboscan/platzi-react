import React from 'react';
import { FormattedMessage } from 'react-intl';

import Style from './loading.css';

function Loading() {
  return (
    <div className={Style.loading}>
      <h3 className={Style.loading}>
        <FormattedMessage id="loading" />
      </h3>
      <i className="fa fa-spinner fa-spin fa-3x" />
    </div>
  );
}

export default Loading;
