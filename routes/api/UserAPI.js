var express = require('express');
var router = express.Router();
const upLoadImage = require("../../MiddleWare/UpLoadImage")
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userController = require('../../components/User/UserController')
//http://localhost:3000/user/api/login
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        const user = await userController.login(email, password);
        console.log("aaaaaaaaa", user)
        if (user) {
            const token = jwt.sign({ user }, 'secret', { expiresIn: '1h' })
            return res.status(200).json({ result: true, user: user, token: token, message: "Login Success" });
        } else {
            return res.status(400).json({ result: false, user: null, token: null, message: "Login Failed" });
        }
    } catch (error) {
        console.log(error);
        // next(error); for web
        //api 200
        //error can control 400
        //error can't controll system 500
        return res.status(500)
            .json({ result: false, message: 'Error System' })
    }
})
//http://localhost:3000/user/api/loginGoogle
router.post('/loginGoogle', async (req, res, next) => {
    try {
        const { email, name, avatar } = req.body;

        const user = await userController.loginGoogle(email, name, avatar);
        if (user) {
            return res.status(200).json({ result: true, user: user, message: "Login Google Success" });
        }
        return res.status(400).json({ result: false, user: null, token: null, message: "Login Google Failed" });
    } catch (error) {
        return res.status(500).json({ result: false, message: 'Error System' })
    }
});


//http://localhost:3000/user/api/register
router.post('/register', [], async (req, res, next) => {
    try {
        const { email, password, name, description, avatar, role, createAt,
            updateAt, isLogin, isActive, isVerified, verificationCode, isAble } = req.body;
        console.log(email, password, name, description, avatar, role, createAt,
            updateAt, isLogin, isActive, isVerified, verificationCode)
        const user = await userController.register(email, password, name, description, avatar, role, createAt,
            updateAt, isLogin, isActive, isVerified, verificationCode, isAble);
        console.log(user)

        if (user) {
            await userController.sendMailForNewAccount(email);
            return res.status(200).json({ result: true, user: user, message: "Register Success" });
        }
        return res.status(400).json({ result: false, user: null, message: "Register Failed" });
    } catch (error) {
        return res.status(500).json({ result: false, user: null })
    }
})

//http://localhost:3000/user/api/update
router.put('/update', async (req, res, next) => {
    try {
        const { email, password, name, description,
            avatar, role, createAt, updateAt, isLogin, isAble } = req.body;
        console.log(email, password, name, description,
            avatar, role, createAt, updateAt, isLogin);

        const user = await userController.updateUser(email, password, name, description,
            avatar, role, createAt, updateAt, isLogin, isAble);
        console.log(user)
        if (user) {
            return res.status(200).json({ result: true, user: user, message: "Update Success" })
        } else {
            return res.status(400).json({ result: false, user: null, message: " user not exist" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ result: false, user: null })
    }
})
//http://localhost:3000/user/api/list
router.get('/list', async (req, res, next) => {
    try {
        const users = await userController.getAllUser();
        console.log(users)
        return res.status(200).json({ result: true, users: users });
    } catch (error) {
        console.log("List User:" + error)
        return res.status(500).json({ result: false, massage: "Can't get list user" })
    }
})
//http://localhost:3000/user/api/send-mail
router.post('/send-mail', async (req, res, next) => {
    try {
        const { email, subject } = req.body;
        let content = '<h1>Wellcome to ... <h1>';
        const result = await userController.sendMail(email, subject, content);
        return res.status(200).json({ result: result });
    } catch (error) {
        console.log("MAIL:" + error)//API
        return res.status(500).json({ result: false, massage: "Can't get list user" })//app
    }
})
//http://localhost:3000/user/api/search
router.get('/search', async (req, res, next) => {
    try {
        let { email } = req.body;
        let { name } = req.body;

        console.log(email)
        const user = await userController.search(email, name);
        console.log(user);
        if (user) {
            res.status(200).json({ message: "Search Success", result: true, user: user, });
        } else {
            res.status(400).json({ result: false, user: null });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, massage: "Failed to search" })
    }
})
//http://localhost:3000/user/api/delete
//Shouldn't use this cause data is money 
router.delete('/delete', async (req, res, next) => {
    try {
        const { email } = req.query;
        const user = await userController.deleteUser(email);
        if (user) {
            res.status(200).json({ result: true, message: "Delete Success" })
        } else {
            res.status(400).json({ result: false, massage: "Delete Failed" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ result: false, massage: "Error System" })
    }
})
//http://localhost:3000/user/api/upload-avatar
router.post('/upload-avatar', [upLoadImage.single('image')], async (req, res, next) => {
    try {
        const { file } = req;
        if (file) {
            const link = `http://10.0.2.2:3000/images/${file.filename}`;
            return res.status(200).json({ result: true, link: link })
        }
        return res.status(400).json({ result: false, link: null })

    } catch (error) {
        console.log("Failed to updaload error:" + error);
        return res.status(500).json({ result: false, massage: "Failed to updaload avatar" })
    }
})
//http://localhost:3000/user/api/change-password
router.put('/change-password', [], async (req, res, next) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        console.log(email, oldPassword, newPassword)
        const user = await userController.changePassword(email, oldPassword, newPassword);
        console.log(user)
        if (user) {
            res.status(200).json({ result: true, message: "Change Password Success" })
        } else {
            res.status(400).json({ result: false, massage: "Change Password Failed" })
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ' });
    }
});
//http://localhost:3000/user/api/send-verification-code
router.post('/send-verification-code', async (req, res) => {
    try {
        const { email } = req.body;
        let subject = "Food Shop Account Verification";
        const verifyCode = (Math.floor(Math.random() * 90000) + 10000)
        console.log("--->", verifyCode)
        // const randomCode = crypto.randomBytes(3).toString('hex');
        // const numberOnly = randomCode.replace(/\D/g, '');
        // console.log(numberOnly);
        const result = await userController.sendVerifyCode(email, subject, verifyCode);
        return res.status(200).json({ message: "Send Success", result: result });
    } catch (error) {
        console.log("MAIL:" + error)//API
        return res.status(500).json({ result: false, massage: "ERROR Send" })//app
    }
});
//http://localhost:3000/user/api/verify-email
router.post('/verify-email', async (req, res) => {
    try {
        const { email, verifyCode } = req.body;
        const result = await userController.verifyCode(email, verifyCode);
        return res.status(200).json({ message: "Verify Success", result: result });
    } catch (error) {
        console.log("MAIL:" + error)//API
        return res.status(500).json({ result: false, massage: "ERROR Verify" })//app
    }
});
//http://localhost:3000/user/api/disable
router.put('/disable', async (req, res, next) => {

    try {
        //const { email } = req.params;
        const { email, isAble } = req.body;
        console.log(isAble);
        const user = await userController.disableAccount(email, isAble);
        console.log(user)
        if (user) {
            return res.status(200).json({ result: true, user: user, message: "Disabled" })
        } else {
            return res.status(400).json({ result: false, user: null, message: " user not exist" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ result: false, user: null })
    }
});
//http://localhost:3000/user/api/login2
router.post('/login2', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        const user = await userController.login(email, password);
        console.log("aaaaaaaaa", user)
        if (user) {
            if (user.isAble) {
                const token = jwt.sign({ user }, 'secret', { expiresIn: '1h' })
                return res.status(200).json({ result: true, user: user, token: token, message: "Login Success" });
            }
            else {
                return res.status(400).json({ result: false, message: "Tài khoản của bạn đã bị vô hiệu hóa" });
            }
        } else {
            return res.status(400).json({ result: false, user: null, token: null, message: "Login Failed" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500)
            .json({ result: false, message: 'Error System' })
    }
})

//http://localhost:3000/user/api/logout
router.put('/logout', async (req, res, next) => {
    try {
        res.clearCookie('jwt');
    } catch (error) {
        console.log(error)
        return res.status(500).json({ result: false, user: null })
    }
});

module.exports = router;

