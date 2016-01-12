angular.module('SliderService', []).factory('Slider', [function()
{
    var sliderService = this;

    sliderService.scroll = function(page, speed)
    {
        $('html, body').animate({
            scrollTop: $(sliderService.pages[page]).offset().top
        }, speed);
    };

    sliderService.destroyScrollbars = function()
    {
        $('.scrollable-light').mCustomScrollbar('destroy');
        $('.scrollable-dark').mCustomScrollbar('destroy');
        $('.scrollable-light-inside').mCustomScrollbar('destroy');
        $('.scrollable-dark-inside').mCustomScrollbar('destroy');
    };

    sliderService.initializeScrollbars = function()
    {
        $('.scrollable-dark').mCustomScrollbar( {
            theme:"inset-dark",
            scrollbarPosition:"outside",
            scrollButtons:{
                enable:true
            },
            advanced:{
                autoScrollOnFocus: false,
                updateOnContentResize: true
            }
        });

        $('.scrollable-light-inside').mCustomScrollbar( {
            theme:"inset",
            scrollbarPosition:"inside",
            scrollButtons:{
                enable:true
            },
            advanced:{
                autoScrollOnFocus: false,
                updateOnContentResize: true
            }
        });

        $('.scrollable-dark-inside').mCustomScrollbar( {
            theme:"inset-dark",
            scrollbarPosition:"inside",
            scrollButtons:{
                enable:true
            },
            advanced:{
                autoScrollOnFocus: false,
                updateOnContentResize: true
            }
        });
    };

    sliderService.selectedPage = 0;
    sliderService.pages = [];

    return {

        // Initialization

        initializeSlider : function (pages, callback)
        {
            // Initialize page list

            sliderService.pages = pages;
            sliderService.scrollTo = callback;

            // Custom slider

            $('a.page-scroll').click(function()
            {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - 40
                        }, 900);
                        return false;
                    }
                }
            });

            // Menu modifier

            var resizeTimer;

            $(window).on('resize', function(e) {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    sliderService.scroll(sliderService.selectedPage, 300);
                }, 200);
            });

            $(window).bind('scroll', function()
            {
                var navHeight = $(window).height() - 100;
                if ($(window).scrollTop() > navHeight) {
                    $('.navbar-default').addClass('on');
                } else {
                    $('.navbar-default').removeClass('on');
                }

                sliderService.selectedPage = Math.floor((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * (sliderService.pages.length - 1));
                sliderService.scrollTo(sliderService.selectedPage);
            });

            // Ignore scrolling with mouse wheel

            /*$(window).bind('wheel', function()
            {
                return false;
            });*/

            // Forced scroll on initialization

            sliderService.scroll(0, 500);

            // Initialize section sliders

            $(window).load(function() {
                sliderService.initializeScrollbars();
            });
        },

        // Forced scroll

        scrollTo : function(id)
        {
            // Forced scroll

            sliderService.scroll(id, 500);
        }
    }
}]);