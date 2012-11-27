<?php
	$url = htmlentities($_GET['url'],ENT_QUOTES,"UTF-8");
?><!DOCTYPE html>
<html lang=en>
	<head>
		<meta charset="UTF-8">
		<title>RWD</title>
		<style>
			body {
				padding: 2em; margin: 0; }
			iframe {
				float: left;
				margin-left: 4em; border-width: 0;
				overflow-x: hidden; outline: 1px solid #999; }
			h2+iframe {
				margin-left: 0; }
			div {
				clear: both;
				padding: 0 1em 1em 1em;
				overflow: hidden; }
		</style>
	</head>
	<body>
		<div class="breakpoint_1">
			<h2>Breakpoint 1 (0 to 319)</h2>
			<iframe src="<?php echo $url ?>" width="319" height="480"></iframe>
		</div>

		<div class="breakpoint_2">
			<h2>Breakpoint 2 (320 to 479)</h2>
			<iframe src="<?php echo $url ?>" width="320" height="480"></iframe>
			<iframe src="<?php echo $url ?>" width="479" height="480"></iframe>
		</div>

		<div class="breakpoint_3">
			<h2>Breakpoint 3 (480 to 699)</h2>
			<iframe src="<?php echo $url ?>" width="480" height="1024"></iframe>
			<iframe src="<?php echo $url ?>" width="699" height="1024"></iframe>
		</div>

		<div class="breakpoint_4">
			<h2>Breakpoint 4 (700 to 959)</h2>
			<iframe src="<?php echo $url ?>" width="700" height="1024"></iframe>
			<iframe src="<?php echo $url ?>" width="959" height="1024"></iframe>
		</div>

		<div class="breakpoint_5">
			<h2>Breakpoint 5 (960 to 1279)</h2>
			<iframe src="<?php echo $url ?>" width="960" height="1024"></iframe>
			<iframe src="<?php echo $url ?>" width="1279" height="1024"></iframe>
		</div>

		<div class="breakpoint_6">
			<h2>Breakpoint 6 (1280 and up)</h2>
			<iframe src="<?php echo $url ?>" width="1280" height="1024"></iframe>
		</div>
	</body>
</html>