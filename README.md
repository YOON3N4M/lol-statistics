# lol-statistics
배포 https://yoon3n4m.github.io/lol-statistics/
### 활용 기술과 API
html, css, javascript, ReactJS, React-router-dom, react-redux<br>
riot API -- SUMONNERS-V4, LEAGUE-V4, MATCH-V5
# 앱소개
해당 앱은 riot games에서 제공하는 API를 활용하여 유명 리그오브레전드 통계사이트인 op.gg를 간소화하여 제작된 서비스 입니다. op.gg가 제공하는 수 많은 기능들 가운데 전적 검색 기능과 전체적인 디자인을 참고하여 제작했습니다. 기본적으로 원본인 op.gg는 직관적이고 깔끔한 ui를 가지고 있어 리그오브레전드를 플레이 해보지 않았던 사람이라도 한눈에 알아 볼 수 있는 구조를 하고 있습니다. 처음 앱을 실행하면 로고와 검색창이 보여지며 해당 검색창에 리그오브레전드 플레이어의 닉네임을 검색하면 해당 플레이어의 게임 기록에 관한 승/패와 챔피언, 승률, 랭크등의 정보를 통계화하여 보여줍니다.<br><br> 
### 알림
 > - 간소화하여 제작한 만큼 미구현 기능도 다수 존재합니다. 일부 미구현 기능들은 클릭시 미구현 상태임을 알리는 창이 뜨게하여 알 수 있게 했습니다.
 > - API rate limit과 처리 속도의 문제로 플레이어의 전적중 가장 최근 15게임만을 불러옵니다.
 > - 전적 갱신 버튼의 기능은 미구현 상태이지만 전적 검색을 할때마다 API 요청을 하니 보여지는 전적은 항상 최신 전적이 보여집니다. 버튼은 미관상 위치해 있을뿐 입니다.
 > - 전적 페이지 우측상단의 검색창에 문제가 생겨 일시적으로 비활성화 해두었습니다. 때문에 매 검색마다 home으로 돌아가 재 검색을 해야합니다. 
 > - "다시하기"의 경우 일단은 패배로 처리를 합니다. (다시 하기에 대한 분류를 하지 않았습니다.)
 <img width="1000" alt="image" src="https://user-images.githubusercontent.com/115640584/219006068-fbe655ad-df4f-4304-9941-80c1a31c1bcd.png">
 홈화면엔 큰 로고와 검색창, 프로게이머의 전적으로 바로가기 창이 있습니다.<br>
 이런 전적 제공 서비스에 익숙하시거나 알고 있는 소환사의 닉네임이 있다면, 검색창에 닉네임 입력 후 검색이 가능합니다. <br>
 리그오브레전드를 플레이 해 보신 경험이 없으시다면, 아래 프로게이머의 이름 혹은 활동명을 클릭 해 해당 선수의 전적을 조회해볼 수 있습니다. <br> <br>
 <img width="1000" alt="image" src="https://user-images.githubusercontent.com/115640584/219007435-f603fc51-5b9b-4063-8add-ee136285c268.png">
 닉네임 검색이나 프로게이머 전적으로 바로가기를 통해 검색을 했다면 해당 화면이 보여집니다. <br>
 검색된 플레이어의 소환사 아이콘, 소환사 레벨, 현지 랭크 티어 등과 같은 정보를 확인할 수 있습니다. <br>
 또한 최근 15게임의 전적을 승, 패를 나누어 보여주며 해당 15게임의 통산 승률, kda, 킬관여율, 선호 포지션 등도 확인 할 수 있습니다. <br><br>
 <img width="352" alt="image" src="https://user-images.githubusercontent.com/115640584/219008872-0d1a1b05-51ee-4b02-b59f-04b2f2ecb1cf.png">
 플레이어의 현재 랭크와 승 수, 패 수, 승률 등과 같은 정보 입니다. <br><br>
 <img width="346" alt="image" src="https://user-images.githubusercontent.com/115640584/219009277-ac48f74c-6206-43b2-957f-05395051a841.png">
 원본인 op.gg 에서는 서버에 전적 데이터를 저장해 이번 시즌에 플레이한 모든 챔피언 중 가장 많이 플레이한 7개의 챔피언을 보여줍니다.<br>
 데이터를 서버에 저장하지 않는 이 앱에서는 이번시즌 전체 경기가 아닌 조회된 15게임 중 많이 플레이한 챔피언의 정보를 같은 방식으로 보여줍니다. <br><br>
 <img width="757" alt="image" src="https://user-images.githubusercontent.com/115640584/219010258-26425efd-4bf4-4a03-85b4-c1b3f8af9c28.png">
 조회된 15게임의 승률을 한눈에 들어오도록 도넛 차트를 이용해 표현 했으며, 15게임 통산 kda와 킬관여율을 보여줍니다. <br>
 또한 플레이한 15게임의 선호 포지션의 지표도 막대 그래프를 이용해 한 눈에 알아 볼 수 있도록 했습니다.<br>
 
 <br>
 

***
## 추가할 기능
- 탭 쪽에 검색창이 하나 더 필요합니다.
- 전적 상단 Summary 부분 추가 해야합니다. (조회한 전적 중 승률과 플레이를 가장 많이한 챔피언 Top3의 kda 등의 정보 등)
- 좌측 중단쯤 조회한 전적을 바탕으로 모스트 7의 정보 (전적을 저장하는 db가 없으니 해당 기능은 추가하지 말거나 하더라도 다른 형태로 하는게 좋을 것 같습니다.)
- 네비게이션 탭에도 전적 검색이 가능한 작은 검색창 추가하기
- 메인화면이 허전하니 프로 선수들의 전적으로 바로 갈 수 있는 기능을 추가하면 좋을 것 같습니다.

***
## 문제점 & 수정할 점
- 게임 시간이 "00분 00초"가 아닌 "00분"으로만 출력되는데 전자의 방식으로 변경 해야합니다.
- 전적의 각 게임이 몇시간 전에 한 기록인지 출력되게 해야 합니다.
- 전적부분의 참가자 10명의 챔피언 아이콘과 닉네임이 출력되는 부분에 피들스틱 챔피언의 이미지가 정상적으로 로딩되지 않는 문제
- 전적 페이지 우측상단의 검색창에 문제가 생겨 일시적으로 비활성화 해두었습니다.
***

## 해결된 문제 & 수정/추가된 점
- #### API MATCH-V5의 응답이 순서대로 나오지 않는 문제 (=전적이 뒤죽박죽 나옴)<br><br>
  > API의 응답을 순서대로 처리하는 방법을 몰라 임시방편으로 sortMatch라는 새로운 상태를 만들고 matchData의 게임들을 각 게임의 생성시간인 matchData[x].info.gamecreation을 비교하여 내림차순으로 정렬하여 sortMatch라는 배열에 새로이 할당해준후 이후 전적의 렌더링부분을 sortMatch를 활용하여 출력되게 하였습니다.
 
- #### 닉네임이 두 글자인 경우 정상적인 검색이 안되는 문제 <br><br>
  > 닉네임이 두 글자인 경우 이상하게 API가 정상적으로 호출되지 않는 문제가 있었습니다.<br>
  > 때문에 routes/Home.js에서 처음 검색어(닉네임)을 입력받고 submit할 때에 검색어의 길이가 2일 경우 사이에 공백을 넣는 방식으로 처리하였습니다.>
  > ```javascript
  >  function onSubmit(e) {
  >  e.preventDefault();
  >  // 닉네임이 두 글자일 경우 정상적인 소환사 조회가 불가능하여, 사이에 공백을 넣어서 처리했습니다.
  >  if (username.length === 2) {
  >    const usernameRe = `${username[0]} ${username[1]}`;
  >    dispatch(setUserName(usernameRe));
  >    navigate(`summoners/kr/${usernameRe}`);
  >  } else {
  >    dispatch(setUserName(username));
  >    navigate(`summoners/kr/${username}`);
  >  }
  > }
  > ```
- #### MatchHistory.js에서 각 게임별 각종 정보들을 useState로 관리합니다.
  > 각 경기별 챔피언, 룬, 스펠, 아이템의 이미지와 kda, 게임타입(일반,솔로랭크,자유랭크 등)
- #### MatchHistory.js에서 불러온 경기 기록중 검색한 닉네임과 일치하는 참가자를 추려내 SummonersContents.js로 보냅니다. 즉 검색된 플레이어의 게임 상세 정보를 활용 할 수 있습니다.
  > - SummonersContents.js
  > ```javascript
  > const [currentMatch, setCurrentMatch] = useState([]);
  > ```
  > - MatchHistory.js
  > ```
  >  setCurrentMatch((prev) => [...prev, currentPlayer]);
  > ```
  > - currentMatch <br>
  > <img width="575" alt="image" src="https://user-images.githubusercontent.com/115640584/218682103-37f47d03-95ae-4538-9c45-68fe597a2b2e.png"><br>
  > 각 객체엔 각 경기별로 플레이한 챔피언 이름, 킬 수, 데스 수, 어시스트 수, 제어와드 구매횟수 등 다양한 정보가 들어있으며 이 정보들을 토대로 조회한 경기중 가장 많이 플레이한 챔피언,
  > 조회한 경기들의 킬, 데스, 어시스트의 합산 평균 등과 같은 기능을 제작할 수 있습니다.
- #### 전적의 킬 관여율 부분
  > 각 경기마다 보여지는 킬 관여율을 각 경기 중 검색된 플레이어가 속한 팀의 킬수의 합계를 토대로 출력되게 하였습니다.
  > - MatchHistory.js
  > ```javascript
  > // 참가자 10명중 검색된 플레이어를 추려냅니다.
  > const currentPlayer = match.info.participants.filter(
  >   (player) => player.summonerName === userName
  > )[0]; 
  >
  > // 참가자 10명중 검색된 플레이어의 teamID와 같은 참가자의를 추려 teamA에 할당 teamID는 100,200 존재 
  > const teamA = match.info.participants.filter(
  >   (player) => player.teamId === currentPlayer.teamId
  > ); 
  >
  > // teamA의 5명의 킬 수를 합산합니다.
  > const teamTotalKills = teamA.reduce(function add(sum, item) {
  >   return sum + item.kills;
  > }, 0); 
  >
  > // 검색된 플레이어의 킬 수와 어시스트 수를 더해 전체 팀 킬 수로 나눈 뒤, 100을 곱한뒤 가독성을 위해 소숫점은 반올림 합니다.
  > const killPart = Math.round(
  >   ((currentPlayer.kills + currentPlayer.assists) / teamTotalKills) * 100
  > ); 
  > ```
***
