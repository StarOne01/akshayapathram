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

module.exports = {
    donate
}