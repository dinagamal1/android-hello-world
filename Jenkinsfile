
pipeline {
    agent {
       label 'emulator'
          }
    stages {
        stage('Build') {
            steps {
   //             sh 'gradle build'
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
	     
	httpRequest consoleLogResponseBody: true, contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: '''{
	"name":"ahmed.abdelhamid2@vodafone.com",
	"password":"Voda@123"
	}''', responseHandle: 'LEAVE_OPEN', url: 'https://hpmc12.mobilecenter.io/rest/client/login'
      
	httpRequest consoleLogResponseBody: true, contentType: 'APPLICATION_JSON', httpMode: 'POST', responseHandle: 'LEAVE_OPEN', uploadFile: '/home/dina/workspace/emulator/app/build/outputs/apk/app-debug.apk', url: 'https://hpmc12.mobilecenter.io/rest/apps?enforceUpload=false'
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
