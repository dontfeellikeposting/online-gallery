const CONFIG = {
    channelSlug: 'feed-2pl7kppxxkq',
    perPage: 50,
    direction: 'desc'
};

const gallery = document.getElementById('arena-gallery');

async function fetchArenaPhotos() {
    if (!gallery) {
        console.error('Gallery element not found');
        return;
    }

    const apiUrl = `https://api.are.na/v2/channels/${CONFIG.channelSlug}/contents?per=${CONFIG.perPage}&direction=${CONFIG.direction}`;

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const images = data.contents.filter(block => block.class === 'Image' && block.image);

        if (images.length === 0) {
            console.warn('No images found in channel');
            return;
        }

        images.forEach(renderImage);

    } catch (error) {
        console.error('Error fetching Are.na data:', error);
        gallery.innerHTML = '<p style="text-align: center; padding: 2rem;">Unable to load images</p>';
    }
}

function renderImage(block) {
    const link = document.createElement('a');
    link.href = `https://www.are.na/block/${block.id}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    const img = document.createElement('img');
    img.src = block.image.display.url;
    img.alt = block.title || 'Untitled';
    img.loading = 'lazy';
    
    img.onload = () => img.classList.add('loaded');

    link.appendChild(img);
    gallery.appendChild(link);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchArenaPhotos);
} else {
    fetchArenaPhotos();
}
