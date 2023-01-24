import axios from "axios"
import { Notify } from "notiflix"

const BASE_URL = 'https://pixabay.com/api/'

const formEl = document.querySelector('.search-form')
const inputEl = document.querySelector('input')
const galleryBoxEl = document.querySelector('.gallery')
const loadMoreBtnEl = document.querySelector('.load-more')

let pageCounter = 0;
let intupText =''
let totalNumberOfImages = 0;
loadMoreBtnEl.style.display = 'none'



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
    console.log(dataAfterFetch.data)
        
       
    if (dataAfterFetch.data.hits.length === 0 || intupText === '') {
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
    
    loadMoreBtnEl.style.display = 'block'
    createMarkupHandler(dataAfterFetch)
    return Notify.success(`Hooray! We found ${dataAfterFetch.data.totalHits} images.`)
    } catch (error) {
        galleryBoxEl.innerHTML = 'Ooops something goes wrong!'
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
        //  totalNumberOfImages = dataAfterFetch.data.totalHits
        // console.log(totalNumberOfImages)
     console.log(dataAfterFetch.data.hits.length)
        // console.log(dataAfterFetch.data.hits.length)
        if (dataAfterFetch.data.hits.length < 40) {
            // throw new Error()
             loadMoreBtnEl.style.display = 'none'
         Notify.failure("We're sorry, but you've reached the end of search results.")
            
        }
   else if (dataAfterFetch.data.hits.length === 0 ) {
        
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
    createMarkupHandler(dataAfterFetch)
    // return Notify.success(`Hooray! We found ${dataAfterFetch.data.totalHits} images.`) 
    } catch (error) {
        // loadMoreBtnEl.style.display = 'none'
        //  Notify.failure("We're sorry, but you've reached the end of search results.")
       
   }
}

function createMarkupHandler(data) {
     const markup = data.data.hits.map(item => `<div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" width =200 loading="lazy" />
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
}


formEl.addEventListener('submit', formSubmitHandler)
loadMoreBtnEl.addEventListener('click',addMorePicturesHandler)




