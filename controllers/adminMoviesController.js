const Movie = require('../models/Movie')

const handleErrors = (err) => {
  console.log(err.message, err.code)
  const errors = { title: '', description: '', imgUrl: '', trailerUrl: '' }

  // Validate email and password length
  if (err.message.includes('movie validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(properties)
      errors[properties.path] = properties.message
    })
  }

  return errors
}

module.exports.movies_get = async (req, res) => {
  const movies = await Movie.find().sort({ createdAt: 'desc' })

  res.render('admin/index', { movies })
}

module.exports.movies_post = async (req, res) => {
  let movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    imgUrl: req.body.imgUrl,
    trailerUrl: req.body.trailerUrl,
  })
  try {
    movie = await movie.save()
    res.status(201).json({ movie: movie._id })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

module.exports.movies_delete = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id)
    res.status(201).json({ successful: true })
  } catch (error) {
    res.status(400).json({ error })
  }
}
module.exports.movies_edit = async (req, res) => {
  let movie = await Movie.findById(req.params.id)
  movie.title = req.body.title
  movie.description = req.body.description
  movie.imgUrl = req.body.imgUrl
  movie.trailerUrl = req.body.trailerUrl
  try {
    const editedMovie = await movie.save()
    res.status(201).json({ movie: editedMovie._id })
  } catch (err) {
    const errors = handleErrors(err)
    console.log(errors)
    res.status(400).json({ errors })
  }
}
