const Region = require('../models/Region');

const regionController = {
    getAllRegions: async (req, res) => {
        try {
            const regions = await Region.getAll();
            res.status(200).json(regions);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching regions', error });
        }
    },

    getRegionById: async (req, res) => {
        const { id } = req.params;
        try {
            const region = await Region.getById(id);
            if (!region) {
                return res.status(404).json({ message: 'Region not found' });
            }
            res.status(200).json(region);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching region', error });
        }
    },

    createRegion: async (req, res) => {
        try {
            const newRegionId = await Region.create(req.body);
            res.status(201).json({ id: newRegionId });
        } catch (error) {
            res.status(500).json({ message: 'Error creating region', error });
        }
    },

    updateRegion: async (req, res) => {
        const { id } = req.params;
        try {
            await Region.update(id, req.body);
            res.status(200).json({ message: 'Region updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating region', error });
        }
    },

    deleteRegion: async (req, res) => {
        const { id } = req.params;
        try {
            await Region.delete(id);
            res.status(200).json({ message: 'Region deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting region', error });
        }
    }
};

module.exports = regionController;
