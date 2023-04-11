function showMapelTable() {
	$('#mapelTable tbody').empty();
	let urlPath = "";
	if ($('#table_search').val() == "") {
		urlPath = "http://localhost:8080/mapel";
	}
	else {
		urlPath = "http://localhost:8080/mapel/search/" + $('#table_search').val();
	}
	$.getJSON(urlPath, function(json) {
		let tr = [];
		for (let i = 0; i < json.length; i++) {
			tr.push('<tr class="bg-white">');
			tr.push('<td>' + json[i].kode + '</td>');
			tr.push('<td>' + json[i].nama + '</td>');
			tr.push('<td>' + json[i].kodeJenisNilai + '</td>');
			tr.push('<td><a class=\'btn btn-outline-warning edit\' id=' + json[i].kode + '><i class="fas fa-edit"></i> Edit</a>&nbsp;');
			tr.push('&nbsp;<a class=\'btn btn-outline-danger delete\' id=' + json[i].kode + '><i class="fas fa-trash-alt"></i> Delete</a></td>');
			tr.push('</tr>');
		}
		$('#mapelTable tbody').append($(tr.join('')));
	})
}

$(document).ready(function() {
	showMapelTable();

	$("#table_search").on("keyup", function() {
		showMapelTable();
	});

	$.validator.addMethod("uniqueKode", function(value, element) {
		let urlCekKode = "http://localhost:8080/mapel/cek/" + value;
		let result = false;
		$.ajax({
			type: "GET",
			url: urlCekKode,
			dataType: "text",
			success: function(data) {
				if (data === "false") {
					console.log(data + ': This email exists.');
					result = false;
				} else {
					console.log(data + ': This email does not exist.');
					result = true;
				}
			},
			async: false
		});
		console.log(result);
		return result;
	});



	$("#mapel-form").validate({
		rules: {
			kode: {
				required: true,
				uniqueKode: true,
				/*normalizer: function(value) {
					return $.trim(value);
				}*/
			},
			nama: {
				required: true
			}
		},
		messages: {
			kode: {
				required: "Input Kode Tidak Boleh Kosong",
				uniqueKode: "Kode Telah Digunakan"
			},
			nama: {
				required: "Input Nama Tidak Boleh Kosong"
			}

		},
		submitHandler: function() {
			let kode = $('#kode').val();
			let nama = $('#nama').val();
			let kodeJenisNilai = $('#kodeJenisNilai').val();
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "http://localhost:8080/mapel/save",
				data: JSON.stringify({ 'kode': kode, 'nama': nama, 'kodeJenisNilai': kodeJenisNilai, 'createdBy': "admin" }),
				cache: false,
				success: function() {
					showMapelTable();
					$("#mapel-modal").modal('hide');
				},
				error: function() {
					$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error inserting record').fadeIn().fadeOut(4000, function() {
						$(this).remove();
					});
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

	})

	$("#edit-form").validate({
		rules: {
			nama: {
				required: true
			}
		},
		submitHandler: function() {
			let kode = $('#editKode').val();
			let nama = $('#editNama').val();
			let kodeJenisNilai = $('#editKodeJenisNilai').val();
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "http://localhost:8080/mapel/save",
				data: JSON.stringify({ 'kode': kode, 'nama': nama, 'kodeJenisNilai': kodeJenisNilai, 'createdBy': "admin", 'updatedBy': "admin" }),
				cache: false,
				success: function() {
					showMapelTable();
					$("#edit-modal").modal('hide');
				},
				error: function() {
					$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error inserting record').fadeIn().fadeOut(4000, function() {
						$(this).remove();
					});
				}
			});
		},

		// if there is any blank input, show the message below the input field using invalid-feedback class from bootstrap
		errorElement: 'span',
		errorPlacement: function(error, element) {
			error.addClass('invalid-feedback');
			element.closest('.form-group').append(error);
		},

	})



	$(document).delegate('.delete', 'click', function() {
		if (confirm('Are you sure to delete this data')) {
			let kode = $(this).attr('id');
			let parent = $(this).parent().parent();
			$.ajax({
				type: "DELETE",
				url: "http://localhost:8080/mapel/delete/" + kode,
				cache: false,
				success: function() {
					parent.fadeOut('slow', function() {
						$(this).remove();
					});
					showMapelTable();
				},
				error: function() {
				}
			})
		}

	});

	$(document).delegate('.edit', 'click', function() {
		let kode = $(this).attr('id');
		$('#edit-modal').modal('show');

		$.getJSON('http://localhost:8080/mapel/' + kode, function(json) {
			$('#editKode').val(kode);
			$('#editNama').val(json.nama);
			$('#editKodeJenisNilai').val(json.kodeJenisNilai);
		});
	})

	$(document).delegate('#add-button', 'click', function() {
		$('#kode').val('');
		$('#nama').val('');
	});
})