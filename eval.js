(function() {
	var urlParams  = parseURI();
  	
	window.jasmine = jasmineRequire.core(jasmineRequire);
	jasmineRequire.html(jasmine);
	var env = jasmine.getEnv();
	var jasmineInterface = jasmineRequire.interface(jasmine, env);

	if (typeof window == "undefined" && typeof exports == "object") {
		extend(exports, jasmineInterface);
	} else {
		extend(window, jasmineInterface);
	}
	var currentSpec = urlParams.spec || 1;
	var lastSubmit;
	window.tasksTotal = 4;

	var htmlReporter = new jasmine.HtmlReporter({
    env: env,
    onRaiseExceptionsClick: function() { queryString.setParam("catch", !env.catchingExceptions()); },
    getContainer: function() { return document.getElementById("feedback_"+currentSpec); },
    createElement: function() { return document.createElement.apply(document, arguments); },
    createTextNode: function() { return document.createTextNode.apply(document, arguments); },
    timer: new jasmine.Timer()
  });

	env.addReporter(jasmineInterface.jsApiReporter);
	env.addReporter(htmlReporter);


	function extend(destination, source) {
		for (var property in source) destination[property] = source[property];
			return destination;
	}

	document.addEventListener("DOMContentLoaded", function(event) {
		displayStep(urlParams);
		if (lastSubmit = sessionStorage.getItem("code_to_verify_"+currentSpec)) {
		document.getElementById("code_to_verify_"+currentSpec).innerHTML = lastSubmit; //try value instead of innerHTML
	}
	var solvedCount = (localStorage.getItem('solvedCount') === null) ?
	 0 : 
	 localStorage.getItem('solvedCount'),
	 percent = solvedCount / tasksTotal * 100,
	 className = determineColor(percent);

	var tasks = document.querySelectorAll('.task'), span;
	for (var i = 0; i < tasks.length; i++) {
		if (localStorage.getItem(tasks[i].id) == 'solved')
			tasks[i].querySelector('h2 span').className = 'solved';
		span = tasks[i].querySelector('.percentage span');
		span.innerHTML = percent + '%';
		span.className = className;
	}

  var storedResults = localStorage.getItem('feedback_'+currentSpec);
  if (storedResults !== null) {
    showStoredResults(currentSpec);
  }

		var body = document.body;
		body.addEventListener("click", function(e) { 
			if (e.target.nodeName == "BUTTON") {
				target = e.target;
					if (target.className === "verify") {
						var form = target.form,
							textarea = form.elements[0],
						     codeToEvaluate = textarea.value;
						sessionStorage.setItem(textarea.id, codeToEvaluate);
						globalEval(codeToEvaluate);
						runSuite(form, currentSpec);
					}
			}
		});
	});

	function runSuite(form, n) {
			var scriptFile = n + ".js";
	var xhrObj = new XMLHttpRequest();
	xhrObj.open('GET', scriptFile, false);
	xhrObj.send(null);
	globalEval(xhrObj.responseText);
	htmlReporter.initialize();
	env.execute();
	displayResults(form, n);
    window.addEventListener('beforeunload', saveLastResults);
	}

function saveLastResults() {
  var container = document.getElementById("feedback_"+currentSpec);
  if (container.querySelector('.my_html-reporter') === null) return; 
  var html = container.querySelector('.my_html-reporter').outerHTML;
  localStorage.setItem('feedback_'+currentSpec, html);
} 

function showStoredResults(currentSpec) {
  var code = localStorage.getItem('task_'+currentSpec+'last-code'),
  html = localStorage.getItem('feedback_'+currentSpec);
  if (code.replace(/^\s*|\s*$/g, '') === '') return;
  var div = document.createElement('div');
  div.className = 'stored-feedback';
  div.id = 'stored-feedback_'+currentSpec;

  div.innerHTML = html;

  var pre = document.createElement('pre'),
      codeTag = document.createElement('code');
  codeTag.appendChild(document.createTextNode(code));
  pre.appendChild(codeTag);

  div.insertBefore(pre, div.firstChild);

  var time = document.createElement('div');
  time.className = 'time';
  time.appendChild(document.createTextNode(localStorage.getItem('task_'+currentSpec+'_last-date')));
  div.insertBefore(time, pre);
  
  var taskBlock = document.getElementById('task_'+currentSpec),
  form = taskBlock.querySelector('form');
  taskBlock.insertBefore(div, form);
  var tabs = document.createElement('ul'),
  li1 = document.createElement('li'),
  li2 = document.createElement('li');
  tabs.className = 'tabs';
  li1.appendChild(document.createTextNode('Показать форму'));
  li1.className = 'selected';
  li2.appendChild(document.createTextNode('Предыдущая попытка'));

  taskBlock.insertBefore(tabs, div);
  tabs.appendChild(li1);
  tabs.appendChild(li2);
  li1.addEventListener('click', function() {
    this.parentNode.querySelector('.selected').className = '';
    div.style.display = 'none';
    form.style.display = 'block';
    this.className = 'selected';
  });
  li2.addEventListener('click', function() {
    this.parentNode.querySelector('.selected').className = '';
    this.className = 'selected';
    form.style.display = 'none';
    div.style.display = 'block';
  });
}

}());

function parseURI() {
    var match,
    	urlParams,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
   return urlParams;
}

function displayStep(urlParams) {
	var spec = ("spec" in urlParams) ? urlParams.spec : 1;
	var tasks = document.getElementsByClassName('task');
	Array.prototype.forEach.call(tasks, function(elem) { elem.style.display =  (elem.id === "task_"+spec) ? "block" : "none";  });
}
 function globalEval(data) {                            
 	data = data.replace(/^\s*|\s*$/g, "");
 	if (data) {
 		var head = document.getElementsByTagName("head")[0] ||
 		document.documentElement,
              script = document.createElement("script");       

              script.type = "text/javascript";
              script.text = data;
                            
          head.appendChild(script);
          head.removeChild(script);                            
      }
  }
  function displayResults(form, currentSpec) {
  	var passed =  !failureCount;

  	var submitBtn = form.querySelector('.verify');
  	submitBtn.parentNode.removeChild(submitBtn);
  	var feedbackBlock = form.nextElementSibling;

  	if (passed) {
 		var taskBlock = document.getElementById('task_'+currentSpec);
 		taskBlock.querySelector('h2 span').className = 'solved';
 		var solvedCount  = localStorage.getItem('solvedCount');
  		if (supports_html5_storage() && !localStorage.getItem('task_'+currentSpec)) {
  			localStorage.setItem('task_'+currentSpec, 'solved');
  			if (solvedCount !== null) {
  				localStorage.setItem('solvedCount', ++solvedCount);
  			} else {
  				solvedCount = 1;
  				localStorage.setItem('solvedCount', solvedCount);
  			}
  			var percent = solvedCount / tasksTotal * 100,
  			className = determineColor(percent),
  			tasks = document.getElementsByClassName('task'),
  			span;
  			for (var i = 0; i < tasks.length; i++) {
  				span = tasks[i].querySelector('.percentage span');
  				span.innerHTML = percent + '%';
  				span.className = className;
  			}
  		}
  	}
    var date = new Date(), strDate = getDateString(date);
    localStorage.setItem('task_'+currentSpec+'_last-date', strDate);
    var code = form.querySelector('textarea').value;
    localStorage.setItem('task_'+currentSpec+'last-code', code);

  	var reset = document.createElement("button");
  	reset.appendChild(document.createTextNode("Ещё раз"));
  	var div = document.createElement('div');
  	div.appendChild(reset);
  	feedbackBlock.appendChild(div);
  	reset.addEventListener("click", function(event) {
  		location.reload();
  	});

  	if (passed && currentSpec < tasksTotal) {
  		var next = document.createElement('button');
  		next.appendChild(document.createTextNode("Следующий шаг"));
  		div.appendChild(next);
  		next.addEventListener("click", function() {
  			location.href = location.pathname + "?spec="+(++currentSpec);
  		});
  	}

  }

  function supports_html5_storage() {
  	try {
  		return 'localStorage' in window && window.localStorage !== null;
  	} catch (e) {
  		return false;
  	}
  }

  function determineColor(number) {
  	if (number < 25) {
  		className = 'red';
  	} else if (25 <= number && number < 50) {
  		className = 'orange';
  	} else if (50 <= number && number < 75) {
  		className = 'yellow';
  	} else className = 'green';
  	return className;
  }



function getDateString(dateObj) {
  var dateStr = '';
  dateStr += dateObj.getDate() + '.';

  dateStr += (+(dateObj.getMonth()) + 1) + '.';
  dateStr += dateObj.getFullYear() + ' в ';
  dateStr += dateObj.getHours() + ':';
  dateStr += dateObj.getMinutes() + ':';
  dateStr += dateObj.getSeconds();
  return dateStr;
}
