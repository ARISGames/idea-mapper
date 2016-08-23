<?php
	date_default_timezone_set('UTC');

	// --------------------------------------------------
	// Functions
	function mail_utf8($to, $subject = '(No subject)', $message = '', $header = '') {
  		$header_ = 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=UTF-8' . "\r\n";
  		return mail($to, '=?UTF-8?B?'.base64_encode($subject).'?=', $message, $header_ . $header);
	}	

	function email_address_utf8($email_address)
	{
		if (preg_match("/(.*)<(.*)>/", $email_address, $regs)) {
		   // There is a name for the expeditor !
		   $email_address = '=?UTF-8?B?'.base64_encode($regs[1]).'?= <'.$regs[2].'>';
		} else {
		   // Nothing to do, the from is directly the email !
		   $email_address = $email_address;
		}

		return $email_address;
	}	

	function send_response($type, $value) {
	    $response['status'] = array(
	      	'type' => $type,
	      	'value' => $value
	    );

		$encoded = json_encode($response);
		header('Content-type: application/json');
		exit($encoded);
	}

	function send_email($name, $email, $url) {
		$to      	= $email;
		$subject	= "Thinking Visually: Organizer from " . $name;

		$headers 	= "From: " . email_address_utf8("Thinking Visually<info@thinkingvisually.com>") . chr(10);
		$headers   .= "Reply-To: " . email_address_utf8("Thinking Visually<info@thinkingvisually.com>") . chr(10);

		$message 	= '<html>';
		$message   .= '<body style="font-family:arial, helvetica">';
		$message   .= '<p>Please visit <a href="' . $url . '" target="_blank">' . $url . '</a> to see your chart</p>';
		$message   .= '</body>';
		$message   .= '</html>';
		
		return mail_utf8($to, $subject, $message, $headers);
	}


	if ((isset($_POST["email"])) && (isset($_POST["student"])) && (isset($_POST["url"])))
	{
		// --------------------------------------------------		
		//check if this is an ajax request
		if (!isset($_SERVER['HTTP_X_REQUESTED_WITH'])){
			die();
		}

		// --------------------------------------------------
		// Validate student post input
		$student = strlen(filter_input (INPUT_POST, "student", FILTER_SANITIZE_STRIPPED));
		if ($student <= 0) {
			$student = 'unknown-student';
		}
		$student = trim($_POST["student"]);

		// --------------------------------------------------
		// Validate url post input
		$url = strlen(filter_input (INPUT_POST, "url", FILTER_SANITIZE_STRIPPED));
		if ($url <= 0) {
			die();
		}
		$url = trim($_POST["url"]);

		// --------------------------------------------------
		// Validate email post input
		$email = strlen(filter_input (INPUT_POST, "email", FILTER_SANITIZE_STRIPPED));
		if ($email <= 0) {
			send_response('error', 'The email is required and cannot be empty');
		}

		$email = filter_input( INPUT_POST, "email", FILTER_VALIDATE_EMAIL );
		if (!$email) {
			send_response('error', 'The input is not a valid email address');
		}

		if (send_email($student, $email, $url)) {
			send_response('success', 'Message sent successfully!');	
		}
		else {
			send_response('error', 'Error sending mail!');
		}
	}
	else
	{
		send_response('error', 'Something wrong!');
	}
