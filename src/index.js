import './sass/main.scss';
import axios from 'axios';
import PicturesApiService from './js/api-service';
import templatesPictures from './hbs/renderCard.hbs'
const refs = {
  searchForm: document.getElementById('search-form'),
  renderGallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more')
}

refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoad)

const picturesApiService = new PicturesApiService()

function onSearch(e) {
  e.preventDefault()

  picturesApiService.query = e.currentTarget.elements.searchQuery.value
  picturesApiService.resetPage()

  picturesApiService.fetchPictures().then(picturesMarkup)


}

function onLoad() {
  picturesApiService.fetchPictures().then(picturesMarkup)
}

function picturesMarkup(hits) {
  refs.renderGallery.insertAdjacentHTML('beforeend', templatesPictures(hits))
}