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
          elem.parentNode.appendChild(target);
      }
      target.textContent = elem.innerText.replace(/\n/g,'').replace(/{/g,'{\n').replace(/}/g,'\n}');
  }
  // select the content
  var currentFocus = document.activeElement;
  target.select();
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
  go(elem);
  new Toast({
    message: '복사되었습니다'
  });
  return succeed;
}
$(document).ready(function() {
    for(i=0;i<document.getElementsByTagName('pre').length;i++){
        $(document.getElementsByTagName('pre')[i]).dblclick(function(){
            copyToClipboard(this);
        });
    }
});
