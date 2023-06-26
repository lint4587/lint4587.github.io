(function ($) {
	$(function () {
		// 目前滾軸距離window高度
		var scroll = $(document).scrollTop();
		// 設置#topbar的height數值
		var headerHeight = $('#topbar').outerHeight();
		// console.log(headerHeight);
		// console.log(scroll);

		$(window).scroll(function () {
			// 滾動後的視窗高度
			var scrolled = $(document).scrollTop();
			// 設置nav的height數值
			var Height = $('#topbar nav').outerHeight();
			// 將nav高度數值加入到off-canvas做判斷
			$('.off-canvas').css({ transform: `translateY(-${Height}px)` });
			// 滾動後的視窗高度>#topbar的height
			if (scrolled > headerHeight) {
				$('#topbar nav').addClass('off-canvas');
			} else {
				$('#topbar nav').removeClass('off-canvas');
			}
			// 滾動後的視窗高度>滾動前的視窗高度
			if (scrolled > scroll) {
				// scrolling down
				$('#topbar nav').removeClass('fixed');
			} else {
				//scrolling up
				$('#topbar nav').addClass('fixed');
			}
			
			// 宣告新數值前scroll為scrolled滾動前的數值
			scroll = $(document).scrollTop();
			// 宣告後scroll為scrolled滾動後的數值並帶到下次事件做判斷
		});


	});
})(jQuery);