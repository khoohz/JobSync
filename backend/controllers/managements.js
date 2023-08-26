import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } }, // matching current user
      {
        $lookup: {
          // lookup affiliate table, compare User id with Affiliatestat userId
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats", // save in property called affiliateStats
        },
      },
      {
        $unwind: "$affiliateStats", // flatten array
      },
    ]);

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );
    const filteredSaleTransaction = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    res.status(200).json({user: userWithStats[0], sales: filteredSaleTransaction});

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
