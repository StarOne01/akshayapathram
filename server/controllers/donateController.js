const Donation = require("../models/Donation")

const donate = async (req, res) => {
    try {

        const donation = new Donation({
            userId: req.body.userId,
            item: req.body.item,
            description: req.body.description,
            location: {
                latitude: req.body.location.latitude,
                longitude: req.body.location.longitude,
            },
            quantity: req.body.quantity,
            img_url: req.body.img_url

        })
        await donation.save();

        res.status(200).json({ message: "done!"});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getAllDonations =  async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid donation ID" });
        }

        const donation = await Donation.findById(id).populate("userId", "name email");

        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }

        res.json(donation);
    } catch (err) {
        console.error("Error fetching donation:", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    donate,
    getAllDonations
}

