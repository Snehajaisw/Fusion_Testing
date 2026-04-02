import Submission from "../models/Submission.js";

export const getLeaderboard = async (req, res) => {
  try {
    const leaders = await Submission.aggregate([
      {
        $group: {
          _id: "$userId",
          totalSubmissions: { $sum: 1 },
          accepted: {
            $sum: { $cond: [{ $eq: ["$status", "Accepted"] }, 1, 0] }
          },
          lastSubmission: { $max: "$createdAt" }
        }
      },
      {
        $addFields: {
          accuracy: {
            $round: [
              {
                $multiply: [
                  { $divide: ["$accepted", "$totalSubmissions"] },
                  100
                ]
              },
              2
            ]
          }
        }
      },
      { $sort: { accepted: -1 } }
    ]);

    res.json({ success: true, leaders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
