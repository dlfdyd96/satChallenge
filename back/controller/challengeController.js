import Challenge from '../model/Challenge';
import Quiz from '../model/Quiz';
import User from '../model/User';

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

// C
export const postCreateChallenge = async (req, res, next) => {
  const {
    body : {
      title, weeks, problems, startedAt, img 
    }
  } = req;
  try {
    const newChallenge = await Challenge.create({
      creator : req.user._id,
      title,
      weeks,
      problems,
      startedAt,  // "2020-01-01" String으로 받을 것.
      img 
    })
    res.status(200).json({
      message: "Success Create Challenge",
      newChallenge
    })
  } catch(err) {
    console.log(err);
    res.status(400).json({err});
  }
}

// R
export const getReadChallenge = async (req, res, next) => {
  const { 
    params: { id }
  } = req;
  try {
      const selectedChallenge = await Challenge.findById(id)
          .populate("creator") // 사용자 정보 얻어오기
      const selectedQuizzes = await Quiz.find({challenge: id})
      
      // console.log(`selectedQuizzes : ${selectedQuizzes}`)
      res.status(200).json({
          message : "Success Read Challenge",
          selectedChallenge,
          selectedQuizzes
      })
      // next();
  } catch(err) {
      console.log(`Read Challenge Error : ${err}`);
      res.status(400).json({err});
  }
}

// U
export const postUpdateChallenge = async (req, res, next) => {
  const {
      body,
      params : {id},
      user,
  } = req;
  
  try {
    const selectedChallenge = await Challenge.findById({_id:id});
    if(selectedChallenge.creator !== user._id)
      throw 'Not Author'

    const updatedChallenge = await Challenge.findOneAndUpdate({_id : id}, body);
    res.status(200).json ({
        message : "Success Update Challenge",
        updatedChallenge,
    })
  } catch(err){ 
    console.log(`Failed to Update Challenge ${err}`);
    res.status(400).json({
        message : "Failed to Update Challenge",
        error : err
    });   
  }
}

// D
export const getDeleteChallenge = async (req, res, next) => {
  const {
    params : { id },
    user
  } = req;
  try {
    const selectedChallenge = await Challenge.findById({_id:id});
    // console.log(`만든이 : ${selectedChallenge.creator}\n사용자 : ${user._id}\n${selectedChallenge.creator+'' === user._id+''}`)
    if(selectedChallenge.creator+'' !== user._id+'')
      throw 'Not Author'

    await Challenge.findByIdAndDelete({_id: id});
    await Quiz.deleteMany({challenge : id});
    res.status(200).json({message : "Success Delete Challenge"})
  } catch(err) {
    console.log(err);
    res.status(400).json({err})
  }
}

// join Challenge
// challenge/:id/join
export const getJoinChallenge = async (req, res, next) => {
  const {
    user,
    params : { id } // challenge Id
  } = req;
  try {
    // User Model - joinedChallenge 추가
    user.joinedChallenge.push(id)
    const selectedChallenge = await Challenge.findById(id);
    selectedChallenge.challengers.push(user._id);
    await User.findOneAndUpdate({_id:user._id}, {joinedChallenge : user.joinedChallenge})
    await Challenge.findOneAndUpdate({_id:id}, {challengers : selectedChallenge.challengers })
    res.status(200).json({
      message : "Success Join Challenge"
    })
    // Challenge Model - Challengers 추가
  }catch(err) {
    console.log(err);
    res.status(400).send({err})
  }
}