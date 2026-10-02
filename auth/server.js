import server from "./src/app.js"
import connectToDb from "./src/config/database.js"

connectToDb();

server.listen(3000, () => {
    console.log("listening to port no. 3000");
})