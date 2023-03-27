import React, { useEffect } from 'react';
import '../styles/tables.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminUsers } from '../redux/actions/admin';

const Users = () => {

    const dispatch = useDispatch();

    const { users } = useSelector((state) => state.admin);
  
    useEffect(() => {
      dispatch(getAdminUsers());
    }, [dispatch]);
  
  return (
    <section  className='tableClass'>
    { users !== undefined &&
      (<main>
        <table>
            <thead>
                <tr>
                    <th>User Id</th>
                    <th>Name</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
            {users &&
                users.map((i) => (
                  <tr key={i._id}>
                    <td>#{i._id}</td>
                    <td>{i.name}</td>
                    <td>{i.role}</td>
                  </tr>
                ))}
            </tbody>
        </table>
    </main>)
    }
</section>
  )
}

export default Users;
