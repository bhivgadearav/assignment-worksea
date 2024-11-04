const express = require('express');
const assetRoutes = require('./routes/assetRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
app.use('/api', assetRoutes);

// Starts the server only if this file is run directly 
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
