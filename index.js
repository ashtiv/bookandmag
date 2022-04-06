var express = require('express');
var app = express();
var nio = require('node.io')
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.port || 5000;
var books = [];
var magazines = [];
var bandm = []
function arrayToCSV(row) {
    for (let i in row) {
        row[i] = row[i].replace(/"/g, '""');
    }
    return '"' + row.join('","') + '"';
}
function sortdata(temparr) {
    temparr.sort((a, b) => {
        let fa = a.title.toLowerCase(),
            fb = b.title.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
}
const starteverything = () => {
    books = [];
    magazines = [];
    bandm = []
    nio.scrape(function () {
        this.get('http://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv', function (err, data) {
            var lines = data.split('\n');
            for (var line, i = 1, l = lines.length - 1; i < l; i++) {
                var v = lines[i].split(';');
                const obj = {
                    title: v[0],
                    isbn: v[1],
                    authors: v[2],
                    description: v[3]
                }
                books.push(obj)
            }
            sortdata(books);
            for (var i = 0; i < books.length; i++) {
                var obj = books[i];
                obj.type = "book"
                bandm.push(obj);
            }
        });
        this.get('http://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv', function (err, data) {
            var lines = data.split('\n');
            for (var line, i = 1, l = lines.length - 1; i < l; i++) {
                var v = lines[i].split(';');
                const obj = {
                    title: v[0],
                    isbn: v[1],
                    authors: v[2],
                    publishedAt: v[3]
                }
                magazines.push(obj)
            }
            sortdata(magazines)
            for (var i = 0; i < magazines.length; i++) {
                var obj = magazines[i];
                obj.type = "magazine"
                bandm.push(obj);
            }
            sortdata(bandm);
        });
    });
}
starteverything();
app.get('/', function (req, res) {
    res.send('Welcome to Server');
});
app.get('/all', function (req, res) {
    sortdata(bandm)
    res.send(bandm);
});
app.get('/all/:email', function (req, res) {
    sortdata(bandm)
    const email = req.params.email;
    var result = []
    for (var i = 0; i < bandm.length; i++) {
        if (bandm[i].authors == email) {
            result.push(bandm[i]);
        }
    }
    res.send(result);
});
app.get('/books', function (req, res) {
    sortdata(books)
    res.send(books);
});
app.get('/books/:isbn', function (req, res) {
    sortdata(books);
    const isbn = req.params.isbn;
    var result = []
    for (var i = 0; i < books.length; i++) {
        if (books[i].isbn == isbn) {
            result.push(books[i]);
        }
    }
    res.send(result);
});
app.get('/magazines', function (req, res) {
    sortdata(magazines)
    res.send(magazines);
});
app.get('/magazines/:isbn', function (req, res) {
    sortdata(magazines);
    const isbn = req.params.isbn;
    var result = []
    for (var i = 0; i < magazines.length; i++) {
        if (magazines[i].isbn == isbn) {
            result.push(magazines[i]);
        }
    }
    res.send(result);
});
app.get('/d/books', function (req, res) {
    sortdata(books)
    const rows = [
        ["title", "isbn", "authors", "description"],
    ];
    for (var i = 0; i < books.length; i++) {
        var details = [books[i].title, books[i].isbn, books[i].authors, books[i].description];
        rows.push(details);
    }
    var csvContent = "";
    rows.forEach(function (rowArray) {
        let row = arrayToCSV(rowArray);
        csvContent += row + "\r\n";
    });
    res.attachment('bookstemp.csv');
    res.status(200).send(csvContent);
});
app.get('/d/magazines', function (req, res) {
    sortdata(magazines)
    const rows = [
        ["title", "isbn", "authors", "publishedAt"],
    ];
    for (var i = 0; i < magazines.length; i++) {
        var details = [magazines[i].title, magazines[i].isbn, magazines[i].authors, magazines[i].publishedAt];
        rows.push(details)
    }
    var csvContent = "";
    rows.forEach(function (rowArray) {
        let row = arrayToCSV(rowArray);
        csvContent += row + "\r\n";
    });
    res.attachment('magazinestemp.csv');
    res.status(200).send(csvContent);
});
app.post('/add', function (req, res) {
    const b = req.body;
    if (b.authors != undefined && b.title != undefined && b.isbn != undefined) {
        if (b.description != undefined) {
            const obj = {
                title: b.title,
                isbn: b.isbn,
                authors: b.authors,
                description: b.description
            }
            books.push(obj);
            obj.type = "book";
            bandm.push(obj);
            sortdata(bandm);
            sortdata(books);
            res.send(obj)
        }
        else if (b.publishedAt != undefined) {
            const obj = {
                title: b.title,
                isbn: b.isbn,
                authors: b.authors,
                publishedAt: b.publishedAt
            }
            magazines.push(obj);
            obj.type = "magazine";
            bandm.push(obj);
            sortdata(bandm);
            sortdata(magazines);
            res.send(obj)
        }
        else {
            res.send("Not suitable format")
        }
    }
    else {
        res.send("Not suitable format")
    }
});
app.get('/reset', function (req, res) {
    starteverything();
    res.send("Data set to default")
});
app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});