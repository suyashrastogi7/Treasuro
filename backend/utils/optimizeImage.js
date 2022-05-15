const imagemin = require("imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const sharp = require("sharp");
const isJpg = require("is-jpg");
const nanoid = require("nanoid");

const convertToJpg = async (input) => {
  if (isJpg(input)) {
    return input;
  }

  return sharp(input).jpeg().toBuffer();
};

export const uploadBuffer = async (buffer) => {
  const miniBuffer = await imagemin.buffer(buffer, {
    plugins: [convertToJpg, mozjpeg({ quality: 85 })],
  });

  const Key = nanoid();

  return { Key, Body: miniBuffer };
};

export const uploadImageStream = async (picture) => {
  const buffers = [];
  const readableStream = await picture;
  const buffer =
    ((await new Promise()) < Buffer) |
    (null >
      (async (res) =>
        readableStream
          .createReadStream()
          .on("data", (chunk) => {
            buffers.push(chunk);
          })
          .on("end", () => {
            res(Buffer.concat(buffers));
          })
          .on("error", (err) => {
            Sentry.captureException(err);
            res(null);
          })));

  if (!buffer) {
    return null;
  }

  return uploadBuffer(buffer);
};
