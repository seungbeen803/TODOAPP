// 서버를 띄우기 위한 기본 셋팅(express 라이브러리)
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}))

// 변수 하나 필요
var db;
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');
MongoClient.connect('mongodb+srv://admin:qwer1234@cluster0.5mecfiu.mongodb.net/?retryWrites=true&w=majority', (error, client) => {
  // 연결되면 할일
  // 에러처리
  if(error) return console.log(error);

  // todoapp이라는 database(폴더)에 연결
  db = client.db('todoapp');

  // 내 이름과 나이를 db에 저장해보자
  // 데이터 코드
  // _id : 직접 적으면 된다
  db.collection('post').insertOne({이름 : 'John', _id : 100}, (error, result) => {
    console.log('저장완료');
  });

  // listen(파라미터1, 파라미터2)
  // listen(서버 띄울 포트번호, 띄운 후 실행할 코드)
  app.listen(5140, function () {
    console.log('listening on 5140')
  });
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

// POST요청 처리 기계를 만들려면 app.post()
app.post('/add', (req, res) => {
  res.send('전송완료');
  console.log(req.body.date);
  console.log(req.body.title);
  // 숙제
  // 어떤 사람이 /add 라는경로로 post 요청을 하면
  // 데이터 2개(날짜, 제목)를 보내주는데,
  // 이 때, 'post'라는 이름을 가진 collection에 데이터 두 개를 저장하기
  // { 제목 : '어쩌구', 날짜: '어쩌구' }
  
    // post라는 이름의 collection에 저장
    // db에 저장
    db.collection('post').insertOne({ 제목: req.body.title, 날짜: req.body.date}, (error, result) => {
      console.log('저장완료');
    });
});

// /list로 접속하면 데이터들을 보여줄 것임
// /list로 GET요청으로 접속하면
// 실제 DB에 저장된 데이터들로 예쁘게 꾸며진 HTML을 보여줌
app.get('/list', (req, res) => {
  res.sendFile(__filename + '/list.html');
});


