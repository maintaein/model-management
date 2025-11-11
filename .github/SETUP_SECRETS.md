# GitHub Secrets 설정 가이드

CI/CD 파이프라인에서 테스트를 실행하려면 GitHub Secrets를 설정해야 합니다.

## 필수 Secrets

### 1. TEST_DATABASE_URL
테스트용 Railway MySQL 데이터베이스 연결 문자열

**값:**
```
mysql://root:OLavbbnDoGImnHgHFWdlwHgqwaqBOAkS@metro.proxy.rlwy.net:17119/railway
```

### 2. NEXTAUTH_SECRET
NextAuth 인증 비밀키

**값:**
```
8xKp2mNq5wRtYu9vCdEfGhJkLnMoPqRs
```

## 설정 방법

### Step 1: GitHub Repository 접속
1. 프로젝트의 GitHub 페이지로 이동
2. 상단 메뉴에서 **Settings** 클릭

### Step 2: Secrets 페이지로 이동
1. 왼쪽 사이드바에서 **Secrets and variables** > **Actions** 클릭

### Step 3: Secret 추가
1. **New repository secret** 버튼 클릭
2. **Name** 입력: `TEST_DATABASE_URL`
3. **Value** 입력: 위의 데이터베이스 URL 복사/붙여넣기
4. **Add secret** 버튼 클릭
5. 동일한 방법으로 `NEXTAUTH_SECRET` 추가

## 확인 방법

1. 코드를 push하거나 Pull Request 생성
2. **Actions** 탭으로 이동
3. 최신 워크플로우 실행 확인
4. **Run Tests** Job이 성공적으로 실행되는지 확인

## 주의사항

⚠️ **절대 이 Secrets를 코드에 직접 작성하지 마세요!**
- `.env` 파일은 `.gitignore`에 포함되어 있습니다
- GitHub Secrets만 사용하여 CI/CD에서 환경 변수 관리

## 테스트 자동화 동작 방식

```
Git Push/PR 생성
    ↓
GitHub Actions 트리거
    ↓
quality-check Job (TypeScript, Build)
    ↓
lint-check Job (ESLint)
    ↓
test Job (Jest 테스트 실행) ← Secrets 사용
    ↓
테스트 통과 시: ✅ CI 성공
테스트 실패 시: ❌ CI 실패 (merge 차단)
```

## 문제 해결

### Secret이 설정되었는데도 실패하는 경우
1. Secret 이름 철자 확인 (`TEST_DATABASE_URL`, `NEXTAUTH_SECRET`)
2. Railway 데이터베이스 접근 가능 여부 확인
3. Actions 로그에서 정확한 오류 메시지 확인

### 데이터베이스 연결 실패
- Railway 데이터베이스가 sleep 상태일 수 있음
- Railway 대시보드에서 데이터베이스 활성화 확인
