const slider = $('.shop').bxSlider({
    pager: false,
    controls: false
});

$('.shop__arrow--left').on('click', e => {
    e.preventDefault();
    slider.goToPrevSlide()
})

$('.shop__arrow--right').on('click', e => {
    e.preventDefault();
    slider.goToNextSlide()
})
