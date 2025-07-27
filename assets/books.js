function fetchBooks() {
  return fetch('/book/books.json')
    .then(response => response.json());
}

function renderBookList() {
  var listEl = document.getElementById("book-list");

  fetchBooks().then(books => {
    
    books.sort((a, b) => { return new Date(b.dateRead) - new Date(a.dateRead); }); 
    
    for (const book of books) {
      var bookEl = document.createElement("div");
      bookEl.className = "book-list-item";
      bookEl.innerHTML = `
        <a class="clean" href="/book/${book.slug}">
          <div>
            <img src="/images/books/${book.isbn}.jpeg" />
            <div>
              <h2>${book.title} - By ${book.author}</h2>
              <small>Date Read: ${book.dateRead}</small>
            </div>
          </div>
          <p><strong>My thoughts: </strong>${book.thoughts}</p>
          <hr>
        </a>
      `;
      listEl.appendChild(bookEl);
    }
  });

}

window.onload = renderBookList;
