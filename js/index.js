'use-strict'

// const mainEl = document.querySelector('main')
// const hero_sectionEl = document.querySelector('.hero_section')
// const headerEl = document.querySelector('.header')

// const options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: 1
// }
// const handler = (entries) => {
//     console.log(entries)
//     console.log(entries[0].isIntersecting)
//     console.log(entries[0].boundingClientRect.y)
//     // entries is an array of observed dom nodes
//     // we're only interested in the first one at [0]
//     // because that's our .sentinal node.
//     // Here observe whether or not that node is in the viewport
//     if (entries[0].isIntersecting ) {
//         headerEl.classList.remove('sticky')
//         console.log('remove');
//     } else {
//         headerEl.classList.add('sticky')
//         console.log('add');
//     }
// }

// // create the observer
// const observer = new window.IntersectionObserver(handler, options)
// // give the observer some dom nodes to keep an eye on
// observer.observe(hero_sectionEl)


const hero_sectionEl = document.querySelector('.hero_section')
const headerEl = document.querySelector('.header')

function handler(scrollPos) {
    window_scrollY = window.scrollY;
    console.log(window_scrollY);
    if (window_scrollY) {
        // console.log('thêm');
        headerEl.classList.add('sticky')
    } else {
        // console.log('xóa');
        headerEl.classList.remove('sticky')
    }

}

document.addEventListener("scroll", handler);