require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("ScholarshipsDB");
    const scholarshipCollection = database.collection("scholarships");

    // read all-scholarships
    app.get("/all-scholarships", async (req, res) => {
      const allScholarships = await scholarshipCollection.find().toArray();
      res.send(allScholarships);
    });

    // add scholarship

    app.post("/add-scholarships", async (req, res) => {
      const scholarships = req.body;

      const application_fees = scholarships.application_fees;
      scholarships.application_fees = parseInt(application_fees);
      const tution_fees = scholarships.tution_fees;
      scholarships.tution_fees = parseInt(tution_fees);
      const service_charge = scholarships.service_charge;
      scholarships.service_charge = parseInt(service_charge);
      const university_rank = scholarships.university_rank;
      scholarships.university_rank = parseInt(university_rank);

      const application_deadline = scholarships.application_deadline;
      scholarships.application_deadline = new Date(application_deadline);
      const scholarship_post_date = scholarships.scholarship_post_date;
      scholarships.scholarship_post_date = new Date(scholarship_post_date);

      const result = await scholarshipCollection.insertOne(scholarships);
      console.log(result);
      res
        .status(201)
        .send(result, { message: "scholarships are created successfull" });
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Port is Running On ${port}`);
});
