angular.module('UserInterfaceService', []).factory('UserInterface', [function() {

    var userInterface = this;

    userInterface.classes = [];
    userInterface.zoomInEnabled = false;

    userInterface.calculateDimensions = function()
    {
        // Get viewport dimensions

        var width = $(window).width();
        var height = $(window).height();

        // Set div heights

        userInterface.classes.forEach(function(element, index, array)
        {
            if (!angular.isUndefined(element.height))
            {
                $('.' + element.className).css({"height": height/100 * element.height + "px"});
            }
            else
            {
                if (element.type == "img") $('.' + element.className).css({"height":"auto"});
            }

            if (!angular.isUndefined(element.width))
            {
                $('.' + element.className).css({"width": height/100 * element.width + "px"});
            }
            else
            {
                if (element.type == "img") $('.' + element.className).css({"width":"auto"});
            }
            if(element.type == "spc")
            {
                $('.' + element.className).css({"display": "block"});
            }
            $('.' + element.className).css({"overflow": "hidden"});
        });
    }

    return {

        // Initialization

        initializeService : function (classes) {
            'use strict';

            userInterface.classes = classes;
            userInterface.calculateDimensions();

            // Subscribe to window resize event

            var resizeTimer;

            $(window).on('resize', function(e) {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    userInterface.calculateDimensions();
                }, 100);
            });
        },

        updateService : function()
        {
            userInterface.calculateDimensions();
        },

        // Toggling menu

        hideMenu : function()
        {
            $('.navbar-collapse').collapse('hide');
        },

        // Zooming page

        zoomIn : function zoom()
        {
            if (userInterface.zoomInEnabled == false)
            {
                setTimeout(function(){zoom();}, 100);
            }
            else
            {
                $('.zoom-in-start').removeClass('zoom-in-start').addClass('zoom-in-end');
                userInterface.zoomInEnabled = false;
            }
        },

        zoomOut : function()
        {
            $('.zoom-in-end').addClass('zoom-in-start').removeClass('zoom-in-end');
        },

        setZoomEnabled : function()
        {
            userInterface.zoomInEnabled = true;
        }
    }
}]);