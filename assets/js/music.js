// Firebase Config params
const firebaseConfig = {
    apiKey: "AIzaSyDq8c-UEecGdpqb6jZ8XjLrqvMoAto8XdE",
    authDomain: "nush-hackathon.firebaseapp.com",
    databaseURL: "https://nush-hackathon.firebaseio.com",
    projectId: "nush-hackathon",
    storageBucket: "nush-hackathon.appspot.com",
    messagingSenderId: "811610869752",
    appId: "1:811610869752:web:595ca797df118cedacd00d",
    measurementId: "G-L2DN3YDYJP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Get a non-default Storage bucket
const storage = firebase.app().storage();
// Create a storage reference from our storage service
const rootRef = storage.ref();

function capitaliseWords(str) {
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}

const songList = document.querySelector('#musicList')

// Start loading bar
const loadBar = mdc.linearProgress.MDCLinearProgress.attachTo(document.getElementById('loadProgress'));
loadBar.determinate = false;

// Init repeat switch
new mdc.switchControl.MDCSwitch(document.querySelector('.mdc-switch'));
const checkbox = document.querySelector('#repeat-toggle');
checkbox.addEventListener('click', () => {
    audio.loop = checkbox.checked;
});

let audio = null;

rootRef.listAll().then(function(res) {
    const divider = document.createElement('li')
    songList.appendChild(divider)
    divider.setAttribute('role', 'separator')
    divider.setAttribute('class', 'mdc-list-divider')

    res.prefixes.forEach(function(folderRef) {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
    });
    res.items.forEach(function(item) {
        // All the items under listRef.
        const songName = capitaliseWords(item.name.replace(/_/gi, " ")).replace(/\.[^/.]+$/, "")

        const li = document.createElement('li')
        songList.appendChild(li)
        li.setAttribute("class", "mdc-list-item low-height")

        const rippleSpan = document.createElement('span');
        li.appendChild(rippleSpan)
        rippleSpan.setAttribute("class", "mdc-list-item__ripple")

        const songSpan = document.createElement('span')
        li.appendChild(songSpan)
        songSpan.setAttribute('class', 'mdc-list-item__text')
        songSpan.innerHTML = songName

        const divider = document.createElement('li')
        songList.appendChild(divider)
        divider.setAttribute('role', 'separator')
        divider.setAttribute('class', 'mdc-list-divider')

        li.onclick = function() {
            item.getDownloadURL().then(function (url) {
                if (audio == null) {
                    audio = new Audio(url.toString());
                    audio.loop = checkbox.checked;
                    checkbox.disabled = false;
                    audio.onended = function() {
                    }
                }
                else {
                    audio.src = url.toString();
                }
                audio.play().then(_ => _);
            })
        }
    });
}).catch(function(error) {
    // Uh-oh, an error occurred!
    console.error(error);
    // Notify user with snackbar
    snackbar.timeoutMs = LENGTH_LONG;
    snackbar.labelText = "Error getting list of music";
    snackbar.open();
});
loadBar.close();

const slider = new mdc.slider.MDCSlider(document.querySelector('.mdc-slider'));
slider.listen('MDCSlider:change', () => {
    if (audio != null) {
        audio.currentTime = slider.value/100.0*audio.duration;
        if (audio.paused) {audio.play()}
    }
});
// Init snackbar
const snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
// Emulate Android snackbar constants
const LENGTH_SHORT = 4000;
const LENGTH_LONG = 6000;

function updateSliderPos() {
    if (audio != null && !audio.paused) {
        slider.disabled = false;
        slider.value = audio.currentTime / audio.duration * 100.0;
    }
    else {
        slider.disabled = true;
    }
}

setInterval(updateSliderPos, 1000)