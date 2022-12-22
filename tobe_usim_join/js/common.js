window.addEventListener("load", ()=>{

  window.addEventListener('resize', setVh);
  setVh();

  const index = document.querySelector(".section__type");
  index.classList.add("active");

  containerPad();
  window.addEventListener("resize", containerPad);
  isMobile ? document.querySelector("body").classList.add("mobile") : null;   // mobile check
  
  // ink__item
  const linkItem = Array.from(document.querySelectorAll('.link__item'));
  linkItem.forEach((item)=>{
      item.addEventListener("click", (e)=>{
          e.preventDefault();
          if( $(item).hasClass("disabled") || $(item).attr("disabled") !== undefined  ){ return } // disabled check
          pageChange(item.dataset.link)
      })
  })

  // step1 유심 라디오버튼 임시
  // const radioSelect = Array.from(document.querySelectorAll(".rdo__item"));
  // const radioResult = document.querySelectorAll(".rdo__result");
  // radioSelect.forEach((rdo)=>{
  //     const rdoTxt = rdo.getAttribute("data-txt");
  //     console.log(document.querySelector('input[type=radio]:checked').value);
  //     if(rdo.classList.contains("active")){
  //         radioResult.forEach((result)=>{
  //             result.innerHTML = rdoTxt;
  //         })
  //     };
  //     rdo.addEventListener("click", (e)=>{
  //         console.log(document.querySelector('input[type=radio]:checked').value);
  //         radioResult.forEach((result)=>{
  //             result.innerHTML = rdoTxt;
  //         })
  //     })
  // })

  // step1 요금제 라디오버튼
  const radioSelect = Array.from(document.querySelectorAll(".rdo__item"));
  // const rdoResult = document.querySelectorAll(".rdo__result");
  const flag = document.querySelectorAll(".rdo__result .flag");
  const charge = document.querySelectorAll(".rdo__result .charge [data-charge]");
  radioSelect.forEach((rdo)=>{
      const rdoFlag = rdo.getAttribute("data-flag");
      const rdoCharge = rdo.getAttribute("data-charge");
      rdo.addEventListener("click", ()=>{
        document.querySelector(".rdo__result").classList.add("active");
        flag.forEach((result)=>{
            result.innerHTML = rdoFlag;
        });
        charge.forEach((result)=>{
            result.innerHTML = rdoCharge;
        });
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

  // step1 아코디언 버튼
  $(".acco__btn").each(function(){
      $(this).on('click', function(){
          $(this).closest('.acco__wrap').toggleClass('active');
          $(this).siblings('.acco__cont').slideToggle(200);
      })
  })

})

// 모바일 100vh 대응
const setVh = () => { document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`) };

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
  const head = document.querySelector(".active header") ?? 0;
  const foot = document.querySelector(".active footer") ?? 0;
  const contentWrap = document.querySelectorAll(".container__wrap");
  contentWrap.forEach((item)=>{
      head ? item.style.paddingTop = `${head.offsetHeight}px` : item.style.paddingTop = "0";
      foot ? item.style.paddingBottom = `${foot.offsetHeight}px` : item.style.paddingBottom = "0";
  });

}

// page link
const pageChange = function(link){
  const section = Array.from(document.querySelectorAll(".content__section"));
  section.forEach((item)=>{ item.classList.remove("active") })
  window.scrollTo(0, 0);
  document.querySelector(`.${link}`).classList.add("active");
  containerPad();
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
  // $(document).find('.radio__group .radio__item input').on("change", function(){
  //     const radioGroup = $(this).parents(".radio__group");
  //     radioGroup.find(".radio__item").removeClass("active");
  //     $(this).parents(".radio__item").addClass("active")
  // })
  $(document).find('.radio__group .radio__item').on("click", function(){
      const radioGroup = $(this).parents(".radio__group");
      radioGroup.find(".radio__item").removeClass("active");
      $(this).addClass("active");
      radioGroup.find(".radio__item input").prop("checked", false);
      $(this).find("input").prop("checked", true);
  })

  // form focus
  $(document).find(".form__item input").on("focus", function(){
      $(this).parents(".form__item").addClass("focus");
  })
  $(document).find(".form__item input").on("blur", function(){
      $(this).parents(".form__item").removeClass("focus");

      // console.log( $(this).parents(".form_item").find("input") )

      // if( $(this).val().length > 0 ){
      //     $(this).parents(".form__item").addClass("active");
      // } else {
      //     $(this).parents(".form__item").removeClass("active");
      // }
  })

  // form active
  $(document).find(".form__group input").on("propertychange change keyup keypress keydown paste input blur", function(){
      if( $(this).val().length > 0 ){
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
          for(let i=1; i<value.length; i++){ star += "●" }
          $(this).val($(this).val()[0] + star)
      }
  })

  // clear-text
  $(document).find(".form__group .clear-text").on("click", function(){
      $(this).prev("input").val("");
      $(this).parents(".form__item-hasbtn").removeClass("active");

      let input = $(this).parents(".form__item").find("input");
      let count = 0;

      input.each((idx, item)=>{ if( $(item).val().length > 0 ){ count++ } })
      if( count < 1 ){ $(this).parents(".form__item").removeClass("active"); }
  })

  // // help toast open
  // $(document).find(".link__help").on("click", function(e){
  //     e.preventDefault();
  //     $(document).find(".section__joinhelp").addClass("open");
  // })
  // // help close
  // $(document).find(".link__help-close").on("click", function(e){
  //     e.preventDefault();
  //     if( $(this).hasClass("disabled") ){ return false }
  //     $(document).find(".section__joinhelp").removeClass("open");
  // })

  // leave popup open
  // $(document).find(".link__leave").on("click", function(e){
  //     e.preventDefault();
  //     $(document).find(".section__leave").addClass("open");
  // })
  // $(document).find(".link__leave-close").on("click", function(e){
  //     e.preventDefault();
  //     $(document).find(".section__leave").removeClass("open");
  // })




  

  // disabled check - 가입유형 선택 (번호이동/신규가입)
  $(document).on("click", ".section__step1_1 .img_radio", function(){
    $(document).find(".section__step1_1 .foot__btn .link__item").addClass("disabled");
      const elem = $(document).find(".section__step1_1 .img_radio").eq(1);
      elem.hasClass("active") ? $(document).find(".section__step1_1 .foot__btn .link__item").removeClass("disabled") : null;
  })

  // disabled check - 요금제 선택
  $(document).on("click", ".section__step1_2 .img_radio", function(){
    $(document).find(".section__step1_2 .foot__btn .link__item").removeClass("disabled");
  })

  // disabled check - 개통유형 선택 (유심 개통/eSIM 개통)
  $(document).on("click", ".section__step1_3 .img_radio", function(){
    $(document).find(".section__step1_3 .foot__btn .link__item").addClass("disabled");
      const elem = $(document).find(".section__step1_3 .img_radio").eq(0);
      elem.hasClass("active") ? $(document).find(".section__step1_3 .foot__btn .link__item").removeClass("disabled") : null;
  })

  // disabled check - 유심정보 선택 (유심이 없어요/유심이 있어요)
  $(document).on("click", ".section__step1_4 .img_radio", function(){
    $(document).find(".section__step1_4 .foot__btn .link__item").addClass("disabled");
      const elem = $(document).find(".section__step1_4 .img_radio").eq(0);
      elem.hasClass("active") ? $(document).find(".section__step1_4 .foot__btn .link__item").removeClass("disabled") : null;
  })

  // disabled check - 가입유형 선택 (개인/개인사업자)
  $(document).on("click", ".section__jointype .img_radio", function(){
      $(document).find(".section__jointype .foot__btn .link__item").addClass("disabled");
      const elem = $(document).find(".section__jointype .img_radio").eq(0);
      elem.hasClass("active") ? $(document).find(".section__jointype .foot__btn .link__item").removeClass("disabled") : null;
  })
  // disabled check - 가입유형 선택 (만 19세 이상 성인)
  $(document).on("click", ".section__jointype2 .radio__item", function(){
      $(document).find(".section__jointype2 .foot__btn .link__item").addClass("disabled");
      const elem = $(document).find(".section__jointype2 .radio__group .radio__item").eq(0);
      elem.hasClass("active") ? $(document).find(".section__jointype2 .foot__btn .link__item").removeClass("disabled") : null;

  })
  // disabled check - 가입자 유형 선택 (신분증 확인)
  $(document).on("click", ".section__jointype3 .img_radio", function(){
      $(document).find(".section__jointype3 .foot__btn .link__item").addClass("disabled");
      const elem = $(document).find(".section__jointype3 .img_radio_wrap .img_radio").eq(0);
      elem.hasClass("active") ? $(document).find(".section__jointype3 .foot__btn .link__item").removeClass("disabled") : null;
  })

  // disabled check - 가입자 유형 선택 (이름/주빈먼호/발급일자)
  $(document).on("input click", ".section__jointype4 .form__group", function(){
      $(document).find(".section__jointype4 .foot__btn .link__item").addClass("disabled");

      const name = $(document).find(".section__jointype4 form .jointype4_name");
      const regNo = $(document).find(".section__jointype4 form .regNo");
      const regNo2 = $(document).find(".section__jointype4 form .regNo2");
      const date = $(document).find(".section__jointype4 form .jointype4_date");

      if( name.val().length < 1 ){ return false }
      if( regNo.val().length < 1 ){ return false }
      if( regNo2.val().length < 1 ){ return false }
      if( date.val().length < 1 ){ return false }

      $(document).find(".section__jointype4 .foot__btn .link__item").removeClass("disabled");
  })

  // disabled check - 인증방법(KB모바일인증서, 신용카드 인증)
  $(document).on("click", ".section__joinauth .img_radio", function(){
      $(document).find(".section__joinauth .foot__btn .link__item").addClass("disabled");
      const elem = $(document).find(".section__joinauth .img_radio_wrap .img_radio").eq(1);
      elem.hasClass("active") ? $(document).find(".section__joinauth .foot__btn .link__item").removeClass("disabled") : null;
      // $(document).find(".section__joinauth .foot__btn .link__item").removeClass("disabled")
  })

  // disabled check - 로그인정보 필요
  $(document).on("input click", ".section__joininfo form", function(){
      $(document).find(".section__joininfo .foot__btn .link__item").addClass("disabled");

      const id = $(document).find(".section__joininfo .section__joininfo_id");
      const pw = $(document).find(".section__joininfo .section__joininfo_pw");
      const pw2 = $(document).find(".section__joininfo .section__joininfo_pw2");

      if( id.val().length < 1 ){ return false }
      if( pw.val().length < 1 ){ return false }
      if( pw2.val().length < 1 ){ return false }

      $(document).find(".section__joininfo .foot__btn .link__item").removeClass("disabled");
  })

  // disabled check - 기본 정보입력 ( 이메일 )
  $(document).on("input click change", ".section__joininfo2 form", function(){
      $(document).find(".section__joininfo2 .foot__btn .link__item").addClass("disabled");

      const email = $(document).find(".section__joininfo2 .section__joininfo2_email");
      const email2 = $(document).find(".section__joininfo2 .section__joininfo2_email2");

      if( email.val().length < 1 ){ return false }
      if( email2.find("option:selected").val() < 1 ){ return false }

      $(document).find(".section__joininfo2 .foot__btn .link__item").removeClass("disabled");
  })

  // disabled check - 기본 정보입력 ( 주소지 )
  $(document).on("input click", ".section__joinaddress form", function(){
      $(document).find(".section__joinaddress .foot__btn .link__item").addClass("disabled");

      const address1 = $(document).find(".section__joinaddress .section__joinaddress_address1");
      const address2 = $(document).find(".section__joinaddress .section__joinaddress_address2");

      if( address1.val().length < 1 ){ return false }
      if( address2.val().length < 1 ){ return false }

      $(document).find(".section__joinaddress .foot__btn .link__item").removeClass("disabled");
  })
  // disabled check - 요금 청구서 수령방법(문자, 이메일)
  $(document).on("click", ".section__joinbill .img_radio", function(){
      $(document).find(".section__joinbill .foot__btn .link__item").addClass("disabled");
      const elem = $(document).find(".section__joinbill .img_radio_wrap .img_radio").eq(0);
      elem.hasClass("active") ? $(document).find(".section__joinbill .foot__btn .link__item").removeClass("disabled") : null;
  })

  // disabled check - 요금 납부 방법 (신용카드, 계좌이체)
  $(document).on("click change", ".section__joinpay .img_radio, .section__joinpay .check-type1 input", function(){
      $(document).find(".section__joinpay .section__joinpay-btn .link__item").addClass("disabled");

      const elem = $(document).find(".section__joinpay .img_radio_wrap .img_radio").eq(0);
      const checkbox = $(document).find(".section__joinpay .check-type1 input");

      if( elem.hasClass("active") && checkbox.is(":checked") ){
          $(document).find(".section__joinpay .section__joinpay-btn .link__item").removeClass("disabled");
      }
  })

  // disabled check - 요금 납부 방법
  $(document).on("input click", ".section__joincard form", function(){
      $(document).find(".section__joincard .foot__btn .link__item").addClass("disabled");

      const input1 = $(document).find(".section__joincard .section__joincard_1");
      const input2 = $(document).find(".section__joincard .section__joincard_2");
      const input3 = $(document).find(".section__joincard .section__joincard_3");
      const input4 = $(document).find(".section__joincard .section__joincard_4");
      const input5 = $(document).find(".section__joincard .section__joincard_5");

      if( input1.val().length < 1 ){ return false }
      if( input2.val().length < 1 ){ return false }
      if( input3.val().length < 1 ){ return false }
      if( input4.val().length < 1 ){ return false }
      if( input5.val().length < 1 ){ return false }

      $(document).find(".section__joincard .foot__btn .link__item").removeClass("disabled");
  })
  $(document).on("input", ".section__joincard_1, .section__joincard_2, .section__joincard_3, .section__joincard_4", function(){
      // $(document).find(".section__joincard_1")
  })

  // disabled check - 가입상담 신청하세요
  // $(document).on("input click change", ".section__joinhelp form, .section__joinhelp .section__joinhelp-checkbox", function(){
  //     $(document).find(".section__joinhelp .section__joinhelp-btn .link__help-close").addClass("disabled");

  //     const name = $(document).find(".section__joinhelp .section__joinhelp_name");
  //     const name2 = $(document).find(".section__joinhelp .section__joinhelp_name2");
  //     const checkbox = $(document).find(".section__joinhelp .section__joinhelp-checkbox");

  //     if( name.val().length < 1 ){ return false }
  //     if( name2.val().length < 1 ){ return false }
  //     if( checkbox.is(":checked") ){
  //         $(document).find(".section__joinhelp .section__joinhelp-btn .link__help-close").removeClass("disabled");
  //     }
  // })


	// 약관 동의
	$('.agr__group').on('click', '.chk__all', function(){
		$(this).closest('.agr__group').find('input').prop('checked', $(this).is(':checked'));
		if($('.chk__all').is(':checked')){
			$('.chk__all').closest('.check__list__wrap').addClass('active');
			$('.chk__all').closest('.content__section').find('.link__item').removeClass('disabled');
		} else {
			$('.chk__all').closest('.check__list__wrap').removeClass('active');
			$('.chk__all').closest('.content__section').find('.link__item').addClass('disabled');
		}
	});
	$('.agr__group').on('click', '.inp__chk', function(){
		var is_checked = true;
		$('.agr__group .inp__chk').each(function(){
			is_checked = is_checked && $(this).is(':checked');
		});
		$('.chk__all').prop('checked', is_checked);
	});
	$('.check__wrap').each(function(){
		let inpAll = $(this).find('.inp__all');
		let inpSub = $(this).find('.inp__sub');
		inpAll.on('click', function(){
			$(this).closest('.check__wrap').find('.inp__sub').prop('checked', $(this).is(':checked'));
		})
		inpSub.on('click', function(){
			var is_checked2 = true;
			inpSub.each(function(){
				is_checked2 = is_checked2 && $(this).is(':checked');
			});
			$(this).closest('.check__wrap').find('.inp__all').prop('checked', is_checked2)
			console.log(is_checked2);
		})
	});
	$('.agr__group').on('click', function(){
		if($('.chk__all').is(':checked')){
			$('.chk__all').closest('.check__list__wrap').addClass('active');
			$('.chk__all').closest('.content__section').find('.link__item').removeClass('disabled');
		} else {
			$('.chk__all').closest('.check__list__wrap').removeClass('active');
			$('.chk__all').closest('.content__section').find('.link__item').addClass('disabled');
		}
	})




  // 신용카드 선택
  $(document).on("click", ".joincard__card__wrap ul li", function(){
      $(document).find(".joincard__card__wrap ul li").removeClass("active");
      $(this).addClass("active");
  })
})
