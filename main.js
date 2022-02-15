const input = document.getElementById('input');
const grid = document.querySelector('.grid');
const img = document.querySelectorAll('.img');
const logo = document.querySelector('h2');

input.focus();

input.addEventListener('keydown', function(e){
    if (e.key === 'Enter')
    loadImg();
})

// First page

async function firstPage() {

    const travel = 'https://api.unsplash.com/search/photos?query=travel&per_page=15&client_id=BH6UzPuWwZTKFZ0NN1gG9AOw27NAT3jCTYHTwoxLOs4';
    const result = await fetch(travel);
    const data = await result.json();

    images(data);
}

firstPage();

// Images nodes

const images = (data) => {
    const imageNodes = [];
        for(let i = 0; i < data.results.length; i++){
            imageNodes[i] = document.createElement('div');
            imageNodes[i].className = 'img';
            imageNodes[i].style.backgroundImage = 'url('+data.results[i].urls.raw+')';
            imageNodes[i].addEventListener('click', 
            function () {
                window.open(data.results[i].links.html, '_blank');
            })
            grid.appendChild(imageNodes[i]);
            }
}

// img.forEach(i => i.addEventListener ('click', () => {
//     window.open(i.src, '_blank');
// }));

// Load image from Unsplash

const loadImg = () => {

    removeImg();

    const url = 'https://api.unsplash.com/search/photos?query='+input.value+'&per_page=15&client_id=BH6UzPuWwZTKFZ0NN1gG9AOw27NAT3jCTYHTwoxLOs4';

    fetch(url)

    .then(response => {
        if (response.ok)
            return response.json();
        else 
            alert(response.status)
    })

    .then(data => {
            images(data);
        })
}

const removeImg = () => {
    grid.innerHTML = '';
}

// Reload page

logo.addEventListener('click', () => {
    location.reload();
});

// Day or Night Mode

const dayNightMode = () => {
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 7 && hour <= 19){
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';

    } else {
        document.body.style.backgroundColor = 'rgb(147, 151, 156)';
        
    }
}

window.addEventListener('load', dayNightMode);