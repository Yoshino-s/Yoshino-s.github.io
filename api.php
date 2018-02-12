<?php
	$all_query = array();
	
	require './api/blog_api.php';
	
	
	$query = $_POST['q'] ?? $_GET['q'] ?? 'default';
	$args_raw = $_POST['a'] ?? $_GET['a'] ?? '';
	$res = array();
	$res['query'] = $query;
	$res['args_raw'] = $args_raw;
	$res['args'] = json_decode($args_raw, true);
	if(!isset($res['args'])){
		$res['error'] = 'Args decode error:'.json_last_error();
	}
	
	if(isset($all_query[$query])) {
		$res['result'] = $all_query[$query]($res['args']);
	} else {
		$res['error'] = 'Cannot find query '.$query;
	}
	
	echo json_encode($res);
?>