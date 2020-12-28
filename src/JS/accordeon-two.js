const open = item => {
    
    const container = item.closest('.assortment__item');
    const wrapper = container.find('.assortment__desc');
      
    container.addClass('active');
    
    

    if($(window).width() < 1015 ){
        const sum = $(window).width() -($('.assortment__item').height())*3;
        wrapper.width(sum);


        if($('.assortment__item:first-child').hasClass('active')){
            $('.assortment__item:first-child').css({'transform':`translateY(-${sum}px)`});
        }
    
        if($('.assortment__item:nth-child(2)').hasClass('active')){
            $('.assortment__item:nth-child(2)').css({'transform':`translateY(-${sum}px)`});
            $('.assortment__item:first-child').css({'transform':`translateY(-${sum}px)`});
        }
        
        if($('.assortment__item:last-child').hasClass('active')){
            $('.assortment__item:first-child').css({'transform':`translateY(-${sum}px)`});
            $('.assortment__item:nth-child(2)').css({'transform':`translateY(-${sum}px)`});
            $('.assortment__item:last-child').css({'transform':`translateY(-${sum}px)`});
        }
    }else {
        wrapper.width(450);

        if($('.assortment__item:first-child').hasClass('active')){
            $('.assortment__item:first-child').css({'transform':'translateY(-450px)'});
        }

        if($('.assortment__item:nth-child(2)').hasClass('active')){
            $('.assortment__item:nth-child(2)').css({'transform':'translateY(-450px)'});
            $('.assortment__item:first-child').css({'transform':'translateY(-450px)'});
        }
    
        if($('.assortment__item:last-child').hasClass('active')){
            $('.assortment__item:first-child').css({'transform':'translateY(-450px)'});
            $('.assortment__item:nth-child(2)').css({'transform':'translateY(-450px)'});
            $('.assortment__item:last-child').css({'transform':'translateY(-450px)'});
        }   
    }   
        







}

const closeAll = container => {
    const items = container.find('.assortment__desc');
    const itemBlock = container.find('.assortment__item');

    itemBlock.removeClass('active');

    items.width(0)

    if($('.assortment__item:first-child').hasClass('active')==false){
        $('.assortment__item:first-child').css({'transform':'translateY(0)'});
    }

    if($('.assortment__item:nth-child(2)').hasClass('active')==false){
        $('.assortment__item:nth-child(2)').css({'transform':'translateY(0)'});
        $('.assortment__item:first-child').css({'transform':'translateY(0)'});
    }

    if($('.assortment__item:last-child').hasClass('active')==false){
        $('.assortment__item:first-child').css({'transform':'translateY(0)'});
        $('.assortment__item:nth-child(2)').css({'transform':'translateY(0)'});
        $('.assortment__item:last-child').css({'transform':'translateY(0)'});
    }
}

$('.assortment__link').on('click', e =>{
    e.preventDefault();

    const $this = $(e.currentTarget);
    const container = $this.closest('.assortment');
    const elemBlock = $this.closest('.assortment__item');

    if(elemBlock.hasClass('active')){
        closeAll(container);
    } else {
        closeAll(container);
        open($this);
    }   
    
})