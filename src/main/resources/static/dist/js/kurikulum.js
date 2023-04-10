
function success() {
	$("#msg").html("<span style='color: green'>Data kurikulum berhasil ditambahkan !!</span><br>");
	setTimeout(function() {
		$('#add').modal('hide');
		$('#nama').val('');
		$('#keterangan').val('');
		$('#msg').html(null);
	}, 1000);
	showTable();
}

function error() {
	$("#err").html("<span style=\'color:red; font-weight: bold; font-size: 15px;\'>Data tidak berhasil dirubah, silahkan isi data dengan benar</span><br>");
	setTimeout(function() {
		$('#err').html(null);
	}, 3000);
	showTable();
}
function showTable() {
	$.getJSON('http://localhost:8080/kurikulum', function(json) {
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
			tr.push('<td ><a class=\'edit\'><button class="btn btn-outline-info btn-sm"><i class="fas fa-edit"></i> Ubah</button></a>&nbsp;&nbsp;<a class=\'delete\' id=' + json[i].id + '><button class="btn btn-outline-danger btn-sm"><i class="fas fa-trash"></i> Hapus</button></a></td>');
			tr.push('</tr>');
		}
		tr.push('</tbody>');
		$('table').append($(tr.join('')));
	});

}



$(document).ready(function() {
	showTable();
	$(document).delegate('#addNew', 'click', function(event) {
		event.preventDefault();
		var nama = $('#nama').val();
		var keterangan = $('#keterangan').val();
		var createdBy = 'taopik';

		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8080/kurikulum",
			data: JSON.stringify({ 'nama': nama, 'keterangan': keterangan, 'createdBy': createdBy }),
			cache: false,
			success: success,
			error: function() {
				$("#msg").html("<span style='color: red'>Pastikan semua data terisi dengan benar.!</span>");
			}
		});
	});

	$("#search").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#kurikulumTable tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});

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
					showTable()
				},
				error: function() {
					$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 15px;\'>Error deleting record').fadeIn().fadeOut(4000, function() {
						$(this).remove();
					});
				}
			});
		}
	});

	$(document).delegate('.edit', 'click', function() {
		var parent = $(this).parent().parent();

		var nama = parent.children("td:nth-child(2)");
		var keterangan = parent.children("td:nth-child(3)");
		var buttons = parent.children("td:nth-child(4)");

		nama.html("<input required type='text' id='txtName' value='" + nama.html() + "'/>");
		keterangan.html("<input required type='text' id='txtEmail' value='" + keterangan.html() + "'/>")
		buttons.html("<button class='btn btn-outline-primary btn-sm' id='save'><i class='fas fa-save'></i> Simpan</button>&nbsp;&nbsp;<a class=\'delete\' id=' + json[i].id + '><button class='btn btn-outline-danger btn-sm'><i class='fas fa-trash'></i>Hapus</button></a>");
	});

	$(document).delegate('#save', 'click', function() {
		var parent = $(this).parent().parent();
		let id = parent.children("td:nth-child(1)");
		var nama = parent.children("td:nth-child(2)");
		var keterangan = parent.children("td:nth-child(3)");
		var buttons = parent.children("td:nth-child(4)");
		$.ajax({
			type: "PUT",
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8080/kurikulum",
			data: JSON.stringify({ 'id': id.html(), 'nama': nama.children("input[type=text]").val(), 'keterangan': keterangan.children("input[type=text]").val(), 'updatedBy': "Romdon" }),
			cache: false,
			success: function() {
				nama.html(nama.children("input[type=text]").val());
				keterangan.html(keterangan.children("input[type=text]").val());
				buttons.html("<a class=\'edit\'><button class='btn btn-outline-info btn-sm'><i class='fas fa-edit'></i>Ubah</button></a>&nbsp;&nbsp;<a class=\'delete\' id=' + json[i].id + '><button class='btn btn-outline-danger btn-sm'><i class='fas fa-trash'></i>Hapus</button></a>");
			},
			error: error
		});
	});
	



});



