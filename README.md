# [음주 습관 개선 서비스] 나안취햄ㅅ어







# [3] Usage

## 초기 화면
- 서비스 접속 초기화면으로 다음 페이지가 나타납니다. 
- 로그인이 되어 있지 않은 경우: 우측 상단 로그인/회원가입 버튼 표시
- 로그인이 되어 있는 경우: 우측 상단 마이페이지 버튼 표시

    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094114.jpg" width="200" height="400"/>
    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095522.jpg" width="200" height="400"/>


## 회원가입
- 회원가입 버튼을 누르면 유효성 검사가 진행되고 통과하지 못한 경우 경고 문구가 입력창 하단에 표시됩니다.
- 회원가입 약관 동의 버튼을 클릭하지 않으면 경고 문구가 표시됩니다.
   
    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094131.jpg" width="200" height="400"/>
    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094247.jpg" width="200" height="400"/>


- 회원가입 전 이메일 인증 절차를 거칩니다. 회원가입 시 입력한 이메일로 인증번호가 발송되며 인증번호가 일치하면 회원가입이 완료됩니다.

    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/Screenshot_2024-08-16_at_11.21.42_AM.png" width="800" height="400"/>
    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094359.jpg" width="200" height="400"/>


## 로그인
   <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094406.jpg" width="200" height="400"/>


## 비밀번호 찾기
- 이메일로 임시 비밀번호를 전송받을 수 있습니다.

    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094556.jpg" width="200" height="400"/>
    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/image.png" width="800" height="400"/>


## 추가 정보 등록
- 회원가입 후 서비스에 필요한 추가 정보를 등록합니다. 닉네임, 주소, 비상 연락망을 등록합니다.
- 구글맵 API에서 조회된 정확한 상세 주소를 저장합니다.
- 서비스에서 제공할 통계에 활용될 주량 정보를 받습니다.

    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094655.jpg" width="200" height="400"/>
    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094745.jpg" width="200" height="400"/>
    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094816.jpg" width="200" height="400"/>


## 미니 게임
- 만취 정도를 판단하기 위한 네가지 미니 게임(발음 게임, 밸런스 게임, 타이핑 게임, 기억력 게임)이 있습니다.

    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095424.jpg" width="200" height="400"/>


- 게임을 진행하면 해당 날짜에 사용자가 등록한 일정이 있는지 확인합니다. 등록된 일정이 있다면 게임 기록이 자동으로 저장되고, 등록된 일정이 없다면 술을 마시고 있는지 확인합니다.
- 술을 마시고 있다면 일정을 생성하고 해당 일정에 게임 기록을 저장합니다.

    <img src="exec/포팅 매뉴얼 a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095615.jpg" width="200" height="400"/>
    <img src="exec/포팅 매뉴얼 a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095802.jpg" width="200" height="400"/>
    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095626.jpg"  width="200" height="400"/>
    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095709.jpg"  width="200" height="400"/>    


 ### 발음 게임
 - 랜덤 문장을 읽고 이에 따른 발음 정확도를 점수로 계산합니다.
 - 한국전자통신연구원의 발음도 정확도 판단 API를 활용했고, 이에 필요한 WAV 형식, 160K 주파수 등의 조건을 맞추기 위해 recordRTC 라이브러리로 녹음 파일을 변환합니다.
 
    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/발음게임.gif" width="200" height="400"/>


 ### 밸런스 게임
 - 모바일 장치를 기울여 어미오리를 움직여서 랜덤 배치된 새끼 오리를 찾습니다.
 - Device오리엔테이션 API를 통해 모바일 장치의 가속도계를 활용해 실시간으로 장치의 기울기 정보를 감지합니다.
 
    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095602.jpg" width="200" height="400"/>


 ### 타이핑 게임
 - 랜덤으로 주어진 문장을 타이핑해서 전체 글자수 대비 일치하는 글자수를 기준으로 점수를 환산합니다.
 
    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/타이핑게임.gif" width="200" height="400"/>


 ### 기억력 게임
 - 20초의 제한시간 내에 동일한 이미지의 6쌍의 카드를 얼마나 찾을 수 있는지를 점수로 계산합니다.

    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/카드게임.gif"  width="200" height="400"/>



## 음주 기록 캘린더

- 음주 일정을 확인합니다. 취한 정도에 따라 색상을 다르게 표시합니다. 해당 날짜 일정을 모아볼 수 있습니다.

    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100256.jpg" width="200" height="400"/>
    <img src="exec/포팅 매뉴얼 a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100317.jpg" width="200" height="400"/>
    <img src="exec/포팅 매뉴얼 a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095922.jpg" width="200" height="400"/>
    <img src="exec/포팅 매뉴얼 a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095758.jpg" width="200" height="400"/>


- 일정은 캘린더에서 미리 등록하거나, 미니 게임 시 기록 저장을 위해 등록할 수 있습니다.

    <img src="exec/포팅 매뉴얼 a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095643.jpg" width="200" height="400"/>
    <img src="exec/포팅 매뉴얼 a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095709.jpg" width="200" height="400"/>
    <img src="exec/포팅 매뉴얼 a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100155.jpg" width="200" height="400"/>
    <img src="exec/포팅 매뉴얼 a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100034.jpg" width="200" height="400"/>



- 등록된 일정을 수정할 수 있습니다.

    <img src="exec/포팅%20매뉴얼%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100335.jpg" width="200" height="400"/>



- 끝난 일정에 대해 피드백을 등록할 수 있습니다. 해당 일정에서의 음주량을 기록합니다.

    <img src="exec/포팅 매뉴얼 a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100058.jpg" width="200" height="400"/>



## 최소 택시비 경로 찾기

- GPS를 이용해 자동으로 현재 위치를 출발 위치로 설정할 수 있습니다.
- 구글맵 API를 이용하여 정확한 위치 정보를 받아옵니다.

    <img src="exec/포팅 매뉴얼 a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100939.jpg" width="200" height="400"/>
    <img src="exec/포팅 매뉴얼 a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100945.jpg" width="200" height="400"/>
    <img src="exec/포팅 매뉴얼 a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100635.jpg" width="200" height="400"/>


- 오디세이 API에서 추천경로 데이터(기존 경로탐색에서 볼 수 있는 것과 같음)를 제공 받고, GTFS 데이터셋을 활용하여 막차가 끊기는 지점부터 다시 남아있는 노선을 확인해 도착지까지 가까이 갈 수 있는 경로를 구합니다. 
  그 마지막 위치를 기준으로 카카오 모빌리티 API를 활용해 택시비 정보를 받아와서 사용자는 최종 추천 경로를 제공받습니다.

    <img src="exec/포팅 매뉴얼 a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100910.jpg" width="200" height="400"/>
    <img src="exec/포팅 매뉴얼 a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100923.jpg" width="200" height="400"/>
    <img src="exec/포팅 매뉴얼 a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_101039.jpg" width="200" height="400"/>


- 사용자의 실시간 위치를 지속적으로 파악합니다.
- 도착지에 도착하면 24시간 내 일정이 있었는지 확인하고 가장 가까운 일정에 도착 시간이 자동으로 기록됩니다.


