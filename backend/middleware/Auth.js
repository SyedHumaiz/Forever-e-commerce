import jwt from 'jsonwebtoken'

const AuthUser = (req , res ,next) => {
    const {token} = req.headers;

    if (!token) {
        return res.json({success : false , message : "Not Authorized, Login again"})
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.body.userId = token_decode.id;
    next();
}

export default AuthUser