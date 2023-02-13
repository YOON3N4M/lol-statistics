# lol-statistics
배포 https://yoon3n4m.github.io/lol-statistics/

### 추가할 기능
- 탭 쪽에 검색창이 하나 더 필요함.
- 전적 상단 Summary 부분 추가 해야함. (조회한 전적 중 승률과 플레이를 가장 많이한 챔피언 Top3의 kda 등의 정보 등)
- 좌측 중단쯤 조회한 전적을 바탕으로 모스트 7의 정보 (전적을 저장하는 db가 없으니 해당 기능은 추가하지 말거나 하더라도 다른 형태로 하는게 좋을 것 같음)
- 네비게이션 탭에도 전적 검색이 가능한 작은 검색창 추가하기
- 메인화면이 허전하니 프로 선수들의 전적으로 바로 갈 수 있는 기능을 추가하면 좋을 것 같음.

***
### 해결할 문제점 & 수정할 점
- 게임 시간이 "00분 00초"가 아닌 "00분"으로만 출력되는데 전자의 방식으로 변경 해야함.
- 전적의 각 게임이 몇시간 전에 한 기록인지 출력되게 해야 함.
- 전적부분의 참가자 10명의 챔피언 아이콘과 닉네임이 출력되는 부분에 피들스틱 챔피언의 이미지가 정상적으로 로딩되지 않는 문제
- 전적의 킬 관여율 부분
***

### 해결된 문제
- MATCH-V5의API 응답이 순서대로 나오지 않는 문제 (=전적이 뒤죽박죽 나옴)<br><br>
  >API의 응답을 순서대로 처리하는 방법을 몰라 임시방편으로 sortMatch라는 새로운 상태를 만들고 matchData의 게임들을 각 게임의 생성시간인 matchData[x].info.gamecreation을 비교하여 내림차순으로 정렬하여 sortMatch라는 배열에 새로이 할당해준후 이후 전적의 렌더링부분을 sortMatch를 활용하여 출력되게 하였습니다.
 
- 닉네임이 두 글자인 경우 정상적인 검색이 안되는 문제 <br><br>
  >routes/Home.js에서 처음 검색어(닉네임)을 입력받고 submit할 때에 검색어의 길이가 2면 사이에 공백을 넣는 방식으로 처리하였습니다.
```javascript
 function onSubmit(e) {
    e.preventDefault();
    // 닉네임이 두 글자일 경우 정상적인 소환사 조회가 불가능하여, 사이에 공백을 넣어서 처리함.
    if (username.length === 2) {
      const usernameRe = `${username[0]} ${username[1]}`;
      dispatch(setUserName(usernameRe));
      navigate(`summoners/kr/${usernameRe}`);
    } else {
      console.log(username);
      dispatch(setUserName(username));
      navigate(`summoners/kr/${username}`);
    }
  }
  ```
  - MatchHistory.js에서 각 게임별 각종 정보들을 useState로 관리함
  > 각 경기별 챔피언, 룬, 스펠, 아이템의 이미지와 kda, 게임타입(일반,솔로랭크,자유랭크 등)
***
