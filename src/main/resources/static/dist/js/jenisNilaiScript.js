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
		tr.push('<th colspan="3">action</th>');
		tr.push('</tr>');
		tr.push('</thead>');
		tr.push('<tbody id="rows">');
		for (var i = 0; i < json.length; i++) {
			tr.push('<tr>');
			tr.push('<td>' + json[i].id.kodeJenisNilai + '</td>');
			tr.push('<td>' + json[i].id.nilai + '</td>');
			tr.push('<td>' + json[i].keterangan + '</td>');
			tr.push('<td>' + json[i].kriteria + '</td>');
			tr.push('<td><a class=\'edit\' id=' + JSON.stringify(json[i].id) + ' ><button class="btn btn-primary">Edit</button></a></td>');
			tr.push('<td><a class=\'delete\' id=' + JSON.stringify(json[i].id) + '><button class=" btn btn-danger">Delete</button></a></td>')
			tr.push('<td></td>');
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

		/*var parent = $(this).parent().parent();
		var kode = parent.children("td:nth-child(1)");
		var nilai = parent.children("td:nth-child(2)");
		var keterangan = parent.children("td:nth-child(3)");
		var kriteria = parent.children("td:nth-child(4)");
		var buttonsSave = parent.children("td:nth-child(5)");
		var buttonsDelete = parent.children("td:nth-child(6)");
		var kosong = parent.children("td:nth-child(7)");*/



		/*kode.html("<input type='text' id='txtName' value='" + kode.html() + "'/>");
		nilai.html("<input type='text' id='txtName' value='" + nilai.html() + "'/>");
		keterangan.html("<input type='text' id='txtName' value='" + keterangan.html() + "'/>");
		kriteria.html("<input type='text' id='txtName' value='" + kriteria.html() + "'/>");
		buttonsSave.html("<a id='save'><button  class='btn btn-primary'>Simpan</button></a>");
		buttonsDelete.html("<button class=' btn btn-danger disabled' >Hapus</button>");
		kosong.html("");*/

	});

/*	$(document).delegate('#save', 'click', function() {
		var parent = $(this).parent().parent();
		var kode = parent.children("td:nth-child(1)");
		var nilai = parent.children("td:nth-child(2)");
		var keterangan = parent.children("td:nth-child(3)");
		var kriteria = parent.children("td:nth-child(4)");
		var buttonsEdit = parent.children("td:nth-child(5)");
		var buttonsDelete = parent.children("td:nth-child(6)");
		var kosong = parent.children("td:nth-child(7)");

*/
		/*if (kode.children("input[type=text]").val() == "" || nilai.children("input[type=text]").val() == "" || keterangan.children("input[type=text]").val() == "" || kriteria.children("input[type=text]").val() == "") {
			alert(" Data tidak boleh kosong ");
		} else {*/
		/*	$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "http://localhost:8080/jenis_nilai/save",
				data: JSON.stringify({ 'id': { 'kodeJenisNilai': kode, 'nilai': nilai }, 'keterangan': keterangan, 'kriteria': kriteria }),
				cache: false,
				success: function() {
					showData();

				},
				error: function() {
					$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error updating record').fadeIn().fadeOut(4000, function() {
						$(this).remove();
					});
				}
			});*/

		/*}*/

/*	});*/
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
				required: "Keterangan pembelajaran tidak boleh kosong"
			},
			kriteria: {
				required: "kriteria pendidikan tidak boleh kosong"
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
					{ 'id': { 'kodeJenisNilai': $('#addKode').val(), 'nilai': $('#addNilai').val()}, 'keterangan': $('#addKeterangan').val(), 'kriteria': $('#addKriteria').val() }),
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
				required: "Keterangan pembelajaran tidak boleh kosong"
			},
			kriteria: {
				required: "kriteria pendidikan tidak boleh kosong"
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
					{ 'id': { 'kodeJenisNilai': $('#editKode').val(), 'nilai': $('#editNilai').val()}, 'keterangan': $('#editKeterangan').val(), 'kriteria': $('#editKriteria').val() }),
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
	
	
	/*ADD*/
	/*$(document).delegate('#addNew', 'click', function(event) {
		event.preventDefault();

		var kode = $('#kode').val();
		var nilai = $('#nilai').val();
		var keterangan = $('#keterangan').val();
		var kriteria = $('#kriteria').val();

		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8080//jenis_nilai/save",
			data: JSON.stringify({ 'id': { 'kodeJenisNilai': kode, 'nilai': nilai }, 'keterangan': keterangan, 'kriteria': kriteria }),
			cache: false,
			success: function(result) {
				$("#msg").html("<span style='color: green'>Company added successfully</span>");
				window.setTimeout(function() { location.reload() }, 1000)
			},
			error: function(err) {
				$("#msg").html("<span style='color: red'>Name is required</span>");
			}
		});
	});*/


});




