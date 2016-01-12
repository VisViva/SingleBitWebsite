angular.module('ProjectsCtrl', []).controller('ProjectsController', function($scope, UserInterface, Slider) {
    UserInterface.reinitializeLayoutEngine();

    Slider.selectedView = 'projects';

    if (Slider.getSelectedPage() != 1) {
        Slider.scrollTo(1);
    }
});