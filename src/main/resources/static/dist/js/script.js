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
			tr.push('<td class="text-center"><a class=\'delete\' id=' + json[i].id + '><button type="button" class="btn btn-outline-danger btn-sm me-3"><i class="fas fa-trash fa-fw"></i> Delete</button></a></td>');
			tr.push('</tr>');
		}
		tr.push('</tbody>');
		$("#tablepp").append($(tr.join('')));
	});
}
$(document).ready(function() {
	showData();
	$(document).delegate('#addNew', 'click', function(event) {
		event.preventDefault();
		var name = $('#name').val();
		var email = $('#email').val();
		var address = $('#address').val();

		if (name == "" && email == "" && address == "") {
			$('#invalid-name').html("<div class='form-text text-danger'>Name cannot be null</div>");
			$('#invalid-email').html("<div class='form-text text-danger'>Email cannot be null</div>");
			$('#invalid-address').html("<div class='form-text text-danger'>Address cannot be null</div>");
			window.setTimeout(function() {
				$("#invalid-name").html("");
				$("#invalid-email").html("");
				$("#invalid-address").html("");
			}, 3000);
		} else if (name == "") {
			$('#invalid-name').html("<div class='form-text text-danger'>Name cannot be null</div>");
			window.setTimeout(function() {
				$("#invalid-name").html("");
			}, 3000);
		} else if (email == "") {
			$('#invalid-email').html("<div class='form-text text-danger'>Email cannot be null</div>");
			window.setTimeout(function() {
				$("#invalid-email").html("");
			}, 3000);
		} else if (address == "") {
			$('#invalid-address').html("<div class='form-text text-danger'>Address cannot be null</div>");
			window.setTimeout(function() {
				$("#invalid-address").html("");
			}, 3000);
		}
		if (name != "" && email != "" && address != "") {
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "http://localhost:8080/pesertaprogram/save",
				data: JSON.stringify(
					{ 'name': name, 'email': email, 'address': address }),
				/*data: JSON.stringify(pesertaprogram),*/
				cache: false,
				success: function(result) {
					$("#msg").html("<div class='alert alert-success text-center' role='alert'>Data Added Successfully</div>");
					$("#form").hide();
					window.setTimeout(function() {
						showData();
						$("#msg").html("");
						$('#name').val("");
						$('#email').val("");
						$('#address').val("");
						$('#invalid').val("");
						$("#addModal").modal('hide');
					}, 1000)
					window.setTimeout(function() {
						$("#form").show();
					}, 1500)
				},
				error: function(err) {
					$("#msg").html("<span style='color: red'>Data cannot be null</span>");
				}
			});
		}
	});

	$(document).delegate('.delete', 'click', function() {
		if (confirm('Do you really want to delete record?')) {
			var id = $(this).attr('id');
			var parent = $(this).parent()
				.parent();
			$.ajax({
				type: "DELETE",
				url: "http://localhost:8080/pesertaprogram/delete/" + id,
				cache: false,
				success: function() {
					parent.fadeOut(
						'slow', function() {
							$(this).remove();
						});
					/*location.reload(true)*/
					showData;
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
		var name = parent.children("td:nth-child(2)");
		var email = parent.children("td:nth-child(3)");
		var address = parent.children("td:nth-child(4)");
		var buttonEdit = parent.children("td:nth-child(5)");
		var buttonDelete = parent.children("td:nth-child(6)");

		name.html("<input type='text' id='name' value='" + name.html() + "'/>");
		email.html("<input type='text' id='email' value='" + email.html() + "'/>");
		address.html("<input type='text' id='address' value='" + address.html() + "'/>");
		/*buttons.html("<button id='save'>Save</button>&nbsp;&nbsp;<button class='delete' id='" + id.html() + "'>Delete</button>");
		*/
		buttonEdit.html("<a id='save'><button type='button' class='btn btn-outline-primary btn-sm'><i class='fas fa-save fa-fw me-3'></i> Save</button></a>");
		buttonDelete.html("<a class='delete' id='" + id.html() + "'><button type='button' class='btn btn-outline-danger btn-sm'><i class='fas fa-trash fa-fw me-3'></i> Delete</button></a>");
	});

	$(document).delegate('#save', 'click', function() {
		var parent = $(this).parent().parent();
		var id = parent.children("td:nth-child(1)");
		var name = parent.children("td:nth-child(2)");
		var email = parent.children("td:nth-child(3)");
		var address = parent.children("td:nth-child(4)");
		var buttonEdit = parent.children("td:nth-child(5)");
		var buttonDelete = parent.children("td:nth-child(6)");
		if (name.children("input[type=text]").val() == "" || email.children("input[type=text]").val() == "" || address.children("input[type=text]").val() == "") {
			$('#alert').html('<div class="alert alert-danger text-center" role="alert"><strong>Data cannot be null</strong></div>');
			window.setTimeout(function() {
				$("#alert").html("");
			}, 3000)
			/*$('.toastsDefaultDanger').click(function() {
				$(document).Toasts('create', {
					class: 'bg-danger',
					title: 'Invalid Update',
					subtitle: 'Error',
					body: 'Data cannot be null'
				})
			});
			$('.swalDefaultError').click(function() {
				Toast.fire({
					icon: 'error',
					title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
				})
			});*/
		} else {
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "http://localhost:8080/pesertaprogram/save",
				data: JSON.stringify({
					'id': id.html(),
					'name': name.children("input[type=text]").val(),
					'email': email.children("input[type=text]").val(),
					'address': address.children("input[type=text]").val()
				}),
				cache: false,
				success: function() {
					name.html(name.children("input[type=text]").val());
					email.html(email.children("input[type=text]").val());
					address.html(address.children("input[type=text]").val());
					buttonEdit.html("<a class='edit' id='" + id.html() + "'><button type='button' class='btn btn-outline-primary btn-sm'><i class='fas fa-edit fa-fw me-3'></i> Edit</button></a>");
					buttonDelete.html("<a class='delete' id='" + id.html() + "'><button type='button' class='btn btn-outline-danger btn-sm'><i class='fas fa-trash fa-fw me-3'></i> Delete</button></a>");
				},
				error: function() {
					$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error updating record')
						.fadeIn()
						.fadeOut(4000, function() {
							$(this).remove();
						});
				}
			});
		}
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
	});
});