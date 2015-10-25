var reviewViewTpl = require('raw!./reviewTemplate.ejs');
var _ = require('underscore');
var Backbone = require('backbone');
var $app = $('#app');
var dataFunctions = require("../lib/data");

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
        
        var $captcha = grecaptcha.getResponse()
        // console.log($captcha)
        
        var validCaptcha = validateCaptcha($captcha)
        // console.log(validCaptcha)    
        
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
        setTimeout(function() {
            grecaptcha.render("captcha", {
                sitekey: '6LdWQA8TAAAAABu4iozSs7PzueWAkYjOP7WEE5tD'
            });
        }, 0);
        return this;
    }
});

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


function showReveal(review, breederId) {
    $('#myModal').foundation('reveal', 'open');

    $(".close-reveal-modal").on('click', function() {
        dataFunctions.postReview(review)
            .then(function() {
                Backbone.history.navigate('#/breeder/' + breederId);
            });
    });
    $(".file-input").on('change', function(){
        var $fileName = $( this ).val().substring($( this ).val().lastIndexOf("\\") + 1)
        $(".fileName").text($fileName);
        $("#fileUploadDiv").css('padding-right', '20px');
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
        

        var validDate = true;
        var validDam = true;
        var validSire = true;
        var validName = true;
        var birthday;

        // var validBreed = validateBreed($breed);

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
            review.breedId = $breed;
            review.breedName = $breedName;
            
            
            var fileInputElement = document.getElementById("imageInput")
            var files = $(fileInputElement)[0].files[0];
            // data.form.find('#content-type').val(file.type)
            // data.submit()
            
            files.ContentType = files.type
            var formData = new FormData();
            console.log(files)
            formData.append('data', JSON.stringify(review));
            formData.append("fileUpload", files);
            // formData.append("fileUpload", files);
            // formData.append("fileUpload", $(fileInputElement)[0].files[0]);
            // console.log(formData)
            dataFunctions.postReview(formData)
                // .then(function() {
                //     $('#myModal').foundation('reveal', 'close');
                //     Backbone.history.navigate('#/breeder/' + breederId);
                // });
        }
    });
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


module.exports = ReviewView;