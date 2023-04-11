function showData() {
	$("#tablepp").empty();
	$.getJSON('http://localhost:8080/pesertaprogram', function(json) {
		var tr = [];
		tr.push('<thead>');
		tr.push('<tr>');
		tr.push('<th>Angkatan</th>');
		tr.push('<th>Biodata</th>');
		tr.push('<th>Program Pembelajaran</th>');
		tr.push('<th>Tingkat Pendidikan</th>');
		tr.push('<th>Tahun Masuk</th>');
		tr.push('<th>Tanggal Masuk</th>');
		tr.push('<th colspan="2" class="text-center">Aksi</th>');
		tr.push('</thead>');
		tr.push('<tbody id="rows">');
		for (var i = 0; i < json.length; i++) {
			tr.push('<tr>');
			tr.push('<td>' + json[i].id.angkatan + '</td>');
			tr.push('<td>' + json[i].id.biodataId + '</td>');
			tr.push('<td>' + json[i].id.programPembelajaranId + '</td>');
			tr.push('<td>' + json[i].currentLevel + '</td>');
			tr.push('<td>' + json[i].tahunMasuk + '</td>');
			tr.push('<td>' + json[i].tanggalMasuk + '</td>');
			tr.push('<td class="text-center"><a class=\'edit\' id=' + JSON.stringify(json[i].id) + '><button type="button" class="btn btn-outline-primary btn-sm"><i class="fas fa-edit fa-fw me-3"></i> Ubah</button></a></td>');
			tr.push('<td class="text-center"><a class=\'delete\' id=' + JSON.stringify(json[i].id) + '><button type="button" class="btn btn-outline-danger btn-sm me-3"><i class="fas fa-trash fa-fw"></i> Hapus</button></a></td>');
			tr.push('</tr>');
		}
		tr.push('</tbody>');
		$("#tablepp").append($(tr.join('')));
	});
}
$(document).ready(function() {
	//	Menampilkan data tabel
	showData();

	//	Menghapus baris data
	$(document).delegate('.delete', 'click', function() {
		var parent = $(this).parent().parent();
		var id = $(this).attr('id');
		if (confirm('Hapus data ini?')) {
			$.ajax({
				type: "DELETE",
				url: "http://localhost:8080/pesertaprogram/delete",
				contentType: "application/json; charset=utf-8",
				data: id,
				cache: false,
				success: function() {
					parent.fadeOut(
						'slow', function() {
							$(this).remove();
						});
					$('#alert').html("<div class='alert alert-success text-center' role='alert'><i class='icon fas fa-check'><strong> Data berhasil dihapus</strong></div>")
						.fadeIn()
						.fadeOut(4000, function() {
							$('#alert').html("");
						});
				},
				error: function() {
					$('#alert').html("<div class='alert alert-danger text-center' role='alert'><i class='icon fas fa-exclamation-triangle'><strong> Input data gagal</strong></div>")
						.fadeIn()
						.fadeOut(4000, function() {
							$('#alert').html("");
						});
				}
			});
		}
	});

	//	Mengubah baris data
	$(document).delegate('.edit', 'click', function() {
		var id = $(this).attr('id');
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8080/pesertaprogram/get",
			data: id,
			cache: false,
			success: function(json) {
				$("#editModal").modal('show');
				$('#eAngkatan').empty();
				var options = [];
				options.push('<option value=' + json.id.angkatan + '>' + json.id.angkatan + '</option>');
				$('#eAngkatan').append($(options.join('')));
				$('#eBiodataId').val(json.id.biodataId);
				$('#eProgramPembelajaranId').val(json.id.programPembelajaranId);
				$('#eCurrentLevel').val(json.currentLevel);
				$('#eTahunMasuk').val(json.tahunMasuk);
				$('#eDatepicker').val(json.tanggalMasuk);
			},
			error: function() {
				alert("ID " + id + " tidak ditemukan");
			}
		});
	});

	//form validation tambah data
	$('#form-validation').validate({
		rules: {
			angkatan: {
				required: true
			},
			biodataId: {
				required: true
			},
			programPembelajaranId: {
				required: true
			},
			currentLevel: {
				required: true
			},
			tahunMasuk: {
				required: true,
				minlength: 4,
				min: 1900,
				max: 2100,
			},
			tanggalMasuk: {
				required: true
			},
		},
		messages: {
			angkatan: {
				required: "Angkatan tidak boleh kosong"
			},
			biodataId: {
				required: "Biodata tidak boleh kosong"
			},
			programPembelajaranId: {
				required: "Program pembelajaran tidak boleh kosong"
			},
			currentLevel: {
				required: "Tingkat pendidikan tidak boleh kosong"
			},
			tahunMasuk: {
				required: "Tahun masuk tidak boleh kosong",
				minlength: "Tahun tidak valid",
				min: "Tahun harus di antara 1900-2100",
				max: "Tahun harus di antara 1900-2100"
			},
			tanggalMasuk: {
				required: "Tanggal masuk tidak boleh kosong"
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
				url: "http://localhost:8080/pesertaprogram/save",
				data: JSON.stringify(
					{
						'id': {
							'angkatan': $('#angkatan').val(),
							'biodataId': $('#biodataId').val(),
							'programPembelajaranId': $('#programPembelajaranId').val()
						},
						'currentLevel': $('#currentLevel').val(),
						'tahunMasuk': $('#tahunMasuk').val(),
						'tanggalMasuk': $('#datepicker').val().toString()
					}),
				cache: false,
				success: function() {
					$("#msg").html("<div class='alert alert-success text-center' role='alert'><i class='icon fas fa-check'> Data berhasil ditambahkan</div>").fadeIn()
						.fadeOut(1999, function() {
							$("#msg").html("");
						});
					$("#form").hide();
					$("#headerModal").hide();
					$("#footerModal").hide();
					window.setTimeout(function() {
						showData();
						$("#msg").html("");
						$('#angkatan').val("");
						$('#biodataId').val("");
						$('#programPembelajaranId').val("");
						$('#currentLevel').val("");
						$('#tahunMasuk').val("");
						$('#tanggalMasuk').val("");
						$('#datepicker').val("");
						$('#reservationdate').val("");
						$("#addModal").modal('hide');
					}, 2000)
					window.setTimeout(function() {
						$("#form").show();
						$("#headerModal").show();
						$("#footerModal").show();
					}, 2001)
				},
				error: function() {
					$("#msg").html("<div class='alert alert-danger text-center' role='alert'><i class='icon fas fa-exclamation-triangle'><strong> Input data gagal</strong></div>");
				}
			});
		}
	});

	//form validation ubah data
	$('#form-validation-edit').validate({
		rules: {
			angkatan: {
				required: true
			},
			biodataId: {
				required: true
			},
			programPembelajaranId: {
				required: true
			},
			currentLevel: {
				required: true
			},
			tahunMasuk: {
				required: true,
				minlength: 4,
				min: 1900,
				max: 2100,
			},
			tanggalMasuk: {
				required: true
			},
		},
		messages: {
			angkatan: {
				required: "Angkatan tidak boleh kosong"
			},
			biodataId: {
				required: "Biodata tidak boleh kosong"
			},
			programPembelajaranId: {
				required: "Program pembelajaran tidak boleh kosong"
			},
			currentLevel: {
				required: "Tingkat pendidikan tidak boleh kosong"
			},
			tahunMasuk: {
				required: "Tahun masuk tidak boleh kosong",
				minlength: "Tahun tidak valid",
				min: "Tahun harus di antara 1900-2100",
				max: "Tahun harus di antara 1900-2100"
			},
			tanggalMasuk: {
				required: "Tanggal masuk tidak boleh kosong"
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
				url: "http://localhost:8080/pesertaprogram/save",
				data: JSON.stringify(
					{ 'id': { 'angkatan': $('#eAngkatan').val(), 'biodataId': $('#eBiodataId').val(), 'programPembelajaranId': $('#eProgramPembelajaranId').val() }, 'currentLevel': $('#eCurrentLevel').val(), 'tahunMasuk': $('#eTahunMasuk').val(), 'tanggalMasuk': $('#eDatepicker').val().toString() }),
				cache: false,
				success: function() {
					$("#msg-edit").html("<div class='alert alert-success text-center' role='alert'><i class='icon fas fa-check'> Data berhasil diubah</div>").fadeIn()
						.fadeOut(1999, function() {
							$("#msg-edit").html("");
						});
					$("#form-edit").hide();
					$("#headerModal-edit").hide();
					$("#footerModal-edit").hide();
					window.setTimeout(function() {
						showData();
						$("#msg-edit").html("");
						$("#editModal").modal('hide');
					}, 2000)
					window.setTimeout(function() {
						$("#form-edit").show();
						$("#headerModal-edit").show();
						$("#footerModal-edit").show();
					}, 2001)
				},
				error: function() {
					$("#msg-edit").html("<div class='alert alert-danger text-center' role='alert'><i class='icon fas fa-exclamation-triangle'><strong> Input data gagal</strong></div>");
				}
			});
		}
	});
	$('.select2').select2()

	//	datepicker
	$(document).ready(function() {
		$('#datepicker').datepicker({
			changeMonth: true,
			changeYear: true,
			"setDate": new Date(),
			dateFormat: "yy-mm-dd",
			"autoclose": true
		});
	});
	$(document).ready(function() {
		$('#eDatepicker').datepicker({
			changeMonth: true,
			changeYear: true,
			"setDate": new Date(),
			dateFormat: "yy-mm-dd",
			"autoclose": true
		});
	});
	//	cari data
	$(document).ready(function() {
		$("#search").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$("#rows tr").filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
		});
	});
	//	menampilkan modal
	$("#addButton").click(function() {
		$("#addModal").modal('show');
		listAngkatan();
	});
	//	Input mask
	$('#tahunMasuk').inputmask('yyyy', { 'placeholder': 'yyyy' })
	$('#eTahunMasuk').inputmask('yyyy', { 'placeholder': 'yyyy' })
});

//ambil angkatan dari model angkatan
function listAngkatan() {
	$('#angkatan').empty();
	$.getJSON("http://localhost:8080/programAngkatan/", function(json) {
		var options = [];
		for (var i = 0; i < json.length; i++) {
			options.push('<option value=' + json[i].id.angkatan + '>' + json[i].id.angkatan + '</option>')
		}
		$('#angkatan').append($(options.join('')));
	})
}