// 아이디 값으로 비활성화(id)
var domDisabled = function(id) {
	$("#" + id).attr("disabled", "disabled");
};

// 아이디 값으로 비활성화(ids)
var domDisableds = function(ids) {
	$.each(ids, function(index, id) {
		domDisabled(id);
	});
};

// 아이디 값으로 활성화(id)
var domEnabled = function(id) {
	$("#" + id).removeAttr("disabled");
};

// 아이디 값으로 활성화(ids)
var domEnableds = function(ids) {
	$.each(ids, function(index, id) {
		domEnabled(id);
	});
};

/*
 * input value 초기화(id)
 */
var valueClear = function(id) {
	$("#" + id).val("");
};

/*
 * input value 초기화(ids)
 */
var valueClears = function(ids) {
	$.each(ids, function(index, id) {
		valueClear(id);
	});
};

// 아이디 값으로 dom show
var domShow = function(id) {
	$("#" + id).show();
};

// 아이디 값으로 dom show(ids)
var domShows = function(ids) {
	$.each(ids, function(index, id) {
		domShow(id);
	});
};

// 아이디 값으로 dom hide
var domHide = function(id) {
	$("#" + id).hide();
};

// 아이디 값으로 dom hide(ids)
var domHides = function(ids) {
	$.each(ids, function(index, id) {
		domHide(id);
	});
};

var fnClearValue = function(divId, ab) {
	var $contents = $("#" + divId + " :input");
	var node, id;

	for (var i = 0; i < $contents.length; i++) {
		node = $contents.eq(i);
		id = node.attr('id');

		if (id == "" || id == "undefined")
			continue;

		if (node.prop('type') == "text" || node.prop('type') == "textarea"
				|| node.prop('type') == "email") {
			node.val("");
		} else if (node.prop('type').indexOf("select") > -1) {
			$("#" + id + " option:eq(0)").prop("selected", true);
		} else if (node.prop('type') == "radio") {// radio

		} else if (node.prop('type') == "checkbox") {
			$("#" + id).iCheck('uncheck');
		}

	}

};

var fnSetAbility = function(divId, ab) {
	var $contents = $("#" + divId + " :input");
	var node, id;

	for (var i = 0; i < $contents.length; i++) {
		node = $contents.eq(i);
		id = node.attr('id');

		if (id == "" || id == "undefined")
			continue;
		if (ab) {
			$("#" + id).removeAttr("disabled");
		} else {
			$("#" + id).attr("disabled", "disabled");
		}

		if ($("#" + id).parent().hasClass("input-group date")
				|| $("#" + id).parent().hasClass("input-group clockpicker")) {

			$("#" + id).parent().css("pointer-events", ab ? "auto" : "none");

		}
	}
};

/*
 * 공백체크
 */
var isEmpty = function(value) {
	if (typeof value == "number") {
		// 숫자의 경우 분리
		if (value == null || value == undefined) {
			return true;
		} else {
			return false;
		}
	} else {
		if (value == ""
				|| value == null
				|| value == undefined
				|| (value != null && typeof value == "object" && !Object
						.keys(value).length)) {
			return true;
		} else {
			return false;
		}
	}

};





/*
 * 주민번호 유효성 검사
 */
var checkJumin = function(chkNum) {

	var strJumin = "" + chkNum;
	var checkBit = new Array(2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5);
	var num7 = strJumin.substr(6, 1);
	var num13 = strJumin.substr(12, 1);
	
    
	var total = 0;
	if (strJumin.length == 13) {
		for (i = 0; i < checkBit.length; i++) { // 주민번호 12자리를 키값을 곱하여 합산한다.
			total += strJumin.substr(i, 1) * checkBit[i];
		}
		// 외국인 구분 체크
		if (num7 == 0 || num7 == 9) { // 내국인 ( 1800년대 9: 남자, 0:여자)
			total = (11 - (total % 11)) % 10;
		} else if (num7 > 4) { // 외국인 ( 1900년대 5:남자 6:여자 2000년대 7:남자, 8:여자)
			total = (13 - (total % 11)) % 10;
		} else { // 내국인 ( 1900년대 1:남자 2:여자 2000년대 3:남자, 4:여자)
			total = (11 - (total % 11)) % 10;
		}
		
		//생년월일 검증 시작
		var birth_year = strJumin.substring(0,2);
		var birth_month = Number(strJumin.substring(2,4));
	    var birth_day   = Number(strJumin.substring(4,6));
	    
	    if(num7 == "1" || num7 == "2" || num7 == "5" || num7 == "6"){
	    	birth_year = "19" + birth_year;
	    }else if(num7 == "3" || num7 == "4" || num7 == "7" || num7 == "8"){
	    	birth_year = "20" + birth_year;
	    }
	    birth_year = Number(birth_year);
	    
	    if(birth_month < 1 || birth_month > 12){
	    	return false;
	    }
	    if(birth_day < 1 || birth_day > 31){
	    	return false;
	    }
	    if((birth_month == 4 || birth_month == 6 || birth_month == 9 || birth_month == 11) && birth_day == 31){
	    	return false;
	    }
	    if(birth_month == 2 ){
	    	var isleap = (birth_year % 4 == 0 && (birth_year % 100 != 0 || birth_year % 400 == 0));
	    	if(birth_day > 29 || (birth_day == 29 && !isleap)) {
	    		return false;	
	    	}
	    }
	    //생년월일 검증 종료


		if ( total != num13) {	
			//return false; 2020.05.26 행안부 개인정보보호강화 일환으로 뒷자리 검증항목 제거
			return true;
		}
		return true;
	} else {
		return false;
	}

	return true;

}

/*
 * 외국인번호 유효성 검사
 */
var checkForeigner = function(chkNum) {

	var strJumin = "" + chkNum;
	var checkBit = new Array(2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5);
	var num7 = strJumin.substr(6, 1);
	var num13 = strJumin.substr(12, 1);
	var total = 0;
	if (strJumin.length == 13) {
		for (i = 0; i < checkBit.length; i++) { // 주민번호 12자리를 키값을 곱하여 합산한다.
			total += strJumin.substr(i, 1) * checkBit[i];
		}
		
		// 외국인 구분 체크
		if (num7 > 4) { // 외국인 ( 1900년대 5:남자 6:여자 2000년대 7:남자, 8:여자)
			total = (13 - (total % 11)) % 10;
		}

		if (total != num13) {
			return false;
		}
		return true;// 외국인
	} else {
		return false;
	}

	return true;

}

/*
 * 미성년 체크
 */
var checkAdult = function(chkNum) {

	var today = new Date();
	
	var now_year  = today.getFullYear(); 
    var now_month = today.getMonth() + 1 ; // 0부터 시작하므로 1더함 더함
    var now_day   = today.getDate();
    
    var jumin = "" + chkNum;
    
    var birth_year  =  jumin.substring(0,2);
    var birth_month =  jumin.substring(2,4);
    var birth_day   =  jumin.substring(4,6);
    
    var sex  =  jumin.substring(6,7);
    
    var full_year = "";
    
    if(sex == "1" || sex == "2"){
    	full_year = "19" + birth_year;
    }else if(sex == "3" || sex == "4"){
    	full_year = "20" + birth_year;
    }
    
    var age = now_year - Number(full_year);
    
    var man_age = age;
    
    if(now_month < birth_month){
    	man_age = age - 1;
    }else if(now_month == birth_month){
    	if(now_day < birth_day){
    		man_age = age - 1;
    	}
    }
    	
    if(man_age >= 19){
    	return true;
    } else {
    	return false;
    }
    
}



function getYYYYMMDDHHMMSS() { 
	var date = new Date();
	   
    var year  = date.getFullYear(); 
    var month = date.getMonth() + 1 ; // 0부터 시작하므로 1더함 더함
    var day   = date.getDate();
    var hh    = date.getHours();
    var mm    = date.getMinutes();
    var ss    = date.getSeconds();
    
    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + day).length   == 1) { day   = "0" + day;   }
   
    if( hh < 10 ) {
		hh = "0" + hh;
	} 
    
	if( mm < 10 ) {
		mm = "0" + mm;
	} 

	if( ss < 10 ) {
		ss = "0" + ss;
	} 

	return (year + "" + month + "" + day + "" + hh + "" + mm + "" + ss);  

}

/*
 * 법인번호 유효성 체크
 */
var checkCorpNo = function(chkNum) {
	var corpNo = chkNum;
	if (corpNo == "" || corpNo == null || corpNo.length != 13) {
		return false;
	} else {
		return true;
	}
	return true;
}


jQuery.download = function(url, data, method) {
	// url과 data를 입력받음
	if (url && data) {
		// data 는 string 또는 array/object 를 파라미터로 받는다.
		data = typeof data == 'string' ? data : decodeURIComponent(jQuery.param(data));

		var f = makeformDownload(url, method);

		// 파라미터를 form의 input으로 만든다.
		var inputs = '';
		jQuery.each(data.split('&'), function () {
			var pair = this.split('=');

			var x = document.createElement("INPUT");
			x.setAttribute("type", "hidden");
			x.setAttribute("name", pair[0]);
			x.setAttribute("value", pair[1]);
			f.appendChild(x);
		});
		f.submit();
	}
};

/**
 * 두 날짜 사이 일자 반환
 * @param _date1 시작일(YYYYMMDD)
 * @param _date2 종료일(YYYYMMDD)
 * @returns 차이일
 */
function getDateDiff(_date1, _date2) {

	if (_date1 == null || _date1 == '')
		return '';
	if (_date2 == null || _date2 == '')
		return '';
	if (!/^(\d){8}$/.test(_date1))
		return "invalid date";
	if (!/^(\d){8}$/.test(_date2))
		return "invalid date";

	var yy1 = _date1.substr(0, 4), mm1 = _date1.substr(4, 2) - 1, dd1 = _date1
			.substr(6, 2);

	var diffDate_1 = new Date(yy1, mm1, dd1);

	var yy2 = _date2.substr(0, 4), mm2 = _date2.substr(4, 2) - 1, dd2 = _date2
			.substr(6, 2);

	var diffDate_2 = new Date(yy2, mm2, dd2);

	var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
	diff = Math.ceil(diff / (1000 * 3600 * 24));
	diff = diff + 1;
	return diff;
}

/**
 * alert 팝업
 * message          : 팝업에 표시할 메시지
 * title             : 팝업에 표시할 제목
 * showCancelButton : 취소버튼 표시여부 {true, false}
 * buttonText       : '확인' 버튼 표시 대신할 문자열
 * callback         : '확인' 버튼 클릭 시 호출할 함수, string type으로 입력 시 해당 id에 포커스
 * callbackCancel   : '취소' 버튼 클릭 시 호출할 함수, string type으로 입력 시 해당 id에 포커스
 * popType          : 팝업 타입
 *                    null or '' : 기본형
 *                    'bottom' : 하단에서 올라오는 팝업
 *                    'full' : FULL 화면 팝업
 *                    
 * 
 * 얼랏팝업 : popalarm("로그아웃 하시겠습니까?", "info", false);
 * 확인팝업 : popalarm("로그아웃 하시겠습니까?", "check", false);
 * 안내팝업 : popalarm("로그아웃 하시겠습니까?", "info", true, '', logout);
 */
var popalarm = function (message, title, showCancelButton, buttonText, callback, callbackCancel, popType) {
	
	var obj = {};
	obj.message          = message;
	obj.title            = title;
	obj.showCancelButton = showCancelButton;
	obj.buttonText       = buttonText;
	obj.callback         = callback;
	obj.callbackCancel   = callbackCancel;
	obj.popType          = popType;
	
	this.alert_layer(obj);
}


/**
 * alert layer
 */
var alert_layer = function (obj) {
	$("#common_layerAlert").remove();
	if(!$("#pwdCertLayer").hasClass("modal_up")) {
		//$('.dimmed').last().remove();	
	}
	
	if($('.mlayer_pop.modal_up:visible').length == 0 && $('.dimmed').length > 1) {
		$('.dimmed').not(":first").remove();
	}
	
	var tLayerMainCss = "mlayer_pop";
	var tLayerSubCss = "layer_content";
	var tPopTypeCss = "";
	var tPopTypeBtn = "";
	if( !isEmpty(obj.popType) ) {
		if(obj.popType == "bottom"){
			tLayerMainCss = "mlayer_pop";
			tLayerSubCss = "layer_content";
			tPopTypeCss = "fixed_bottom";
			tPopTypeBtn = "<button type=\"button\" class=\"btn layer_close\" data-dismiss=\"modal\"><span>닫기</span></button>";
		}
		else if(obj.popType == "full"){
			tLayerMainCss = "flayer_pop";
			tLayerSubCss = "flayer_wrap";
			tPopTypeCss = "";
			tPopTypeBtn = "<button type=\"button\" class=\"btn layer_close\" data-dismiss=\"modal\"><span>닫기</span></button>";
		}
	}
	
	var tHtml = "";
	tHtml += "<div id=\"common_layerAlert\" class=\""+tLayerMainCss+" "+tPopTypeCss+"\">";
	tHtml += "    <div class=\" "+tLayerSubCss+" \">";
	tHtml += "        <div class=\"layer_header\" style=\"display:none;\">";
	tHtml += "            <h3 class=\"pop_title\"></h3>";
	tHtml += "        </div>"; 
	tHtml += "        <div class=\"layer_body\">";
	tHtml += "            <div class=\"message\">메시지 내용</div>";
	tHtml += "        </div>";
	tHtml += "        <div class=\"layer_footer\">";
	tHtml += "            <div class=\"btn_area\"> ";   
	tHtml += "                <button type=\"button\" name=\"btn_layer_cancel\" style=\"display:none;\" class=\"btn btn_white layer_close\">취소</button>";
	tHtml += "                <button type=\"button\" name=\"btn_layer_ok\" class=\"btn btn_default layer_close\">확인</button>"; 
	tHtml += "            </div> ";           
	tHtml += "        </div> ";
	tHtml += tPopTypeBtn;
	tHtml += "    </div> ";
	tHtml += "</div> ";
	
	$("body").append(tHtml);
    
	// title
	if( !isEmpty(obj.title) ) {
		if(obj.title != "info" && obj.title != "check"){
			$("#common_layerAlert > div > div.layer_header > h3.pop_title").html(obj.title);
			$("#common_layerAlert > div > div.layer_header").show();
		}
	}
	
	// message
	if( !isEmpty(obj.message) ) {
		$("#common_layerAlert > div > div.layer_body > div.message").html(obj.message);
	}
	
	// 확인버튼텍스트
	if( !isEmpty(obj.buttonText) ) {
		$("#common_layerAlert > div > div > div.btn_area > button.btn.btn_default").text(obj.buttonText)
	}

	//콜백
	if( !isEmpty(obj.callback) || !isEmpty(obj.callbackCancel)) {
		if( !isEmpty(obj.callback) ) {
			$('#common_layerAlert > div > div > div.btn_area > button[name=btn_layer_ok]').click(function (e){
				if (typeof obj.callback === "function") {
					e.preventDefault();
					setTimeout(function(){ obj.callback.call(); }, 10);
					$("#common_layerAlert > div > div > div.btn_area > button.btn").unbind("click");
				} else if (typeof obj.callback === "string") {
					setTimeout(function(){ $('#'+obj.callback).focus(); }, 1);
				}
				$('#common_layerAlert').next('.dimmed').remove();
				$('#common_layerAlert').remove();
				$('body').removeClass('layer_pop_on');
				//$('.dimmed').last().remove();
			});
		}
		if( !isEmpty(obj.callbackCancel) ) {
			$('#common_layerAlert > div > div > div.btn_area > button[name=btn_layer_cancel]').click(function (e){
				if (typeof obj.callbackCancel === "function") {
					e.preventDefault();
					obj.callbackCancel.call();  
					$("#common_layerAlert > div > div > div.btn_area > button.btn").unbind("click");
				} else if (typeof obj.callbackCancel === "string") {
					setTimeout(function(){ $('#'+obj.callbackCancel).focus(); }, 1);
				}
				$('#common_layerAlert').next('.dimmed').remove();
				$('#common_layerAlert').remove();
				$('body').removeClass('layer_pop_on');
				//$('.dimmed').last().remove();
				
			});
		} else {
			$("#common_layerAlert > div > div > div.btn_area > button:nth-child(1)").click(function(e){ 
				$("#common_layerAlert > div > div > div.btn_area > button.btn").unbind("click");
			});
		}
	}
	
	if (isEmpty(obj.callback) ) {
		$('#common_layerAlert > div > div > div.btn_area > button[name=btn_layer_ok]').click(function (){
			$('#common_layerAlert').next('.dimmed').remove();
			$('#common_layerAlert').remove();
			$('body').removeClass('layer_pop_on');
			//$('.dimmed').last().remove();
			
		});
	}

	if (isEmpty(obj.callbackCancel) ) {
		$('#common_layerAlert > div > div > div.btn_area > button[name=btn_layer_cancel]').click(function (){
			$('#common_layerAlert').next('.dimmed').remove();
			$('#common_layerAlert').remove();
			$('body').removeClass('layer_pop_on');
			//$('.dimmed').last().remove();
			
		});
	}
	
	setTimeout(function(){
        modalLayer.show('common_layerAlert');
    }, 10);
	
	var showCancelButton = false;
	if(obj.showCancelButton == 'true' || obj.showCancelButton == true) { showCancelButton = true;} else { showCancelButton = false;}
	if(showCancelButton) {
		$("#common_layerAlert > div > div > div.btn_area > button:nth-child(1)").show();
	} else {
		$("#common_layerAlert > div > div > div.btn_area > button:nth-child(1)").hide();
	}
	
	if( !isEmpty(obj.popType) ) {
		if(obj.popType == "full"){
			$('body').find('.flayer_pop').removeClass('modal_up');
		}
	}
};

//loading 관련 추가 ('start')('stop')로 활성제어
var loading = function(state) {
	var s = state;
	var loading = '<div class="dimmed"></div><div class="ani_img"><span class="blind">Loading...</span></div>';

	if (s == 'start') {
		$('.loading').append(loading).css('display', 'block');
	} else if (s == 'stop') {
		$('.loading > *').remove();
		$('.loading').css('display', 'none');
	}
};

/* --- 숫자만 리턴 --- */
function onlyNum(val)
{
 var num = val;
 var tmp = "";

 for (var i = 0; i < num.length; i ++)
 {
  if ( (num.charAt(i) >= 0 && num.charAt(i) <= 9) || num.charAt(i) == '*')
   tmp = tmp + num.charAt(i);
  else
   continue;
 }
 return tmp;
}

//숫자만
function onlyNumInput(obj)
{
	 $(obj).val( $(obj).val().replace( /[^0-9]/g, '' ) );// 숫자만입력
}

//숫자 입력필드
function onlyNumberInput(obj)
{
	 $(obj).val( $(obj).val().replace( /[^0-9\-\*]/g, '' ) );// 숫자만입력(*, - 제외)
	 //$(obj).val( $(obj).val().replace( /[^0-9]/g, '' ) );// 숫자만입력
}

/* --- 카드번호 형식 (onKeyUp 이벤트) --- */
function cardFormat(obj)
{

 var str = onlyNum(obj.value);
 var leng = str.length;

 switch(leng)
 {
  case  1 :
  case  2 :
  case  3 :
  case  4 : obj.value = str; break;
  case  5 :
  case  6 :
  case  7 :
  case  8 : obj.value = str.substring(0, 4) + "-" + str.substring(4, 8); break;
  case  9 :
  case 10 :
  case 11 :
  case 12 : obj.value = str.substring(0, 4) + "-" + str.substring(4, 8)  + "-" + str.substring(8, 12); break;
  case 13 :
  case 14 :
	  obj.value = str.substring(0, 4) + "-" + str.substring(4, 8) + "-" + str.substring(8, 12) + "-" + str.substring(12, 14); break;
      break;
  case 15 :
	  obj.value = str.substring(0, 4) + "-" + str.substring(4, 8) + "-" + str.substring(8, 12) + "-" + str.substring(12, 15); break;
      break;
  case 16 :
	  obj.value = str.substring(0, 4) + "-" + str.substring(4, 8) + "-" + str.substring(8, 12) + "-" + str.substring(12, 16); break;
      break;
 }

}


/* --- 카드번호 유효기간 형식 (onKeyUp 이벤트) --- */
function termFormat(obj)
{

 var str = onlyNum(obj.value);
 var leng = str.length;

 switch(leng)
 {
  case  1 :
  case  2 : obj.value = str; break;
  case  3 :
  case  4 : obj.value = str.substring(0, 2) + "/" + str.substring(2, 4); break;
 }

}

//카드유효기간 날짜 체크
function chkValidTerm(mmyy){
	if(mmyy != null && mmyy.length > 4){
		var mm = mmyy.substring(0,2);
		if( Number(mm) > 12 ){
			return false;
		} else {
			var dt = new Date();
			var curyy = dt.getFullYear()+"";//현재년도
			var curmm = dt.getMonth()+1+"";//현재월

//console.log("curmm.length = " + curmm.length);

			if(curmm.length == 1){
				curmm = "0"+curmm;
			}

			curyy = curyy.substring(2,4);

			var yy = mmyy.substring(3,5);
//console.log(Number(yy+mm) + '   ' + Number(curyy+curmm) );
			if( Number(yy+mm) < Number(curyy+curmm) ){//현재년월 보다 작을때
				return false;
			} else {
				return true;
			}
		}
	}//end if
}

function maxLengthCheck(object){
    if (object.size >= object.maxLength){
        object.value = object.value.slice(0, object.maxLength);
    }
}

/* --- 운전면허번호 형식 (onKeyUp 이벤트) --- */
function driverFormat(obj)
{

 var str = onlyNum(obj.value);
 var leng = str.length;

 switch(leng)
 {
  case  1 :
  case  2 : obj.value = str; break;
  case  3 :
  case  4 :
  case  5 :
  case  6 :
  case  7 :
  case  8 : obj.value = str.substring(0, 2) + "-" + str.substring(2, 8); break;
  case  9 :
  case 10 :
	  obj.value = str.substring(0, 2) + "-" + str.substring(2, 8) + "-" + str.substring(8, 10); break;
      break;
 }

}

function isValidDate(param) {
    try
    {
        param = param.replace(/-/g,'');

        // 자리수가 맞지않을때
        if( isNaN(param) || param.length!=8 ) {
            return false;
        }

        var year = Number(param.substring(0, 4));
        var month = Number(param.substring(4, 6));
        var day = Number(param.substring(6, 8));

        //var dd = day / 0;

        if( month<1 || month>12 ) {
            return false;
        }

        var maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var maxDay = maxDaysInMonth[month-1];

        // 윤년 체크
        if( month==2 && ( year%4==0 && year%100!=0 || year%400==0 ) ) {
            maxDay = 29;
        }

        if( day<=0 || day>maxDay ) {
            return false;
        }
        return true;

    } catch (err) {
        return false;
    }
}

function cardNoFrmt(obj,gb)
{

 var str = onlyNum(obj.value);
 var leng = str.length;

 switch(leng)
 {
  case  1 :
  case  2 :
  case  3 :
  case  4 : //obj.value = str; break;
  case  5 :
  case  6 :
  case  7 :
  case  8 : //obj.value = str.substring(0, 4) + "-" + str.substring(4, 8); break;
  case  9 :
  case 10 :
  case 11 :
  case 12 : //obj.value = str.substring(0, 4) + "-" + str.substring(4, 8)  + "-" + str.substring(8, 12); break;
  case 13 :
  case 14 : obj.value = str.substring(0, 4) + "-" + "**" + "-" +  str.substring(6, 10)  + "-" + str.substring(10, 14);    break; //다이너스
  case 15 : obj.value = str.substring(0, 4) + "-" + "***" + "-" + str.substring(7, 11) + "-" + str.substring(11, 15); break;//AMEX
  case 16 :
	  		obj.value = str.substring(0, 4) + "-" + str.substring(4, 8) + "-" + "****" + "-" + str.substring(12, 16);  break;
	  //obj.value = str.substring(0, 4) + "-" + str.substring(4, 8) + "-" + str.substring(8, 12) + "-" + str.substring(12, 16); break;
      break;
 }

}

/*
 * 신용카드번호 마스킹, 하이픈 추가
 * str : 신용카드번호 14~16자리(하이픈 포함 가능)
 * isMask : 마스킹 여부
 * return : 14자리 : 1111-**-3333-4444
 *				15자리 : 1111-***-3333-4444
 *				16자리 : 1111-2222-****-4444
 *                
 */
function maskHyphenCardNo(str, isMask) {
	if(isEmpty(str)) {
		return str;
	}
	
	var defPattern = /^(\d{4})-?(\d{4})-?(\d{4})-?(\d{4})$/; // 기본
	var acrdPattern = /^(\d{4})-?(\d{3})-?(\d{4})-?(\d{4})$/; // AMEX
	var dcrdPattern = /^(\d{4})-?(\d{2})-?(\d{4})-?(\d{4})$/; // 다이너스
	
	if(defPattern.test(str)) {
		return str.replace(defPattern, (isMask ? "$1-$2-****-$4" : "$1-$2-$3-$4"));
	} else if(acrdPattern.test(str)) {
		return str.replace(acrdPattern, (isMask ? "$1-***-$3-$4" : "$1-$2-$3-$4"));
	} else if(dcrdPattern.test(str)) {
		return str.replace(dcrdPattern, (isMask ? "$1-**-$3-$4" : "$1-$2-$3-$4"));
	}
	
	return str;
}

function crdNextPage(mod){
	var url = '';
	if(mod == 'P'){
		url = '/system/login/setPs';
	}else if(mod == 'I'){
		url = '/system/login/findIdCheck';
	} 
	
	$('#nextCrdForm')
	.attr("action", url)
	.attr("method", "post").submit();
}

function nextPage(mod){
	var url = '';
	if('P' == mod){
		url = '/system/login/setPs';
	}else if('I' == mod){
		url = '/system/login/findIdCheck';
	} 
	
	$('#nextForm')
	.attr("action", url)
	.attr("method", "post").submit();
}


var setCookie = function(name, value, day) {
	var date = new Date();
	date.setTime(date.getTime() + day*24*60*60*1000);
	document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}

var getCookie = function(name) {
	var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return value ? value[2] : null;
}

var deleteCookie = function(name) {
	var date = new Date();
	document.cookie = name + "= " + " expires=" + date.toUTCString() + "; path=/";
}

function goStep(frm,url) {
	$("#"+frm).attr("action", url);
	$("#"+frm).submit();
}


function getServerNow() {
	
	$.ajax({
	    url:  '/system/main/getServerNow',
	    type: 'POST',
	    success: function(data) {
	    	console.log(data.curdttm);
	    	return data.curdttm;
	    },
	    error: function(e) {
			console.log(e.responseText.trim());
			return '';
	    },
	    complete: function() {}
	});
	
	return '';
}

//문자열에서 공백제거
function removeStrSpace(str){
	var tmpStr = str;
	if(tmpStr != null){
		tmpStr = tmpStr.replace(/\s/gi,"");
	}
	return tmpStr;
}

var callMsgPC = 'PC환경에서는 전화연결을 하실수 없습니다.<br/>모바일 기기로 접속해 주세요.';

//고객센터 클릭
function connectCallCenter() {
    if(deviceTypeSet == 'pc'){
       popalarm(callMsgPC, "info", false);
    } else {
       popalarm("Liiv M 고객상담센터 1522-9999(유료) 로 연결하시겠습니까?", "check", true, '', callbackCallCenter);
    }
}

//고객센터 연결 콜백
function callbackCallCenter() {
	location.href="tel:1522-9999";
}

//114 클릭
function connectCall114() {
    if(deviceTypeSet == 'pc'){
       popalarm(callMsgPC, "info", false);
    } else {
        popalarm("Liiv M 고객센터 114(무료, Liiv M 가입자 대상) 로 연결하시겠습니까?", "check", true, '', callbackCall114);
    }
}

//114 연결 콜백
function callbackCall114() {
	location.href="tel:114";
}

// 전문 prodNo
function getProdNoUseSvcNo(type) {
	var svcNoArray = $("li[data-name='userSvcNoList_onside'].selected > button").val().split("-");
	var prodNo = '';
	if(type == 'svcTelNo'){
		if(svcNoArray.length==3) {
			prodNo = svcNoArray[0]+svcNoArray[1]+svcNoArray[2];	
		}
	}
	else{
		//console.log('type='+type);
		if(svcNoArray.length==3) {
			prodNo = svcNoArray[0]+'0'+svcNoArray[1]+svcNoArray[2];	
		}
	}
	return prodNo;
}


/**
 * 기준날짜에서 계산일자를 더한 날짜를 반환
 * 
 * @param date 기준날짜
 * @param calcVal 계산일자
 * @returns 계산결과날짜
 */
function calcDate(date, calcVal) {
//	if(!date || calcVal == 0) {
	if(!date) {
		return date;
	}
	var y, m, d;
	if(typeof date === 'string') {
		var nDate = numberFormatter(date);
		if(nDate.length === 8) {
			y = Number(nDate.substr(0, 4));
			m = Number(nDate.substr(4, 2))-1;
			d = Number(nDate.substr(6));
			date = new Date(y, m, d);
			date.setDate(date.getDate() + calcVal);
		}
	} else if(typeof date.getDate === 'function') {
		date.setDate(date.getDate() + calcVal);
	}
	return date;
}


/**
 * 기준날짜에서 계산일자를 더한 날짜를 반환
 * 
 * @param date 기준날짜
 * @param calcVal 계산일자
 * @returns 계산결과날짜
 */
function calcLocDttm(date, calcVal) {
	if(!date) {
		return date;
	}
//	calcVal = (32400+calcVal)/3600;
	var y, m, d, h, i, s;
	if(typeof date === 'string') {
		var nDate = numberFormatter(date);
		if(nDate.length === 14) {
			y = Number(nDate.substr(0, 4));
			m = Number(nDate.substr(4, 2))-1;
			d = Number(nDate.substr(6, 2));
			h = Number(nDate.substr(8, 2));
			i = Number(nDate.substr(10, 2));
			s = Number(nDate.substr(12, 2));
			date = new Date(y, m, d, h, i, s);
			date.setHours(date.getHours() - calcVal);
		}
	} else if(typeof date.getHours === 'function') {
		date.setHours(date.getHours() - calcVal);
	}
	return date;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//인터페이스 호출 공통. ajax 정보 리턴
function callCommIF(url, base) {
	var ajax = $.ajax({
		type: 'POST',
		url: url, 
		data: fnSign(JSON.stringify(base)),
		contentType: 'application/json; charset=utf-8',
		cache: false,
		dataType: "json"
	});
	
	return ajax;
}

//고객정보조회 인터페이스 연동
function callKBCustInfoIF(custId) {
	var serviceId = "ITB001";
	var base = new Object();
	base.serviceId = serviceId;
	
	var data = new Object();
	data.cuniqnoDstic = "3";
	data.cuniqno = custId;
	base.data = data;
	
	console.info("고객정보조회 요청" + "(" + serviceId +")" + " : " + JSON.stringify(base));
	
	//인터페이스 호출 공통
	return callCommIF('/appIf/v1/kb/eai/' + serviceId, base);
}

//할인팝업 문구 초기화
function initDiscountInfo(){
	$("[data-id=divBeforeSixMonth]").hide();
	$("[data-id=divStarclub]").hide();
	$("[data-id=discountInfoJehu]").hide();
	$("[data-id=discountInfoUserJoin]").hide();
	$("[data-id=basicDtl]").hide();
	$("[data-id=juniorDtl]").hide();
	$("[data-id=smartDtl]").hide();
	$("[data-id=flexDtl]").hide();
	$("[data-id=militaryDtl]").hide();
	$("[data-id=reliableDtl]").hide();
	$("[data-id=eventDtl01]").hide();
	$("[data-id=petDtl]").hide();
	$("[data-id=basicImprvDtl]").hide();
	$("[data-id=watchDtl]").hide();
	$("[data-id=discountInfoHouseOpenbaking]").hide();
	$("[data-id=discountInfoMajorCust]").hide();
	$("[data-id=discountInfoMobileMix]").hide();
	$("[data-id=discountInfoHouseOpenbaking2]").hide();
	$("[data-id=discountInfoSalary]").hide();
	$("[data-id=discountInfoMVP]").hide();
	$("[data-id=discountInfoQR]").hide();
	$("[data-id=discountInfoSavings]").hide();					    		
	$("[data-id=discountInfoMVP2]").hide();
	$("[data-id=discountInfoLongTerm]").hide();
	$("[data-id=discountInfoDeal2]").hide();
	$("[data-id=discountInfoSave]").hide();
	$("[data-id=discountInfoEvent01]").hide();
	$("[data-id=discountInfoPet]").hide();
	$("[data-id=discountInfoImprvCard1]").hide();
	$("[data-id=discountInfoImprvCard2]").hide();
	$("[data-id=discountInfoImprvDeal]").hide();
	$("[data-id=discountInfoImprvStarclub]").hide();
	$("[data-id=discountInfoImprvUserJoin]").hide();
	$("[data-id=discountInfoEvent619]").hide();
	$("[data-id=discountInfoWatchMobile]").hide();
	$("[data-id=discountInfoEvent12001]").hide();
	$("[data-id=discountInfoEvent01001]").hide();
	
}

//할인팝업
function getKBDiscountInfoByCtrt(ctrtId, objectId, discountCheck) {
	var isUnder6month = true;
	var isUnder3svc = true;
	var discountCheckArr = new Array();
	try{
		discountCheckArr = discountCheck.split(",");
	}
	catch(e){
		console.log(e);
	}
	
	if(discountCheckArr.length==3 && discountCheckArr[0]>3) {
		isUnder3svc = false;
	}
	if(discountCheckArr.length==3 && discountCheckArr[1]=='N') {
		isUnder6month = false;
	}
	
	if (isUnder6month && isUnder3svc) { // 가입개월수, 회선수 체크
		$("[data-id=divBeforeSixMonth]").addClass("usimjoin_para02");
		$("[data-id=ulBeforeSixMonth]").show();
		$("[data-id=divDefaultDiscount]").addClass("usimjoin_para02_inner");
		$("[data-id=divDefaultDiscount]").removeClass("usimjoin_para lineup");
		// default discountCodeA는 삭제하지 않음
		$("li[data-name='discountCodeB']").each(function() {
			$(this).children('span').remove();
		});
	} else {
		$("[data-id=divBeforeSixMonth").removeClass("usimjoin_para02");
		$("[data-id=ulBeforeSixMonth]").hide();
		$("[data-id=divDefaultDiscount]").removeClass("usimjoin_para02_inner");
		$("[data-id=divDefaultDiscount]").addClass("usimjoin_para lineup");
		$("li[data-name='discountCodeA']").each(function() {
			$(this).children('span').remove();
		});
		$("li[data-name='discountCodeB']").each(function() {
			$(this).children('span').remove();
		});
	}

	var totDiscountAmt = 13200;
	
	if(isEmpty(ctrtId)) {
		if(!isEmpty(objectId)) { // 1차 Set 연동 안탈때
			totDiscountAmt = 4400;
			$("#"+objectId).html(amountFormatter(totDiscountAmt));
			
			initDiscountInfo(); //할인문구 초기화
			
    		$("[data-id=discountInfoImprvDeal]").show();
    		$("[data-id=discountInfoImprvStarclub]").show();
    		$("[data-id=discountInfoImprvUserJoin]").show();
    		
		}
	} else {
		var data = $("li[data-name='userSvcNoList_onside'].selected > button").attr("data-map");
		try{
			data = data.replace(/'/gi,"\"");
			data = jQuery.parseJSON(data);
			
			$.ajax({
				    url:  '/system/main/getDiscountInfoByCtrt',
				    type: 'POST',
				    data : {ctrtId : data.ctrtId, custId : data.custId, serviceId: data.serviceId},
				    success: function(data) {
				    	try{
				    		initDiscountInfo(); //할인문구 초기화
				    		
					    	var vProdGrp = data.data.prodGrp;
					    	var vProdCd = data.data.prodCd;
					    	var returnObj = data.data;

					    	if(vProdGrp=="U01" || vProdGrp=="U02"){
					    		if(vProdCd == "PD00000555"){
					    			totDiscountAmt = 0;
						    		limitCap = 5500;
						    		
					    			$("[data-id=eventDtl01]").show();
						    		$("[data-id=discountInfoEvent01]").show();
						    								    	
						    		var discountMap = data.data.dccodeHm;
							    	var discountArray = data.data.dccodeList;
							    	for (var i=0; i<discountArray.length; i++) {
							    		if(jQuery.inArray(discountArray[i], ["LDZ0020001"]) >= 0 ) {
							    			// 이벤트할인
							    			var tempDcode = "LDZ0020001";
											if( $("li[data-id='"+tempDcode+"']").children().length == 0 ) {
												$("li[data-id='"+tempDcode+"']").prepend('<span>check</span>');
											}
										}
							    		else if(jQuery.inArray(discountArray[i], ["TOT_DSCNT_CAP"]) >= 0 ) {
							    			if(totDiscountAmt < limitCap) {
												totDiscountAmt = discountMap[discountArray[i]]*1;
											}
							    			if(!isEmpty(objectId)) { // 2차 Set 연동 타고 나서
									    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
									    	}
							    		}
									}
							    	if(totDiscountAmt > limitCap) {
							    		if(!isEmpty(objectId)) { 
								    		$("#"+objectId).html(amountFormatter(limitCap));
								    	}
									}
					    		}
					    		else{
					    			$("[data-id=divBeforeSixMonth]").show();
						    		$("[data-id=divStarclub]").show();
						    		$("[data-id=discountInfoJehu]").show();
						    		$("[data-id=discountInfoUserJoin]").show();
						    		$("[data-id=basicDtl]").show();
						    		
							    	if (isUnder6month && isUnder3svc) {
							    		totDiscountAmt = 13200;
							    		if( $("li[data-name='discountCodeA'][data-id='LDZ0002542']").children().length == 0 ) {
							    			$("li[data-name='discountCodeA'][data-id='LDZ0002542']").prepend("<span>check</span>");
							    		}
							    		if( $("li[data-name='discountCodeA'][data-id='LDZ0002543']").children().length == 0 ) {
							    			$("li[data-name='discountCodeA'][data-id='LDZ0002543']").prepend("<span>check</span>");
							    		}
							    		if( $("li[data-name='discountCodeA'][data-id='LDZ0002544']").children().length == 0 ) {
							    			$("li[data-name='discountCodeA'][data-id='LDZ0002544']").prepend("<span>check</span>");
							    		}
							    	} else {
							    		totDiscountAmt = 0;
							    		// 6개월 체크, 3회선 체크 후 체크 제거
							    		$("li[data-name='discountCodeA']").each(function() {
							    			$(this).children('span').remove();
							    		});
							    		
							    		var discountArray = returnObj.discountInfo;
								    	for (var i=0; i<discountArray.length; i++) {
								    		
								    		if(jQuery.inArray(discountArray[i].DISCOUNT_CD, ["LDZ0002542", "LDZ0002543", "LDZ0002544"]) >= 0 ) {
				
							    				if (isUnder6month && isUnder3svc) {
										    	} else {
								    				totDiscountAmt += Number(discountArray[i].DISCOUNT_AMT);
										    	}
							    				if( $("li[data-name='discountCodeA'][data-id='"+discountArray[i].DISCOUNT_CD+"']").children().length == 0 ) {
								    				$("li[data-name='discountCodeA'][data-id='"+discountArray[i].DISCOUNT_CD+"']").prepend("<span>check</span>");
										    	}
								    		}
										}
							    	}
							    	var discountArray = returnObj.discountInfo;
							    	for (var i=0; i<discountArray.length; i++) {
							    		
							    		if(jQuery.inArray(discountArray[i].DISCOUNT_CD, ["LDZ0002545", "LDZ0002546", "LDZ0002547"]) >= 0 ) {
				
							    			// 스타클럽
											if( $("li[data-id='"+discountArray[i].DISCOUNT_CD+"']").children().length == 0 ) {
												$("li[data-id='"+discountArray[i].DISCOUNT_CD+"']").prepend('<span>check</span>');
											}
											if(totDiscountAmt < 22000) {
												totDiscountAmt += Number(discountArray[i].DISCOUNT_AMT);
											}
										}
							    		
							    		if(jQuery.inArray(discountArray[i].DISCOUNT_CD, ["LDZ0002548", "LDZ0002549", "LDZ0002550", "LDZ0002551", "LDZ0002552"]) >= 0 ) {
											//제휴기관직원할인
							    			if( $("li[data-name='discountCodeB'][data-id='LDZ0002548']").children().length == 0) {
									    		$("li[data-name='discountCodeB'][data-id='LDZ0002548']").html("<span>check</span>"+amountFormatter(discountArray[i].DISCOUNT_AMT)+"원");	
											}
							    			if(totDiscountAmt < 22000) {
												totDiscountAmt += Number(discountArray[i].DISCOUNT_AMT);
											}
										}
									}
							    	
							    	// 친구결합 합산금액 표시
							    	var joinCount = Number(returnObj.joinCount);
							    	var joinAmt = Number(joinCount)*2200;
							    	if (joinAmt >= 6600) {joinAmt = 6600; } // 친구결합 최대 6600
							    	totDiscountAmt += joinAmt;
							    	
							    	if(joinAmt == 0) {
							    		$("a[data-id='joinCount']").text("친구결합 1명당(최대 3명)");
							    	}
							    	if(joinAmt > 0) {
							    		$("a[data-id='joinCount']").text("친구결합 "+joinCount+"명(최대 3명)");
							    		if($("li[data-name='discountCodeB'][data-id='LDZ0002553']").children().length == 0) {
							    			$("li[data-name='discountCodeB'][data-id='LDZ0002553']").html("<span>check</span>"+amountFormatter(joinAmt)+"원");
							    		}
							    	}
							    	
							    	//최대 22000
							    	if(totDiscountAmt >= 22000) {  
										totDiscountAmt = 22000;
									}
							    	if(!isEmpty(objectId)) { // 2차 Set 연동 타고 나서
							    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
							    	}
					    		}
					    		
					    	}
					    	else if(vProdGrp=="U03" ){
					    		totDiscountAmt = 0;
					    		limitCap = 7700;
					    		if(!isEmpty(objectId)) { 
						    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
						    	}
					    		
					    		$("[data-id=divStarclub]").show();
					    		$("[data-id=juniorDtl]").show();
					    		$("[data-id=discountInfoHouseOpenbaking]").show();
					    		

				    			var discountMap = data.data.dccodeHm;
						    	var discountArray = data.data.dccodeList;
						    	var k=0;
						    	for (var i=0; i<discountArray.length; i++) {
						    		if(jQuery.inArray(discountArray[i], ["LDZ0002545", "LDZ0002546", "LDZ0002547"]) >= 0 ) {
						    			// 스타클럽
										if( $("li[data-id='"+discountArray[i]+"']").children().length == 0 ) {
											$("li[data-id='"+discountArray[i]+"']").prepend('<span>check</span>');
										}
										totDiscountAmt = totDiscountAmt + discountMap[discountArray[i]]*1;
									}
						    		else if(jQuery.inArray(discountArray[i], ["LDZ0070128", "LDZ0070122", "LDZ0070126"]) >= 0 ) {
						    			// 주택청약,오픈뱅킹
						    			var tempDcode = "LDZ0070128";
										if( $("li[data-id='"+tempDcode+"']").children().length == 0 ) {
											$("li[data-id='"+tempDcode+"']").prepend('<span>check</span>');
										}
										if(k==0) totDiscountAmt = totDiscountAmt + discountMap[discountArray[i]]*1; //주택청약과 오픈뱅킹은 중복할인 제외
										k++;
									}
						    		else if(jQuery.inArray(discountArray[i], ["TOT_DSCNT_CAP"]) >= 0 ) {
						    			if(!isEmpty(objectId)) { // 2차 Set 연동 타고 나서
								    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
								    	}
						    		}
								}
						    	if(totDiscountAmt > limitCap) {
						    		if(!isEmpty(objectId)) { 
							    		$("#"+objectId).html(amountFormatter(limitCap));
							    	}
								}
					    	}
					    	else if(vProdGrp=="U04" ){
					    		totDiscountAmt = 0;
					    		if(!isEmpty(objectId)) { 
						    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
						    	}
					    		
					    		$("[data-id=smartDtl]").show();
					    		$("[data-id=discountInfoMajorCust]").show();
					    		$("[data-id=discountInfoMobileMix]").show();
					    		

				    			var discountMap = data.data.dccodeHm;
						    	var discountArray = data.data.dccodeList;
						    	for (var i=0; i<discountArray.length; i++) {
						    		
						    		if(jQuery.inArray(discountArray[i], ["LDZ0070123", "LDZ0070125"]) >= 0 ) {
						    			// 주거래우대
						    			var tempDcode = "LDZ0070125";
										if( $("li[data-id='"+tempDcode+"']").children().length == 0 ) {
											$("li[data-id='"+tempDcode+"']").prepend('<span>check</span>');
										}
									}
						    		else if(jQuery.inArray(discountArray[i], ["LDZ0070127"]) >= 0 ) {
						    			// 모바일결합
						    			var tempDcode = "LDZ0070127";
						    			if( $("li[data-id='"+discountArray[i]+"']").children().length == 0 ) {
											$("li[data-id='"+discountArray[i]+"']").prepend('<span>check</span>');
										}
									}
						    		else if(jQuery.inArray(discountArray[i], ["TOT_DSCNT_CAP"]) >= 0 ) {
										if(totDiscountAmt < 2200) {
											totDiscountAmt = discountMap[discountArray[i]]*1;
										}
						    			if(!isEmpty(objectId)) { // 2차 Set 연동 타고 나서
								    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
								    	}
						    		}
								}
						    	if(totDiscountAmt > 2200) {
						    		if(!isEmpty(objectId)) { 
							    		$("#"+objectId).html(amountFormatter(2200));
							    	}
								}
					    	}
					    	else if(vProdGrp=="U05" ){
					    		totDiscountAmt = 0;
					    		limitCap = 4400;
					    		if(!isEmpty(objectId)) { 
						    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
						    	}
					    		
					    		$("[data-id=flexDtl]").show();
					    		$("[data-id=discountInfoHouseOpenbaking2]").show();
					    		$("[data-id=discountInfoSalary]").show();
					    		$("[data-id=discountInfoMVP]").show();
					    		

				    			var discountMap = data.data.dccodeHm;
						    	var discountArray = data.data.dccodeList;
						    	var k = 0;
						    	for (var i=0; i<discountArray.length; i++) {
						    		if(jQuery.inArray(discountArray[i], ["LDZ0070128", "LDZ0070122", "LDZ0070126"]) >= 0 ) {
						    			// 주택청약,오픈뱅킹
						    			var tempDcode = "LDZ0070128";
										if( $("li[data-id='"+tempDcode+"']").children().length == 0 ) {
											$("li[data-id='"+tempDcode+"']").prepend('<span>check</span>');
										}
										if(k==0) totDiscountAmt = totDiscountAmt + discountMap[discountArray[i]]*1; //주택청약과 오픈뱅킹은 중복할인 제외
										k++;
									}
						    		else if(jQuery.inArray(discountArray[i], ["LDZ0070145"]) >= 0 ) {
						    			// 급여이체
						    			var tempDcode = "LDZ0070145";
						    			if( $("li[data-id='"+discountArray[i]+"']").children().length == 0 ) {
											$("li[data-id='"+discountArray[i]+"']").prepend('<span>check</span>');
										}
						    			totDiscountAmt = totDiscountAmt + discountMap[discountArray[i]]*1;
									}
						    		else if(jQuery.inArray(discountArray[i], ["LDZ0002545"]) >= 0 ) {
						    			// MVP
						    			limitCap = 5500;
						    			var tempDcode = "LDZ0002545";
						    			if( $("li[data-id='"+discountArray[i]+"']").children().length == 0 ) {
											$("li[data-id='"+discountArray[i]+"']").prepend('<span>check</span>');
										}
						    			totDiscountAmt = totDiscountAmt + discountMap[discountArray[i]]*1;
									}
						    		else if(jQuery.inArray(discountArray[i], ["TOT_DSCNT_CAP"]) >= 0 ) {
						    			if(!isEmpty(objectId)) { // 2차 Set 연동 타고 나서
								    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
								    	}
						    		}
								}
						    	if(totDiscountAmt > limitCap) {
						    		if(!isEmpty(objectId)) { 
							    		$("#"+objectId).html(amountFormatter(limitCap));
							    	}
								}
					    	}
					    	else if(vProdGrp=="U06" ){
					    		totDiscountAmt = 0;
					    		limitCap = 2200;
					    		if(!isEmpty(objectId)) { 
						    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
						    	}
					    		
					    		$("[data-id=militaryDtl]").show();
					    		$("[data-id=discountInfoMajorCust]").show();
					    		

				    			var discountMap = data.data.dccodeHm;
						    	var discountArray = data.data.dccodeList;
						    	for (var i=0; i<discountArray.length; i++) {
						    		if(jQuery.inArray(discountArray[i], ["LDZ0070123", "LDZ0070125"]) >= 0 ) {
						    			// 주거래우대
						    			var tempDcode = "LDZ0070125";
										if( $("li[data-id='"+tempDcode+"']").children().length == 0 ) {
											$("li[data-id='"+tempDcode+"']").prepend('<span>check</span>');
										}
									}
						    		else if(jQuery.inArray(discountArray[i], ["TOT_DSCNT_CAP"]) >= 0 ) {
						    			if(totDiscountAmt < limitCap) {
											totDiscountAmt = discountMap[discountArray[i]]*1;
										}
						    			if(!isEmpty(objectId)) { // 2차 Set 연동 타고 나서
								    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
								    	}
						    		}
								}
						    	if(totDiscountAmt > limitCap) {
						    		if(!isEmpty(objectId)) { 
							    		$("#"+objectId).html(amountFormatter(limitCap));
							    	}
								}
					    	}
					    	else if(vProdGrp=="U07" ){
					    		totDiscountAmt = 0;
					    		limitCap = 0;
					    		if(!isEmpty(objectId)) { 
						    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
						    	}
					    		
					    		$("[data-id=militaryDtl]").show();
					    		$("[data-id=discountInfoQR]").show();
					    		
						    	if(totDiscountAmt > limitCap) {
						    		if(!isEmpty(objectId)) { 
							    		$("#"+objectId).html(amountFormatter(limitCap));
							    	}
								}
					    	}
					    	else if(vProdGrp=="U08" ){
					    		totDiscountAmt = 0;
					    		limitCap = 0;
					    		if(!isEmpty(objectId)) { 
						    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
						    	}
					    		
					    		
					    		$("[data-id=discountInfoSavings]").show();					    		
					    		
						    	if(totDiscountAmt > limitCap) {
						    		if(!isEmpty(objectId)) { 
							    		$("#"+objectId).html(amountFormatter(limitCap));
							    	}
								}
					    	}
					    	else if(vProdGrp=="U10" ){
					    		totDiscountAmt = 0;
					    		limitCap = 6600;
					    		if(!isEmpty(objectId)) { 
						    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
						    	}
					    		
					    		$("[data-id=discountInfoUserJoin]").show();
					    		$("[data-id=reliableDtl]").show();
					    		$("[data-id=discountInfoMVP2]").show();
					    		$("[data-id=discountInfoLongTerm]").show();
					    		$("[data-id=discountInfoDeal2]").show();


				    			var discountMap = data.data.dccodeHm;
						    	var discountArray = data.data.dccodeList;
						    	for (var i=0; i<discountArray.length; i++) {
						    		if(jQuery.inArray(discountArray[i], ["LDZ0070252", "LDZ0070250"]) >= 0 ) {
						    			// MVP&장기우대  @@@returnObj.longTermCheck 활용@@@
										if( $("li[data-id='"+discountArray[i]+"']").children().length == 0 ) {
											$("li[data-id='"+discountArray[i]+"']").prepend('<span>check</span>');
										}
										totDiscountAmt = totDiscountAmt + discountMap[discountArray[i]]*1; //주택청약과 오픈뱅킹은 중복할인 제외					
									}
						    		else if(jQuery.inArray(discountArray[i], ["LDZ0070249"]) >= 0 ) {
						    			// 주거래
						    			if( $("li[data-id='"+discountArray[i]+"']").children().length == 0 ) {
											$("li[data-id='"+discountArray[i]+"']").prepend('<span>check</span>');
										}
						    			totDiscountAmt = totDiscountAmt + discountMap[discountArray[i]]*1;
									}
						    		else if(jQuery.inArray(discountArray[i], ["TOT_DSCNT_CAP"]) >= 0 ) {
						    			if(!isEmpty(objectId)) { // 2차 Set 연동 타고 나서
								    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
								    	}
						    		}
								}	    
						    	
						    	// 친구결합 합산금액 표시
						    	var joinCount = Number(returnObj.joinCount);
						    	var joinAmt = Number(joinCount)*2200;
						    	if (joinAmt >= 6600) {joinAmt = 6600; } // 친구결합 최대 6600
						    	totDiscountAmt += joinAmt;
						    	
						    	if(joinAmt == 0) {
						    		$("a[data-id='joinCount']").text("친구결합 1명당(최대 3명)");
						    	}
						    	if(joinAmt > 0) {
						    		$("a[data-id='joinCount']").text("친구결합 "+joinCount+"명(최대 3명)");
						    		if($("li[data-id='LDZ0002553']").children().length == 0) {
						    			$("li[data-id='LDZ0002553']").html("<span>check</span>"+amountFormatter(joinAmt)+"원");
						    		}
						    	}
						    	
						    	//최대 6600
						    	if(totDiscountAmt > limitCap) {
						    		totDiscountAmt = limitCap;
								}
						    	if(!isEmpty(objectId)) { 
						    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
						    	}
	
					    	}
					    	else if(vProdGrp=="U12" ){
					    		totDiscountAmt = 0;
					    		limitCap = 2200;
					    		if(!isEmpty(objectId)) { 
						    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
						    	}
					    		
					    		
					    		$("[data-id=militaryDtl]").show();
					    		$("[data-id=discountInfoSalary]").show();
					    		$("[data-id=discountInfoSave]").show();


				    			var discountMap = data.data.dccodeHm;
						    	var discountArray = data.data.dccodeList;
						    	for (var i=0; i<discountArray.length; i++) {
						    		if(jQuery.inArray(discountArray[i], ["LDZ0070145"]) >= 0 ) {
						    			// 급여이체
										if( $("li[data-id='"+discountArray[i]+"']").children().length == 0 ) {
											$("li[data-id='"+discountArray[i]+"']").prepend('<span>check</span>');
										}
										totDiscountAmt = totDiscountAmt + discountMap[discountArray[i]]*1; //주택청약과 오픈뱅킹은 중복할인 제외					
									}
						    		else if(jQuery.inArray(discountArray[i], ["LDZ0070295"]) >= 0 ) {
						    			// 예적금할인
						    			if( $("li[data-id='"+discountArray[i]+"']").children().length == 0 ) {
											$("li[data-id='"+discountArray[i]+"']").prepend('<span>check</span>');
										}
						    			totDiscountAmt = totDiscountAmt + discountMap[discountArray[i]]*1;
									}
						    		else if(jQuery.inArray(discountArray[i], ["TOT_DSCNT_CAP"]) >= 0 ) {
						    			if(!isEmpty(objectId)) { // 2차 Set 연동 타고 나서
								    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
								    	}
						    		}
								}	    
						    	
						    	//최대 2200
						    	if(totDiscountAmt > limitCap) {
						    		if(!isEmpty(objectId)) { 
							    		$("#"+objectId).html(amountFormatter(limitCap));
							    	}
								}
	
					    	}
					    	else if(vProdGrp=="U14" ){
					    		totDiscountAmt = 0;
					    		limitCap = 3300;
					    		if(!isEmpty(objectId)) { 
						    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
						    	}
					    		
					    		$("[data-id=petDtl]").show();
					    		$("[data-id=discountInfoPet]").show();

				    			var discountMap = data.data.dccodeHm;
						    	var discountArray = data.data.dccodeList;
						    	for (var i=0; i<discountArray.length; i++) {
						    		if(jQuery.inArray(discountArray[i], ["LDZ0005001"]) >= 0 ) {
						    			// 입양기관할인
						    			if( $("li[data-id='"+discountArray[i]+"']").children().length == 0 ) {
											$("li[data-id='"+discountArray[i]+"']").prepend('<span>check</span>');
										}
						    			totDiscountAmt = totDiscountAmt + discountMap[discountArray[i]]*1;
									}
						    		else if(jQuery.inArray(discountArray[i], ["TOT_DSCNT_CAP"]) >= 0 ) {
						    			if(!isEmpty(objectId)) { // 2차 Set 연동 타고 나서
								    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
								    	}
						    		}
								}	    
						    	
						    	//최대 3300
						    	if(totDiscountAmt > limitCap) {
						    		if(!isEmpty(objectId)) { 
							    		$("#"+objectId).html(amountFormatter(limitCap));
							    	}
								}
					    	}
					    	else if(vProdGrp=="U15" || vProdGrp=="U16" || vProdGrp=="U17"){
					    		totDiscountAmt = 0;
					    		limitCap = 3300;
					    		if(!isEmpty(objectId)) { 
						    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
						    	}
					    		
				    			$("[data-id=basicImprvDtl]").show();
					    		$("[data-id=discountInfoImprvCard1]").hide();
					    		$("[data-id=discountInfoImprvCard2]").hide();
					    		$("[data-id=discountInfoImprvDeal]").show();
					    		$("[data-id=discountInfoImprvStarclub]").show();
					    		$("[data-id=discountInfoImprvUserJoin]").show();
					    		$("[data-id=discountInfoEvent01001]").hide();
			    				$("[data-name=eventDtl02-01]").hide();
			    				$("[data-name=eventDtl02-02]").hide();
			    				$("[data-name=eventDtl02-03]").hide();
			    				$("[data-id=discountInfoEvent40009_2]").hide();
					    		
					    		if(vProdGrp == "U17"){
					    			$("[data-id=discountInfoEvent40009]").show();
					    		}

					    		console.log("-----data.data.dccodeHm-------");
					    		console.log(data.data.dccodeHm);
					    		console.log("-----data.data.dccodeList-------");
					    		console.log(data.data.dccodeList);

				    			var discountMap = data.data.dccodeHm;
						    	var discountArray = data.data.dccodeList;
						    	var isMVP = false;
						    	
						    	for (var i=0; i<discountArray.length; i++) {
						    		if(jQuery.inArray(discountArray[i], ["LDZ0040001"]) >= 0 ) {
						    			// 주거래우대
						    			if( $("li[data-id='"+discountArray[i]+"']").children().length == 0 ) {
											$("li[data-id='"+discountArray[i]+"']").prepend('<span>check</span>');
										}
						    			totDiscountAmt = totDiscountAmt + discountMap[discountArray[i]]*1;
									}
						    		else if(jQuery.inArray(discountArray[i], ["LDZ0040003"]) >= 0 ) {
						    			// 스타클럽 MVP/로얄
						    			if( $("li[data-id='"+discountArray[i]+"']").children().length == 0 ) {
											$("li[data-id='"+discountArray[i]+"']").prepend('<span>check</span>');
										}
						    			totDiscountAmt = totDiscountAmt + discountMap[discountArray[i]]*1;
						    			limitCap = 4400;
						    			isMVP = true;
						    			
						    			if (vProdCd == "PD00000633"){
						    				if(discountArray.join().indexOf("LDZ0040001") == -1 
						    						&& discountArray.join().indexOf("LDZ0040001") == -1
						    						&& discountArray.join().indexOf("LDZ0040001") == -1
						    						&& discountArray.join().indexOf("LDZ0040001") == -1
						    						){ //든든7G+ 스타클럽 MVP 할인만 유효
						    					$("[data-id=discountInfoImprvDeal]").hide();
							    				$("[data-id=discountInfoImprvUserJoin]").hide();
							    				$("[data-name=eventDtl02-01]").show();
							    				$("[data-name=eventDtl02-02]").show();
						    				}
						    			}
									}
						    		else if(jQuery.inArray(discountArray[i], ["LDZ0040002"]) >= 0 ) {
						    			// 스타클럽 골드/프리미엄
						    			if( $("li[data-id='"+discountArray[i]+"']").children().length == 0 ) {
											$("li[data-id='"+discountArray[i]+"']").prepend('<span>check</span>');
										}
						    			totDiscountAmt = totDiscountAmt + discountMap[discountArray[i]]*1;
						    			limitCap = 3300;
									}
						    		else if(jQuery.inArray(discountArray[i], ["LDZ0012001"]) >= 0 ) {
						    			// 프로모션
						    			if( $("li[data-id='"+discountArray[i]+"']").children().length == 0 ) {
											$("li[data-id='"+discountArray[i]+"']").prepend('<span>check</span>');
										}
						    			totDiscountAmt = totDiscountAmt + discountMap[discountArray[i]]*1;
						    			if(vProdCd == "PD00000635"){
						    				$("[data-id=discountInfoEvent12001]").show();
						    			}
						    			if(isMVP) {
						    				limitCap = 7150;
						    			} else {
						    				limitCap = 6050;
						    			}
						    		}
						    		else if(jQuery.inArray(discountArray[i], ["LDZ0040009"]) >= 0 ) {
						    			if(vProdCd == "PD00000637"){
						    				$("[data-id=discountInfoEvent40002]").hide();
						    				$("[data-id=discountInfoEvent40009_2]").show();
						    				$("[data-id=discountInfoImprvDeal]").hide();
						    				$("[data-id=discountInfoImprvUserJoin]").hide();
						    				$("[data-name=eventDtl02-01]").show();
						    				$("[data-name=eventDtl02-03]").show();
						    			}
						    			else if (vProdCd == "PD00000633"){ 
						    				$("[data-id=discountInfoEvent40002]").hide();
						    				$("[data-id=discountInfoEvent40009_2]").show();
						    				$("[data-id=discountInfoImprvDeal]").hide();
						    				$("[data-id=discountInfoImprvUserJoin]").hide();
						    				$("[data-name=eventDtl02-01]").show();
						    				$("[data-name=eventDtl02-02]").show();
						    				
						    				limitCap = 3300;
						    			}
						    			
						    			// 일반, 스타클럽 골드/프리미엄
						    			if( $("li[data-id='"+discountArray[i]+"']").children().length == 0 ) {
											$("li[data-id='"+discountArray[i]+"']").prepend('<span>check</span>');
										}
						    			
						    			totDiscountAmt = totDiscountAmt + discountMap[discountArray[i]]*1;
						    			limitCap = 3300;
									}
						    		else if(jQuery.inArray(discountArray[i], ["LDZ0040008"]) >= 0 ) {
						    			// 스타클럽 MVP/로얄 이벤트할인
						    			if( $("li[data-id='"+discountArray[i]+"']").children().length == 0 ) {
											$("li[data-id='"+discountArray[i]+"']").prepend('<span>check</span>');
										}
						    			totDiscountAmt = totDiscountAmt + discountMap[discountArray[i]]*1;
						    			if(vProdCd == "PD00000577" || vProdCd == "PD00000622"){
						    				$("[data-id=discountInfoImprvCard2]").show();
							    			$("[data-name=kbCardSale]").show();
							    			limitCap = 15900;
							    		}
									}
						    		else if(jQuery.inArray(discountArray[i], ["LDZ0040007"]) >= 0 ) {
						    			// 스타클럽 골드/프리미엄/일반 이벤트할인
						    			if( $("li[data-id='"+discountArray[i]+"']").children().length == 0 ) {
											$("li[data-id='"+discountArray[i]+"']").prepend('<span>check</span>');
										}
						    			totDiscountAmt = totDiscountAmt + discountMap[discountArray[i]]*1;
						    			if(vProdCd == "PD00000577" || vProdCd == "PD00000622"){
						    				$("[data-id=discountInfoImprvCard1]").show();
							    			$("[data-name=kbCardSale]").show();
							    			limitCap = 13000;
							    		}
									}
						    		else if(jQuery.inArray(discountArray[i], ["LDZ0001001"]) >= 0 ) {
						    			// 프로모션할인
						    			if( $("li[data-id='"+discountArray[i]+"']").children().length == 0 ) {
											$("li[data-id='"+discountArray[i]+"']").prepend('<span>check</span>');
										}
						    			totDiscountAmt = totDiscountAmt + discountMap[discountArray[i]]*1;
						    			if(vProdCd == "PD00000637"){
						    				$("[data-id=discountInfoEvent01001]").show();
						    				$("[data-id=discountInfoImprvDeal]").hide();
						    				$("[data-id=discountInfoImprvUserJoin]").hide();
						    				$("[data-name=eventDtl02-01]").show();
						    				$("[data-name=eventDtl02-03]").show();
						    				
						    				if(isMVP) {
							    				limitCap = 8200;
							    			} else {
							    				limitCap = 7100;
							    			}
						    			}
									}
						    		else if(jQuery.inArray(discountArray[i], ["TOT_DSCNT_CAP"]) >= 0 ) {
						    			if(!isEmpty(objectId)) { // 2차 Set 연동 타고 나서
								    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
								    	}
						    		}
								}	    

						    	// new 친구결합 합산금액 표시
						    	var joinCount = Number(returnObj.joinCount);
						    	var joinAmt = Number(joinCount)*1100;
						    	if (joinAmt >= 3300) {joinAmt = 3300; } // 친구결합 최대 3300
						    	totDiscountAmt += joinAmt;
						    	
						    	if(joinAmt == 0) {
						    		$("[data-id='joinCount']").text("친구결합 1명당(최대 3명)");
						    	}
						    	if(joinAmt > 0) {
						    		$("[data-id='joinCount']").text("친구결합 "+joinCount+"명(최대 3명)");
						    		if($("li[data-id='LDZ0040006']").children().length == 0) {
						    			$("li[data-id='LDZ0040006']").html("<span>check</span>"+amountFormatter(joinAmt)+"원");
						    		}
						    	}
						    	
						    	//최대 3300 or 4400
						    	if(totDiscountAmt > limitCap) {
						    		totDiscountAmt = limitCap;
								}
						    	if(!isEmpty(objectId)) { 
						    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
						    	}
					    	}
					    	else if(vProdGrp=="U18"){
					    		totDiscountAmt = 0;
					    		limitCap = 1100;
					    		if(!isEmpty(objectId)) { 
						    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
						    	}
					    		
				    			$("[data-id=watchDtl]").show();
					    		$("[data-id=discountInfoWatchMobile]").show();
					    		
					    		console.log(data.data.dccodeHm);
						    	console.log(data.data.dccodeList);

				    			var discountMap = data.data.dccodeHm;
						    	var discountArray = data.data.dccodeList;
						    	for (var i=0; i<discountArray.length; i++) {
						    		if(jQuery.inArray(discountArray[i], ["LDZ0090001"]) >= 0 ) {
						    			// 모바일결합 할인
						    			if( $("li[data-id='"+discountArray[i]+"']").children().length == 0 ) {
											$("li[data-id='"+discountArray[i]+"']").prepend('<span>check</span>');
										}
						    			totDiscountAmt = totDiscountAmt + discountMap[discountArray[i]]*1;
									}
						    		else if(jQuery.inArray(discountArray[i], ["TOT_DSCNT_CAP"]) >= 0 ) {
						    			if(!isEmpty(objectId)) { // 2차 Set 연동 타고 나서
								    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
								    	}
						    		}
						    	}
						    	
						    	//최대 1100
						    	if(totDiscountAmt > limitCap) {
						    		totDiscountAmt = limitCap;
								}
						    	if(!isEmpty(objectId)) { 
						    		$("#"+objectId).html(amountFormatter(totDiscountAmt));
						    	}
					    	}
					    	
				    	}
				    	catch(e){
				    		console.log(e);
				    	}

				    },
				    error: function(e) { return ''; },
				    complete: function() {}
			});
		}
		catch(e){
			console.log(e);
		}
	}
	
}


//가입상품조회(부가) callIFCM559('010012341234', callback) 가입정보 조회
function callIFCM559(prodNo, callbackFunction) {
	var serviceId = "CM559";
	var nextOperatorId = "1100000288";
	var mode   = "P";

	var data = new Object();
	var RetrieveCustInfoSvcAddvBD = new Object();
	var RequestRecord = new Object();
	var RequestBody = new Object();
	
	var DsReqInVO = new Object();
	DsReqInVO.prodNo = prodNo;
	DsReqInVO.mode   = mode;
	DsReqInVO.nextOperatorId = nextOperatorId;
	
	RequestBody.DsReqInVO = DsReqInVO;
	RequestRecord.RequestBody = RequestBody;
	RetrieveCustInfoSvcAddvBD.RequestRecord = RequestRecord;
	data.RetrieveCustInfoSvcAddvBD = RetrieveCustInfoSvcAddvBD;
	
	var base = new Object();
	base.serviceId = serviceId;
	base.data = data;
	
	
	$.ajax({
		type: 'POST',
		url: '/appIf/v1/uplus/esb/' + serviceId,
		data: fnSign(JSON.stringify(base)),
		contentType: 'application/json; charset=utf-8',
		cache: false,
		dataType: "json",
		success: function(res) {
			data = JSON.parse(fnUnSign(res.enc));
			console.info("인터페이스 응답 : " + JSON.stringify(data));
			
			if(data.resultCode == "00000" || data.resultCode == "N0000") {
				var body = data.data.RetrieveCustInfoSvcAddvBDResponse.ResponseRecord.ResponseBody;
				try{
					$("#CM559CustInfo").val(JSON.stringify(body.DsCustInfoOutVO));
					delete body.DsCustInfoOutVO;
					$("#CM559Result").val(JSON.stringify(body));
				}
				catch(e){
					console.log(e);
					popalarm("일시적으로 오류가 발생하였습니다.<br/>다시 시도해 주세요.", "info", false);
				}
				if(typeof callbackFunction === 'function' ){
					setTimeout(function(){ callbackFunction.call(); }, 10);
				}
				
			} else {
				popalarm("일시적으로 오류가 발생하였습니다. 다시 시도해 주세요.", "info", false);
			}
		},
		error: function(request,status,error){
			popalarm("일시적으로 오류가 발생하였습니다. 다시 시도해 주세요.", "info", false);
		}
	});
}

//계약정보 바탕으로 CM559 정보 생성
function makeIFCM559(prodNo, callbackFunction) {
	var url = "/mypage/applinfo/applinfo/makeCM559";

	$.ajax({
		type : "post",
		url : url,
		data : {
			prodNo : fnSign(prodNo)
	    },
		cache: false,
		dataType: "json",
	    success: function(data) {
			
			if(data.resultCode == "00000" || data.resultCode == "N0000") {
				try{
					data.data = JSON.parse(fnUnSign(data.data));
					console.info("makeCM559 : " + JSON.stringify(data));
				}
				catch(e){
					console.log(e);
					popalarm("일시적으로 오류가 발생하였습니다.<br/>다시 시도해 주세요.", "info", false);
					return;
				}

				var body = data.data.RetrieveCustInfoSvcAddvBDResponse.ResponseRecord.ResponseBody;
				try{
					$("#CM559CustInfo").val(JSON.stringify(body.DsCustInfoOutVO));
					delete body.DsCustInfoOutVO;
					$("#CM559Result").val(JSON.stringify(body));
				}
				catch(e){
					console.log(e);
					popalarm("일시적으로 오류가 발생하였습니다.<br/>다시 시도해 주세요.", "info", false);
				}
				if(typeof callbackFunction === 'function' ){
					setTimeout(function(){ callbackFunction.call(); }, 10);
				}
				
			} 
			else if(data.resultCode == "400") {
				popalarm("고객정보를 찾지 못했습니다.<br/>다시 로그인 해주세요.", "info", false,"", logout);
			}
			else {
				popalarm("일시적으로 오류가 발생하였습니다. 다시 시도해 주세요.", "info", false);
			}
		},
		error: function(request,status,error){
			popalarm("일시적으로 오류가 발생하였습니다. 다시 시도해 주세요.", "info", false);
		},
		complete: function() {
			//console.log("1. makeIFCM559 : "+new Date());
			makeCM559Init();
		}
	});
}

function kcbReturnCode(resultCode){
	if(resultCode == 'T090'){ 
		var strErr = '인증에 실패하였습니다. 입력정보 또는 본인인증 대상 카드 여부를 확인해주세요.</br></br> 오류코드 ('+resultCode+')';
		popalarm(strErr, "info", false);
	}else if(resultCode == 'T091'){ 
		var strErr = '인증에 실패하였습니다. 신용카드 발급사 확인이 필요합니다.</br></br> 오류코드 ('+resultCode+')';
		popalarm(strErr, "info", false);
	}else if(resultCode == 'T093'){ 
		var strErr = '법인/가족/선불카드는 본인인증 대상 카드가 아닙니다.</br></br> 오류코드 ('+resultCode+')';
		popalarm(strErr, "info", false);
	}else if(resultCode == 'T095'){ 
		var strErr = '체크카드는 이용이 불가합니다.</br></br> 오류코드 ('+resultCode+')';
		popalarm(strErr, "info", false);
	}else if(resultCode == 'T097' || resultCode == 'T098'
		 || resultCode == 'T899'  || resultCode == 'T998' || resultCode == 'T999'){ 
		var strErr = '일시적인 시스템 오류입니다. 잠시 후 다시 시도해주세요.</br></br> 오류코드 ('+resultCode+')';
		popalarm(strErr, "info", false);
	}else if(resultCode == 'T099'){ 
		var strErr = '인증에 실패하였습니다. 다시 시도해주세요.</br></br> 오류코드 ('+resultCode+')';
		popalarm(strErr, "info", false);
	}else if(resultCode == 'T100'){ 
		var strErr = 'ARS인증 또는 앱카드 인증 완료 후 인증 완료를 선택해 주세요.</br></br> 오류코드 ('+resultCode+')';
		popalarm(strErr, "info", false);
	}else if(resultCode == 'T699'){ 
		var strErr = '입력 카드사 응답이 지연되고 있습니다. 잠시 후 다시 시도해 주시거나 다른 신용카드를 이용해주세요.</br></br> 오류코드 ('+resultCode+')';
		popalarm(strErr, "info", false);
	}else if(resultCode == 'T440' || resultCode == 'T441' 
			|| resultCode == 'T442'  || resultCode == 'T443'){ 
		var strErr = '인증 완료 중복 시도로 인한 인증 실패 입니다. 다시 시도해주세요.</br></br> 오류코드 ('+resultCode+')';
		popalarm(strErr, "info", false);
	}else if(resultCode == 'T599'){ 
		var strErr = '인증 재시도 횟수 또는 인증 제한 시간이 초과 되었습니다. 다시 시도해주세요.</br></br> 오류코드 ('+resultCode+')';
		popalarm(strErr, "info", false);
	}else if(resultCode == 'T887' || resultCode == 'T888'){ 
		var strErr = '카드사 시스템 점검으로 인하여 이용이 불가합니다. 다른 카드사를 이용해주시길 바랍니다.</br></br> 오류코드 ('+resultCode+')';
		popalarm(strErr, "info", false);
	} else {
		var strErr = '인증에 실패하였습니다. 신용카드 인증정보를 다시 확인해주세요.';
		popalarm(strErr, "info", false);
	}
}

/**
 * 카드번호 자리수 체크
 * @param cardCd 카드사코드
 * @param cardNo 카드번호
 */
function digitCardNo(cardCd, cardNo) {
	if(isEmpty(cardCd) || isEmpty(cardNo)) {
		return false;
	}
	
	if(cardNo.length == 16) {
		return true;
	} else if(cardCd == "07" && cardNo.length == 14) { // 현대카드 다이너스
		return true;
	} else if(cardCd != "07" && cardNo.length == 15) { // AMEX
		return true;
	}
	
	return false;
}

/**
 * 기기정보조회 
 * @return OS 구분
 */
function getOsInfo(){
	var phoneInfo = navigator.userAgent.toLowerCase();
	var typeOS = '';
	
	if(phoneInfo.indexOf('android') > 0){
		var typeOS = 'android';
	} else if(phoneInfo.indexOf('iphone') > 0){
		var typeOS = 'ios';
	} else if(phoneInfo.indexOf('ipad') > 0){
		var typeOS = 'ios';
	} else if(phoneInfo.indexOf('ipod') > 0){
		var typeOS = 'ios';
	} else if(phoneInfo.indexOf('mac') > 0){
		var typeOS = 'ios';
	} else {
		var typeOS = 'others';
	}
	return typeOS;
}

/**
 * 전화번호 형식으로 리턴 
 */
function makeTelNumber(str){
	if(str == null || str == ""){ return str; }

	str = onlyNum(str);

	var len = str.length;
	var returnVal = "";
	var lastNumber = "";

	if( str.length <= 2 ){
		return returnVal;
	}else{
		if( str.indexOf("02") == 0 ){
			returnVal += str.substr(0,2) + '-';
			lastNumber = str.substr(2, str.length);
		}else if(str.indexOf("0") == 0 ){
			returnVal = str.substr(0,3) + '-';
			lastNumber = str.substr(3, str.length);
		}else{
			lastNumber = str;
		}

		switch(lastNumber.length){
			case 7 : 
				returnVal += (lastNumber.substr(0,3)+'-'+lastNumber.substr(3,7));
				break;
			case 8 : 
				returnVal += (lastNumber.substr(0,4)+'-'+lastNumber.substr(4,8));
				break;
			default : 
				returnVal += lastNumber;
				returnVal = onlyNum(returnVal);
				break;
		}
	}

	return returnVal;
}

function fnReplaceAll(str, searchStr, replaceStr){
	return str.split(searchStr).join(replaceStr);
}

function fnLpad(s, padLength, padString){
	if(padString == "" || padLength == 0 || s == "" || padString == undefined || padLength == undefined || s == undefined){
		return s;
	}
	if(padString.length > padLength){
		return s;
	}
	while(s.length < padLength){
		s = padString + s;
	}
	return s;
}

function fnCheckNull(val){
	if(val=="undefined" || val==undefined || val==null || val=="null") return "";
	else return val;
}

// 사업명 리턴
function getSoNm(soId) {
	var soNm = "";
	
	if(soId == "01") {
		soNm = "LG U+";
	} else if(soId == "02") {
		soNm = "KT";
	} else if(soId == "03") {
		soNm = "SKT";
	}
	
	return soNm; 
}

var SignModule={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=SignModule._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64}else if(isNaN(chr3)){enc4=64}output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4)}return output},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2)}if(enc4!=64){output=output+String.fromCharCode(chr3)}}output=SignModule._utf8_decode(output);return output},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c)}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128)}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128)}}return utftext},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++}else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2}else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3}}return string}};function addCrc(max){var arrFlag=['N','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','W','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];var ret="";for(var i=0;i<max;i++){ret=ret+arrFlag[Math.floor(Math.random()*62)+1]}return ret}function fnSign(orgStr){return addCrc(32)+SignModule.encode(orgStr)+addCrc(32)}function fnUnSign(encStr){if(encStr.length>64){var enStr = encStr.substring(32,encStr.length-32);return SignModule.decode(enStr);}else{	return "";}}