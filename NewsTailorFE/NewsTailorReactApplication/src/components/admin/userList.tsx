import { useState, useEffect } from 'react';
import axios from 'axios';
import api from "../../api.ts";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
      const fetchUsers = async () => {
          try {
              const response = await api.get(`/api/users/`);
              setUsers(response.data);
          } catch (error) {
              if (axios.isAxiosError(error) && error.response) {
                  console.error(error.response.data);
              } else {
                  console.error("Error fetching users", error);
              }
          }
      };

      fetchUsers()
  }, [users]);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
