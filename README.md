# prgms_search_languages
## About
프로그래머스 과제 '프로그래밍 언어 검색'을 구현하는 과제입니다.

## 필수 구현
### 언어 검색
- [x] 검색어로 언어 목록 렌더링
- [x] 방향키로 언어 목록 순회 (원형으로 순회할 것)

### 언어 선택
- [x] 엔터키를 누르면 언어 선택
- [x] 언어를 클릭하면 언어 선택
- [x] 언어선택시 선택된 언어를 `alert`로 띄운다

### 선택된 언어 렌더링
- [x] 언어 선택시 렌더링
- [x] 언어는 최대 5개까지 선택할 수 있으며, 5개 초과하는 경우 처음의 언어를 제거하고 넣는다. (FIFO)
- [x] 이미 선택된 언어를 다시 선택하면 중복x, 맨 뒤로 들어가야함

## 보너스 구현
### 사용성 개선
- [x] 화면에 접속하면 input에 자동으로 focus
- [x] 검색결과 내에서 키워드와 일치하는 문자열을 강조처리
### API 사용 최적화
- [x] 검색어 입력하는 동안 API 호출 지연, 검색어 입력이 완료되었다고 판단되는 경우 API 호출
- [x] 검색어에 따른 API 응답을 캐시해서 사용. 캐시는 브라우저를 닫았다가 열면 초기화 되어야함
### 기타
- [x] 화면을 닫았다 다시 켜도 마지막 화면 상태가 모두 유지되어야함
	- 입력중이던 검색어, 검색된 언어 목록 등
- [x] 각 스크립트는 용도에 맞게 적절히 분리되어야함