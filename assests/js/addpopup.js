function add(addlink, boxid) {
  let formval = $(boxid + " #formadd");

  formval.submit(function (event) {
    event.preventDefault();
    if (
      $(boxid + " #formadd > div > input").val().length != "0" &&
      $(boxid + " #formadd > div > input")
        .val()
        .trim() != "" &&
      $(boxid + " #formadd > div > input")
        .val()
        .trim().length != "0"
    ) {
      $.ajax({
        type: "POST",
        url: addlink,
        data: formval.serialize(),
        success: function (data) {
          console.log("Sucessful add to datbase");
          console.log(data.data);
        },
        error: function (err) {
          console.log("Error add to datbase");
        },
      });
      $(boxid + " #formadd > div > input").val("");
      $(boxid + " .close").click();
    }
  });
}
