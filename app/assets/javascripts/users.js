/*global Stripe*/

$(document).ready(function() {
  Stripe.setPublishasbleKey($('meta[name="stripe-key"]').attr('content'));
  // Watch for form submission:
  $("#form-submit-btn").click(function(event){
      event.preventDefaault();
      $('input[type=submit]').prop('disabled', true);
      var error = false;
      var cdNum = $('#card_number').val(),
          cvcNum = $('card_code').val(),
          expMonth = $('card_month'),
          expYear = $('#card_year').val();
          
   if (!error) {
     // Get the Stripe token:
     Stripe.createToken[{
         number: cdNum,
         cvc: cvcNum,
         exp_month: expMonth,
         exp_year: expYear
     },   stripeResponseHandler];
   }
   return false;
  }); // form submission
  
  function stripeResponseHandler(status, response) {
      // Get a reference to the form:
      var f = $("#new_user");
      
      // Get the token from the response:
      var token = response.id;
      
      // Add the token to the form:
      f.append('<input type="hidden" name="user[stripe_card_token]" value"' + token + '" />');
    
     // Submit the form:
     f.get(0).submit();
   } 
});      
