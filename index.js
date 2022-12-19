const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const fs = require("fs").promises;
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("New Connection Opened!");
  socket.on("chat message", (msg) => {
    console.log("new message");
    io.emit("chat message", msg);
  });

  //Listening Events
  socket.on("emit_boolean", (args) => {
    console.log("emit_boolean ==> ", args);
  });

  socket.on("emit_double", (args) => {
    console.log("emit_double ==> ", args);
  });

  socket.on("emit_string", (args) => {
    console.log("emit_string ==> ", args);
  });

  socket.on("emit_object", (args) => {
    console.log("emit_object ==> ", args);
  });

  socket.on("emit_array_primitives", (args) => {
    console.log("emit_array_primitives ==> ", args);
  });

  socket.on("emit_array_objects", (args) => {
    console.log("emit_array_objects ==> ", args);
  });

  //Emiting Events
  setInterval(() => {
    socket.emit("null_type", null);
  }, 1000);

  setInterval(() => {
    socket.emit("undefined_type", undefined);
  }, 1000);

  setInterval(() => {
    socket.emit("object_type", { property: "Hola...." });
  }, 1000);

  setInterval(() => {
    socket.emit("array_primite_type", [1, 2, 3, 4, 5]);
  }, 1000);

  setInterval(() => {
    socket.emit("array_object_type", [
      { property: "Hello World" },
      { property: "Bye World" },
    ]);
  }, 1000);

  setInterval(() => {
    socket.emit("boolean_type", true);
  }, 1000);

  setInterval(() => {
    socket.emit("number_type", 1234);
  }, 1000);

  setInterval(() => {
    socket.emit("string_type", "1234");
  }, 1000);

  var enc = new TextEncoder(); // always utf-8
  const data = enc.encode("This is a string converted to a Uint8Array");
  setInterval(() => {
    socket.emit("buffer_type", data);
  }, 1000);

  setInterval(async () => {
    const data = await fs.readFile("download.png");
    socket.emit("image_buffer_type", data);
  }, 1000);
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
