/**
 * Created by xiangfahai on 2017/3/9.
 */
// import $ from 'jquery'
export default function (content = '', callback, detailCallback, business = '') {

    const html = `<div class="mywin" style="width: 320px;max-height: 300px">
                        <div class="win-head">
                            <div style="display: inline-block">信息</div>
                            <div class="info-close">X</div>
                        </div>
                        <div class="info-tab-container">
                            ${business && '<div class="info-tab active" data-tag="0">基础信息</div>'}
                            ${business && '<div class="info-tab" data-tag="1">业务信息</div>'}
                        </div>
                        <div class="info-win-container active">
                            ${content}
                            ${detailCallback ? '<a class="info-win info-link">详细信息</a>':''}
                        </div>
                        
                        <div class="info-win-container">
                            ${business}
                        </div>
                        <!--<div class="info-win-close" id="info-win-close">X</div>-->
                   </div>`


    setTimeout(function () {
        const el = $('.mywin')
        el.on('click', '.info-close', callback)
            .on('click', '.info-tab', function () {
                $('.info-tab.active').removeClass('active')
                $(this).addClass('active')
                $(this).parents('.mywin').find('.info-win-container.active').removeClass('active')
                $(this).parents('.mywin').find('.info-win-container').eq(+$(this).data('tag')).addClass('active')
            })
        if(detailCallback){
            el.on('click', '.info-link', detailCallback)
        }
    }, 0)


    return html
}

