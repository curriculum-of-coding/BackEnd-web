import * as express from "express"

class App {
  public application : express.Application;
  constructor(){
    this.application = express();
    this.application.get("/", (req : express.Request , res : express.Response) =>{
      res.send("start!");
    })
  }
}

const app: express.Application = new App().application;
const port: number = Number(process.env.PORT) || 3000;

app.listen(port, () => console.log(`Express is start at port ${port}!!!`))
  .on('error', (error) => console.error(error));