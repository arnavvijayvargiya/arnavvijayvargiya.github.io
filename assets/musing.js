const musings = [
      {
        "date": "30 Jul 2025",
        "text": "Watched someone parallel park for 8 minutes straight. At what point do you give up and walk? Asking for Jaipur's traffic situation.",
        "source": "x.com",
        "sourceUrl": "https://x.com",
        "meta": "3 likes, 0 sanity left",
        "type": "regular"
      },
      {
        "date": "29 Jul 2025",
        "text": "The fact that I can code for 6 hours straight but can't fold laundry for 10 minutes says something profound about human nature. Or my priorities. Probably my priorities.",
        "source": "x.com",
        "sourceUrl": "https://x.com",
        "meta": "12 likes, 2 retweets, 1 existential crisis",
        "type": "tweet"
      },
      {
        "date": "28 Jul 2025",
        "text": "<span class='highlight-text'>Productivity tip</span>: Replace \"I don't have time\" with \"It's not a priority.\" Watch how quickly your excuses become honest conversations with yourself.",
        "source": "Random thought while procrastinating",
        "sourceUrl": null,
        "meta": "Permissions: 0 out of 10",
        "type": "random"
      },
      {
        "date": "27 Jul 2025",
        "text": "There's something deeply satisfying about deleting code that doesn't work instead of commenting it out \"just in case.\" It's like digital Marie Kondo.",
        "source": "x.com",
        "sourceUrl": "https://x.com",
        "meta": "8 likes, several developers having flashbacks",
        "type": "random"
      },
      {
        "date": "26 Jul 2025",
        "text": "Jaipur summer logic: It's too hot to go outside, but somehow perfect weather for ordering food that requires the delivery person to venture into the same heat. The cognitive dissonance is real.",
        "source": "WhatsApp status",
        "sourceUrl": null,
        "meta": "Guilt level: Maximum",
        "type": "regular"
      },
      {
        "date": "25 Jul 2025",
        "text": "My morning routine: Wake up <span class='emoji'>→</span> Check weather <span class='emoji'>→</span> Question life choices <span class='emoji'>→</span> Make chai <span class='emoji'>→</span> Suddenly everything seems manageable.<br><br>Chai is basically liquid optimism.",
        "source": "x.com",
        "sourceUrl": "https://x.com",
        "meta": "23 likes, 5 retweets, 1 chai vendor following me now",
        "type": "tweet"
      },
      {
        "date": "24 Jul 2025",
        "text": "Walking without destination taught me more about myself than any self-help book. Sometimes the best discoveries happen when you're not looking for them.",
        "source": "Voice note to self",
        "sourceUrl": null,
        "meta": "Recorded while lost, obviously",
        "type": "regular"
      },
      {
        "date": "23 Jul 2025",
        "text": "The amount of energy I spend avoiding a 5-minute task could probably power a small village. Yet here I am, writing about avoiding instead of just doing it.",
        "source": "x.com",
        "sourceUrl": "https://x.com",
        "meta": "47 likes, everyone relating too hard",
        "type": "random"
      },
      {
        "date": "22 Jul 2025",
        "text": "Debugging is basically being a detective in a crime movie where you are also the murderer. Plot twist: you don't remember committing the crime.",
        "source": "x.com",
        "sourceUrl": "https://x.com",
        "meta": "156 likes, 34 retweets, 1 therapy session booked",
        "type": "tweet"
      },
      {
        "date": "21 Jul 2025",
        "text": "That moment when you realize the <span class='highlight-text'>solution</span> you've been searching for was in the first Stack Overflow answer you ignored because it looked too simple.",
        "source": "Slack message to team",
        "sourceUrl": null,
        "meta": "3 facepalm reactions",
        "type": "random"
      }
    ];

    function getTypeClass(type) {
      switch(type) {
        case 'tweet': return 'tweet-style';
        case 'random': return 'random-thought';
        default: return '';
      }
    }

    function getItalicClass(type) {
      return type === 'random' ? 'italic' : '';
    }

    function renderMusingList() {
      const listEl = document.getElementById("musing-list");
      
      // Show loading state
      listEl.innerHTML = '<div class="loading">Collecting scattered thoughts...</div>';

      try {
        // Clear loading state
        listEl.innerHTML = '';

        // Sort musings by date (most recent first)
        musings.sort((a, b) => new Date(b.date) - new Date(a.date));

        musings.forEach((musing, index) => {
          const musingEl = document.createElement("div");
          musingEl.className = `musing-item fade-up ${getTypeClass(musing.type)}`;
          musingEl.style.animationDelay = `${index * 0.05}s`;
          
          const sourceLink = musing.sourceUrl 
            ? `<a href="${musing.sourceUrl}" target="_blank">${musing.source}</a>`
            : musing.source;
          
          musingEl.innerHTML = `
            <div class="musing-header">
              <div class="musing-date">${musing.date}</div>
              <div class="musing-source">${sourceLink}</div>
            </div>
            <div class="musing-text ${getItalicClass(musing.type)}">${musing.text}</div>
            <div class="musing-meta">${musing.meta}</div>
          `;
          
          listEl.appendChild(musingEl);
        });

        // Trigger fade-in animations
        setTimeout(() => {
          document.querySelectorAll('.fade-up').forEach(el => {
            el.classList.add('visible');
          });
        }, 100);

      } catch (error) {
        listEl.innerHTML = '<div class="error">Unable to load digital fragments. Please try again later.</div>';
        console.error('Error rendering musings:', error);
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
      renderMusingList();
      
      // Observe fade-up elements
      document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
      });
    });    
