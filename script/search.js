/*
2020 @franknoh search.js
*/

limit = 5;

// https://www.w3schools.com/code/tryit.asp?filename=GKXQ2E5A8VDG

Array.prototype.in = function (arg) {
  var t = false;
  this.forEach((e) => {
    if (e.toUpperCase().indexOf(arg.toUpperCase()) != -1) {
      t = e;
    }
  })
  return t;
};

var search = [
  {
    'keys': ['2', 'asdf'],
    'location': '000'
  },
  {
    'keys': ['300', 'aser'],
    'location': '0001'
  }
];

var search_res;

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

/////////////////////////////////////////////////////////////////////////////////////////

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
    search_res.forEach((f) => {
      if (limit > 0) {
        b = document.createElement("TR");
        b.className = 'mid'
        e = document.createElement("TD");
        var l = f[1];
        e.innerHTML = strong(val, l) + "<input type='hidden' value='" + l + "'>";;
        b.appendChild(e);
        d.appendChild(b);
      }
    });
    var s = Array.from(document.getElementsByClassName('mid')).reverse()[0];
    if (!!s) {
      s.classList.remove("mid");
      s.id = 'last';
    }
    /*
    for (i = 0; i < arr.length; i++) {
      //check if the item starts with the same letters as the text field value:
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        //create a DIV element for each matching element:
        b = document.createElement("DIV");
        //make the matching letters bold:
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        //insert a input field that will hold the current array item's value:
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        //execute a function when someone clicks on the item value (DIV element):
        b.addEventListener("click", function (e) {
          //insert the value for the autocomplete text field:
          inp.value = this.getElementsByTagName("input")[0].value;
          //close the list of autocompleted values,
          //(or any other open lists of autocompleted values:
          closeAllLists();
        });
        a.appendChild(b);
      }
    }//*/
  });
  //execute a function presses a key on the keyboard:
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      //if the arrow DOWN key is pressed,
      //increase the currentFocus variable:
      currentFocus++;
      //and and make the current item more visible:
      addActive(x);
    } else if (e.keyCode == 38) { //up
      //If the arrow UP key is pressed,
      //decrease the currentFocus variable:
      currentFocus--;
      //and and make the current item more visible:
      addActive(x);
    } else if (e.keyCode == 13) {
      //If the ENTER key is pressed, prevent the form from being submitted,
      e.preventDefault();
      if (currentFocus > -1) {
        //and simulate a click on the "active" item:
        if (x) x[currentFocus].click();
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
