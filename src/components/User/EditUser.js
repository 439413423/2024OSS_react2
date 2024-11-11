import React, { useState, useEffect } from 'react';

const EditUser = ({ user, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '남',
    nationality: '내국인',
  });

  const apiUrl = `https://672819d3270bd0b975545f98.mockapi.io/api/vi/users/${user.id}`;

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch(apiUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    onRefresh();
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">데이터 수정</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="이름"
              className="form-control mb-2"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="성"
              className="form-control mb-2"
            />
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <select name="gender" value={formData.gender} onChange={handleChange} className="form-control mb-2">
              <option value="남">남</option>
              <option value="여">여</option>
            </select>
            <select name="nationality" value={formData.nationality} onChange={handleChange} className="form-control mb-2">
              <option value="내국인">내국인</option>
              <option value="외국인">외국인</option>
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>닫기</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>저장하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
