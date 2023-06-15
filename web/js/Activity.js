// 活動一覽滾軸
$(".list_of_activities_href").click(function () {
	$('html, body').animate({
		scrollTop: $("#list_of_activities").offset().top - 113
	}, 500);
});
// 頁籤滾動
$(".btn-bar a").click(function () {
	$('html, body').animate({
		scrollTop: $("#list_of_activities").offset().top - 113
	}, 200);
});



// 輪播圖------------------------
$(document).ready(function () {

	var sync1 = $("#sync1");
	var sync2 = $("#sync2");
	var slidesPerPage = 4; //globaly define number of elements per page
	var syncedSecondary = true;

	sync1.owlCarousel({
		items: 1,
		slideSpeed: 2000,
		nav: false,
		autoplay: true,
		autoplayHoverPause: true,
		autoplayTimeout: 3000,
		dots: false,
		loop: true,
		responsiveRefreshRate: 200,
		navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
	}).on('changed.owl.carousel', syncPosition);

	sync2
		.on('initialized.owl.carousel', function () {
			sync2.find(".owl-item").eq(0).addClass("current");
		})
		.owlCarousel({
			items: slidesPerPage,
			dots: false,
			nav: false,
			smartSpeed: 0,
			slideSpeed: 0,
			mouseDrag: false,
			slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
			responsiveRefreshRate: 100
		}).on('changed.owl.carousel', syncPosition2);

	function syncPosition(el) {
		//if you set loop to false, you have to restore this next line
		//var current = el.item.index;

		//if you disable loop you have to comment this block
		var count = el.item.count - 1;
		var current = Math.round(el.item.index - (el.item.count / 2) - .5);

		if (current < 0) {
			current = count;
		}
		if (current > count) {
			current = 0;
		}

		//end block

		sync2
			.find(".owl-item")
			.removeClass("current")
			.eq(current)
			.addClass("current");
		var onscreen = sync2.find('.owl-item.active').length - 1;
		var start = sync2.find('.owl-item.active').first().index();
		var end = sync2.find('.owl-item.active').last().index();

		if (current > end) {
			sync2.data('owl.carousel').to(current, 100, true);
		}
		if (current < start) {
			sync2.data('owl.carousel').to(current - onscreen, 100, true);
		}
	}

	function syncPosition2(el) {
		if (syncedSecondary) {
			var number = el.item.index;
			sync1.data('owl.carousel').to(number, 100, true);
		}
	}

	sync2.on("click", ".owl-item", function (e) {
		e.preventDefault();
		var number = $(this).index();
		sync1.data('owl.carousel').to(number, 300, true);
	});



});

//  活動一覽 換頁---------------------------------
(function ($) {
	var pagify = {
		items: {},
		container: null,
		totalPages: 1,
		perPage: 3,
		currentPage: 0,
		createNavigation: function () {
			this.totalPages = Math.ceil(this.items.length / this.perPage);

			$('.pagination', this.container.parent()).remove();
			var pagination = $('<div class="pagination"></div>').append('<a class="nav prev disabled" data-next="false"><i class="fa-solid fa-angle-left"></i>Back</a>');

			for (var i = 0; i < this.totalPages; i++) {
				var pageElClass = "page";
				if (!i)
					pageElClass = "page current";
				var pageEl = '<a class="' + pageElClass + '" data-page="' + (
					i + 1) + '">' + (
						i + 1) + "</a>";
				pagination.append(pageEl);
			}
			pagination.append('<a class="nav next" data-next="true">Next<i class="fa-solid fa-angle-right"></i></a>');

			this.container.after(pagination);

			var that = this;
			$("body").off("click", ".nav");
			this.navigator = $("body").on("click", ".nav", function () {
				var el = $(this);
				that.navigate(el.data("next"));
				$('html, body').animate({
					scrollTop: $("#list_of_activities").offset().top - 113
				}, 300);
			});

			$("body").off("click", ".page");
			this.pageNavigator = $("body").on("click", ".page", function () {
				var el = $(this);
				that.goToPage(el.data("page"));
				$('html, body').animate({
					scrollTop: $("#list_of_activities").offset().top - 113
				}, 300);
			});
		},
		navigate: function (next) {
			// default perPage to 5
			if (isNaN(next) || next === undefined) {
				next = true;
			}
			$(".pagination .nav").removeClass("disabled");
			if (next) {
				this.currentPage++;
				if (this.currentPage > (this.totalPages - 1))
					this.currentPage = (this.totalPages - 1);
				if (this.currentPage == (this.totalPages - 1))
					$(".pagination .nav.next").addClass("disabled");
			}
			else {
				this.currentPage--;
				if (this.currentPage < 0)
					this.currentPage = 0;
				if (this.currentPage == 0)
					$(".pagination .nav.prev").addClass("disabled");
			}

			this.showItems();
		},
		updateNavigation: function () {

			var pages = $(".pagination .page");
			pages.removeClass("current");
			$('.pagination .page[data-page="' + (
				this.currentPage + 1) + '"]').addClass("current");
		},
		goToPage: function (page) {

			this.currentPage = page - 1;

			$(".pagination .nav").removeClass("disabled");
			if (this.currentPage == (this.totalPages - 1))
				$(".pagination .nav.next").addClass("disabled");

			if (this.currentPage == 0)
				$(".pagination .nav.prev").addClass("disabled");
			this.showItems();
		},
		showItems: function () {
			this.items.hide();
			var base = this.perPage * this.currentPage;
			this.items.slice(base, base + this.perPage).show();

			this.updateNavigation();
		},
		init: function (container, items, perPage) {
			this.container = container;
			this.currentPage = 0;
			this.totalPages = 1;
			this.perPage = perPage;
			this.items = items;
			this.createNavigation();
			this.showItems();
		}
	};

	// stuff it all into a jQuery method!
	$.fn.pagify = function (perPage, itemSelector) {
		var el = $(this);
		var items = $(itemSelector, el);

		// default perPage to 5
		if (isNaN(perPage) || perPage === undefined) {
			perPage = 3;
		}

		// don't fire if fewer items than perPage
		if (items.length <= perPage) {
			return true;
		}

		pagify.init(el, items, perPage);
	};



})(jQuery);

$(".container").pagify(6, ".in_progress,.cut_off");



// 分類--------------------------
$(function () {
	// ----宣告變數----
	// 取得所有按鈕
	var setFilter = $('.btn-bar');
	// 取得篩選按鈕中的a元素
	var filterBtn = setFilter.find('a');
	//取得ALL按鈕
	var btnAll = $('.all_btn');
	//取得所有圖片中的元素
	var setList = $('.activity_bar');
	//取得li元素
	var filterList = setList.find('li');
	// 取得篩選列表中的寬度
	var listWidth = filterList.outerWidth();
	var pages = $(".pagination .page");


	// ----處理篩選後的結果----
	// 篩選按鈕被左鍵一下時
	filterBtn.click(function () {
		// 檢查是否被點選狀態，不是的話才執行篩選
		//使用NOT運算子(!) ==>有變成沒有
		if (!($(this).hasClass('active_btn'))) {
			//目前被點選的按鈕類別保存起來給變數filterClass
			// attr()==>尋找到指定屬性的值
			var filterClass = $(this).attr('class');
			//使用each()方法，逐一取得對應類別的圖片
			filterList.each(function () {
				// 檢查li中是否有被篩選的類別
				if ($(this).hasClass(filterClass)) {
					// 有找到
					// 顯示圖片動畫效果
					$(".container").pagify(6, `.${filterClass}`);
				} else {
					// 沒找到
					//隱藏圖片(動畫 animate)
					$(this).css({ display: 'none' });
				}
			});
			//清除所有篩選按鈕上的active類別
			filterBtn.removeClass('active_btn');
			//將目前的篩選按鈕加上active類別
			$(this).addClass('active_btn');
		}


	});

	//全部顯示
	btnAll.click(function () {
		filterList.each(function () {
			$(".container").pagify(6, ".in_progress,.cut_off");
		});
	});
	//

});

// 合作夥伴選單-----------------------------
$(function () {
    $("#tabs").tabs();
});
