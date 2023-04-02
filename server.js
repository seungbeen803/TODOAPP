// 서버를 띄우기 위한 기본 셋팅(express 라이브러리)
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}))

  // listen(파라미터1, 파라미터2)
  // listen(서버 띄울 포트번호, 띄운 후 실행할 코드)
  app.listen(5140, function () {
    console.log('listening on 5140')
  });

  // 누군가가 /pet 으로 방문을 하면..
// pet 관련된 안내문을 띄워주자
// GET 요청을 처리하는 기계 제작하기
// get('경로', 함수(요청, 응답))
// ctrl + c -> 서버 끄기
app.get('/pet', function(req, res) {
  res.send('펫용품을 쇼핑할 수 있는 페이지입니다.');
});

// 숙제
// .get() 여러 개로 경로를 많이 생성가능
// 누군가 /beauty URL로 접속하면 (GET요청하면) 안내문을 띄워줘야함
// "뷰티용품 쇼핑 페이지임"
app.get('/beauty', function(req, res) {
  res.send('뷰티용품을 쇼핑할 수 있는 페이지입니다.');
});


// '/' 하나만 쓰면 홈입니다.
// .sendFile(보낼파일경로)
// __dirname -> 디렉터리 이름
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// write get요청
// 함수 안에 함수(function(){}) => 콜백함수
// .get('경로', function(요청내용, 응답할 방법){})
app.get('/write', function(req, res) {
  res.sendFile(__dirname + '/write.html');
});

// 어떤 사람이 /add 경로로 POST 요청을 하면...app
// ??를 해주세요~
app.post('/add', (req, res) => {
  res.send('전송완료');
  console.log(req.body.title);
  console.log(req.body.date);
});

// POST요청 처리 기계를 만들려면 app.post()
