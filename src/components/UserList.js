import React, { useState } from 'react';
import './style/userList.css';

const UserList = ({ recentUsers, handleUserClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = recentUsers.filter((user) =>
      user.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="user-list-container">
      <h2>Recent Chats</h2>
      <div className="search-container">
        <input type="text" placeholder="Search for users..." value={searchQuery} onChange={handleSearch} />
      </div>
      <ul className="user-list">
        {
          filteredUsers ? (
            <>
              {filteredUsers.map((user) => (
                <li key={user} onClick={() => handleUserClick(user)}>
                  <div className="user-avatar">{user.charAt(0)}</div>
                  <div className="user-details">
                    <div className="user-name">{user}</div>
                    <div className="user-last-message">{/*user.lastMessage*/ '...'}</div>
                  </div>
                </li>
              ))}
            </>
          ) : (
            <div className="error">No friends found</div>
          )
        }
      </ul>
    </div>
  );
};

export default UserList;
