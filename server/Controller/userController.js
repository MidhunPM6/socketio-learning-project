import Users from "../models/userModel.js"
import bcrypt from 'bcrypt'
export const  signupController =async(userData)=>{
    try {
        const {name,email,password} = userData
        const existingUser = await Users.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({ name,email,password:hashedPassword });
        await newUser.save();
        return newUser;
    } catch (error) {
        console.error("Error during signup:", error);
        throw new Error("Signup failed");
    }
    
}

export const loginController = async (email, password) => {
    try {
        const user = await Users.findOne({
            email: email
        });
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        return user;
    } catch (error) {
        console.error("Error during login:", error);
        throw new Error("Login failed");
    }
};

export const fetchUserController=async(myID)=>{
    try {
        const users = await Users.find({ _id: { $ne: myID } });
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Error fetching users");
    }
}