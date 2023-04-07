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
		tr.push('<th colspan="2" class="text-center">Actions</th>');
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
			tr.push('<td class="text-center"><a class=\'edit\'><button type="button" class="btn btn-outline-primary btn-sm"><i class="fas fa-edit fa-fw me-3"></i> Edit</button></a></td>');
			tr.push('<td class="text-center"><a class=\'delete\' id=' + JSON.stringify(json[i].id) + '><button type="button" class="btn btn-outline-danger btn-sm me-3"><i class="fas fa-trash fa-fw"></i> Delete</button></a></td>');
			tr.push('</tr>');
		}
		tr.push('</tbody>');
		$("#tablepp").append($(tr.join('')));
	});
}
$(document).ready(function() {
	showData();
	/*$(document).delegate('#addNew', 'click', function(event) {
		event.preventDefault();
		var angkatan = $('#angkatan').val();
		var biodataId = $('#biodataId').val();
		var programPembelajaranId = $('#programPembelajaranId').val();
		var currentLevel = $('#currentLevel').val();
		var tahunMasuk = $('#tahunMasuk').val();
		var tanggalMasuk = $('#datepicker').val().toString();
		var tanggalMasuk = $('#reservationdate').val().toString();

		if (angkatan == "" || biodataId == "" || programPembelajaranId == "" || currentLevel == "" || tahunMasuk == "" || tanggalMasuk == "") {
			$('#angkatan').html('<input type = "number" id = "angkatan" name = "angkatan" class= "form-control is-invalid" > ');
			$('#invalid-angkatan').html("<div class='form-text text-danger'>Angkatan tidak boleh kosong</div>");
			$('#invalid-biodataId').html("<div class='form-text text-danger'>Biodata tidak boleh kosong</div>");
			$('#invalid-programPembelajaranId').html("<div class='form-text text-danger'>Tahun Pembelajaran tidak boleh kosong</div>");
			$('#invalid-currentLevel').html("<div class='form-text text-danger'>Tingkat pendidikan tidak boleh kosong</div>");
			$('#invalid-tahunMasuk').html("<div class='form-text text-danger'>Tahun masuk tidak boleh kosong</div>");
			$('#invalid-tanggalMasuk').html("<div class='form-text text-danger'>Tanggal masuk tidak boleh kosong</div>");
			window.setTimeout(function() {
				$('#angkatan').html('<input type = "number" id = "angkatan" name = "angkatan" class= "form-control" > ');
				$("#invalid-angkatan").html("");
				$("#invalid-biodataId").html("");
				$("#invalid-programPembelajaranId").html("");
				$("#invalid-currentLevel").html("");
				$("#invalid-tahunMasuk").html("");
				$("#invalid-tanggalMasuk").html("");
			}, 3000);
		}
		} else if (angkatan == "") {
			$('#invalid-angkatan').html("<div class='form-text text-danger'>angkatan cannot be null</div>");
			window.setTimeout(function() {
				$("#invalid-angkatan").html("");
			}, 3000);
		} else if (biodataId == "") {
			$('#invalid-biodataId').html("<div class='form-text text-danger'>biodataId cannot be null</div>");
			window.setTimeout(function() {
				$("#invalid-biodataId").html("");
			}, 3000);
		} else if (programPembelajaranId == "") {
			$('#invalid-programPembelajaranId').html("<div class='form-text text-danger'>programPembelajaranId cannot be null</div>");
			window.setTimeout(function() {
				$("#invalid-programPembelajaranId").html("");
			}, 3000);
		}
		if (angkatan != "" && biodataId != "" && programPembelajaranId != "" && currentLevel != "" && tahunMasuk != "" && tanggalMasuk != "") {
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "http://localhost:8080/pesertaprogram/save",
				data: JSON.stringify(
					{ 'id': { 'angkatan': angkatan, 'biodataId': biodataId, 'programPembelajaranId': programPembelajaranId }, 'currentLevel': currentLevel, 'tahunMasuk': tahunMasuk, 'tanggalMasuk': tanggalMasuk }),
				cache: false,
				success: function() {
					$("#msg").html("<div class='alert alert-success text-center' role='alert'><i class='icon fas fa-check'> Data berhasil ditambahkan</div>").fadeIn()
						.fadeOut(1999, function() {
							$(this).remove();
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
					$("#msg").html("<div class='alert alert-danger text-center' role='alert'><i class='icon fas fa-exclamation-triangle'><strong> Data cannot be null</strong></div>");
				}
			});
		}
	});*/

	$(document).delegate('.delete', 'click', function() {
		var parent = $(this).parent().parent();
		var id = $(this).attr('id');
		/*var angkatan = parent.children("td:nth-child(1)");
		var biodataId = parent.children("td:nth-child(2)");
		var programPembelajaranId = parent.children("td:nth-child(3)");
		var id = { angkatan, biodataId, programPembelajaranId };*/
		/*alert(id);*/
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
					/*location.reload(true)*/
					showData;
					$('#alert').html("<div class='alert alert-success text-center' role='alert'><i class='icon fas fa-check'><strong> Data berhasil dihapus</strong></div>")
						.fadeIn()
						.fadeOut(4000, function() {
							$('#alert').html("");
						});
				},
				error: function() {
					$('#alert').html("<div class='alert alert-danger text-center' role='alert'><i class='icon fas fa-exclamation-triangle'><strong> Data gagal dihapus</strong></div>")
						.fadeIn()
						.fadeOut(4000, function() {
							$('#alert').html("");
						});
				}
			});
		}
	});
	$(document).delegate('.edit', 'click', function() {
		var parent = $(this).parent().parent();
		/*var id = parent.children("td:nth-child(1)");*/
		var angkatan = parent.children("td:nth-child(1)");
		var biodataId = parent.children("td:nth-child(2)");
		var programPembelajaranId = parent.children("td:nth-child(3)");
		var currentLevel = parent.children("td:nth-child(4)");
		var tahunMasuk = parent.children("td:nth-child(5)");
		var tanggalMasuk = parent.children("td:nth-child(6)");
		var buttonEdit = parent.children("td:nth-child(7)");
		var buttonDelete = parent.children("td:nth-child(8)");

		angkatan.html("<input type='number' id='angkatan' value='" + angkatan.html() + "'/>");
		biodataId.html("<input type='number' id='biodataId' value='" + biodataId.html() + "'/>");
		programPembelajaranId.html("<input type='number' id='programPembelajaranId' value='" + programPembelajaranId.html() + "'/>");
		currentLevel.html("<input type='number' id='currentLevel' value='" + currentLevel.html() + "'/>");
		tahunMasuk.html("<input type='number' id='tahunMasuk' value='" + tahunMasuk.html() + "'/>");
		tanggalMasuk.html("<input type='text' id='datepicker' value='" + tanggalMasuk.html() + "'/>");
		buttonEdit.html("<a id='save'><button type='button' class='btn btn-primary btn-sm'><i class='fas fa-save fa-fw me-3'></i> Save</button></a>");
		buttonDelete.html("<button type='button' class='btn btn-outline-danger btn-sm disabled'><i class='fas fa-trash fa-fw me-3'></i> Delete</button>");
		
	});

	$(document).delegate('#save', 'click', function() {
		var parent = $(this).parent().parent();
		var angkatan = parent.children("td:nth-child(1)");
		var biodataId = parent.children("td:nth-child(2)");
		var programPembelajaranId = parent.children("td:nth-child(3)");
		var currentLevel = parent.children("td:nth-child(4)");
		var tahunMasuk = parent.children("td:nth-child(5)");
		var tanggalMasuk = parent.children("td:nth-child(6)");
		/*var buttonEdit = parent.children("td:nth-child(7)");
		var buttonDelete = parent.children("td:nth-child(8)");*/
		if (angkatan.children("input[type=number]").val() == "" || biodataId.children("input[type=number]").val() == "" || programPembelajaranId.children("input[type=number]").val() == "" || currentLevel.children("input[type=number]").val() == "" || tahunMasuk.children("input[type=number]").val() == "" || tanggalMasuk.children("input[type=text]").val() == "") {
			$('#alert').html('<div class="alert alert-danger text-center" role="alert"><i class="icon fas fa-exclamation-triangle"><strong> Data tidak boleh kosong</strong></div>');
			window.setTimeout(function() {
				$("#alert").html("");
			}, 3000)
			/*$('.swalDefaultError').click(function() {
				Toast.fire({
					icon: 'error',
					title: 'Data tidak boleh kosong'
				})
			});*/
		} else {
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "http://localhost:8080/pesertaprogram/save",
				data: JSON.stringify({
					/*'id': id.html(),*/
					'id': {
						'angkatan': angkatan.children("input[type=number]").val(),
						'biodataId': biodataId.children("input[type=number]").val(),
						'programPembelajaranId': programPembelajaranId.children("input[type=number]").val()
					},
					'currentLevel': currentLevel.children("input[type=number]").val(),
					'tahunMasuk': tahunMasuk.children("input[type=number]").val(),
					'tanggalMasuk': tanggalMasuk.children("input[type=text]").val()
				}),
				cache: false,
				success: function() {
					$('#alert').html("<div class='alert alert-success text-center' role='alert'><i class='icon fas fa-check'><strong> Data berhasil diubah</strong></div>'")
						.fadeIn()
						.fadeOut(4000, function() {
							$('#alert').html("");
						});
					showData();
					/*angkatan.html(angkatan.children("input[type=number]").val());
					biodataId.html(biodataId.children("input[type=number]").val());
					programPembelajaranId.html(programPembelajaranId.children("input[type=number]").val());
					currentLevel.html(currentLevel.children("input[type=number]").val());
					tahunMasuk.html(tahunMasuk.children("input[type=number]").val());
					tanggalMasuk.html(tanggalMasuk.children("input[type=text]").val());
					buttonEdit.html("<a class='edit' id='" + JSON.stringify({ 'id': { angkatan, biodataId, programPembelajaranId } }) + "'><button type='button' class='btn btn-outline-primary btn-sm'><i class='fas fa-edit fa-fw me-3'></i> Edit</button></a>");
					
					buttonEdit.html('<a class=\'edit\'><button type="button" class="btn btn-outline-primary btn-sm"><i class="fas fa-edit fa-fw me-3"></i> Edit</button></a>');
					buttonDelete.html("<a class='delete' id='" + JSON.stringify(json.id) + "'><button type='button' class='btn btn-outline-danger btn-sm'><i class='fas fa-trash fa-fw me-3'></i> Delete</button></a>");
					*/
				},
				error: function() {
					$('#alert').html("<div class='alert alert-danger text-center' role='alert'><i class='icon fas fa-exclamation-triangle'><strong> Data tidak boleh kosong</strong></div>'")
						.fadeIn()
						.fadeOut(4000, function() {
							$('#alert').html("");
						});
				}
			});
		}
	});
	//form validation
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
			/*var angkatan = $('#angkatan').val();
			var biodataId = $('#biodataId').val();
			var programPembelajaranId = $('#programPembelajaranId').val();
			var currentLevel = $('#currentLevel').val();
			var tahunMasuk = $('#tahunMasuk').val();
			var tanggalMasuk = $('#datepicker').val().toString();*/
			/*var tanggalMasuk = $('#reservationdate').val().toString();*/
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "http://localhost:8080/pesertaprogram/save",
				data: JSON.stringify(
					{ 'id': { 'angkatan': $('#angkatan').val(), 'biodataId': $('#biodataId').val(), 'programPembelajaranId': $('#programPembelajaranId').val() }, 'currentLevel': $('#currentLevel').val(), 'tahunMasuk': $('#tahunMasuk').val(), 'tanggalMasuk': $('#datepicker').val().toString() }),
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

	//Date picker
	$('#reservationdate').datetimepicker({
		format: "yyyy-MM-DD"
		/*format: "L"*/
	});

	$(document).ready(function() {
		/*var date = new Date();*/
		$('#datepicker').datepicker({
			changeMonth: true,
			changeYear: true,
			"setDate": new Date(),
			dateFormat: "yy-mm-dd",
			"autoclose": true
		});
	});
	$(document).ready(function() {
		$("#search").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$("#rows tr").filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
		});
	});

	$("#addButton").click(function() {
		$("#addModal").modal('show');
	});
	$("#closeModal").click(function() {
		$("#addModal").modal('hide');
		$("#msg").html("");
	});
});