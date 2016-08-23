<?php error_reporting( E_ALL ); ?>
<?php
	date_default_timezone_set('UTC');

	function send_response($type, $value) {
	    $response['status'] = array(
	      	'type' => $type,
	      	'value' => $value
	    );

		$encoded = json_encode($response);
		exit($encoded);
	}

	$data = json_decode(file_get_contents("php://input"));

	if (isset($data->info))
	{
		############ Edit settings ##############
		$uploadDirectory	= '../assets/projects/'; //specify upload directory ends with / (slash)
		##########################################

		$info = json_decode($data->info);

		
		// --------------------------------------------------
		// Validate student_val post input
		$student_val = strlen(filter_var($info->studentName, FILTER_SANITIZE_STRIPPED));
		$student = str_replace(' ', '-', trim($info->studentName));
		$student = str_replace('/', '-', $student);
		$student = str_replace("\\", '-', $student);
		if ($student === '..') $student = 'nicetry';
		if ($student_val <= 0) {
			$student = 'unknown-student';
		}

		// Validate chart_type_val post input
		$chart_type_val = strlen(filter_var($info->chart->chartType->type, FILTER_SANITIZE_STRIPPED));
		$chart_type = trim($info->chart->chartType->type);
		if ($chart_type_val <= 0) {
			$chart_type = 'unknown-type';
		}
		
		// --------------------------------------------------
		// Create final upload directory 
		$uploadDirectory .= $student;
		if ((!file_exists($uploadDirectory)) && !is_dir($uploadDirectory)) {
	    	mkdir($uploadDirectory, 0777, true);
		}

		// --------------------------------------------------

		//Save JSON
		$date = date("Ymd-His");
		$organizer_name = $chart_type . '-' . $date;
		$file_name = $organizer_name . '.js';
		if(file_put_contents($uploadDirectory . '/' . $file_name, json_encode($info))) {
			$result = array('student_id' => $student, 'chart_type' => $chart_type, 'date' => $date);
			send_response('success', $result);
		}
		else{
			//send_response('error', 'Error Uploading File!');
			send_response('error', print_r(error_get_last()));
			//send_response('error', echo getcwd() . "\n";);
		}
	}
	else
	{
		send_response('error', 'Error Uploading File!');
	}
