var focus;
var isVisible = false;
var toolipActive = false;
var emailAccept = false;
var tipoSelect;
var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

$('.selectric').selectric({
    maxHeight: 200
});

$(".chosen-select").chosen({no_results_text: "Oops, nothing found!",
    width: "30.250em"
});

$(".chosen-single span").text("Selecione"); 

$(".chosen-single div").addClass("icons-sprite arrow-assunto");

$(".chosen-search").append("<div class='icons-sprite close-assunto'></div>");

$(".close-assunto").on("click", function(){

    $(".chosen-container-single").removeClass("chosen-with-drop");
    $(".chosen-container-single").removeClass("chosen-container-active");

});

$('.selectric-combox .selectric .label').text("DOCUMENTO DE IDENTIFICAÇÃO");

$('.selectric-combox .selectric b').remove();

$('.selectric-combox .selectric').append("<div class='icons-sprite arrow-select-combox'></div>");

$('.selectric-combox .selectric').on("click", function(){

    $('.selectric-combox.selectric-open .selectric div').addClass("arrow-select-combox-open");

});

$('.selectric-combox').on("focusout change", function(){
    $('.selectric-combox .selectric div').removeClass("arrow-select-combox-open");
});

$('.selectric-select-default .selectric b').remove();

$('.selectric-select-default').prepend("<div class='icons-sprite arrow-select-open'></div>");

$('.selectric-select-default').children('.selectric').append("<div class='icons-sprite arrow-select'>&nbsp;&nbsp;&nbsp;</div>");


$('.selectric-select-default').children('.selectric').on("click",function(){

    $(this).children('div').toggle();
    $(this).parent('.selectric-select-default').children('.arrow-select-open').toggle();
    $(".selectric-items").removeAttr("style");

});
$('.selectric-select-default .selectric-items .selectric-scroll ul li').on("click",function(){
    console.log("dasd");
    $('.selectric-select-default .selectric div').toggle();
    $('.selectric-select-default .arrow-select-open').toggle();

});

$('.selectric-combox').append("<input type='text' class='input-clean'>");

$('.selectric-combox .input-clean').hide();

$('.selectric-combox .selectric').on('click', function(){

    $('.selectric-combox .input-clean').hide();

});

$('.selectric-combox').on('change', function(){

    $('.selectric-combox .input-clean').hide();
    $('.option-selected').addClass('show-option-selected');
    $('.selectric-combox .input-clean').show();
    $('.selectric-combox .selectric .button').show();

});

$('.icon-senha').on('click', function(){
    
    $('.msg-error').toggle();
    
});

$(document).click(function(){
  
    $('.selectric-select-default .arrow-select').show();
    $('.selectric-select-default .arrow-select-open').hide();

});

$('.btn-dropdown').on('click', function(){

    $(this).addClass('addBorder');
    $(this).on("focusout", function(){
        $(this).removeClass('addBorder');
    });
    
});

$('.input-email').keydown(function(){
    var email = $('.input-email').val();
    if (emailReg.test(email)) {
        $('.input-email').removeClass('email-erro');
        $('.input-email').addClass('email-accept');
        $('.mgs-error-email').hide(); 
        emailAccept = true;
    } 
    else {
        $('.input-email').removeClass('email-accept');
        $('.input-email').addClass('email-erro');
        emailAccept = false;
        if(focus==true && isVisible==false){
            $('.mgs-error-email').show();
            isVisible = true;
        }   

    }
});
$('.input-email').on('focus', function(){
    focus = true;
    isVisible = false;
    if($(this).hasClass('email-erro')){
       $('.mgs-error-email').show();
       $('.image-error').removeClass('show').addClass('hide'); 
   }
});

$('.input-email').on('blur', function(){
    $('.mgs-error-email').hide();
    if(emailAccept==true)
        $('.image-error').removeClass('show').addClass('hide');
    else
        $('.image-error').removeClass('hide').addClass('show');
});

$('.btn').on('click', function(){
    $(this).blur();
});

var clipboard = new Clipboard('.btn-copy');

clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});
