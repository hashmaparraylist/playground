<?php

	echo getAccessToken();
	
	function getAccessToken(){
		$tokenFile = "access_token.txt";//缓存文件名
		$data = json_decode(file_get_contents($tokenFile));
		
		if ($data->expire_time < time() or !$data->expire_time) {
			$appid = "wx19b6cb2d6b7f55a5";
			$appsecret = "4ba00a069ed1265ada4aa769189933f3";
			$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appid&secret=$appsecret";
			$res = getJson($url);
			$access_token = $res['access_token'];
			if($access_token) {
				$data_new['expire_time'] = time() + 7000;
				$data_new['access_token'] = $access_token;
				$fp = fopen($tokenFile, "w");
				fwrite($fp, json_encode($data_new));
				fclose($fp);
			}
		} else {
			$access_token = $data->access_token;
		}
		return $access_token;
	}
	 
	//取得微信返回的JSON数据
	function getJson($url){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); 
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$output = curl_exec($ch);
		curl_close($ch);
		return json_decode($output, true);
	}
?>