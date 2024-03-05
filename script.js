// script.js

function toggleDropdown(elementId) {
    const dropdown = document.getElementById(elementId);
    const expanded = dropdown.getAttribute('aria-expanded') === 'true' || false;
    dropdown.setAttribute('aria-expanded', !expanded);
    dropdown.setAttribute('aria-hidden', expanded);
}

function fetchHTMLContent(url) {
    return fetch(url)
        .then(response => response.text())
        .then(html => new DOMParser().parseFromString(html, 'text/html'))
        .catch(error => console.error('Error fetching HTML content:', error));
}

function extractImages(doc, imageSelector) {
    const images = [];
    const imageContainers = doc.querySelectorAll(imageSelector);
    imageContainers.forEach(container => {
        const img = container.querySelector('img');
        const imageUrl = img.getAttribute('src');
        const altText = img.getAttribute('alt');
        images.push({ url: imageUrl, alt: altText });
    });
    return images;
}

function populateCards(images, cardSelector, imageContainerSelector, textContainerSelector) {
    const gallery = document.querySelector('.gallery');
    images.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add(cardSelector);
        card.dataset.student = image.alt;
        card.tabIndex = -1;

        const imageContainer = document.createElement('div');
        imageContainer.classList.add(imageContainerSelector);
        const cardImage = document.createElement('img');
        cardImage.src = image.url;
        cardImage.alt = '';
        imageContainer.appendChild(cardImage);

        const textContainer = document.createElement('div');
        textContainer.classList.add(textContainerSelector);
        const cardText = document.createElement('p');
        cardText.textContent = image.alt;
        textContainer.appendChild(cardText);

        card.appendChild(imageContainer);
        card.appendChild(textContainer);
        gallery.appendChild(card);

        card.setAttribute('tabindex', '-1');
        card.setAttribute('role', 'button');
        card.addEventListener('click', handleCardClick);
        card.addEventListener('keydown', handleCardKeyPress);
    });
}

function handleCardClick() {
    const student = this.dataset.student;
    filterArticles(student);

    const cards = document.querySelectorAll('.card');
    cards.forEach(otherCard => {
        otherCard.classList.remove('selected');
    });

    this.classList.add('selected');
}

function handleCardKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        this.click();
    }
}

function filterArticles(student) {
    const articles = document.querySelectorAll('.article');
    articles.forEach(article => {
        const articleStudent = article.dataset.student;
        if (articleStudent.includes(student)) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const cardStudent = card.dataset.student;
        if (cardStudent.includes(student)) {
            card.classList.remove('unselected');
        } else {
            card.classList.remove('selected');
            card.classList.add('unselected');
        }
    });
}

function showAllArticles() {
    const articles = document.querySelectorAll('.article');
    articles.forEach(article => {
        article.style.display = 'block';
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('selected');
        card.classList.remove('unselected');
    });
}

function generateAttributes() {
    const dropdownUrl = document.getElementById('dropdown-url').value;
    const articleUrl = document.getElementById('article-url').value;
    const imageSelector = document.getElementById('image-selector').value;

    const scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', `script.js?dropdownUrl=${encodeURIComponent(dropdownUrl)}&articleUrl=${encodeURIComponent(articleUrl)}&imageSelector=${encodeURIComponent(imageSelector)}`);
    document.body.appendChild(scriptElement);
}

document.addEventListener('DOMContentLoaded', () => {
    const dropdownId = 'journalists';
    const articleContainerSelector = '.articles';
    const cardSelector = 'card';
    const imageContainerSelector = 'image-container';
    const textContainerSelector = 'text-container';

    const dropdownUrl = ''; // Placeholder for dropdown URL
    const articleUrl = ''; // Placeholder for article URL
    const imageSelector = ''; // Placeholder for image selector

    fetchHTMLContent(dropdownUrl)
        .then(dropdownDoc => {
            // Populate dropdown
            // Code to populate dropdown goes here
        });

    fetchHTMLContent(articleUrl)
        .then(articleDoc => {
            const images = extractImages(articleDoc, imageSelector);
            populateCards(images, cardSelector, imageContainerSelector, textContainerSelector);
        });
});
