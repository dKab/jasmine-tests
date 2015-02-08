beforeEach(function () {
  jasmine.addMatchers({
    toBeOfType: function (util, customEqualityTesters) {
      return {
        compare: function (actual, expected) {
          return {
          pass: util.equals(
              Object.prototype.toString.call(actual),  
              "[object " + expected + "]", 
              customEqualityTesters
            )        
          };
        }
      };
    }
  });
});
