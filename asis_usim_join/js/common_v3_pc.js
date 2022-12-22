$(document).ready(function(){
    pcGnbHover();
    pcGnbSubHover();    
    
    setTimeout(function(){
        pcFontSize(); //PC rem방식 폰트 사이즈 px로 고정
    }, 10);
    
     popupCameraHide();
    
    //PC팝업 '#cardtypeSelectLayer' 카드 등록 방법을 선택 팝업 자동 "직접입력" 클릭 되게
    cardtypeSelectLayerPass('cardtypeSelectLayer'); // 퍼블리싱에는 해당 id가  cardtypeSelectLayer 이것임
    cardtypeSelectLayerPass('cardRegTypeLayer');    // 퍼블리싱에는 해당 id가  cardRegTypeLayer 이것임
    
    accessibilityFn();//PC관련 tab key focus관련
        
    pcDeviceSet();   //pc인지 아닌지 확인용 // 
    //console.log("deviceTypeSet == '" +deviceTypeSet+"'");
    
    //퍼블리싱 테스트용
    //$('head').append('<script type="text/javascript" src="../js/common_v3_pc_onlyPubTest.js"></script>'); // 실제 개발에서는 막아야함 // 단순 퍼블리싱 확인용    
    
});

var deviceTypeSet;

function pcDeviceSet(){
    /*
    var pcDevice = "win16|win32|win64|mac|macintel";  
    if( navigator.platform ){
        if( pcDevice.indexOf(navigator.platform.toLowerCase()) < 0 ){
            //$('html').removeAttr('deviceTypeSet');
            return deviceTypeSet = 'pcNo';
        }else{
            // PC일때 실행될 function 실행
            $('html').attr('deviceTypeSet', 'pc');
            return deviceTypeSet = 'pc';
        }
    }
    */
    
    if( $('body').hasClass('dvDesktop') ){
        $('html').attr('deviceTypeSet', 'pc');        
        return deviceTypeSet = 'pc';
    } else {
        $('html').removeAttr('deviceTypeSet');
        return deviceTypeSet = 'pcNo';
    }
}

// pc head 1depth 메뉴 클릭 막기
$(document).on('click', '#header #menu>li>a,  #header #menu>li>ul>li>a.has_sub', function(e) {
    e.preventDefault();
});

// pc head영역 없을시 스크롤 문제 해결
$(document).ready(function(){
    var length = $('body > .wrap').find('>#header').length;
    if(length == 0){
       $('body > .wrap').addClass('noHeader');
    }
});


$(window).resize(function() {
    pcFontSize(); //PC rem방식 폰트 사이즈 px로 고정
    pcDeviceSet();
    console.log('deviceTypeSet = ' +deviceTypeSet);
});


// pc GNB 마우스 오버 효과
function pcGnbHover() {
	$(document).on('mouseenter focusin', '#header #menu > li > a', function() {
		$('#header').addClass('over');
		$('#header #menu').addClass('over');
        
        $(this).closest('li').addClass('over');
        $(this).closest('li').siblings('li').removeClass('over');
        
        var html = '<span class="smenu_tit"></span>';
        if($('#header #head_nav > .smenu_tit').length < 1){
           $('#header #menu').before(html);
        }
        
        var overTexxt = $(this).text();
        $('#header #head_nav > .smenu_tit').text(overTexxt);
	});
	$(document).on('mouseleave', '#header #menu', function() {
		gnbHide();
	});	
}

function gnbHide(){
    $('#header').removeClass('over');
    $('#header #menu').removeClass('over');
    $('#header #menu > li').removeClass('over');
    $('#header #head_nav > .smenu_tit').remove();
}

// PC GNB sub 마우스 오버 효과 
function pcGnbSubHover() {
    $('#header').prepend('<div class="hoverbg"></div>');
    $(document).on('mouseenter focus', '#header #menu > li > a', function() {
                
        pcGnbSubHoverHeight(this);
	});
    $(document).on('mouseenter', '#header #menu', function() {
        $('#header .hoverbg').height('300px');
    });
    $(document).on('mouseleave', '#header #menu', function() {
		$('#header .hoverbg').height('0px');
	});	 
    
    function pcGnbSubHoverHeight(elm) {
        setTimeout(function(){
            var $elm = $(elm);
            var h = $elm.next('ul').outerHeight(true);

            $('#header.over .hoverbg').height(h);
        }, 100);
    }
}


/// PC rem방식 폰트 사이즈 px로 고정
function pcFontSize() {
    var agent = navigator.userAgent.toLowerCase();
    if ((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
		return;
    } else {
       var $elm = $('body *:not(script, style, form)');
    
        var wW = $(window).outerWidth();
        if (wW > 1025){
           $elm.each(function(){
                var fs = $(this).css('font-size');
                //console.log(fs);

                if(fs == '18px'){ //1.5
                    $(this).attr('pc-fontSize', '18');     
                }else if(fs == '13.2px'){  //1.1
                    $(this).attr('pc-fontSize', '13');     
                }else if(fs == '14.4px'){  //1.2
                    $(this).attr('pc-fontSize', '14');     
                }else if(fs == '15.6px'){ //1.3
                    $(this).attr('pc-fontSize', '16');     
                }else if(fs == '16.8px'){ //1.4
                    $(this).attr('pc-fontSize', '17');     
                }else if(fs == '19.2px'){ //1.6
                    $(this).attr('pc-fontSize', '19');     
                }else if(fs == '20.4px'){ //1.7
                    $(this).attr('pc-fontSize', '20');     
                }else if(fs == '21.6px'){ //1.8
                    $(this).attr('pc-fontSize', '22');     
                }else if(fs == '24px'){ //2.0
                    $(this).attr('pc-fontSize', '24');     
                }else if(fs == '25.2px'){ //2.1
                    $(this).attr('pc-fontSize', '25');     
                }else if(fs == '27.6px'){ //2.3
                    $(this).attr('pc-fontSize', '28');     
                }else if(fs == '28.8px'){ //2.4
                    $(this).attr('pc-fontSize', '29');     
                }
            });
        } else {
           $elm.each(function(){
               $(this).removeAttr('pc-fontSize');  
           }) 
        } 
    }    
}

// PC팝업 재촬영 버튼 hidden 처리
function popupCameraHide() {
    var $elm = $('.mlayer_pop .layer_footer .form_group.type_camera ');
    $elm.attr('data-hidenode', 'desktop');
}

// PC팝업 '#cardtypeSelectLayer' 카드 등록 방법을 선택 팝업 자동 "직접입력" 클릭 되게 // MutationObserver 방식 사용
function cardtypeSelectLayerPass(tid) {
    var target = document.getElementById(tid); // 퍼블리싱에는 해당 id가  cardtypeSelectLayer 이것임
    //console.log($(target).length);    
    
    if($(target).length > 0){
       //변경을 감지 했을때 실행 부분
        var observer = new MutationObserver(function(mutation) {
            mutation.forEach(function(mutation) {
                //console.log(mutation);
                if($('body').hasClass('dvDesktop') && $(target).hasClass('modal_up')){
                    $(target).find('.layer_footer > .btn_area > a').eq(0).trigger('click');
                }
            });                                    
        });
        var config = {
            attributes : true // target 속성 변경 감지시
        }
        observer.observe(target, config);
    }
    
}

////////////////////////////////////////////////////////
//////// PC관련 웹접근성 focus관련 ////////////////

// PC팝업 재촬영 버튼 hidden 처리
function addFocus(elm) {
    var $elm = $(elm);
    $elm.addClass('layer_btn_focus');
}


function accessibilityFn(){
    // focusin 이벤트 //
    $(document).focusin(function(e) {
        var $elm = $(e.target); 

        if ($elm.closest('#breadscrumbs, #breadscrumbs_menu').length == 0){
            $('#breadscrumbs_menu').slideUp(); 
            $('#breadscrumbs_menu').find('.breadscrumbs_info').removeClass("active"); 
        } 

        if ($elm.closest('#menu').length == 0){
            //console.log($elm.closest('#menu').length);   
            gnbHide();
        }

        if ($elm.closest('.select_list').length == 0){
            //console.log($elm.closest('.select_list').length);   
            $('.mo_select_item.num_selectbox .select_list > ul').hide();
        }
    });

    $(document).on('focus', 'button, a, input, select', function(e){
        $(this).attr('data-focused','true');
    });

    $(document).on('blur', 'button, a, input, select', function(e){
        $(this).removeAttr('data-focused');
    });
}



