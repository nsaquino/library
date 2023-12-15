const myLibrary = [];

function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${numPages} pages, ${read ? 'already read' : `not yet read`}.`
    }
    this.toggleRead = function() {
        this.read = !(this.read);
    }
}

function addBookToLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const numPages = document.getElementById('numPages').value;
    const read = document.getElementById('read').checked;

    myLibrary.push(new Book(title, author, numPages, read));
    displayBooks();
}

function deleteBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function toggleReadInLibrary(index) {
    myLibrary[index].toggleRead();
    displayBooks();
}

function displayBooks() {
    const tbody = document.querySelector('#myBooks > tbody');
    tbody.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const row = document.createElement('tr');
        row.setAttribute('data-index', index);

        const cellTitle = document.createElement('td');
        const cellAuthor = document.createElement('td');
        const cellNumPages = document.createElement('td');
        const cellRead = document.createElement('td');
        const cellAction = document.createElement('td');
        
        //Action buttons
        const btnDel = document.createElement('button');
        btnDel.setAttribute('type', 'button');
        btnDel.classList.add('btnDel');
        //btnDel.setAttribute('data-index', index);
        btnDel.addEventListener('click', () => deleteBookFromLibrary(index));
        btnDel.innerText = 'Delete';

        const btnRead = document.createElement('button');
        btnRead.setAttribute('type', 'button');
        btnRead.classList.add('btnRead');
        btnRead.addEventListener('click', () => toggleReadInLibrary(index));
        btnRead.innerText = 'Read';
        
        //Cells content
        cellTitle.innerText = book.title;
        cellAuthor.innerText = book.author;
        cellNumPages.innerText = book.numPages;
        cellRead.innerText = (book.read)?'✔':'❌';
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
    });
}

function configureModalForm(){
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

    form.addEventListener('submit', () => {
        addBookToLibrary();
    });

}

myLibrary.push(new Book('The Hobbit', 'J.R.R. Tolkien', 295, true));
myLibrary.push(new Book('Star Wars', 'George Lucas', 675, false));
myLibrary.push(new Book('Harry Potter', 'J. K. Rowling', 1105, false));

displayBooks();
configureModalForm();