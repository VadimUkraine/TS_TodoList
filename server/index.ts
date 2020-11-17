import app from './app';

const PORT = process.env.PORT || 8080;

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.warn(e);
  }
}

start();
