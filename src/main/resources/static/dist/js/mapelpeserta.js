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

function tampil() {
	$('#list').empty();
	$.getJSON('http://localhost:8080/mapelpeserta', function(json) {
		var tr = [];
		tr.push('<thead>');
		tr.push('<tr>');
		tr.push('<th> Program Pembelajaran ID </td>');
		tr.push('<th> Angkatan </td>');
		tr.push('<th> Biodata ID </td>');
		tr.push('<th> Kode Mapel </td>');
		tr.push('<th> Nilai </td>');
		tr.push('<th> keterangan </td>');
		tr.push('<th> Saran </td>');
		tr.push('</tr>');
		tr.push('</thead>');
		tr.push('<tbody id="list2">');
		for (var i = 0; i < json.length; i++) {
			tr.push('<tr>');
			tr.push('<td>' + json[i].id.programPembelajaranId + '</td>');
			tr.push('<td>' + json[i].id.angkatan + '</td>');
			tr.push('<td>' + json[i].id.biodataId + '</td>');
			tr.push('<td>' + json[i].id.kodeMapel + '</td>');
			tr.push('<td>' + json[i].nilai + '</td>');
			tr.push('<td>' + json[i].keterangan + '</td>');
			tr.push('<td>' + json[i].saran + '</td>');
			tr.push('<td><a class=\'btn btn-outline-info btn-sm edit\'><i class="fas fa-edit fa-fw"></i> Edit</a>&nbsp;&nbsp;<a class=\'btn btn-outline-danger btn-sm delete\' id=' + json[i].id + '><i class="fas fa-trash fa-fw"></i> Delete</a></td>');
			tr.push('</tr>');
		}
		tr.push('</tbody>');
		$('table').append($(tr.join('')));
	});
}

$(document).ready(function() {
	tampil();

	$("#tombolAddModal").click(function() {
		$("#modal-default").modal('show');
		listAngkatan();
		listProgramPembelajaranId();
	})

	$("#closeTombol").click(function() {
		$("#msg").html("");
	})
	$(".close").click(function() {
		$("#msg").html("");
	})


	$(document).delegate('.delete', 'click', function() {
		if (confirm('Do you really want to delete record?')) {
			var parent = $(this).parent().parent();
			var programPembelajaranId = parent.children("td:nth-child(1)");
			var angkatan = parent.children("td:nth-child(2)");
			var biodataId = parent.children("td:nth-child(3)");
			var kodeMapel = parent.children("td:nth-child(4)");

			$.ajax({
				type: "DELETE",
				url: "http://localhost:8080/mapelpeserta/delete",
				data:
				{
					'programPembelajaranId': programPembelajaranId.html(),
					'angkatan': angkatan.html(),
					'biodataId': biodataId.html(),
					'kodeMapel': kodeMapel.html()
				},
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

	$(document).delegate('.edit', 'click', function() {
		var parent = $(this).parent().parent();

		var programPembelajaranId = parent.children("td:nth-child(1)");
		var angkatan = parent.children("td:nth-child(2)");
		var biodataId = parent.children("td:nth-child(3)");
		var kodeMapel = parent.children("td:nth-child(4)");
		var nilai = parent.children("td:nth-child(5)");
		var keterangan = parent.children("td:nth-child(6)");
		var saran = parent.children("td:nth-child(7)");
		var buttons = parent.children("td:nth-child(8)");

		let id = {
			'programPembelajaranId': programPembelajaranId.html(),
			'angkatan': angkatan.html(),
			'biodataId': biodataId.html(),
			'kodeMapel': kodeMapel.html()
		}

		nilai.html("<input type='number' id='nilai' value='" + nilai.html() + "'/>");
		keterangan.html("<input type='text' id='keterangan' value='" + keterangan.html() + "'/>");
		saran.html("<input type='text' id='saran' value='" + saran.html() + "'/>");
		buttons.html("<a id='save' class='btn btn-outline-success btn-sm'><i class='far fa-save'></i> Save</a>&nbsp;&nbsp;<a class=\'btn btn-outline-danger btn-sm delete\' id='" + id + "'><i class='fas fa-trash fa-fw'></i> Delete</a>");
	});

	$(document).delegate('#save', 'click', function() {
		var parent = $(this).parent().parent();
		var programPembelajaranId = parent.children("td:nth-child(1)");
		var angkatan = parent.children("td:nth-child(2)");
		var biodataId = parent.children("td:nth-child(3)");
		var kodeMapel = parent.children("td:nth-child(4)");
		var nilai = parent.children("td:nth-child(5)");
		var keterangan = parent.children("td:nth-child(6)");
		var saran = parent.children("td:nth-child(7)");
		var buttons = parent.children("td:nth-child(8)");

		let id = {
			'programPembelajaranId': programPembelajaranId.html(),
			'angkatan': angkatan.html(),
			'biodataId': biodataId.html(),
			'kodeMapel': kodeMapel.html()
		}

		if(nilai.children("input[type=number]").val() == "") {
			alert(" Nilai tidak boleh kosong ");
		} else if(nilai.children("input[type=number]").val() >= 0 && nilai.children("input[type=number]").val() <= 100 ){
			$.ajax({
				type: "PUT",
				contentType: "application/json; charset=utf-8",
				url: "http://localhost:8080/mapelpeserta/save",
				data: JSON.stringify(
					{
						'createdBy': $('#username').html(),
						'updatedBy': $('#username').html(),
						id,
						'nilai': nilai.children("input[type=number]").val(),
						'keterangan': keterangan.children("input[type=text]").val(),
						'saran': saran.children("input[type=text]").val()
					}),
				cache: false,
				success: function() {
					nilai.html(nilai.children("input[type=number]").val());
					keterangan.html(keterangan.children("input[type=text]").val());
					saran.html(saran.children("input[type=text]").val());
					buttons.html("<a class=\'btn btn-outline-info btn-sm edit\' id='" + id + "'><i class='far fa-edit'></i> Edit</a>&nbsp;&nbsp;<a class=\'btn btn-outline-danger btn-sm delete\' id='" + id + "'><i class='fas fa-trash fa-fw'></i> Delete</a>");
				},
				error: function() {
					$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error updating record').fadeIn().fadeOut(4000, function() {
						$(this).remove();
					});
				}
			});
		} else {
			alert("Rentang nilai 0-100");
		}
	});

	$('#form-validation').validate({
		rules: {
			programPembelajaranId: {
				required: true
			},
			angkatan: {
				required: true
			},
			biodataId: {
				required: true
			},
			kodeMapel: {
				required: true
			},
			nilai: {
				required: true,
				min: 0,
				max: 100
			},
		},
		messages: {
			programPembelajaranId: {
				required: "ID tidak boleh kosong"
			},
			angkatan: {
				required: "Angkata tidak boleh kosong"
			},
			biodataId: {
				required: "Biodata Id tidak boleh kosong"
			},
			kodeMapel: {
				required: "Kode Mapel tidak boleh kosong"
			},
			nilai: {
				required: "Nilai tidak boleh kosong",
				min: "Rentang nilai 0-100",
				max: "Rentang nilai 0-100"
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
				url: "http://localhost:8080/mapelpeserta/save",
				data: JSON.stringify(
					{
						'createdBy': $('#username').html(),
						'id': {
							'programPembelajaranId': $('#programPembelajaranId').val(),
							'angkatan': $('#angkatan').val(),
							'biodataId': $('#biodataId').val(),
							'kodeMapel': $('#kodeMapel').val(),
						},
						'nilai': $('#nilai').val(),
						'keterangan': $('#keterangan').val(),
						'saran': $('#saran').val()
					}),
				cache: false,
				success: function(result) {
					$("#msg").html("<span style='color: green'>Nilai berhasil ditambahkan</span>").fadeOut(1999, function() {
						$("#msg").html("");
					});
					$("#form").hide();
					$("#modal-header").hide();
					$("#modal-footer").hide();
					window.setTimeout(function() {
						tampil();
						$('#msg').html("");
						$('#programPembelajaranId').val('');
						$('#angkatan').val('');
						$('#biodataId').val('');
						$('#kodeMapel').val('');
						$('#nilai').val('');
						$('#keterangan').val('');
						$('#saran').val('');
						$("#modal-default").modal('hide');
					}, 1000);
					window.setTimeout(function() {
						$("#form").show();
						$("#modal-header").show();
						$("#modal-footer").show();
					}, 1500);
				},
				error: function() {
					$("#msg").html("<span style='color: red'>Data tidak boleh kosong</span>");
				}
			});
		}
	});

	$(document).ready(function() {
		$("#myInput").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$("#list2 tr").filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
		});
	});
});
