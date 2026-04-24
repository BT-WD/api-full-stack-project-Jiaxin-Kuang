import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const YELP_API_KEY = process.env.YELP_API_KEY;

app.get("/api/restaurants", async (req, res) => {
    try {
        const { location, category, price, radius, offset, open_now } = req.query;

        const response = await axios.get(
            "https://api.yelp.com/v3/businesses/search",
            {
                headers: {
                    Authorization: `Bearer ${YELP_API_KEY}`,
                },
                params: {
                    location,
                    categories: category,
                    price,
                    radius,
                    offset,
                    open_now,
                    limit: 50,
                }
            }
        );

        res.json(response.data);
    } 
    catch (err) {
        console.error("Error fetching restaurants:", err.message);
        res.status(500).json({ 
            error: "Failed to fetch restaurants",
            details: err.message 
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});