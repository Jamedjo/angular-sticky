angular.module('sticky', []);



function windowScrollTop() { 
  var body = document.documentElement || document.body; 
  return window.pageYOffset || body.scrollTop; 
}

function offsetTop(elm) { 
  return elm[0].getBoundingClientRect().top + windowScrollTop();
}


angular.module('sticky', []).directive("sticky", function($window) {
  return {
    link: function(scope, element, attrs) {
      var top_offset = 70;
      var left_offset = 25;

      var $win = angular.element($window);

      if (scope._stickyElements === undefined) {
        scope._stickyElements = [];

        $win.bind("scroll", function(e) {
          var pos = windowScrollTop();
          for (var i=0; i<scope._stickyElements.length; i++) {

            var item = scope._stickyElements[i];

            if (!item.isStuck && pos > item.start) {
              item.element.attr("style","position:fixed;top:"+top_offset+"px;left:"+(item.left-left_offset)+"px;width:"+item.width+"px;");
              item.element.addClass("stuck");
              item.isStuck = true;
            }
            else if (item.isStuck && pos < item.start) {
              item.element.removeClass("stuck");
              item.element.attr("style","");
              item.isStuck = false;
            }
          }
        });

        var recheckPositions = function() {
          for (var i=0; i<scope._stickyElements.length; i++) {
            var item = scope._stickyElements[i];
            if (!item.isStuck) {
              item.start = offsetTop(item.element)-top_offset;
            }
          }
        };
        $win.bind("load", recheckPositions);
        $win.bind("resize", recheckPositions);
      }

      var item = {
        element: element,
        isStuck: false,
        start: offsetTop(element)-top_offset,
        width: element[0].clientWidth,
        left: item.element[0].getBoundingClientRect().left
      };

      scope._stickyElements.push(item);

    }
  };
});