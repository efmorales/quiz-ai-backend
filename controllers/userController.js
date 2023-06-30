const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwtHelper = require('../helpers/jwtHelper');


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.registerUser = async (req, res) => {
    const {username, email, password} = req.body;
    const salt = await bcrypt.genSalt(10);

    let foundUser = await User.findOne({email:req.body.email});

    if (foundUser) {
        throw {
            status: 409,
            message: "user exist already"
        }
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User ({
        username, 
        email, 
        password: hashedPassword
    })

    try {
        const user = await newUser.save();

        //remove password before sending the user
        user.password = undefined;

        const token = jwtHelper.signToken(user);
        res.status(201).json({
            user,
            token
        })
    } catch (e) {
        res.status(500).json({
            message: e.message,
        })
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            email
        })

        if (!user) {
            return res.status(401).json({
                message: 'Email does not exist',
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid Password',
            })
        }

        //remove password before sending the user
        user.password = undefined;

        const token = jwtHelper.signToken(user);
        res.status(200).json({
            user,
            token,
        })
    } catch (e) {
        res.status(500).json({
            message: e.message,
        })
    }
}