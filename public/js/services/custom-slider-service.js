angular.module('SliderService', []).factory('Slider', [function() {
    return {
        initializeSlider : function () {
            'use strict';

            // Custom slider

            $('a.page-scroll').click(function() {
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

            $(window).bind('scroll', function() {
                var navHeight = $(window).height() - 100;
                if ($(window).scrollTop() > navHeight) {
                    $('.navbar-default').addClass('on');
                } else {
                    $('.navbar-default').removeClass('on');
                }
            });

            $('body').scrollspy({
                target: '.navbar-default',
                offset: 80
            })
        }
    }
}]);