const findBlock = value => {
    return $('.reviews__item').filter((ndx,item) => {
        return $(item).attr('data-linked-with') == value
    })

}

$('.interective-avatar__link').on('click', e =>{
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr('data-open');
    const item = findBlock(target);
    const currentItem = $this.closest('.reviews__user-item');

    item.addClass('active');
    item.siblings().removeClass('active');


    currentItem.addClass('interective-avatar--active');
    currentItem.siblings().removeClass('interective-avatar--active');

    

})