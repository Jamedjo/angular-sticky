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

      var $win = angular.element($window);

      if (scope._stickyElements === undefined) {
        scope._stickyElements = [];

        $win.bind("scroll", function(e) {
          var pos = windowScrollTop();
          for (var i=0; i<scope._stickyElements.length; i++) {

            var item = scope._stickyElements[i];

            if (!item.isStuck && pos > item.start) {
              item.element.attr("style","left:"+(item.element[0].getBoundingClientRect().left-25)+"px;width:"+item.element[0].clientWidth+"px;");
              item.element.addClass("stuck");
              console.log(item.element);
              item.isStuck = true;

              if (item.placeholder) {
                item.placeholder = angular.element("<div></div>")
                    .css({height: item.element.outerHeight() + "px"})
                    .insertBefore(item.element);
              }
            }
            else if (item.isStuck && pos < item.start) {
              item.element.removeClass("stuck");
              item.isStuck = false;

              if (item.placeholder) {
                item.placeholder.remove();
                item.placeholder = true;
              }
            }
          }
        });

        var recheckPositions = function() {
          for (var i=0; i<scope._stickyElements.length; i++) {
            var item = scope._stickyElements[i];
            if (!item.isStuck) {
              item.start = offsetTop(item.element);
            } else if (item.placeholder) {
              item.start = offsetTop(item.placeholder);
            }
          }
        };
        $win.bind("load", recheckPositions);
        $win.bind("resize", recheckPositions);
      }

      var item = {
        element: element,
        isStuck: false,
        placeholder: attrs.usePlaceholder !== undefined,
        start: offsetTop(element)
      };

      scope._stickyElements.push(item);

    }
  };
});