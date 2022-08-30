/* gnb 슬라이더 */
$('#gnb').on('mouseenter', function(){
    $('#headerWrap').addClass('on')
})
$('#headerWrap').on('mouseleave', function(){
    $(this).removeClass('on')
})

/* 메인 슬라이더 */
let sList = $('#sliderList');
let liLength = $('#sliderList li').length;
let docWidth = $("#main").width();
console.log(docWidth)
let num = 0;
let state = 1;
let prevSlider = function(){
    docWidth = $("#main").width();
    num--;
    if(num == -1){
        num = liLength-1;
        sList.prepend($('li:last', sList))
             .css({marginLeft:`-${docWidth}px`})
             .animate({marginLeft:0}, 500, function(){
                for(let i=0; i<liLength-1; i++){
                    sList.prepend($('li:last', sList))
                }
                sList.css({marginLeft:`-${(liLength-1)*100}%`})
                state = 1;
             })
    }
    else{
        sList.not(':animated').animate({marginLeft:`${docWidth}px`}, function(){
            state = 1;
        })
    }
    $("#sliderBtn a").removeClass('active');
    $("#sliderBtn a:eq("+ num +")").addClass('active')
}
let nextSlider = function(){
    docWidth = $("#main").width();
    num++;
    if( num == liLength ){
        num = 0;
        sList.append($('li:first', sList))
             .css({marginLeft:`-${(liLength-2)*100}%`})
             .animate({marginLeft:`-${(liLength-1)*100}%`}, 500, function(){
                for(let i=0; i<liLength-1; i++ ){
                    sList.append($('li:first', this))
                }
                sList.css({marginLeft:0})
                state = 1;
             })
    }
    else{
        sList.not(':animated').animate({marginLeft:`-${docWidth}px`}, function(){
            state = 1;
        })
    }
    $("#sliderBtn a").removeClass('active');
    $("#sliderBtn a:eq("+ num +")").addClass('active')
}

let timer = setInterval(nextSlider, 3000)

$("#sliderBtn a").on('click', function(e) {
    $("#sliderBtn a").removeClass('active');
    $(this).addClass('active')
    num = $(this).index();
    sList.animate({ marginLeft: `${num*(-100)}%` }), 1000
  })

$('#sliderBtn a').on('click', function(e){
    num = $(this).index();
    sList.animate({marginLeft: `${num*(-100)}%` })
})
$('#sliderBtn a').on('click', function(e){
    e.preventDefault();
    clearInterval(timer)
    timer = setInterval(nextSlider, 3000)
})

$(window).on('resize', _.debounce( function() {
  nextSlider();
}, 500))


/* 제품 슬라이더 */
$('#productBtn .nextBtn').on('click', function(e){
    e.preventDefault();
    $('#drink:not(:animated)').animate({scrollLeft:"+=275"}, 300)
})
$('#productBtn .prevBtn').on('click', function(e){
    e.preventDefault();
    $('#drink:not(:animated)').animate({scrollLeft:"-=275"}, 300)
})

/* 뉴스 슬라이드 */
$("#newsAll .news").css({ marginLeft: -655})
$('#newsAll .news').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows:false,
    autoplay : true,
    autoplaySpeed : 3000,
    pauseOnHover : false
})

/* 뉴스 마우스 */
const news = document.getElementById('newsAll')
const mouse = document.querySelector('.cursor')
        let mouseMove = (e) => {
           mouse.style.left = `${e.pageX -10}px`;
           mouse.style.top = `${e.pageY -10}px`;
        }
newsAll.addEventListener('mousemove', mouseMove)
newsAll.addEventListener('mouseenter', () => {
    $(".cursor").show()
})
newsAll.addEventListener('mouseleave', () => {
    $(".cursor").hide()
})

$('#news .cursor')


/* 반응형 롤오버 */ 
let resizing = () => {
    if($(window).width() > 599){
        $('#gnb .snb').css({display:'block'})
    }
    else{
        $('#gnb .snb').css({display:'none'})
        $('#gnb').removeClass('mobile')
    }
}
resizing();
$(window).on('resize', function(){
    resizing();
})


$('.gnbView').on('click', function(){
    $('#gnb').toggleClass('mobile')
})
$(document).on('click','#gnb.mobile #gnbList li', function(){
    $(this).children('.snb').slideToggle(500).parents().siblings().children('.snb').slideUp();
})