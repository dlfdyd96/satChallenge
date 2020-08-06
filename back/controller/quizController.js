import Quiz from '../model/Quiz';
import mongoose from 'mongoose';

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
        // startAt 을 Date type으로 변환
        // console.log(quiz)
        let startAt = new Date(quiz.startAt+'T00:00:00.000+09:00')

        // endAt 을 Date type으로 변환
        let endAt = new Date(quiz.startAt+'T00:00:00.000+09:00')
        endAt.setDate(endAt.getDate() + (quiz.endAt))

        quiz.endAt = endAt
        quiz.startAt = startAt
        
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
      quiz,
    }
  } = req;
  try {
    const existingQuiz = await Quiz.findByIdAndUpdate(
      {_id:quiz.id},
      {
        title : quiz.title,
        url : quiz.url,
        description : quiz.description
      })

    // const updatedQuiz = await Quiz.findOneAndUpdate({_id : id}, body);
    res.status(200).json ({
      message : "Success Update Quiz"
    }) 
  } catch(err){ 
    console.log(`Failed to Update Quiz \n${err}`);
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
    /*
    const selectedQuiz = await Quiz.findById({_id:id});
    if(selectedQuiz.creator !== user._id)
      throw 'Not Author'
    */

    await Quiz.findByIdAndDelete({_id: id});
    res.status(200).json({message : "Success Delete Quiz"})
  } catch(err) {
    console.log(err);
    res.status(400).json({err})
  }
}