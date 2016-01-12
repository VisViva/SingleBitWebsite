angular.module('PageNavigationService', []).factory('PageNavigation', [function()
{
    var pageNavigationService = this;

    pageNavigationService.scrollByPageName = function(pageName, speed)
    {
        $('html, body').animate({
            scrollTop: $(pageName).offset().top
        }, speed);
    };

    pageNavigationService.scrollByPageNumber = function(pageNumber, speed)
    {
        $('html, body').animate({
            scrollTop: $(pageNavigationService.pages[pageNumber]).offset().top
        }, speed);
    };

    pageNavigationService.destroyScrollbars = function()
    {
        $('.scrollable-light').mCustomScrollbar('destroy');
        $('.scrollable-dark').mCustomScrollbar('destroy');
        $('.scrollable-light-inside').mCustomScrollbar('destroy');
        $('.scrollable-dark-inside').mCustomScrollbar('destroy');
    };

    pageNavigationService.initializeScrollbars = function()
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

    pageNavigationService.selectedPage = 0;
    pageNavigationService.selectedView = 'empty';
    pageNavigationService.pages = [];

    return {

        // Initialization

        initializeService : function (pages, callback)
        {
            // Initialize page list

            pageNavigationService.pages = pages;
            pageNavigationService.onScroll = callback;

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
                    pageNavigationService.scrollByPageNumber(pageNavigationService.selectedPage, 300);
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

                pageNavigationService.selectedPage = Math.floor((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * (pageNavigationService.pages.length - 1));
                pageNavigationService.onScroll();
            });

            // Ignore scrolling with mouse wheel

            $(window).bind('wheel', function()
            {
                return false;
            });

            // Initialize section sliders

            $(window).load(function() {
                pageNavigationService.initializeScrollbars();
            });
        },

        // Update service

        updateService : function()
        {
            $('.scrollable-dark-view').mCustomScrollbar( {
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

            $('.scrollable-dark-inside-view').mCustomScrollbar( {
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
        },

        // Forced scroll

        scrollByPageNumber : function(pageNumber)
        {
            pageNavigationService.scrollByPageNumber(pageNumber, 500);
        },

        scrollByPageName : function(pageName)
        {
            pageNavigationService.scrollByPageName(pageName, 500);
        },

        // Selected page

        getSelectedPage : function()
        {
            return pageNavigationService.selectedPage;
        },

        // Selected page

        setSelectedPage : function(page)
        {
            pageNavigationService.selectedPage = page;
        },

        // Selected view

        selectedView : pageNavigationService.selectedView
    }
}]);