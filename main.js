// Options
const CLIENT_ID = '985928846489-qqtt8udvm139pp0frv28tlecqso5s0b4.apps.googleusercontent.com';

// Array of API discovery DOC URL for APIs used 
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];

// Authorization scopes  required by the API.  multiple scopes separated by spaces
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
const authorizeButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');
const content = document.getElementById('content')
const channelForm = document.getElementById('channel-form')
const channelInput = document.getElementById('channel-input')
const videoContainer = document.getElementById('video-container')
const defaultChannel = 'techguyweb';


// Load auth2 library
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

// Init API client library and setup sign in listeners

function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(() => {
        // listen for sign-in state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        // handle initial sign in state
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    })

}

// update UI sign in state changes
function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        // login button not show
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        content.style.display = 'block';
        videoContainer.style.display = 'block';
        getChannel(defaultChannel); // interact with the API
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        content.style.display = 'none';
        videoContainer.style.display = 'none';
    }
}

// handle login
function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
}

// handle logout
function handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
}

// get channel from api
function getChannel(channel) {
    // console.log(channel);
    gapi.client.youtube.channels.list({
        part: 'snippet,contentDetails,statistics',
        forUsername: channel
    }).then(response => {
        console.log(response)
    })
        .catch(err => {
            alert('No channel by that name')
            console.log(JSON.stringify(err))
        })
}
