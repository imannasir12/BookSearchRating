import axios from 'axios';

// Base URL for the Open Library API
const API_URL = 'https://openlibrary.org/search.json';

/**
 * Fetch books based on a search query.
 * @param {string} query - The search term.
 * @returns {Promise<Array>} - A promise that resolves to a list of books.
 */
export const searchBooks = async (query) => {
  try {
    const response = await axios.get(`${API_URL}?q=${query}`);
    return response.data.docs; // Return the list of books from the API response
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};
