<?php
header('Content-type: application/json');
sleep(1);
?>

{
	"currentUserInformation":
	{
		"title" :"M",
		"firstname" :"antoine",
		"lastname" :"kafka",
		"maidenName" :null,
		"homePhoneNumber" :"+33101010101",
		"mobilePhoneNumber" :"+33606060606",
		"mainEmail" :"jerome.vdi@gmail.com",
		"emails" :["jerome.vdi@mail.fr","jerome.vdi@mail.com","jerome.vdi@neuf.fr"],
		"professionnalCategory" :"Agent/Employé (Public/Armées)",
		"address" :{
			"address" :"rue de la paix",
			"country" :"FR",
			"town" :"Paris",
			"addressCounterpart":null,
			"placeName" :null,
			"streetNumber" :"10",
			"zipCode" :"75001"
		},
		"userPhotoUrl" :"account/ff8081812ca143e4012ca14eaf50000a.jpg",
		"birthDate" :"12-17-1980",
		"commercialOptIn" :false,
		"secretQuestion" :"5"
	}
}