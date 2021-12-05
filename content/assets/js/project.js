$(document).ready(function () {
    currentYear();
    popup();
    changeValuePrice();
    menu();
    smoothScroll();
    tab();
    buttonEffect();
    animate();
});

const currentYear = () => {
    $('#currentYear').html(new Date().getFullYear().toString());
};

const popup = () => {
    let overlay = $('#overlay');
    let open_modal = $('.popup__open');
    let close = $('.popup__close, #overlay');
    let modal = $('.popup');
    const div = $('html, body');

    open_modal.click(function (event) {
        event.preventDefault();
        $('html, body').css('overflow-y', 'hidden');
        var div = $(this).attr('href');
        overlay.fadeIn(400,
            function () {
                $(div)
                    .css('display', 'block')
                    .animate({opacity: 1, top: '50%'}, 200);
            });
    });

    close.click(function () {
        div.css('overflow-y', 'auto');
        modal
            .animate({opacity: 0, top: '45%'}, 200,
                function () {
                    $(this).css('display', 'none');
                    overlay.fadeOut(400);
                }
            );
    });
}

const menu = () => {
    const menuButton = $('.header__toggle');
    const menuBlock = $('.header__mob');

    menuButton.on('click', function () {

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            menuBlock.removeClass('active');
            $('html, body').css('overflow-y', 'auto');
        } else {
            $(this).addClass('active');
            menuBlock.addClass('active');
            $('html, body').css('overflow-y', 'hidden');
        }
    });

    $('.header__mob .header__menu > li a').on('click', function () {
        menuButton.removeClass('active');
        menuBlock.removeClass('active');
        $('html, body').css('overflow-y', 'auto');
    });
};

const smoothScroll = () => {
    $(".scroll").on("click", function (e) {
        e.preventDefault();
        let id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top - 80 +"px"}, 800);
    });
};

const changeValuePrice = (value) => {
    const complexity = $('.price__input[name="complexity"]:checked').val();
    changeRangeInput(value, complexity);
}

const changeRangeInput = (page, complexity) => {
    const result = [];
    priceTarif.map(tarif => {
        if (complexity === tarif.complexity && page === tarif.page) {
            result.push(tarif);
        }

        if (result.length) {
            setPrice(result[0].price);
        } else {
            setPrice('0')
        }
    });
}

const setPrice = (price) => {
    $('#priceValue').html(price);
}

const initValuePrice = () => {
    const complexity = $('.price__input[name="complexity"]:checked').val();
    changeRangeInput('3', complexity);
}

const tab = () => {
    const item = $('.faq__item');

    item.on('click', function () {
        const body = $(this).find('.faq__body');
        if (!$(this).hasClass('active')) {
            item.removeClass('active');
            $(this).addClass('active');

            $('.faq__body').slideUp(300);
            body.slideDown(300);
        }
    });
}

const buttonEffect = () => {
    $('.btn, .features__item')
        .on('mouseenter', function(e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('.decor').css({top:relY, left:relX})
        })
        .on('mouseout', function(e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('.decor').css({top:relY, left:relX})
        });
}

const animate = () => {
    new WOW().init();
    new Rellax('.rellax');
};

$('.price__input').on('change', function () {
    changeValuePrice(slider.noUiSlider.get());
});