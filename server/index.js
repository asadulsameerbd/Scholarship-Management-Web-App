require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const userCollections = database.collection("users");
    const appliedScholarshipsCollections = database.collection(
      "appliedScholarships",
    );
    const reviewCollections = database.collection("reviews");

    // review
    app.post("/reviews", async (req, res) => {
      const reviewData = req.body;

      const result = await reviewCollections.insertOne(reviewData);

      res.send({
        message: "Review Added Successfully",
        insertedId: result.insertedId,
      });
    });

    // read review data
    app.get("/reviews", async (req, res) => {
      const result = await reviewCollections.find().toArray();
      res.send(result);
    });

    // specifiq scholarship review
    app.get("/reviews/:id", async (req, res) => {
      const id = req.params.id;

      const filter = { scholarshipId: id };

      const result = await reviewCollections.find(filter).toArray();

      res.send(result);
    });

    // delete specifiq review
    app.delete("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await reviewCollections.deleteOne(filter);
      res.send(result);
    });

    // applied scholarship
    app.post("/applied_scholarship", async (req, res) => {
      const scholarshipBody = req.body;

      const { userEmail, scholarshipId } = scholarshipBody;

      const alreadyApplied = await appliedScholarshipsCollections.findOne({
        userEmail: userEmail,
        scholarshipId: scholarshipId,
      });

      if (alreadyApplied) {
        return res
          .status(400)
          .send({ message: "This Scholarship is Already Applied" });
      }

      const result =
        await appliedScholarshipsCollections.insertOne(scholarshipBody);

      if (!result) {
        return res.status(404).send("Scholarships are not Applied");
      }

      res.send("Scholarship Applied", result);
    });

    // read applied scholarship api
    app.get("/applied_scholarship", async (req, res) => {
      const appliedScholarship = await appliedScholarshipsCollections
        .find()
        .toArray();

      res.send(appliedScholarship);
    });

    // add user to backend
    app.post("/users", async (req, res) => {
      const userInfo = req.body;
      userInfo.createdAt = new Date(userInfo.createdAt);
      const result = await userCollections.insertOne(userInfo);
      res.status(201).send({ message: "User Created Successfully", result });
    });

    // read user api
    app.get("/users", async (req, res) => {
      const result = await userCollections.find().toArray();
      res.send(result);
    });

    // specifiq user data read
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email };
      const result = await userCollections.findOne(filter);
      if (!result) {
        return res.status(404).send({ message: "user not found" });
      }
      res.send(result);
    });

    // update user info
    app.patch("/users/:email", async (req, res) => {
      const email = req.params.email;
      const userBody = req.body;
      const filter = { email: email };

      const updateDoc = {
        $set: userBody,
      };

      const result = await userCollections.updateOne(filter, updateDoc);

      res
        .status(200)
        .send({ message: "User Info Updated Successfully!", result });
    });

    // delete user api
    app.delete("/users/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };

      const result = await userCollections.deleteOne(filter);

      if (result.deletedCount > 0) {
        res.status(200).send({ message: "User Delete Successfully!" });
      } else {
        res.status(404).send({ message: "User Not Found" });
      }
    });
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
      scholarships.application_deadline = new Date(
        application_deadline,
      ).toLocaleDateString();
      const scholarship_post_date = scholarships.scholarship_post_date;
      scholarships.scholarship_post_date = new Date(
        scholarship_post_date,
      ).toLocaleDateString();

      const result = await scholarshipCollection.insertOne(scholarships);

      res
        .status(201)
        .send({ message: "scholarships are created successfull", result });
    });

    // read specifiq data usign id
    app.get("/all-scholarships/:id", async (req, res) => {
      const id = req.params.id;

      const filter = { _id: new ObjectId(id) };

      const result = await scholarshipCollection.findOne(filter);

      if (!result) {
        res.status(404).send({ message: "Scholarships Not Found" });
      }

      res.send(result);
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
