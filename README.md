# bookandmag

## Get requests

### localhost:5000 or https://bookandmag.herokuapp.com
 Welcome to Server

### localhost:5000/all or https://bookandmag.herokuapp.com/all
 to get all books and magazines together as json in sorted way according to title
 
### localhost:5000/all/{email of author} or https://bookandmag.herokuapp.com/all/{email of author}
 to get all books and magazines written by the author with that email
  
### localhost:5000/books or https://bookandmag.herokuapp.com/books
 to get all books as json
  
### localhost:5000/magazines or https://bookandmag.herokuapp.com/magazines
 to get all magazines as json

### localhost:5000/books/{isbn} or https://bookandmag.herokuapp.com/books/{isbn}
 to get all books with that isbn
 
### localhost:5000/magazines/{isbn} or https://bookandmag.herokuapp.com/magazines/{isbn}
 to get all magazines with that isbn

### localhost:5000/d/books or https://bookandmag.herokuapp.com/d/books
 to download a csv containing all current books
 
### localhost:5000/d/magazines or https://bookandmag.herokuapp.com/d/magazines
 to download a csv containing all current magazines

### localhost:5000/reset or https://bookandmag.herokuapp.com/reset
 to reset data of books and magazines to former new one.
 
## Post requests
 
### localhost:5000/add or https://bookandmag.herokuapp.com/add
 to add book or magazine to data with post request body format => <br />
 for book : <br />
    {<br />
    "title": "bookdemo1", <br />
    "isbn": "1024-5245-8584",<br />
    "authors": "null-lieblich@echocat.org,null-walter@echocat.org,null-rabe@echocat.org",<br />
    "description": "Starkoch Jamie Oliver war mit seinem VW-Bus in Italien unterwegs -- und hat allerlei kulinarische Souvenirs."<br />
    }<br />
  for magazine :<br />
    {<br />
    "title": "magdemo1",<br />
    "isbn": "1024-5245-8584",<br />
    "authors": "null-lieblich@echocat.org,null-walter@echocat.org,null-rabe@echocat.org",<br />
    "publishedAt": "21.05.2011"<br />
    }<br />
