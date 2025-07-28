async function fetchBooks() {
  const response = await fetch('booklist.json');
  if (!response.ok) {
    throw new Error('Failed to load book data.');
  }
  return await response.json();
}

function renderBookList(books) {
  const listEl = document.getElementById("book-list");
  listEl.innerHTML = '<div class="loading">Curating literary selections...</div>';

  try {
    listEl.innerHTML = '';

    // Sort books by date (most recent first)
    books.sort((a, b) => new Date(b.dateRead) - new Date(a.dateRead));

    books.forEach((book, index) => {
      const bookEl = document.createElement("div");
      bookEl.className = "book-item fade-up";
      bookEl.style.animationDelay = `${index * 0.1}s`;

      bookEl.innerHTML = `
        <a href="/book/${book.slug}" style="text-decoration: none; color: inherit;">
          <div class="book-content">
            <img src="/images/books/${book.isbn}.jpeg" alt="${book.title} cover" class="book-cover" />
            <div class="book-details">
              <h3>${book.title}</h3>
              <div class="book-meta">
                <span>by ${book.author}</span>
                <span>Completed ${book.dateRead}</span>
              </div>
              <div class="book-thoughts">
                <strong>Reflections:</strong> ${book.thoughts}
              </div>
            </div>
          </div>
        </a>
      `;

      listEl.appendChild(bookEl);
    });

    // Trigger fade-in animations
    setTimeout(() => {
      document.querySelectorAll('.fade-up').forEach(el => {
        el.classList.add('visible');
      });
    }, 100);

  } catch (error) {
    listEl.innerHTML = '<div class="error">Unable to load book collection. Please try again later.</div>';
    console.error('Error rendering books:', error);
  }
}

// Intersection Observer for fade animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Smooth navbar behavior
let lastScrollY = window.scrollY;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.style.boxShadow = scrollY > 50 ? '0 2px 20px rgba(0, 0, 0, 0.08)' : 'none';
  lastScrollY = scrollY;
});

// Initialize page
window.addEventListener('load', async () => {
  try {
    const books = await fetchBooks();
    renderBookList(books);

    // Observe fade-up elements
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  } catch (error) {
    document.getElementById("book-list").innerHTML = '<div class="error">Failed to load books.</div>';
    console.error(error);
  }
});
