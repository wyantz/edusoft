function showTable() {
	$("#tableprogbel").empty();
	$.getJSON('http://localhost:8080/programPembelajaran/', function(json) {
		var tr = [];
		tr.push('<thead>');
		tr.push('<tr>');
		tr.push('<th>ID</th>');
		tr.push('<th>Nama</th>');
		tr.push('<th>Level Awal</th>');
		tr.push('<th>Level Akhir</th>');
		tr.push('<th>Durasi Level</th>');
		tr.push('<th>Keterangan</th>');
		tr.push('<th colspan="2" class="text-center">Aksi</th>');
		tr.push('</thead>');
		tr.push('<tbody id="rows">');
		for (var i = 0; i < json.length; i++) {
			tr.push('<tr>');
			tr.push('<td>' + json[i].id + '</td>');
			tr.push('<td>' + json[i].nama + '</td>');
			tr.push('<td>' + json[i].levelAwal + '</td>');
			tr.push('<td>' + json[i].levelAkhir + '</td>');
			tr.push('<td>' + json[i].durasiLevel + '</td>');
			tr.push('<td>' + json[i].keterangan + '</td>');
			tr.push('<td class="text-center"><a class=\'edit\' id=' + JSON.stringify(json[i].id) + '><button type="button" class="btn btn-outline-primary btn-sm"><i class="fas fa-edit fa-fw me-3"></i> Ubah</button></a></td>');
			tr.push('<td class="text-center"><a class=\'delete\' id=' + JSON.stringify(json[i].id) + '><button type="button" class="btn btn-outline-danger btn-sm me-3"><i class="fas fa-trash fa-fw"></i> Hapus</button></a></td>');
			tr.push('</tr>');
		}
		tr.push('</tbody>');
		$("#tableprogbel").append($(tr.join('')));
	});
}

function sukses(sc) {
	if (sc == "add") {
		$(".status-msg").html("<span style='color: green'>Data berhasil ditambahkan</span>");
	}
	else if (sc == "update") {
		$(".status-msg").html("<span style='color: green'>Data berhasil diupdate</span>");		
	}

	$('.input-form').hide();
	$('.modal-footer').hide();
	setTimeout(function() {
		$('#editModal').modal('hide');
		$('#addModal').modal('hide');
		$('#id').val("");
		$('#nama').val("");
		$('#levelAwal').val("");
		$('#levelAkhir').val("");
		$('#durasiLevel').val("");
		$('#keterangan').val("");
		$('.status-msg').html("");
		$('input').val('');
	}, 1000);
	setTimeout(function() {
		$('.input-form').show();
		$('.modal-footer').show();
	}, 1500);
	showTable();
}

$(document).ready(function() {
	
	showTable();
	
	//search
	$("#search").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#rows tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
		});
	});
	
	//delete
	$(document).delegate('.delete', 'click', function() {
		if (confirm('Apakah kamu yakin akan menghapus data ini?')) {
			var id = $(this).attr('id');
			var parent = $(this).parent()
				.parent();
			$.ajax({
				type: "DELETE",
				url: "http://localhost:8080/programPembelajaran/delete/" + id,
				cache: false,
				success: function() {
					parent.fadeOut(
						'slow', function() {
							$(this).remove();
						});
					location.reload(true)
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
	
	//edit
	$(document).delegate('.edit', 'click', function() {
		$('#editModal').modal('show');
		var id = $(this).attr('id');
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/programPembelajaran/update/" + id,
			contentType: "application/json; charset=utf-8",
			data: id,
			cache: false,
			success: function(data) {
				$('#eId').val(data.id);
				$('#eNama').val(data.nama); 
				$('#elevelAwal').val(data.levelAwal);
				$('#elevelAkhir').val(data.levelAkhir);
				$('#edurasiLevel').val(data.durasiLevel);
				$('#eKeterangan').val(data.keterangan);
			},
			error: function() {
				
			}
		});
	});
	
	//update
	$('#editprogbel').validate({
		rules: {
			eId: {
				required: true,
				number: true
			},
			eNama: {
				required : true,
			},
			elevelAwal: {
				required: true,
				number: true
			},
			elevelAkhir: {
				required: true,
				number: true
			},
			edurasiLevel: {
				required: true,
				number: true
			},
			eKeterangan: {
				required: true,
			},
		},
		
		messages: {
			eId: {
				required: "id tidak boleh kosong!",
				number: "id harus berupa angka!"
			},
			eNama: {
				required : "nama tidak boleh kosong!",
			},
			elevelAwal: {
				required: "level awal tidak boleh kosong!",
				number: "level awal harus berupa angka!"
			},
			elevelAkhir: {
				required: "level akhir tidak boleh kosong!",
				number: "level akhir harus berupa angka!"
			},
			edurasiLevel: {
				required: "durasi level tidak boleh kosong!",
				number: "durasi level harus berupa angka!"
			},
			eKeterangan: {
				required: "keterangan tidak boleh kosong!",
			},
		},
		
		submitHandler: function(){
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "http://localhost:8080/programPembelajaran/save",
				data: JSON.stringify({'id': $('#eId').val(), 'nama': $('#eNama').val(), 'levelAwal': $('#elevelAwal').val(), 
				'levelAkhir': $('#elevelAkhir').val(), 'durasiLevel': $('#edurasiLevel').val(), 'keterangan': $('#eKeterangan').val() }),
				cache: false,
				success: function() {
					sukses("update");
				},
				error: function() {
					$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error inserting record').fadeIn().fadeOut(4000, function() {
						$(this).remove();
					});
				}	
				})
		}
	}); 

	//add
	$('#addprogbel').validate({
		rules: {
			id: {
				required: true,
				number: true
			},
			nama: {
				required : true,
			},
			levelAwal: {
				required: true,
				number: true
			},
			levelAkhir: {
				required: true,
				number: true
			},
			durasiLevel: {
				required: true,
				number: true
			},
			keterangan: {
				required: true,
			},
		},
		
		messages: {
			id: {
				required: "id tidak boleh kosong!",
				number: "id harus berupa angka!"
			},
			nama: {
				required : "nama tidak boleh kosong!",
			},
			levelAwal: {
				required: "level awal tidak boleh kosong!",
				number: "level awal harus berupa angka!"
			},
			levelAkhir: {
				required: "level akhir tidak boleh kosong!",
				number: "level akhir harus berupa angka!"
			},
			durasiLevel: {
				required: "durasi level tidak boleh kosong!",
				number: " durasi level harus berupa angka!"
			},
			keterangan: {
				required: "keterangan tidak boleh kosong!",
			},
		},
		
		submitHandler: function(){
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "http://localhost:8080/programPembelajaran/save",
				data: JSON.stringify({ 'id': $('#id').val(), 'nama': $('#nama').val(), 'levelAwal': $('#levelAwal').val(), 
				'levelAkhir': $('#levelAkhir').val(), 'durasiLevel': $('#durasiLevel').val(), 'keterangan': $('#keterangan').val()}),
				cache: false,
				success: function() {
					sukses("add");
				},
				error: function() {
					$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error inserting record').fadeIn().fadeOut(4000, function() {
						$(this).remove();
					});
				}	
				})
		}
		
	});
	
	$("#addButton").click(function() {
				$("#addModal").modal('show');
			});
	$("#closeModal").click(function() {
				$("#addModal").modal('hide');
			});
});	