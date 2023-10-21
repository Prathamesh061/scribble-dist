"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: process.env.URL }));
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, { cors: { origin: process.env.URL } });
io.on("connection", (socket) => {
    socket.on("beginPath", (arg) => {
        socket.broadcast.emit("beginPath", arg);
    });
    socket.on("drawLine", (arg) => {
        socket.broadcast.emit("drawLine", arg);
    });
    socket.on("changeConfig", (arg) => {
        socket.broadcast.emit("changeConfig", arg);
    });
    socket.on("activeItem", (arg) => {
        socket.broadcast.emit("activeItem", arg);
    });
    socket.on("actionTaken", (arg) => {
        socket.broadcast.emit("actionTaken", arg);
    });
});
httpServer.listen(process.env.PORT, () => {
    console.log(`Server is up and running`);
});
