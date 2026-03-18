const gallery = document.getElementById('arena-gallery');

async function loadPhotos() {
    if (!gallery) {
        return;
    }

    try {
        const response = await fetch('/data/images.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const images = await response.json();

        if (images.length === 0) {
            return;
        }

        images.forEach(renderImage);

    } catch (error) {
        console.error('Error loading images:', error);
        gallery.innerHTML = '<p style="text-align: center; padding: 2rem;">Unable to load images</p>';
    }
}

function renderImage(image) {
    const link = document.createElement('a');
    link.href = `https://www.are.na/block/${image.id}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    const img = document.createElement('img');
    img.src = image.url;
    if (image.url_2x) {
        img.srcset = `${image.url} 1x, ${image.url_2x} 2x`;
    }
    img.alt = image.title || 'Untitled';
    img.loading = 'lazy';

    img.onload = () => img.classList.add('loaded');

    link.appendChild(img);
    gallery.appendChild(link);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPhotos);
} else {
    loadPhotos();
}

// Prevent right-click and dragging on all images
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});
