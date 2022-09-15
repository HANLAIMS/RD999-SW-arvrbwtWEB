const models = require('../pgpmodels')

const inputvalue = async (req, res) => {
    let datavalue
    const {value,ff} = req.body
    models.db.one('SELECT $1 AS value',value*1+ff*1)
    .then((data) => {
        console.log('DATA:', data.value)
        datavalue = data.value
        res.json({item: data.value})
    })
    .catch((error) => {
        console.log('ERROR:', error)
        res.json({msg: error})
    })
}


module.exports = {
  inputvalue
}