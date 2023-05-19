const Reference = require('../models/reference.model');

// ------------------- add roomType --------------------------
const addReference = async (req, res, next) => {
  try {
    const reference = await Reference.create({ ...req.body });
    res.status(200).send({
      message: 'Reference added successfully',
      reference,
    });
  } catch (error) {
    next(error);
  }
};

const updateReference = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const {
      name, address, mobile, status,
    } = req.body;
    const updatedReference = await Reference.findByIdAndUpdate(
      { _id },
      {
        name, address, mobile, status,
      },
    );
    await updatedReference.save();
    res.send({
      message: 'Reference updated successfully',
      updatedReference,
    });
  } catch (error) {
    next(error);
  }
};

// ------------ get single Reference -----------------------
const getSingleReference = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const singleReference = await Reference.findOne({ _id });
    res.status(200).send(singleReference);
  } catch (err) {
    next(err);
  }
};

// ------------ get All Reference -----------------------
const getAllReference = async (req, res, next) => {
  try {
    const allReferences = await Reference.find({ isPublished: true }).sort({ _id: -1 });
    res.status(200).send(allReferences);
  } catch (err) {
    next(err);
  }
};

const unpublishReference = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { isPublished } = req.body;
    const unpublishedReference = await Reference.findByIdAndUpdate(
      { _id },
      {
        isPublished,
      },
    );
    await unpublishedReference.save();
    res.send({
      message: 'Reference deleted successfully!',
      unpublishedReference,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addReference,
  updateReference,
  getSingleReference,
  getAllReference,
  unpublishReference,
};
