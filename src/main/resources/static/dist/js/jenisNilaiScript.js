function showData() {
	$('#tbdata').empty();
	$.getJSON('http://localhost:8080/jenis_nilai/list', function(json) {
		var tr = [];
		tr.push('<thead>');
		tr.push('<tr>');
		tr.push('<th>Kode</th>');
		tr.push('<th>Nilai</th>');
		tr.push('<th>Keterangan</th>');
		tr.push('<th>Kriteria</th>');
		tr.push('<th colspan="3" style="text-align: center;">Aksi</th>');
		tr.push('</tr>');
		tr.push('</thead>');
		tr.push('<tbody id="rows">');
		for (var i = 0; i < json.length; i++) {
			tr.push('<tr>');
			tr.push('<td>' + json[i].id.kodeJenisNilai + '</td>');
			tr.push('<td>' + json[i].id.nilai + '</td>');
			tr.push('<td>' + json[i].keterangan + '</td>');
			tr.push('<td>' + json[i].kriteria + '</td>');
			tr.push('<td style="text-align: center;"><a class=\'edit\' id=' + JSON.stringify(json[i].id) + ' ><button type="button" class="btn btn-outline-primary btn-sm"><i class="fas fa-edit fa-fw me-3"></i> Ubah</button></a></td>');
			tr.push('<td style="text-align: center;"><a class=\'delete\' id=' + JSON.stringify(json[i].id) + '><button type="button" class="btn btn-outline-danger btn-sm me-3"><i class="fas fa-trash fa-fw"></i> Hapus</button></a></td>')
			tr.push('</tr>');
		}
		tr.push('</tbody>');

		$('table').append($(tr.join('')));
	});

}
$(document).ready(function() {
	/*LIST*/
	showData();
	/*DELETE*/
	$(document).delegate('.delete', 'click', function() {
		if (confirm('Do you really want to delete record?')) {
			var id = $(this).attr('id');
			var parent = $(this).parent().parent();
			$.ajax({
				type: "DELETE",
				url: "http://localhost:8080/jenis_nilai/delete",
				data: id,
				contentType: "application/json; charset=utf-8",
				cache: false,
				success: function() {
					parent.fadeOut('slow', function() {
						$(this).remove();
					});
					location.reload(true)
				},
				error: function() {
					$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error deleting record').fadeIn().fadeOut(4000, function() {
						$(this).remove();
					});
				}
			});
		}
	});

	/*search*/
	$("#search").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#rows tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
		});
	});

	//edit
	$(document).delegate('.edit', 'click', function() {

		var id = $(this).attr('id');
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8080/jenis_nilai/get",
			data: id,
			cache: false,
			success: function(data) {
				$("#editModal").modal('show');
				$('#editKode').val(data.id.kodeJenisNilai);
				$('#editNilai').val(data.id.nilai);
				$('#editKeterangan').val(data.keterangan);
				$('#editKriteria').val(data.kriteria);
			},
			error: function() {
				alert("ID " + id + " tidak ditemukan");
			}
		});

	});

	/* Add Validation */
	$('#validationAdd').validate({
		rules: {
			kode: {
				required: true
			},
			nilai: {
				required: true
			},
			keterangan: {
				required: true
			},
			kriteria: {
				required: true
			},
		},
		messages: {
			kode: {
				required: "Kode tidak boleh kosong"
			},
			nilai: {
				required: "Nilai tidak boleh kosong"
			},
			keterangan: {
				required: "Keterangan  tidak boleh kosong"
			},
			kriteria: {
				required: "kriteria  tidak boleh kosong"
			},

		},
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
		},
		submitHandler: function() {
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "http://localhost:8080/jenis_nilai/save",
				data: JSON.stringify(
					{ 'id': { 'kodeJenisNilai': $('#addKode').val(), 'nilai': $('#addNilai').val() }, 'keterangan': $('#addKeterangan').val(), 'kriteria': $('#addKriteria').val() }),
				cache: false,
				success: function() {
					$("#msg-add").html("<div class='alert alert-success text-center' role='alert'><i class='icon fas fa-check'> Data berhasil diubah</div>").fadeIn()
						.fadeOut(1999, function() {
							$("#msg-add").html("");
						});

					window.setTimeout(function() {
						showData();
						$("#msg-add").html("");
						$("#addModal").modal('hide');
					}, 2000)

				},
				error: function() {
					$("#msg-add").html("<div class='alert alert-danger text-center' role='alert'><i class='icon fas fa-exclamation-triangle'><strong> Input data gagal</strong></div>");
				}
			});
		}
	});
	
	/* Edit Validation */
	$('#validationEdit').validate({
		rules: {
			kode: {
				required: true
			},
			nilai: {
				required: true
			},
			keterangan: {
				required: true
			},
			kriteria: {
				required: true
			},
		},
		messages: {
			kode: {
				required: "Kode tidak boleh kosong"
			},
			nilai: {
				required: "Nilai tidak boleh kosong"
			},
			keterangan: {
				required: "Keterangan tidak boleh kosong"
			},
			kriteria: {
				required: "kriteria tidak boleh kosong"
			},

		},
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
		},
		submitHandler: function() {
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "http://localhost:8080/jenis_nilai/save",
				data: JSON.stringify(
					{ 'id': { 'kodeJenisNilai': $('#editKode').val(), 'nilai': $('#editNilai').val() }, 'keterangan': $('#editKeterangan').val(), 'kriteria': $('#editKriteria').val() }),
				cache: false,
				success: function() {
					$("#msg-edit").html("<div class='alert alert-success text-center' role='alert'><i class='icon fas fa-check'> Data berhasil diubah</div>").fadeIn()
						.fadeOut(1999, function() {
							$("#msg-edit").html("");
						});

					window.setTimeout(function() {
						showData();
						$("#msg-edit").html("");
						$("#editModal").modal('hide');
					}, 2000)

				},
				error: function() {
					$("#msg-edit").html("<div class='alert alert-danger text-center' role='alert'><i class='icon fas fa-exclamation-triangle'><strong> Input data gagal</strong></div>");
				}
			});
		}
	});


});



