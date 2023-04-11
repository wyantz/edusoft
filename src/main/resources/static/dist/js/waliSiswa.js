function tampilkanTabel(){
	$('#list').empty();
	$.getJSON('http://localhost:8080/walisiswa', function(json) {
				var tr=[];
					tr.push('<thead>');
					tr.push('<tr>');
					tr.push('<th>Biodata Id</th>');
					tr.push('<th>Jenis Wali Siswa</th>');
					tr.push('<th>Aksi</th>');
					tr.push('</tr>');
					tr.push('</thead>');
					tr.push('<tbody>');
				for (var i = 0; i < json.length; i++) {
					tr.push('<tr>');
					tr.push('<td>' + json[i].id.biodataId + '</td>');
					tr.push('<td>' + json[i].id.kodeJenisWaliSiswa + '</td>');
					tr.push('<td><button class=\'btn btn-danger delete\' id=' + JSON.stringify(json[i].id) + '>Hapus</button></td>');
					tr.push('</tr>');
				}
				tr.push('</tbody>');
				$('table').append($(tr.join('')));
			});
}

$(document).ready(function() {
			
			//tampilkan tabel
			tampilkanTabel();
			
			//tampilkan modal 'add'
			$("#tombolAddModal").click(function() {
				$("#modal-default").modal('show');
			})
			
			//add data
			$(document).delegate('#addNew', 'click', function(event) {
				$.getJSON('http://localhost:8080/walisiswa', function(json){
										
				event.preventDefault();
				var biodataId = $('#biodataId').val();
				var kodeJenisWaliSiswa = $('#kodeJenisWaliSiswa').val();
				
				if(biodataId == "" || kodeJenisWaliSiswa == ""){
					$('#msg').html("<div class='alert alert-danger' role='alert'>Data tidak boleh kosong</div>");
					
					setTimeout(function(){
						$("#msg").html("");
					},1000);
				}
				
				if(biodataId!="" && kodeJenisWaliSiswa!=""){
					var isExist = false;
					
					for(var i = 0; i < json.length; i++){
						if(biodataId == json[i].id.biodataId){
							$('#msg').html("<div class='alert alert-danger' role='alert'>Biodata Id sudah terdaftar</div>");
							
							setTimeout(function(){
								$("#msg").html("");
							},1000);
							return true;
						}
					}
					if(!isExist){
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8",
							url: "http://localhost:8080/walisiswa/save",
							data: JSON.stringify({'id':{ 'biodataId':biodataId,'kodeJenisWaliSiswa': kodeJenisWaliSiswa}}),
							cache: false,
							success: function(){
									$("#msg").html( "<div class='alert alert-success' role='alert'>Data Jenis Wali Siswa berhasil ditambahkan!</div>" );
					
									setTimeout(function() { 
										$("#modal-default").modal('hide');
										$("#biodataId").val('');
										$("#kodeJenisWaliSiswa").val('');
										$("#msg").html("");
									}, 1000);
									tampilkanTabel();
							},
							error: function(err) {
								$("#msg").html( "<div class='alert alert-danger' role='alert'>Data tidak boleh kosong</div>" );
							}
						});
						
					}
				}
				}); 
			});
			
			

			//delete data
			$(document).delegate('.delete', 'click', function() { 
				if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
					
					var id = $(this).attr('id');
					var parent = $(this).parent().parent();
					$.ajax({
						type: "DELETE",
						url: "http://localhost:8080/walisiswa/delete",
						contentType: "application/json; charset=utf-8",
						data: id,
						cache: false,
						success: function() {
							parent.fadeOut('slow', function() {
								$(this).remove();
							});
						},
						error: function() {
							$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Gagal menghapus data').fadeIn().fadeOut(4000, function() {
								$(this).remove();
							});
						}
					});
				}
			});
			
			
			
			//search data
			$(document).ready(function(){
			  $("#myInput").on("keyup", function() {
			    var value = $(this).val().toLowerCase();
			    $("#list tr").filter(function() {
			      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			    });
			  });
			});

		});