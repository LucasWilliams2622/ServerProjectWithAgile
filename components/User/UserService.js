const UserModel = require('./UserModel')
const bcrypt = require('bcryptjs')

//http://localhost:3000/api/user/login
const login = async (email, password) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            const result = bcrypt.compareSync(password, user.password);
            return result ? user : false;
        }
    } catch (error) {
        console.log('Login error' + error)
        return false;
    }
}
//http://localhost:3000/api/user/register
const register = async (email, password, name, description, avatar, role, createAt, updateAt, isLogin, isActive, isVerified, verificationCode,isAble) => {
    try {
        console.log("QQQQ", email, password, name, description, avatar, role, createAt,
            updateAt, isLogin, isActive, isVerified, verificationCode)

        const user = await UserModel.findOne({ email: email })
        console.log("userrrr", user)
        if (user == null) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = { email, password: hash, name, description, avatar, role, createAt, updateAt, isLogin, isActive, isVerified, verificationCode,isAble };
            const u = new UserModel(newUser);
            await u.save();
            return true;
            6
        } else {
            return false;
        }
    } catch (error) {
        console.log("Register error" + error)
        return false;
    }
}
const deleteUser = async (email) => {
    try {
        const user = await UserModel.findOne({ email: email })
        console.log(user)
        {
            await UserModel.deleteOne(user)
        }
        return true;
    } catch (error) {
        console.log("Delete User  error", error);
        return false;

    }
}

const updateUser = async (email, password, name, description, avatar, role, createAt, updateAt, isLogin, isActive, isVerified, verificationCode) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {

            user.password = password ? password : user.password;
            user.name = name ? name : user.name;
            user.description = description ? description : user.description;

            user.avatar = avatar ? avatar : user.avatar;
            user.role = role ? role : user.role;
            user.isActive = isActive ? isActive : user.isActive;
            user.isVerified = isVerified ? isVerified : user.isVerified;
            user.verificationCode = verificationCode ? verificationCode : user.verificationCode;

            user.createAt = createAt ? createAt : user.createAt;
            user.updateAt = updateAt ? updateAt : user.updateAt;
            user.isLogin = isLogin ? isLogin : user.isLogin;
            await user.save();
            console.log("INFO USER:", user);

            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Update User  error", error)
        return false;
    }
}
const search = async (email, name) => {
    try {
        console.log("aaaaa", email, name)
        const users = await UserModel.find({
            $and: [
                { name: { $regex: name, $options: 'i' } },
                { email: { $regex: email } }
            ]
        })
        console.log(users)
        return users;

    } catch (error) {
        return false;
    }
}
const getAllUser = async (page, size) => {
    try {
        // return data;
        return await UserModel.find();
        //  data.splice(index, 1);
    } catch (error) {
        console.log("List user Got an error: ", error);
        throw error;
    }
}
const changePassword = async (email, oldPassword, newPassword) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            console.log("INFO USER:", user);
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
            console.log(isPasswordValid)
            if (isPasswordValid) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(newPassword, salt);
                user.password = hash
                await user.save();
                return true;
            } else {
                return false
            }
        } else {
            return false;
        }
    } catch (error) {
        console.log("Change Password got an error: ", error);
        throw error;
    }
}
const disableAccount = async (email, isAble) => {
    try {
        console.log(isAble);
        const user = await UserModel.findOne({ email: email })
        if (user) {
            user.isAble = isAble;
            console.log(user.isAble);
            await user.save();
            return true;
        } else {
            return false;
        }
    } catch (error) {

    }
}
module.exports = {
    login, register, deleteUser,
    updateUser, getAllUser, search, changePassword, disableAccount
};
