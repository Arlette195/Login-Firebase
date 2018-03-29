(function(){
	const config = {
					    apiKey: "AIzaSyAG8Yr_SN4v20o8farJZ_-MoqaJqYfvokI",
					    authDomain: "login-firebase-c440b.firebaseapp.com",
					    databaseURL: "https://login-firebase-c440b.firebaseio.com",
					    projectId: "login-firebase-c440b",
					    storageBucket: "",
					    messagingSenderId: "338955261735"
			 		 };
 		firebase.initializeApp(config);

 	

 	$("#btn-inicia").click(function(){
 		var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
 		const email = $("#correo-inicio").val();
 		var pass = $("#pass-inicio").val();
 		var a;
 				if(pass==""){
 					$("#passerr-inicio").css("display",'block');
 					a= false;
 				}else{
 					$("#passerr-inicio").css("display",'none');
 					a= true;
 				}
 				if (emailreg.test(email) && a==true) {
                	$("#err-inicio").css("display",'none');
                	$("#passerr-inicio").css("display",'none');
                	$("#datos-inicio").css("display",'none');
                	const auth = firebase.auth();
                	const promise = auth.signInWithEmailAndPassword(email,pass);
                	promise.catch(e=>{
                			$("#datos-inicio").css("display",'block');
                		
                	});
                	
                	}else{
               		 $("#err-inicio").css("display",'block');
                	 return false;
            	}
 			

 	});	

 	$("#crear").click(function(){
 		$("#secc-registro").css("display",'block');
 		$("#secc-inicio").css("display",'none');	

 		 	var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var a,b;

 		$("#pass1-registro").keyup(function(){
 			var pass1 = $("#pass1-registro").val();
 			if(pass1.length<8 || pass1.length>16){
 				$("#error-pass1").text("La contraseña debe contener de 8 a 16 caracteres");
 				a=false;
 			}
 			else{
 				$("#error-pass1").text("");
 				a= true;
 			}
 		});

 		$("#pass2-registro").keyup(function(){
 			var pass1 = $("#pass1-registro").val();
 			var pass2 = $("#pass2-registro").val();
 			if(pass1 == pass2){
 				$("#succ").css("display",'inline');
 				$("#err").css("display",'none');
 				b= true;
 			}
 			else{
 				$("#succ").css("display",'none');
 				$("#err").css("display",'inline');
 				b= false;
 			}
 		});

 	$("#btn-registra").click(function(e){
 			var correo = $("#correo-registro").val();
 			var pass = $("#pass2-registro").val();
 			if (correo=="" || $("#pass1-registro").val()=="" || $("#pass2-registro").val()=="") {
 				$("#error-datos").css("display",'block');
 				$("#succ").css("display",'none');
 				return false;
 				
 			}
 			if(a==false || b==false){
 				return false;
 			}
 			if (correo=="") {
 				$("#error-datos").css("display",'block');
 				return false;
 			}else{
 				$("#error-datos").css("display",'none');
 				if (emailreg.test(correo)) {
                	$("#error-correo").css("display",'none');

                	const auth = firebase.auth();
                	const promise = auth.createUserWithEmailAndPassword(correo,pass);
                	promise.catch(e=>{
                		if (e.message=='The email address is already in use by another account.'){
                			$("#error-datos").text('La cuenta ya existe');
                			$("#error-datos").css("display",'block');
                		}
                		
                	});
                	
                	}else {
               		 $("#error-correo").css("display",'block');
                	 return false;
            	}
 			}

 		});	
 	});


 	$("#btn-cerrar").click(function(){
 		firebase.auth().signOut();
 		$("#inicio_sesion")[0].reset();
 		$("#registro_nuevo")[0].reset();
 		$("#err").css("display",'none');
 		$("#succ").css("display",'none');
 		
 	});


 	firebase.auth().onAuthStateChanged(firebaseUser =>{
 		if (firebaseUser) {
 			$("#secc-registro").css("display",'none');
 			$("#secc-inicio").css("display",'none');
 			$("#panel").css("display",'block');
 			$("#datos-inicio").css("display",'none');


 			console.log('logeado');
 		}else{
 			console.log("not logged in");
 			$("#secc-registro").css("display",'none');
 			$("#secc-inicio").css("display",'block');
 			$("#panel").css("display",'none');
 			
 			

 		}
 	});





}());