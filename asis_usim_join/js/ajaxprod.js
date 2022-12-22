$(document)
		.ready(
				function() {

					$(document).ajaxSend(function(e, xhr, options) {
						var token = $("meta[name='_csrf']").attr("content");
						var header = $("meta[name='_csrf_header']").attr("content");
						xhr.setRequestHeader(header, token);
					});
					
					// AJAX 호출 시
					$(document).ajaxStart(function(e) {
						// (e.currentTarget.location.href).includes("usimRegPopup");
						loading('start');
					});

					// AJAX 호출 중지
					$(document).ajaxStop(function(e) {
						// (e.currentTarget.location.href).includes("usimRegPopup");
						loading('stop');
					});
					
					
					
					$(document).ajaxError(
						function(event, jqxhr, settings, thrownError) {
							if (jqxhr.status == '401') {
								console.log('세션아웃');
							} else if (jqxhr.status == '404') {
								console.log('404');
							} else if (jqxhr.status == '500') {
								console.log('서버 에러가 발생했습니다. 관리자에게 문의해 주세요.');
							} else if (jqxhr.status == '200') {
								console.log('일단 에러발생 : 로그인 필요한 ajax url인지 확인 필요');
							}else{
								if(jqxhr
									.hasOwnProperty('responseJSON')){
									if (jqxhr.responseJSON.exceptionMessage != null && jqxhr.responseJSON.exceptionMessage != '') {
//										swal(jqxhr.responseJSON.exceptionMessage, jqxhr.responseJSON.status + " : " + jqxhr.responseJSON.statusMessage , "error");
//										popalarm("서버 에러가 발생했습니다. 관리자에게 문의해 주세요.", "info", false);
										console.log('서버 에러가 발생했습니다. 관리자에게 문의해 주세요.');
										location.href="/error/500";
									} else if(jqxhr.responseJSON.status != null && jqxhr.responseJSON.status != ''){
//										swal("서버 에러가 발생했습니다.", jqxhr.responseJSON.status + " : " + jqxhr.responseJSON.statusMessage , "error");
//										popalarm("서버 에러가 발생했습니다. 관리자에게 문의해 주세요.", "info", false);
										var stus = jqxhr.responseJSON.status;
										if("403" == stus) {
											console.log('csrf토큰만료.');
											location.href="https://www.liivm.com";
										}
										else{
											console.log('서버 에러가 발생했습니다. 관리자에게 문의해 주세요.');
											location.href="/error/"+jqxhr.responseJSON.status;
										}
									}
								} else {
//									popalarm("서버 에러가 발생했습니다. 관리자에게 문의해 주세요.", "info", false);
									console.log('서버 에러가 발생했습니다. 관리자에게 문의해 주세요.');
									location.href="https://www.liivm.com";
								}
							}
						});



				});