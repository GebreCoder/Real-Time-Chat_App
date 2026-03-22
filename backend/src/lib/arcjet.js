// src/lib/arcjet.js
// Dummy Arcjet export so backend runs
const aj = {
  protect: async (req) => {
    return {
      isDenied: () => false,
      reason: {
        isRateLimit: () => false,
        isBot: () => false,
      },
      results: [],
    };
  },
};

export default aj;
