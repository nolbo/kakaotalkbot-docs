/*
2020 @franknoh search.js
*/

limit = 5;

var search = [
  {
    'keys': ['2', 'asdf'],
    'location': '000'
  },
  {
    'keys': ['1300', 'asser'],
    'location': '0001'
  },
  {
    'keys': ['3001', 'asder'],
    'location': '00101'
  },
  {
    'keys': ['3100', 'asedr'],
    'location': '01001'
  },
  {
    'keys': ['3010', 'asefr'],
    'location': '10001'
  },
  {
    'keys': ['300v', 'asvr'],
    'location': '000v1'
  }
];

////////////////////////////////////////////////////////////////////////////////////////////////////

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

$(() => {
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
      return l.split('').reverse().join('').substr(l.substr(l.toUpperCase().indexOf(s.toUpperCase())).length).split('').reverse().join('') + '<strong>' + s + '</strong>' + l.substr(l.indexOf(s)).substr(s.length)
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
