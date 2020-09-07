function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function learnMore() {
    document.location.href = getParameterByName('learnMoreURL')
}

const countryTxt = 'Cases in ' + getParameterByName("country");
document.querySelector('#title').innerHTML = countryTxt;
document.title = countryTxt;

// Image updating code
const desiredImgWidth = '232px'
document.querySelector('#flagImg').src = getParameterByName('imageURL').replace(
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

// Data updating code
document.querySelector('#countryName').innerHTML = getParameterByName("country");
document.querySelector('#totalCases').innerHTML = 'Total cases: ' + getParameterByName("totalCases");
document.querySelector('#recoveries').innerHTML = 'Recoveries: ' + getParameterByName("recoveries");
document.querySelector('#deaths').innerHTML = 'Deaths: ' + getParameterByName("deaths");

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