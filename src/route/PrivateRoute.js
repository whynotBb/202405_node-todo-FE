import {Navigate} from 'react-router-dom';
const PrivateRoute = ({user, children}) => {
    // private 할게 여러개일 경우를 대비하여 children 으로 사용
    return user ? children : <Navigate to='/login' />;
};
export default PrivateRoute;
