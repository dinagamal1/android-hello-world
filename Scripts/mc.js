
const axios = require("axios");
const FormData = require('form-data');
const fs = require("fs");

const appFile = fs.createReadStream("application name which exist in the job workspace");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////Authentication Request//////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
axios({
        method: 'post',
        url: "https://hpmc12.mobilecenter.io/rest/client/login",
        data: {
            'name': 'you username',
            'password': 'you password'
        }
    })
    .then((response) => {

        const hpSecret = response.headers['x-hp4msecret'];
        const jSessionHeader = response.headers['set-cookie'][1];
        const jSessionPattern = '(?<=JSESSIONID=).*?(?=;Path)';
        const jSessionID = jSessionHeader.match(jSessionPattern)[0];
        const cookies = response.headers['set-cookie'];

        console.log("Successful Authenticaion", response.data);

        var bodyFormData = new FormData();
        const uploadHeaders = {
            'JSESSIONID': jSessionID,
            'x-hp4msecret': hpSecret,
            'Cookie': cookies
        };
        const headers = Object.assign(uploadHeaders, bodyFormData.getHeaders());
        //Append the application to the form data
        bodyFormData.append('File', appFile, 'application name which exist in the job workspace ');

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////Upload Application Request////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        axios({
                method: 'post',
                url: 'https://hpmc12.mobilecenter.io/rest/apps',
                data: bodyFormData,
                headers: headers,
                maxContentLength: Infinity
            })
            .then((response) => {
                console.log("Application Uploaded Successfully", response.data);
            })
            .catch((error) => {
                console.log("Failed to upload the application", error);
            });
    })
    .catch((error) => {
        console.log("Authentication Failed", error);
    }); 
