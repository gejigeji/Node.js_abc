//var exec = require("child_process").exec;
var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response) {
    console.log("Request handler 'start' was called.");

    /*
    exec("netstat", function (error, stdout, stderr) {
    //exec("ls -lah", function (error, stdout, stderr) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write(stdout);
	response.end();
    });
    */

    var body = '<html>' +
	'<head>' +
	'<meta http-equiv="Content-Type" content="text/html; ' +
	'charset="UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action="/upload" enctype="multipart/form-data"' +
	'method="post">'+
	'<input type= "file" name="upload" multiple="multiple">'+
	//'<textarea name="text" rows="20" cols="60"></textarea>'+
	'<input type="submit" value="Upload file" />'+
	'</form>'+
	'</body>'+
	'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload(response, request) {
    console.log("Request handle 'upload' was called.");

    /*
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent the text: " +
	    querystring.parse(postData).text);
    response.end();
    */

    var form = new formidable.IncomingForm();
    console.log("about to parse");
    response.writeHead(200, {"Content-Type": "text/html"});
    form.parse(request, function(error, fields, files) {
	console.log("parsing done");
	//console.log(files.upload.path);
	fs.renameSync(files.upload.path,"/tmp/test.png")
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("received image:<br/>");
	response.write("<img src='/show' />");
	response.end();
    });
}


function show(response) {
    console.log("Resquest handler 'show' was called.");
    fs.readFile("/tmp/test.png", "binary", function(error, file) {
	if(error) {
	    response.writeHead(500, {"Content-Type": "text/plain"});
	    response.write(error + "\n");
	    response.end();
	} else {
	    response.writeHead(200, {"Content-Type": "image/jpg"});
	    response.write(file, "binary");
	    response.end();
	}
    })
}

exports.start = start;
exports.upload = upload;
exports.show = show;
