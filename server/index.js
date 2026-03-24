require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// verify token

const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }

    req.decoded = decoded;

    next();
  });
};

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

    // generate token
    app.post("/jwt", async (req, res) => {
      const userInfo = req.body;
      const token = await jwt.sign(userInfo, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "1d",
      });

      // set to cookie

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
      });

      res.send({ success: true, token });
    });

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

    // my applied scholarship
    app.post("/applied_scholarship", verifyToken, async (req, res) => {
      const scholarshipBody = req.body;
      scholarshipBody.status = "pending";

      // cookie to email verify
      if (scholarshipBody.userEmail !== req.decoded.userEmail) {
        return res.status(403).send({ message: "Forbidden Access" });
      }

      const alreadyApplied = await appliedScholarshipsCollections.findOne({
        userEmail: scholarshipBody.userEmail,
        scholarshipId: scholarshipBody.scholarshipId,
      });

      if (alreadyApplied) {
        return res.status(400).send({ message: "Already Applied" });
      }

      const result =
        await appliedScholarshipsCollections.insertOne(scholarshipBody);
      res.send({ message: "Scholarship Applied", result });
    });

    // admin route: get all applied scholarships
    app.get("/applied_scholarship", async (req, res) => {
      const allApplied = await appliedScholarshipsCollections.find().toArray();
      res.send(allApplied);
    });

    // admin route : read specific applied scholarships data
    app.patch("/applied_scholarship/:id", async (req, res) => {
      const id = req.params.id;
      const { status } = req.body;

      const filter = { _id: new ObjectId(id) };

      const updateDoc = {
        $set: {
          status: status,
        },
      };

      const result = await appliedScholarshipsCollections.updateOne(
        filter,
        updateDoc,
      );

      res
        .status(200)
        .send({ message: "Applied scholarships Status Updated" }, result);
    });

    // read specifiq my  application
    app.get("/applied_scholarship/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.userEmail) {
        return res.status(403).send({ message: "Forbidden Access" });
      }
      const filter = { userEmail: email };

      const result = await appliedScholarshipsCollections
        .find(filter)
        .toArray();
      res.send(result);
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
    app.get("/users/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.userEmail) {
        return res.status(403).send({ message: "Forbidden Access" });
      }
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

      scholarships.scholarship_post_date = new Date().toLocaleDateString();

      const result = await scholarshipCollection.insertOne(scholarships);

      res
        .status(201)
        .send({ message: "scholarships are created successfull", result });
    });

    // delete scholarships
    app.delete("/all-scholarships/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await scholarshipCollection.deleteOne(filter);

      if (!result.deletedCount > 0) {
        res.status(404).send({ message: "kam Saira falaichen bhai file nai" });
      }
      res.send(result);
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
