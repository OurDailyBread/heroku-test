var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
np
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//app.configure(function() {
//  app.use(bodyParser.urlencoded({ extended: false });
//  app.use(bodyParser.json());
  //app.use(express.bodyParser());
  //app.use(app.router);
//}
//  app.use(allowCrossDomain);
/*
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
*/

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});





app.get('/herokuTest', function(request, response) {
	response.send('Hello World!');
});


//CODE
var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'keyWInwqgSshQe7GV' }).base('app4ilATYQGuMBgjp');

app.get('/airtableTest', function(request, response) {
	// URL params (GET) req.param.variable_name
	// body params (POST) req.body.variable_name
	base('Route Data').select({
    // Selecting the first 3 records in Main View:
      view: "Main View"
    }).eachPage(function page(records, fetchNextPage) {

      // This function (`page`) will get called for each page of records.

      records.forEach(function(record) {
        console.log('Retrieved ', record.get('Auto Number'));
		//console.log(record);
		console.log('ID: ' + record.id);
		console.log('Request: ' + request.body.variable_name);
        response.end(JSON.stringify(record));
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();

    }, function done(error) {
      if (error) {
        console.log(error);
      }
    });

});


// http://www.murvinlai.com/req-and-res-in-nodejs.html
// shows sample request object
/*
req = {
    _startTime     :    Date, 
    app            :    function(req,res){},
    body           :    {},
    client         :    Socket,
    complete       :    Boolean,
    connection     :    Socket,
    cookies        :     {},
    files          :     {},
    headers        :    {},
    httpVersion    :    String,
    httpVersionMajor    :    Number,
    httpVersionMinor    :     Number,
    method         :    String,  // e.g. GET POST PUT DELETE
    next           :    function next(err){},
    originalUrl    :    String,     // e.g. /erer?param1=23¶m2=45
    params         :    [],
    query          :    {},
    readable       :    Boolean,
    res            :    ServerResponse,
    route          :    Route,
    signedCookies  :    {},
    socket         :    Socket,
    url            :    String //e.g. /erer?param1=23¶m2=45 
}

res = {
    app            :    function(req, res) {},
    chunkedEncoding:    Boolean,
    connection     :     Socket,
    finished       :    Boolean,
    output         :    [],
    outputEncodings:    [],
    req            :    IncomingMessage,
    sendDate       :    Boolean,
    shouldkeepAlive    : Boolean,
    socket         :     Socket,
    useChunkedEncdoingByDefault    :    Boolean,
    viewCallbacks  :    [],
    writable       :     Boolean
}

*/
app.post('/saveMap', function(request, response) {
	console.log('POST test successful ' + JSON.stringify(request.body));
	response.end('success');
});




//OUTPUT
//Retrieved 1

//FETCH FIRST PAGE
// If you only want the first page of records, you can
// use `firstPage` instead of `eachPage`.
/*base('Route Data').select({
    view: 'Main View'
}).firstPage(function(error, records) {
    if (error) {
        console.log(error);
    } else {
        records.forEach(function(record) {
            console.log('Retrieved ', record.get('Auto Number'));
        });
    }
});*/