import groovy.json.JsonSlurper
pipeline {
    agent none
    stages{
    
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
               sshpass -p 'ChangeMe!' scp app/build/outputs/apk/app-debug-androidTest.apk Administrator@10.0.0.7:/C:/Users/Administrator/Desktop 

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
                                script{
                                    try{
                                    def body = '{"name":"dina.gamal1@vodafone.com","password":"Voda@123"}'
    def http = new URL("https://hpmc12.mobilecenter.io/rest/client/login").openConnection() as HttpURLConnection
    http.setRequestMethod('POST')
    http.setDoOutput(true)
    http.setRequestProperty("Content-Type", "application/json; charset=UTF-8")

    http.outputStream.write("Body")
  
   
    def responsLogin = [:]    

    if (http.responseCode == 200) {
  
        responsLogin = new JsonSlurper().parseText(http.inputStream.getText('UTF-8'))
    } else {
    
       responsLogin = new JsonSlurper().parseText(http.errorStream.getText('UTF-8'))
    }
                                            println responsLogin

                                    } catch (Exception e) {
    println e
                                    }
                                
                                }                            }
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
            
            
            
        
        
    }
}
    
