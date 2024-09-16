import React from 'react';
import { useNavigate } from 'react-router-dom';

import './page404.scss';

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="container" data-testid="not-found-page-wrapper">
      <div className="gif">
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>
      <div className="content">
        <h1 className="main-heading" data-testid="not-found-page">The page you have requested is not found</h1>
        <button onClick={() => navigate('/')}>Back to home <i className="far fa-hand-point-right"></i></button>
      </div>
    </div>
  )
}

export default Page404;
