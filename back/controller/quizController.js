import Quiz from '../model/Quiz';

// C
export const postCreateQuiz = async (req, res, next) => {
  const {
    body, user
  } = req;
  try {
    const newQuiz = await Quiz.create({
      creator : req.user._id,
      ...body
      // title,
      // weeks,
      // problems,
      // startedAt,  // "2020-01-01" String으로 받을 것.
      // img 
    })
    res.status(200).json({
      message: "Success Create Quiz",
      newQuiz
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
          .populate("quizs") // 문제들 다 불러 오기
      // console.log(`읽기 : ${itinerary}`);

      res.status(200).json({
          message : "Success Read Quiz",
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
      body,
      params : {id},
      user
  } = req;
  try {
      // console.log({title, description, routes, date, id});
      const quiz = await Quiz.findById({_id:id});
      if(quiz.creator !== user._id)
        throw 'Not Author'
      await Quiz.findOneAndUpdate({_id : id}, body);
      res.status(200).json ({
          message : "Success Update Quiz",
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
    const quiz = await Quiz.findById({_id:id});
    if(quiz.creator !== user._id)
      throw 'Not Author'
    const deleteQuiz = await Quiz.findByIdAndDelete({_id: id});
    res.status(200).json({message : "Success Delete Quiz"})
  } catch(err) {
    console.log(err);
    res.status(400).json({err})
  }
}