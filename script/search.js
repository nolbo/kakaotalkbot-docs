/*
2020 @franknoh search.js
*/

limit = 5;

////////////////////////////////////////////////////////////////////////////////////////////////////

location.get = function () {
  if (location.search < 3) {
    return {};
  } else {
    var s = {}
    t = location.search.substr(1).split('&');
    t.forEach((e) => {
      s[decodeURIComponent(e.split('=')[0].replaceAll('+', ' '))] = decodeURIComponent(e.split('=')[1].replaceAll('+', ' '));
    });
    return s;
  }
}

location.set = function(a){
  var b='';
  Object.keys(a).forEach((e)=>{b+=encodeURIComponent(e)+'='+encodeURIComponent(a[e])+'&'});
  if(b.reverse().startsWith('&')) b = b.reverse().substr(1).reverse();
  if(a!={}){
    location.search = b;
  }else{
    location.search = ''
  }
}

location.update = function(a){
  a;
}

Array.prototype.in = function (arg) {
  var t = false;
  this.forEach((e) => {
    if (e.toUpperCase().indexOf(arg.toUpperCase()) != -1) {
      t = e;
    }
  })
  return t;
};
var search_res;
var x;

function searchExec(r) {
  o = r;
  fnd = false;
  if (o.indexOf(' ') != -1) o = get_key(r);
  search.forEach((e) => {
    if (!!e.keys.in(o) && !fnd) {
      console.log(e.location)
      $([document.documentElement, document.body]).animate({
        scrollTop: $("#" + e.location).offset().top - 150
      }, 500);
      fnd = true;
    }
  });
  if (!fnd) setToast("'" + r + "' 이라는 검색결과가 없습니다.");
}

function get_key(txt) {
  var result = null;
  $.ajax({
    url: 'https://open-korean-text-api.herokuapp.com/extractPhrases?text=' + txt,
    type: 'get',
    dataType: 'json',
    async: false,
    success: function (data) {
      result = data;
    }
  });
  if (result.phrases[0]) {
    return result.phrases[0].split('(')[0];
  }
}

function submit(){
  location.update({'search': $('input#search_txt').val()});
}

$(() => {
  if (!!location.get().search && location.get().search != '') {
    if (['/full', '/full.html'].includes(location.pathname)) {
      setTimeout(() => {
        $('input#search_txt').val(location.get().search)
        searchExec(location.get().search);
      }, 500);
    } else {
      $.cookie('docs_search', location.get().search, { expires: 1 });
      location.href = 'full' + location.search;
    }
  }
  if (!!$.cookie('docs_search')) {
    searchExec($.cookie('docs_search'));
    $.removeCookie('docs_search');
  }
  $('#search_txt').keydown(function (event) {
    // enter has keyCode = 13, change it if you want to use another button
    if (event.keyCode == 13) {
      this.form.submit();
      return false;
    }
  });
  var inp = document.getElementById("search_txt")
  //the autocomplete function takes two arguments,
  //the text field element and an array of possible autocompleted values:
  var currentFocus;
  //execute a function when someone writes in the text field:
  var a, b, c, d, e;
  inp.addEventListener("input", function (e) {
    var val = this.value;
    //close any already open lists of autocompleted values
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    if (!document.getElementById('auto')) {
      //create a DIV element that will contain the items (values):
      a = document.createElement("DIV");
      a.setAttribute("id", "auto");
      a.className = 'auto-items';
      //append the DIV element as a child of the autocomplete container:
      this.parentNode.appendChild(a);
      c = document.createElement("TABLE");
      a.appendChild(c)
      d = document.createElement("TBODY");
      c.appendChild(d)
    }
    //for each item in the array...
    search_res = [];
    search.forEach((e) => {
      if (!!e.keys.in(val)) {
        search_res.push([e, e.keys.in(val)])
      }
    });
    function strong(s, l) {
      return l.split('').reverse().join('').substr(l.substr(l.toUpperCase().indexOf(s.toUpperCase())).length).split('').reverse().join('') + '<strong>' + l.substr(l.split('').reverse().join('').substr(l.substr(l.toUpperCase().indexOf(s.toUpperCase())).length).split('').reverse().join('').length).split('').reverse().join('').substr(l.substr(l.toUpperCase().indexOf(s.toUpperCase())).substr(s.length).length).split('').reverse().join('') + '</strong>' + l.substr(l.toUpperCase().indexOf(s.toUpperCase())).substr(s.length)
    }
    var nLim = limit;
    search_res.forEach((f) => {
      if (nLim > 0) {
        b = document.createElement("TR");
        b.className = 'mid'
        e = document.createElement("TD");
        var l = f[1];
        e.innerHTML = strong(val, l) + "<input type='hidden' value='" + l + "'>";
        e.addEventListener("click", function (g) {
          //insert the value for the autocomplete text field:
          inp.value = this.getElementsByTagName("input")[0].value;
          //close the list of autocompleted values,
          //(or any other open lists of autocompleted values:
          closeAllLists();
        });
        b.appendChild(e);
        d.appendChild(b);
        nLim--;
      }
    });
    var s = Array.from(document.getElementsByClassName('mid')).reverse()[0];
    if (!!s) {
      s.classList.remove("mid");
      s.id = 'last';
    }
  });
  //execute a function presses a key on the keyboard:
  inp.addEventListener("keydown", function (e) {
    x = document.getElementById("auto");
    if (x) x = x.getElementsByTagName("tr");
    if (e.key == "ArrowDown") {

      //if the arrow DOWN key is pressed,
      //increase the currentFocus variable:
      currentFocus++;
      //and and make the current item more visible:
      addActive(x);
    } else if (e.key == "ArrowUp") { //up
      //If the arrow UP key is pressed,
      //decrease the currentFocus variable:
      currentFocus--;
      //and and make the current item more visible:
      addActive(x);
    } else if (e.key == "Enter") {
      //If the ENTER key is pressed, prevent the form from being submitted,
      e.preventDefault();
      if (currentFocus > -1) {
        inp.value = x[currentFocus].innerText;
        //and simulate a click on the "active" item:
        x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    //a function to classify an item as "active":
    if (!x) return false;
    //start by removing the "active" class on all items:
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    //add class "autocomplete-active":
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    //a function to remove the "active" class from all autocomplete items:
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    //close all autocomplete lists in the document,
    //except the one passed as an argument:
    var x = document.getElementsByClassName("auto-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  //execute a function when someone clicks in the document:
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
});
