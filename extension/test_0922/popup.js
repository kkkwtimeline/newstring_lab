function url_extraction(results){
    document.querySelector('#url').value=results;
}

function naver_title_extraction(results){
    document.querySelector('#title').value=results;
    let x = document.getElementsByClassName("title_text")[0];
    x.innerText=results; 
}

function naver_contents_extraction(results){
    document.querySelector('#contents').value=results;
}

function naver_time_extraction(results){
    document.querySelector('#time').value=results;
}


function api_server_send(e){
    
    var params = {
        "article_ulr":document.querySelector('#url').value,
        "title":document.querySelector('#title').value,
        "contents":document.querySelector('#contents').value,
        "time":document.querySelector('#time').value
    };

    url='https://newsstring.run.goorm.io/items/'; // FastAPI
    // url='https://newsstring.run.goorm.io/'; // Flask

    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', url);
    
    for (var key in params) {
        var hiddenField = document.createElement('input');
        hiddenField.setAttribute('type', 'hidden');
        hiddenField.setAttribute('name', key);
        hiddenField.setAttribute('value', params[key]);
        form.appendChild(hiddenField);
    }
    
    document.body.appendChild(form);
    form.submit();
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

document.addEventListener('DOMContentLoaded',function(){
    
    chrome.tabs.executeScript({code:"document.location.href;"},url_extraction);// 나중에 신문사별 다른 양식에 맞게 필드 지정하기 위해 url 획득.

    chrome.tabs.executeScript({code:"document.querySelector('#articleTitle').innerText;"},naver_title_extraction);
    // 익스텐션 창이아닌 크롬 창의 필드에서 타이틀 획득 후 naver_title_extraction함수로 전달/호출
    chrome.tabs.executeScript({code:"document.querySelector('#articleBodyContents').innerText;"},naver_contents_extraction);
    // 익스텐션 창이아닌 크롬 창의 필드에서 기사 획득 후 naver_contents_extraction 전달/호출
    chrome.tabs.executeScript({code:"document.querySelector('span.t11').innerText;"},naver_time_extraction);

    var subscribe_01 = document.querySelector('#subscribe');
    var unsubscribe_01 = document.querySelector('#unsubscribe');
    var similar_articles_01 = document.querySelector('#similar_articles');
    var time_line_01 = document.querySelector('#time_line');
    

    subscribe_01.addEventListener("click",api_server_send); // 기사획득 버튼 누르면 실행.addEventListener("click",api_server_send); // 기사획득 버튼 누르면 실행
    unsubscribe_01.addEventListener("click",unsubscribe_click); // 구독버튼 비활성화 구독취소 활성화("✔")
    similar_articles_01.addEventListener("click",similar_newspage); // 나머지 페이지에서 사용하는 div를 전부 숨김 유사기사 페이지에서 사용하는 div만 표출
    time_line_01.addEventListener("click",timeline_newspage); // 나머지 페이지에서 사용하는 div를 전부 숨김 타임라인 페이지에서 사용하는 div만 표출

});