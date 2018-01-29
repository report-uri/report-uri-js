document.addEventListener('securitypolicyviolation', function (event) {
    var config = JSON.parse(document.getElementById('csp-report-uri').textContent);
    var json = {'csp-report': {}};
    for (var i = 0, len = config.keys.length; i < len; i++) {
        if (event[config.keys[i]] !== 0 && event[config.keys[i]] !== '') {
            json['csp-report'][config.keys[i]] = event[config.keys[i]];
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', config.reportUri, true);
    xhr.setRequestHeader('content-type', 'application/csp-report');
    xhr.send(JSON.stringify(json));
});
