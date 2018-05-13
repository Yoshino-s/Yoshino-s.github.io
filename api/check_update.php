<?php
	$all_query["check_update"] = function ($args) {
		if($args["version"]=="stable") {
			return $args;
		}else {
			return array();
		}
	}
?>