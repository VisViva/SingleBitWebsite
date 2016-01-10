angular.module('LayoutEngineService', []).factory('LayoutEngine', [function() {
    return {

        // Initialization

        initializeLayoutEngine : function (classes) {
            'use strict';

            var calculateDimensions = function(classes)
            {
                // Get viewport dimensions

                var width = $(window).width();
                var height = $(window).height();

                // Set div heights

                classes.forEach(function(element, index, array)
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

            // Subscribe to window resize event

            calculateDimensions(classes);

            // Initialize custom sliders

            window.onresize = function(event) {
                calculateDimensions(classes);
                $('.scrollable-dark').mCustomScrollbar
            };

        }
    }
}]);