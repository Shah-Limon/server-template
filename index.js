const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
// const uri ="mongodb+srv://ntfseo:ntfseopass@nftseo.e1zbadu.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    /* collection */
    const websiteCollections = client.db("seoWebsite").collection("websiteList");







    /*  post */

    app.post("/add-website", async (req, res) => {
      const websiteCheck = req.body;
      const result = await websiteCollections.insertOne(websiteCheck);
      res.send(result);
    });

    app.get("/website", async (req, res) => {
      const query = {};
      const cursor = websiteCollections.find(query);
      const websiteCheck = await cursor.toArray();
      res.send(websiteCheck);
    });

    app.get("/website/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const website = await websiteCollections.findOne(query);
      res.send(website);
    });

    app.put("/edit-website/:id", async (req, res) => {
      const id = req.params.id;
      const edit = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          email: edit.email,
          website: edit.website,
          metaDescription: edit.metaDescription,
          mobileFriendly: edit.mobileFriendly,
          pageLoadSpeed: edit.pageLoadSpeed,
          ssl: edit.ssl,
          sitemap: edit.sitemap,
          brokenLinks: edit.brokenLinks,
          ux: edit.ux,
          backlinks: edit.backlinks,
          img: edit.img,
          pdfLink: edit.pdfLink,
          auditStatus: edit.auditStatus,
          
        },
      };

      const result = await websiteCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    




  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Lead Collector Website is Live Now");
});
app.listen(port, () => {
  console.log(`Lead Collector Website is Live Now ${port}`);
});
