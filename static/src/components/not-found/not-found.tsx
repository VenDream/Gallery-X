/**
 * 全局404页面
 * @author VenDream
 * @since 2018-8-20
 */

import React, { SFC } from 'react';
import './not-found.less';

const NotFound: SFC<{}> = () => {
  return (
    <div className="page not-found">
      <p>┑(￣Д ￣)┍这里是火星，什么都没有呢</p>
    </div>
  );
};

export default NotFound;
