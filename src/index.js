import './sass/main.scss';
import ApiService from './js/components/api-service';
import galleryTemplate from './templates/gallery.hbs';
import LoadMoreBtn from './js/components/load-more-btn';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  galleryContainer: document.querySelector('.js-gallery-container'),
};

const apiService = new ApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchGallery);

function onSearch(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;

  if (apiService.query === '') {
    return alert(
      "Please enter your request! I don't know what pictures should be shown for you 🤔.",
    );
  }

  loadMoreBtn.show();
  apiService.resetPage();
  clearGalleryContainer();
  fetchGallery();
}

function fetchGallery() {
  loadMoreBtn.disable();
  apiService.fetchGallery().then(gallery => {
    appendGalleryMarkup(gallery);
    loadMoreBtn.enable();
  });
}

function appendGalleryMarkup(gallery) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', galleryTemplate(gallery));
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}
