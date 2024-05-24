import Score from "../model/score.js";

export const getScore = async (req, res) => {
  try {
    const scores = await Score.find();

    res.status(200).json(scores);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const recordScore = async (req, res) => {
  const score = req.body;

  const newScore = new Score(score);

  try {
    await newScore.save();
    const allScores = await Score.find();
    res.status(201).json(allScores);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      // Unique constraint violation (duplicate name)
      res
        .status(409)
        .json({ message: "Score record with the same name already exists." });
    } else {
      res.status(500).json({ message: "Failed to record the score." });
    }
  }
};

export const deleteScore = async (req, res) => {
  const id = req.params.id;

  try {
    await Score.findByIdAndRemove(id).exec();
    res.send("Successfully deleted!");
  } catch (error) {
    console.log(error);
  }
};

export const checkUserName = async (req, res) => {
  const name = req.body.name;
  try {
    var regExp = new RegExp("^" + name + "$", "i"); // case insensitive
    const score = await Score.findOne({ name: { $regex: regExp } }).exec();
    if (score) {
      res
        .status(500)
        .json({ message: "User name already exists.", success: false });
    } else {
      res
        .status(200)
        .json({ message: "User name is available.", success: true });
    }
  } catch (e) {
    console.log(e);
  }
};
