var button = document.querySelector(".btn-slide");

button.addEventListener("click", function (e) {
  var a = document.querySelector(".circle").style;
  a.color = "#0084ff";
  a.left = "100%";
  a.marginLeft = "-45px";
  a.backgroundColor = "#fdfdfd";
  var b = document.querySelector(".title").style;
  b.right = "50px";
  b.opacity = "1";
  b.color = "white";

  var c = document.querySelector(".title-hover").style;
  c.right = "40px";
  c.opacity = "1";
  document.querySelector(".title").innerHTML =
    '<i class="fa fa-spinner fa-spin"></i> &nbsp;&nbsp;&nbsp;&nbsp; Logging into Account';
  document.querySelector(".service_messenger").style.backgroundColor =
    "#0084ff";
});
