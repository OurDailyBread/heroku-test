var express = require('express');
var app = express();

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
	base('Route Data').select({
    // Selecting the first 3 records in Main View:
      maxRecords: 3,
      view: "Main View"
    }).eachPage(function page(records, fetchNextPage) {

      // This function (`page`) will get called for each page of records.

      records.forEach(function(record) {
        console.log('Retrieved ', record.get('Auto Number'));
        response.end('Hello World\n');
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