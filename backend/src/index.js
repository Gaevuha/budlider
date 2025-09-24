import setupServer from "./server.js";
import fs from "fs/promises";
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./server.js";

const createDirIfNotExists = async (dir) => {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    console.error(`Error creating dir ${dir}:`, err);
  }
};

const bootstrap = async () => {
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);

  setupServer(5000); // передаємо порт 5000
};

bootstrap();
