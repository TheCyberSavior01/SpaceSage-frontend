import React from 'react'
import { useStateValue } from '../provider/StateProvider'
import { Navigate, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

export default function PrivateRoute({children}) {
    const [{user, loading}] = useStateValue();
    const navigate = useNavigate();

    if(loading){
        return <Spinner />
    }

    if(user) {
        return children
    }
  
    return <Navigate to='/sign-in'/>
}
