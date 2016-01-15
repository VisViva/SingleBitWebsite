angular.module('UserInterfaceService', []).factory('UserInterface', [function() {

  var userInterface = this;

  userInterface.calculateDimensions = function()
  {
    // Get viewport dimensions

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

  userInterface.scrollByPageName = function(pageName, speed)
  {
    $('html, body').animate({
      scrollTop: $(pageName).offset().top
    }, speed);
  };

  userInterface.scrollByPageNumber = function(pageNumber, speed)
  {
    $('html, body').animate({
      scrollTop: $(userInterface.pages[pageNumber]).offset().top
    }, speed);
  };

  userInterface.destroyScrollbars = function()
  {
    $('.scrollable-light').mCustomScrollbar('destroy');
    $('.scrollable-dark').mCustomScrollbar('destroy');
    $('.scrollable-light-inside').mCustomScrollbar('destroy');
    $('.scrollable-dark-inside').mCustomScrollbar('destroy');
  };

  userInterface.initializeScrollbars = function()
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

  userInterface.selectedPage = 0;
  userInterface.selectedView = 'empty';
  userInterface.pages = [];
  userInterface.classes = [];
  userInterface.zoomInEnabled = false;

  return {

    // Initialization

    initializeService : function (pages, callback, classes) {
      'use strict';

      userInterface.classes = classes;
      userInterface.calculateDimensions();

      // Initialize page list

      userInterface.pages = pages;
      userInterface.onScroll = callback;

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

      // Subscribe to window events

      var resizeTimer;

      $(window).on('resize', function(e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          userInterface.calculateDimensions();
          userInterface.scrollByPageNumber(userInterface.selectedPage, 300);
        }, 100);
      });

      $(window).bind('scroll', function()
      {
        var navHeight = $(window).height() - 100;
        if ($(window).scrollTop() > navHeight) {
          $('.navbar-default').addClass('on');
        } else {
          $('.navbar-default').removeClass('on');
        }

        for (var i = 0; i < userInterface.pages.length; ++i)
        {
          if ($(document).scrollTop() > $(userInterface.pages[i]).offset().top)
          userInterface.selectedPage = userInterface.pages[i];
          else break;
        }

        userInterface.onScroll();
      });

      // Ignore scrolling with mouse wheel

      $(window).bind('wheel', function()
      {
        return false;
      });

      // Initialize section sliders

      $(window).load(function() {
        userInterface.initializeScrollbars();
      });
    },

    updateService : function()
    {
      userInterface.calculateDimensions();

      $('.scrollable-dark-view').mCustomScrollbar(
        {
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
      },

      // Forced scroll

      scrollByPageNumber : function(pageNumber)
      {
        userInterface.scrollByPageNumber(pageNumber, 500);
      },

      scrollByPageName : function(pageName)
      {
        userInterface.scrollByPageName(pageName, 500);
      },

      // Selected page

      getSelectedPage : function()
      {
        return userInterface.selectedPage;
      },

      setSelectedPage : function(page)
      {
        userInterface.selectedPage = page;
      },

      // Selected view

      selectedView : userInterface.selectedView
    }
  }]);
