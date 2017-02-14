<?php

include_once("getAccessToken.php");

// 第三方平台传参
$openid=$_POST['openid'];
$first=$_POST['first'];
$keyword1=$_POST['keyword1'];
$keyword2=$_POST['keyword2'];
$remark=$_POST['remark'];
$thirdPartyUrl=$_POST['thirdPartyUrl'];

// 获取accesstoken
$access_token = getAccessToken();
error_log("$access_token=".$access_token);
// 发送消息模板url
$send_url = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=$access_token";
error_log("$send_url=".$send_url);
// 模板ID
// $template_id = "QX9UxBTEaRtvLcQN5m6DdZPHs7HntDQVuHO_0kPIYQc";
$template_id = "FAaJdRl57Lm2BA5eRcd91R1emBJJrTj_5HjsJ_b7wW8";

// 编辑模板内容
$template = array(
	"touser" => $openid,
	"template_id" => $template_id,
	"url" => $thirdPartyUrl,            
	"data" => array(
	       'first' => array(
	           'value' => $first,
	           'color' => '#000000'
	       ),
	       'keyword1' => array(
	           'value' => $keyword1,
	           'color' => '#000000'
	       ),
	       'keyword2' => array(
	           'value' => $keyword2,
	           'color' => '#000000'
	       ),
	       'remark' => array(
	           'value' => $remark,
	           'color' => '#000000'
	       )
	)
);

// 发送模板消息请求
echo https_request_post($send_url, $template);

function https_request_post($url, $template){
	$curl = curl_init();
	curl_setopt($curl,CURLOPT_HTTPHEADER,$this_header);
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($template) );
	$data = curl_exec($curl);
	error_log($data);
	if (curl_errno($curl)) {
		return "ERROR".curl_error($curl);
	}
	curl_close($curl);
	return $data;
}
?>