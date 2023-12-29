class Book {
    constructor(title, author, numPages, read) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.read = !!read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.read ? 'already read' : `not yet read`}.`
    }

    toggleRead() {
        this.read = !(this.read);
    }
}

class Library extends Array {
    addBook(book) {
        this.push(book);
    }

    deleteBook(index) {
        this.splice(index, 1);
    }

    toggleRead(index) {
        this[index].toggleRead();
    }
}

class DisplayController {
    #library;

    constructor(lib) {
        this.#library = lib;
    }

    render() {
        const tbody = document.querySelector('#myBooks > tbody');
        tbody.innerHTML = '';

        this.#library.forEach((book, index) => addRow(book, index));

        function addRow(book, index) {
            const row = document.createElement('tr');
            row.dataset.index = index;
            //row.setAttribute('data-index', index);

            //Create cells
            const cellTitle = document.createElement('td');
            const cellAuthor = document.createElement('td');
            const cellNumPages = document.createElement('td');
            const cellRead = document.createElement('td');
            const cellAction = document.createElement('td');

            //Create buttons
            const btnDel = document.createElement('button');
            const btnRead = document.createElement('button');

            //Configure delete button
            btnDel.type = "button";
            //btnDel.setAttribute('type', 'button');
            btnDel.classList.add('btnDel');
            //btnDel.setAttribute('data-index', index);
            btnDel.addEventListener('click', () => handlerDelBtn(index));
            btnDel.innerText = 'Delete';

            //Configure toggle Read button
            btnRead.setAttribute('type', 'button');
            btnRead.classList.add('btnRead');
            btnRead.addEventListener('click', () => handlerReadBtn(index));
            btnRead.innerText = 'Read';

            //Configure cells and add content
            cellTitle.innerText = book.title;

            cellAuthor.innerText = book.author;

            cellNumPages.innerText = book.numPages;

            cellRead.innerText = (book.read) ? '✔' : '❌';
            cellRead.classList.add('readCell');

            cellAction.classList.add('actionCell');
            cellAction.appendChild(btnDel);
            cellAction.appendChild(btnRead);

            //Append the data in this order to the row
            row.appendChild(cellTitle);
            row.appendChild(cellAuthor);
            row.appendChild(cellNumPages);
            row.appendChild(cellRead);
            row.appendChild(cellAction);

            tbody.appendChild(row);
        }

        const handlerDelBtn = (index) => {
            this.#library.deleteBook(index);
            this.render();
        }
    
        const handlerReadBtn = (index) => {
            this.#library.toggleRead(index);
            this.render();
        }
    }


    #addBookHandler = () => {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const numPages = document.getElementById('numPages').value;
        const read = document.getElementById('read').checked;

        this.#library.addBook(new Book(title, author, numPages, read));
        this.render();
    }

    configureModalForm() {
        const dialog = document.querySelector('dialog');
        const showBtn = document.querySelector('#newBtn');
        const cancelBtn = document.querySelector('#cancelBtn');
        const submitBtn = document.querySelector('#submitBook');
        const form = document.querySelector('#submitBookForm');

        showBtn.addEventListener('click', () => {
            dialog.showModal();
        });

        cancelBtn.addEventListener('click', () => {
            dialog.close();
        });

        form.addEventListener('submit', this.#addBookHandler);
    }
}

const myLibrary = new Library();
const display = new DisplayController(myLibrary);


myLibrary.addBook(new Book('The Hobbit', 'J.R.R. Tolkien', 295, true));
myLibrary.addBook(new Book('Star Wars', 'George Lucas', 675, false));
myLibrary.addBook(new Book('Harry Potter', 'J. K. Rowling', 1105, false));

console.log(myLibrary);
console.dir(myLibrary);

display.render();
display.configureModalForm();