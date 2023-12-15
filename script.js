const myLibrary = [];

function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${numPages} pages, ${read ? 'already read' : `not yet read`}.`
    }
}

function addBookToLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const numPages = document.getElementById('numPages').value;
    const read = document.getElementById('read').checked;

    myLibrary.push(new Book(title, author, numPages, read));
    console.log(myLibrary);
    displayBooks();
}

function displayBooks() {
    const tbody = document.querySelector('#myBooks > tbody');
    tbody.innerHTML = '';

    myLibrary.forEach(book => {
        const row = document.createElement('tr');
        
        const tdTitle = document.createElement('td');
        const tdAuthor = document.createElement('td');
        const tdNumPages = document.createElement('td');
        const tdRead = document.createElement('td');

        tdTitle.innerText = book.title;
        tdAuthor.innerText = book.author;
        tdNumPages.innerText = book.numPages;
        tdRead.innerText = book.read;

        row.appendChild(tdTitle);
        row.appendChild(tdAuthor);
        row.appendChild(tdNumPages);
        row.appendChild(tdRead);

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

myLibrary.push(new Book('The Hobbit', 'J.R.R. Tolkien', 295, false));

displayBooks();
configureModalForm();