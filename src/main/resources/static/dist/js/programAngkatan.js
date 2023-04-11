/**
 * @author Fajri Rahman
 */

// a function to control the modal behaviour when data record successfully added, including the success message
function queryStatus(state) {
	if (state == "insert") {
		$(".status-msg").html("<span style='color: green'>Data added successfully</span>");
	}
	else if (state == "update") {
		$(".status-msg").html("<span style='color: green'>Data updated successfully</span>");		
	}
	$('.input-form').hide();
	$('.modal-footer').hide();
	setTimeout(function() {
		$('#editModal').modal('hide');
		$('#addModal').modal('hide');
		$('.status-msg').html("");
		$('input').val('');
	}, 1000);
	setTimeout(function() {
		$('.input-form').show();
		$('.modal-footer').show();
	}, 1500);
	showData();
}
// end of status result function

// a function to show the data based on keyword in real time
function showData() {
	$('#program_angkatan').empty();
	var urlPath = "";
	if ($('#table_search').val() == "") {
		var urlPath = "http://localhost:8080/programAngkatan/";
	}
	else {
		urlPath = "http://localhost:8080/programAngkatan/search/" + $('#table_search').val();
	}
	$.getJSON(urlPath, function(json) {
		var tr = [];
		tr.push('<thead>');
		tr.push('<tr>');
		tr.push('<th>Angkatan</th>');
		tr.push('<th>Tahun Pembelajaran</th>');
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

$(document).ready(function() {
	// show data on table
	showData();
	// end show data
	
	// show filtered data based on table_search keyword
	$('#table_search').on('keyup', function() {
		showData();
	});
	// end filtered data
	
	// insert new data with validation
	$('#add-program-angkatan').validate({
		// input field restriction
		rules: {
			angkatan: {
				required: true,
				number: true
			},
			programPembelajaranId: {
				required : true,
				number: true
			},
			tahunMasuk: {
				required: true,
				number: true
			},
		},
		// error messages on each field
		messages: {
			angkatan: {
				required: "Field angkatan tidak boleh kosong!",
				number: "Field harus berupa angka!"
			},
			programPembelajaranId: {
				required : "Field pembelajaran tidak boleh kosong!",
				number: "Field harus berupa angka!"
			},
			tahunMasuk: {
				required: "Field tahun tidak boleh kosong!",
				number: "Field harus berupa angka!"
			},
		},
		// if all input is valid, data will be transfered to REST controller
		submitHandler: function() {
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "http://localhost:8080/programAngkatan/save",
				data: JSON.stringify({ id:{ 'angkatan': $('#angkatan').val(), 'programPembelajaranId': $('#programPembelajaranId').val() }, 'tahunMasuk': $('#tahunMasuk').val() }),
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
		},
		// if there is any blank input, show the message below the input field using invalid-feedback class from bootstrap
		errorElement: 'span',
		errorPlacement: function(error, element) {
			error.addClass('invalid-feedback');
			element.closest('.modal-header').append(error);
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
				url: "http://localhost:8080/programAngkatan/delete",
				contentType: "application/json; charset=utf-8",
				data: id,
				cache: false,
				success: function() {
					parent.fadeOut('slow', function() {
						$(this).remove();
					});
					showData();
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
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/programAngkatan/update",
			contentType: "application/json; charset=utf-8",
			data: id,
			cache: false,
			success: function(data) {
				$('#eAngkatan').val(data.id.angkatan);
				$('#eProgramPembelajaranId').val(data.id.programPembelajaranId); 
				$('#eTahunMasuk').val(data.tahunMasuk);
			},
			error: function() {
				
			}
		});
	});
	// end of show edit modal

	// update selected data with validation
	$('#edit-program-angkatan').validate({ 
		// input field restriction
		rules: {
			eAngkatan: {
				required: true,
				number: true
			},
			eProgramPembelajaranId: {
				required : true,
				number: true
			},
			eTahunMasuk: {
				required: true,
				number: true
			},
		},
		// error messages on each field
		messages: {
			eAngkatan: {
				required: "Field angkatan tidak boleh kosong!",
				number: "Field harus berupa angka!"
			},
			eProgramPembelajaranId: {
				required : "Field pembelajaran tidak boleh kosong!",
				number: "Field harus berupa angka!"
			},
			eTahunMasuk: {
				required: "Field tahun tidak boleh kosong!",
				number: "Field harus berupa angka!"
			},
		},
		// if all input is valid, data will be transfered to REST controller
		submitHandler: function() {
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "http://localhost:8080/programAngkatan/save",
				data: JSON.stringify({ id:{ 'angkatan': $('#eAngkatan').val(), 'programPembelajaranId': $('#eProgramPembelajaranId').val() }, 'tahunMasuk': $('#eTahunMasuk').val() }),
//				data: JSON.stringify({ id:{ 'programPembelajaranId': $('#programPembelajaranId').val() }, 'tahunMasuk': $('#tahunMasuk').val() }),
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