const loaderWrapper = document.querySelector('.loader-wrapper');

async function fetchClubs() {
    try {
        const response = await fetch('https://clubandevent.onrender.com/api/v1/club');
        const clubs = await response.json();
        console.log('Clubs:', clubs);
        displayClubs(clubs);
    } catch (error) {
        console.error('Error fetching clubs:', error);
    } finally {
        loaderWrapper.style.display = 'none'; // Hide loader
    }
}

const obj = {
    'Samarth': '../img/images (3).jpeg',
    'Geekonix': '../img/geekonix.png',
    'IIC': '../img/IIC.jpg',
    'Eclectica': '../img/eclectica.jpeg'
};

function displayClubs(response) {
    const clubListDiv = document.getElementById('card-container');
    clubListDiv.innerHTML = ''; // Clear previous content

    if (!response.success) {
        console.error('Error: Failed to fetch clubs. Message:', response.message);
        return;
    }

    const clubs = response.data;

    if (!Array.isArray(clubs)) {
        console.error('Error: Expected an array of clubs, but received:', clubs);
        return;
    }

    clubs.forEach((club, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        const topDiv = document.createElement('div');
        topDiv.classList.add('top');

        const clubNameDiv = document.createElement('div');
        clubNameDiv.classList.add('club-name');
        clubNameDiv.textContent = club.name;

        const instagramIcon = document.createElement('i');
        instagramIcon.classList.add('ri-instagram-line');

        topDiv.appendChild(clubNameDiv);
        topDiv.appendChild(instagramIcon);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');

        const leftDiv = document.createElement('div');
        leftDiv.classList.add('left');

        const modeDiv = document.createElement('div');
        modeDiv.classList.add('mode');

        const modeHeader = document.createElement('h5');
        modeHeader.textContent = club.mode;

        modeDiv.appendChild(modeHeader);
        leftDiv.appendChild(modeDiv);

        const rightDiv = document.createElement('div');
        rightDiv.classList.add('right');

        // Inside the forEach loop in the displayClubs function

        for (let i = 1; i <= 3; i++) {
            const imgDiv = document.createElement('div');
            imgDiv.classList.add(`img${i}`);

            const img = document.createElement('img');
            img.src = `img/img${i}.avif`; // Replace with actual image path
            img.alt = ''; // Add appropriate alt text

            imgDiv.appendChild(img);
            rightDiv.appendChild(imgDiv);
        }


        const participantDiv = document.createElement('div');
        participantDiv.classList.add('numpart');
        participantDiv.textContent = `+${club.participants} Participants`;

        rightDiv.appendChild(participantDiv);

        contentDiv.appendChild(leftDiv);
        contentDiv.appendChild(rightDiv);

        const bottomDiv = document.createElement('div');
        bottomDiv.classList.add('bottom');

        const clubImgDiv = document.createElement('div');
        clubImgDiv.classList.add('club_img');

        const clubImg = document.createElement('img');
        clubImg.src = obj[club.name]; // Use the image URL from the obj
        clubImg.alt = ''; // Add appropriate alt text

        clubImgDiv.appendChild(clubImg);

        const joinButton = document.createElement('button');
        joinButton.classList.add('btn_join');
        joinButton.textContent = 'Join Now';

        bottomDiv.appendChild(clubImgDiv);
        bottomDiv.appendChild(joinButton);

        cardDiv.appendChild(topDiv);
        cardDiv.appendChild(contentDiv);
        cardDiv.appendChild(bottomDiv);

        clubListDiv.appendChild(cardDiv);
    });
}

window.onload = fetchClubs;
