const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const client = require('../config/redisClient');

// Upload a file and save metadata
exports.uploadAsset = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const { originalname: filename, size } = req.file;

    try {
        const newAsset = await prisma.asset.create({
            data: {
                filename,
                size,
            },
        });
        res.status(201).json(newAsset);
    } catch (error) {
        res.status(500).json({ error: 'Error uploading file' });
    }
};

// Retrieve list of all uploaded assets
exports.getAssets = async (req, res) => {
    try {
        const cachedAssets = await client.get('assets');
        if (cachedAssets) {
            return res.status(200).json(JSON.parse(cachedAssets));
        }

        const assets = await prisma.asset.findMany();
        client.set('assets', JSON.stringify(assets), 'EX', 300);
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving assets' });
    }
};

// Delete an asset by ID
exports.deleteAsset = async (req, res) => {
    const assetId = parseInt(req.params.id, 10);
    try {
        const deletedAsset = await prisma.asset.delete({
            where: { id: assetId },
        });
        client.del('assets');
        res.status(200).json({ message: 'Asset deleted', asset: deletedAsset });
    } catch (error) {
        res.status(404).json({ error: 'Asset not found' });
    }
};
