import SubmitQuiz from '../model/submitQuiz';

// C
export const postCreateSubmitQuiz = async (req, res, next) => {
  const {
    body, user
  } = req;
  try {
    const newSubmitQuiz = await SubmitQuiz.create({
      creator : req.user._id,
      ...body
      // title,
      // weeks,
      // problems,
      // startedAt,  // "2020-01-01" String으로 받을 것.
      // img 
    })

    res.status(200).json({
      message: "Success Create submitQuiz",
      newSubmitQuiz
    })
  } catch(err) {
    console.log(err);
    res.status(400).json({err});
  }
}

// R
export const getReadSubmitQuiz = async (req, res, next) => {
  const { 
      params: { id }
  } = req;
  try {
      const selectedSubmitQuiz = await SubmitQuiz.findById(id)
          .populate("creator") // 사용자 정보 얻어오기

      res.status(200).json({
          message : "Success Read submitQuiz",
          selectedSubmitQuiz,
      })
      // next();
  } catch(err) {
      console.log(`Read submitQuiz Error : ${err}`);
      res.status(400).json({err});
  }
}

// U
export const postUpdateSubmitQuiz = async (req, res, next) => {
  const {
      body,
      params : {id},
      user
  } = req;
  try {
      // console.log({title, description, routes, date, id});
      const selectedSubmitQuiz = await SubmitQuiz.findById({_id:id});
      if(selectedSubmitQuiz.creator !== user._id)
        throw 'Not Author'

      await SubmitQuiz.findOneAndUpdate({_id : id}, body);
      res.status(200).json ({
          message : "Success Update submitQuiz",
      })
  } catch(err){ 
      console.log(`Failed to Update submitQuiz ${err}`);
      res.status(400).json({
          message : "Failed to Update submitQuiz",
          error : err
      });   
  }
}

// D
export const getDeleteSubmitQuiz = async (req, res, next) => {
  const {
    params : { id }
  } = req;
  try {
    const selectedSubmitQuiz = await SubmitQuiz.findById({_id:id});
    if(selectedSubmitQuiz.creator !== user._id)
      throw 'Not Author'
    const deleteSubmitQuiz = await SubmitQuiz.findByIdAndDelete({_id: id});
    res.status(200).json({message : "Success Delete submitQuiz"})
  } catch(err) {
    console.log(err);
    res.status(400).json({err})
  }
}