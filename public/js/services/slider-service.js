angular.module('SliderService', []).factory('Slider', [function()
{
    var sliderService = this;

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

            $(window).bind('scroll', function()
            {
                var navHeight = $(window).height() - 100;
                if ($(window).scrollTop() > navHeight) {
                    $('.navbar-default').addClass('on');
                } else {
                    $('.navbar-default').removeClass('on');
                }

                sliderService.selectedPage = Math.round((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight)*5);
                sliderService.scrollTo(sliderService.selectedPage);
            });
        },

        // Forced scroll

        scrollTo : function(id)
        {
            // Forced scroll

            $('html, body').animate({
                scrollTop: $(sliderService.pages[id]).offset().top
            }, 500);
        }
    }
}]);