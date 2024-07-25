import {
  Card,
  CardBody,
  CardHeader,
  Text,
  Spinner,
  Flex,
  Button,
  VStack,
  HStack,
  Stack,
  Badge,
} from "@chakra-ui/react";
import { Quiz } from "../hooks/useQuiz";
import useQuestionNavigation from "../hooks/useQuestionNavigation";
import { decodeHtml } from "../hooks/usedecode";

interface Props {
  quiz: Quiz[];
  loading: boolean;
  error: Error | null;
}

const QuizApp = ({ quiz, loading, error }: Props) => {
    const totalQuestions = quiz.length;
    const { currenQuestionIndex, handleNextQuestion, handlePreviousQuestion } = useQuestionNavigation(totalQuestions);
    const currentQuestion = quiz[currenQuestionIndex];
    const questionNumber = currenQuestionIndex + 1;
    const allAnswers = currentQuestion?.incorrect_answers.concat(currentQuestion.correct_answer)
    const shuffleArray = (array: string[]) : string[] => {
      for (let i = array?.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const newOptions = shuffleArray(allAnswers);
    

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">{error.message}</Text>;


  return (
    <>
      <Badge px={7} py={2} backgroundColor={'white'} color={'black'} position={'relative'} top={'20px'} left={'20px'}>Score : 0</Badge>
      <VStack
        spacing={6}
        align={"stretch"}
        px={5}
        py={3}
        w={"70%"}
        mx={"auto"}
        mt={1}
        borderRadius={"lg"}
        boxShadow={"md"}
      >
        <Text
          textAlign={"center"}
          fontSize={"2xl"}
          fontWeight={"bold"}
          color={"white"}
        >
          QUIZ APP
        </Text>
        <Card
          backgroundColor={"white"}
          p={5}
          borderRadius={"20px"}
          boxShadow={"lg"}
        >
          <CardHeader>
            <HStack>
              <Text fontSize={"2xl"} fontWeight={"bold"} color={"black"} mb={1}>
                {questionNumber}.
              </Text>
              <Text fontSize={"2xl"} fontWeight={"bold"} color={"black"} mb={1}>
                {decodeHtml(currentQuestion?.question)}
              </Text>
            </HStack>
          </CardHeader>
          <CardBody>
            <Stack>
            {newOptions?.map((option, index) => <Button _hover={{backgroundColor:'black', color:'white'}} color={'black'} border={'1px solid black'} key={index}>{option}</Button>)}
            </Stack>
          </CardBody>
          <Flex mx={5} justifyContent={"space-between"} flexDir={{base:'column', md:'row'}} gap={{base:'4', md:'0'}}>
            <Button
              onClick={handlePreviousQuestion}
              backgroundColor={'black'}
              color={"white"}
              _hover={{color:'black', border:'1px solid black', backgroundColor:'white'}}
            >
              Previous
            </Button>
            <Button  backgroundColor={'black'}
              color={"white"}
              _hover={{color:'black', border:'1px solid black', backgroundColor:'white'}}>
              Restart
            </Button>
            <Button
              onClick={handleNextQuestion}
              backgroundColor={'black'}
              color={"white"}
              _hover={{color:'black', border:'1px solid black', backgroundColor:'white'}}
            >
              Next
            </Button>
          </Flex>
        </Card>
      </VStack>
    </>
  );
};

export default QuizApp;
