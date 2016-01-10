angular.module('LayoutEngineService', []).factory('LayoutEngine', [function() {
    return {
        initializeLayoutEngine : function (classes) {
            'use strict';

            var calculateDimensions = function(classes)
            {
                // Get viewport dimensions

                var width = $(window).width();
                var height = $(window).height();

                // Set div heights

                classes.forEach(function(element, index, array){
                    if (!angular.isUndefined(element.height))
                    {
                        $('.' + element.className).css({"height": height/100 * element.height + "px"});
                    }
                    if (!angular.isUndefined(element.width))
                    {
                        $('.' + element.className).css({"width": height/100 * element.width + "px"});
                    }
                    $('.' + element.className).css({"display": "block"});
                    $('.' + element.className).css({"overflow": "hidden"});
                });
            }

            // Subscribe to window resize event

            calculateDimensions(classes);

            window.onresize = function(event) {
                calculateDimensions(classes);
            };
        }
    }
}]);