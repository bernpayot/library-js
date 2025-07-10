const addBookButton = document.getElementById("submit");
const bookContainer = document.querySelector(".books");
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".open-dialog");
const closeButton = document.querySelector("dialog button");
showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

const library = [];

function Book(id, title, author, page, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
};

Book.prototype.toggleReadStatus = function() {
    if (this.read === "Not Read") {
        return this.read = "Has Read";
    } else {
        return this.read = "Not Read";
    };
}


function addBookToLibrary(id, title, author, page, read) {
    library.push(new Book(id, title, author, page, read));
};

addBookButton.addEventListener("click", (event) => {
    event.preventDefault();

    let bookId = crypto.randomUUID();
    let titleOfBook = document.getElementById("title").value;
    let authorOfBook = document.getElementById("author").value;
    let numOfPages = document.getElementById("page").value;
    let hasRead = "Not Read";

    addBookToLibrary(bookId, titleOfBook, authorOfBook, numOfPages, hasRead);
    displayBooks();
});

function displayBooks() {
    bookContainer.innerHTML = "";

    for (let i = 0; i < library.length; i++) {
        const book = library[i];

        const div = document.createElement('div');
        div.classList.add("card");
        div.id = book.id;

        const p1 = document.createElement('p');
        p1.classList.add("card-content");

        p1.innerHTML = `Book ID: ${book.id} <br> Title: ${book.title} <br> Author: ${book.author} <br> Number of Pages: ${book.page} <br> Read: ${book.read}`;

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click", () => {
            const index = library.findIndex(b => b.id === book.id);
            if (index !== -1) {
                library.splice(index, 1);
                displayBooks();
            }
        });

        const readButton = document.createElement('button');
        readButton.innerHTML = "Read";
        readButton.addEventListener("click", () => {
            book.toggleReadStatus();
            displayBooks();
        });

        div.appendChild(p1);
        div.appendChild(deleteButton);
        div.appendChild(readButton);
        bookContainer.appendChild(div);
    }
};




