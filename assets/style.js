const books = [
      {
        "title": "The Almanack of Naval Ravikant",
        "author": "Eric Jorgenson",
        "isbn": "9781544514215",
        "slug": "almanack-of-naval-ravikant",
        "dateRead": "December 5th, 2024",
        "thoughts": "A masterful distillation of Naval's philosophy on wealth creation and decision-making. This isn't just about money—it's about understanding leverage, time, and the art of building something meaningful. Essential reading for anyone questioning conventional paths to success."
      },
      {
        "title": "Atomic Habits",
        "author": "James Clear",
        "isbn": "9780735211292",
        "slug": "atomic-habits",
        "dateRead": "October 15th, 2024",
        "thoughts": "Clear transforms the abstract concept of behavior change into something tangible and actionable. His framework of making good habits obvious, attractive, easy, and satisfying is deceptively simple yet profoundly effective. A blueprint for anyone serious about sustainable personal transformation."
      },
      {
        "title": "Sapiens: A Brief History of Humankind",
        "author": "Yuval Noah Harari",
        "isbn": "9780062316097",
        "slug": "sapiens",
        "dateRead": "August 22nd, 2024",
        "thoughts": "Harari weaves together history, anthropology, and philosophy to challenge our fundamental assumptions about human progress. His exploration of how shared myths and stories shape civilizations is both enlightening and unsettling. A book that changes how you see our species' place in the world."
      }
    ];

    function renderBookList() {
      const listEl = document.getElementById("book-list");
      
      // Show loading state
      listEl.innerHTML = '<div class="loading">Curating literary selections...</div>';

      try {
        // Clear loading state
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
      
      if (scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
      } else {
        navbar.style.boxShadow = 'none';
      }
      
      lastScrollY = scrollY;
    });

    // Initialize page
    window.addEventListener('load', () => {
      renderBookList();
      
      // Observe fade-up elements
      document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
      });
    });
