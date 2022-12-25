// DOM Selectors
const imgContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Unsplash API
let imgCount = 3;
const apiKey = 'BQycqWjgtigHscX39Z8ZogeZe6L04ISMtao4ksEqX94';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imgCount}`;

// Data variables
let photosData = [];
let imagesLoaded = 0;
let totalImages = 0;
let ready = false;

// Helper function to set attributes of an element
function setAttributes(element, attributes) {
    for(var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded == totalImages) {
        ready = true;
        loader.hidden = true;
        imgCount = 20;
        apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imgCount}`;
    }
} 

// to display photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosData.length;
    // Iterating each object in photoData.
    photosData.forEach(photo => {
    
        // creating an anchor element and setting attributes
        const item = document.createElement('a');
        setAttributes(item, {
            'href' : photo.links.html,
            'target':'_blank'
        })
    
        // creating an image element and setting attributes
        const img = document.createElement('img');
        setAttributes(img, {
            'src': photo.urls.regular,
            'alt': photo.alt_description?? 'image',
            'title': photo.alt_description?? 'image'
        })

        // Event listener when each image loading is finished
        img.addEventListener('load', imageLoaded);
    
        // adding img to anchor and anchor to image container
        item.appendChild(img);
        imgContainer.appendChild(item);
    })
}


// Get photoes from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosData = await response.json();
        displayPhotos();
    } catch(error) {
        // Catch error
    }
}

// scroll functionality
window.addEventListener('scroll',() => {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight -1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// on load
getPhotos();