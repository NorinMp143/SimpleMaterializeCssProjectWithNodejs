// form validate
$("#form").validate({
    rules: {
        uname: {
            required: true,
            minlength: 5
        },
        email: {
            required: true,
            email:true
        },
        password: {
            required: true,
            minlength: 8
        },
        contact: {
            required: true,
            minlength: 10,
            maxlength: 10
        }
    },
    //For custom messages
    messages: {
        uname:{
            required: "Enter a username",
            minlength: "Enter at least 5 characters"
        },
        email:{
            required: "Enter your email"
        }
    },
    errorElement : 'div',
    errorPlacement: function(error, element) {
      var placement = $(element).data('error');
      if (placement) {
        $(placement).append(error);
      } else {
        error.insertAfter(element);
      }
    }
 });

//  ajax request to nodejs

$(function(){
    $("#login").click(function(e){
        e.preventDefault();
        console.log("button clicked");
        var data = {
            contact: $("#contact").val()
        };
        console.log(data.contact);
        $.ajax({
            type: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/login/contact',						
            success: function(data) {
                if (data.result == 'redirect') {
                    //redirecting to main page from here.
                    window.location.replace(data.url);
                  }
                console.log('success');
                console.log(JSON.stringify(data));
            }
        });
        $("#form1").css('display','none');
        $("#form2").css('display','block');
    });
});

// $(function(){
//     $("#sendotp").click(function(e){
//         e.preventDefault();
//         console.log("verify button clicked");
//         var data = {
//             code: $("#otp").val()
//         };
//         console.log(data.code);
//         $.ajax({
//             type: "POST",
//             data: JSON.stringify(data),
//             contentType: 'application/json',
//             url: '/verify',						
//             success: function(data) {
//                 console.log('success');
//                 console.log(JSON.stringify(data));
//             }
//         });
//     });
// });