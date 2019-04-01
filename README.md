# FLAG

**url을 이용한 파일공유**

## BACK-END

-   Framework : Express

-   Database : mongoDB

### ❗️Err Status

**REGISTER_FAIL**

-   400 :   중복가입

**LOGIN_FAIL & AUTH_FAIL**

-   400 : 계정없음
-   401 : 패스워드 불일치
-   402 : 토큰만료

**UPLOAD_FAIL**

-   400 : 플래그 중복
-   401 : 업로드 실패

**DOWNLOAD_FAIL**

-   400 : 유저네임 혹은 플래그 불일치

## FRONT-END

-   Library : React
