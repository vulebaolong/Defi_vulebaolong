"use-strict"

const headerEl = document.getElementsByClassName("header")[0]
const headerHeight = document.getElementsByClassName("header")[0].height
const heroSectionEl = document.getElementsByClassName("hero_section")[0]
const backToTopEl = document.getElementsByClassName("backToTop")[0]
const heroHeightSectionEl = heroSectionEl.getBoundingClientRect().height

//scroll Header
const obsCallBack = function (entries, observer) {
    const [entry] = entries
    const isAction = entry.isIntersecting
    if (!isAction) {
        headerEl.classList.add("sticky")
        backToTopEl.classList.add("showbtt")
    } else {
        headerEl.style.transform = ` translateY(-100%) `
        setTimeout(() => {
            headerEl.classList.remove("sticky")
            headerEl.style.transform = ` translateY(0) `
        }, 300)
        backToTopEl.classList.remove("showbtt")
    }
}
const obsOption = {
    root: null,
    threshold: 1,
    rootMargin: `${+heroHeightSectionEl / 2}px`,
}
const headerElObserver = new IntersectionObserver(obsCallBack, obsOption)
headerElObserver.observe(heroSectionEl)

const header_navEl = document.getElementsByClassName("header_nav")[0]
const header_nav_mobileEl = document.getElementsByClassName(
    "header_nav_mobile-1-close"
)[0]

// scroll to
// ======================================================
const scroll = function (element, headerHeight) {
    const coords = element.getBoundingClientRect()
    window.scroll({
        left: coords.left + window.scrollX,
        top: coords.top + window.scrollY - headerHeight,
        behavior: "smooth",
    })
}

headerEl.addEventListener("click", function (e) {
    if ([...e.target.classList].includes("header_nav-list-item-text")) {
        e.preventDefault()
        if (e.target.hash === "") return
        const element = document.querySelector(e.target.hash)
        const headerHeight = headerEl.offsetHeight
        scroll(element, headerHeight)
        header_nav_mobileEl.click()
    }

    if (
        [...e.target.classList].includes("icon_nav_open") ||
        [...e.target.classList].includes("header_nav_mobile-1-close")
    ) {
        header_navEl.classList.toggle("open")
    }
})

//slider
const slides = document.querySelectorAll(".slide")
const btnNext = document.querySelector(".slide-next")
const btnPrev = document.querySelector(".slide-prev")
const dotContainer = document.getElementsByClassName("slide-dots")[0]
const slides_box = document.querySelector(".slides_box")

const activateDot = function (slide) {
    document
        .querySelectorAll(".slide-dots__dot")
        .forEach((dot) => dot.classList.remove("slide-dots__dot--active"))

    document
        .querySelector(`.slide-dots__dot[data-slide="${slide}"]`)
        .classList.add("slide-dots__dot--active")
}

const createDots = function () {
    slides.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML(
            "beforeend",
            `<button class="slide-dots__dot" data-slide="${i}"></button>`
        )
    })
}

let slideCount = 0
const maxSlide = slides.length - 1

const goToSlide = function (slide) {
    slides.forEach((e, i) => {
        e.style.transform = `translateX(${115 * (i - slide)}%)`
    })
}
const init = function () {
    goToSlide(0)
    createDots()
    activateDot(0)
}
init()

const nestSlide = function () {
    if (slideCount === maxSlide) {
        // console.log("chuyển về đầu")
        slideCount = 0
    } else {
        // console.log("tiến tới")
        slideCount++
    }
    // console.log(slideCount, maxSlide)
    goToSlide(slideCount)
    activateDot(slideCount)
}
const prevSlide = function () {
    if (slideCount === 0) {
        // console.log("di chuyển đến cuối")
        slideCount = maxSlide
    } else {
        // console.log("lùi lại")
        slideCount--
    }
    // console.log(slideCount, maxSlide)
    goToSlide(slideCount)
    activateDot(slideCount)
}

btnNext.addEventListener("click", nestSlide)
btnPrev.addEventListener("click", prevSlide)
document.addEventListener("keydown", function (e) {
    e.key === "ArrowLeft" && prevSlide()
    e.key === "ArrowRight" && nestSlide()
})

dotContainer.addEventListener("click", function (e) {
    const isDots__dot = [...e.target.classList].includes("slide-dots__dot")
    const isDots__dot_active = [...e.target.classList].includes(
        "slide-dots__dot--active"
    )
    if (isDots__dot && !isDots__dot_active) {
        // console.log(e.target)
        // console.log(e.target.dataset.slide)
        activateDot(e.target.dataset.slide)
        goToSlide(e.target.dataset.slide)
    }
})
