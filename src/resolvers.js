const User = require('./models/User');

const resolvers = {
  Query: {
    // Fetch all users
    users: async () => await User.find(),

    // Fetch a single user by ID
    user: async (_, { id }) => await User.findById(id),
  },

  Mutation: {
    // Create a new user
    createUser: async (_, { name, email }) => {
      const newUser = new User({ name, email });
      await newUser.save();
      return newUser;
    },

    // Update an existing user
    updateUser: async (_, { id, input }) => {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }

      Object.keys(input).forEach(key => {
        if (input[key] !== undefined) {
          user[key] = input[key];
        }
      });

      await user.save();
      return user;
    },

    // Delete a user
    deleteUser: async (_, { id }) => {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },
  },
};

module.exports = resolvers;