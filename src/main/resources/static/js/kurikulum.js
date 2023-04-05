
function sukses() {
	$("#msg").html("<span style='color: green'>Customer added successfully</span><br>");
	setTimeout(function() {
		$('#add').modal('hide');
		$('#name').val('');
		$('#email').val('');
		$('#address').val('');
		$('#msg').html(null);
	}, 1000);
	showTable();

	//window.setTimeout(function(){location.reload()},1000)
}
function showTable() {
	$.getJSON('http://localhost:8080/kurikulums', function(json) {
		$('table').empty();
		var tr = [];
		tr.push('<thead>');
		tr.push('<tr>')
		tr.push('<th>ID</th>');
		tr.push('<th>Name</th>');
		tr.push('<th>Description</th>');
		tr.push('<th>Action</th>');
		tr.push('</tr>')
		tr.push('</thead>');
		tr.push('<tbody id="myTable">');
		for (var i = 0; i < json.length; i++) {
			tr.push('<tr>');
			tr.push('<td>' + json[i].id + '</td>');
			tr.push('<td>' + json[i].nama + '</td>');
			tr.push('<td>' + json[i].keterangan + '</td>');
			tr.push('<td><a class=\'edit\'><button class="btn btn-outline-info btn-sm">Edit</button></a></td>');
			tr.push('<td><a class=\'delete\' id=' + json[i].id + '><button class="btn btn-outline-danger btn-sm">Delete</button></a></td>');
			tr.push('</tr>');
		}
		tr.push('</tbody>');
		$('table').append($(tr.join('')));
	});

}
/*function showTableSearch() {
	$.getJSON('http://localhost:8080/search', function(json) {
		$('table').empty();
		var tr = [];
		tr.push('<thead style="font-weight:bold">');
		tr.push('<tr>')
		tr.push('<td>ID</td>');
		tr.push('<td>Name</td>');
		tr.push('<td>Email</td>');
		tr.push('<td>Address</td>');
		tr.push('<td>Action</td>');
		tr.push('</tr>')
		tr.push('</thead>');
		tr.push('<tbody>');
		for (var i = 0; i < json.length; i++) {
			tr.push('<tr>');
			tr.push('<td>' + json[i].id + '</td>');
			tr.push('<td>' + json[i].name + '</td>');
			tr.push('<td>' + json[i].email + '</td>');
			tr.push('<td>' + json[i].address + '</td>');
			tr.push('<td><a class=\'edit\'><button class="btn btn-outline-info btn-sm">Edit</button></a></td>');
			tr.push('<td><a class=\'delete\' id=' + json[i].id + '><button class="btn btn-outline-danger btn-sm">Delete</button></a></td>');
			tr.push('</tr>');
		}
		tr.push('</tbody>');
		$('#table_customer').append($(tr.join('')));
	});

}*/

$(document).ready(function() {
	showTable();
	$(document).delegate('#addNew', 'click', function(event) {
		event.preventDefault();
		var id = $('#id').val();
		var nama = $('#nama').val();
		var keterangan = $('#keterangan').val();
		var createdBy = 'taopik';

		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8080/kurikulum",
			data: JSON.stringify({ 'id': id, 'nama': nama, 'keterangan': keterangan, 'createdBy': createdBy }),
			cache: false,
			success: sukses,
			error: function(err) {
				$("#msg").html("<span style='color: red'>Name is required</span>");
			}
		});
	});

	$(document).delegate('.delete', 'click', function() {
		if (confirm('Do you really want to delete record?')) {
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
					$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error deleting record').fadeIn().fadeOut(4000, function() {
						$(this).remove();
					});
				}
			});
		}
	});

	$(document).delegate('.edit', 'click', function() {
		var parent = $(this).parent().parent();

		var id = parent.children("td:nth-child(1)");
		var name = parent.children("td:nth-child(2)");
		var email = parent.children("td:nth-child(3)");
		var address = parent.children("td:nth-child(4)");
		var buttons = parent.children("td:nth-child(5)");

		name.html("<input required type='text' id='txtName' value='" + name.html() + "'/>");
		email.html("<input required type='text' id='txtEmail' value='" + email.html() + "'/>")
		address.html("<input required type='text' id='txtAddress' value='" + address.html() + "'/>")
		buttons.html("<button class='btn btn-outline-primary btn-sm' id='save'>Save</button>");
	});

	$(document).delegate('#save', 'click', function() {
		var parent = $(this).parent().parent();

		var id = parent.children("td:nth-child(1)");
		var name = parent.children("td:nth-child(2)");
		var email = parent.children("td:nth-child(3)");
		var address = parent.children("td:nth-child(4)");
		var buttons = parent.children("td:nth-child(5)");
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8080/customer/save",
			data: JSON.stringify({ 'id': id.html(), 'name': name.children("input[type=text]").val(), 'email': email.children("input[type=text]").val(), 'address': address.children("input[type=text]").val() }),
			cache: false,
			success: function() {
				name.html(name.children("input[type=text]").val());
				email.html(email.children("input[type=text]").val());
				address.html(address.children("input[type=text]").val());
				buttons.html("<a class='edit' id='" + id.html() + "'><button class='btn btn-outline-info btn-sm'>Edit</i></button></a>");
			},
			error: function() {
				$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error updating record').fadeIn().fadeOut(4000, function() {
					$(this).remove();
				});
			}
		});
	});

});