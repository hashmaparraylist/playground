var aPromise = new Promise(function(reslove) {
    setTimeout(function() {
        reslove(100);
    }, 1000);
});

aPromise.then(function(value) {
    console.log('hello ', value);
}).then(function(value) {
    console.log('hello 2', value);
});

