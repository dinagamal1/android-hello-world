pipeline {
    agent none
  stage('build in android and send apk for mc')
    {
        parallel{
    
        stage('android-slave')
        {
          agent {
       label 'emulator'
          }
            stages{
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
                adb install -r app/build/outputs/apk/app-debug-androidTest.apk
                scp app/build/outputs/apk/app-debug-androidTest.apk Administrator@10.0.0.7:/C:/Users/Administrator/Desktop 

                '''

            }
        }
            
            }
        }
       
            
             stage("mc") {
                    agent {
                        label "android-MC"
                    }
                    stages {
                        stage("build") {
                            steps {
                                sh "./run-build.sh"
                            }
                        }
                        stage("deploy") {
                             when {
                                 branch "master"
                             }
                             steps {
                                sh "./run-deploy.sh"
                            }
                        }
                    }
                }
            
            
            
        
        
    }}}
    
    
