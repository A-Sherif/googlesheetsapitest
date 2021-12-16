const {google} = require('googleapis');
const keys = require('./keys.json');

const client = new google.auth.JWT(
    keys.client_email,
    null, 
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets.readonly']
);

client.authorize(function(err,tokens){

    if(err){
        console.log(err);
        return ;
    } else {
        console.log('Connected');
        gsrun(client)
    }

})

async function gsrun(cl){

const gsapi = google.sheets({
    version:'v4',
    auth: cl,
})

const opt = {
    spreadsheetId: '1nB8Mb6Zn1myuMlIcUEc1ErwNW_CzXWkg8cFXvbBeLCw',
    range: 'Sheet1'
};

    let data = await gsapi.spreadsheets.values.get(opt);
    console.log(data.data.values);

}