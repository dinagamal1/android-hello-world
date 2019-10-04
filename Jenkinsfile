
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
      
     	sh '''
	
	ls
	pwd
	chmod 777 Scripts/mc.groovy
	groovy /Scripts/mc.groovy 
	
	'''
     }
        }
    }
}
