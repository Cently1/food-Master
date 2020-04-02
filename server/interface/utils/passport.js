//依赖的几个包
//passwort是所以的node程序都能应用的,koa-passport是对他的一个封装,适配,passport-local是他的本地的策略
import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(async function(username,password,done){
    let where={
        username
    };
    // 查询用户表
    let result=await UserModel.findOne(where)
    if(result!=null){
        if(result.password===password){
            console.log('passport:',result);
            return done(null,result)
        }else{
            return done(null,false,'密码错误')
            console.log("passport密码错误:", result);
        }
    }else{
        console.log("passport用户不存在:", result);
        return done(null,false,'用户不存在')
    }
}))
//序列化
//作用：我查到用户登录验证成功，我把用户的数据存储到session
passport.serializeUser(function(user,done){
    done(null,user)
})

//反序列化
//作用：在每次请求的时候在session中读取用户对象
passport.deserializeUser(function(user,done){
    return done(null,user)
})

export default passport