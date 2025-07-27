function fetchBookData(slug) {
  return fetch('/book/books.json')
    .then(async response => {
      var books = await response.json();
      return books.find(b => b.slug === slug);
    });
}

function populateBookNotesPage() {
  var slug = window.location.pathname.split('/book/')[1].replace(".html", "");
  var bodyEl = document.getElementById("container");

  fetchBookData(slug).then(book => {
     var headerEl = document.createElement("div");
     var footerEl = document.createElement("div");
     console.log(book);
     headerEl.innerHTML = `
       <nav>
          <a class="clean" href=/>🏠</a>
          <a href="/book">Book Notes</a>
          <a href="/blog">Blog</a>
       </nav>
       <div class="book-list-item">
        <img src="/images/books/${book.isbn}.jpeg">
        <div>
          <h1>${book.title} - By ${book.author}</h1>
          <small>Date Read: ${book.dateRead}</small>
          <p>
            <a href="https://www.goodreads.com/book/isbn/${book.isbn}" target="_blank">Goodreads</a> | ISBN: ${book.isbn}</p>
        </div>
       </div>
       <hr>
       <div>
        <p><strong>My thoughts: </strong>${book.thoughts}</p>
       </div>
       <h1>Notes</h1>
     `;

    footerEl.innerHTML = `
      <hr>
      <a href="/book">← All books</a>
      <br><br>
    `;

    bodyEl.prepend(headerEl);
    bodyEl.append(footerEl);

  });
}

window.onload = populateBookNotesPage;
