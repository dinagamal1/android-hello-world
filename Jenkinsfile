pipeline {
    agent {
       label 'emulator'
          }
    stages {
        stage('Build') {
            steps {
   //             sh 'gradle build'
            }
        }
        stage('Test') {
              steps {
      
  //      sh 'gradle test'

    } 
        }
        stage('Deliver') {
            steps {
                 
                sh 'gradle connectedAndroidTest'

            }
        }
    }
}
