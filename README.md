### API 명세서

______
| 기능        |URL| Method | Request.body  | Response.body                                                                                       |
|-----------|------|--------|---------------|-----------------------------------------------------------------------------------------------------|
| 회원가입      |/api/signup| POST   | { <br>  "id" : "test",  <br>  "password" : "test", <br>  "passwordCheck" : "test",  <br>  "name" : "test"  <br>   } | { <br> "id" : "test", <br> "name" : "test"<br> }                                                    |
| 로그인       |/api/signin| POST   | { <br> "id" : "test", <br> "password" : "test" <br> } | {<br> "message" : "로그인 성공" <br> }                                                                   |
| 캐릭터 생성    |/api/characters| POST   | { <br> "name" : "test" <br>} | { <br> "message" : "새로운 캐릭터 'test'를 생성하였습니다!", <br> "data" : { <br> "character_id" : 1 <br> } <br> }|
| 캐릭터 상세 조회 |/api/characters/:characterId| GET    | { <br> <br> } | { <br> "data" : { <br> &nbsp;&nbsp;&nbsp;"name" : "test",<br>  &nbsp;&nbsp;&nbsp; "health" : 500, <br> &nbsp;&nbsp;&nbsp; "power" : 100 <br> &nbsp;&nbsp;&nbsp;} <br> } |
| 캐릭터 삭제    |/api/characters/:characterId| DELETE | { <br> <br> } | { <br> &nbsp;&nbsp; "message" : "캐릭터 'test'를 삭제하였습니." <br>}|
| 아이템 생성    | /api/items | POST   | { <br> &nbsp; &nbsp; "itemName" : " test " <br> &nbsp; &nbsp; "itemPrice" : "3200" <br> &nbsp; &nbsp; "itemInfo" : "test" <br> } | { <br> &nbsp; &nbsp; "message" : "아이템을 생성하였습니다." <br> &nbsp; &nbsp; "data" : { <br> &nbsp; &nbsp; &nbsp; &nbsp; "itemId" : 1, <br> &nbsp; &nbsp; &nbsp; &nbsp; "itemName" : "test", <br> &nbsp; &nbsp; &nbsp; &nbsp; "itemPrice" : 10, <br> &nbsp; &nbsp; &nbsp; &nbsp; "itemInfo" : "test" <br> &nbsp; &nbsp; } <br> } |
| 아이템 목록 조회 | /api/items | GET    | { <br> <br> } | { <br> &nbsp; &nbsp; "data" : \[ <br> &nbsp; &nbsp; &nbsp; &nbsp; { <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "itemId" : 1, <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "itemName" : "test", <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "itemPrice" : 10 <br> &nbsp; &nbsp; &nbsp; &nbsp; } <br> &nbsp; &nbsp;\] <br> } |
| 아이템 상세 조회 | /api/items/:itemId| GET | { <br> <br> } | { <br> &nbsp; &nbsp; "data" : { <br> &nbsp; &nbsp; &nbsp; &nbsp; "itemId" : 1, <br>  &nbsp; &nbsp; &nbsp; &nbsp; "itemName" : "test", <br>  &nbsp; &nbsp; &nbsp; &nbsp; "itemPrice" : 10 <br> &nbsp; &nbsp; &nbsp; &nbsp; } &nbsp; &nbsp;<br> }| 
|아이템 정보 수정 | /api/items/:itemId|PUT| { <br> &nbsp; &nbsp; "itemName" : " test ", <br> &nbsp; &nbsp; "itemInfo" : "test" <br> } | { <br> &nbsp; &nbsp; "message" : "아이템 정보 변경에 성공하였습니다.", <br> &nbsp; &nbsp; "data" : { <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "itemName" : "test", <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "itemInfo" : "test" <br> &nbsp; &nbsp; &nbsp; &nbsp; } <br> }|