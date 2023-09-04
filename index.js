const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
} = require("@whiskeysockets/baileys");

require("dotenv").config();
const isCemvs = require("./utils/isCemvs");
const isStudent = require("./utils/isStudent");
const Student = require("./utils/Student");
const eCemvs = isCemvs("cemvs");
const { extractDataFromMessage } = require("./utils/extractDataFromMessage");

const log = (pino = require("pino"));
const { session } = { session: "session_auth_info" };
const { Boom } = require("@hapi/boom");
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = require("express")();

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 8000;
const qrcode = require("qrcode");
const logger = require("./utils/logger");

app.use("/assets", express.static(__dirname + "/client/assets"));

app.get("/scan", (req, res) => {
  res.sendFile("./client/index.html", {
    root: __dirname,
  });
});

app.get("/", (req, res) => {
  res.send("server working");
});

let sock;
let qrDinamic;
let soket;

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("session_auth_info");

  sock = makeWASocket({
    printQRInTerminal: true,
    auth: state,
    logger: log({ level: "silent" }),
  });

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;
    qrDinamic = qr;
    if (connection === "close") {
      let reason = new Boom(lastDisconnect.error).output.statusCode;
      if (reason === DisconnectReason.badSession) {
        console.log(
          `Bad Session File, Please Delete ${session} and Scan Again`
        );
        sock.logout();
      } else if (reason === DisconnectReason.connectionClosed) {
        // console.log("Conexión cerrada, reconectando....");
        connectToWhatsApp();
      } else if (reason === DisconnectReason.connectionLost) {
        // console.log("Conexión perdida del servidor, reconectando...");
        connectToWhatsApp();
      } else if (reason === DisconnectReason.connectionReplaced) {
        // console.log(
        //   "Conexión reemplazada, otra nueva sesión abierta, cierre la sesión actual primero"
        // );
        sock.logout();
      } else if (reason === DisconnectReason.loggedOut) {
        // console.log(
        //   `Dispositivo cerrado, elimínelo ${session} y escanear de nuevo.`
        // );
        sock.logout();
      } else if (reason === DisconnectReason.restartRequired) {
        // console.log("Se requiere reinicio, reiniciando...");
        connectToWhatsApp();
      } else if (reason === DisconnectReason.timedOut) {
        // console.log("Se agotó el tiempo de conexión, conectando...");
        connectToWhatsApp();
      } else {
        sock.end(
          `Razão de desconexão desconhecida: ${reason}|${lastDisconnect.error}`
        );
      }
    } else if (connection === "open") {
      console.log("Conexão aberta");
      return;
    }
  });

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    try {
      const baileysMessage = messages[0];

      if (!baileysMessage.message) return;

      const { fullMessage, remoteJid } = extractDataFromMessage(baileysMessage);

      if (!messages[0]?.key.fromMe) {
        const captureMessage = fullMessage;

        const numberWa = remoteJid;

        const entradaAluno = captureMessage;

        Student.input = captureMessage;

        if (eCemvs && isStudent(entradaAluno)) {

          let messageStart = null;

          setTimeout(async () => {
            const reactionMessage = {
              react: {
                text: "⏳", // use an empty string to remove the reaction
                key: baileysMessage.key,
              },
            };
            await sock.sendMessage(numberWa, reactionMessage);
          }, 200);

          setTimeout(async () => {
            messageStart = await sock.sendMessage(numberWa, {
              text: "Olá! Vou verificar aqui a sua solicitação, aguarde um momento, por favor. ☺️☺️☺️",
            });
          }, 1000);

          const studentMaria = Student;

          const {data} = await Student.pesquisarAluno(studentMaria.id());

          console.log(data.data, data);
          // logger.info("student: " + JSON.stringify());

          if (data.data == "aluno_not_found" || data.found == false) {
            setTimeout(async () => {
              await sock.sendMessage(
                numberWa,
                {
                  text: "😕 Ops! infelizmente, não encontrei sua conta no AVA.\nPor favor, entre em contato com a coordenação da escola.",
                },
                {
                  quoted: messages[0],
                }
              );
            }, 1300);
            return;
          } else {
            if (student.found) {
              const result = await Student.changePasswordStudent(student.data);
              if (result.status == 204) {
                setTimeout(async () => {
                  await sock.sendMessage(
                    numberWa,
                    {
                      text: "🫡 ✅ Sua senha foi alterada com sucesso.\n*Abaixo sua nova senha*.",
                    },
                    {
                      quoted: messageStart,
                    }
                  );
                }, 1700);

                setTimeout(async () => {
                  await sock.sendMessage(
                    numberWa,
                    {
                      text: "123456",
                    },
                    {
                      quoted: messages[0],
                    }
                  );
                }, 2400);

                return;
              }
              if (result.data == "bad_request") {
                setTimeout(async () => {
                  await sock.sendMessage(
                    numberWa,
                    {
                      text: "Ops! infelizmente não foi possível alterar sua senha, tente novamente mais tarde.",
                    },
                    {
                      quoted: messages[0],
                    }
                  );
                }, 1200);
                return;
              }
            }
          }
        }

        // if (compareMessage === "ping") {
        //   await sock.sendMessage(
        //     numberWa,
        //     {
        //       text: "Pong",
        //     },
        //     {
        //       quoted: messages[0],
        //     }
        //   );
        // } else {
        //   await sock.sendMessage(
        //     numberWa,
        //     {
        //       text: "Soy un robot",
        //     },
        //     {
        //       quoted: messages[0],
        //     }
        //   );
        // }
      }
    } catch (error) {
      console.log("error ", error);
    }
  });

  sock.ev.on("creds.update", saveCreds);
}

const isConnected = () => {
  return sock?.user ? true : false;
};

app.get("/send-message", async (req, res) => {
  const tempMessage = req.query.message;
  const number = req.query.number;

  let numberWA;
  try {
    if (!number) {
      res.status(500).json({
        status: false,
        response: "El numero no existe",
      });
    } else {
      numberWA = number + "@s.whatsapp.net";

      if (isConnected()) {
        const exist = await sock.onWhatsApp(numberWA);

        if (exist?.jid || (exist && exist[0]?.jid)) {
          sock
            .sendMessage(exist.jid || exist[0].jid, {
              text: tempMessage,
            })
            .then((result) => {
              res.status(200).json({
                status: true,
                response: result,
              });
            })
            .catch((err) => {
              res.status(500).json({
                status: false,
                response: err,
              });
            });
        }
      } else {
        res.status(500).json({
          status: false,
          response: "Você ainda não está conectado",
        });
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

io.on("connection", async (socket) => {
  soket = socket;
  if (isConnected()) {
    updateQR("connected");
  } else if (qrDinamic) {
    updateQR("qr");
  }
});

const updateQR = (data) => {
  switch (data) {
    case "qr":
      qrcode.toDataURL(qrDinamic, (err, url) => {
        soket?.emit("qr", url);
        soket?.emit("log", "QR recibido , scan");
      });
      break;
    case "connected":
      soket?.emit("qrstatus", "./assets/check.svg");
      soket?.emit("log", " usaario conectado");
      const { id, name } = sock?.user;
      var userinfo = id + " " + name;
      soket?.emit("user", userinfo);

      break;
    case "loading":
      soket?.emit("qrstatus", "./assets/loader.gif");
      soket?.emit("log", "Cargando ....");
      break;
    default:
      break;
  }
};

connectToWhatsApp().catch((err) => console.log("unexpected error: " + err));

server.listen(port, () => {
  console.log("Server Run Port : " + port);
});
