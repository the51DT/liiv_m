window.addEventListener("load", ()=>{

    window.addEventListener('resize', setVh);
    setVh();

    const index = document.querySelector(".section__type");
    index.classList.add("active");

    containerPad();
    window.addEventListener("resize", containerPad);

    if(isMobile){
        document.querySelector("body").classList.add("mobile");
        // getFootPad();
        // window.addEventListener("resize", getFootPad);
    }
    
    const linkItem = Array.from(document.querySelectorAll(".link__item"));
    linkItem.forEach((item)=>{
        item.addEventListener("click", (e)=>{ e.preventDefault(); pageChange(item.dataset.link) })
    })

    // step1 유심 라디오버튼 임시
    const radioSelect = Array.from(document.querySelectorAll(".rdo__item"));
    const radioResult = document.querySelectorAll(".rdo__result");
    radioSelect.forEach((rdo)=>{
        const rdoTxt = rdo.getAttribute("data-txt");
        console.log(document.querySelector('input[type=radio]:checked').value);
        if(rdo.classList.contains("active")){
            radioResult.forEach((result)=>{
                result.innerHTML = rdoTxt;
            })
        };
        rdo.addEventListener("click", (e)=>{
            console.log(document.querySelector('input[type=radio]:checked').value);
            radioResult.forEach((result)=>{
                result.innerHTML = rdoTxt;
            })
        })
    })

    // close 버튼 팝업
    // const btnClose = document.querySelector('header .btn__close');
    // const leavepop = document.querySelector('#leave__pop');
    // const dim = document.querySelector('.dim');

    // btnClose.addEventListener("click", function(e){
    //     e.preventDefault;
    //     leavepop.classList.toggle("active");
    //     dim.classList.toggle("active");
    // });
    // leavepop.addEventListener("click", function(e){
    //     e.preventDefault;
    //     leavepop.classList.toggle("active");
    //     dim.classList.toggle("active");
    // });
})

// 모바일 100vh 대응
const setVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
};

// mobile check
function chkMobile(agent) {
    const mobileRegex = [/Android/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i]
    return mobileRegex.some(mobile => agent.match(mobile))
}
const isMobile = chkMobile(window.navigator.userAgent)


// footer home bar check
// const getFootPad = function(){
//     const foot = Array.from(document.querySelectorAll("footer"));                   // footer elem
//     const footH = document.querySelector(".active .foot__btn") ? document.querySelector(".active .foot__btn").offsetHeight : 0;   // 하단 버튼 높이
//     foot.forEach((item)=>{ item.style.bottom = `-${footH * 0.2}px`; })
// }

// header, footer padding setting
const containerPad = function(){
    const head = document.querySelector(".active header");
    const foot = document.querySelector(".active footer") ?? 0;
    const contentWrap = document.querySelectorAll(".container__wrap");
    contentWrap.forEach((item)=>{
        item.style.paddingTop = `${head.offsetHeight}px`;
        item.style.paddingBottom = `${foot.offsetHeight}px`;
    });
}

// page link
const pageChange = function(link){
    const section = Array.from(document.querySelectorAll(".content__section"));
    section.forEach((item)=>{ item.classList.remove("active") })
    window.scrollTo(0, 0);
    document.querySelector(`.${link}`).classList.add("active");
}

$(document).ready(function(){
    $(document).on("click", ".img_radio", function () {
        $(this).siblings().removeClass('active');
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
        }
        
    });

    /* clear text */
    $('form').on('click','.form-text + label + .clear-text', function(e) {
    e.preventDefault();
    console.log('clear text.');
    $(this).prev().prev('input').val('');
    return false;
    });

    /* input without required attribute */
    $('form').on('focus blur keyup','.form-text:not([required])', function(e) {
    e.preventDefault();
    if($(this).val().length) {
        $(this).addClass('valid-text');
    } else {
        $(this).removeClass('valid-text');
    }
    });
    $('form').on('click','.form-text:not([required]) + label + .clear-text', function(e) {
    e.preventDefault();
    console.log('remove valid-text.');
    $(this).prev().prev('input').removeClass('valid-text');
    return false;
    });





    // radio group active
    $(document).find('.radio__group .radio__item input').on("change", function(){
        const radioGroup = $(this).parents(".radio__group");
        radioGroup.find(".radio__item").removeClass("active");
        $(this).parents(".radio__item").addClass("active")
    })

    // form focus
    $(document).find(".form__item input").on("focus", function(){
        $(this).parents(".form__item").addClass("focus");
    })
    $(document).find(".form__item input").on("blur", function(){
        $(this).parents(".form__item").removeClass("focus");
        if( $(this).val().length > 1 ){
            $(this).parents(".form__item").addClass("active");
        } else {
            $(this).parents(".form__item").removeClass("active");
        }
    })

    // form active
    $(document).find(".form__group input").on("propertychange change keyup keypress keydown paste input", function(){
        if( $(this).val().length > 1 ){
            $(this).parents(".form__item").addClass("active");
            $(this).parents('.form__item-hasbtn').addClass("active");
        } else {
            $(this).parents(".form__item").removeClass("active");
            $(this).parents('.form__item-hasbtn').removeClass("active");
        }
    })

    // regNo text change 2******
    $(document).find(".regNo2").on("input", function(){
        const value = $(this).val();
        let star ="";
        if (value){
            for(let i=1; i<value.length; i++){ star += "*" }
            $(this).val($(this).val()[0] + star)
        }
    })

    // clear-text
    $(document).find(".form__group .clear-text").on("click", function(){
        $(this).prev("input").val("");
        $(this).parents(".form__item-hasbtn").removeClass("active");

        let input = $(this).parents(".form__item").find("input");
        let count = 0;

        input.each((idx, item)=>{ if( $(item).val().length > 1 ){ count++ } })
        if( count < 1 ){ $(this).parents(".form__item").removeClass("active"); }
    })

    // help open
    $(document).find(".link__help").on("click", function(e){
        e.preventDefault();
        $(document).find(".section__joinhelp").addClass("open");
    })
    // help close
    $(document).find(".link__help-close").on("click", function(e){
        e.preventDefault();
        $(document).find(".section__joinhelp").removeClass("open");
    })
})