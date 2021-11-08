//styles
import "../scss/catalogMap.scss";
import "owl.carousel/dist/assets/owl.carousel.css";

//libraries
import * as $ from "jquery";
import ymaps from "ymaps";
import "owl.carousel";

//Components
import header from "../components/header.html";
import footer from "../components/footer.html";

const owlGallery = (selector, params) => {
    const arrow = ` <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.50024 10.0002C5.75624 10.0002 6.01224 9.90225 6.20724 9.70725C6.59824 9.31625 6.59824 8.68425 6.20724 8.29325L2.90224 4.98825L6.08224 1.69525C6.46524 1.29725 6.45424 0.664249 6.05724 0.281249C5.65924 -0.101751 5.02624 -0.090751 4.64324 0.305249L0.781238 4.30525C0.402238 4.69825 0.407238 5.32125 0.793238 5.70725L4.79324 9.70725C4.98824 9.90225 5.24424 10.0002 5.50024 10.0002Z" fill="#3D3D3D"/>
                    </svg>`;
    if (params == undefined) params = "";
    const owl = $(selector);
    owl.each((i, el) => {
        $(el)
            .addClass("owl-carousel owl-theme")
            .owlCarousel(
                Object.assign(params, {
                    lazyLoad: true,
                    smartSpeed: 1000,
                    navText: [arrow, arrow],
                })
            );
    }).trigger("refresh.owl.carousel");
};

function select(btn, content, activeClass) {
    $(btn).on("click", function (e) {
        e.preventDefault();
        if (e.target === this) {
            $(this).toggleClass(activeClass).find(content).slideToggle();
        }
    });

    $(document).on("mousedown", function (e) {
        if (!$(btn).is($(e.target)) && !$(btn).is($(e.target))) {
            Array.from($(btn)).forEach((elem) => {
                if ($(elem).hasClass(activeClass))
                    $(elem).toggleClass(activeClass).find(content).slideToggle();
            });
        }
    });
}

$(() => {
    $("#root").prepend(header);
    $(".section").append(footer);

    owlGallery(".carouselFlats", {
        dots: false,
        autoWidth: false,
        items: 1,
        margin: 16,
        loop: false,
        nav: true,
        mouseDrag: false,
        touchDrag: false,
        navContainer: ".carouselFlats__buttons",
        navClass: ["carouselFlats__prev", "carouselFlats__next"],
        responsive: {
            1240: {
                items: 4,
                margin: 20,
                autoWidth: false,
            },
            768: {
                margin: 20,
                autoWidth: false,
                items: 2,
            },
        },
    });
    owlGallery(".carouselReviews", {
        dots: false,
        autoWidth: false,
        items: 1,
        margin: 16,
        loop: false,
        nav: true,
        mouseDrag: false,
        touchDrag: false,
        navContainer: ".carouselReviews__buttons",
        navClass: ["carouselReviews__prev", "carouselReviews__next"],
        responsive: {
            768: {
                items: 3,
                margin: 20,
                autoWidth: false,
            },
        },
    });
    owlGallery(".carouselFlatPhotos", {
        dots: true,
        autoWidth: false,
        items: 1,
        margin: 16,
        loop: false,
    });

    select(".nav__item_button", ".nav__options", "nav__active");
    select(".filter__item_select", ".filter__options", "filter__item_active");
    select(".content__select", ".content__options", "content__active");

    ymaps
        .load(
            "https://api-maps.yandex.ru/2.1/?apikey=2b543523-54f1-4a9f-af8a-8333795718cd&lang=ru_RU"
        )
        .then((maps) => {
            new maps.Map("yandexMap", {
                center: [55.76, 37.64],
                zoom: 10,
                controls: ["zoomControl"],
            });
        })
        .catch((error) => console.log("Failed to load Yandex Maps", error));
});
