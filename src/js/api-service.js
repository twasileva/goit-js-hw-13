export default class PicturesApiService {
  constructor() {
    this.searchQuery = ''
    this.page = 1
  }

  fetchPictures() {
    console.log(this);

    const BASE_URL = `https://pixabay.com/api/?key=22754587-14ea7ef4a3e62d80c98f18cd3&q=${this.searchQuery}&per_page=40&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true`


    return fetch(BASE_URL).then(r => r.json()).then(data => {
      this.page += 1
      return data.hits
    })
  }

  resetPage() {
    this.page = 1
  }

  set query(newQuery) {
    this.searchQuery = newQuery
  }
}
