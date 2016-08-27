var res = [],
    simpleReporter = {

        jasmineStarted: function() {
            res.length = 0;
        },
        specDone: function (result) {
            res.push(result);
        },
        jasmineDone: function (result) {
            console.log(res);
        }
    };

export default simpleReporter;


