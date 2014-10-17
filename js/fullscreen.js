/*global Element */
(function (window, document) {
        'use strict';

        var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element, // IE6 throws without typeof check

                fn = (function () {
                        var val, valLength;
                        var fnMap = [
                                [
                                        'requestFullscreen',
                                        'exitFullscreen',
                                        'fullscreenElement',
                                        'fullscreenEnabled',
                                        'fullscreenchange',
                                        'fullscreenerror'
                                ],
                                // new WebKit
                                [
                                        'webkitRequestFullscreen',
                                        'webkitExitFullscreen',
                                        'webkitFullscreenElement',
                                        'webkitFullscreenEnabled',
                                        'webkitfullscreenchange',
                                        'webkitfullscreenerror'

                                ],
                                // old WebKit (Safari 5.1)
                                [
                                        'webkitRequestFullScreen',
                                        'webkitCancelFullScreen',
                                        'webkitCurrentFullScreenElement',
                                        'webkitCancelFullScreen',
                                        'webkitfullscreenchange',
                                        'webkitfullscreenerror'

                                ],
                                [
                                        'mozRequestFullScreen',
                                        'mozCancelFullScreen',
                                        'mozFullScreenElement',
                                        'mozFullScreenEnabled',
                                        'mozfullscreenchange',
                                        'mozfullscreenerror'
                                ],
                                [
                                        'msRequestFullscreen',
                                        'msExitFullscreen',
                                        'msFullscreenElement',
                                        'msFullscreenEnabled',
                                        'MSFullscreenChange',
                                        'MSFullscreenError'
                                ]
                        ];
                        var i = 0;
                        var l = fnMap.length;
                        var ret = {};

                        for (; i < l; i++) {
                                val = fnMap[i];
                                if (val && val[1] in document) {
                                        for (i = 0, valLength = val.length; i < valLength; i++) {
                                                ret[fnMap[0][i]] = val[i];
                                        }
                                        return ret;
                                }
                        }
                        return false;
                })(),

                screenfull = {
                        request: function (elem) {
                                var request = fn.requestFullscreen;

                                elem = elem || document.documentElement;

                                // Work around Safari 5.1 bug: reports support for
                                // keyboard in fullscreen even though it doesn't.
                                // Browser sniffing, since the alternative with
                                // setTimeout is even worse.
                                if (/5\.1[\.\d]* Safari/.test(navigator.userAgent)) {
                                        elem[request]();
                                } else {
                                        elem[request](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT);
                                }
                        },
                        exit: function () {
                                document[fn.exitFullscreen]();
								
                        },
                        toggle: function (elem) {
                                if (this.isFullscreen) {
                                        this.exit();
										
                                } else {
                                        this.request(elem);
										presenter_fullscreen(1)
                                }
                        },
                        onchange: function () {},
                        onerror: function () {},
                        raw: fn
                };

        if (!fn) {
                window.screenfull = false;
                return;
        }

        Object.defineProperties(screenfull, {
                isFullscreen: {
                        get: function () {
                                return !!document[fn.fullscreenElement];
                        }
                },
                element: {
                        enumerable: true,
                        get: function () {
                                return document[fn.fullscreenElement];
                        }
                },
                enabled: {
                        enumerable: true,
                        get: function () {
                                // Coerce to boolean in case of old WebKit
                                return !!document[fn.fullscreenEnabled];
                        }
                }
        });

        document.addEventListener(fn.fullscreenchange, function (e) {
                screenfull.onchange.call(screenfull, e);
				if(!screenfull.isFullscreen)
				presenter_fullscreen(0)
				
				
        });

        document.addEventListener(fn.fullscreenerror, function (e) {
                screenfull.onerror.call(screenfull, e);
        });

        window.screenfull = screenfull;
})(window, document);





$(document).ready(function(){

	$('.fullscreen').click(function () {
		if (screenfull.enabled) {
			// We can use `this` since we want the clicked element
			screenfull.toggle();
		}
	});
})


function presenter_fullscreen(full)
{

	if(full == true ){



	var maxWidth = screen.width;

    var maxHeight = screen.height;
	
	
	var cw = parseInt(vm_project.w);
	var ch = parseInt(vm_project.h);
	
    var widthRatio = maxWidth / cw;
	var  heightRatio = maxHeight / ch;


   
   
   
	var ratio = widthRatio; //default to the width ratio until proven wrong

	if (widthRatio * cw > maxWidth) {
		ratio = heightRatio;	
	}
	if(heightRatio * ch > maxHeight){
		ratio = widthRatio; 
	}
	
	if(cw == 800 && ch == 600)
	{
		ratio =heightRatio;
	}
	
	
	sxk = ratio;

	syk = sxk;
				
	


	
		$("#stage").css("margin-top", "0px")
	
	  TweenLite.to($("#stage"), 0.3, {scaleX: ratio , scaleY: ratio, transformOrigin: "50% 0%"  })
	
	// $("body").css("overflow", "hidden");
	
	
	 $(".head").hide();
	
	
	
	//   $(".stage_slide"+vm_project.sld[vm_settings.current_slide].id).css('margin-top', (screen.height - ch*sxk)/2);
	//  $(".stage_slide"+vm_project.sld[vm_settings.current_slide].id).css("left", 0);
	//  $(".stage_slide"+vm_project.sld[vm_settings.current_slide].id).css("top", 0);

	  $(".soc_butts, #embedtext, footer").hide();
	
	}else
	if(screenfull.isFullscreen == false)
	{
	
	
	$(".watermark, .watermark2").show();
	
	$(".soc_butts, footer").show();
			$("#stage").css("margin-top", "10px")
	 TweenLite.to($("#stage"), 0.3, {scaleX: 1 , scaleY: 1  });
	}
	
					
	
		

		window.scrollTo(0,0);
		
}
