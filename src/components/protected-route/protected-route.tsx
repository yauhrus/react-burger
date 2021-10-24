import { FC, ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/types';

interface IProtectedRouteProps {
  path: string;
  exact?: boolean;
  children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ path, exact, children }) => {
  const { isAuth } = useSelector((store: RootState) => store.user);

  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) => isAuth ? ( children ) 
      : (
          <Redirect to={{
            pathname: "/login",
            state: {
              from: location
            }
          }}/>
        )
      }
    />
  );
}

export default ProtectedRoute;