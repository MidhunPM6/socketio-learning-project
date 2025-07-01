import Users from "../models/userModel.js"
import bcrypt from 'bcrypt'
import Messages from "../models/messageModel.js"
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


export const saveMessageController=async(fromUserId,toUserId,message)=>{
    console.log("heyyyyyyyyy",fromUserId);
    
    try {
        const savedMessage =  new Messages({
            sender: fromUserId,
            receiver: toUserId,
            message: message
        })
        await savedMessage.save()
        return savedMessage;
    } catch (error) {
        console.error("Error saving message:", error);
        throw new Error("Error saving message");
    }
}

export const fetchMessageController=async(myID,toUserId)=>{
    console.log('myid:',myID+ "toUserId:",toUserId);
    
    try {

        const getHistory = await Messages.find({
            $or: [
                { sender: myID, receiver: toUserId },
                { sender: toUserId, receiver: myID }
            ]
        })
        console.log(getHistory);
        
        return getHistory
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw new Error("Error fetching messages");
    }
    
}