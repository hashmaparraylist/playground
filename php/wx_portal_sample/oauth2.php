<?php

$code = $_GET['code'];
//$userinfo = getUserInfo($code);
$url = getUserInfo($code);

function getUserInfo($code) {
	$appid = "wx19b6cb2d6b7f55a5";
	$appsecret = "4ba00a069ed1265ada4aa769189933f3";
	$access_token = "";
	
	$url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=$appid&secret=$appsecret&code=$code&grant_type=authorization_code";
	$access_token_json = https_request($url);
	$access_token_array = json_decode($access_token_json,true);
	$access_token = $access_token_array['access_token'];
	$openid = $access_token_array['openid'];
	//echo $access_token;
	//echo $openid;
	
	$state = $_GET['state'];
	
	if ($state == 1) {
//		$url = "http://140.207.46.14:20041/goods/index?openid=$openid";
        $url = "http://www.qinqindoctor.com/goods/index?openid=$openid";
	} elseif ($state == 2) {
//		$url = "http://140.207.46.14:20041/cas/user/addDoctor?openid=$openid";
        $url = "http://www.qinqindoctor.com/cas/user/addDoctor?openid=$openid";
	} else {
//		$url = "http://140.207.46.14:20041/cas/user/personal?openid=$openid";
        $url = "http://www.qinqindoctor.com/cas/user/personal?openid=$openid";
	}
	
	//echo $url;
//	$url = "http://www.baidu.com";
	return $url;
}

function https_request($url){
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	$data = curl_exec($curl);
	if (curl_errno($curl)) {
		return "ERROR".curl_error($curl);
	}
	curl_close($curl);
	return $data;
	
}
?>
<html>
<head>
<!--script type="text/javascript">
	window.setTimeout(function() {
		window.location.href="<?php echo $url; ?>";
	}, 200);
</script-->
</head>
<body onload = "window.location.href='<?php echo $url;?>'"></body>
</html>
