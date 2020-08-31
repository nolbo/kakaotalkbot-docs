/*
2020 @franknoh search.js
*/

function copyToClipboard(elem) {
    // create hidden text element, if it doesn't already exist
  var targetId = "_hiddenCopyText_";
  var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
  var origSelectionStart, origSelectionEnd;
  if (isInput) {
      // can just use the original source element for the selection and copy
      target = elem;
      origSelectionStart = elem.selectionStart;
      origSelectionEnd = elem.selectionEnd;
  } else {
      // must use a temporary form element for the selection and copy
      target = document.getElementById(targetId);
      if (!target) {
          var target = document.createElement("textarea");
          target.style.position = "absolute";
          target.style.left = "-9999px";
          target.style.top = "0";
          target.id = targetId;
          document.body.appendChild(target);
      }
      target.textContent = elem.textContent;
  }
  // select the content
  var currentFocus = document.activeElement;
  target.focus();
  target.setSelectionRange(0, target.value.length);
  
  // copy the selection
  var succeed;
  try {
        succeed = document.execCommand("copy");
  } catch(e) {
      succeed = false;
  }
  // restore original focus
  if (currentFocus && typeof currentFocus.focus === "function") {
      currentFocus.focus();
  }
  
  if (isInput) {
      // restore prior selection
      elem.setSelectionRange(origSelectionStart, origSelectionEnd);
  } else {
      // clear temporary content
      target.textContent = "";
  }
  return succeed;
}

var error_codes = {
  //'example_name' : 'div#1-1-1'
};

var base = location.origin+'/'

function glide(pos) {
  /*$("html").animate({
      scrollTop: $(pos).offset().top - 155
  }, 1500, "swing");*/
  $("html").scrollTop($(pos).offset().top - 155);
}
$(document).ready(function() {
  if (decodeURIComponent(location.href).startsWith(base + "?")) {
      var url = decodeURIComponent(location.href.replace(/\+/g, ' ')).substring(base.length + 1).trim();
      if (url.startsWith("search=")) {
          var search_text = url.substring("search=".length);
          //초기화
          document.getElementById('search').value = search_text;
          //이동
          var searched = false;
          var searching = true;
          var title = [];
          var contents = [];
          for (var i = 0; i < document.getElementsByClassName("content").length; i++) {
              if (searching == true) {
                  if (!!document.getElementsByClassName("content")[i].getElementsByClassName("content")) {
                      for (var j = 0; j < document.getElementsByClassName("content")[i].getElementsByClassName("content").length; j++) {
                          if (document.getElementsByClassName("content")[i].getElementsByClassName("content")[j].getElementsByTagName("p")[0].innerText.toLowerCase().replace(/ /g, "").trim().indexOf(search_text.toLowerCase().replace(/ /g, "").trim()) != -1) {
                              title.push("div#" + document.getElementsByClassName("content")[i].getElementsByClassName("content")[j].id);
                              searched = true;
                          } else if(document.getElementsByClassName("content")[i].getElementsByClassName("content")[j].innerText.toLowerCase().replace(/ /g, "").trim().indexOf(search_text.toLowerCase().replace(/ /g, "").trim()) != -1){
                              contents.push("div#" + document.getElementsByClassName("content")[i].getElementsByClassName("content")[j].id);
                              searched = true;
                          }
                      }
                  }
                  if (document.getElementsByClassName("content")[i].innerText.toLowerCase().replace(/ /g, "").trim().indexOf(search_text.toLowerCase().replace(/ /g, "").trim()) != -1) {
                      if (document.getElementsByClassName("content")[i].getElementsByTagName("p")[0].innerText.toLowerCase().replace(/ /g, "").trim().indexOf(search_text.toLowerCase().replace(/ /g, "").trim()) != -1) {
                          title.push("div#" + document.getElementsByClassName("content")[i].id);
                          searched = true;
                      } else if (document.getElementsByClassName("content")[i].innerText.toLowerCase().replace(/ /g, "").trim().indexOf(search_text.toLowerCase().replace(/ /g, "").trim()) != -1) {
                          contents.push("div#" + document.getElementsByClassName("content")[i].id);
                          searched = true;
                      }
                  }
              }
          }
          if (searched == false || document.getElementById("body").innerText.toLowerCase().replace(/ /g, "").trim().indexOf(search_text.toLowerCase().replace(/ /g, "").trim()) == -1) {
              var inko = new Inko();
              if (document.getElementById("body").innerText.toLowerCase().replace(/ /g, "").trim().indexOf(inko.ko2en(search_text).toLowerCase().replace(/ /g, "").trim()) != -1) {
                  var searched = false;
                  var searching = true;
                  var title = [];
                  var contents = [];
                  for (var i = 0; i < document.getElementsByClassName("content").length; i++) {
                      if (searching == true) {
                          if (!!document.getElementsByClassName("content")[i].getElementsByClassName("content")) {
                              for (var j = 0; j < document.getElementsByClassName("content")[i].getElementsByClassName("content").length; j++) {
                                  if (document.getElementsByClassName("content")[i].getElementsByClassName("content")[j].getElementsByTagName("p")[0].innerText.toLowerCase().replace(/ /g, "").trim().indexOf(inko.ko2en(search_text).toLowerCase().replace(/ /g, "").trim()) != -1) {
                                      title.push("div#" + document.getElementsByClassName("content")[i].getElementsByClassName("content")[j].id);
                                      searched = true;
                                  } else if (document.getElementsByClassName("content")[i].getElementsByClassName("content")[j].innerText.toLowerCase().replace(/ /g, "").trim().indexOf(inko.ko2en(search_text).toLowerCase().replace(/ /g, "").trim()) != -1) {
                                      contents.push("div#" + document.getElementsByClassName("content")[i].getElementsByClassName("content")[j].id);
                                      searched = true;
                                  }
                              }
                          }
                          if (document.getElementsByClassName("content")[i].innerText.toLowerCase().replace(/ /g, "").trim().indexOf(inko.ko2en(search_text).toLowerCase().replace(/ /g, "").trim()) != -1) {
                              if (document.getElementsByClassName("content")[i].getElementsByTagName("p")[0].innerText.toLowerCase().replace(/ /g, "").trim().indexOf(inko.ko2en(search_text).toLowerCase().replace(/ /g, "").trim()) != -1) {
                                  title.push("div#" + document.getElementsByClassName("content")[i].id);
                                  searched = true;
                              } else if (document.getElementsByClassName("content")[i].innerText.toLowerCase().replace(/ /g, "").trim().indexOf(inko.ko2en(search_text).toLowerCase().replace(/ /g, "").trim()) != -1) {
                                  contents.push("div#" + document.getElementsByClassName("content")[i].id);
                                  searched = true;
                              }
                          }
                      }
                  }
                  new Toast({
                      message: '한-영 오타 수정입니다.\n' + search_text + '->' + inko.ko2en(search_text)
                  });
                  if (title[0]) {
                      glide(title[0]);
                  } else {
                      glide(contents[0]);
                  }
                  console.log(title.join("\n"));
                  console.log(contents.join("\n"));
              } else if (document.getElementById("body").innerText.toLowerCase().replace(/ /g, "").trim().indexOf(inko.en2ko(search_text).toLowerCase().replace(/ /g, "").trim()) != -1) {
                  var searched = false;
                  var searching = true;
                  var title = [];
                  var contents = [];
                  for (var i = 0; i < document.getElementsByClassName("content").length; i++) {
                      if (searching == true) {
                          if (!!document.getElementsByClassName("content")[i].getElementsByClassName("content")) {
                              for (var j = 0; j < document.getElementsByClassName("content")[i].getElementsByClassName("content").length; j++) {
                                  if (document.getElementsByClassName("content")[i].getElementsByClassName("content")[j].getElementsByTagName("p")[0].innerText.toLowerCase().replace(/ /g, "").trim().indexOf(inko.en2ko(search_text).toLowerCase().replace(/ /g, "").trim()) != -1) {
                                      title.push("div#" + document.getElementsByClassName("content")[i].getElementsByClassName("content")[j].id);
                                      searched = true;
                                  } else if (document.getElementsByClassName("content")[i].getElementsByClassName("content")[j].innerText.toLowerCase().replace(/ /g, "").trim().indexOf(inko.en2ko(search_text).toLowerCase().replace(/ /g, "").trim()) != -1) {
                                      contents.push("div#" + document.getElementsByClassName("content")[i].getElementsByClassName("content")[j].id);
                                      searched = true;
                                  }
                              }
                          }
                          if (document.getElementsByClassName("content")[i].innerText.toLowerCase().replace(/ /g, "").trim().indexOf(inko.en2ko(search_text).toLowerCase().replace(/ /g, "").trim()) != -1) {
                              if (document.getElementsByClassName("content")[i].getElementsByTagName("p")[0].innerText.toLowerCase().replace(/ /g, "").trim().indexOf(inko.en2ko(search_text).toLowerCase().replace(/ /g, "").trim()) != -1) {
                                  title.push("div#" + document.getElementsByClassName("content")[i].id);
                                  searched = true;
                              } else if (document.getElementsByClassName("content")[i].innerText.toLowerCase().replace(/ /g, "").trim().indexOf(inko.en2ko(search_text).toLowerCase().replace(/ /g, "").trim()) != -1) {
                                  contents.push("div#" + document.getElementsByClassName("content")[i].id);
                                  searched = true;
                              }
                          }
                      }
                  }
                  new Toast({
                      message: '영-한 오타 수정입니다.\n' + search_text + '->' + inko.en2ko(search_text)
                  });
                  if (title[0]) {
                      glide(title[0]);
                  } else if (contents[0]){
                      glide(contents[0]);
                  } else{
                      new Toast({
                          message: '알수없는 오류가 발생했습니다.',
                          type: 'warning'
                      });
                  }
                  console.log(title.join("\n"));
                  console.log(contents.join("\n"));
              } else {
                  new Toast({
                      message: '\'' + search_text + '\'라는 검색결과가 없습니다.',
                      type: 'danger'
                  });
              }
          } else if (searched == true) {
              if (title[0]) {
                  glide(title[0]);
              } else {
                  glide(contents[0]);
              }
              console.log(title.join("\n"));
              console.log(contents.join("\n"));
          }
      } else if(url.startsWith("error=")){
          var error_name = url.substring("error=".length);
          if(!!error_codes[error_name]){
             glide(error_codes[error_name]);
          } else {
              new Toast({
                  message: '\'' + error_name + '\'라는 검색결과가 없습니다.',
                  type: 'danger'
              });
          }
      } else {
          location.href = base + '404.html';
      }
  }
});