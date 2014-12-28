jasmineRequire.html = function(j$) {
  j$.ResultsNode = jasmineRequire.ResultsNode();
  j$.HtmlReporter = jasmineRequire.HtmlReporter(j$);
};

jasmineRequire.HtmlReporter = function(j$) {
  var noopTimer = {
    start: function() {},
    elapsed: function() { return 0; }
  };

  function HtmlReporter(options) {
    var env = options.env || {},
      getContainer = options.getContainer,
      createElement = options.createElement,
      createTextNode = options.createTextNode,
      onRaiseExceptionsClick = options.onRaiseExceptionsClick || function() {},
      timer = options.timer || noopTimer,
      results = [],
      specsExecuted = 0,
      failureCount = 0,
      pendingSpecCount = 0,
      htmlReporterMain,
      failedSuites = [];

      this.initialize = function() {
      htmlReporterMain = createDom('div', {className: 'my_html-reporter'});
      getContainer().appendChild(htmlReporterMain);
    };



    var totalSpecsDefined;
    this.jasmineStarted = function(options) {
      clearPrior();
      //var results = createDom('div', {className: "suite-results"});
      var results = createDom('div', {className: "suite results"});
      //htmlReporterMain = getContainer().querySelector('.my_html-reporter');
      htmlReporterMain.appendChild(results);
      totalSpecsDefined = options.totalSpecsDefined || 0;
      timer.start();
    };

    var topResults = new j$.ResultsNode({}, '', null),
      currentParent = topResults;

    this.suiteStarted = function(result) {
      currentParent.addChild(result, 'suite');
      currentParent = currentParent.last();
    };

    this.suiteDone = function(result) {
      if (result.status == 'failed') {
        failedSuites.push(result);
      }

      if (currentParent == topResults) {
        return;
      }
      currentParent = currentParent.parent;
    };

    this.specStarted = function(result) {
      currentParent.addChild(result, 'spec');
    };

    this.specDone = function(result) {
      if (result.status == 'failed') {
        failureCount++;
        parent = currentParent;
        while(parent != null) {
          parent.status  = 'failed';
          parent = parent.parent;
        }
      } 
    };

    this.jasmineDone = function() {

      // summaryList(topResults, summary);
      //window.success = topResults.
      //console.log(topResults);
     // console.log(failureCount);

     if (!failureCount) {
      var feedback = createDom('div', {className: 'status correct'}, 'Правильно!');
     } else {
      var feedback = createDom('div', {className: 'status wrong'}, 'Не правильно');
     }
     getContainer().appendChild(feedback);

      window.failureCount = failureCount;
      var results = find('.suite.results');
      //summaryList(topResults, results);
      mySummaryList(topResults, results);
      function mySummaryList(resultsTree, domParent) {
        var specListNode;
        for(var i = 0; i<resultsTree.children.length; i++) {
          var resultNode = resultsTree.children[i];
          if (resultNode.type == 'suite' && resultNode.parent != topResults) {
            var statusClass = (resultNode.status == "failed") ? " failed" : " passed";
            var childrenSpecsNode = createDom('ul');
            var suiteNode = createDom('li', {className: 'suite' + statusClass}, 
              resultNode.result.description,
              childrenSpecsNode);

            mySummaryList(resultNode ,childrenSpecsNode);
            domParent.appendChild(suiteNode);
          } else if (resultNode.type == 'suite' && resultNode.parent === topResults) {
            var statusClass = (resultNode.status == "failed") ? " failed" : " passed";
            var suiteNode = createDom('ul', {className: 'suite' + statusClass}, resultNode.result.description);
            //domParent.className += 
            mySummaryList(resultNode , suiteNode);
            domParent.appendChild(suiteNode);
          }
          if (resultNode.type == 'spec') {
            var statusClass = (resultNode.result.status == "failed") ? " failed" : " passed";
            var specNode = createDom('li', {className: 'spec' + statusClass}, 
              createDom('span', {}, resultNode.result.description)
              );
            domParent.appendChild(specNode);
          }
        }

      }
    };

    return this;

    function find(selector) {
      return getContainer().querySelector('.my_html-reporter ' + selector);
    }

    function clearPrior() {
      var oldResults = find('.suite.results');
      var reporter = find('');
      if (reporter && oldResults) {
        reporter.removeChild(oldResults);
      }
      
      //reporter.innerHTML = "";
      topResults = new j$.ResultsNode({}, '', null);
      currentParent = topResults;
     window.tree = null;
    }


    function createDom(type, attrs, childrenVarArgs) {
      var el = createElement(type);

      for (var i = 2; i < arguments.length; i++) {
        var child = arguments[i];

        if (typeof child === 'string') {
          el.appendChild(createTextNode(child));
        } else {
          if (child) {
            el.appendChild(child);
          }
        }
      }

      for (var attr in attrs) {
        if (attr == 'className') {
          el[attr] = attrs[attr];
        } else {
          el.setAttribute(attr, attrs[attr]);
        }
      }

      return el;
    }

  }

  return HtmlReporter;
};



jasmineRequire.ResultsNode = function() {
  function ResultsNode(result, type, parent) {
    this.result = result;
    this.type = type;
    this.parent = parent;

    this.children = [];

    this.addChild = function(result, type) {
      this.children.push(new ResultsNode(result, type, this));
    };

    this.last = function() {
      return this.children[this.children.length - 1];
    };
  }

  return ResultsNode;
};