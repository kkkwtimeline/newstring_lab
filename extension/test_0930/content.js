chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //alert(request);
  sendResponse({
    articleUrl: window.location.href,
    articleHeadline: document.querySelector("#articleTitle").innerText,
  });
});
