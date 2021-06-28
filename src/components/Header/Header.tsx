import React, { useContext, useState } from 'react';
import style from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import { MdMenu } from 'react-icons/md';

const Header: React.FunctionComponent = () => {
  const { user } = useContext(UserContext);

  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <header className={`${expanded ? style.expanded : ''} ${style.header}`}>
      <button onClick={() => setExpanded(!expanded)} title={expanded ? 'close menu' : 'open menu'}>
        <MdMenu />
      </button>
      <nav>
        {user && (
          <>
            <NavLink exact to="/home" onClick={() => setExpanded(false)}>
              Home
            </NavLink>
            <NavLink to="/conversion" onClick={() => setExpanded(false)}>
              Convert
            </NavLink>
          </>
        )}

        <NavLink to="/profile" onClick={() => setExpanded(false)}>
          {user ? user.displayName : 'Sign in'}
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
