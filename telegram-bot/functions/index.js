const { Telegraf } = require("telegraf");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const firestore = admin.firestore();

const STATUS = {
  A: "APPROVED",
  N: "NEEDS APPROVAL",
  D: "DELETE"
};

const bot = new Telegraf(functions.config().telegram.token, {
  telegram: { webhookReply: true }
});

bot.catch((err, ctx) => {
  functions.logger.error("[Bot] Error", err);
  return ctx.reply(`There has been an error.... ${ctx.updateType}`, err);
});

bot.command("/status", (ctx) =>
  ctx.reply(
    `Please enter the comment you want to change the status of.\nEnter in the form: <slug> <timestamp> <status>\nAccepted Status:\nA: APPROVED\nN: NEEDS APPROVAL\nD: DELETE`
  )
);

bot.on("message", async (ctx) => {
  const message = ctx.message.text.split(" ");

  if (message.length !== 3) {
    ctx.reply(
      `Looks like you entered a request we do not support. Please make sure your message follows this structure.\nEnter in the form: <slug> <timestamp> <status>\nAccepted Status:\nA: APPROVED\nN: NEEDS APPROVAL\nD: DELETE`
    );
  } else {
    const slug = message[0].toLowerCase();
    const timestamp = message[1];
    const status = STATUS[message[2].toUpperCase()];

    const docRef = firestore.collection("comments").doc(slug);

    await firestore.runTransaction(async (transaction) => {
      const doc = await transaction.get(docRef);

      let com = {};
      const comments = doc.data().comments.map((comment) => {
        if (comment.timestamp.toString() === timestamp && status !== STATUS.D) {
          comment.status = status;
        }

        if (status === STATUS.D) {
          com = comment;
        }

        return comment;
      });

      transaction.update(docRef, {
        comments:
          status === STATUS.D
            ? admin.firestore.FieldValue.arrayRemove(com)
            : comments
      });
    });

    ctx.reply(`You have marked '${slug}' as ${status}`);
  }
});

exports.changeStatusOfComment = functions.https.onRequest((req, res) =>
  bot.handleUpdate(req.body, res)
);

exports.submittedComments = functions.firestore
  .document("comments/{blogTitle}")
  .onWrite((change, context) => {
    const document = change.after.exists ? change.after.data() : null;
    const length = document.comments.length;
    const data = document.comments[length - 1];

    bot.telegram.sendMessage(
      functions.config().telegram.chat,
      `Title: ${data.slug}\nName: ${data.name}\nSocial Media: ${
        data.social ? data.social : ""
      }\nDate: ${data.date}\nMessage: ${data.message}\nTimestamp: ${
        data.timestamp
      }\nStatus: ${data.status}`
    );

    return 0;
  });
