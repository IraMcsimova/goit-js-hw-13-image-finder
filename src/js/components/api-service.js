const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '24094729-40494b3b20c5a86709cacee96';
const options = {
  headers: {
    Authorization: API_KEY,
  },
};

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchGallery() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
