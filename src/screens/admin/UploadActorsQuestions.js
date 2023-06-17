import {Button, Text} from "react-native";
import {superBase} from "../../services/superBase";
import quiz from "../../realm/schemas/Quiz";

export const UploadActorsQuestions = () => {

    const actorQuizId = 'a81ceac6-a8a1-4b53-ae31-2c3381c8c6a5';

    const questions = require('../../../data/actors.json')

    const uploadQuestions = async () => {
        let { data: quiz_questions, error } = await superBase
            .from('quiz_questions')
            .delete()
            // Filters
            .eq('quiz_id', actorQuizId);
        for(let i = 0; i < questions.length; i++) {
            let { data: quiz_questions, error } = await superBase
                .from('quiz_questions')
                .insert([{
                    quiz_id: actorQuizId,
                    question: questions[i].question,
                    choices: questions[i].choices,
                    answer: questions[i].answer,
                }])
            if (!error) {
                console.log(quiz_questions);
            } else {
                console.log(error);
            }
        }

        console.log('All questions added');
    }

    const deleteQuestions = () => {

    }

    return (
        <>
            <Text style={{padding: 12}}>WARNING!: Uploading questions will delete all questions relating to this category</Text>
            <Button title={"Upload Questions"} onPress={uploadQuestions} />
        </>
    )

}