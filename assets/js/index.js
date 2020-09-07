function refreshData() {
    loadBar.open()
    casesRef.once('value').then(function(snapshot) {
        contentList.innerHTML = "" // Empty the list
        snapshot.forEach(function(it) {
            // const dataList = it.value.toString().slice(1, -1).split(" ")
            const li = document.createElement('li');
            const rippleSpan = document.createElement('span');
            const textSpan = document.createElement('span');
            contentList.appendChild(li)
            const graphicHolder = document.createElement('span');
            const img = document.createElement('img')

            li.setAttribute("class", "mdc-list-item")
            li.append(graphicHolder)
            li.appendChild(rippleSpan)
            li.appendChild(textSpan)
            graphicHolder.setAttribute('class', 'mdc-list-item__graphic')
            graphicHolder.appendChild(img)
            img.setAttribute('class', 'mdc-list-item__graphic listFlag')

            const desiredImgWidth = "116px"
            const imageURL = it.val()[3].replace(
                "23px", desiredImgWidth
            ).replace(
                "15px", desiredImgWidth
            ).replace(
                "20px", desiredImgWidth
            ).replace(
                "21px", desiredImgWidth
            ).replace(
                "22px", desiredImgWidth
            ).replace(
                "14px", desiredImgWidth
            ).replace(
                "18px", desiredImgWidth
            ).replace(
                "19px", desiredImgWidth
            )
            img.setAttribute('src', imageURL);
            img.setAttribute('draggable', 'false');

            rippleSpan.setAttribute("class", "mdc-list-item__ripple");
            textSpan.setAttribute('class', 'mdc-list-item__text textArea');
            const primaryText = document.createElement("span");
            const secText = document.createElement("span");
            textSpan.appendChild(primaryText);
            textSpan.appendChild(secText);

            primaryText.setAttribute('class', "mdc-list-item__primary-text")
            secText.setAttribute('class', "mdc-list-item__secondary-text")
            primaryText.innerHTML = it.key

            const totalCases = it.val()[0]
            if (totalCases === "No data") {
                secText.innerHTML = totalCases
            }
            else {
                secText.innerHTML = totalCases + " cases"
            }

            li.onclick = function() {
                console.log(it.key);
                window.location.href = "details.html?country=" + it.key + "&totalCases=" + it.val()[0]
                    + "&deaths=" + it.val()[1] + '&recoveries=' + it.val()[2] + '&imageURL=' + it.val()[3]
                    + '&learnMoreURL=' + it.val()[4]
            }
        })
        loadBar.close()

        // Open snackbar
        snackbar.timeoutMs = LENGTH_SHORT
        snackbar.labelText = "Updated data"
        snackbar.open()
    });
}

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

// Get a reference to the database service
const casesRef = firebase.database().ref("nush-hackathon");
const contentList = document.querySelector('#contentList')

// Start loading bar
const loadBar = mdc.linearProgress.MDCLinearProgress.attachTo(document.getElementById('loadProgress'));
loadBar.determinate = false;

// Init snackbar
const snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
// Emulate Android snackbar constants
const LENGTH_SHORT = 4000 // Should be 2750 ms but minimum duration is 4000

// Init text box
mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field'));

refreshData()