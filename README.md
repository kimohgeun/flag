# FLAG

**url을 이용한 파일공유**

## BACK-END

-   Framework : Express

-   Database : mongoDB

-   Auth : JsonWebToken

### ❗️Err Status

**LOGIN_FAIL & AUTH_FAIL & REGISTER_FAIL**

-   400 : 계정없음
-   401 : 패스워드 불일치
-   402 : 토큰만료
-   403 : 중복가입

**UPLOAD_FAIL & DOWNLOAD_FAIL**

-   400 : 플래그 중복
-   401 : 업로드 실패
-   402 : 유저네임 혹은 플래그 불일치

## FRONT-END

-   Library : React
