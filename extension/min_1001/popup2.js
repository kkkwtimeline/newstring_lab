// 2021-01-01 형식으로 날짜를 반환하는 함수
function today() {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const today = `${year}-${month >= 10 ? month : "0" + month}-${
    date >= 10 ? date : "0" + date
  }`;
  return today;
}

// addEventListener 의 콜백함수로 " " 영역을 content.js 로 전달할 수 있으며 requestApi 콜백함수를 실행
function onclick() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, " ", requestApi);
  });
}

// content.js 로 부터 기사의 링크와 헤드라인을 res 객체로 받아온다
// 받아온 헤드라인을 빅카인즈 뉴스검색api 쿼리로 전달
// 응답을 바탕으로 showArticleInfoFromApi 함수 실행
function requestApi(res) {
  const datas = {
    access_key: "9af2f705-2974-4340-8b55-d69040b944ab",

    argument: {
      query: res.articleHeadline,
      published_at: {
        from: "2018-01-01",
        until: today(),
      },
      provider: ["한겨레"],
      category: [""],
      category_incident: [""],
      byline: "",
      provider_subject: [""],
      subject_info: [""],
      subject_info1: [""],
      subject_info2: [""],
      subject_info3: [""],
      subject_info4: [""],
      sort: {date: "asc"},
      hilight: 200,
      return_from: 0,
      return_size: 2,
      fields: [
        "byline",
        "category",
        "category_incident",
        "provider_news_id",
        "hilight",
      ],
    },
  };
  const url = "http://tools.kinds.or.kr:8888/search/news";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datas),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => showArticleInfoFromApi(data));
  
  document.getElementById("subscribe").style.display = "none";
  document.getElementById("unsubscribe").style.display = "";
}

// extention팝업창에 본 기사의 id를 생성
function createIdDiv(data) {
  const idDiv = document.createElement("div");
  idDiv.textContent = data["return_object"]["documents"][0]["title"];
  document.body.appendChild(idDiv);
}

// extention팝업창에 본 기사의 headline을 생성
function createHeadlineDiv(data) {
  const titleDiv = document.createElement("div");
  titleDiv.textContent = data["return_object"]["documents"][0]["news_id"];
  document.body.appendChild(titleDiv);
}

function showArticleInfoFromApi(data) {
  createIdDiv(data);
  createHeadlineDiv(data);
}

// 익스텐션 켜지자마자 페이지의 url, title, 기사작성 시간 획득
function naver_title_extraction(results){
  document.querySelector('#url').value=results.articleUrl;
  document.querySelector('#title').value=results.articleHeadline;
  let x = document.getElementsByClassName("title_text")[0];
  x.innerText=results.articleHeadline; 
  document.querySelector('#time').value=results.articleTime;
}

// 구독 버튼 클릭시 서버로 정보 전달
function api_server_send(e){
  const params = {
      "article_url":document.querySelector('#url').value,
      "title":document.querySelector('#title').value,
      "time":document.querySelector('#time').value
  };

  const url = "https://newsstring.run.goorm.io/items/";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => showArticleInfoFromApi(data));
  
  document.getElementById("subscribe").style.display = "none";
  document.getElementById("unsubscribe").style.display = "";
  // var extraction_btn = document.querySelector('#extraction')

  // extraction_btn.value="✔"
}


function unsubscribe_click() {
  document.getElementById("unsubscribe").style.display = "none";
  document.getElementById("subscribe").style.display = "";
  }

function similar_newspage(){
  document.getElementById("unsubscribe").style.display = "none";
  document.getElementById("subscribe").style.display = "none";
  document.getElementById("page_1_item_01").style.display = "none";
  document.getElementById("page_1_item_02").style.display = "none";
}

function timeline_newspage(){
  document.getElementById("unsubscribe").style.display = "none";
  document.getElementById("subscribe").style.display = "none";
  document.getElementById("page_1_item_01").style.display = "none";
  document.getElementById("page_1_item_02").style.display = "none";
}

// popup.html button EventListener
function listener() {
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      
      chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, " ", naver_title_extraction);
      });
      
      var unsubscribe_01 = document.querySelector('#unsubscribe');
      var similar_articles_01 = document.querySelector('#similar_articles');
      var time_line_01 = document.querySelector('#time_line');
      var subscribe_01 = document.querySelector('#subscribe');

      subscribe_01.addEventListener("click", api_server_send, false); // 기사획득 버튼 누르면 실행.addEventListener("click",api_server_send); // 기사획득 버튼 누르면 실행
      unsubscribe_01.addEventListener("click",unsubscribe_click); // 구독버튼 비활성화 구독취소 활성화("✔")
      similar_articles_01.addEventListener("click",similar_newspage); // 나머지 페이지에서 사용하는 div를 전부 숨김 유사기사 페이지에서 사용하는 div만 표출
      time_line_01.addEventListener("click",timeline_newspage); // 나머지 페이지에서 사용하는 div를 전부 숨김 타임라인 페이지에서 사용하는 div만 표출
      

     
    },
    false
  );
}

// execute script
listener();

