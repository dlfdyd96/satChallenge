import SubmitQuiz from '../model/SubmitQuiz';

// C
export const postCreateSubmitQuiz = async (req, res, next) => {
  const {
    body
  } = req;
  try {
    // 존재하는 경우

    const newSubmitQuiz = await SubmitQuiz.create({
      creator: req.user._id,
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
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
}

// R
export const getReadSubmitQuiz = async (req, res, next) => {
  const {
    params: { id }
  } = req;
  try {
    const quizId = id;
    const selectedSubmitQuiz = await SubmitQuiz.findOne({quiz : quizId, creator: req.user._id})

    res.status(200).json({
      message: "Success Read submitQuiz",
      selectedSubmitQuiz,
      quizId,
    })
    // next();
  } catch (err) {
    console.log(`Read submitQuiz Error : ${err}`);
    res.status(400).json({ err });
  }
}

// U
export const postUpdateSubmitQuiz = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  try {
    // console.log({title, description, routes, date, id});
    const selectedSubmitQuiz = await SubmitQuiz.findById({ _id: body._id });
    if (selectedSubmitQuiz.creator+'' !== req.user._id+'')
      throw 'Not Author'

    await SubmitQuiz.findOneAndUpdate({ _id: body._id }, { contents : body.contents});
    res.status(200).json({
      message: "Success Update submitQuiz",
    })
  } catch (err) {
    console.log(`Failed to Update submitQuiz ${err}`);
    res.status(400).json({
      message: "Failed to Update submitQuiz",
      error: err
    });
  }
}

// D : 안 쓸 것 같긴 해
export const getDeleteSubmitQuiz = async (req, res, next) => {
  const {
    params: { id }
  } = req;
  try {
    const selectedSubmitQuiz = await SubmitQuiz.findById({ _id: id });
    if (selectedSubmitQuiz.creator !== req.user._id)
      throw 'Not Author'
    const deleteSubmitQuiz = await SubmitQuiz.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Success Delete submitQuiz" })
  } catch (err) {
    console.log(err);
    res.status(400).json({ err })
  }
}