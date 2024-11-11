import React, { useState } from 'react';
import CreateUser from '../User/CreateUser';
import EditUser from '../User/EditUser';

const List = () => {
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [inputId, setInputId] = useState('');

  const apiUrl = "https://672819d3270bd0b975545f98.mockapi.io/api/vi/users";

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("데이터 로드 실패");
      const result = await response.json();
      setData(result);
      setIsDataLoaded(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleIdChange = (e) => {
    setInputId(e.target.value);
  };

  const openCreateModal = () => {
    setCreateOpen(true);
  };

  const openEditModal = async () => {
    if (!inputId) {
      alert("ID 입력하기");
      return;
    }

    const user = data.find((user) => user.id === inputId);
    if (!user) {
      alert("해당 ID의 사용자가 존재하지 않음");
      return;
    }

    setSelectedUser(user);
    setEditOpen(true);
  };

  const closeModal = () => {
    setCreateOpen(false);
    setEditOpen(false);
    setSelectedUser(null);
  };

  const deleteUser = async () => {
    if (!inputId) {
      alert("ID 입력하기");
      return;
    }

    const user = data.find((user) => user.id === inputId);
    if (!user) {
      alert("해당 ID의 사용자가 존재하지 않음");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/${inputId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error("삭제 실패");
      alert("삭제 성공");
      fetchData();
      setInputId('');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <h1>회원 관리</h1>
      <button className="btn btn-outline-dark" onClick={fetchData}>회원 목록 로드</button>
      <br /><br />
      <label>수정/삭제 할 ID:</label>
      <input type="text" value={inputId} onChange={handleIdChange} className="form-control mb-3" />
      <div className="btn-group">
        <button className="btn btn-primary" onClick={openCreateModal}>데이터 추가</button>
        <button className="btn btn-secondary" onClick={openEditModal}>데이터 수정</button>
        <button className="btn btn-outline-dark" onClick={deleteUser}>데이터 삭제</button>
      </div>
      <br /><br />
      <h2>회원 목록</h2>
      {isDataLoaded ? (
        <div id="data-list">
          {data.map((user) => (
            <div key={user.id}>
              {`ID: ${user.id}, 이름: ${user.firstName}, 성: ${user.lastName}, 생년월일: ${user.birthDate}, 성별: ${user.gender}, 국적: ${user.nationality}`}
            </div>
          ))}
        </div>
      ) : (
        <p>데이터가 로드 안됨.</p>
      )}
      {isCreateOpen && <CreateUser onClose={closeModal} onRefresh={fetchData} />}
      {isEditOpen && <EditUser user={selectedUser} onClose={closeModal} onRefresh={fetchData} />}
    </div>
  );
};

export default List;
