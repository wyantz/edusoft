function showTable() {
	$('#biodataTable').empty();
	$.getJSON('http://localhost:8080/biodata/', function(json) {
		var tr = [];
		tr.push('<thead>');
		tr.push('<tr>');
		tr.push('<th>ID</th>');
		tr.push('<th>NIK</th>');
		tr.push('<th>Nama</th>');
		tr.push('<th>Tanggal Lahir</th>');
		tr.push('<th>Tempat Lahir</th>');
		tr.push('<th>Jenis Kelamin</th>');
		tr.push('<th>Asal Sekolah</th>');
		tr.push('<th>Level Sekolah Asal</th>');
		tr.push('<th>Pekerjaan</th>');
		tr.push('<th>Action</th>');
		tr.push('</tr>');
		tr.push('</thead>');
		tr.push('<tbody id="biodata">');
		for (var i = 0; i < json.length; i++) {
			tr.push('<tr>');
			tr.push('<td>' + json[i].id + '</td>');
			tr.push('<td>' + json[i].nik + '</td>');
			tr.push('<td>' + json[i].nama + '</td>');
			tr.push('<td>' + json[i].tanggalLahir + '</td>');
			tr.push('<td>' + json[i].tempatLahir + '</td>');
			tr.push('<td>' + json[i].kodeJenisKelamin + '</td>');
			tr.push('<td>' + json[i].asalSekolah + '</td>');
			tr.push('<td>' + json[i].levelSekolahAsal + '</td>');
			tr.push('<td>' + json[i].kodePekerjaan + '</td>');
			tr.push('<td><a class=\'btn btn-primary edit\'><i class="fas fa-edit fa-fw"></i> Edit</a>&nbsp;&nbsp;&nbsp;<a class=\'btn btn-danger delete\' id=' + json[i].id + '><i class="fas fa-trash fa-fw"></i> Delete</a></td>');
			tr.push('</tr>');
		}
		tr.push('</tbody>');
		$('#biodataTable').append($(tr.join('')));
	});
}



$(document).ready(function() {
	showTable();
	
	$('.close').click(function() {
		$("#msg").html("");
	})
	$("#closeModal").click(function() {
		$("#msg").html("");
	})

	$("#myInput").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#biodata tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});

	// datepicker
	$(document).ready(function() {
		$('#tanggalLahir').datepicker({
			changeMonth: true,
			changeYear: true,
			"setDate": new Date(),
			dateFormat: "yy-mm-dd",
			"autoclose": true
		});
	});

		$('#form-validation').validate({
		rules: {
			nik: {
				required: true
			},
			nama: {
				required: true
			},
			tanggalLahir: {
				required: true
			},
			tempatLahir: {
				required: true
			},
			kodeJenisKelamin: {
				required: true,
			},
			asalSekolah: {
				required: true
			},
			levelSekolahAsal: {
				required: true
			},
			kodePekerjaan: {
				required: true
			},
		},
		messages: {
			nik: {
				required: "NIK tidak boleh kosong"
			},
			nama: {
				required: "Nama tidak boleh kosong"
			},
			tanggalLahir: {
				required: "Tanggal Lahir tidak boleh kosong"
			},
			tempatLahir: {
				required: "Tempat Lahir tidak boleh kosong"
			},
			kodeJenisKelamin: {
				required: "Jenis Kelamin tidak boleh kosong",
			},
			asalSekolah: {
				required: "Asal Sekolah tidak boleh kosong"
			},
			levelSekolahAsal: {
				required: "Level Sekolah Asal tidak boleh kosong"
			},
			kodePekerjaan: {
				required: "Pekerjaan tidak boleh kosong"
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
				url: "http://localhost:8080/biodata/save",
				data: JSON.stringify(
					{ 'createdBy': 'lia', 'updatedBy': 'haha', 'nik': $('#nik').val(), 'nama': $('#nama').val(), 'tanggalLahir': $('#tanggalLahir').val().toString(), 'tempatLahir': $('#tempatLahir').val(), 'kodeJenisKelamin': $('#kodeJenisKelamin').val(), 'asalSekolah': $('#asalSekolah').val(), 'levelSekolahAsal': $('#levelSekolahAsal').val(), 'kodePekerjaan': $('#kodePekerjaan').val() }),
				/*data: JSON.stringify(biodata),*/
				cache: false,
				success: function(result) {
					$("#msg").html("<div class='alert alert-success text-centre' role=''alert'><strong>Data Berhasil diisi</strong></div>");
					$("#form").hide();
					$("#headerModal").hide();
					$("#footerModal").hide();
					setTimeout(function() {
						showTable();
						$("#msg").html("");
						$('#nik').val('');
						$('#nama').val('');
						$('#tanggalLahir').val('');
						$('#tempatLahir').val('');
						$('#kodeJenisKelamin').val('');
						$('#asalSekolah').val('');
						$('#levelSekolahAsal').val('');
						$('#kodePekerjaan').val('');
						$("#exampleModal").modal('hide');
					}, 1000);
					setTimeout(function() {
						$("#form").show();
						$("#headerModal").hide();
						$("#footerModal").hide();
					}, 1500);

				},
				error: function(err) {
					$("#msg").html("<div class='alert alert-danger text-centre' role=''alert'><strong>Data tidak boleh kosong</strong></div>");
				}
			});
		}
	});

	$(document).delegate('.delete', 'click', function() {
		if (confirm('Anda yakin ingin mengapus data ini?')) {
			var id = $(this).attr('id');
			var parent = $(this).parent()
				.parent();
			$.ajax({
				type: "DELETE",
				url: "http://localhost:8080/biodata/delete/" + id,
				cache: false,
				success: function() {
					parent.fadeOut(
						'slow', function() {
							$(this).remove();
						});
					showTable();
				},
				error: function() {
					$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error deleting record')
						.fadeIn()
						.fadeOut(4000, function() {
							$(this).remove();
						});
				}
			});
		}
	});

	$(document).delegate('.edit', 'click', function() {
		var parent = $(this).parent().parent();
		var id = parent.children("td:nth-child(1)");
		var nik = parent.children("td:nth-child(2)");
		var nama = parent.children("td:nth-child(3)");
		var tanggalLahir = parent.children("td:nth-child(4)");
		var tempatLahir = parent.children("td:nth-child(5)");
		var kodeJenisKelamin = parent.children("td:nth-child(6)");
		var asalSekolah = parent.children("td:nth-child(7)");
		var levelSekolahAsal = parent.children("td:nth-child(8)");
		var kodePekerjaan = parent.children("td:nth-child(9)");
		var buttons = parent.children("td:nth-child(10)");
		console.log(kodeJenisKelamin.html());

		nik.html("<input type='text' id='nik' value='" + nik.html() + "' class='form-control'/>");
		nama.html("<input type='text' id='nama' value='" + nama.html() + "' class='form-control'/>");
		tanggalLahir.html("<input type='text' id='tanggalLahir' value='" + tanggalLahir.html() + "' class='form-control'/>");
		tempatLahir.html("<input type='text' id='tempatLahir' value='" + tempatLahir.html() + "' class='form-control'/>");
		kodeJenisKelamin.html("<input type='text' id='kodeJenisKelamin' value='" + kodeJenisKelamin.html() + "' class='form-control'/>");
		asalSekolah.html("<input type='text' id='asalSekolah' value='" + asalSekolah.html() + "' class='form-control'/>");
		levelSekolahAsal.html("<input type='text' id='levelSekolahAsal' value='" + levelSekolahAsal.html() + "' class='form-control'/>");
		kodePekerjaan.html("<input type='text' id='tanggalLahir' value='" + kodePekerjaan.html() + "' class='form-control'/>");
		buttons.html("<a id='save' class='btn btn-success toastsDefaultDanger'><i class='fas fa-save fa-fw'></i>Save</a>&nbsp;&nbsp;&nbsp;<a class='btn btn-danger delete' id='" + id.html() + "'><i class='fas fa-trash fa-fw'></i>Delete</a>");
	});

	$(document).delegate('#save', 'click', function() {
		var parent = $(this).parent().parent();
		var id = parent.children("td:nth-child(1)");
		var nik = parent.children("td:nth-child(2)");
		var nama = parent.children("td:nth-child(3)");
		var tanggalLahir = parent.children("td:nth-child(4)");
		var tempatLahir = parent.children("td:nth-child(5)");
		var kodeJenisKelamin = parent.children("td:nth-child(6)");
		var asalSekolah = parent.children("td:nth-child(7)");
		var levelSekolahAsal = parent.children("td:nth-child(8)");
		var kodePekerjaan = parent.children("td:nth-child(9)");
		var buttons = parent.children("td:nth-child(10)");
		if (id.children("input[type=text]").val() == "" || nik.children("input[type=text]").val() == "" ||
			nama.children("input[type=text]").val() == "" || tanggalLahir.children("input[type=text]").val() == "" ||
			tempatLahir.children("input[type=text]").val() == "" || kodeJenisKelamin.children("input[type=text]").val() == "" ||
			asalSekolah.children("input[type=text]").val() == "" || levelSekolahAsal.children("input[type=text]").val() == "" ||
			kodePekerjaan.children("input[type=text]").val() == "") {
			$('.toastsDefaultDanger').click(function() {
				$(document).Toasts('create', {
					class: 'bg-danger',
					title: 'Invalid Update',
					body: 'Data harus diisi'
				})
			});
		}

		if (id.children("input[type=text]").val() != "" || nik.children("input[type=text]").val() != "" ||
			nama.children("input[type=text]").val() != "" || tanggalLahir.children("input[type=text]").val() != "" ||
			tempatLahir.children("input[type=text]").val() != "" || kodeJenisKelamin.children("input[type=text]").val() != "" ||
			asalSekolah.children("input[type=text]").val() != "" || levelSekolahAsal.children("input[type=text]").val() != "" ||
			kodePekerjaan.children("input[type=text]").val() != "") {
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "http://localhost:8080/biodata/save",
				data: JSON.stringify({
					'createdBy': 'lia',
					'updatedBy': 'haha',
					'id': id.html(),
					'nik': nik.children("input[type=text]").val(),
					'nama': nama.children("input[type=text]").val(),
					'tanggalLahir': tanggalLahir.children("input[type=text]").val(),
					'tempatLahir': tempatLahir.children("input[type=text]").val(),
					'kodeJenisKelamin': kodeJenisKelamin.children("option[type=text]").val(),
					'asalSekolah': asalSekolah.children("input[type=text]").val(),
					'levelSekolahAsal': levelSekolahAsal.children("input[type=text]").val(),
					'kodePekerjaan': kodePekerjaan.children("input[type=text]").val()
				}),
				cache: false,
				success: function() {
					nik.html(nik.children("input[type=text]").val());
					nama.html(nama.children("input[type=text]").val());
					tanggalLahir.html(tanggalLahir.children("input[type=text]").val());
					tempatLahir.html(tempatLahir.children("input[type=text]").val());
					kodeJenisKelamin.html(kodeJenisKelamin.children("input[type=text]").val());
					asalSekolah.html(asalSekolah.children("input[type=text]").val());
					levelSekolahAsal.html(levelSekolahAsal.children("input[type=text]").val());
					kodePekerjaan.html(kodePekerjaan.children("input[type=text]").val());
					buttons.html("<a class='btn btn-primary edit' id='" + id.html() + "'><i class='fas fa-edit fa-fw'></i> Edit</a>&nbsp;&nbsp;&nbsp;<a class='btn btn-danger delete' id='" + id.html() + "'><i class='fas fa-trash fa-fw'></i>Delete</a>");
				},
				error: function() {
					$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error updating record').fadeIn().fadeOut(4000, function() {
						$(this).remove();
					});
				}
			});
		}
	});

});