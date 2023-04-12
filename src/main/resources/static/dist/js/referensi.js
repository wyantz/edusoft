function sukses(){
	$("#msg").html("<div class='alert alert-success' role='alert'>Data added successfully</div>");
	$("#input-form").hide();
	setTimeout(function(){
		$("#addModals").modal('hide');
		$("#kode").val('');
		$("#jenis").val('');
		$("#keterangan").val('');
		$("#msg").html("");
	},1000);
	setTimeout(function(){
		$("#input-form").show();
	},1500);
	tampilkanTable();
}
function edit_sukses(){
	$("#edit_msg").html("<div class='alert alert-success' role='alert'>Data edited successfully</div>");
	$("#edit-form").hide();
	setTimeout(function(){;
		$("#editModal").modal('hide');
		$("#edit_kode").val('');
		$("#edit_jenis").val('');
		$("#edit_keterangan").val('');
		$("#edit_msg").html("");
	},1000);
	setTimeout(function(){
		$("#edit-form").show();
	},1500);
	tampilkanTable();
}
function tampilkanTable(){
	$('table').empty();
	$.getJSON('http://localhost:8080/referensi', function(json) {
				var tr=[];
				tr.push('<thead>');
				tr.push('<tr>');
					tr.push('<td>Kode</td>');
					tr.push('<td>Jenis</td>');
					tr.push('<td>Keterangan</td>');
					tr.push('<td>Action</td>');
					tr.push('</tr>');
				tr.push('</thead>');
				tr.push('<tbody id="rows">');
				for (var i = 0; i < json.length; i++) {
					tr.push('<tr>');
					tr.push('<td>' + json[i].id.kode + '</td>');
					tr.push('<td>' + json[i].id.jenis + '</td>');
					tr.push('<td>' + json[i].keterangan + '</td>');
					tr.push('<td><div class=\'col-md-6\'><button class=\'edit btn btn-outline-warning\' id=' + JSON.stringify(json[i].id)+ '><i class=\'fa fa-edit\'></i>    Edit</button>&nbsp;&nbsp;<button class=\'delete btn btn-outline-danger\' id=' + JSON.stringify(json[i].id)+ '><i class=\'fa fa-trash\'></i>    Delete</button></div></td>');
					tr.push('</tr>');
				}
				tr.push('</tbody>');
				$('table').append($(tr.join('')));
			});
}
$(document).ready(function(){
	$('li.nav-item').removeClass("menu-open"); 
	$("#menu_referensi_1").addClass("active"); 
	$("#menu_referensi").addClass("active").parent().addClass("menu-open");
	
	$("#search").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#rows tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
	tampilkanTable();
	$(document).delegate('#addNew', 'click', function(event) {
				$.getJSON('http://localhost:8080/referensi', function(json){					
				event.preventDefault();
				var kode = $('#kode').val();
				var jenis = $('#jenis').val();
				var keterangan = $('#keterangan').val();
				if(kode=="" || jenis=="" || keterangan==""){
					$('#msg').html("<div class='alert alert-danger' role='alert'>Data tidak boleh kosong</div>");
					setTimeout(function(){
						$("#msg").html("");
					},1000);
				}
				if(kode!="" && jenis!="" && keterangan!=""){
					var dataTerdaftar = false;
					for(var i = 0;i<json.length;i++){
						if(kode==json[i].id.kode && jenis ==json[i].id.jenis){
							$('#msg').html("<div class='alert alert-danger' role='alert'>Id sudah terdaftar</div>");
							setTimeout(function(){
								$("#msg").html("");
							},1000);
							return true;
						}
					}
					if(!dataTerdaftar){
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8",
							url: "http://localhost:8080/referensi/save",
							data: JSON.stringify({'id':{ 'kode':kode,'jenis': jenis},'keterangan': keterangan}),
							cache: false,
							success: sukses,
							error: function(err) {
								$("#msg").html( "<span style='color: red'>ID is required</span>" );
							}
						});
						
					}
				}
				}); 
			});
			$(document).delegate('.delete', 'click', function() { 
				if (confirm('Do you really want to delete record?')) {
					var id = $(this).attr('id');
//					var parent = $(this).parent().parent();
					$.ajax({
						type: "DELETE",
						contentType: "application/json; charset=utf-8",
						url: "http://localhost:8080/referensi/delete",
						data : id,
						cache: false,
						success: function() {
							tampilkanTable();
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
				var id = $(this).attr('id');
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8",
					url: "http://localhost:8080/referensi/edit",
					data : id,
					cache: false,
					success: function(data){
						$("#editModal").modal('show');
						$("#edit_kode").val(data.id.kode);
						$("#edit_jenis").val(data.id.jenis);
						$("#edit_keterangan").val(data.keterangan);
					},
					error: function(err) {
						$("#msg").html( "<span style='color: red'>ID is required</span>" );
					}
				});
			});
			
			$(document).delegate('#saveEdit', 'click', function(event) {
				event.preventDefault();
				var kode = $('#edit_kode').val();
				var jenis = $('#edit_jenis').val();
				var keterangan = $('#edit_keterangan').val();
				if(kode=="" || jenis=="" || keterangan==""){
					$('#edit_msg').html("<div class='alert alert-danger' role='alert'>Data tidak boleh kosong</div>");
					setTimeout(function(){
						$("#edit_msg").html("");
					},1000);
				}
				if(kode!="" && jenis!="" && keterangan!=""){
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8",
					url: "http://localhost:8080/referensi/save",
					data: JSON.stringify({'id':{ 'kode':kode,'jenis': jenis},'keterangan': keterangan}),
					cache: false,
					success: edit_sukses,
					error: function(err) {
						$("#msg").html( "<span style='color: red'>ID is required</span>" );
					}
				});
				}
			});
//			$(document).delegate('#save', 'click', function() {
//				var parent = $(this).parent().parent();
//				
//				var id = parent.children("td:nth-child(1)");
//				var jenis = parent.children("td:nth-child(2)");
//				var keterangan = parent.children("td:nth-child(3)");
//				var buttons = parent.children("td:nth-child(5)");
//				
//				$.ajax({
//					type: "POST",
//					contentType: "application/json; charset=utf-8",
//					url: "http://localhost:8081/referensi/save",
//					data: JSON.stringify({'id' : id.children("input[type=text]").val(), 
//					'jenis' : jenis.children("input[type=text]").val(),
//					'keterangan' : keterangan.children("input[type=text]").val()}),
//					cache: false,
//					success: function() {
//						id.html(id.children("input[type=text]").val());
//						jenis.html(jenis.children("input[type=text]").val());
//						keterangan.html(keterangan.children("input[type=text]").val());
//						buttons.html("<button class='edit' id='" + id.html() + "'>Edit</button>&nbsp;&nbsp;<button class='delete' id='" + id.html() + "'>Delete</button>");
//					},
//					error: function() {
//						$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error updating record').fadeIn().fadeOut(4000, function() {
//							$(this).remove();
//						});
//					}
//				});
//			});
});