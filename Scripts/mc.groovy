#!/usr/bin/env groovy

import groovy.json.JsonSlurper


println "hello world"
   def body = '{"name":"dina.gamal1@vodafone.com","password":"Voda@123"}'
                def http = new URL("https://hpmc12.mobilecenter.io/rest/client/login").openConnection() as HttpURLConnection
    http.setRequestMethod('POST')
    http.setDoOutput(true)
    http.setRequestProperty("Content-Type", "application/json; charset=UTF-8")

    http.outputStream.write(body.getBytes("UTF-8"))
  
    http.connect()

    def responsLogin = [:]    

    if (http.responseCode == 200) {
            println "200" 
            println "hello"
        responsLogin = new JsonSlurper().parseText(http.inputStream.getText('UTF-8'))
    } else {
    
       responsLogin = new JsonSlurper().parseText(http.errorStream.getText('UTF-8'))
    }

   def sessionidPair
   def token1Pair
   http.response.responseHeaders["Set-Cookie"].each { 
    if (it.contains("sessionid=")) sessionidPair = it
    if (it.contains("token1=")) token1Pair = it
   }
