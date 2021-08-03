import './sass/main.scss';
import PicturesApiService from './js/api-service';
import templatesPictures from './hbs/renderCard.hbs'
import Notiflix from "notiflix"




const refs = {
  searchForm: document.getElementById('search-form'),
  renderGallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more')
}

refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoad)

const picturesApiService = new PicturesApiService()
refs.loadMoreBtn.classList.add('is-hidden')

function onSearch(e) {
  e.preventDefault()

  clearPicturesMarkup()
  if (picturesApiService.query === '') {
    return
  }
  picturesApiService.query = e.currentTarget.elements.searchQuery.value
  picturesApiService.resetPage()



  refs.loadMoreBtn.classList.remove('is-hidden')

  picturesApiService.fetchPictures().then(data => {
    if (data.hits !== []) {
      picturesMarkup(data.hits)
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
    else if (data.totalHits % 40 === 0) {
      refs.loadMoreBtn.classList.add('is-hidden')
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
    }
    else if (data.hits === []) {
      refs.loadMoreBtn.classList.add('is-hidden')
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
  })
}

function onLoad() {
  picturesApiService.fetchPictures().then(data => {
    picturesMarkup(data.hits)
  })
}

function picturesMarkup(collection) {
  refs.renderGallery.insertAdjacentHTML('beforeend', templatesPictures(collection))
}

function clearPicturesMarkup() {
  refs.renderGallery.innerHTML = ''
}