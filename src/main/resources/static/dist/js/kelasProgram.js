const API = "http://localhost:8080/klpg/api/";

function showKelasProgramTable() {
  $("#KelasProgramTable").empty();
  $.getJSON(API, function (json) {
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
        "<td><button class='btn btn-primary edit' id=" +
          json[i].id +
          ">Edit</button>&nbsp;&nbsp;<button class='btn btn-primary delete' id=" +
          json[i].id +
          ">Delete</button></td>"
      );
      tr.push("</tr>");
    }
    tr.push("</tbody>");
    $("#KelasProgramTable").append($(tr.join("")));
  });
}

function searchKelasProgramTable() {
  $("#KelasProgramSearch").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#KelasProgramTableBody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
}

function deleteKelasProgram() {
  $(document).delegate(".delete", "click", function () {
    if (confirm("Hapus kelas program ini?")) {
      var id = $(this).attr("id");
      var parent = $(this).parent().parent();
      $.ajax({
        type: "DELETE",
        url: API + id,
        cache: false,
        success: function () {
          parent.fadeOut("slow", function () {
            $(this).reve();
          });
          showKelasProgramTable();
        },
        error: function () {
          $("#err")
            .html(
              "<span style='color:red; font-weight: bold; font-size: 30px;'>Gagal menghapus kode</span>"
            )
            .fadeIn()
            .fadeOut(4000, function () {
              $(this).remove();
            });
        },
      });
    }
  });
}

function addKelasProgram() {
  $("#addkelasprogramform").validate({
    rules: {
      kelasprogram: {
        required: true,
        rangelength: [1, 5],
      },
    },
    messages: {
      kelasprogram: {
        required: "Input tidak boleh kosong",
        rangelength: function (range, input) {
          return [
            "Anda memasukkan ",
            $(input).val().length,
            " karakter. Maksimum ",
            range[1],
            " karakter.",
          ].join("");
        },
      },
    },
    submitHandler: function () {
      var kodeKelasProgram = $("#kelasprogram").val();
      $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: API,
        data: JSON.stringify({
          kode: kodeKelasProgram,
          createdBy: $("#username-login").html(),
        }),
        cache: false,

        success: function () {
          $("#msg").html(
            "<span style='color: green'>Berhasil menambahkan kelas program baru.</span>"
          );
          showKelasProgramTable();
          window.setTimeout(function () {
            $("#tambahkelasprogrammodal").modal("hide");
          }, 1000);
        },
        error: function () {
          $("#err")
            .html(
              "<span style='color:red; font-weight: bold; font-size: 30px;'>Error inserting record"
            )
            .fadeIn()
            .fadeOut(4000, function () {
              $(this).remove();
            });
        },
      });
    },
  });
}

$(document).ready(function () {
  // Menipulasi tampilan menu
  $("li.nav-item").removeClass("menu-open"); // remove class menu-open pada semua li yang aktif
  $("#menu_nilai_2").addClass("active"); // tambahkan class active pada a dengan id menu-mapel-1
  $("#menu_nilai").addClass("active").parent().addClass("menu-open"); // tambahkan class active pada a dengan id menu-mapel-1 lalu pada parentnya (li) ditambahkan class menu-open

  showKelasProgramTable();
  searchKelasProgramTable();
  deleteKelasProgram();
  addKelasProgram();

  $(document).delegate(".edit", "click", function () {
    var id = $(this).attr("id");
    var parent = $(this).parent().parent();

    $.getJSON(API + id, function (json) {
      $("#creator-name").text(json.createdBy);
    });

    id = parent.children("td:nth-child(1)");
    var kode = parent.children("td:nth-child(2)");
    var buttons = parent.children("td:nth-child(3)");

    kode.html("<input type='text' id='txtName' value='" + kode.html() + "'/>");
    buttons.html(
      "<button class='btn btn-secondary' id='update'>Update</button>&nbsp;&nbsp;<button class='btn btn-secondary delete' id='" +
        id.html() +
        "'>Delete</button>&nbsp;&nbsp;<button class='btn btn-warning' id='cancel'>Cancel</button>"
    );
  });

  $(document).delegate("#update", "click", function () {
    var parent = $(this).parent().parent();
    var id = parent.children("td:nth-child(1)");
    var kode = parent.children("td:nth-child(2)");
    var buttons = parent.children("td:nth-child(3)");

    $.ajax({
      type: "PATCH",
      contentType: "application/json; charset=utf-8",
      url: API,
      data: JSON.stringify({
        id: id.html(),
        kode: kode.children("input[type=text]").val(),
        createdBy: $("#creator-name").text(),
        updatedBy: $("#username-login").html(),
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

  $(document).delegate("#cancel", "click", function () {
    showKelasProgramTable();
  });
});
