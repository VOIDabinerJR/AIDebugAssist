const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const { createToken } = require('../utils/jwt');


const authController = {
    register: async (req, res) => {
        const { email, password, repeatPassword } = req.body;

        if (!email || !password || !repeatPassword) {
            return res.status(400).json({ error: 'Please provide email and password' });
        }

        if (password !== repeatPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        try {
            const [existingUser] = await User.findByEmail(email);
            if (existingUser.length > 0) {
                return res.status(400).json({ error: 'Email is already in use' });
            }

            const hashedPassword = await bcrypt.hash(password, 8);
            const newUser = { email, password: hashedPassword };

            const insertResult = await User.create(newUser);

            if (insertResult[0].affectedRows === 1) {
                const [createdUser] = await User.findByEmail(email);
      
                const token = createToken({ id: createdUser.id }); // <-- objeto!



                return res.status(201).json({ token });
            } else {
                return res.status(500).json({ error: 'User registration failed' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password' });
        }

        try {
            const [user] = await User.findByEmail(email);

            if (user.length === 0) {
                return res.status(404).json({ error: 'Invalid email or password' });
            }

            const passwordMatch = await bcrypt.compare(password, user[0].password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const token = createToken({id: user.id});
            return res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    },

    loaddata: async (req, res) => {
        const { token } = req.body;

        try {
            const decoded = await decodeToken(token)



            const [user, userStatistics] = await Promise.all([
                DynamicData.getUserDataById(decoded.token),
                Statistics.getStatistics(decoded.token)
            ]);

            if (!user) {
                return res.status(404).json({ err: 'Erro data load' });
            } else {


                //  const data = {
                //     time:Date(),
                //      userStatistics: userStatistics,
                //      user: user

                //  };
                // fs.writeFileSync('userData.json', JSON.stringify(data, null, 2));

                return res.status(200).json({
                    user,
                    userStatistics
                });

            }



        } catch (error) {
            console.error(error);
            return res.status(500).json({ err: 'Server error', error: error });
        }
    }
};

module.exports = authController;
