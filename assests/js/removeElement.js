function removeElement(dlink, did) {
  $.ajax({
    type: "GET",
    url: dlink,
    success: function (data) {
      console.log("delete conform ", data.data);
      $("#" + did).remove();
      if (
        $("#togglebox").children("div #nodata").length == "1" &&
        $("#togglebox").children("div").length == "1"
      ) {
        $("#nodata").css("display", "block");
      } else if (
        $("#togglebox").children("div #nodata").length == 0 &&
        $("#togglebox").children("div").length == "0"
      ) {
        $("#togglebox").append(() => {
          return $(`<div class="container-fluid" style="overflow: hidden; z-index: -1" id="nodata">
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
              margin: 25px 0px;
              z-index: -25;
            "
          >
            <img
              src="/assest/image/nodata.png"
              style="
                vertical-align: middle;
                width: inherit;
                height: inherit;
                border-radius: inherit;
                z-index: -25;
              "
            />
          </div>
        </div>
        `);
        });
      }
    },
    error: function (err) {
      console.log("delete in dom object");
    },
  });
}
