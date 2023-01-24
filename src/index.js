import axios from "axios"
import { Notify } from "notiflix"
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const BASE_URL = 'https://pixabay.com/api/'

const formEl = document.querySelector('.search-form')
const inputEl = document.querySelector('input')
const galleryBoxEl = document.querySelector('.gallery')
const loadMoreBtnEl = document.querySelector('.load-more')

let pageCounter = 0;
let intupText =''
loadMoreBtnEl.style.display = 'none'
const lightbox = new SimpleLightbox('.gallery a', {captionsData :'Alt',captionDelay:300 });



async function formSubmitHandler(event) {
    event.preventDefault()

    intupText = inputEl.value.trim()
    pageCounter += 1
    galleryBoxEl.innerHTML = ''
    
    try {
const dataAfterFetch = await axios.get(`${BASE_URL}`,{
    params: {
    key: '33055694-6965e9dfecd686cd6e0cc5baf',
    image_type:'photo',
    orientation:'horizontal',
    safesearch: 'true',
    fields: 'downloads',
    q:intupText,
    page: pageCounter,
    per_page:40
    }
})
       
    if (dataAfterFetch.data.hits.length === 0 || intupText === '') {
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
    // console.log(dataAfterFetch.data.hits)
    loadMoreBtnEl.style.display = 'block'
    createMarkupHandler(dataAfterFetch)
    return Notify.success(`Hooray! We found ${dataAfterFetch.data.totalHits} images.`)
    } catch (error) {
        Notify.error('Ooops something goes wrong!')
}
 
}

async function addMorePicturesHandler() {
    try {
        if (intupText === '') {
        return Notify.failure("COME ON!Nothing to load!Type some text,pls")
    } 
    pageCounter+=1
    const dataAfterFetch = await axios.get(`${BASE_URL}`,{
    params: {
    key: '33055694-6965e9dfecd686cd6e0cc5baf',
    image_type:'photo',
    orientation:'horizontal',
    safesearch: 'true',
    fields: 'downloads',
    per_page: 40,
    q: intupText,
    page: pageCounter,
    }
    })
      
        if (dataAfterFetch.data.hits.length < 40) {
             loadMoreBtnEl.style.display = 'none'
         Notify.failure("We're sorry, but you've reached the end of search results.")
            
        }
   else if (dataAfterFetch.data.hits.length === 0 ) {
        
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
    createMarkupHandler(dataAfterFetch)
    
    } catch (error) {
       Notify.failure('oooPs something goes wrong')
   }
}

function createMarkupHandler(data) {
    const markup = data.data.hits.map(item => `<div class="photo-card">
    <a class="gallery__item" href="${item.largeImageURL}">
     <img src="${item.webformatURL}" alt="${item.tags}" width =250 height= 200 loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes:${item.likes}</b>
    </p>
    <p class="info-item">
      <b>Views:${item.views}</b>
    </p>
    <p class="info-item">
      <b>Comments:${item.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:${item.downloads}</b>
    </p>
  </div>
</div>`).join('')

    galleryBoxEl.insertAdjacentHTML('beforeend', markup)
    lightbox.refresh()
}


formEl.addEventListener('submit', formSubmitHandler)
loadMoreBtnEl.addEventListener('click',addMorePicturesHandler)




