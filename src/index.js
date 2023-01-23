import axios from "axios"
import { Notify } from "notiflix"

const BASE_URL = 'https://pixabay.com/api/'


const formEl = document.querySelector('.search-form')
const inputEl = document.querySelector('input')
const galleryBoxEl = document.querySelector('.gallery')
const loadMoreBtnEl = document.querySelector('.load-more')

let pageCounter = 0;
let intupText =''
loadMoreBtnEl.style.display = 'none'



async function formSubmitHandler(event) {
    event.preventDefault()
    intupText = inputEl.value.trim()
    pageCounter+=1
    

const dataAfterFetch = await axios.get(`${BASE_URL}`,{
    params: {
    key: '33055694-6965e9dfecd686cd6e0cc5baf',
    q:intupText,
    image_type:'photo',
    orientation:'horizontal',
    safesearch: 'true',
    fields: 'downloads',
    page: pageCounter,
    per_page:40
    }
}).then(data => {
    if (data.data.hits.length === 0) {
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
    console.log(data.data.hits)
    loadMoreBtnEl.style.display = 'block'
    Notify.success(`Hooray! We found ${data.data.totalHits} images.`)
    createMarkupHandlerSearch(data)
    
})

}

async function addMorePicturesHandler() {
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
}).then(data => {
    if (data.data.hits.length === 0 ) {
        
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
    console.log(data.data.hits)
    // loadMoreBtnEl.style.display = 'block'
    Notify.success(`Hooray! We found ${data.data.totalHits} images.`)
    createMarkupHandlerLoadMore(data)

    
})
    
}

formEl.addEventListener('submit', formSubmitHandler)
loadMoreBtnEl.addEventListener('click',addMorePicturesHandler)



function createMarkupHandlerLoadMore(data) {
     const markup = data.data.hits.map(item => `<div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" width =100 loading="lazy" />
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
// galleryBoxEl.innerHTML = markup
    galleryBoxEl.insertAdjacentHTML('beforeend', markup)
}

function createMarkupHandlerSearch(data) {
     const markup = data.data.hits.map(item => `<div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" width =100 loading="lazy" />
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
galleryBoxEl.innerHTML = markup
    // galleryBoxEl.insertAdjacentHTML('beforeend', markup)
}




























//     const markup = data.data.hits.map(item => `<div class="photo-card">
//   <img src="${item.webformatURL}" alt="${item.tags}" width =100 loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes:${item.likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views:${item.views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments:${item.comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads:${item.downloads}</b>
//     </p>
//   </div>
// </div>`).join('')

//     galleryBoxEl.insertAdjacentHTML('beforeend', markup)