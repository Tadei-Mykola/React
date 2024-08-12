
import { useEffect, useState } from 'react';
import './header.scss';
import { LocalStorageService } from "@services"
import { useNavigate } from 'react-router-dom';
import { useUser } from '@hooks'

const localStorageService = new LocalStorageService()
export function Header() {
  const { user, setUser } = useUser()
  const [redirectTo, setRedirectTo] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorageService.getUserData();
    if (userData) {
      setRedirectTo('/todo');
      setUser(userData);
    } else {
      setRedirectTo('/user/login');
    }
  }, []);

  useEffect(() => {
    if (redirectTo) {
      navigate(redirectTo);
    }
  }, [redirectTo]);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const exit = () => {
    localStorageService.removeUser();
    setUser();
    setRedirectTo('/user/login');
  }

  const userActions = [{name: 'exit', action: exit}]
  return (
    <div className="header">
      { user ?
        <div 
        className="user-info"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1>{user?.username}</h1>
        {isDropdownOpen && (
          <div className="dropdown">
            <ul>
              {
                userActions.map((action, index) =>
                     <li onClick={action.action} key={index}>{action.name}</li>
                )
              }
            </ul>
          </div>
        )}
      </div>
        :
          <h1>Ви не увійшли в акаунт</h1>
      }
    </div>
  );
}

