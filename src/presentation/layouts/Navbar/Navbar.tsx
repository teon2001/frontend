import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Icon from '@presentation/assets/img/Icon.svg';
import Profile from '@presentation/assets/img/profile.png';
import Dashboard from '@presentation/assets/img/dashboard.svg';
import Transactions from '@presentation/assets/img/transactions.svg';
import Performance from '@presentation/assets/img/performance.svg';
import News from '@presentation/assets/img/news.svg';
import { AppRoute } from 'routes'; // Asigură-te că importul este corect
import './NavBarStyle.scss';
export const Navbar = () => {
  const location = useLocation();

  return (
      <div className="sidebar">
          <div className="logoContainer">
              <img src={Icon} alt="icon" className="logo" />
              <h2 className="title">evergreen.</h2>
          </div>
          <div className="profileContainer">
              <img src={Profile} alt="profile" className="profile" />
              <div className="profileContents">
                  <p className="name">Hello, John👋</p>
                  <p>johnsmith@gmail.com</p>
              </div>
          </div>
          <div className="contentsContainer">
              <ul>
                  <li className={location.pathname === AppRoute.Menu ? "active" : ""}>
                      <img src={Dashboard} alt="dashboard" />
                      <Link to={AppRoute.Menu}>Dashboard</Link>
                  </li>
                  <li className={location.pathname === AppRoute.Menu ? "active" : ""}>
                      <img src={Transactions} alt="transactions" />
                      <Link to={AppRoute.Menu}>Menu</Link>
                  </li>
                  <li className={location.pathname === AppRoute.TopUsers ? "active" : ""}>
                      <img src={Performance} alt="Top Users" />
                      <Link to={AppRoute.TopUsers}>Top Users</Link>
                  </li>
                  <li className={location.pathname === AppRoute.AllAvailableMeals ? "active" : ""}>
                      <img src={News} alt="All Available Meals" />
                      <Link to={AppRoute.AllAvailableMeals}>All Available Meals</Link>
                  </li>
              </ul>
          </div>
      </div>
  );
};