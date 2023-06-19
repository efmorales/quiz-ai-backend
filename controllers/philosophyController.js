const Philosophy = require('../models/Philosophy');

exports.getAllPhilosophies = async (req, res) => {
  try {
    const philosophies = await Philosophy.find({});
    res.status(200).json(philosophies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPhilosophyById = async (req, res) => {
  try {
    const philosophy = await Philosophy.findById(req.params.id);
    res.status(200).json(philosophy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPhilosophy = async (req, res) => {
  const newPhilosophy = new Philosophy(req.body);
  try {
    const philosophy = await newPhilosophy.save();
    res.status(201).json(philosophy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePhilosophy = async (req, res) => {
  try {
    const updatedPhilosophy = await Philosophy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPhilosophy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePhilosophy = async (req, res) => {
  try {
    await Philosophy.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Philosophy deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
