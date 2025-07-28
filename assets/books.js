async function fetchBooks() {
  try {
    const response = await fetch('./assets/booklist.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('✅ Fetched books:', data);
    document.getElementById('book-list').innerText = 'Books loaded successfully!';
  } catch (error) {
    console.error('❌ Error loading books:', error);
    document.getElementById('book-list').innerText = '❌ Failed to load books.';
  }
}

window.addEventListener('load', fetchBooks);
