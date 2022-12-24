'use-strict'

const classArr = [
    'hero_section',
    'header',
    'header_nav',
    'header_nav_mobile-1-close',
    'icon_nav_open'
]
const element = {}

for (const item of classArr) {
    console.log(item);
    element[`${item}El`] = document.querySelector(`.${item}`)
}


function handler(scrollPos) {
    window_scrollY = window.scrollY;
    // console.log(window_scrollY);
    if (window_scrollY) {
        // console.log('thêm');
        element[`headerEl`].classList.add('sticky')
    } else {
        // console.log('xóa');
        element[`headerEl`].classList.remove('sticky')
    }

}

function openCloseNav(params) {
    element[`header_navEl`].classList.toggle('close')
}

document.addEventListener("scroll", handler);
element[`icon_nav_openEl`].addEventListener("click", openCloseNav);
element[`header_nav_mobile-1-closeEl`].addEventListener("click", openCloseNav);