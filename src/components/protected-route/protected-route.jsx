import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ path, exact, children }) => {
  const { isAuth } = useSelector(store => store.user);

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

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default ProtectedRoute;