const request =require('request')
const forecast =(latitude,longitude,callback)=>{
    const url ="https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+latitude+"%2C"+longitude+"?unitGroup=uk&key=XWL9XDF8WU55QVSCXUV3BQCEJ&include=fcst%2Ccurrent"

    request({url:url,json:true} ,(error,response)=>{
        if(error) callback('Unable to connect kindly  check your internet connection',undefined)
    else if(response.body==undefined) callback('The address entered is invalid kindly enter the address in the supported format',undefined)
    else
    {    
        callback(undefined,{
            temperature:response.body.currentConditions.temp,
            conditions: response.body.description
        })
    }
    })
}
// forecast('54.89','2.90',(error,response)=>{
//     if(error) console.log(error)
//     else
//     {   console.log(response)
//         console.log("The temperature  is " +response.temperature+"  degree centrigade")
//         console.log("The current state of the weather"+ response.conditions)
//     }
// })
module.exports=forecast