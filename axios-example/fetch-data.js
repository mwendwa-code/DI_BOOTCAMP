const axios = require('axios');

async function fetchPostsTitles() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data.map(post => post.title);
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    return [];
  }
}

module.exports = { fetchPostsTitles };
