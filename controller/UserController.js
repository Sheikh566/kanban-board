const me = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
}

module.exports = { me };