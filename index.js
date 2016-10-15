var express = require('express')
var app = express();
var fs = require('fs')

app.use('/', express.static(__dirname + '/'));

fs.readFile('Dictionary.json', function (err, data) {
	if (err) throw err;

	dict = JSON.parse(data);

	app.get('', function (req, res) {
		res.sendFile(__dirname+'/index.html');
	});

	app.get('/search', function (req, res) {
		console.log('Searched: '+JSON.stringify(req.query));
		pattern = req.query.pattern;
		results = req.query.results;

		regex = new RegExp(pattern, 'i');

		count = 0;

		out = Object.keys(dict).sort().filter((str) => regex.test(str) && count++ < parseInt(results))

		out = out.map((key) => {return {key: key, definition: dict[key]}})

		res.send({value: out})
		console.log('Sent: '+JSON.stringify(out));
	});

	app.listen('8000', function () {
		console.log('listening to port 8000')
	});
});
