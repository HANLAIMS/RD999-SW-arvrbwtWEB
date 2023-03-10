const models = require('../pgpmodels')

const get = async (req, res) => {
    const {email} = req.body
    models.db.any(
      `SELECT owner_name,
            owner_country,
            owner_code,
            hull_imo,
            hull_name,
            hull_flag,
            hull_delivery,
            hull_product,
            hull_product_ver,
            hull_product_installed_date
      FROM public.vw_hull_info`
    ).then((datalist) => {
        const list = new Array();
        datalist.forEach(data =>list.push(data))
        res.json({ list })
    })
    .catch((error) => {
        console.log('ERROR:', error)
        res.status(401).json({msg: 'Query failure'})
    })
    
}

const getone = async (req, res) => {
    const {id} = req.params
    const {email} = req.body
    models.db.one(
      `SELECT owner_name,
            owner_country,
            owner_code,
            hull_imo,
            hull_name,
            hull_flag,
            hull_delivery,
            hull_product,
            hull_product_ver,
            hull_product_installed_date
      FROM public.vw_hull_info
      where hull_imo = '${id}'`
    ).then((data) => {
        res.json({ data })
    })
    .catch((error) => {
        console.log('ERROR:', error)
        res.status(401).json({msg: 'Query failure'})
    })
    
}


module.exports = {
    get,
    getone
}