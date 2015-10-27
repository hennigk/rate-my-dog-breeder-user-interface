var reviewViewTpl = require('raw!./reviewTemplate.ejs');
var _ = require('underscore');
var Backbone = require('backbone');
var $app = $('#app');
var dataFunctions = require("../lib/data");
var widgetId1;
var widgetId2;
var MyApp = new Backbone.Router();

var ReviewView = Backbone.View.extend({
    template: _.template(reviewViewTpl),
    tagName: 'div',
    model: null,
    events: {
        'click #submitReview': 'submitReview',
    },
    submitReview: function() {
        var $rating = $("input:radio[name=rating]:checked").val();
        var $review = $("#review").val();
        var history = Backbone.history.getFragment();
        var breederId = history.substring(history.indexOf("breeder/") + 8, history.lastIndexOf("/"));

        var validReview = validateReview($review);
        var validRating = validateRating($rating);
        
        var $captcha = grecaptcha.getResponse(widgetId1);
        var validCaptcha = validateCaptcha($captcha);
        
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        var reviewDate = mm + "/" + dd + "/" + yyyy;
        
        if (validRating) {
            
        // if (validReview && validRating && validCaptcha) {
            var review = {
                "content": $review,
                "reviewDate": reviewDate,
                "rating": $rating,
                "breederId": breederId,
                'captcha': $captcha
            };
            
            showReveal(review, breederId);
        }

    },
    render: function() {
        this.$el.html(this.template({
            review: this.model 
        }));
        setTimeout(function onloadCallback() {
                widgetId1 = grecaptcha.render("captcha", {
                    sitekey: '6LdWQA8TAAAAABu4iozSs7PzueWAkYjOP7WEE5tD'
                });
                widgetId2 = grecaptcha.render("secondCaptcha", {
                    sitekey: '6LdWQA8TAAAAABu4iozSs7PzueWAkYjOP7WEE5tD'
                });
        }, 0);
        
        return this;
    }
});




function showReveal(review, breederId) {
    $('#myModal').foundation('reveal', 'open');

    $(".close-reveal-modal").on('click', function() {
        submitReview(review, breederId, true);
    });
    $(".file-input").on('change', function(){
        var className = $(this).attr('class')
        var className = "#" + className.split(' ')[1];
        var $fileName = $( this ).val().substring($( this ).val().lastIndexOf("\\") + 1)
        $(className).attr('placeholder', $fileName);
        // $("#fileUploadDiv").css('padding-right', '20px');
    })
        
    $("#submitDogInfo").on('click', function() {
        var $breed = $(".breed").val();
        var $dam = $("#dam").val();
        var $sire = $("#sire").val();
        var $dogName = $('#dogsName').val();
        var $breedName = ($(".breed option[value=" + $breed + "]").text());
        var $month = Number($("#month").val());
        var $day = $("#day").val();
        var $year = $("#year").val();
        
        if ($('#captchaSecondRow').css('display') !== 'none') {
            var $captchaReveal = grecaptcha.getResponse(widgetId2);
            var validCaptcha = validateCaptcha($captchaReveal)
            if( $captchaReveal !== review.captcha ){
                review.captcha = $captchaReveal
            }
        }
        

        var validDate = true;
        var validDam = true;
        var validSire = true;
        var validName = true;
        var birthday;

        if (Number($breed)) {
            review.breedId = $breed;
            review.breedName = $breedName;
        }

        if ($month || $day || $year) {
            validDate = validateDate($month, $day, $year);
            if (!validDate) {
                $("#birthdaySelect").show();
                $('#bdayLabel').css('color', 'red');
            }
        }
        if ($dogName) {
            validName = validateParents($dogName);
            if (!validName) {
                $("#nameSelect").show();
                $('#nameLabel').css('color', 'red');
            }
        }
        if ($dam) {
            validDam = validateParents($dam);
            if (!validDam) {
                $("#damSelect").show();
                $('#damLabel').css('color', 'red');
            }
        }
        
        if ($sire) {
            validSire = validateParents($sire);
            if (!validSire) {
                $("#sireSelect").show();
                $('#sireLabel').css('color', 'red');
            }
        }

        if (validDate && $month) {
            birthday = Number($month) + "/" + Number($day) + "/" + Number($year);
        }

        if (validDate && validDam && validSire && validName) {
            review.dam = $dam;
            review.sire = $sire;
            review.dogName = $dogName;
            review.birthDate = birthday;
            
            submitReview(review, breederId);
            $(this).attr("disabled", "disabled");
        }
    });
}

function submitReview(review, breederId, close){
    var fileInputElement1 = document.getElementById("imageInput1");
    var fileInputElement2 = document.getElementById("imageInput2");
    var fileInputElement3 = document.getElementById("imageInput3");
    
    var file1 = $(fileInputElement1)[0].files[0];
    var file2 = $(fileInputElement2)[0].files[0];
    var file3 = $(fileInputElement3)[0].files[0];
    var files = [file1, file2, file3]
    
    var formData = new FormData();
    formData.append('data', JSON.stringify(review));
    
    for (var i = 0; i < files.length; i++) {
        if (files[i]) {
            if (files[i].size > 5242880) {
                $('#maxImage').css('color', 'red')
                $('#maxImage').css('color', 'red');
                $('#submitReview').prop('disabled', false);
                return;
            }
            if (files[i].type.indexOf('image') < 0) {
                $('#maxImage').text('file must be under 5MB and must be an image');
                $('#maxImage').css('color', 'red');
                $('#submitReview').prop('disabled', false);
                return;
            }
            if (files[i]){
                formData.append("fileUpload"+i, files[i]);
            }
        }
    }
    
    // formData.append("fileUpload1", file1);
    // formData.append("fileUpload2", file2);
    // formData.append("fileUpload3", file3);
    dataFunctions.postReview(formData)
    .done(function(response){
        $('#myModal').foundation('reveal', 'close');
        grecaptcha.reset(widgetId1);
        grecaptcha.reset(widgetId2);
        $('#submitDogInfo').removeAttr("disabled", "disabled");
        MyApp.navigate('#/breeder/' + breederId);
        // Backbone.history.navigate('#/breeder/' + breederId);
    }).fail(function(err){
         $('#submitDogInfo').removeAttr("disabled", "disabled");
        grecaptcha.reset(widgetId1);
        grecaptcha.reset(widgetId2);
        var error = JSON.parse(err.responseText)
        postError(error.error.message, close)
    })

}
function postError(error, close){
    if ( close ) {
        grecaptcha.reset(widgetId1);
    }
    else {
        $('#captchaSecondRow').show();
        grecaptcha.reset(widgetId2)
    }
    switch (error) {
        case 'filesize':
            $('#maxImage').text('Invalid Image - File exceeds 10MB')
            $('#maxImage').css('color', 'red')
            $('#submitDogInfo').prop('disabled', false);
            return;
        case 'filetype':
            $('#maxImage').text('file must be under 10MB and must be an image')
            $('#maxImage').css('color', 'red')
            $('#submitDogInfo').prop('disabled', false);
            return;
        case 'captcha':
            grecaptcha.reset(widgetId1);
            grecaptcha.reset(widgetId2);
            return;
        default:
            grecaptcha.reset(widgetId1);
            grecaptcha.reset(widgetId2);
            return;
    }
}

function validateCaptcha(captcha){
    if (!captcha){
        $("#invalidCaptcha").show();
        return false
    }
    else {
        return true
    }
}
function validateDate(month, day, year) {
    var validBirthday = true;
    var monthLength = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (isNaN(month) || Number(month) > 12 || Number(month) < 1) {
        validBirthday = false;
    }
    if (isNaN(day) || Number(day) < 1 || Number(day) > monthLength[Number(month) - 1]) {
        validBirthday = false;
    }
    if (year < 1000 || year > new Date().getFullYear()) {
        validBirthday = false;
    }
    return validBirthday;
}

function validateRating(rating) {
    var valid = false;
    if (rating > 0 && rating <= 5) {
        valid = true;
    }
    if (!valid) {
        $("#ratingSelect").show();
        $('#ratingLabel').css('color', 'red');
    }
    return valid;
}

function validateParents(parent) {
    if (parent.length > 200 || parent.length < 2 || !isNaN(parent)) {
        return false;
    }
    else {
        return true;
    }
}


function validateReview(review) {
    var valid = false;
    if (review.length > 10) {
        valid = true;
    }
    if (!valid) {
        $("#reviewSelect").show();
        $('#reviewLabel').css('color', 'red');
    }
    return valid;
}

module.exports = ReviewView;