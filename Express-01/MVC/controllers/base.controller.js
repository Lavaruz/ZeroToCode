function getBase(req,res){
    res.render('index',{
        title: 'Intro',
        caption: "Hellow this is Assami Muzaki 001"
    })
}
module.exports= {getBase}