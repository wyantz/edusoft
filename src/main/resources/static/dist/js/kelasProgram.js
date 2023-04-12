const APIs = {
  getKelasProgram: "http://localhost:8080/klpg/api/",
  deleteKelasProgram: "http://localhost:8080/klpg/api/",
  postKelasProgram: "http://localhost:8080/klpg/api/",
  patchKelasProgram: "http://localhost:8080/klpg/api/",
};

$(document).ready(function () {
  $("#KelasProgramTable").empty();
  $.getJSON(APIs.getKelasProgram, function (json) {
    var tr = [];
    tr.push("<thead>");
    tr.push("<tr>");
    tr.push("<th>ID</th>");
    tr.push("<th>Kode KLPG</th>");
    tr.push("<th>Actions</th>");
    tr.push("</tr>");
    tr.push("</thead>");
    tr.push("<tbody id='KelasProgramTableBody'>");

    for (var i = 0; i < json.length; i++) {
      tr.push("<tr>");
      tr.push("<td>" + json[i].id + "</td>");
      tr.push("<td>" + json[i].kode + "</td>");
      tr.push(
        "<td><button class='btn btn-primary edit'>Edit</button>&nbsp;&nbsp;<button class='btn btn-primary delete' id=" +
          json[i].id +
          ">Delete</button></td>"
      );
      tr.push("</tr>");
    }

    tr.push("</tbody>")

    $("#KelasProgramTable").append($(tr.join("")));
  });

  $(document).delegate(".delete", "click", function () {
    if (confirm("Hapus kelas program ini?")) {
      var id = $(this).attr("id");
      var parent = $(this).parent().parent();
      $.ajax({
        type: "DELETE",
        url: APIs.deleteKelasProgram + id,
        cache: false,
        success: function () {
          parent.fadeOut("slow", function () {
            $(this).reve();
          });
          location.reload(true);
        },
        error: function () {
          $("#err")
            .html(
              "<span style='color:red; font-weight: bold; font-size: 30px;'>Error deleting record"
            )
            .fadeIn()
            .fadeOut(4000, function () {
              $(this).remove();
            });
        },
      });
    }
  });

  $(document).delegate("#save", "click", function () {
    var parent = $(this).parent().parent();

    var id = parent.children("td:nth-child(1)");
    var kode = parent.children("td:nth-child(2)");

    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: APIs.postKelasProgram,
      data: JSON.stringify({
        id: id.html(),
        kode: kode.children("input[type=text]").val(),
      }),
      cache: false,
      success: function () {
        kode.html(kode.children("input[type=text]").val());
        buttons.html(
          "<button class='edit' id='" +
            id.html() +
            "'>Edit</button>&nbsp;&nbsp;<button class='delete' id='" +
            id.html() +
            "'>Delete</button>"
        );
      },
      error: function () {
        $("#err")
          .html(
            "<span style='color:red; font-weight: bold; font-size: 30px;'>Error updating record"
          )
          .fadeIn()
          .fadeOut(4000, function () {
            $(this).remove();
          });
      },
    });
  });

  $(document).delegate(".edit", "click", function () {
    var parent = $(this).parent().parent();
    var id = parent.children("td:nth-child(1)");
    var kode = parent.children("td:nth-child(2)");
    var buttons = parent.children("td:nth-child(3)");

    kode.html("<input type='text' id='txtName' value='" + kode.html() + "'/>");
    buttons.html(
      "<button class='btn btn-secondary' id='update'>Update</button>&nbsp;&nbsp;<button class='btn btn-secondary delete' id='" +
        id.html() +
        "'>Delete</button>&nbsp;&nbsp;<button class='btn btn-warning' id='cancel'>Cancel</button>"
    );
  });

  $(document).delegate("#TambahKelasProgram", "click", function (event) {
    event.preventDefault();

    var kodeKelasProgram = $("#kelasprogram").val();

    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: APIs.postKelasProgram,
      data: JSON.stringify({
        kode: kodeKelasProgram,
        createdBy: "surya", //ini nanti ngambil usernya gimana
      }),
      cache: false,

      success: function (result) {
        $("#msg").html(
          "<span style='color: green'>Berhasil menambahkan kelas program baru.</span>"
        );
        window.setTimeout(function () {
          location.reload();
        }, 1000);
      },
      error: function (err) {
        $("#msg").html(
          "<span style='color: red'>Gagal menambahkan kelas program baru.</span>"
        );
      },
    });
  });

  $(document).delegate("#cancel", "click", function () {
    var parent = $(this).parent().parent();

    var id = parent.children("td:nth-child(1)");
    var kode = parent.children("td:nth-child(2)");
    var buttons = parent.children("td:nth-child(3)");

    $(document).delegate("#update", "click", function () {
      var parent = $(this).parent().parent();

      var id = parent.children("td:nth-child(1)");
      var kode = parent.children("td:nth-child(2)");
      var buttons = parent.children("td:nth-child(3)");

      kode.html(kode.children("input[type=text]").val());
      buttons.html(
        "<button class='btn btn-primary edit' id='" +
          id.html() +
          "'>Edit</button>&nbsp;&nbsp;<button class='btn btn-primary delete' id='" +
          id.html() +
          "'>Delete</button>"
      );
    });

    $.ajax({
      type: "PATCH",
      contentType: "application/json; charset=utf-8",
      url: APIs.patchKelasProgram,
      data: JSON.stringify({
        id: id.html(),
        kode: kode.children("input[type=text]").val(),
        createdBy: "surya", //cari tau cara ngambil createdby nya
        updatedBy: "suryalagi", //ini ngambil user nanti
      }),
      cache: false,

      success: function () {
        kode.html(kode.children("input[type=text]").val());
        buttons.html(
          "<button class='btn btn-primary edit' id='" +
            id.html() +
            "'>Edit</button>&nbsp;&nbsp;<button class='btn btn-primary delete' id='" +
            id.html() +
            "'>Delete</button>"
        );
      },
      error: function () {
        $("#err")
          .html(
            "<span style='color:red; font-weight: bold; font-size: 30px;'>Error updating record"
          )
          .fadeIn()
          .fadeOut(4000, function () {
            $(this).remove();
          });
      },
    });
  });

  $("#KelasProgramSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#KelasProgramTableBody tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

});
