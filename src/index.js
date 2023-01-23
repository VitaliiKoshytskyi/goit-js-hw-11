import axios from "axios"
import { Notify } from "notiflix"



const BASE_URL = 'https://pixabay.com/api/'




const formEl = document.querySelector('.search-form')
const inputEl = document.querySelector('input')




// function getFetch(textInputByUser) {
//     return fetch(`https://pixabay.com/api/?key=33055694-6965e9dfecd686cd6e0cc5baf&q=${textInputByUser}&image_type=photo&orientation=horizontal&safesearch=true&fields=downloads`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.statusText)
//             }
//             return response.json()
//         })
// }
// getFetch('avia').then(data =>console.log(data.hits))
// 'https://pixabay.com/api/?key=33055694-6965e9dfecd686cd6e0cc5baf&q=yellow+flowers&image_type=photo'


function formSubmitHandler(event) {
    event.preventDefault()
    
axios.get(`${BASE_URL}`,{
    params:{key:'33055694-6965e9dfecd686cd6e0cc5baf',
    q:inputEl.value,
    image_type:'photo',
    orientation:'horizontal',
    safesearch: 'true',
    fields:'downloads'
    }
}).then(data => console.log(data))
}


formEl.addEventListener('submit',formSubmitHandler)