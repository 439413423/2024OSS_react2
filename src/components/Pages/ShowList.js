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

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => setCreateOpen(true);
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

  return (
    <div className="container">
      <h1>회원 관리</h1>
      <button className="btn btn-outline-dark" onClick={fetchData}>회원 목록 로드</button>
      <br /><br />
      <label>수정/삭제 할 ID:</label>
      <input type="text" id="id" className="form-control mb-3" />
      <div className="btn-group">
        <button className="btn btn-primary" onClick={openCreateModal}>데이터 추가</button>
        <button className="btn btn-secondary" onClick={() => selectedUser && openEditModal(selectedUser)}>데이터 수정</button>
        <button className="btn btn-outline-dark" onClick={() => selectedUser && deleteUser(selectedUser.id)}>데이터 삭제</button>
      </div>
      <br /><br />
      <h2>회원 목록</h2>
      <div id="data-list">
        {data.map((user) => (
          <div key={user.id}>
            {`ID: ${user.id}, 이름: ${user.firstName}, 성: ${user.lastName}, 생년월일: ${user.birthDate}, 성별: ${user.gender}, 국적: ${user.nationality}`}
            <button className="btn btn-link" onClick={() => openEditModal(user)}>수정</button>
            <button className="btn btn-link text-danger" onClick={() => deleteUser(user.id)}>삭제</button>
          </div>
        ))}
      </div>
      {isCreateOpen && <CreateUser onClose={closeModal} onRefresh={fetchData} />}
      {isEditOpen && <EditUser user={selectedUser} onClose={closeModal} onRefresh={fetchData} />}
    </div>
  );
};

export default List;
