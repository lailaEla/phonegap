<?PHP
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: X-Requested-With');

/*			if (strpos($_GET['url'],'getTransferList/validableDemands') !== false) {
					header('Content-type: application/json');
			}
*/

// Change these configuration options if needed, see above descriptions for info.
$enable_jsonp    = false;
$enable_native   = true;
$valid_url_regex = '/.*/';

// ############################################################################
// var_dump($_GET); 
// var_dump($_POST);
// var_dump(file_get_contents('php://input'));
// die;
$url = $_GET['url'];
if ( !$url ) {
  
  // Passed url not specified.
  $contents = 'ERROR: url not specified';
  $status = array( 'http_code' => 'ERROR' );
  
} else if ( !preg_match( $valid_url_regex, $url ) ) {
  
  // Passed url doesn't match $valid_url_regex.
  $contents = 'ERROR: invalid url';
  $status = array( 'http_code' => 'ERROR' );
  
} else {



			//if (strpos($_GET['url'],'getTransferList') !== false) {
				echo '{ "total":1, "transfersList": [ { "subject": "Test transfert", "message": "Test corp du message", "state": "Donationfinished", "currency": "EUR",	"creationDate": "02-08-2011", "references": ["128253145261"],	"amount": "83.50", "dateToBeExecuted": "02-08-2011", "periodicity": null, "dayNumber": 0,	"requestType": "DONATION", "recurrenceEndDate": null, "suspension": {	"from": "2014-01-01", "to": "2014-02-01",	"suspended": false }, "executionType": "IMMEDIATE", "ids": ["ff8081812e04ac06012e04b6f7500004"], "photoUrl": "",	"debtor": "test33@malagasys.com", "creditor": "testlocal@malagasys.com", "availableActions": ["ACCEPT_DEMAND","REFUSE_DEMAND", "RELAUNCH_INVITATION","REFUSE_TRANSFER", "CANCEL_BY_CREATOR"] }]}';
			//}
			else 
			{
				
				if (strpos($_GET['url'],'getUserSecretQuestion') !== false) {
					echo '{ "userSecretQuestion": [ { "label" :"Question secrète ?" } ]}';
				}
				else
				{

					if (strpos($_GET['url'],'getPaymentList') !== false) {
						echo '{ "total":1, "transactionList": [ { "id" : "8a47b80226f55a370126f55b062f0004", "reference" : "125002eb-ceb0-4c8d", "orderDate" : "2013-01-23", "amount" : "200.00", "customerEmail" : "client@test.com", "merchantName" : "CDiscount", "fee" : "1.00", "stateMessage" : "Reçue et validée" } ] }';
					}
					else
					{
						if (strpos($_GET['url'],'getPaymentDetail') !== false) {
							echo '{ "paymentDetail": { "id" : "ff808181291123f801291124cf880003", "reference" : "S10250071085", "amount": "10.00", "finalAmount": "3.00", "fee":"5.00", "currency" : "EUR", "meanOfPayment" : "CB 488783XXXXXXXX75", "orderDate" : "2013-04-26", "shippingDate" : "2013-04-26", "billingAddress": { "address" : "45 rue de la paix", "country" : "France", "addressCounterpart":null, "zipCode" : "75001", "town" : "Paris", "placeName":null }, "shippingAddress": { "address" : "39 rue Victor Hugo", "country" : "France", "addressCounterpart":null, "zipCode" : "95640", "town" : "Haravilliers", "placeName":null }, "creditContractNumber" : null, "customerEmail" : "hari.seldon@foundation.gouv", "customerTitle" : "M", "customerFirstName" : "Hari", "customerLastName" : "Seldon", "customerHomePhoneNumber" : "0126459532", "customerMobilePhoneNumber" : "0602011425", "merchantName" : "Cdiscount", "merchantUrl" : "cdiscount.com","merchantOrderReference" : "123546854", "inComplaintState":false, "confirmationAuthorized": true, "nbInstalments": 1, "stateMessage":"Reçue et validée", "paymentTypeMessage": "en 1 fois après réception", "debited":true } }';
						}
						else
						{
							if (strpos($_GET['url'],'validateEndOfPayment') !== false) {
							}
							else
							{
								if (strpos($_GET['url'],'getCurrentUserInformation') !== false) {
									echo '{ "currentUserInformation": { "title" :"M", "firstname" :"antoine", "lastname" :"kafka", "maidenName" :null, "homePhoneNumber" :"+33101010101", "mobilePhoneNumber" :"+33606060606", "mainEmail" :"jerome.vdi@gmail.com", "secondaryEmails" :["jerome.vdi@mail.fr","jerome.vdi@mail.com"], "professionnalCategory" :"Agent/Employé (Public/Armées)", "address" : { "address" :"10 rue de la paix", "country" :"FR", "town" :"Paris", "addressCounterpart":null, "placeName" :null, "zipCode" :"75001" }, "userPhotoUrl" :"account/ff8081812ca143e4012ca14eaf50000a.jpg", "birthDate" :"12-17-1980", "commercialOptIn" :false } }';
								}
								else
								{
									if (strpos($_GET['url'],'getEventMessageList') !== false) {
										echo '{ "notificationList": [ { "message":"message 1", "displayDate":"03-25-2010", "alert":true, "seen":false },{ "message":"message 2", "displayDate":"03-26-2010", "alert":true, "seen":false },{ "message":"message 3", "displayDate":"03-16-2010", "alert":true, "seen":false } ] }';
									}
									else
									{								
									  $ch = curl_init( $url );
									  if ( strtolower($_SERVER['REQUEST_METHOD']) == 'post' ) {
										curl_setopt( $ch, CURLOPT_POST, true );
										curl_setopt( $ch, CURLOPT_POSTFIELDS, $_POST );
										curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents('php://input'));
										//file_get_contents('php://input')
									  }
									  
									  if ( $_GET['send_cookies'] ) {
										$cookie = array();
										foreach ( $_COOKIE as $key => $value ) {
										  $cookie[] = $key . '=' . $value;
										}
										if ( $_GET['send_session'] ) {
										  $cookie[] = SID;
										}
										$cookie = implode( '; ', $cookie );
										curl_setopt( $ch, CURLOPT_COOKIE, $cookie );
									  }
									  curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
									  curl_setopt( $ch, CURLOPT_HEADER, true );
									  curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
									  curl_setopt( $ch, CURLOPT_USERAGENT, $_GET['user_agent'] ? $_GET['user_agent'] : $_SERVER['HTTP_USER_AGENT'] );
									  list( $header, $contents ) = preg_split( '/([\r\n][\r\n])\\1/', curl_exec( $ch ), 2 );
									  $status = curl_getinfo( $ch );
									  curl_close( $ch );
									}
								}
							}
						}
					}
				}
			}
}

// Split header text into an array.
$header_text = preg_split( '/[\r\n]+/', $header );

if ( $_GET['mode'] == 'native' ) {
  if ( !$enable_native ) {
    $contents = 'ERROR: invalid mode';
    $status = array( 'http_code' => 'ERROR' );
  }
  // Propagate headers to response.
  foreach ( $header_text as $header ) {
    if ( preg_match( '/^(?:Content-Type|Content-Language|Set-Cookie):/i', $header ) ) {
      header( $header );
    }
  }
  print $contents;
} else {
  
  // $data will be serialized into JSON data.
  $data = array();
  
  // Propagate all HTTP headers into the JSON data object.
  if ( $_GET['full_headers'] ) {
    $data['headers'] = array();
    foreach ( $header_text as $header ) {
      preg_match( '/^(.+?):\s+(.*)$/', $header, $matches );
      if ( $matches ) {
        $data['headers'][ $matches[1] ] = $matches[2];
      }
    }
  }
  
  // Propagate all cURL request / response info to the JSON data object.
  if ( $_GET['full_status'] ) {
    $data['status'] = $status;
  } else {
    $data['status'] = array();
    $data['status']['http_code'] = $status['http_code'];
  }
  
  // Set the JSON data object contents, decoding it from JSON if possible.
  $decoded_json = json_decode( $contents );
  $data['contents'] = $decoded_json ? $decoded_json : $contents;
  
  // Generate appropriate content-type header.
  $is_xhr = strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
  header( 'Content-type: application/' . ( $is_xhr ? 'json' : 'x-javascript' ) );
  
  // Get JSONP callback.
  $jsonp_callback = $enable_jsonp && isset($_GET['callback']) ? $_GET['callback'] : null;
  
  // Generate JSON/JSONP string
  $json = json_encode( $data );
  
  print $jsonp_callback ? "$jsonp_callback($json)" : $json;
  
}

?>
