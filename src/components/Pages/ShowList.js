import React, { useState, useEffect } from 'react';
import CreateUser from '../User/CreateUser';
import EditUser from '../User/EditUser';

const List = () => {
  const [data, setData] = useState([]);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const apiUrl = "https://672819d3270bd0b975545f98.mockapi.io/api/vi/users";

  const fetchData = async () => {
    const response = await fetch(apiUrl);
    const result = await response.json();
    setData(result);
  };


  const openCreateModal = () => {
    setCreateOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  const closeModal = () => {
    setCreateOpen(false);
    setEditOpen(false);
    setSelectedUser(null);
  };

  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (confirmDelete) {
      await fetch(`${apiUrl}/${userId}`, { method: 'DELETE' });
      fetchData(); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>회원 관리</h1>
      <button className="btn btn-primary" onClick={openCreateModal}>데이터 추가</button>
      <div className="user-list">
        {data.map((user) => (
          <div key={user.id} className="user-item">
            {`ID: ${user.id}, 이름: ${user.firstName}, 성: ${user.lastName}`}
            <div>
              <button className="btn btn-secondary" onClick={() => openEditModal(user)}>수정</button>
              <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>삭제</button>
            </div>
          </div>
        ))}
      </div>

      {isCreateOpen && <CreateUser onClose={closeModal} onRefresh={fetchData} />}
      {isEditOpen && <EditUser user={selectedUser} onClose={closeModal} onRefresh={fetchData} />}
    </div>
  );
};

export default List;
