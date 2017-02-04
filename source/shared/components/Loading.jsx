import React from 'react';

import Style from './loading.css';

const Loading = (props) => {
  return (
    <div className={Style.loading}>
      <h3 className={Style.loading}>
        Cargando Información...
      </h3>
      <i className="fa fa-spinner fa-spin fa-3x"></i>
    </div>
  );
};

export default Loading;
