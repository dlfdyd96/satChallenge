import Quiz from '../model/Quiz';

// C
export const postCreateQuiz = async (req, res, next) => {
  const {
    body : {
      quizzes,
      challengeId
    },
  } = req;
  try {
    console.log(`challengeId: ${challengeId}`)
    await Promise.all(
      quizzes.map((quiz) => {
        Quiz.create({
          creator : req.user._id,
          challenge : challengeId,
          ...quiz
        })
      })
    )

    res.status(200).json({
      message: "Success Create Quiz"
    })
  } catch(err) {
    console.log(err);
    res.status(400).json({err});
  }
}

// R
export const getReadQuiz = async (req, res, next) => {
  const { 
      params: { id }
  } = req;
  try {
      const selectedQuiz = await Quiz.findById(id)
          .populate("challenge") // 사용자 정보 얻어오기
          .populate("creator") // 문제들 다 불러 오기
          .populate("submitChallenger")
      // console.log(`읽기 : ${itinerary}`);

      res.status(200).json({
          message : "Success Read Quiz",
          selectedQuiz
      })
      // next();
  } catch(err) {
      console.log(`Read Quiz Error : ${err}`);
      res.status(400).json({err});
  }
}

// U
export const postUpdateQuiz = async (req, res, next) => {
  const {
    body : {
      quizzes,
      challengeId
    },
    user
  } = req;
  try {
    // console.log({title, description, routes, date, id});
    const selectedQuiz = await Quiz.findById({_id:id});
    if(selectedQuiz.creator !== user._id)
      throw 'Not Author'
    
    // 1. challengeId에 해당하는 Quiz 삭제
    await Quiz.deleteMany({challenge: challengeId})

    // 2. 다시 Create
    await Promise.all(
      quizzes.map((quiz) => {
        Quiz.create({
          creator : req.user._id,
          challenge : challengeId,
          ...quiz
        })
      })
    )

    // const updatedQuiz = await Quiz.findOneAndUpdate({_id : id}, body);
    res.status(200).json ({
      message : "Success Update Quiz"
    }) 
  } catch(err){ 
    console.log(`Failed to Update Quiz ${err}`);
    res.status(400).json({
      message : "Failed to Update Quiz",
      error : err
    });   
  }
}

// D
export const getDeleteQuiz = async (req, res, next) => {
  const {
    params : { id }
  } = req;
  try {
    const selectedQuiz = await Quiz.findById({_id:id});
    if(selectedQuiz.creator !== user._id)
      throw 'Not Author'

    await Quiz.findByIdAndDelete({_id: id});
    res.status(200).json({message : "Success Delete Quiz"})
  } catch(err) {
    console.log(err);
    res.status(400).json({err})
  }
}