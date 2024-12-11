import { useState, useEffect } from 'react';
import axios from 'axios';
import api from "../../api.ts";


const UserList = () => {
const [users, setUsers] = useState<{user_id: number, username: string; is_banned: boolean }[]>([]);

  useEffect(() => {
      const fetchUsers = async () => {
          try {
              const response = await api.get(`/api/users/`);
              setUsers(Array.isArray(response.data) ? response.data : []);
              console.log(response.data);
          } catch (error) {
              if (axios.isAxiosError(error) && error.response) {
                  console.error(error.response.data);
              } else {
                  console.error("Error fetching users", error);
              }
          }
      };

      fetchUsers()
  }, []);

  const banUser = (user_id: number) => async () => {
    try {
        await api.post(`api/users/ban/${user_id}/`);
        setUsers(users.map(user => {
            if (user.user_id === user_id) {
                return {
                    ...user,
                    is_banned: !user.is_banned
                };
            }
            return user;
        }));
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error(error.response.data);
        } else {
            console.error("Error banning user", error);
        }
    }
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
            <li key={user.user_id}>{user.username} - {user.is_banned ? "Banned" : "Active"}
                <button onClick={banUser(user.user_id)}>
                    {user.is_banned ?
                        "Unban"
                        :
                        "Ban"
                    }
                </button>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
