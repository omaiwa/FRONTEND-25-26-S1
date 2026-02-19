const jsonServer = require('json-server');
const auth = require('json-server-auth');
const app = jsonServer.create();
const router = jsonServer.router('db.json');

// This binds the auth logic to the app
app.db = router.db;

const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(auth);
app.use(router);

app.listen(3000, () => {
  console.log('JSON Server with Auth is running on http://localhost:3000');
});