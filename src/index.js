import axios from "axios"
import { Notify } from "notiflix"



const BASE_URL = 'https://pixabay.com/api/'




const formEl = document.querySelector('.search-form')
const inputEl = document.querySelector('input')
const galleryBoxEl = document.querySelector('.gallery')
const loadMoreBtnEl = document.querySelector('.load-more')

let page = 1;
loadMoreBtnEl.style.display = 'none'



async function formSubmitHandler(event) {
    event.preventDefault()
    loadMoreBtnEl.style.display = 'block'
    
const dataAfterFetch = await axios.get(`${BASE_URL}`,{
    params: {
    key: '33055694-6965e9dfecd686cd6e0cc5baf',
    q:inputEl.value.trim(),
    image_type:'photo',
    orientation:'horizontal',
    safesearch: 'true',
    fields: 'downloads',
    page: 1,
    per_page:40
    }
}).then(data => {
    console.log(data.data.hits)
    const markup = data.data.hits.map(item => `<div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
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
})
    
   
}

// async function addMorePicturesHandler() {
//     const getMorePictures = await axios.get()
// }

formEl.addEventListener('submit', formSubmitHandler)
// addMoreBtnEl.addEventListener('click',addMorePicturesHandler)