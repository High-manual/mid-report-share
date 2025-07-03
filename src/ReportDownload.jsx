import React, { useState } from "react";
import './ReportDownload.css';

// 환경변수에서 수강생 정보 읽어오기
const getStudentsFromEnv = () => {
  try {
    const studentsEnv = process.env.REACT_APP_STUDENTS;
    return studentsEnv ? JSON.parse(studentsEnv) : [];
  } catch (error) {
    console.error('수강생 정보를 읽는 중 오류가 발생했습니다:', error);
    return [];
  }
};

// 환경변수에서 이메일 매핑 정보 읽어오기
const getEmailMapFromEnv = () => {
  try {
    const emailMapEnv = process.env.REACT_APP_EMAIL_MAP;
    return emailMapEnv ? JSON.parse(emailMapEnv) : {};
  } catch (error) {
    console.error('이메일 매핑 정보를 읽는 중 오류가 발생했습니다:', error);
    return {};
  }
};

const students = getStudentsFromEnv();
const emailMap = getEmailMapFromEnv();

function getFileName(name) {
  return name.replace(/\s/g, "_");
}

const SERVER_URL = "http://localhost:8000"; // 도커 환경에서 백엔드 서비스 이름으로 변경

const ReportDownload = () => {
  // 각 학생별 이메일 입력 상태 관리
  const [emails, setEmails] = useState({});

  // 환경변수 설정 확인
  if (students.length === 0) {
    return (
      <div className="report-container">
        <h2 className="report-title">환경변수 설정 필요</h2>
        <p>`.env` 파일을 생성하고 수강생 정보를 설정해주세요.</p>
        <p>자세한 설정 방법은 `SETUP.md` 파일을 참고하세요.</p>
      </div>
    );
  }

  const handleEmailChange = (name, value) => {
    setEmails((prev) => ({ ...prev, [name]: value }));
  };

  const handleDownload = (studentName) => {
    const inputEmail = emails[studentName] || "";
    const correctEmail = emailMap[studentName] || "";
    if (inputEmail.trim().toLowerCase() !== correctEmail.toLowerCase()) {
      alert("이메일이 일치하지 않습니다. 올바른 이메일을 입력하세요.");
      return;
    }
    // 파일명: 이름_성장리포트.pdf
    const fileName = getFileName(studentName) + '_성장리포트.pdf';
    const url = `/report/${fileName}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="report-container">
      <h2 className="report-title">수강생 리포트 다운로드</h2>
      <ul className="student-list">
        {students.map((name) => (
          <li key={name} className="student-item">
            <span className="student-name">{name}</span>
            <input
              type="email"
              placeholder="이메일 입력"
              value={emails[name] || ""}
              onChange={e => handleEmailChange(name, e.target.value)}
              style={{ marginRight: 8 }}
            />
            <button className="download-btn" onClick={() => handleDownload(name)}>
              다운로드
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportDownload; 