function isValidEmail(email) {
	var emailRx = /^[\w\.-]+@[\w\.-]+\.\w+$/;
	return  emailRx.test(email);
}

(function($){

	$.fn.formValidation = function(){

		return this.each(function(){

			var $form = $(this),
				$status = $form.find('.status'),
				$name = $form.find('#name'),
				$email = $form.find('#email'),
				$message = $form.find('#message'),
				$spam = $form.find('#spam'),
				$reset = $form.find('input[type=reset]'),
				$fields = $form.find('input[type=text], textarea');

			function setError(errorMessage, $field){
				$status.html(errorMessage).slideDown(300);
				$field.focus().addClass('error');
			}

			//initialise
			$status.hide();

			$form.submit(function(e){

				e.preventDefault();
				$fields.removeClass('error');

				if(!$name.val()){
					setError("Please enter your name", $name);
				}else if(!$email.val()){
					setError("Please enter your email", $email);
				}else if(!isValidEmail($email.val())){
					setError("Please enter a valid email", $email);
				}else if(!$message.val()){
					setError("Please enter your message", $message);
				}else if($spam.val()){
					setError("You have spammed me", $spam);
				}else{
					$status.html("Email being sent... please wait").slideDown(300);

					//send the email
					var formData = $form.serialize();
					$.post("send-mail.php", formData, function(sent){
						if(sent){
							$status.html("Thank you "+$name.val()+", your message has been sent");
						}else{
							$status.html("Oops, something went wrong");
						}
					})

				}
				
			})//end submit

			$reset.click(function(){
				$status.slideUp(300);
				$fields.removeClass('error');
			})

		});

	}

})(jQuery)