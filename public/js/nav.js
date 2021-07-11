function openPage(pageName) {
  var i, tabcontent;
  tabcontent = document.getElementsByClassName("navtabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(pageName).style.display = "block";
}

document.getElementById("defaultOpen").click();
