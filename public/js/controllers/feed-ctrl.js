angular.module('FeedCtrl', []).controller('FeedController', function($scope, UserInterface, Slider) {
    UserInterface.reinitializeLayoutEngine();
    Slider.selectedView = 'feed';

    if (Slider.getSelectedPage() != 1) {
        Slider.scrollTo(1);
    }
});