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

async function onSearch(e) {
  e.preventDefault()
  clearPicturesMarkup()
  picturesApiService.resetPage()
  picturesApiService.query = e.currentTarget.elements.searchQuery.value
  window.scrollBy(0, 0);
  try {
    const result = await picturesApiService.fetchPictures();

    if (picturesApiService.query === '' || result.hits.length === 0) {
      clearPicturesMarkup();
      refs.loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
      refs.loadMoreBtn.classList.remove('is-hidden');
      Notiflix.Notify.success(`"Hooray! We found ${result.totalHits} images."`);
      picturesMarkup(result.hits);
    }
  } catch (error) {
    console.log(error);
  }
}

async function onLoad() {

  try {
    const result = await picturesApiService.fetchPictures();
    picturesMarkup(result.hits);

    const lenghtHits = refs.renderGallery.querySelectorAll('.photo-card').length

    if (lenghtHits >= result.totalHits) {
      Notiflix.Notify.failure('"We are sorry, but you have reached the end of search results."');
      refs.loadMoreBtn.classList.add('is-hidden');
    }

    const { height: cardHeight } = refs.renderGallery
      .firstElementChild.getBoundingClientRect();


    refs.renderGallery.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });



  }
  catch (error) {
    console.log(error)
  }
}

function picturesMarkup(collection) {
  refs.renderGallery.insertAdjacentHTML('beforeend', templatesPictures(collection))
}

function clearPicturesMarkup() {
  refs.renderGallery.innerHTML = ''
}