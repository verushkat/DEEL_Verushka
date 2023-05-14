const base = require('@playwright/test');

exports.customtest = base.test.extend(
{
testDataForOrder :{
        username   : "veru@gmail.com",
        password   :  "Veru1234*",
        productName : "iphone 13 pro"  
        }
}

)