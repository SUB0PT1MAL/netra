// Configure MongoDB connection 
const mongoUrl = 'mongodb://192.168.1.111:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1';

// Backend API route
const apiUrl = '/api/search'; 

// Update submit handler
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const searchTerm = searchBox.value;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      searchTerm 
    })
  });
  
  const data = await response.json();
  
  displayResults(data);
});

// Backend API route implementation
app.post('/api/search', async (req, res) => {
  const { searchTerm } = req.body;

  // Connect to MongoDB
  const client = await MongoClient.connect(mongoUrl);

  // Query database
  const db = client.db('mydatabase'); 
  const results = await db.collection('users').find({ 
    $or: [
      { extra: { $regex: searchTerm } }, 
      { account: { $regex: searchTerm } },
      { password: { $regex: searchTerm } }
    ]
  }).toArray();

  res.json(results);

  client.close();
});