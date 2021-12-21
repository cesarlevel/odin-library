class Book {
    constructor(title, author, numberOfPages, read = false) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.read = read;
    }

    changeReadStatus() {
        this.read = !this.read;
    }

    get isRead() {
        return this.read;
    }
}

const formContiner = document.querySelector('#add-book-form');
const addBookForm =  document.querySelector('form');

let library = [new Book('hobbit wqeqwe  qweqweqweqwe', 'HR Tolkien', '234', true), new Book('hobbit', 'HR Tolkien', '234', true), new Book('hobbit', 'HR Tolkien', '234', true), new Book('hobbit', 'HR Tolkien', '234', true), new Book('hobbit', 'HR Tolkien', '234', true), new Book('hobbit', 'HR Tolkien', '234', true)];


addBookForm.onsubmit = function(e) {
    e.preventDefault();
    const {value: titleValue} = e.target.querySelector('#title');
    const {value: authorValue} = e.target.querySelector('#author');
    const {value: numberOfPagesValue} = e.target.querySelector('#number-of-pages');
    const {checked: readValue} = e.target.querySelector('#read');
    const newBook = new Book(titleValue, authorValue, numberOfPagesValue, readValue);
    if (library.some(({title}) => title === titleValue)) {
        console.log('gotcha')
    } else {
        library.push(newBook);
        renderCollection(library.collection);
    }
}

function renderCollection(collection) {
    const shelf = document.querySelector('#library #shelf');
    shelf.innerHTML = '';
    library.forEach((book, i) => {
        shelf.insertAdjacentHTML('beforeend', `
            <div class="book" title="${book.title}">
                ${book.title}, ${book.isRead}
                <small>${book.author}</small>
                <div onclick="test(${i})">Delete</div>
            </div>
        `);
    });
    shelf.insertAdjacentHTML('beforeend', `<div class="book is-new" onclick="showForm()">+</div>`)
}

function showForm() {
    formContiner.classList.add('is-visible');
    document.body.classList.add('no-scroll');
}

function deleteBook(bookIndex) {
    library.splice(bookIndex, 1);
}

function test(index) {
    library[index].changeReadStatus(index);
    renderCollection(library.collection);
}

renderCollection(library)
console.log(library)
