'use strict';

(function ($) {

  $(function () {

    $.ajax({
      url: '/api/theFlash.json',
      data: {},
      success: function (response) {
        const showcase = $('#theFlashShowcase');
        if (response && response.casts) {
          showcase.empty();
          _.each(response.casts, function (element, index, list) {
            let lineBreaker = (index != 0 && (index + 1) % 4 == 0) ? '</div><div class="row">' : '' ;
            showcase.append(`
              ${lineBreaker}
              <div class="col-md-3 tip-trigger J_TipTrigger">
                <div class="text-center">
                  <img class="photo" src="/images/${element.img}" alt="">
                </div>
                <div class="tip-box J_TipBox">
                  <h3 class="name">${element.name}</h3>
                  <p class="bio">${element.bio}</p>
                </div>
              </div>
            `)
          });
          showcase.find('.J_TipTrigger .photo').on('mouseover', function (e) {
            let currentContainer = e.currentTarget;
            let currentTipBox = $(currentContainer).parents('.J_TipTrigger').find('.J_TipBox');
            let tipsOffsetLeft = currentContainer.offsetLeft + currentContainer.offsetWidth + 20;
            let tipsOffsetTop = currentContainer.offsetTop - 20;

            // if have no enough space on the right side of current photo, consider put the tips below the photo
            if(tipsOffsetLeft+currentTipBox.width() > window.document.body.clientWidth){
              tipsOffsetLeft = currentContainer.offsetLeft + ($(currentContainer).width() - currentTipBox.width());
              tipsOffsetTop = currentContainer.offsetTop + currentContainer.offsetHeight + 20;
            }

            currentTipBox.css({
              'left': tipsOffsetLeft,
              'top': tipsOffsetTop
            });
            currentTipBox.fadeIn();
          });
          showcase.find('.J_TipTrigger .photo').on('mouseout', function (e) {
            let currentContainer = e.currentTarget;
            let currentTipBox = $(currentContainer).parents('.J_TipTrigger').find('.J_TipBox');
            currentTipBox.hide();
          });
        } else {
          alert('请求数据失败');
        }
      }
    })

  });

})(jQuery);
