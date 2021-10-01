chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //alert(request);
  sendResponse({
    articleUrl: window.location.href,
    articleHeadline: document.querySelector("#articleTitle").innerText,
    articleTime: document.querySelector("span.t11").innerText,
  });
});
