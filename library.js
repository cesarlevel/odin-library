const formContiner = document.querySelector('#add-book-form');
const addBookForm = document.querySelector('form');
const cancelForm = document.querySelector('form button.is-secondary');
const formErrorMessage = document.querySelector('form p.error-message');

class Book {
    constructor(title, author, numberOfPages = 2, read = false, background) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.read = read;
        this.background = background || this.selectRandomColor();
    }

    static colors = ['aliceblue', 'antiquewhite', 'azure', 'blanchedalmond', 'cornsilk', 'gainsboro', 'lavender', 'thistle', 'salmon'];

    get isRead() {
        return this.read ? 'Read' : 'Not read';
    }

    changeReadStatus() {
        this.read = !this.read;
    }

    selectRandomColor() {
        return Book.colors[Math.floor(Math.random() * Book.colors.length)];
    }
}

let library = [
    new Book('In search of lost time', 'Marcel Proust', '432', true),
    new Book('Ulysses', 'James Joyce', '145', true),
    new Book('Don Quixote', 'Miguel de Cervantes', '589', true),
];

addBookForm.onsubmit = function(e) {
    e.preventDefault();
    const {value: titleValue} = e.target.querySelector('#title');
    const {value: authorValue} = e.target.querySelector('#author');
    const {value: numberOfPagesValue} = e.target.querySelector('#number-of-pages');
    const {checked: readValue} = e.target.querySelector('#read');
    const newBook = new Book(titleValue, authorValue, numberOfPagesValue, readValue);
    if (library.some(({title}) => title.toLowerCase() === titleValue.toLowerCase())) {
        formErrorMessage.innerHTML = 'Book is already in your library';
    } else {
        library.push(newBook);
        e.target.reset();
        hideForm();
        setLocalStorage();
        renderCollection(library);
    }
}

cancelForm.addEventListener('click', (e) => {
    e.preventDefault();
    hideForm();
})

function renderCollection(library) {
    const shelf = document.querySelector('#library #shelf');
    shelf.innerHTML = '';
    library.forEach((book, i) => {
        shelf.insertAdjacentHTML('beforeend', `
            <div class="book" title="${book.title}" style="background: ${book.background}">
                <div class="title">
                    <span>${book.title}</span>
                    <small>${book.author}</br><i>P. ${book.numberOfPages}</i></small>
                </div>
                <div class="mark-as-read ${book.read ? 'is-read' : 'is-not-read'}" onclick="markBookAsRead(${i})">${book.isRead}</div>
                <div class="delete-book-button" onclick="deleteBook(${i})"><i class="uil uil-times-circle"></i></div>
            </div>
        `);
    });
    shelf.insertAdjacentHTML('beforeend', `<div class="book is-new" onclick="showForm()"><i class="uil uil-plus-circle"></i></div>`);
}

function showForm() {
    formContiner.classList.add('is-visible');
    document.body.classList.add('no-scroll');
}

function hideForm() {
    formContiner.classList.remove('is-visible');
    document.body.classList.remove('no-scroll');
}

function deleteBook(bookIndex) {
    library.splice(bookIndex, 1);
    setLocalStorage();
    renderCollection(library);
}

function markBookAsRead(index) {
    library[index].changeReadStatus(index);
    setLocalStorage();
    renderCollection(library);
}

function setLocalStorage() {
    window.localStorage.setItem('odin-library', JSON.stringify(library));
}

function getLocalStorage() {
    let localLibrary = JSON.parse(window.localStorage.getItem('odin-library'));
    library = localLibrary.map(({title, author, numberOfPages, read, background}) => {
        return new Book(title, author, numberOfPages, read, background);
    })
}

function init() {
    if (window.localStorage.getItem('odin-library')) {
        getLocalStorage();
    } else {
        setLocalStorage();
    }
    renderCollection(library);
}

init();
