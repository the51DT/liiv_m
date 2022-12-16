window.addEventListener("load", ()=>{
    getHeadPad();
    window.addEventListener("resize", getHeadPad);
    window.addEventListener("scroll", joinHeadScrollChk);

    const usim = document.querySelector(".content__usim");
    const usimAgree = document.querySelector(".content__usim-agree");
    const usimJoin = document.querySelector(".content__usim-join");
    const usimCheck = document.querySelector(".content__usim-check");
    const usimDone = document.querySelector(".content__usim-done");
    const usimCard = document.querySelector(".content__usim-card");

    usim.classList.add("active");

    usim.addEventListener("click", ()=>{ pageChange(usim, usimAgree)} )
    usimAgree.addEventListener("click", ()=>{ pageChange(usimAgree, usimJoin)} )
    usimJoin.addEventListener("click", ()=>{ pageChange(usimJoin, usimCheck)} )
    usimCheck.addEventListener("click", ()=>{ pageChange(usimCheck, usimDone)} )
    usimDone.addEventListener("click", ()=>{ pageChange(usimDone, usimCard)} )
    usimCard.addEventListener("click", ()=>{ pageChange(usimCard, usim)} )
})

const pageChange = function(hidePage, showPage){
    hidePage.classList.remove("active");
    showPage.classList.add("active");
    window.scrollTo(0, 0);
    HeadershadowHide();
}

const HeadershadowHide = function(){
    const activepage = document.querySelector(".content__section.active");
    const pageJoin = document.querySelector(".content__usim-join");
    const head = document.querySelector("header");
    activepage === pageJoin ? head.classList.add("shadow-hide") : head.classList.remove("shadow-hide");
    return activepage === pageJoin;
}

const joinHeadScrollChk = function(){
    let pageChk = HeadershadowHide();
    if( !pageChk ){return false;}
    const activepage = document.querySelector(".content__section.active");
    const pageJoin = document.querySelector(".content__usim-join");
    const head = document.querySelector("header");
    head.classList.toggle("shadow-hide", window.scrollY >= 100);
}

const getHeadPad = function(){
    const head = document.querySelector("header");
    const contentWrap = document.querySelectorAll(".content__wrap");
    contentWrap.forEach((item)=>{ item.style.marginTop = `${head.offsetHeight}px`; });
}