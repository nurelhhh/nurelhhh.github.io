const root = document.documentElement;
const layout = document.getElementById('layout');
const imageZoomContainer = document.getElementById('image-zoom-container');

/////////////////////////////////////
// let documentWidth = document.getElementById('document-width');
let bodyWidth;
let bodyHeight;
const scrollbarWidth = 17;

const currentImageZoom = document.getElementById('image-zoom-current');
let currentImageZoomWidth;
let currentImageZoomHeight;

setLayoutWidth();

window.addEventListener('resize', () => {
    setLayoutWidth();
});

/////////////////////////////////////




/////////////////////////////////////
imageZoomContainer.onclick = () => {
    imageZoomContainer.style.visibility = "collapse";
    imageZoomContainer.style.animationName = 'none';
}

function setImageZoomContainer() {

    imageZoomContainer.style.width = (1 * (bodyWidth - scrollbarWidth)) + 'px';
    imageZoomContainer.style.height = (1 * (bodyHeight)) + 'px';
    
}

/////////////////////////////////////




/////////////////////////////////////
const projectListDiv = document.getElementById('project-list');
const projectAssetRoot = './projects/';

const projectData = [
    {
        'name': 'Tobaku Mandiri App',
        'description': "An Android app to track items' stock, price, transaction, and more.",
        'role': 'Back-end | Front-end | Designer',
        'tool': 'Android Studio | Kotlin',
        'dir': 'tobaku-mandiri',
        'assets': [
            '/database.jpg',
            '/database-edit.jpg',
            '/checkout.jpg',
            '/statistics.jpg'
        ],
        'period': 'August 2020'
    },
    {
        'name': 'Sentiment Analysis on "Kuliah Online"',
        'description': "Finding out what are Indonesian college-students' sentiment on online class during pandemic.",
        'role': 'Data Team | Front-end',
        'tool': 'Python | Twitter Dev API | Pandas | HTML | CSS | Javascript',
        'dir': 'sentiment-kulon',
        'assets': [
            '/kulon-web.png'
        ],
        'period': 'June 2020'
    },
    {
        'name': 'Binusmaya Notification Center (prototype)',
        'description': "A prototype built for Human-computer Interaction course. We knew there're some improvements that can be done with Binusmaya Notification Center.",
        'role': 'Front-end',
        'tool': 'HTML | CSS | Javascript',
        'dir': 'bimay-notif',
        'assets': [
            '/notif-1.png',
            '/notif-2.png',
            '/notif-3.png',
        ],
        'period': 'June 2020'
    },
    {
        'name': 'Art Company Website (prototype)',
        'description': "This project is assigned in Human-computer Interaction course and we're asked to build a company website.",
        'role': 'Front-end team',
        'tool': 'HTML | CSS | Javascript',
        'dir': 'art-web',
        'assets': [
            '/art-web-1.png',
            '/art-web-2.png',
            '/art-web-3.png',
            '/art-web-4.png'
        ],
        'period': 'May 2020'
    },
    {
        'name': 'Sunib Nyari Website (prototype)',
        'description': "Sunib Nyari is a platform that provides tasks, assignments, and projects reference of former or current Binusian so the active Binusian can gain inspiration to build one for their college-work.",
        'role': 'Front-end team',
        'tool': 'HTML | CSS | Javascript',
        'dir': 'sunib-nyari',
        'assets': [
            '/home.png',
            '/course-page.png',
            '/user-page.png',
            '/contact-page.png'
        ],
        'period': 'May 2020'
    },
    {
        'name': 'Speak What You Wanna Speak App (prototype)',
        'description': "An Android app that makes it easy to train english-speaking skill and make them more confident to express in english. Users are given questions based on category they selected, and they could answer each question as the app recording, then they can gain insight on how good their pronunciation.",
        'role': 'Back-end | Front-end',
        'tool': 'Android Studio | Java',
        'dir': 'swyws',
        'assets': [
            '/home.jpg',
            '/category.jpg',
            '/speak.jpg',
            '/speak-2.jpg'
        ],
        'period': 'May 2019'
    }
];

for (let i=0; i<projectData.length; i++) {
    projectListDiv.innerHTML += `
        <div class="project">
            <span class="project-name project-attribute">${projectData[i]['name']}</span>
            <div class="project-detail-container">
                <div class="project-image-corousel-container">
                    <div class="project-image-corousel">
                        <img class="current-project-asset">
                    </div>
                    <div class="project-image-preview"></div>
                </div>
                <div class="project-detail">
                    <span class="project-description project-attribute">${projectData[i]['description']}</span>
                    <span class="project-role project-attribute">${projectData[i]['role']}</span>
                    <span class="project-tool project-attribute">${projectData[i]['tool']}</span>
                    <span class="project-period project-attribute">${projectData[i]['period']}</span>
                </div>
            </div>
        </div>
    `;
}

const projectImagePreview = document.getElementsByClassName('project-image-preview');
const projectCurrentAssets = document.getElementsByClassName('current-project-asset');

let corouselInnerHTML = '';
let currentProjectImagePreview;

for (let i=0; i<projectData.length; i++) {
    corouselInnerHTML = '';

    for (let j=0; j<projectData[i]['assets'].length; j++) {
        corouselInnerHTML += `<img class="project-asset-preview" src="${projectAssetRoot + projectData[i]['dir'] + projectData[i]['assets'][j]}" alt="project-${i+1}-asset">`;
    }

    projectCurrentAssets[i].setAttribute('src', projectAssetRoot + projectData[i]['dir'] + projectData[i]['assets'][0]);

    projectCurrentAssets[i].onclick = () => {

        // swipeUpAnim();
        imageZoomContainer.style.animationName = "swipingUp";
        imageZoomContainer.style.animationDuration = '0.2s';
        imageZoomContainer.style.visibility = "visible";
        

        currentImageZoom.setAttribute('src', projectCurrentAssets[i].getAttribute('src'));

        setCurrentImageZoom();
        
    };

    projectImagePreview[i].innerHTML = corouselInnerHTML;

    currentProjectImagePreview = projectImagePreview[i].childNodes;
    for (let j=0; j<currentProjectImagePreview.length; j++) {
        currentProjectImagePreview[j].onclick = () => {
            projectCurrentAssets[i].setAttribute('src', projectAssetRoot + projectData[i]['dir'] + projectData[i]['assets'][j]);
        };
    }
}



function setCurrentImageZoom() {


    currentImageZoom.style.width = 'unset';
    currentImageZoom.style.height = 'unset';
    
    currentImageZoomWidth = currentImageZoom.clientWidth;
    currentImageZoomHeight = currentImageZoom.clientHeight;
    
    if (currentImageZoomWidth > currentImageZoomHeight) {
        if (bodyWidth > bodyHeight) {
            currentImageZoom.style.height = (bodyHeight - 32) + 'px';
        } else {
            currentImageZoom.style.width = (bodyWidth-32-scrollbarWidth) + 'px';
        }
    } else {
        currentImageZoom.style.height = (bodyHeight - 32) + 'px';
    }
}

/////////////////////////////////////

function setLayoutWidth() {
    bodyWidth = root.clientWidth;
    bodyHeight = root.clientHeight;

    // documentWidth.innerHTML = bodyWidth;
    if (bodyWidth > 1032 + scrollbarWidth) {
        layout.style.width = 1000 + 'px';
    } else {
        layout.style.width = (bodyWidth - 32 - scrollbarWidth) + 'px';
    }

    setImageZoomContainer();
    setCurrentImageZoom();
}