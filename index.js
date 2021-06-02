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
bodyHeight = root.clientHeight + 17;

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
        'name': 'Kelas Malam',
        'description': `Cerita seram dan horror dari kampus-kampus seperti UI, ITB, BINUS, STAN, dsb. Cerita dihimpun dari berbagai sumber di internet, sehingga kalian dapat menikmatinya langsung dari aplikasi ini.`,
        'role': 'Android Developer',
        'tool': 'Android Studio | Java',
        'dir': 'kelas-malam',
        'assets': [
            '/1.jpg',
            '/2.jpg',
            '/3.jpg',
            '/4.jpg',
        ],
        'type': 'Personal project',
        'status': '<a href="https://play.google.com/store/apps/details?id=com.mandiri.kelasmalam" target="_blank">Google Play</a>',
        'period': 'May 2021'
    },
    {
        'name': 'Common Counter',
        'description': `Count your activities with this app! Count your life! This app provides counting tool which each item has complete attributes: name, count, unit, note, and category.`,
        'role': 'Android Developer',
        'tool': 'Android Studio | Java',
        'dir': 'common-counter',
        'assets': [
            '/1.png',
            '/2.png',
            '/3.png',
            '/4.png',
        ],
        'type': 'Personal project',
        'status': '<a href="https://play.google.com/store/apps/details?id=com.common.commoncounter" target="_blank">Google Play</a>',
        'period': 'February 2021'
    },
    {
        'name': 'BeeFlix',
        'description': "A platform to find information about your favorite movie. This is a project that\'s assigned on Mid Exam of Web Programming (COMP6144).",
        'role': 'Laravel Developer',
        'tool': 'Laravel | MySQL',
        'dir': 'beeflix',
        'assets': [
            '/home.jpg',
            '/movie-detail.jpg',
            '/all-movies.jpg'
        ],
        'type': 'School project',
        'status': 'Private',
        'period': 'November 2020'
    },
    {
        'name': 'Tobaku Mandiri App',
        'description': "An Android app to track items' stock, price, transaction, and more.",
        'role': 'Android Developer',
        'tool': 'Android Studio | Kotlin',
        'dir': 'tobaku-mandiri',
        'assets': [
            '/database.jpg',
            '/database-edit.jpg',
            '/checkout.jpg',
            '/statistics.jpg'
        ],
        'type': 'Personal project',
        'status': 'Private',
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
        'type': 'School project',
        'status': 'Private',
        'period': 'June 2020'
    },
    {
        'name': 'Speak What You Wanna Speak App (prototype)',
        'description': "An Android app that makes it easy to train english-speaking skill and make them more confident to express in english. Users are given questions based on category they selected, and they could answer each question as the app recording, then they can gain insight on how good their pronunciation.",
        'role': 'Android Developer',
        'tool': 'Android Studio | Java',
        'dir': 'swyws',
        'assets': [
            '/home.jpg',
            '/category.jpg',
            '/speak.jpg',
            '/speak-2.jpg'
        ],
        'type': 'School project',
        'status': 'Private',
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
                    <span class="project-type project-attribute">${projectData[i]['type']}</span>
                    <span class="project-status project-attribute">${projectData[i]['status']}</span>
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
        currentImageZoom.setAttribute('src', projectCurrentAssets[i].getAttribute('src'));

        imageZoomContainer.style.animationName = "swipingUp";
        imageZoomContainer.style.animationDuration = '0.2s';
        imageZoomContainer.style.visibility = "visible";

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