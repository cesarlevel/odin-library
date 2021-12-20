class Library {
    constructor(collection = []) {
        this.collection = collection;
        this.init();
    }

    addBook(book) {
        if (book instanceof Book) {
            this.collection.push(book);
        }
    }

    deleteBook(bookIndex) {
        this.collection.splice(bookIndex, 1);
    }

    markBookAsRead(bookIndex) {
        this.collection[bookIndex]?.markAsRead();
    }

    init() {
        this.addBook(new Book('The hobbit', 'HR Tolkien', '234', true))
    }
}

class Book {
    constructor(title, author, numberOfPages, read = false) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.read = read;
    }

    markAsRead() {
        this.read = true;
    }

    get isRead() {
        return this.read;
    }
}

const addBookForm =  document.querySelector('form');

addBookForm.onsubmit = function(e) {
    e.preventDefault();
    const title = e.target.querySelector('#title')
    const book = new Book(title.value)
    library.addBook(book)
    renderCollection(library.collection);
    console.log(title.value)
}

function renderCollection(collection) {
    const shelf = document.querySelector('#library ul');
    shelf.innerHTML = '';
    collection.forEach((book, i) => {
        shelf.insertAdjacentHTML('beforeend', `
            <li>${book.title}, ${book.isRead} <div onclick="test(${i})">Delete</div></li>
        `);
    });
}

function test(index) {
    console.log(index)
    library.markBookAsRead(index);
    renderCollection(library.collection);
}
const library = new Library();
library.markBookAsRead(6);
renderCollection(library.collection)
console.log(library)
