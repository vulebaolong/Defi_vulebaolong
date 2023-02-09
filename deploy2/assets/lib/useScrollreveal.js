/*{
    delay: 0,
    distance: '0px',
    duration: 600,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    interval: 0,
    opacity: 0,
    origin: 'bottom',
    rotate: {
        x: 0,
        y: 0,
        z: 0,
    },
    scale: 1,
    cleanup: false,
    container: document.documentElement,
    desktop: true,
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor: 0.0,
    viewOffset: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    afterReset: function (el) {},
    afterReveal: function (el) {},
    beforeReset: function (el) {},
    beforeReveal: function (el) {},
}
*/

// SETTING
// ==================================================================
const log = false; //false, true
const dataScroll = {
    nodeList: [],

    queryArr(arr) {
        let arrResult = []
        arr.map((e, i) => {
            const selector = Array.isArray(e) ? e[0] : e
            const eel = document.querySelectorAll(selector);
            if (Array.isArray(e)) {

                arrResult = [...arrResult, [[...eel], e[1]]]
            } else {
                arrResult = [...arrResult, ...eel]
            }
        });
        return arrResult
    },

    nodeListGet(dataNodeList) {
        dataNodeList.forEach(e => {
            // console.log('step ------------- ');
            // console.log(this.queryArr(e));
            this.nodeList.push(this.queryArr(e))
        });
        return this.nodeList
    }
}

/*
Mỗi hàng là mỗi step
lặp qua step để thiết lặp delay tăng dần và
thiết lập distance (khoảng cách hiện từ dưới lên)
Trường hợp 1
    - element chỉ có 1 mình text class => gắn luôn
Trường hợp 2
    - element là 1 mảng chứa 1 object option ở cuối
    - lặp qua các element rồi mới gắn cùng với option: distance
*/
const mountScroll = function (nodeList) {
    nodeList.map((arrStep, i) => {
        log ? console.log(`step ------------${i} => Lặp qua: `, arrStep) : '',

        arrStep.map((e, i) => {
            let elSucces, distance
            isArrayE = Array.isArray(e)

            if (!isArrayE) {
                elSucces = e
                distance = '100%'

                slideUpOption.delay = i *= 80
                slideUpOption.distance = distance
                ScrollReveal().reveal(elSucces, slideUpOption);
                log ? console.log(i, isArrayE, '=> gắn luôn: ', elSucces,
                    slideUpOption.distance,
                    slideUpOption.delay
                ) : '';
            }
            else {
                log ? console.log(i, ' lặp rồi gắn: ', e, isArrayE) : '';
                distance = e.at(-1).distance

                e[0].map((e1, i1) => {
                    elSucces = e1

                    slideUpOption.delay = i1 *= 80
                    slideUpOption.distance = distance
                    ScrollReveal().reveal(elSucces, slideUpOption);
                    log ? console.log(i, ' => ', i1, elSucces,
                        slideUpOption.distance,
                        slideUpOption.delay
                    ) : '';
                })
            }
        })
    })
}

/*
Mỗi array level 1 là mỗi step, lặp qua step để thiết lập delay tăng dần
mỗi lement nếu muốn thiết lập distance, thì
distance là key trong 1 object và cùng với element trong 1 aray
*/
console.log(w);
const dataNodeList = [
    [
        '.hero_left-text', '.hero_left-description', '.hero_left-button-left', '.hero_left-button .hero_left-button-right'
    ],
    [
        '.product_top-left', '.product_top-right'
    ],
    [
        ['.product_bottom-card', { distance: '50%' }]
    ],
    [
        '.grow .heading_secondary', '.grow_index-item'
    ],
    [
        '.power_top .heading_secondary', '.power_top-decs','.power_bottom-item'
    ],
    [
        '.secured_top .heading_secondary', '.secured_top .heading_secondary-decs', '.secured_bottom-box'
    ],
    [
        '.ecosystem_top .heading_secondary', '.ecosystem_top .heading_secondary-decs', '.ecosystem_bottom-icon'
    ],
    [
        '.generation_top .heading_secondary', '.generation_bottom-item'
    ],
    [
        '.community_top .heading_secondary', '.community_top .heading_secondary-decs', '.community_bottom-item', '.community_buttons .btn-transparent', '.community_buttons .btn-white'
    ],
    [
        '.pioneer_top .heading_secondary', '.pioneer_bottom-item'
    ]

]

const slideUpOption = {
    distance: '100%',
    delay: 0,
    origin: 'bottom',
    opacity: 0,
    reset: false,
    duration: 1500,
};

// RUN
// ==================================================================
const nodeList = dataScroll.nodeListGet(dataNodeList)
console.log(nodeList);

mountScroll(nodeList)

