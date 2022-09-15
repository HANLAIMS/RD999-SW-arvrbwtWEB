const models = require('../pgpmodels')
const authService = require('../auth')

const getInitials = (name) => {
    let initials = name.split(' ');
    
    if(initials.length > 1) {
      initials = initials.shift().charAt(0) + initials.pop().charAt(0);
    } else {
      initials = name.substring(0, 2);
    }
    
    return initials.toUpperCase();
  }

function getRandomColor() {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

const login = async (req, res) => {
    const {email,password} = req.body
    let datavalue
    const user = models.db.one(
      `SELECT id_user, 
            user_account, 
            user_password, 
            user_email,
            user_name, 
            user_approval_level

      FROM public.tb_user
      WHERE user_lock = false
      AND user_account = '${email}'
      AND user_password = md5('${password}')`
    ).then((data) => {
        datavalue = data.id_user
        const accessToken = authService.signToken(data.id_user)
        const user = {
            info:{
                fullname: data.user_name,
                initial: getInitials(data.user_name),
                email: data.user_email,
                color: getRandomColor(),
                auth: data.user_approval_level,
            }
        }
        res.json({ accessToken, user })
    })
    .catch((error) => {
        console.log('ERROR:', error)
        res.status(401).json({msg: 'Login failure'})
    })
    
}


module.exports = {
    login
}