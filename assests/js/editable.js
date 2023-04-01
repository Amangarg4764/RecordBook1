function edit(editlink, boxid) {
  let formval = $(boxid + " #formedit");

  formval.submit(function (event) {
    event.preventDefault();
    if (
      $(boxid + " #formedit > div > input").val().length != "0" &&
      $(boxid + " #formedit > div > input")
        .val()
        .trim() != "" &&
      $(boxid + " #formedit > div > input")
        .val()
        .trim().length != "0"
    ) {
      $.ajax({
        type: "POST",
        url: editlink,
        data: formval.serialize(),
        success: function (data) {
          console.log("Sucessful edit to datbase");
          $(`#${data.data} > a > h3`).html(
            $(boxid + " #formedit > div > input").val()
          );
        },
        error: function (err) {
          console.log("Error add to datbase");
        },
      });
      $(boxid + " .close").click();
    }
  });
}
