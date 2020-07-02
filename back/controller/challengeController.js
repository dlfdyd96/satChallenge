import Challenge from '../model/challenge';

export const getAllChallenges =  async (req, res, next) => {
  try {
    const challenges = await Challenge.find();
    res.status(200).json({
      challenges
    })
  } catch(err) {
    console.log(err);
    res.status(400).send(err);
  }
}

