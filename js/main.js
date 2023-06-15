// jQuery Plugin: http://flaviusmatis.github.io/simplePagination.js/
// 分頁式動畫效果
var items = $(".list-wrapper .list-item");
var numItems = items.length;
var perPage = 3;

items.slice(perPage).hide();

$('#pagination-container').pagination({
    items: numItems,
    itemsOnPage: perPage,
    prevText: "&laquo;",
    nextText: "&raquo;",
    onPageClick: function (pageNumber) {
        var showFrom = perPage * (pageNumber - 1);
        var showTo = showFrom + perPage;
        items.hide().slice(showFrom, showTo).show();
    }
});

let pc = window.matchMedia('(min-width: 1200px)');
let moblie = window.matchMedia('(max-width: 768px)');
console.log(pc);
console.log(moblie);


function setWidthTable() {
    console.log('setWidthTable');

}


function setWidthMoblie(pMatchMedia) {
    if (pMatchMedia.matches) {
        var numItems = items.length;
        var perPage = 1;

        items.slice(perPage).hide();

        $('#pagination-container').pagination({
            items: numItems,
            itemsOnPage: perPage,
            prevText: "&laquo;",
            nextText: "&raquo;",
            onPageClick: function (pageNumber) {
                var showFrom = perPage * (pageNumber - 1);
                var showTo = showFrom + perPage;
                items.hide().slice(showFrom, showTo).show();
            }
        });

        let pc = window.matchMedia('(min-width: 1200px)');
        let moblie = window.matchMedia('(max-width: 768px)');
        console.log(pc);
        console.log(moblie);


        console.log('小於768px');

    } else {
        var items = $(".list-wrapper .list-item");
        var numItems = items.length;
        var perPage = 2;

        items.slice(perPage).hide();

        $('#pagination-container').pagination({
            items: numItems,
            itemsOnPage: perPage,
            prevText: "&laquo;",
            nextText: "&raquo;",
            onPageClick: function (pageNumber) {
                var showFrom = perPage * (pageNumber - 1);
                var showTo = showFrom + perPage;
                items.hide().slice(showFrom, showTo).show();
            }
        });
        console.log('大於786px');
        setWidthTable();
    }
}

function setWidthPC(pMatchMedia) {
    if (pMatchMedia.matches) {
        console.log('大於1200px');

    } else {
        console.log('小於1200px');
        setWidthTable();
    }

}

moblie.addListener(setWidthMoblie);
pc.addListener(setWidthPC);