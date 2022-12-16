window.addEventListener("load", ()=>{

    const index = document.querySelector(".section__type");
    index.classList.add("active");

    const statusBar = document.querySelector(".mobile-hidden");
    isMobile ? statusBar.style.display = "none" : null;
    isMobile ? document.querySelector("body").classList.add("mobile") : null;

    getHeadPad();
    window.addEventListener("resize", getHeadPad);

    

    const linkItem = Array.from(document.querySelectorAll(".link__item"));
    linkItem.forEach((item)=>{
        item.addEventListener("click", (e)=>{ e.preventDefault(); pageChange(item.dataset.link) })
    })

    
})

// mobile check
function chkMobile(agent) {
    const mobileRegex = [/Android/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i]
    return mobileRegex.some(mobile => agent.match(mobile))
}
const isMobile = chkMobile(window.navigator.userAgent)

// header height check
const getHeadPad = function(){
    const head = document.querySelector("header");
    const contentWrap = document.querySelectorAll(".container__wrap");
    contentWrap.forEach((item)=>{ item.style.marginTop = `${head.offsetHeight}px`; });
}

const pageChange = function(link){
    console.log(link)
    const section = Array.from(document.querySelectorAll(".content__section"));
    section.forEach((item)=>{ item.classList.remove("active") })

    document.querySelector(`.${link}`).classList.add("active");
}