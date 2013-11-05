angular.module('sticky', []);

function toPx(n){ 
  if(!isNaN(n)){
    return n+"px";
  } else {
    return n;
  }
}

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
      var stickyItem = function(item){
        item.element.attr("style","position:fixed;top:"+toPx(item.topOffset)+";left:"+(item.left-item.leftOffset)+"px;width:"+item.width+"px;");
        item.element.addClass("stuck");
        item.isStuck = true;
      };
      var unStickyItem = function(item){
        item.element.removeClass("stuck");
        item.element.attr("style","");
        item.isStuck = false;
      };

      if (scope._stickyElements === undefined) {
        scope._stickyElements = [];

        $win.bind("scroll", function(e) {
          var pos = windowScrollTop();
          for (var i=0; i<scope._stickyElements.length; i++) {
            var item = scope._stickyElements[i];
            if (!item.isStuck && pos > item.start) {
              stickyItem(item);
            }
            else if (item.isStuck && pos < item.start) {
              unStickyItem(item);
            }
          }
        });

        var updateItem = function(item){
          item.topOffset = scope.$apply(attrs.stickyTop);
          item.leftOffset = scope.$apply(attrs.stickyLeft);
          item.start = offsetTop(item.element)-item.topOffset-20;
          item.width = item.element[0].clientWidth;
          item.left = item.element[0].getBoundingClientRect().left;
        }
        var recheckPositions = function() {
          console.log();
          for (var i=0; i<scope._stickyElements.length; i++) {
            var item = scope._stickyElements[i];
            if (!item.isStuck) {
              updateItem(item);
            } else {
              unStickyItem(item);
              updateItem(item);
              stickyItem(item);
            }
          }
        };
        $win.bind("load", recheckPositions);
        $win.bind("resize", recheckPositions);
      }

      var item = {
        element: element,
        isStuck: false
      };

      scope._stickyElements.push(item);

    }
  };
});