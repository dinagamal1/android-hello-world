import groovy.json.JsonSlurper


pipeline {
    agent {
       label 'emulator'
          }
	  environment {
    APPS = sh 'cat apps '
    }
    stages {
        stage('Build') {
            steps {
   //             sh 'gradle build'
		  sh'
		    echo env.APPS
		    
		    '
		    
                sh 'sudo chown dina:dina /dev/kvm'
            }
        }
        stage('Test') {
              steps {
      
  //      sh 'gradle test'
                                  sh 'sudo chown dina:dina /dev/kvm'


    } 
        }
        stage('Deliver') {
            steps {
                 
                sh '''
                chmod a+x ./gradlew
                ./gradlew connectedAndroidTest --info
                adb devices 
                pwd
                '''
            }
        }
 stage('connect to mc'){
     steps{
	     script {
	     
		def response = httpRequest consoleLogResponseBody: true, contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: '''{
		"name":"ahmed.abdelhamid2@vodafone.com",
		"password":"Voda@123"
		}''', responseHandle: 'LEAVE_OPEN', url: 'https://hpmc12.mobilecenter.io/rest/client/login'
		def json = new JsonSlurper().parseText(response.content)
                echo "Status: ${response.status}"
		echo "Status: ${response}"
                echo "Dogs: ${json}"
	     	def json1 = new JsonSlurper().parseText(response)
                echo "Status: ${response.status}"
		echo "Status: ${response}"
                echo "Dogs: ${json}"
	     
	     }
     	sh '''
	
	ls
	pwd
	chmod 777 Scripts/mc.groovy
	
	printenv | grep GROOVY
	groovy Scripts/mc.groovy 
	
	'''
     }
        }
    }
}
