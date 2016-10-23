;(function() {
  function timecode() {
    return function(seconds) {
      // Apparently, JavaScript interprets null as 0, while undefined converts
      // to NaN.
      if (seconds === null) {
	seconds = NaN;
      }

      return buzz.toTimer(seconds);
    };
  }

  angular
    .module('blocJams')
    .filter('timecode', timecode);
})();
