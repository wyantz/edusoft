/**
 * @author Fajri Rahman
 */

// Fungsi untuk menampilkan status setelah save atau update data
function queryStatus(state) {
	if (state == "insert") {
		$(".status-msg").html("<span style='color: green'>Data added successfully</span>");
	}
	else if (state == "update") {
		$(".status-msg").html("<span style='color: green'>Data updated successfully</span>");
	}
	$('.input-form').hide();
	$('.modal-footer').hide();
	setTimeout(function () {
		$('#editModal').modal('hide');
		$('#addModal').modal('hide');
		$('.status-msg').html("");
		$('input').val('');
	}, 1000);
	setTimeout(function () {
		$('.input-form').show();
		$('.modal-footer').show();
	}, 1500);
	showData();
}
// ./query status

// Fungsi untuk menampilkan data
function showData() {
	$('#program_angkatan').empty();
	var urlPath = "";
	if ($('#table_search').val() == "") {
		var urlPath = "http://localhost:8080/program-angkatan/";
	}
	else {
		urlPath = "http://localhost:8080/program-angkatan/search/" + $('#table_search').val();
	}
	$.getJSON(urlPath, function(json) {
		var tr = [];
		tr.push('<thead>');
		tr.push('<tr>');
		tr.push('<th>Angkatan</th>');
		tr.push('<th>Program Belajar</th>');
		tr.push('<th>Tahun Masuk</th>');
		tr.push('<th>Action</th>');
		tr.push('</tr>');
		tr.push('</thead>');
		tr.push('<tbody>');
		for (var i = 0; i < json.length; i++) {
			tr.push('<tr>');
			tr.push('<td>' + json[i].id.angkatan + '</td>');
			tr.push('<td>' + json[i].id.programPembelajaranId + '</td>');
			tr.push('<td>' + json[i].tahunMasuk + '</td>');
			tr.push('<td><a class=\'btn btn-outline-warning edit\' id=' + JSON.stringify(json[i].id) + '><i class="fas fa-edit"> Edit</i></a>&nbsp; | &nbsp;' +
				'<a class=\'btn btn-outline-danger delete\' id=' + JSON.stringify(json[i].id) + '><i class="fas fa-trash-alt"> Delete</i></a></td>');
			tr.push('</tr>');
		}
		tr.push('</tbody>');
		$('#program_angkatan').append($(tr.join('')));
	});
}
// ./show data

// Fungsi untuk menambah opsi program belajar pada menu dropdown
function listProgBel() {
	$('#programPembelajaranId').empty();
	$.getJSON("http://localhost:8080/program-angkatan/progbel", function (json) {
		var options = [];
		options.push('<option value="" selected="selected">-- Pilih program belajar --</option>');
		for (i = 0; i < json.length; i++) {
			options.push('<option value="' + json[i].id + '">' + json[i].nama + '</option>')
		}
		$('#programPembelajaranId, #edit_progbel_id').append($(options.join('')));
	});
}
// ./list program belajar

// Fungsi untuk menambah opsi program belajar pada menu dropdown
function listAngkatan() {
	$('#angkatan').empty();
	var options = [];
	options.push('<option value="" selected="selected">-- Pilih tahun angkatan --</option>');
	for (i = 1900; i < 2200; i++) {
		options.push('<option value="' + i + '">' + i + '</option>')
	}
	$('#angkatan, #edit_angkatan').append($(options.join('')));
}
// ./list program belajar

// jQuery
$(document).ready(function () {
	// Memanggil fungsi untuk menampilkan data
	showData();
	// ./show data
	
	$('li.nav-item').removeClass("menu-open");
	$("#menu_program_1").addClass("active");
	$("#menu_program").addClass("active").parent().addClass("menu-open");
	
	// Menampilkan data berdasarkan keyword pada search-box
	$('#table_search').on('keyup', function() {
		showData();
	});
	// ./show filtered data

	// Event untuk menampilkan modal add
	$('#show_add_modal').click(function () {
		$('.status-msg').html("");
		listAngkatan();
		listProgBel();
	})
	// ./show add modal

	// Menambahkan data baru dengan validasi jQuery
	$('#add_program_angkatan').validate({
		// Rules untuk tiap field
		rules: {
			angkatan: {
				required: true
			},
			programPembelajaranId: {
				required: true
			},
			tahunMasuk: {
				required: true,
				number: true
			},
		},
		// error messages on each field
		messages: {
			angkatan: {
				required: "Pilih tahun angkatan!",
			},
			programPembelajaranId: {
				required: "Pilih program belajar!",
			},
			tahunMasuk: {
				required: "Field tahun tidak boleh kosong!",
				number: "Field harus berupa angka!",
			},
		},
		// if all input is valid, data will be transfered to REST controller
		submitHandler: function () {
			// Validasi id baru untuk memeriksa apakah sudah terdaftar atau belum
			$.getJSON("http://localhost:8080/program-angkatan/", function (json) {
				var isExist = false;
				for (var i = 0; i < json.length; i++) {
					if ($('#angkatan').val() == json[i].id.angkatan && $('#programPembelajaranId').val() == json[i].id.programPembelajaranId) {
						$(".status-msg").html("<span style='color: red'>Angkatan dengan program tersebut sudah terdaftar!</span>");
						return true;
					}
				}
				// Data akan diinput jika id baru belum terdaftar
				if (!isExist) {
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8",
						url: "http://localhost:8080/program-angkatan/save",
						data: JSON.stringify({ id: { 'angkatan': $('#angkatan').val(), 'programPembelajaranId': $('#programPembelajaranId').val() }, 'tahunMasuk': $('#tahunMasuk').val() }),
						cache: false,
						success: function() {
							queryStatus("insert");
						},
						error: function() {
							$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error inserting record').fadeIn().fadeOut(4000, function() {
								$(this).remove();
							});
						}
					})
				}
				// ./save
			});
			// ./new id validation
		},
		// if there is any blank input, show the message below the input field using invalid-feedback class from bootstrap
		errorElement: 'span',
		errorPlacement: function(error, element) {
			error.addClass('invalid-feedback');
			element.closest('.form-group').append(error);
		},
		highlight: function(element, errorClass, validClass) {
			$(element).addClass('is-invalid');
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).removeClass('is-invalid');
		}
	});
	// end insert data

	// delete data by id
	$(document).delegate('.delete', 'click', function() {
		if (confirm('Are you sure to delete this data?')) {
			var id = $(this).attr('id');
			var parent = $(this).parent().parent();
			$.ajax({
				type: "DELETE",
				url: "http://localhost:8080/program-angkatan/delete",
				contentType: "application/json; charset=utf-8",
				data: id,
				cache: false,
				success: function() {
					parent.fadeOut('slow', function() {
						$(this).remove();
					});
				},
				error: function() {
					$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error deleting record').fadeIn().fadeOut(4000, function() {
						$(this).remove();
					});
				}
			});
		}
	});
	// end delete data

	// show the modal to edit data
	$(document).delegate('.edit', 'click', function() {
		$('#editModal').modal('show');
		var id = $(this).attr('id');
		$('.status-msg').html("");
		listAngkatan();
		listProgBel();
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/program-angkatan/update",
			contentType: "application/json; charset=utf-8",
			data: id,
			cache: false,
			success: function(response) {
				$('#edit_angkatan').val(response.id.angkatan).prop("selected", "selected");
				$('#edit_progbel_id').val(response.id.programPembelajaranId).prop("selected", "selected");
				$('#edit_tahun_masuk').val(response.tahunMasuk);
			},
			error: function() {

			}
		});
	});
	// end of show edit modal

	// update selected data with validation
	$('#edit_program_angkatan').validate({
		// input field restriction
		rules: {
			edit_angkatan: {
				required: true,
			},
			edit_progbel_id: {
				required: true,
			},
			edit_tahun_masuk: {
				required: true,
				number: true
			},
		},
		// error messages on each field
		messages: {
			edit_angkatan: {
				required: "Field angkatan tidak boleh kosong!",
			},
			edit_progbel_id: {
				required: "Field pembelajaran tidak boleh kosong!",
			},
			edit_tahun_masuk: {
				required: "Field tahun tidak boleh kosong!",
				number: "Field harus berupa angka!"
			},
		},
		// if all input is valid, data will be transfered to REST controller
		submitHandler: function() {
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "http://localhost:8080/program-angkatan/save",
				data: JSON.stringify({ id: { 'angkatan': $('#edit_angkatan').val(), 'programPembelajaranId': $('#edit_progbel_id').val() }, 'tahunMasuk': $('#edit_tahun_masuk').val() }),
				cache: false,
				success: function() {
					queryStatus("update");
				},
				error: function() {
					$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error inserting record').fadeIn().fadeOut(4000, function() {
						$(this).remove();
					});
				}
			})
		},
		// if there is any blank input, show the message below the input field using invalid-feedback class from bootstrap
		errorElement: 'span',
		errorPlacement: function(error, element) {
			error.addClass('invalid-feedback');
			element.closest('.form-group').append(error);
		},
		highlight: function(element, errorClass, validClass) {
			$(element).addClass('is-invalid');
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).removeClass('is-invalid');
		}
	});
	// end of data update
});