
function extraction(e){

    chrome.tabs.executeScript({code:"document.location.href;"},url_extraction);// 나중에 신문사별 다른 양식에 맞게 필드 지정하기 위해 url 획득.

    chrome.tabs.executeScript({code:"document.querySelector('#articleTitle').innerText;"},naver_title_extraction);
    // 익스텐션 창이아닌 크롬 창의 필드에서 타이틀 획득 후 naver_title_extraction함수로 전달/호출
    chrome.tabs.executeScript({code:"document.querySelector('#articleBodyContents').innerText;"},naver_contents_extraction);
    // 익스텐션 창이아닌 크롬 창의 필드에서 기사 획득 후 naver_contents_extraction 전달/호출
}

function url_extraction(results){
    document.querySelector('#url').value=results;
}

function naver_title_extraction(results){
    document.querySelector('#title').value=results;
}

function naver_contents_extraction(results){
    document.querySelector('#contents').value=results;
}


document.addEventListener('DOMContentLoaded',function(){
    var btn01 = document.querySelector('#btn');
    btn01.addEventListener("click",extraction); // 기사획득 버튼 누르면 실행

});