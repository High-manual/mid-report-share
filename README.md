# 수강생 리포트 다운로드 시스템

수강생들이 자신의 성장 리포트를 다운로드할 수 있는 React 웹 애플리케이션입니다.

## 주요 기능

- 이메일 인증을 통한 개인 리포트 다운로드
- 환경변수를 통한 수강생 정보 관리
- Docker를 이용한 배포 지원

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 수강생 정보를 설정하세요:

```env
REACT_APP_STUDENTS=["수강생1", "수강생2", "수강생3"]
REACT_APP_EMAIL_MAP={"수강생1": "email1@example.com", "수강생2": "email2@example.com"}
```

자세한 설정 방법은 [SETUP.md](./SETUP.md)를 참고하세요.

### 3. 개발 서버 실행

```bash
npm start
```

앱이 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 배포

### Docker 사용

```bash
# 이미지 빌드
docker build -t report-download-app .

# 컨테이너 실행
docker run -p 80:80 report-download-app
```

### 프로덕션 빌드

```bash
npm run build
```

## 기수 변경 시 작업

1. `.env` 파일의 수강생 정보 업데이트
2. 애플리케이션 재시작
3. 새로운 리포트 파일들을 `public/report/` 폴더에 배치

## 프로젝트 구조

- `src/ReportDownload.jsx` - 메인 컴포넌트
- `SETUP.md` - 환경변수 설정 가이드
- `Dockerfile` - Docker 배포 설정