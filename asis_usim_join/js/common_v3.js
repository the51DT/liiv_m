$(document).ready(function(){
	//페이지 렌더링시 실행되어야하는 fn
	
	viewportSet(); //viewport 셋팅
	deviceType(); //모바일/패드/desktop//ie브라우저 body class명 추가
	
    modalLayer.init(); //모달팝업
	fullLayer.init(); //컨텐츠팝업 // fullLayer
    noticeLayer.init(); // noticeLayer모달팝업
	selectRdo(); //아이템 선택시 레이어(radio)
	
	csSearch(); //검색
	spellcheckDisabled(); //맞춤법 체크 해제 
	iosMaskFont(); // ios 마스킹 폰트 
    csInputDel(); // input 삭제 버튼
    
    footerPad();//
    emailFreeWhite();//이메일 직접 입력 공통    
    
    // datepickerReadonly()// datepicker input readonly 처리
    
    //////// PC관련 추가
    layerFormUiCustom(); //2022.09.14 추가
    
});

//widnow resize 
$(window).resize(function() {
    $('input[type="text"].hasDatepicker').datepicker('hide');
    deviceType();
    viewportSet();
});

//viewport 셋팅
function viewportSet() {
	var $viewport = $('meta[name="viewport"]');

    if ( navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/Android/i) )  {
		$viewport.attr('content', 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }  else if ( navigator.userAgent.match(/iPad/i) ) {
    	$viewport.attr('content', 'width=device-width, user-scalable=yes');
    } else {
    	$viewport.attr('content', 'user-scalable=yes');
    }
}
// 모바일/패드/desktop//ie브라우저 body class명 추가
function deviceType(){
	if ( navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Android/i) )  {
		$('html, body').removeClass('dvIpad dvDesktop');
        $('html, body').addClass('dvPhone');
        if(navigator.userAgent.match(/iPhone/i)){
           $('body').addClass('ios');
        } else {
           $('body').removeClass('ios');
        }
	} else if (navigator.userAgent.match(/iPad/i)){
		$('html, body').removeClass('dvIpad dvDesktop');
		$('html, body').addClass('dvIpad');
	} else {
		$('html, body').removeClass('dvPhone dvIpad ios');
		$('html, body').addClass('dvDesktop');		
	}
	
	//ie 브라우저 대응 위해
    var agent = navigator.userAgent.toLowerCase();
    if ((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
		$('html').addClass('ie');
    }
}

// 우측 메뉴 슬라이드
// function sideMenu(type){
//     var type = type;
//     var $aside = $('aside#layer_menu');
    
//     var wH = $(window).scrollTop();
    
//     if(type == 'open'){
//         $aside.attr('data-scroll', wH);
//         $aside.addClass('show');
//         $('body').addClass('scroll_off');
//     } else if (type == 'close'){
//         $aside.removeClass('show'); 
//         $('body').removeClass('scroll_off');
        
//         var wH = $aside.attr('data-scroll');
//         $(window).scrollTop(wH);
//         $aside.removeAttr('data-scroll');
        
//         asideMenuActiveReset(); // aside 메뉴의 active 초기화 // inc_aside.html 에 있음
//     }
// }


//모달팝업
/**/
var modalLayer = {
    init:function(){
        this.closeBtnEvent();
		//this.clickBtnEvent();
	},
	closeBtnEvent:function(wh){                    
		$(document).on('click', '.mlayer_pop .layer_close, .mlayer_pop [data-dismiss="modal"]', function(e){
            e.preventDefault(); 
            modalLayer.hideEvent($(this).closest('.mlayer_pop'));  
            $('body').find('.layer_btn_focus').focus();
            setTimeout(function(){
                $('body').find('.layer_btn_focus').removeClass('layer_btn_focus');
            }, 100);
		});
	},
	clickBtnEvent:function(target){
        var $elm = $(target);
        $elm.addClass('layer_btn_focus');
	},             
	hideEvent:function(target){
        target.attr('tabindex',-1).fadeOut();        
        target.removeClass('modal_up');
        target.next('.dimmed').remove();
        
        // if($('.flayer_pop:visible').length > 0 || $('.modal_up:visible').length > 0){
        //     $('body').addClass('scroll_off');  
        // } else {
        //    $('body').removeClass('scroll_off');  
        // }
        var wH = target.attr('data-scroll');
        $(window).scrollTop(wH);
        target.removeAttr('data-scroll');
        
        $('body').find('.layer_btn_focus').focus();
        setTimeout(function(){
            $('body').find('.layer_btn_focus').removeClass('layer_btn_focus');
        }, 100);
        
	},
	show:function(target, elm) { 
        this.clickBtnEvent(elm);
        
        var showLayer = $('#' + target);
        if(showLayer.next('.dimmed').length == 0){
           showLayer.after('<div class="dimmed"></div>');
        }
        if($('.flayer_pop:visible').length > 0 || $('.modal_up:visible').length > 0){
            var length = $('.modal_up:visible').length + 1;
            
            showLayer.css('z-index', '30' + length);
            showLayer.next('.dimmed').css('z-index', '30' + (length - 1));
        }      
                  
		showLayer.addClass('modal_up'); 
        showLayer.attr('tabindex',0).show().focus();
        
        var wH = $(window).scrollTop();
        showLayer.attr('data-scroll', wH);
        // $('body').addClass('scroll_off');
        
        layerTabKeyAction('#' + target);
        layerFormUiCustom(); //2022.09.14 추가

	},
	hide:function(target){
		var hideLayer = $('#' + target);
		this.hideEvent(hideLayer);   
	},
}
      
        
//컨텐츠팝업     
var fullLayer = {       
	init:function(){
		this.closeBtnEvent();
		//this.clickBtnEvent();
	},   
	closeBtnEvent:function(){                    
		$(document).on('click', '.flayer_pop .layer_close, .flayer_pop [data-dismiss="modal"]', function(e){
			e.preventDefault();           
			fullLayer.hideEvent($(this).closest('.flayer_pop'));  
			$('body').find('.layer_btn_focus').focus();
            setTimeout(function(){
                $('body').find('.layer_btn_focus').removeClass('layer_btn_focus');
            }, 100);
		});
	},            
	clickBtnEvent:function(target){
        var $elm = $(target);
        $elm.addClass(' layer_btn_focus');
	},             
	hideEvent:function(target){
		target.attr('tabindex',-1).hide();
        target.next('.dimmed').remove();
        
		// if($('.flayer_pop:visible').length > 0 || $('.mlayer_pop:visible').length > 0){
        //     $('body').addClass('scroll_off');  
        // } else {
        //    $('body').removeClass('scroll_off');  
        // } 
        
        var wH = target.attr('data-scroll');
        $(window).scrollTop(wH);
        target.removeAttr('data-scroll');
        
        $('body').find('.layer_btn_focus').focus();
        setTimeout(function(){
            $('body').find('.layer_btn_focus').removeClass('layer_btn_focus');
        }, 100);
	},
	show:function(target, elm){
		this.clickBtnEvent(elm);
        
        var showLayer = $('#' + target);
        if(showLayer.next('.dimmed').length == 0){
            showLayer.after('<div class="dimmed"></div>');
        }
        if($('.flayer_pop:visible').length > 0 || $('.modal_up:visible').length > 0){
        	var length = $('.modal_up:visible').length + 1;
             
            showLayer.css('z-index', '30' + length);
            showLayer.next('.dimmed').css('z-index', '30' + (length - 1));
        }  
 		showLayer.attr('tabindex',0).show().focus(); 
        
        var wH = $(window).scrollTop();
        showLayer.attr('data-scroll', wH);
        // $('body').addClass('scroll_off');
        
        layerTabKeyAction('#' + target);
        layerFormUiCustom(); //2022.09.14 추가
	},
	hide:function(target){
		var hideLayer = $('#' + target);
		this.hideEvent(hideLayer);
	}            
}

//notilayer_pop     
 var noticeLayer = {
        init:function(){
            this.closeBtnEvent();
        },
        closeBtnEvent:function(){
            $(document).on('click', '.notilayer_pop [data-dismiss="modal"]', function(e){
                e.preventDefault();
                $(this).closest('.notilayer_pop');                
                modalLayer.hideEvent($(this).closest('.notilayer_pop'));                
            })
        },
        hideEvent:function(target){            
            target.attr('tabindex',-1).fadeOut('fast');         
            target.next('.dimmed').remove(); 
            $('body').find('.notilayer_pop').css({'display': 'none'});            
        },
        show:function(target){
            var showLayer = $('#' + target);            
            showLayer.after('<div class="dimmed"></div>');
            showLayer.attr('tabindex',0).fadeIn(); 
            $('body').find('.notilayer_pop').css({'display': 'block'});  
        },
        hide:function(target){
            var hideLayer = $('#' + target);
            this.hideEvent(hideLayer);
        },
        
};

// tabkey키 이벤트 // 웹접근성 관련
function layerTabKeyAction(id){
	var focusList = $(id+'.mlayer_pop.modal_up, ' +id+'.flayer_pop').find('a, button, input:not([type="hidden"]), select, textarea');
    var firstFocus = focusList.eq(0);
    var lastFocus = focusList.eq(focusList.length - 1);
    //console.log(focusList.length);
    firstFocus.on({
        'keydown' : function(e){
            if(e.shiftKey && e.keyCode == 9){
                e.preventDefault();
                $(lastFocus).focus();
            }
        }
    });
    lastFocus.on({
        'keydown' : function(e){
            if(e.shiftKey && e.keyCode == 9){
                return;
            } else if(e.keyCode == 9){
                e.preventDefault();
                $(firstFocus).focus();
            }
        }
    });
}

//어코디언
$(document).on('click', '.ui_accordion .accordion_toggle', function(e){
    var accordionUI = $(this).closest('.ui_accordion'), 
        accordionCont = accordionUI.find('.accordion_cont'),
        accordionBtn = accordionUI.find('.accordion_toggle');;
    if(accordionUI.hasClass('type_each') === true) {
        e.preventDefault();
        if ($(this).hasClass('active')) {   
            $(this).removeClass('active');    
        }else{      
             $(this).addClass('active');        
        }
        $(this).parent().next().slideToggle();
    }else if(accordionUI.hasClass('type_guide') === true){
        e.preventDefault();
        if ($(this).hasClass('active')) {
            slideUp();       
        }else{
            slideUp(); 
            $(this).addClass('active').next().slideDown();        
        }
        function slideUp() {
            accordionBtn.removeClass('active').next().slideUp();
        };                
    }else if(accordionUI.hasClass('type_acc') === true){
        e.preventDefault();
        if ($(this).hasClass('active')) {
            accordionCont.slideUp();
            $(this).removeClass('active');
        }else{
            accordionCont.slideUp();
            accordionBtn.removeClass('active');
            $(this).addClass('active');  
            $(this).closest('.unit').next('.accordion_cont').slideDown();     
        }             
    }else{
        e.preventDefault();
        if ($(this).hasClass('active')) {
            slideUp();       
        }else{
            slideUp(); 
            $(this).addClass('active').parent().next().slideDown(); 
        }
        function slideUp() {
            accordionBtn.removeClass('active').parent().next().slideUp();
        };                
    }
});

//아코디언 target
function uiAccordionToggle(target, elm) {
    var $target = $(target);
    var $elm = $(elm);
    
    $elm.toggleClass('active');
    $target.slideToggle();
}


//요금제 선택, 회선 선택
$(document).on('click', '.mo_select_item .list_toggle', function(){	
    var item_idx = $(this).closest('.mo_select_item'),
        item_li = item_idx.find('.select_list li');
    
    
    item_idx.toggleClass("active"); 
    item_li.closest('ul').show(); 
    
    /**/
    if(item_idx.hasClass('num_selectbox')){
        var liActiveName = 'selected';
    } else {
        var liActiveName = 'active';
    }

    item_idx.on("click", ".select_list li", function(){
        item_li.closest('ul').hide();         
        item_li.removeClass(liActiveName);	
        $(this).addClass(liActiveName);
        item_idx.find('.select_default .item').html($(this).find('.item').html());
        item_idx.find(".btn.list_toggle").removeClass("active");
    });           

    $(document).mouseup(function(e) {               
        if (item_idx.has(e.target).length == 0){
            item_li.closest('ul').hide(); 
            item_idx.find(".list_toggle").removeClass("active"); 
        }
    });
});

//아이템 선택시 레이어(radio)
function selectRdo() {
	var select_rdo = $('[data-rdo="select"] input[type="radio"]');
	select_rdo.change(function() {
		var select_no = $(this).attr('id');
		$('[data-show='+select_no+']').siblings('[data-show]').hide();
		$('[data-show='+select_no+']').show();
	});	
}

//탭
$(document).on('click', '[data-click="tab"]', function(e) {
	e.preventDefault();
	var thisTab = $(this), 
	      thisContents = $($(this).attr('href'));
          thisContents2 = $($(this).attr('data-other-id'));
	thisTab.parent().addClass('active').siblings().removeClass('active');
	thisContents.addClass('active').siblings().removeClass('active');
    thisContents2.addClass('active').siblings().removeClass('active');
});


//달력 
// $.datepicker.setDefaults({
// 	prevText: "이전달", 
// 	nextText: "다음달", 
// 	currentText: "오늘", 
// 	monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"], 
// 	monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"], 
// 	dayNames: ['일', '월', '화', '수', '목', '금', '토'], 
// 	dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'], 
// 	dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], 
// 	//weekHeader: "Wk", 
// 	dateFormat: "yy.mm.dd", 
// 	//firstDay: 0, 
// 	//isRTL: false, 
// 	showMonthAfterYear: true, 
// 	yearSuffix: "년", 
// 	changeYear:true,
// 	changeMonth:true,
// 	showOn: 'button',
// 	buttonText: "날짜선택",   
// });

// function datepickerReadonly() {
//    $('.type_datepicker input[type="text"]').addClass('datepicker');
//    $('input.datepicker').attr('readonly', true);    
// }

//검색
function csSearch() {
	$(".mo_search").each(function(){
		var cs_search = $(this);
		var cs_frm = cs_search.find('.i_text');     
		var cs_del = cs_search.find('.btn_keyword_del');  
		var cs_lst = cs_search.find('.keyword_list');            
		cs_frm.on('input', function(){            
			if ($(this).val() == '') {
			   cs_del.css('display', 'none');
			   cs_lst.css('display', 'none');
			}else {
			   cs_del.css('display','block');
			   cs_lst.css('display', 'block');
			}
		});       
		cs_del.on('click', function() {
			alert('1111');
			cs_del.css('display','none');
			cs_lst.css('display','none');
		});        
	});
}

// input 삭제 버튼  // 2022.03.16 수정
function csInputDel() {
    $(".mo_value").each(function(){
        var cs_value = $(this), 
              cs_frm = cs_value.find('input');
                
        if($(this).attr('data-del-btn') == 'hasbtn'){
            var del_btn = '<button type="button" class="btn_keyword_del" onClick="csInputDelBtn(this)">삭제</button>'; 
            $(this).find('input').after(del_btn);
        }        
        
        cs_frm.on('input', function(){            
            csInputDelView(this);
        });
        
         csInputDelView(cs_value.find('input'));
    });
}
function csInputDelView(elm) {
    var $elm = $(elm);
    if ($elm.val() == '') {
       $elm.next('.btn_keyword_del').hide();               
    }else {
       $elm.next('.btn_keyword_del').show();                
    }   
}
function csInputDelBtn(elm) {
    var $elm = $(elm);
    $elm.prev('input').val('');
    $elm.css('display', 'none');    
}


//이메일 집접 입력 (스크립트)
function emailFreeWhite() {
	var $elm = $('.email_ins .type_email > select');
	$elm.change(function() {
		var text = $(this).find('>option:selected').text();
		if(text == '직접입력'){
           $(this).closest('.type_email').next('input[type="text"]').show();
        } else {
           $(this).closest('.type_email').next('input[type="text"]').hide();
        }
	});	
}

//카드/은행 선택
function moSelectCom() {
	$('.mo_select_com').each(function(){
		var cs_select = $(this), 
			  list_toggle = cs_select.find('.btn_toggle'),                
			  item = cs_select.find('.select_list li button'), 
			  item_li = item.parent('li'),
			  select_label = cs_select.find('.select_label'),
			  count = item.length;
		item.parent('li').each(function (i) {
				$(this).css('z-index', count - i);
			});
		function setClosed() {
			item_li.addClass('closed');
			list_toggle.removeClass("active");
		}
		setClosed();
		list_toggle.on('click', function () {
			var $this = $(this);
			if ($this.is('.active')) {
					setClosed();
			}else{
				$this.addClass('active');
				item_li.removeClass('closed');
			}
		});
		item.on('click', function (e) {
			var $this = $(this), label = $this.data('label'), item_icon = $this.children('i').attr('class');
			item_li.removeClass('active');
			if ($this.parent('li').is("active")) {
				$this.parent('li').removeClass('active');
			}else{
				$this.parent('li').addClass('active');
			}
			select_label.children('.label_active').text(label);
			list_toggle.children('i').removeClass().addClass(item_icon);
			setClosed();
		});  
	});  
}

//별점 리뷰
$(document).on('click', '.rating_check_box .i_star', function() {
    var $box = $(this).closest('.star_box');

    $box.find('.i_star').removeClass('on');
    $(this).addClass('on').prevAll('.i_star').addClass('on');

    setTimeout(function(){
        starRating();
    }, 1);

    function starRating(){
        var v = $box.find('.i_star.on').length;
        var percent = v * 20;
        $box.removeClass('star_20 star_40 star_60 star_80 star_100');
        $box.addClass('star_box star_'+percent);
        $box.find('>span').text(percent+'%');
    }
});

// 맞춤법 체크 해제 
function spellcheckDisabled() {
	$("input[type='text']").attr('spellcheck',false); 
}

// footer 여백
function footerPad() {
	var length = $('.container > .content').find('>.monthly_pay').length;
    if(length > 0){
        $('footer.footer').addClass('pad_bottom');
    }
}

// ios 마스킹 폰트 
function iosMaskFont() {
	var $elm = $('.txt_masking');
	if (navigator.userAgent.match(/iPhone|ipad/i)) {		
		$elm.each(function(){
			$(this).css('font-size','1.2rem');
		});
	} else if (navigator.userAgent.match(/android/i)) {
		$elm.each(function(){
			$(this).css('font-size','1.6rem');
		}); 
	} else { 
		$elm.each(function(){
			$(this).prop("type", "password");
		});	
	}	
}


//breadscrumbs 만들기
function breadscrumbsMaker(targetMenu, menuName, subName) {
    var $target = $('#head_nav');
    var $targetMenu = $target.find(targetMenu);
    var $clone = $targetMenu.clone();
    
    var depth_01 = $targetMenu.prev('a').text();
    var depth_02 = menuName;
    var depth_03 = subName;    
    
    var makeHtml = "";
        makeHtml += '<ul class="breadscrumbs_info" onClick="uiAccordionToggle(\'#breadscrumbs_menu\', this);">';
        makeHtml += 	'<li class="depth_01"><a href="javascript:void(0);">'+depth_01+'</a></li>';
        makeHtml += 	'<li class="depth_02"><a href="javascript:void(0);">'+depth_02+'</a></li>';
        makeHtml += '</ul>';
    
    $('#breadscrumbs').append(makeHtml);
    $('#breadscrumbs').append('<div id="breadscrumbs_menu" class="breadscrumbs_menu"></div>');
    $('#breadscrumbs_menu').html($clone);
    
    var $depth_02 = $('#breadscrumbs_menu').find('> ul > li > a'); 
    $depth_02.each(function() {
        var text = $(this).text();
        if(text == menuName){
            $(this).addClass('active');
        }
    });
    
    var $depth_03 = $('#breadscrumbs_menu').find('> ul > li > ul > li > a'); 
    $depth_03.each(function() {
        var text = $(this).text();
        if(text == subName){
            $(this).addClass('active');
        }
    });
    
    $(document).on('click', '#breadscrumbs_menu a.has_sub', function(e){
        e.preventDefault()
        var $closest = $(this).closest('ul');
        
        if($(this).hasClass('active')){
           $closest.find('>li>a').removeClass('active');
           $(this).removeClass('active');
        } else {
           $closest.find('>li>a').removeClass('active');
           $(this).addClass('active');            
        }
    });
    
    
    $(document).mouseup(function(e) {               
        var breadscrumbs = $('#breadscrumbs, #breadscrumbs_menu');
        if (breadscrumbs.has(e.target).length == 0){
            $('#breadscrumbs_menu').slideUp(); 
            $('#breadscrumbs_menu').find('.breadscrumbs_info').removeClass("active"); 
        }
    });
}

////////////////////////////////////////////////////////
//////// PC관련 추가 ////////////////
//2022.09.18

function layerFormUiCustom(){
    var $elm = $('.mlayer_pop'); 
    $elm.each(function() {
        var $targetElm = $(this).find('.mo_box, .mo_select_rdo, .auto_transfer, .adddoc_file_unit');
        //console.log($targetElm.length);
        if($targetElm.length > 0){
            $targetElm.attr('mlayerInner', 'true');   
        }
    });
}
