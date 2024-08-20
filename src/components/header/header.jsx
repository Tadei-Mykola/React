
import './header.scss';
import { LocalStorageService } from "@services"
import { useUser } from '@hooks'

const localStorageService = new LocalStorageService()
export function Header() {
  const { user, setUser } = useUser()

  const exit = () => {
    localStorageService.removeUser();
    setUser();
  }

  const userActions = [{name: 'exit', action: exit}]
  return (
    <div className="header">
      { user ?
        <div className="user-info">
          <h1 className='user-name'>{user?.username}</h1>
          <div className="dropdown">
            <ul>
              {
                userActions.map((action, index) =>
                     <li onClick={action.action} key={index}>{action.name}</li>
                )
              }
            </ul>
          </div>
      </div>
        :
          <h1>Ви не увійшли в акаунт</h1>
      }
    </div>
  );
}

