const Movie = require('../models/movie');

const addNewMovie = async (movieData) => {
  try {
    const newMovie = new Movie(movieData);
    await newMovie.save();
    return newMovie;
  } catch (error) {
    console.error('Failed to create movie:', error);
    throw error;
  }
};
const getAllMovies = async (page, perPage, title) => {
  try {
    const query = title ? { title: { $regex: new RegExp(title, 'i') } } : {};
    const totalCount = await Movie.countDocuments(query);
    const totalPages = Math.ceil(totalCount / perPage);
    const skip = (page - 1) * perPage;
    const movies = await Movie.find(query).skip(skip).limit(perPage).lean(); // Use lean() method
    return {
      movies,
      page,
      perPage,
      totalPages,
      totalCount
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};



module.exports = {
  getAllMovies
};

const deleteMovieById = async (id) => {
  try {
    return await Movie.findByIdAndDelete(id);
  } catch (error) {
    console.error('Error deleting movie by ID:', error);
    throw error;
  }
};

const getMovieById = async (id) => {
  try {
    return await Movie.findById(id);
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    throw error;
  }
};
const updateMovieById = async (id, updateData) => {
  try {
    return await Movie.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.error('Error updating movie by ID:', error);
    throw error;
  }
};
module.exports = {
  addNewMovie,
  getAllMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById
};
