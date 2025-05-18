const express = require('express');
const path = require('path');
const cors = require ('cors');
const app = express();
app.use(cors());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');


const errorHandler = require('./error/err')

// const eventhandler = require('./loger/eventhandler')


const authRoutes = require('./routes/auth')
const userrout = require("./routes/UsersRoutes")
const user_typerout = require("./routes/User_TypesRoutes")
const typerout = require("./routes/TypesRoutes")
const modelrout = require("./routes/ModelsRoutes")
const commentrout = require("./routes/CommentsRoutes")
const ratingrout = require("./routes/RatingsRoutes")
const favoriterout = require("./routes/FavoritesRoutes")
const categoryrout = require("./routes/CategoriesRoutes")
const model_userrout = require("./routes/Model_UsersRoutes")

// app.use(eventhandler)
//http://localhost:3001/documents/#/
app.use(express.json());
app.use('/auth', authRoutes);

app.use('/users', userrout);
app.use('/users/:id', userrout);

app.use('/user_types', user_typerout);
app.use('/user_types/:id', user_typerout);

app.use('/types', typerout);
app.use('/types/:id', typerout);

app.use('/models', modelrout);
app.use('/models/:id', modelrout);

app.use('/comments', commentrout);
app.use('/comments/:id', commentrout);

app.use('/ratings', ratingrout);
app.use('/ratings/:id', ratingrout);

app.use('/favorites', favoriterout);
app.use('/favorites/:id', favoriterout);

app.use('/categories', categoryrout);
app.use('/categories/:id', categoryrout);

app.use('/model_users', model_userrout);  
app.use('/model_users/:id', model_userrout);

app.use('/uploads', express.static(path.join(__dirname, '3Dmodels')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api', require('./routes/upload'));

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('3D-models', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

const PORT = 3001;

app.use(errorHandler);

app.use('/documents', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/3Dmodels', express.static(path.join(__dirname, '3Dmodels')));

app.use((req, res, next) => {
  const err = new Error('Неверный запрос');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  const error = {
      success: false,
      status: err.status ||  404,
      message: err.message || 'Error'
  };

  res.status(error.status).json({
      message: error.message,
      status: error.status
  });
});



const server = app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error'))
  module.exports = server;