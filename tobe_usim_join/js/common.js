window.addEventListener("load", ()=>{

    const statusBar = document.querySelector(".mobile-hidden");
    isMobile ? statusBar.style.display = "none" : null;
    isMobile ? document.querySelector("body").classList.add("mobile") : null;

    getHeadPad();
    window.addEventListener("resize", getHeadPad);

    
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