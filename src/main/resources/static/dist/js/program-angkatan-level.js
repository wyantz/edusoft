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
		$('#edit_modal').modal('hide');
		$('#add_modal').modal('hide');
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
	$('#program_angkatan_level').empty();
	$.getJSON("http://localhost:8080/program-angkatan-level/", function(json) {
		var tr = [];
		tr.push('<thead>');
		tr.push('<tr>');
		tr.push('<th>Program Belajar</th>');
		tr.push('<th>Angkatan</th>');
		tr.push('<th>Level</th>');
		tr.push('<th>Tahun Mulai</th>');
		tr.push('<th>Bulan Mulai</th>');
		tr.push('<th>Tahun Berakhir</th>');
		tr.push('<th>Bulan Berakhir</th>');
		tr.push('<th>Action</th>');
		tr.push('</tr>');
		tr.push('</thead>');
		tr.push('<tbody id="program_angkatan_level_tbody">');
		for (var i = 0; i < json.length; i++) {
			tr.push('<tr>');
			tr.push('<td>' + json[i].id.programPembelajaranId + '</td>');
			tr.push('<td>' + json[i].id.angkatan + '</td>');
			tr.push('<td>' + json[i].id.level + '</td>');
			tr.push('<td>' + json[i].tahunMulai + '</td>');
			tr.push('<td>' + json[i].bulanMulai + '</td>');
			tr.push('<td>' + json[i].tahunBerakhir + '</td>');
			tr.push('<td>' + json[i].bulanBerakhir + '</td>');
			tr.push('<td><a class=\'btn btn-outline-warning edit\' id=' + JSON.stringify(json[i].id) + '><i class="fas fa-edit"> Edit</i></a>&nbsp; | &nbsp;' +
				'<a class=\'btn btn-outline-danger delete\' id=' + JSON.stringify(json[i].id) + '><i class="fas fa-trash-alt"> Delete</i></a></td>');
			tr.push('</tr>');
		}
		tr.push('</tbody>');
		$('#program_angkatan_level').append($(tr.join('')));
	});
}
// ./show data

// Fungsi untuk menambah opsi program belajar pada menu dropdown
function listProgBel() {
	$('#program_pembelajaran_id, #edit_progbel_id').empty();
	$.getJSON("http://localhost:8080/programAngkatan/progbel", function (json) {
		var options = [];
		options.push('<option value="" selected disabled>-- program belajar --</option>');
		for (i = 0; i < json.length; i++) {
			options.push('<option value=' + json[i].id + '>' + json[i].nama + '</option>')
		}
		$('#program_pembelajaran_id, #edit_progbel_id').append($(options.join('')));
	});
}
// ./list program belajar

// Fungsi untuk menambah opsi angkatan pada menu dropdown
function listAngkatan() {
	$('#angkatan, #edit_angkatan').empty();
	$.getJSON("http://localhost:8080/programAngkatan/", function (json) {
		var options = [];
		options.push('<option value="" selected disabled>-- tahun angkatan --</option>');
		for (i = 0; i < json.length; i++) {
			options.push('<option value="' + json[i].id.angkatan + '">' + json[i].id.angkatan + '</option>');
		}
		$('#angkatan, #edit_angkatan').append($(options.join('')));
	});
}
// ./list angkatan

// Fungsi untuk menambah opsi level
function listLevel() {
	$('#level, #edit_level').empty();
	var options = [];
	options.push('<option value="" selected disabled>-- level --</option>');
	for (i = 1; i <= 6; i++) {
		options.push('<option value="' + i + '">' + i + '</option>')
	}
	$('#level, #edit_level').append($(options.join('')));
}
// ./list level

// Fungsi list tahun
function listTahun() {
	$('#tahun_mulai, #tahun_berakhir, #edit_tahun_mulai, #edit_tahun_berakhir').empty();
	var options = [];
	options.push('<option value="" selected disabled>-- tahun --</option>');
	for (i = 1900; i <= 2200; i++) {
		options.push('<option value="' + i + '">' + i + '</option>')
	}
	$('#tahun_mulai, #tahun_berakhir, #edit_tahun_mulai, #edit_tahun_berakhir').append($(options.join('')));
}
// ./list tahun


$(document).ready(function() {
	// memanggil beberapa fungsi yang diperlukan sebagai initiator
	showData();
	listProgBel();
	listAngkatan();
	listLevel();
	listTahun();
	// ./memanggil fungsi
	
	// show filtered data based on table_search keyword
	$("#table_search").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#program_angkatan_level_tbody tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
	// end filtered data
	
	// Menampilkan modal add
	$('#show_add_modal').click(function() {
		$("#angkatan option").each(function() {
			$(this).siblings('[value="'+ this.value +'"]').remove();
		});
	});
	// ./menampilkan modal

	// insert new data with validation
	$('#add_data').validate({
		// input field restriction
		rules: {
			program_pembelajaran_id: {
				required : true,
			},
			angkatan: {
				required: true,
			},
			level: {
				required: true,
			},
			tahun_mulai: {
				required: true,
			},
			bulan_mulai: {
				required: true,
			},
			tahun_berakhir: {
				required: true,
			},
			bulan_berakhir: {
				required: true
			}
		},
		// error messages on each field
		messages: {
			program_pembelajaran_id: {
				required : "Pilih program belajar!",
			},
			angkatan: {
				required: "Pilih tahun angkatan!",
			},
			level: {
				required: "Pilih level!",
			},
			tahun_mulai: {
				required: "Pilih tahun mulai!",
			},
			bulan_mulai: {
				required: "Pilih bulan mulai!",
			},
			tahun_berakhir: {
				required: "Pilih tahun berakhir!",
			},
			bulan_berakhir: {
				required: "Pilih bulan berakhir!"
			}
		},
		// if all input is valid, data will be transfered to REST controller
		submitHandler: function() {
			// Validasi id baru untuk memeriksa apakah sudah terdaftar atau belum
			$.getJSON("http://localhost:8080/program-angkatan-level/", function(json) {
				var isExist = false;
				for (var i = 0; i < json.length; i++) {
					if ($('#program_pembelajaran_id').val() == json[i].id.programPembelajaranId && $('#angkatan').val() == json[i].id.angkatan && $('#level').val() == json[i].id.level) {
						$(".status-msg").html("<span style='color: red'>Angkatan dengan program tersebut sudah terdaftar!</span>");
						return true;
					}
				}
				if (!isExist) {
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8",
						url: "http://localhost:8080/program-angkatan-level/save",
						data: JSON.stringify({ 
							id:{ 
								'programPembelajaranId': $('#program_pembelajaran_id').val(),
								'angkatan': $('#angkatan').val(),
								'level': $('#level').val()
							}, 
							'tahunMulai': $('#tahun_mulai').val(),
							'bulanMulai': $('#bulan_mulai').val(),
							'tahunBerakhir': $('#tahun_berakhir').val(),
							'bulanBerakhir': $('#bulan_berakhir').val(),
							'createdBy': $('#logged_user').html()
						}),
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
			});
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
				url: "http://localhost:8080/program-angkatan-level/delete",
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
		$('#edit_modal').modal('show');
		var id = $(this).attr('id');
		listProgBel();
		listAngkatan();
		listLevel();
		listTahun();
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/program-angkatan-level/update",
			contentType: "application/json; charset=utf-8",
			data: id,
			cache: false,
			success: function(response) {
				$('#edit_progbel_id').val(response.id.programPembelajaranId); 
				$('#edit_angkatan').val(response.id.angkatan);
				$('#edit_level').val(response.id.level);
				$('#edit_tahun_mulai').val(response.tahunMulai);
				$('#edit_bulan_mulai').val(response.bulanMulai); 
				$('#edit_tahun_berakhir').val(response.tahunBerakhir);
				$('#edit_bulan_berakhir').val(response.bulanBerakhir);
				$('#created_by').val(response.createdBy); 
				$('#created_at').val(response.createdAt);
			},
			error: function() {
				
			}
		});
	});
	// end of show edit modal

	// update selected data with validation
	$('#edit_data').validate({ 
		// input field restriction
		rules: {
			edit_progbel_id: {
				required : true,
			},
			edit_angkatan: {
				required: true,
			},
			edit_level: {
				required: true,
			},
			edit_tahun_mulai: {
				required: true,
			},
			edit_bulan_mulai: {
				required: true,
			},
			edit_tahun_berakhir: {
				required: true,
			},
			edit_bulan_berakhir: {
				required: true
			}
		},
		// error messages on each field
		messages: {
			edit_progbel_id: {
				required : "Pilih program belajar!",
			},
			edit_angkatan: {
				required: "Pilih tahun angkatan!",
			},
			edit_level: {
				required: "Pilih level!",
			},
			edit_tahun_mulai: {
				required: "Pilih tahun mulai!",
			},
			edit_bulan_mulai: {
				required: "Pilih bulan mulai!",
			},
			edit_tahun_berakhir: {
				required: "Pilih tahun berakhir!",
			},
			edit_bulan_berakhir: {
				required: "Pilih bulan berakhir!"
			}
		},
		// if all input is valid, data will be transfered to REST controller
		submitHandler: function() {
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "http://localhost:8080/program-angkatan-level/save",
				data: JSON.stringify({ 
					id:{ 
						'programPembelajaranId': $('#edit_progbel_id').val(),
						'angkatan': $('#edit_angkatan').val(),
						'level': $('#edit_level').val()
					}, 
					'tahunMulai': $('#edit_tahun_mulai').val(),
					'bulanMulai': $('#edit_bulan_mulai').val(),
					'tahunBerakhir': $('#edit_tahun_berakhir').val(),
					'bulanBerakhir': $('#edit_bulan_berakhir').val(),
					'createdBy': $('#created_by').val(),
					'createdAt': $('#created_at').val(),
					'updatedBy': $('#logged_user').html(),
				}),
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