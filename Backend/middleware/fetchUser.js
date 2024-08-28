const jwt = require('jsonwebtoken')
const jwtstring="hari@mohan$jha."
const fetchUser = (req, res, next)=>{
    const token = req.header('auth-token') // getting token value from req.header
    if(!token)
    {
        return res.status(401).send('unauthorized: please login with correct token')
    }
    try {
        const data= jwt.verify(token,jwtstring) // geting values from token we can see it as reverse of how we send 
        req.user=data.user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send('unauthorized: please login with correct token')
    }

}
module.exports = fetchUser