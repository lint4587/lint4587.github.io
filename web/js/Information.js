function closeForm() {
	$('#activity_form').removeClass('is-visible');
}

$(document).ready(function ($) {

	/* Contact Form Interactions */
	$('#activity_btn').on('click', function (event) {
		event.preventDefault();

		$('#activity_form').addClass('is-visible');
	});

	//close popup when clicking x or off popup
	$('#activity_form').on('click', function (event) {
		if ($(event.target).is('#activity_form') || $(event.target).is('#btnCloseForm')) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});


});
