import axios from "axios"

export default class PicturesApiService {
  constructor() {
    this.searchQuery = ''
    this.page = 1
  }

  async fetchPictures() {

    const BASE_URL = `https://pixabay.com/api/?key=22754587-14ea7ef4a3e62d80c98f18cd3&q=${this.searchQuery}&per_page=40&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true`

    const response = await axios.get(BASE_URL)
    this.page += 1
    return response.data

  }

  resetPage() {
    this.page = 1
  }

  set query(newQuery) {
    this.searchQuery = newQuery
  }
}
