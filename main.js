// array contening the book library

let myLibrary = [{ title: 'Shantaram', author: 'Gregory David Roberts', pages: 936, read: true },
{ title: 'Animal Farm', author: 'George Orwell', pages: 112, read: true },
{ title: 'Un sac de billes', author: 'Joseph Joffo', pages: 288, read: false }];

// The constuctor for the book

function Book(title, author, pages, read) {

    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

    this.info = function () {

        return '${this.title} by ${this.author}, ${this.pages} ${ (${this.pages} > 1) ? "pages" : "page"}, ${this.read ? "already read" : "not read yet"}.';

    }

}

// function to capitalize first letter of each word

function titleCase(str) {
  
    var arr = str.split(' ').map(function(val) {
      
      var a = val[0].toUpperCase();
      for (var i = 1; i<val.length;i++) {
        a = a + val[i].toLowerCase();
      }
      return a;
      
    });

    return arr.join(' ');
    
}

// Adding a book to the library from user's input

function addBookToLibrary() {

    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;

    title = titleCase(title);
    author = titleCase(author);

    if (pages != 0 && title != '' && author != '') {

        let newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
        
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('pages').value = '';

        render();

    } else alert('Oops! Looks like you forgot to fill up some fields!');
}

// display all the books from the library on the webpage

const listOfBooks = document.getElementById('listOfBooks');

function render() {

    while (listOfBooks.firstChild) {
        listOfBooks.removeChild(listOfBooks.firstChild);
    };

    for (let i = 0; i < myLibrary.length; i++) {

        const div = document.createElement('div');
        const btnDelete = document.createElement('button');
        const btnRead = document.createElement('button');
        const containerButtons = document.createElement('div');

        const titleDiv = document.createElement('p');
        const authorDiv = document.createElement('p');
        const pagesDiv = document.createElement('p');

        titleDiv.classList.add('titleBold');

        titleDiv.textContent = `${myLibrary[i].title}`;
        authorDiv.textContent = `${myLibrary[i].author}`;
        pagesDiv.textContent = `${myLibrary[i].pages}`;

        btnDelete.classList.add('delete');
        btnDelete.setAttribute('bookNumber', `${i}`);
        btnDelete.innerHTML = '<i class="far fa-trash-alt"></i>';
        btnDelete.style.color = '#BF1520';

        btnRead.classList.add('read');
        btnRead.setAttribute('read', `${i}`);

        if (myLibrary[i].read) {
            btnRead.style.color = 'green';
            btnRead.textContent = 'Read';
        } else {
            btnRead.style.color = 'rgb(226, 226, 226)';
            btnRead.textContent = 'Read';
        };

        containerButtons.classList.add('containerButtons');
        containerButtons.appendChild(btnRead);
        containerButtons.appendChild(btnDelete);

        div.classList.add('bookContainer');
        div.appendChild(titleDiv);
        div.appendChild(authorDiv);
        div.appendChild(pagesDiv);
        div.appendChild(containerButtons);

        listOfBooks.appendChild(div);

    }

}

render();

// remove targeted book

function removeBook(book) {

    myLibrary.splice(book, 1);

}

// event listener for the 'delete' buttons and the 'read' checkbox

let buttonDelete = document.getElementsByClassName('delete');

document.body.addEventListener('click', event => {

    if (event.target.parentNode.classList == 'delete') {

        removeBook(event.target.parentNode.getAttribute('bookNumber'));
        render();

    } else if (event.target.classList == 'read') {

        if (myLibrary[event.target.getAttribute('read')].read) {
            myLibrary[event.target.getAttribute('read')].read = false;
            
        } else {
            myLibrary[event.target.getAttribute('read')].read = true;
        }
        
        render();
    }

});



// show or hide the add A book form


function showForm() {

    const buttonShow = document.getElementById('show-hide');


    if (document.getElementById('newBookForm').style.opacity == '1') {

        document.getElementById('newBookForm').style.opacity = '0';
        document.getElementById('newBookForm').style.maxHeight = '0';
        buttonShow.innerHTML = 'Add a Book';

    } else {

        document.getElementById('newBookForm').style.opacity = '1';
        document.getElementById('newBookForm').style.maxHeight = '100px';
        buttonShow.innerHTML = `<i class="fas fa-angle-up"></i>`;

    }

};
