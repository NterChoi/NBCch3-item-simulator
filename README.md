일단 필수 구현 과제를 최대한 다 하려고 노력했습니다.

그런데 테이블 스키마 과정에서 인벤토리 테이블 어떻게 만들어야 할지 감이 안 와서 우선순위를 뒤로 해뒀다가 그냥 못해버렸습니다.
그리고 캐릭터 상세 조회 API에서 로그인하지 않아도 money를 제외한 칼럼을 보여줘야 하는데 이것도 미들웨어를 어떻게 처리해야 할지 몰라서 못 했습니다.
다른 아이디로 로그인 후에 조회 시에는 money를 제외한 다른 칼럼을 보여줍니다.

이상입니다.

다음에는 필수과제도 손대보도록 할게요!

아;; 과제 제출하면서 5번 질문에 답하다가 생각났는데 제 코드에서 토큰의 기한을 안 정한 거 같습니다. 까먹었습니다. 죄송합니다.

### API 명세서

______
| 기능        |URL| Method | Request.body  | Response.body                                                                                       |
|---------------------|------|--------|---------------|-----------------------------------------------------------------------------------------------------|
| 회원가입      |/api/signup| POST   | { <br>  "id" : "test",  <br>  "password" : "test", <br>  "passwordCheck" : "test",  <br>  "name" : "test"  <br>   } | { <br> "id" : "test", <br> "name" : "test"<br> }                                                    |
| 로그인       |/api/signin| POST   | { <br> "id" : "test", <br> "password" : "test" <br> } | {<br> "message" : "로그인 성공" <br> }                                                                   |
| 캐릭터 생성    |/api/characters| POST   | { <br> "name" : "test" <br>} | { <br> "message" : "새로운 캐릭터 'test'를 생성하였습니다!", <br> "data" : { <br> "character_id" : 1 <br> } <br> }|
| 캐릭터 상세 조회 |/api/characters/:characterId| GET    | { <br> <br> } | { <br> "data" : { <br> &nbsp;&nbsp;&nbsp;"name" : "test",<br>  &nbsp;&nbsp;&nbsp; "health" : 500, <br> &nbsp;&nbsp;&nbsp; "power" : 100 <br> &nbsp;&nbsp;&nbsp;} <br> } |
| 캐릭터 삭제    |/api/characters/:characterId| DELETE | { <br> <br> } | { <br> &nbsp;&nbsp; "message" : "캐릭터 'test'를 삭제하였습니." <br>}|
| 아이템 생성    | /api/items | POST   | { <br> &nbsp; &nbsp; "itemName" : " test " <br> &nbsp; &nbsp; "itemPrice" : "3200" <br> &nbsp; &nbsp; "itemInfo" : "test" <br> } | { <br> &nbsp; &nbsp; "message" : "아이템을 생성하였습니다." <br> &nbsp; &nbsp; "data" : { <br> &nbsp; &nbsp; &nbsp; &nbsp; "itemId" : 1, <br> &nbsp; &nbsp; &nbsp; &nbsp; "itemName" : "test", <br> &nbsp; &nbsp; &nbsp; &nbsp; "itemPrice" : 10, <br> &nbsp; &nbsp; &nbsp; &nbsp; "itemInfo" : "test" <br> &nbsp; &nbsp; } <br> } |
| 아이템 목록 조회 | /api/items | GET    | { <br> <br> } | { <br> &nbsp; &nbsp; "data" : \[ <br> &nbsp; &nbsp; &nbsp; &nbsp; { <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "itemId" : 1, <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "itemName" : "test", <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "itemPrice" : 10 <br> &nbsp; &nbsp; &nbsp; &nbsp; } <br> &nbsp; &nbsp;\] <br> } |
| 아이템 상세 조회 | /api/items/:itemId| GET | { <br> <br> } | { <br> &nbsp; &nbsp; "data" : { <br> &nbsp; &nbsp; &nbsp; &nbsp; "itemId" : 1, <br>  &nbsp; &nbsp; &nbsp; &nbsp; "itemName" : "test", <br>  &nbsp; &nbsp; &nbsp; &nbsp; "itemPrice" : 10 <br> &nbsp; &nbsp; &nbsp; &nbsp; } &nbsp; &nbsp;<br> }| 
|아이템 정보 수정 | /api/items/:itemId|PUT| { <br> &nbsp; &nbsp; "itemName" : " test ", <br> &nbsp; &nbsp; "itemInfo" : "test" <br> } | { <br> &nbsp; &nbsp; "message" : "아이템 정보 변경에 성공하였습니다.", <br> &nbsp; &nbsp; "data" : { <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "itemName" : "test", <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "itemInfo" : "test" <br> &nbsp; &nbsp; &nbsp; &nbsp; } <br> }|
