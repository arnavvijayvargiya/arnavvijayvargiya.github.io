    const travels = [
      {
        "destination": "Kyoto, Japan",
        "country": "Japan",
        "slug": "kyoto-temples-traditions",
        "dateVisited": "March 2024",
        "duration": "8 days",
        "season": "Cherry Blossom Season",
        "type": "Cultural Immersion",
        "image": "/images/travel/kyoto-temple.jpg",
        "reflections": "Walking through Fushimi Inari's thousand torii gates at dawn, I understood why the Japanese concept of 'mono no aware'—the bittersweet awareness of impermanence—resonates so deeply. Every blooming sakura, every quiet temple moment felt both eternal and fleeting.",
        "highlights": {
          "unforgettable": "Meditation session at Kenninji Temple",
          "discovery": "Hidden ramen shop in Pontocho Alley",
          "connection": "Tea ceremony with elderly master",
          "challenge": "Navigating without speaking Japanese"
        }
      },
      {
        "destination": "Reykjavik & Ring Road, Iceland",
        "country": "Iceland",
        "slug": "iceland-fire-ice",
        "dateVisited": "September 2023",
        "duration": "12 days",
        "season": "Autumn",
        "type": "Nature & Adventure",
        "image": "/images/travel/iceland-northern-lights.jpg",
        "reflections": "Iceland doesn't just show you nature—it overwhelms you with it. Standing beneath the Northern Lights while soaking in geothermal waters, I felt simultaneously insignificant and deeply connected to something larger than myself. The landscape here teaches patience and humility.",
        "highlights": {
          "unforgettable": "Northern Lights over Jökulsárlón",
          "discovery": "Secret hot spring locals shared",
          "connection": "Stories with fellow travelers in mountain huts",
          "challenge": "Camping through unexpected snowstorm"
        }
      },
      {
        "destination": "Rajasthan Circuit, India",
        "country": "India",
        "slug": "rajasthan-heritage-circuit",
        "dateVisited": "November 2023",
        "duration": "15 days",
        "season": "Post-Monsoon",
        "type": "Heritage & Culture",
        "image": "/images/travel/rajasthan-palace.jpg",
        "reflections": "Returning to India after years abroad felt like reading a book written in a half-forgotten language. The chaos that once overwhelmed me now felt like a symphony. In Jaisalmer's golden sandstone and Udaipur's lake reflections, I rediscovered the poetry of my own heritage.",
        "highlights": {
          "unforgettable": "Sunrise over Thar Desert dunes",
          "discovery": "Miniature painting workshop in Udaipur",
          "connection": "Late-night chai with camel herders",
          "challenge": "Navigating festival crowds in Pushkar"
        }
      }
    ];

    function renderTravelList() {
      const listEl = document.getElementById("travel-list");
      
      // Show loading state
      listEl.innerHTML = '<div class="loading">Mapping adventures across continents...</div>';

      try {
        // Clear loading state
        listEl.innerHTML = '';

        // Sort travels by date (most recent first)
        travels.sort((a, b) => new Date(b.dateVisited) - new Date(a.dateVisited));

        travels.forEach((travel, index) => {
          const travelEl = document.createElement("div");
          travelEl.className = "travel-item fade-up";
          travelEl.style.animationDelay = `${index * 0.1}s`;
          
          travelEl.innerHTML = `
            <a href="/travel/${travel.slug}" style="text-decoration: none; color: inherit;">
              <div class="travel-content">
                <img src="${travel.image}" alt="${travel.destination}" class="travel-image" />
                <div class="travel-details">
                  <div class="location-badge">${travel.country}</div>
                  <h3>${travel.destination}</h3>
                  <div class="travel-meta">
                    <span>${travel.dateVisited}</span>
                    <span>•</span>
                    <span>${travel.duration}</span>
                    <span>•</span>
                    <span>${travel.type}</span>
                  </div>
                  <div class="travel-reflections">
                    <strong>Journey Reflections:</strong> ${travel.reflections}
                  </div>
                  <div class="travel-highlights">
                    <div class="highlights-grid">
                      <div class="highlight-item">
                        <div class="highlight-label">Unforgettable</div>
                        <div class="highlight-value">${travel.highlights.unforgettable}</div>
                      </div>
                      <div class="highlight-item">
                        <div class="highlight-label">Discovery</div>
                        <div class="highlight-value">${travel.highlights.discovery}</div>
                      </div>
                      <div class="highlight-item">
                        <div class="highlight-label">Connection</div>
                        <div class="highlight-value">${travel.highlights.connection}</div>
                      </div>
                      <div class="highlight-item">
                        <div class="highlight-label">Challenge</div>
                        <div class="highlight-value">${travel.highlights.challenge}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          `;
          
          listEl.appendChild(travelEl);
        });

        // Trigger fade-in animations
        setTimeout(() => {
          document.querySelectorAll('.fade-up').forEach(el => {
            el.classList.add('visible');
          });
        }, 100);

      } catch (error) {
        listEl.innerHTML = '<div class="error">Unable to load travel memories. Please try again later.</div>';
        console.error('Error rendering travels:', error);
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
      renderTravelList();
      
      // Observe fade-up elements
      document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
      });
    });
