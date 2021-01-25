const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: '481e017257934dadb5942c475b75a6e0'
   });

   const handleApiCall = (req, res) => {
    app.models
        .predict('53e1df302c079b3db8a0a36033ed2d15', req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable work with API'))
    }

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}