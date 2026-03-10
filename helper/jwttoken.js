 export const sendToken = (user, statusCode, res)=>{
     
 // Parse cookie expire time - supports formats like "6d" (days) or plain number (days)
 let cookieExpire = process.env.COOKIE_EXPIRE_TIME || "6";
 // Extract just the numeric part if it has suffix like "d"
 cookieExpire = parseInt(cookieExpire.replace(/[^0-9]/g, '')) || 6;
 const cookie_expire_date = cookieExpire;
 const token = user.getJWTToken()
     const option ={
         maxAge:cookie_expire_date * 24 * 60 * 60 * 1000,//
         httpOnly:true,//httpOnly:true means that the cookie can only be accessed through http request
         //secure:process.env.NODE_ENV === 'production',
         sameSite:"lax",
     }
     console.log('is object a data function',option.maxAge);
     console.log('');
     
     
     res.status(statusCode).cookie('token', token, option ).json
     ({
         success:true,
         user,
         token,
     });
};
