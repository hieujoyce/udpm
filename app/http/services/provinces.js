const axios = require('axios');
// const fetch = require('node-fetch');
exports.getAllDivisionsService = async ({ depth }) => {
  const result = await axios.get(
    `https://provinces.open-api.vn/api/?depth=${depth}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  );
  return result.data;
};
