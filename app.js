// 서버를 띄우기 위한 기본 셋팅(express 라이브러리)
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
app.set('view engine', 'ejs');
var db;
// mongodb 연동
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://admin:qwer1234@cluster0.5mecfiu.mongodb.net/?retryWrites=true&w=majority', (err, client) => {


  if (err) return console.log(404);

  // todoapp이라는 database(폴더)에 연결
  db = client.db('todoapp');

  // db.collection('post').insertOne({ 이름: 'Jhon', 나이: 20, _id: 514 }, (err, result) => {
  //   console.log('저장완료');
  // });

  app.listen(3333, () => {
    console.log('Server is running 3333!');
  });
})


// bodyParser
// npm install body-parser 설치
// body-parser는 요청 데이터(body)해석을 쉽게 도와줌
app.use(bodyParser.urlencoded({ extended: true }));

// 누군가가 /pet으로 방문을 하면
// pet관련된 안내문을 띄워주자
app.get('/pet', (req, res) => {
  res.send('펫용품을 쇼핑할 수 있는 페이지입니다.');
});

// 누군가 localhost:8080/beauty로 접속하면 '뷰티용품 사세요' 라는 안내문을 띄워주기
app.get('/beauty', (req, res) => {
  res.send('뷰티용품을 쇼핑할 수 있는 페이지입니다.');
});

// 고객(client) : 주소창에 URL을 입력해서 서버에 GET요청을 할 수 있음

// '/' 하나만 쓰면 홈이다
// .sendFile(보낼파일경로)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/test.html'));
});

app.get('/write', (req, res) => {
  res.sendFile(path.join(__dirname, '/write2.html'));
});

app.post('/add', (req, res) => {
  res.send('전송완료');
  // input에 적은 정보가 서버로 전달됨
  // req.body 라고 하면 요청했던 form에 적힌 데이터 수신가능
  console.log(req.body.title);
  console.log(req.body.date);

  // 'post'라는 이름을 가진 collection에 두 개 데이터 저장
  db.collection('post').insertOne({ 제목: req.body.title, 날짜: req.body.date }, (err, result) => {
    console.log('저장완료');
  });
});

app.get('/list', (req, res) => {
  // DB에 저장된 post라는 collection안의 모든 데이터를 꺼내기
  db.collection('post').find().toArray((err, result) => {
    console.log(result);
    res.render('list2.ejs', { posts: result });
  });
});