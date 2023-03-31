function domObject(data) {
  var getlink,
    editlink,
    deletelink,
    name,
    content,
    datamodel,
    datamodelid,
    price;
  $("#togglebox #nodata").hide();
  if (data.base == "vehicle") {
    getlink = "/getMonths/?id=" + data.data._id + "&vname=" + data.data.vname;
    name = data.data.vname;
    datamodel = "#myModal3" + data.data._id;
    datamodelid = "myModal3" + data.data._id;
    editlink = "/updateVehicalName/?id=" + data.data._id;
    content = "Update Vehical Name";
    deletelink = "/deleteVehicle/?id=" + data.data._id;
  } else if (data.base == "personal") {
    getlink =
      "/getPersonalMonth/?id=" + data.data._id + "&vname=" + data.data.title;
    name = data.data.title;
    datamodel = "#myModal4" + data.data._id;
    datamodelid = "myModal4" + data.data._id;
    editlink = "/updatePersonal/?id=" + data.data._id;
    content = "Update Other Name";
    deletelink = "/deletePersonal/?id=" + data.data._id;
  } else if (data.base == "vehicleMonth") {
    getlink = "/getJAO/?id=" + data.data._id;
    name = data.data.mname;
    datamodel = "#myModal2" + data.data._id;
    datamodelid = "myModal2" + data.data._id;
    editlink = "/updateMonth/?id=" + data.data._id;
    content = "Update Month Name";
    deletelink = "/deleteMonth/?id=" + data.data._id;
  } else if (data.base == "personalMonth") {
    //card2 start
    getlink = "/getThisExpenseDetail/?id=" + data.data._id + "&key=3";
    name = data.data.title;
    datamodel = "#myModal2" + data.data._id;
    datamodelid = "myModal2" + data.data._id;
    editlink = "/updatePersonalMonth/?id=" + data.data._id;
    content = "Update Month Name";
    deletelink = "/deletePersonalMonth/?id=" + data.data._id;
    price = data.data.price;
  } else if (data.base == "vehicleOther") {
    getlink = "/getThisExpenseDetail/?id=" + data.data._id;
    name = data.data.oname;
    datamodel = "#myModal" + data.data._id;
    datamodelid = "myModal" + data.data._id;
    editlink = "/updateOtherExpensive/?id=" + data.data._id;
    content = "Update Name";
    deletelink = "/deleteOtherExpensive/?id=" + data.data._id;
    price = data.data.totalPrice;
  } else if (data.base == "journeyobject") {
    //card3 start
    return $(`<div class="btn btn-default btn-lg" role="button" style="margin: 5px">
    <a
      href="/getThisJourney/?id=${data.data._id}"
      style="text-decoration: none; color: black"
    >
      <p>Profit : ₹ ${data.data.profit}</p>
      <h3 class="text-capitalize">${data.data.jname}</h3></a
    >
    <a href="/deleteThisJourney/?id=${data.data._id}"
      ><button class="btn btn-danger">Delete</button></a
    >
  </div>`);
  }
  return $(`<div class="btn btn-default btn-lg" role="button" style="margin: 5px">
    <a href="${getlink}" style="text-decoration: none; color: black">
    
      ${price != undefined ? "<h4>Total Spend : ₹" + price + "</h4>" : ""}
    
    <h3 class="text-capitalize">${name}</h3>
    </a>
    <button
      class="btn btn-warning"
      data-toggle="modal"
      data-target="${datamodel}"
    >
      Edit
    </button>
    <!-- Modal 1-->
    <div class="modal fade" id="${datamodelid}" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
            
            <h4 class="modal-title">${content}</h4>
          </div>
          <form action="${editlink}" method="post" class="form-group">
            <div class="modal-body">
              <input
                type="text"
                name="title"
                class="form-control"
                value="${name}"
                autofocus
                required
              />
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-success">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <a href="${deletelink}"><button class="btn btn-danger">Delete</button></a>
  </div>
  `);
}
