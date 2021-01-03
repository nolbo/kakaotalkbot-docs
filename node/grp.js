var fs = require('fs'),
    fileList = ['./index.html', './summary.html', './rhino.html', './legacyAPI.html', './full.html', './deepening.html', './API2.html', './appendix.html'],
    path = 'img/grp/default.jpg',
    date = ((new Date()).getMonth() + 1) + '/' + (new Date()).getDate();

var gan = "갑(甲)·을(乙)·병(丙)·정(丁)·무(戊)·기(己)·경(庚)·신(辛)·임(壬)·계(癸)".split(
  "·"
);
var ji = "자(子)·축(丑)·인(寅)·묘(卯)·진(辰)·사(巳)·오(午)·미(未)·신(申)·유(酉)·술(戌)·해(亥)".split(
  "·"
);
var color = "청(靑):푸른·청(靑):푸른·적(赤):붉은·적(赤):붉은·황(黃):황금·황(黃):황금·백(白):흰·백(白):흰·흑(黑):검은·흑(黑):검은".split(
  "·"
);
var ddi = "쥐:서(鼠),소:우(牛),호랑이:호(虎),토끼:토(兔 또는 兎),용:용(龍 또는 龙),뱀:사(蛇),말:마(馬 또는 马),양:양(羊),원숭이:후(猴),닭:계(雞 또는 鸡),개:구(狗) 또는 견(犬),돼지:저(豬 또는 猪)".split(
  ","
);
/*
간지를 해마다 하나씩 배당한 것을 세차(歲次), 다달에 하나씩 배당한 것을 월건(月建), 
나날에 하나씩 배당한 것을 일진(日辰), 시간에 배당하는것을 시진(時辰) 이라고 합니다.
*/
// 년도를 받아 세차(歲次)를 한글로 리턴
function getGanjiKor(year) {
  year -= 4;
  gg = gan[year % 10];
  jj = ji[year % 12];
  return gg.charAt(0) + jj.charAt(0);
}
// 년도를 받아 세차(歲次)를 한자로 리턴
function getGanjiHan(year) {
  year -= 4;
  gg = gan[year % 10];
  jj = ji[year % 12];
  return gg.charAt(2) + jj.charAt(2);
}
// '띠'는 영어로 zodiac signs이라고 한답니다.
// zodiac 은 원래 '홍도대의 별자리인 십이궁'이라는 뜻인데요,
// 좀더 정확하게 '띠'를 영어로 표현하면 Chinese zodiac signs입니다.
 
// '띠'별 색상을 한글로
function getZodiacSignColorKor(year) {
  year -= 4;
  return color[year % 10].split(":")[1];
}
// '띠'별 색상을 한자로
function getZodiacSignColorHan(year) {
  year -= 4;
  // return color[year % 10].charAt(2);
  return color[year % 10].split(":")[0];
}
// '띠'를 한글로
function getZodiacSignKor(year) {
  year -= 4;
  return ddi[year % 12].split(":")[0];
}
// '띠'를 한자로
function getZodiacSignHan(year) {
  year -= 4;
  return ddi[year % 12].split(":")[1].charAt(2);
}
//===========================================================================
// 월/일을 리턴하여 별자리 알아내기
function getStar(month, day) {
  if ((month == 1 && day <= 20) || (month == 12 && day >= 22))
    return "염소자리";
  if ((month == 2 && day <= 18) || (month == 1 && day >= 21)) return "물병자리";
  if ((month == 3 && day <= 20) || (month == 2 && day >= 19))
    return "물고기자리";
  if ((month == 4 && day <= 20) || (month == 3 && day >= 21)) return "양자리";
  if ((month == 5 && day <= 21) || (month == 4 && day >= 21)) return "황소자리";
  if ((month == 6 && day <= 21) || (month == 5 && day >= 22))
    return "쌍둥이자리";
  if ((month == 7 && day <= 22) || (month == 6 && day >= 22)) return "게자리";
  if ((month == 8 && day <= 22) || (month == 7 && day >= 23)) return "사자자리";
  if ((month == 9 && day <= 23) || (month == 8 && day >= 23)) return "처녀자리";
  if ((month == 10 && day <= 23) || (month == 9 && day >= 24))
    return "천칭자리";
  if ((month == 11 && day <= 22) || (month == 10 && day >= 24))
    return "전갈자리";
  if ((month == 12 && day <= 21) || (month == 11 && day >= 23))
    return "사수자리";
}
// 월을 리턴하여 탄생석 알아내기
function getStone(month) {
  var tt = new Array(
    "",
    "가넷(Garnet) : 우애, 충실, 정조, 인내",
    "자수정(Ametheyst) : 결혼 15주년 기념 보석, 성실, 마음의 평화",
    "애쿼머린(Aqamarine) : 신념, 용기, 총명, 침착",
    "다이아몬드(Diamond) : 평화, 순수, 신뢰, 청정무구",
    "에메랄드(Emerald) : 행복, 행운",
    "진주(Pearl) : 건강, 장수, 부, 처녀의 상징",
    "루비(Rubi) : 애정, 정열, 용기, 자선, 위엄",
    "감람석(Olivine) : 부부의 행복, 화합, 건강, 장수, 정신의 만족",
    "사파이어(Sapphire) : 결혼 35주년 기념 보석, 자애, 성실, 덕망, 정절",
    "오팔(Opal) : 환희, 안락, 인내, 비애의 극복",
    "토파즈(Topaz) : 참다운 우애, 우정, 사랑, 희망, 결백",
    "터키석(Turquoise) : 성공, 행운, 친근한 관계"
  );
  return tt[parseInt(month)];
}
//===========================================================================
// 윤년을 판단하는 함수
function isLeapYear(year) {
  return year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
}
// 월의 마지막 날짜를 리턴하는 함수
function getLastDayOfMonth(year, month) {
  var monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  monthDay[1] = isLeapYear(year) ? 29 : 28;
  return monthDay[month - 1];
}
// 1년 1월 1일부터 지정날짜까지의 총일수
function getTotalDay(year, month, day) {
  var totalDay =
    (year - 1) * 365 +
    Math.floor((year - 1) / 4) -
    Math.floor((year - 1) / 100) +
    Math.floor((year - 1) / 400);
  for (var i = 1; i < month; i++) totalDay += getLastDayOfMonth(year, i);
  totalDay += day;
  return totalDay;
}
// 요일을 숫자로
function getDayOfWeekNum(year, month, day) {
  return getTotalDay(year, month, day) % 7;
}
// 요일을 문자로
function getDayOfWeekStr(year, month, day) {
  return "일월화수목금토".charAt(getDayOfWeekNum(year, month, day));
}
// 생활연령 계산하기
// 알고자하는 년,월,일
function getAgeCompute(year, month, date) {
  // 생활연령 계산
  var nd = new Date(); // 현재 년월일
  var id = new Date(year, month - 1, date); // 알고자하는 년월일을 이용하여 Date객체 생성
 
  var rd = (nd.getTime() - id.getTime()) / 1000 / 60 / 60 / 24;
  var ryear = nd.getFullYear() - id.getFullYear();
  var rmonth = nd.getMonth() - id.getMonth();
  var rdate = nd.getDate() - id.getDate();
 
  if (rdate < 0) {
    rmonth--;
    rdate += 30;
  }
  if (rmonth < 0) {
    ryear--;
    rmonth += 12;
  }
  var rmonthMix = ryear * 12 + rmonth;
 
  var obj = { year: year, month: month, date: date };
  obj.rYear = ryear; // ?세
  obj.rMonth = rmonth; // ?개월
  obj.rDate = rdate; // ?일
  // 살아온날
  obj.rMonthMix = rmonthMix; // 몇개월 살았는가?
  obj.totalday =
    getTotalDay(nd.getFullYear(), nd.getMonth() + 1, nd.getDate()) -
    getTotalDay(year, month, date) +
    1; // 몇일 살았는가?
  obj.weekday =
    getDayOfWeekStr(nd.getFullYear(), nd.getMonth() + 1, nd.getDate()) +
    "(" +
    getDayOfWeekNum(nd.getFullYear(), nd.getMonth() + 1, nd.getDate()) +
    ")"; // 요일
  // 나이 계산
  var agek = nd.getFullYear() - id.getFullYear() + 1;
  var agem = nd.getFullYear() - id.getFullYear() - 1;
  if (
    (nd.getMonth() >= id.getMonth() && nd.getDate() >= id.getDate()) ||
    nd.getMonth() > id.getMonth()
  ) {
    agem++;
  }
 
  obj.ageK = agek; // 우리 나이
  obj.ageM = agem; // 만나이
  return obj;
  //  년,월,일,?년,?개월,?일살았나,총개월수(rMonthMix),살아온일수(totalDay),요일(weekday),우리나이(ageK),만나이(ageM)
  // {"year":2019,"month":2,"date":7,"rYear":0,"rMonth":0,"rDate":0,"rMonthMix":0,"totalday":1,"weekday":"목(4)","ageK":1,"ageM":0}
}
//=======================================================================
// 음력 데이터 (평달 - 작은달 :1,  큰달:2 )
// (윤달이 있는 달 - 평달이 작고 윤달도 작으면 :3 , 평달이 작고 윤달이 크면 : 4)
// (윤달이 있는 달 - 평달이 크고 윤달이 작으면 :5,  평달과 윤달이 모두 크면 : 6)
var lunarMonthTable = [
  [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2],
  [2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2] /* 1801 */,
  [1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1],
  [2, 3, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 1, 3, 2, 1, 2, 2, 2, 1],
  [2, 2, 1, 2, 1, 1, 1, 2, 1, 2, 2, 1],
  [2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
  [1, 2, 2, 1, 5, 2, 1, 2, 1, 1, 2, 1],
  [2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2],
  [1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2],
  [1, 1, 5, 2, 1, 2, 2, 1, 2, 2, 1, 2] /* 1811 */,
  [1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 1, 1, 1, 2, 1, 2, 2, 2, 1],
  [2, 5, 2, 1, 1, 1, 2, 1, 2, 2, 1, 2],
  [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 5, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1],
  [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2],
  [1, 2, 1, 5, 2, 2, 1, 2, 2, 1, 2, 1],
  [1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
  [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2] /* 1821 */,
  [2, 1, 5, 1, 1, 2, 1, 2, 2, 1, 2, 2],
  [2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 4, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 1, 2, 2, 4, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 1, 2, 3, 2, 1, 2, 2, 1, 2, 2, 2],
  [1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2] /* 1831 */,
  [1, 2, 1, 2, 1, 1, 2, 1, 5, 2, 2, 2],
  [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 5, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
  [1, 2, 1, 5, 1, 2, 2, 1, 2, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 4, 1, 1, 2, 1, 2, 1, 2, 2, 1] /* 1841 */,
  [2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1],
  [2, 2, 2, 1, 2, 1, 4, 1, 2, 1, 2, 1],
  [2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 5, 2, 1, 2, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 3, 2, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 1, 2, 3, 2, 1, 2, 2] /* 1851 */,
  [2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 5, 2, 1, 2, 1, 2],
  [1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
  [1, 2, 1, 1, 5, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
  [2, 1, 6, 1, 1, 2, 1, 1, 2, 1, 2, 2],
  [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2] /* 1861 */,
  [2, 1, 2, 1, 2, 2, 1, 5, 2, 1, 1, 2],
  [1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
  [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 1, 2, 4, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
  [1, 2, 2, 3, 2, 1, 1, 2, 1, 2, 2, 1],
  [2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 2, 2, 1, 2, 1, 2, 1, 1, 5, 2, 1],
  [2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2] /* 1871 */,
  [1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
  [1, 1, 2, 1, 2, 4, 2, 1, 2, 2, 1, 2],
  [1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
  [2, 2, 1, 1, 5, 1, 2, 1, 2, 2, 1, 2],
  [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 2, 4, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2],
  [1, 2, 1, 2, 1, 2, 5, 2, 2, 1, 2, 1] /* 1881 */,
  [1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
  [2, 1, 1, 2, 3, 2, 1, 2, 2, 1, 2, 2],
  [2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 2, 1, 5, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2] /* 1891 */,
  [1, 1, 2, 1, 1, 5, 2, 2, 1, 2, 2, 2],
  [1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 5, 1, 2, 1, 2, 1, 2, 1],
  [2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 5, 2, 2, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 5, 2, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1] /* 1901 */,
  [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
  [2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
  [1, 2, 2, 4, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
  [1, 5, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 1, 1, 5, 1, 2, 2, 1, 2, 2] /* 1911 */,
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
  [2, 2, 1, 2, 5, 1, 2, 1, 2, 1, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [2, 3, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 2, 1, 1, 2, 1, 5, 2, 1, 2, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2] /* 1921 */,
  [2, 1, 2, 2, 3, 2, 1, 1, 2, 1, 2, 2],
  [1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
  [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
  [2, 1, 2, 5, 2, 1, 2, 2, 1, 2, 1, 2],
  [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 5, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
  [1, 2, 2, 1, 1, 5, 1, 2, 1, 2, 2, 1],
  [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1] /* 1931 */,
  [2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
  [1, 2, 2, 1, 6, 1, 2, 1, 2, 1, 1, 2],
  [1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
  [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 4, 1, 1, 2, 2, 1, 2, 2, 2, 1],
  [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
  [2, 2, 1, 1, 2, 1, 4, 1, 2, 2, 1, 2],
  [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 2, 1, 2, 2, 4, 1, 1, 2, 1, 2, 1] /* 1941 */,
  [2, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 4, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
  [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
  [2, 5, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 3, 2, 1, 2, 1, 2],
  [1, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2] /* 1951 */,
  [1, 2, 1, 2, 4, 1, 2, 2, 1, 2, 1, 2],
  [1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2],
  [1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
  [2, 1, 4, 1, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 1, 5, 2, 1, 2, 2],
  [1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2] /* 1961 */,
  [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2],
  [1, 2, 5, 2, 1, 1, 2, 1, 1, 2, 2, 1],
  [2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 2, 1, 5, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
  [1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1, 2] /* 1971 */,
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 2, 1, 5, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1],
  [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 6, 1, 2, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2] /* 1981 */,
  [2, 1, 2, 3, 2, 1, 1, 2, 1, 2, 2, 2],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
  [2, 1, 2, 2, 1, 1, 2, 1, 1, 5, 2, 2],
  [1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
  [2, 1, 2, 1, 2, 5, 2, 2, 1, 2, 1, 2],
  [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 1, 5, 1, 2, 2, 1, 2, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2] /* 1991 */,
  [1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
  [1, 2, 5, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 1, 2, 5, 2, 1, 1, 2],
  [1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 1],
  [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 1, 2, 3, 2, 2, 1, 2, 2, 2, 1],
  [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
  [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1],
  [2, 2, 1, 5, 2, 1, 1, 2, 1, 2, 1, 2] /* 2001 */,
  [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2],
  [1, 5, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 2, 1, 5, 2, 2, 1, 2, 2],
  [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
  [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
  [2, 2, 1, 1, 5, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1] /* 2011 */,
  [2, 1, 2, 5, 2, 2, 1, 1, 2, 1, 2, 1],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1],
  [2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 2, 1, 2, 1, 4, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2] /* 여기 변경 */,
  [2, 1, 2, 5, 2, 1, 1, 2, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1] /* 2021 */,
  [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
  [1, 5, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
  [2, 2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1],
  [2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2],
  [1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1] /* 2031 */,
  [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 5, 2],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 4, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
  [2, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 1],
  [2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2] /* 2041 */,
  [1, 5, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
  [2, 1, 2, 1, 1, 2, 3, 2, 1, 2, 2, 2],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
  [2, 1, 2, 2, 4, 1, 2, 1, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1],
  [2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
  [1, 2, 4, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2] /* 2051 */,
  [1, 2, 1, 1, 2, 1, 1, 5, 2, 2, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
  [1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
  [1, 2, 2, 1, 2, 4, 1, 1, 2, 1, 2, 1],
  [2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 1, 2, 2, 1, 1, 2, 1],
  [2, 1, 2, 4, 2, 1, 2, 1, 2, 2, 1, 1],
  [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1],
  [2, 2, 3, 2, 1, 1, 2, 1, 2, 2, 2, 1] /* 2061 */,
  [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1],
  [2, 2, 1, 2, 1, 2, 3, 2, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2],
  [1, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2],
  [1, 2, 1, 5, 1, 2, 1, 2, 2, 2, 1, 2],
  [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
  [2, 1, 2, 1, 2, 1, 1, 5, 2, 1, 2, 2] /* 2071 */,
  [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 1, 2, 2, 1, 5, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1],
  [2, 1, 2, 3, 2, 1, 2, 2, 2, 1, 2, 1],
  [2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 5, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [1, 2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2] /* 2081 */,
  [1, 2, 2, 2, 1, 2, 3, 2, 1, 1, 2, 2],
  [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 1, 6, 1, 2, 2, 1, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 5, 1, 2, 1, 1, 2, 2, 2, 1],
  [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
  [2, 2, 2, 1, 2, 1, 1, 5, 1, 2, 2, 1],
  [2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1] /* 2091 */,
  [2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 2, 1, 2, 4, 2, 1, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 3, 2, 1, 1, 2, 2, 2, 1, 2],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
  [2, 5, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
  [2, 2, 1, 2, 2, 1, 5, 2, 1, 1, 2, 1]
];
//=======================================================================
// 계산을 빨리하기 위하여 기준 년도를 구한다.
function getBaseDate(year, month, day) {
  var solYear, solMonth, solDay;
  var lunYear, lunMonth, lunDay;
  var lunLeapMonth, lunMonthDay;
  var solMonthDay = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year < 1800 || year > 2101) {
    throw "1800년부터 2101년까지만 확인 가능합니다.";
  }
  if (year >= 2080) {
    /* 기준일자 양력 2080년 1월 1일 (음력 2079년 12월 10일) */
    solYear = 2080;
    solMonth = 1;
    solDay = 1;
    lunYear = 2079;
    lunMonth = 12;
    lunDay = 10;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 2080 년 2월 28일 */
    lunMonthDay = 30; /* 2079년 12월 */
  } else if (year >= 2060) {
    /* 기준일자 양력 2060년 1월 1일 (음력 2059년 11월 28일) */
    solYear = 2060;
    solMonth = 1;
    solDay = 1;
    lunYear = 2059;
    lunMonth = 11;
    lunDay = 28;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 2060 년 2월 28일 */
    lunMonthDay = 30; /* 2059년 11월 */
  } else if (year >= 2040) {
    /* 기준일자 양력 2040년 1월 1일 (음력 2039년 11월 17일) */
    solYear = 2040;
    solMonth = 1;
    solDay = 1;
    lunYear = 2039;
    lunMonth = 11;
    lunDay = 17;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 2040 년 2월 28일 */
    lunMonthDay = 29; /* 2039년 11월 */
  } else if (year >= 2020) {
    /* 기준일자 양력 2020년 1월 1일 (음력 2019년 12월 7일) */
    solYear = 2020;
    solMonth = 1;
    solDay = 1;
    lunYear = 2019;
    lunMonth = 12;
    lunDay = 7;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 2020 년 2월 28일 */
    lunMonthDay = 30; /* 2019년 12월 */
  } else if (year >= 2000) {
    /* 기준일자 양력 2000년 1월 1일 (음력 1999년 11월 25일) */
    solYear = 2000;
    solMonth = 1;
    solDay = 1;
    lunYear = 1999;
    lunMonth = 11;
    lunDay = 25;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 2000 년 2월 28일 */
    lunMonthDay = 30; /* 1999년 11월 */
  } else if (year >= 1980) {
    /* 기준일자 양력 1980년 1월 1일 (음력 1979년 11월 14일) */
    solYear = 1980;
    solMonth = 1;
    solDay = 1;
    lunYear = 1979;
    lunMonth = 11;
    lunDay = 14;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 1980 년 2월 28일 */
    lunMonthDay = 30; /* 1979년 11월 */
  } else if (year >= 1960) {
    /* 기준일자 양력 1960년 1월 1일 (음력 1959년 12월 3일) */
    solYear = 1960;
    solMonth = 1;
    solDay = 1;
    lunYear = 1959;
    lunMonth = 12;
    lunDay = 3;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 1960 년 2월 28일 */
    lunMonthDay = 29; /* 1959년 12월 */
  } else if (year >= 1940) {
    /* 기준일자 양력 1940년 1월 1일 (음력 1939년 11월 22일) */
    solYear = 1940;
    solMonth = 1;
    solDay = 1;
    lunYear = 1939;
    lunMonth = 11;
    lunDay = 22;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 1940 년 2월 28일 */
    lunMonthDay = 29; /* 1939년 11월 */
  } else if (year >= 1920) {
    /* 기준일자 양력 1920년 1월 1일 (음력 1919년 11월 11일) */
    solYear = 1920;
    solMonth = 1;
    solDay = 1;
    lunYear = 1919;
    lunMonth = 11;
    lunDay = 11;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 1920 년 2월 28일 */
    lunMonthDay = 30; /* 1919년 11월 */
  } else if (year >= 1900) {
    /* 기준일자 양력 1900년 1월 1일 (음력 1899년 12월 1일) */
    solYear = 1900;
    solMonth = 1;
    solDay = 1;
    lunYear = 1899;
    lunMonth = 12;
    lunDay = 1;
    lunLeapMonth = 0;
    solMonthDay[1] = 28; /* 1900 년 2월 28일 */
    lunMonthDay = 30; /* 1899년 12월 */
  } else if (year >= 1880) {
    /* 기준일자 양력 1880년 1월 1일 (음력 1879년 11월 20일) */
    solYear = 1880;
    solMonth = 1;
    solDay = 1;
    lunYear = 1879;
    lunMonth = 11;
    lunDay = 20;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 1880 년 2월 28일 */
    lunMonthDay = 30; /* 1879년 11월 */
  } else if (year >= 1860) {
    /* 기준일자 양력 1860년 1월 1일 (음력 1859년 12월 9일) */
    solYear = 1860;
    solMonth = 1;
    solDay = 1;
    lunYear = 1859;
    lunMonth = 12;
    lunDay = 9;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 1860 년 2월 28일 */
    lunMonthDay = 30; /* 1859년 12월 */
  } else if (year >= 1840) {
    /* 기준일자 양력 1840년 1월 1일 (음력 1839년 11월 27일) */
    solYear = 1840;
    solMonth = 1;
    solDay = 1;
    lunYear = 1839;
    lunMonth = 11;
    lunDay = 27;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 1840 년 2월 28일 */
    lunMonthDay = 30; /* 1839년 11월 */
  } else if (year >= 1820) {
    /* 기준일자 양력 1820년 1월 1일 (음력 1819년 11월 16일) */
    solYear = 1820;
    solMonth = 1;
    solDay = 1;
    lunYear = 1819;
    lunMonth = 11;
    lunDay = 16;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 1820 년 2월 28일 */
    lunMonthDay = 30; /* 1819년 11월 */
  } else if (year >= 1800) {
    /* 기준일자 양력 1800년 1월 1일 (음력 1799년 12월 7일) */
    solYear = 1800;
    solMonth = 1;
    solDay = 1;
    lunYear = 1799;
    lunMonth = 12;
    lunDay = 7;
    lunLeapMonth = 0;
    solMonthDay[1] = 28; /* 1800 년 2월 28일 */
    lunMonthDay = 30; /* 1799년 12월 */
  }
  return {
    solYear: solYear,
    solMonth: solMonth,
    solDay: solDay,
    lunYear: lunYear,
    lunMonth: lunMonth,
    lunDay: lunDay,
    solMonthDay: solMonthDay,
    lunLeapMonth: lunLeapMonth,
    lunMonthDay: lunMonthDay
  };
}
// 양력/음력, 음력/양력 변환
// 인수 : 년,월,일, 타입(1이면 양력을 음력으로 2이면 음력을 양력으로), 음력일 경우 윤달인지(0이면 평달, 1이면 윤달)
function calcLunar(year, month, day, type, leapmonth) {
  var baseDate = getBaseDate(year);
  var solYear = baseDate.solYear;
  var solMonth = baseDate.solMonth;
  var solDay = baseDate.solDay;
  var lunYear = baseDate.lunYear;
  var lunMonth = baseDate.lunMonth;
  var lunDay = baseDate.lunDay;
  var solMonthDay = baseDate.solMonthDay;
  var lunLeapMonth = baseDate.lunLeapMonth;
  var lunMonthDay = baseDate.lunMonthDay;
  while (true) {
    // 기준 년월일을 하루씩 늘려서 입력된 날짜와 같으면 그값을 리턴한다.
    if (type == 1 && year == solYear && month == solMonth && day == solDay) {
      // 날짜가 양력과 일치하면 음력을 리턴
      return {
        solYear: solYear,
        solMonth: solMonth,
        solDay: solDay,
        lunYear: lunYear,
        lunMonth: lunMonth,
        lunDay: lunDay,
        leapMonth: lunLeapMonth == 1 // 윤달 인지를 리턴
      };
    }
    if (
      type == 2 &&
      year == lunYear &&
      month == lunMonth &&
      day == lunDay &&
      leapmonth == lunLeapMonth
    ) {
      // 날짜가 음력과 일치하면 양력을 리턴
      return {
        solYear: solYear,
        solMonth: solMonth,
        solDay: solDay,
        lunYear: lunYear,
        lunMonth: lunMonth,
        lunDay: lunDay,
        leapMonth: lunLeapMonth == 1 // 윤달 인지를 리턴
      };
    }
    //------------------------------------------------------------------------
    // 양력날짜를 더한다.
    if (solMonth == 12 && solDay == 31) {
      // 12월에 31일이면 년도 증가 1월 1일
      solYear++;
      solMonth = 1;
      solDay = 1;
      /* 윤년이면 2월을 29일로 */
      solMonthDay[1] = isLeapYear(solYear) ? 29 : 28;
    } else if (solMonthDay[solMonth - 1] == solDay) {
      // 일이 마지막 날이면 월증가 일이 1
      solMonth++;
      solDay = 1;
    } else {
      // 아니면 날짜 증가
      solDay++;
    }
    //------------------------------------------------------------------------
    // 음력 데이터 (평달 - 작은달 :1,  큰달:2 )
    // (윤달이 있는 달 - 평달이 작고 윤달도 작으면 : 3 , 평달이 작고 윤달이 크면 : 4)
    // (윤달이 있는 달 - 평달이 크고 윤달이 작으면 : 5,  평달과 윤달이 모두 크면 : 6)
    // 음력 날짜를 더한다.
 
    // 년도를 계산하기 위하여 인덱스 값 변경 1799년부터 이므로 년도에서 1799를 뺀다.
    var lunIndex = lunYear - 1799;
    if (
      lunMonth == 12 &&
      ((lunarMonthTable[lunIndex][lunMonth - 1] == 1 && lunDay == 29) || // 작은달 말일
        (lunarMonthTable[lunIndex][lunMonth - 1] == 2 && lunDay == 30)) // 큰달 말일
    ) {
      // 12월 말일이면 년도증가 월일은 1일로
      lunYear++;
      lunMonth = 1;
      lunDay = 1;
 
      // 년도가 변경되었으므로 인덱스값 조정
      lunIndex = lunYear - 1799;
      // 1월의 마지막 날짜가 큰달인지 작은달인지 판단한다.
      if (lunarMonthTable[lunIndex][lunMonth - 1] == 1) {
        lunMonthDay = 29;
      } else if (lunarMonthTable[lunIndex][lunMonth - 1] == 2) {
        lunMonthDay = 30;
      }
    } else if (lunDay == lunMonthDay) {
      // 말일이라면 월과 마지막 날짜를 다시 조정한다.
      if (lunarMonthTable[lunIndex][lunMonth - 1] >= 3 && lunLeapMonth == 0) {
        // 윤달이라면 (배열 값이 3이상)
        lunDay = 1;
        lunLeapMonth = 1; // 윤달
      } else {
        // 평달이라면
        lunMonth++;
        lunDay = 1;
        lunLeapMonth = 0; // 평달
      }
      // 월의 마지막 날짜 계산
      if (lunarMonthTable[lunIndex][lunMonth - 1] == 1) {
        // 평달이면서 작은달은 29일
        lunMonthDay = 29;
      } else if (lunarMonthTable[lunIndex][lunMonth - 1] == 2) {
        // 평달이면서 큰달은 30일
        lunMonthDay = 30;
      } else if (lunarMonthTable[lunIndex][lunMonth - 1] == 3) {
        // 윤달이 있는 달이면 (평달이 작고 윤달도 작으면 : 3)
        lunMonthDay = 29;
      } else if (
        lunarMonthTable[lunIndex][lunMonth - 1] == 4 &&
        lunLeapMonth == 0
      ) {
        // 윤달이 있는 달이면 (평달이 작고 윤달이 크면 : 4)  -- 평달이라면
        lunMonthDay = 29;
      } else if (
        lunarMonthTable[lunIndex][lunMonth - 1] == 4 &&
        lunLeapMonth == 1
      ) {
        // 윤달이 있는 달이면 (평달이 작고 윤달이 크면 : 4)  -- 윤달이라면
        lunMonthDay = 30;
      } else if (
        lunarMonthTable[lunIndex][lunMonth - 1] == 5 &&
        lunLeapMonth == 0
      ) {
        // 윤달이 있는 달이면 (평달이 크고 윤달이 작으면 : 5)  -- 평달이라면
        lunMonthDay = 30;
      } else if (
        lunarMonthTable[lunIndex][lunMonth - 1] == 5 &&
        lunLeapMonth == 1
      ) {
        // 윤달이 있는 달이면 (평달이 크고 윤달이 작으면 : 5)  -- 윤달이라면
        lunMonthDay = 29;
      } else if (lunarMonthTable[lunIndex][lunMonth - 1] == 6) {
        // 윤달이 있는 달이면 ( 평달과 윤달이 모두 크면 : 6)
        lunMonthDay = 30;
      }
    } else {
      // 일 증가
      lunDay++;
    }
  }
}
/**
 * 입력한 양력 날짜로 음력 날짜 반환
 */
function getLunar(year, month, day) {
  var o = calcLunar(year, month, day, 1);
  o.dayOfWeekStr = getDayOfWeekStr(year, month, day);
  o.dayOfWeekNum = getDayOfWeekNum(year, month, day);
  return o;
}
 
/**
 * 입력한 음력 날짜로 양력 날짜 반환
 * isLeapMonth : 입력한 음력 날짜가 윤달인가?
 */
function getSolar(year, month, day, isLeapMonth) {
  var o = calcLunar(year, month, day, 2, isLeapMonth ? 1 : 0);
  o.dayOfWeekStr = getDayOfWeekStr(o.solYear, o.solMonth, o.solDay);
  o.dayOfWeekNum = getDayOfWeekNum(o.solYear, o.solMonth, o.solDay);
  return o;
}
// =====================================================================================================
// 내용, 월, 일, 양(1)/음(2)
var holidayTable = [
  ["신정", 1, 1, 1],
  //  ["설 전날", 12, 0, 2],
  ["설날", 1, 1, 2],
  ["설 다음날", 1, 2, 2],
  ["3·1절", 3, 1, 1],
  ["석가탄신일", 4, 8, 2],
  ["어린이날", 5, 5, 1],
  ["현충일", 6, 6, 1],
  ["광복절", 8, 15, 1],
  ["추석 전날", 8, 14, 2],
  ["추석", 8, 15, 2],
  ["추석 다음날", 8, 16, 2],
  ["개천절", 10, 3, 1],
  ["한글날", 10, 9, 1],
  ["성탄절", 12, 25, 1],
  ["내생일", 11, 24, 2],
  ["큰아들생일", 8, 22, 1],
  ["쌍둥이생일", 2, 5, 1],
  ["마눌생일", 7, 29, 2],
  ["부제사", 5, 9, 2],
  ["조부제사", 8, 1, 2],
  ["조모제사", 10, 22, 2]
];
//------------------------------------------------------------------------------------------------------
// 휴일 계산하기
/**
 * 양력, 음력 타입에 맞게 휴일인가?(일요일 포함)
 * isLunar : 입력한 날짜가 음력 기준인가?
 * isLeapMonth : 입력한 날짜가 음력이면서 윤달인가?
 */
function isHoliday(year, month, day, isLunar, isLeapMonth) {
  // 여기에서 getLunar나 getSolar를 호출하도록 변경해야 한다
  // var obj = getLunar(year, month, day, isLunar ? 2 : 1, isLeapMonth ? 1 : 0);
  var obj = null;
  if (isLunar) {
    obj = getSolar(year, month, day, isLeapMonth);
  } else {
    obj = getLunar(year, month, day);
  }
 
  var holiday = getHoliday(obj);
  if (holiday == null) {
    if (obj.dayOfWeekNum == 0) {
      return ["일", 0, 0, obj.dayOfWeekNum];
    } else if (obj.dayOfWeekNum == 6) {
      return ["토", 0, 0, obj.dayOfWeekNum];
    } else {
      return ["평", 0, 0, 0, obj.dayOfWeekNum];
    }
  } else {
    return holiday;
  }
}
/**
 * 휴일을 체크하여 휴일일 경우 휴일 데이터 반환
 */
function getHoliday(obj) {
  //alert(obj);
  var i;
  var addHolidays = ["설 전날", 12, 0, 2]; //가변적인 설 전날
 
  // 전년도 12월의 마지막날짜를 읽어온다.
  if (lunarMonthTable[obj.solYear - 1 - 1799][11] == 1) {
    //
    addHolidays[2] = 29;
  } else if (lunarMonthTable[obj.solYear - 1 - 1799][11] == 2) {
    addHolidays[2] = 30;
  }
  // 12월 말일이면
  if (addHolidays[1] == obj.lunMonth && addHolidays[2] == obj.lunDay) {
    return addHolidays; // addHolidays 객체를 리턴
  }
  // 배열을 반복하면서 같은지 검색
  for (i = 0; i < holidayTable.length; i++) {
    if (
      holidayTable[i][3] == 1 && // 양력
      holidayTable[i][1] == obj.solMonth && // 양력 월
      holidayTable[i][2] == obj.solDay // 양력 일
    ) {
      return holidayTable[i]; // 리턴
    }
    if (
      !obj.leapMonth && // 윤달이 아니면서
      holidayTable[i][3] == 2 && // 음력
      holidayTable[i][1] == obj.lunMonth && // 음력 월
      holidayTable[i][2] == obj.lunDay // 음력 일
    ) {
      return holidayTable[i];
    }
  }
  return null;
}
if (date == '12/25') {
    path = 'img/grp/christmas.jpg';
} else if (['3/1', '6/6', '7/17', '8.15', '10/1', '10/3', '10/9'].includes(date)) {
    path = 'img/grp/grp_ko.jpg';
} else if ([' 12/31','1/1','1/2','8/14','8/15','8/16'].includes(calcLunar((new Date()).getFullYear(), ((new Date()).getMonth() + 1), (new Date()).getDate(), 1).lunMonth+'/'+calcLunar((new Date()).getFullYear(), ((new Date()).getMonth() + 1), (new Date()).getDate(), 1).lunDay)) {
    path = 'img/grp/grp_holid.jpg';
}
fileList.forEach((e) => {
    fs.readFile(e, function (err, data) {
        if (err) throw err;
        data = data.toString().split('\n');
        data[13] = '    <meta property="og:image" content="' + path + '">'+'<!--작동 확인-->';
        data = data.join('\n');
        fs.writeFile(e, data, function (err) { err || console.log('Data replaced \n', data); });
    });
});
