@Grab(group='org.codehaus.groovy.modules.http-builder', module='http-builder', version='0.7' )
import java.lang.*
import java.util.*
import java.io.*
import java.net.*
import groovy.lang.*
import groovy.util.*
import java.math.BigInteger
import java.math.BigDecimal
import groovyx.net.http.ContentType


http.request(POST) {
    uri.path = 'https://hpmc12.mobilecenter.io/rest/client/login'
    body = [name: 'ahmed.abdelhamid2@vodafone.com', password: 'Voda@123']
    requestContentType = ContentType.JSON

    response.success = { resp ->
        println "Success! ${resp.status}"
    }

    response.failure = { resp ->
        println "Request failed with status ${resp.status}"
    }
}


pipeline {
    agent none
    stages{
    
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
                          println responsLogin                            }
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
}
    
