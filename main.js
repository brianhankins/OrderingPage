$(function() {

	var $orders = $('#orders');
	var $name = $('#name');
	var $drink = $('#drink');
	var $sandwich = $('#sandwich');

	var orderTemplate = $('#order-template').html();

	function addOrder(order) {
		$orders.append(Mustache.render(orderTemplate, order));
	}

	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/sample/ordering',
		success: function(orders) {
			console.log('success', orders);
			$.each(orders, function(i, order) {
				addOrder(order);
			});
		},
		error: function() {
			console.log('Error loading orders');
		}
	});

	$('#add-order').on('click', function() {

		var order = {
			name: $name.val(),
			drink: $drink.val(),
			sandwich: $sandwich.val(),
		};

		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/sample/ordering',
			data: order,
			success: function(newOrder) {
				addOrder(newOrder);
			},
			error: function() {
			console.log('Error saving order');
			}
		});

		$('body').find('input').val('');

	});

	$orders.delegate('.remove', 'click', function() {

		var $li = $(this).closest('li');

		$.ajax({
			type: 'DELETE',
			url: 'http://rest.learncode.academy/api/sample/ordering/' + $(this).attr('data-id'),
			success: function() {
				$li.fadeOut(300, function() { 
					$(this).remove();
				});
			}
		});
	});

	$orders.delegate('.editOrder', 'click', function() {
		var $li = $(this).closest('li');
		$li.find('input.name').val($li.find('span.name').html() );
		$li.find('input.drink').val($li.find('span.drink').html() );
		$li.find('input.sandwich').val($li.find('span.sandwich').html() );
		$li.addClass('edit');
	});

	$orders.delegate('.cancelEdit', 'click', function() {
		var $li = $(this).closest('li').removeClass('edit');
	});

	$orders.delegate('.saveEdit', 'click', function() {
		var $li = $(this).closest('li');
		var order= {
			name: $li.find('input.name').val(),
			drink: $li.find('input.drink').val(),
			sandwich: $li.find('input.sandwich').val()
		};

		$.ajax({
			type: 'PUT',
			url: 'http://rest.learncode.academy/api/sample/ordering/' + $li.attr('data-id'),
			data: order,
			success: function(newOrder) {
				$li.find('span.name').html(order.name);
				$li.find('span.drink').html(order.drink);
				$li.find('span.sandwich').html(order.sandwich);
				$li.removeClass('edit');
			},
			error: function() {
			console.log('Error updating order');
			}
		});

	});








});






