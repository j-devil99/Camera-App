// Global vars

let width = 500,
    height = 0,
    filter = 'none',
    streaming = false;

//DOM elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');

// Get media stream

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
})
    .then((stream)=>{
        // Link to the video source
        video.srcObject = stream;
        // Play video
        video.play();
    })
    .catch((err)=>{
        console.log(`Error: ${err}`);
    });

// Play when ready

video.addEventListener('canplay', (e)=>{
    if(!streaming){
        // Set video / canvas height
        height = video.videoHeight / (video.videoWidth / width);

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);

        streaming = true;
    }
}, false);

//  photo button event
photoButton.addEventListener('click', (e)=>{
    takePicture();

    e.preventDefault();
}, false);

// filter event
photoFilter.addEventListener('change', (e)=>{
    // Set filter to chosen option
    filter = e.target.value;
    // Set filter to video
    video.style.filter = filter;
    e.preventDefault();
});

// clear event
clearButton.addEventListener('click', (e)=>{
    // clear photos
    photos.innerHTML = '';
    // change filter to normal
    filter = 'none';
    // set video filter
    video.style.filter = filter;
    // reset select list
    photoFilter.selectedIndex = 0;
});

// Take pic from canvas
function takePicture(){
    //  Create canvas
    const context = canvas.getContext('2d');
    if(width && height){
        // set canvas props
        canvas.width = width;
        canvas.height = height;
        // Draw an image of the video on the canvas
        context.drawImage(video, 0, 0, width, height);

        // create an image from canvas
        const imgUrl = canvas.toDataURL('image/png');

        // Create img element
        const img = document.createElement('img');

        // set img src
        img.setAttribute('src', imgUrl);

        // set image filter
        img.style.filter = filter;

        // add image to photos
        photos.appendChild(img);
    }
}