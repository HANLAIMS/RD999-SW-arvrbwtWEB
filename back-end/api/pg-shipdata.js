const models = require('../pgpmodels')

const getTotalOperation = async (req, res) => {
    const {id} = req.params
    models.db.any(
      ` select tom.operation_name,
            min(oh.operation_start_date),
            max(oh.operation_end_date),
            justify_interval(sum(oh.operation_duration)) total_operation_duration
        from public.tb_operation_mode tom
        left outer join "${id}".da_operation_history oh on oh.operation_name = tom.operation_name
        where operation_target_schema = '${id}'
        group by tom.operation_name
        order by (case when tom.operation_name = 'ballast' then 1 
                        when tom.operation_name = 'deballast' then 2 
                        when tom.operation_name = 'bypass' then 3 
                        else 4 end) asc`
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

const getColumnOfMode = async (req, res) => {
    const {id} = req.params
    const {opmode} = req.body
    models.db.any(
      ` select ifsc.column_name, 
                ifsc.data_type,
                dmd.meta_alias, 
                dmd.meta_hint, 
                dmd.meta_minrange, 
                dmd.meta_maxrange,
                dmd.meta_scale,
                dmd.meta_precision,
                dmd.meta_unit 
        from information_schema."columns" ifsc 
        left outer join "${id}".da_meta_data dmd 
        on ifsc.column_name = dmd.meta_header
        where ifsc.table_name  = 'da_mode_${opmode}'
        and dmd.meta_table = ifsc.table_name  
        and ifsc.table_schema = '${id}'`  
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
const getOperationOfMode = async (req, res) => {
    const {id} = req.params
    const {opmode,columnlist,startdate,enddate} = req.body
    models.db.any(
      ` select datetime ${columnlist}
        from "${id}".da_mode_${opmode}
        where datetime between '${startdate}' and '${enddate}'
        order by datetime asc`
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

const getAverageOperationOfMode = async (req, res) => {
    const {id} = req.params
    const {opmode,columnlist,startdate,enddate} = req.body
    models.db.any(
        ` select min(datetime) startdate, max(datetime) enddate ${columnlist}
        from "${id}".da_mode_${opmode}
        where datetime between '${startdate}' and '${enddate}'`
    ).then((data) => {
        res.json({ data })
    })
    .catch((error) => {
        console.log('ERROR:', error)
        res.status(401).json({msg: error})
    })
    
}

module.exports = {
    getTotalOperation,
    getColumnOfMode,
    getOperationOfMode,
    getAverageOperationOfMode,
}