/*Dipanggil ketika berhasil menambahkan data*/
function success_add() {
	$("#add-msg").html("<span style='color: green;'>Data kurikulum berhasil ditambahkan !!</span><br>");
	$("#add-form").hide();
	setTimeout(function() {
		$('#add').modal('hide');
		$('#nama').val('');
		$('#keterangan').val('');
		$('#add-msg').html(null);
	}, 1000);
	setTimeout(function() {
		$("#add-form").show();
	}, 1300);
	showTable("");

}

/*Dipanggil ketika berhasil merubah data*/
function success_edit() {
	$("#edit-msg").html("<span style='color: green;'>Data kurikulum berhasil diubah !</span><br>");
	$("#edit-form").hide();
	setTimeout(function() {
		$('#edit').modal('hide');
		$('#edit-msg').html(null);
	}, 1000);
	setTimeout(function() {
		$("#edit-form").show();
	}, 1500);
	showTable("");
}

/*Dipanggil ketika terjadi eror saat menambah/merubah data*/
function error() {
	$("#err").html("<span style=\'color:red; font-weight: bold; font-size: 15px;\'>Data tidak berhasil dirubah, silahkan isi data dengan benar</span><br>");
	setTimeout(function() {
		$('#err').html(null);
	}, 3000);
	showTable("");
}

/*Dipanggil untuk menampilkan data dalam bentuk tabel ketika parameter keywordnya diisi "" maka akan menampilkan seluruh data,
ketika keywordnya tidak "" maka akan menamapilkan data sesuai keyword yang dimasukan*/
function showTable(keyword) {
	let url = "";
	if (keyword === "") {
		url = 'http://localhost:8080/kurikulum';
	} else {
		url = 'http://localhost:8080/kurikulum/search/' + keyword;
	}
	$.getJSON(url, function(json) {
		$('table').empty();
		var tr = [];
		tr.push('<thead>');
		tr.push('<tr>')
		tr.push('<th>ID</th>');
		tr.push('<th>Nama</th>');
		tr.push('<th>Keterangan</th>');
		tr.push('<th>Opsi</th>');
		tr.push('</tr>')
		tr.push('</thead>');
		tr.push('<tbody id="kurikulumTable">');
		for (var i = 0; i < json.length; i++) {
			tr.push('<tr>');
			tr.push('<td>' + json[i].id + '</td>');
			tr.push('<td>' + json[i].nama + '</td>');
			tr.push('<td>' + json[i].keterangan + '</td>');
			tr.push('<td ><a class=\'edit\'><button class="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#edit"><i class="fas fa-edit"></i> Ubah</button></a>&nbsp;&nbsp;<a class=\'delete\' id=' + json[i].id + '><button class="btn btn-outline-danger btn-sm"><i class="fas fa-trash"></i> Hapus</button></a></td>');
			tr.push('</tr>');
		}
		tr.push('</tbody>');
		$('table').append($(tr.join('')));
	});

}



$(document).ready(function() {
	$('li.nav-item').removeClass("menu-open"); // remove class menu-open pada semua li yang aktif
	$("#menu_nilai_3").addClass("active"); // tambahkan class active pada a dengan id menu-mapel-2
	$("#menu_nilai").addClass("active").parent().addClass("menu-open"); // tambahkan class active pada a dengan id menu-mapel-1 lalu pada parentnya (li) ditambahkan class menu-open
	
	showTable("");


	/*Menambahkan data dengan validasi terlebih dahulu*/
	$('#add-form').validate({
		rules: {
			nama: {
				required: true
			},
			keterangan: {
				required: true
			}
		},
		messages: {
			nama: {
				required: "Nama kurikulum tidak boleh kosong!"
			},
			keterangan: {
				required: "Keterangan tidak boleh kosong!"
			}
		},
		submitHandler: function() {
			$.getJSON('http://localhost:8080/kurikulum', function(json) {
				var isExist = false;
				for (var i = 0; i < json.length; i++) {
					if ($("#nama").val() === json[i].nama) {
						$("#add-msg").html("<span style='color: red;'>Nama kurikulum yang anda masukan sudah terdaftar!</span><br><br>");
						isExist = true;
					}
				}
				if (!isExist) {
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8",
						url: "http://localhost:8080/kurikulum",
						data: JSON.stringify({ 'nama': $('#nama').val(), 'keterangan': $('#keterangan').val(), 'createdBy': $('#username-login').html() }),
						cache: false,
						success: success_add,
						error: function() {
							$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error inserting record').fadeIn().fadeOut(4000, function() {
								$(this).remove();
							});
						}
					})
				}

			});

		},
		errorElement: 'span',
		errorPlacement: function(error, element) {
			error.addClass('invalid-feedback');
			element.closest('.form-group').append(error);
		},
		highlight: function(element) {
			$(element).addClass('is-invalid');
		},
		unhighlight: function(element) {
			$(element).removeClass('is-invalid');
		}
	});


	/*	fitur filter jquery untuk menampilkan data berdasarka keyword yang dimasukan pada form input search*/
	$("#search").on("keyup", function() {
		var keyword = $(this).val().toLowerCase();
		showTable(keyword);
	});



	/*Menghapus data berdasarkan id*/
	$(document).delegate('.delete', 'click', function() {
		if (confirm('Anda yakin ingin menghapus data ini.?')) {
			var id = $(this).attr('id');
			var parent = $(this).parent().parent();
			$.ajax({
				type: "DELETE",
				url: "http://localhost:8080/kurikulum/" + id,
				cache: false,
				success: function() {
					parent.fadeOut('slow', function() {
						$(this).remove();
					});
					showTable("");
				},
				error: function() {
					$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 15px;\'>Error deleting record').fadeIn().fadeOut(4000, function() {
						$(this).remove();
					});
				}
			});
		}
	});

	/*	Menambahkan data lama ke form ubah data*/
	let nama = "";
	$(document).delegate('.edit', 'click', function() {
		var parent = $(this).parent().parent();
		var id = parent.children("td:nth-child(1)");
		nama = parent.children("td:nth-child(2)");
		var keterangan = parent.children("td:nth-child(3)");

		$("#edId").val(id.html());
		$("#edNama").val(nama.html());
		$("#edKeterangan").val(keterangan.html());

	});

	/*	Edit data dengan validasi terlebih dahulu*/
	$('#edit-form').validate({
		rules: {
			nama: {
				required: true
			},
			keterangan: {
				required: true
			}
		},
		messages: {
			nama: {
				required: "Nama kurikulum tidak boleh kosong!"
			},
			keterangan: {
				required: "Keterangan tidak boleh kosong!"
			}
		},
		submitHandler: function() {
			if (nama.html() === $("#edNama").val()) {
				$.ajax({
					type: "PUT",
					contentType: "application/json; charset=utf-8",
					url: "http://localhost:8080/kurikulum",
					data: JSON.stringify({ 'id': $('#edId').val(), 'nama': $('#edNama').val(), 'keterangan': $('#edKeterangan').val(), 'updatedBy': $('#username-login').html() }),
					cache: false,
					success: success_edit,
					error: function() {
						$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error inserting record').fadeIn().fadeOut(4000, function() {
							$(this).remove();
						});
					}
				});

			} else if (!(nama.html() === $("#edNama").val())) {
				$.getJSON("http://localhost:8080/kurikulum", function(json) {
					let isExist = false;
					for (let i = 0; i < json.length; i++) {
						if ($("#edNama").val() === json[i].nama) {
							$("#edit-msg").html("<span style='color: red;'>Nama kurikulum yang anda masukan sudah terdaftar!</span><br><br>");
							isExist = true;
						}
					}
					if (!isExist) {
						$.ajax({
							type: "PUT",
							contentType: "application/json; charset=utf-8",
							url: "http://localhost:8080/kurikulum",
							data: JSON.stringify({ 'id': $('#edId').val(), 'nama': $('#edNama').val(), 'keterangan': $('#edKeterangan').val(), 'updatedBy': $('#username-login').html() }),
							cache: false,
							success: success_edit,
							error: function() {
								$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error inserting record').fadeIn().fadeOut(4000, function() {
									$(this).remove();
								});
							}
						});

					}
				})
			}

		},
		errorElement: 'span',
		errorPlacement: function(error, element) {
			error.addClass('invalid-feedback');
			element.closest('.form-group').append(error);
		},
		highlight: function(element) {
			$(element).addClass('is-invalid');
		},
		unhighlight: function(element) {
			$(element).removeClass('is-invalid');
		}
	});
/*	$.getJSON("http://localhost:8080/kurikulum", function(json) {

		$('#pagination-demo').twbsPagination({
			totalPages: json.length,
			visiblePages: 3,
			onPageClick: function(event, page) {
				$('#page-content').text('Page ' + page);
			}
		});

	});*/




});


