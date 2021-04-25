
const path =require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const  forecast =require('./utils/forecast')
const port=process.env.PORT||3000


const app =express()
console.log(__dirname) 
const publicDiretoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partial')

//uses handlebar for rendering the views //
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)
//sets the location to the static assets
console.log(publicDiretoryPath)
app.use(express.static(publicDiretoryPath))
//This renders the view
app.get('',(req,res)=>{
    res.render('index',{
        title:'Home'
    })
})
//This renders the about page
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About the Application '

    })
})
//This renders the help page
app.get('/help',(req,res)=>{
    res.render('help',{
       title: 'help'
    })
})
//This renders the weather page
app.get('/weather',(req,res)=>
{
    //If no search term return an error//
    if(!req.query.address)
    {
        return res.send({
            error:"A search address should be provided please try again"
        })
    }
    geocode(req.query.address,(geocode_error,geocode_data)=>{
        if(geocode_error)
            return res.send({
                error:geocode_error
            })
        else
        {
            forecast(geocode_data.latitude,geocode_data.longitude,(forecast_error,forecast_data)=>{
                if(forecast_error)
                   return res.send({
                       forecast_error:forecast_error
                   })
                else
                  {
                      res.send({
                          location:geocode_data.location,
                          temp:forecast_data.temperature,
                          forecast:forecast_data.conditions
                      })
                  }
    
            })
        }
    })
    
    
})
//This renders the 404 page 
app.get('*',(req,res)=>{
    res.render('404')
})
app.listen(port,()=>{
    console.log("The server is set up on the server no 3000")
})