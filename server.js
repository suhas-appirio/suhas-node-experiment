var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express(),

    appId = process.env.APP_ID;

var resId = 1;
console.log(appId);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client')); 

app.post('/users', function(req, res) {
    var user = req.body.name;
    res.json({
                "id": resId++,
                "result": {
                    "success": true,
                    "status": 201,
                    "content": {
                      "data": 'hello ' + user + '. you are the coolest person on this earth.'
                    },
                    "errorContent": null
                }
    });
});

app.all('*', function (req, res, next) {

        var targetURL = req.header('Target-URL');
        if (!targetURL) {
            res.json({
                "id": resId++,
                "result": {
                    "success": false,
                    "status": 406,
                    "content": null,
                    "errorContent": {
                      "name": "Error",
                      "message": 'error: There is no Target-Endpoint header in the request',
                      "forwardUrl": null
                    }
                }
    });
            return;
        }
});

app.set('port', process.env.PORT || 8200);

app.listen(app.get('port'), function () {
    console.log('Proxy server listening on port ' + app.get('port'));
});