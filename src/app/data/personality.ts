import { selectRandomElements } from "@/app/data/utils"; 
import personData from "@/PersonalityData.json";

// Define types for the question data structure
export type PersonalityTrait = {
  question: string;
  test: Test;
  type: Type;
  category: Category;
  field: string | null;
}

// Enums for Category, Test, and Type to provide type safety
export enum Category {
  Agreeableness = "agreeableness",
  Conscientiousness = "conscientiousness",
  Dominance = "dominance",
  Influence = "influence",
  InterpersonalSkills = "interpersonal_skills",
  Leadership = "leadership",
  Openness = "openness",
  StressHandling = "stress_handling",
}

export enum Test {
  Personality = "personality",
}

export enum Type {
  Extrovert = "Extrovert",
  Introvert = "Introvert",
}

// Define the interface for the question structure
interface Question {
  question: string;
  test: Test;
  type: Type;
  category: Category;
  field: string | null;
}

// Sample JSON data cast to the Question type
const questions: Question[] = personData as Question[];

// Function to group questions by their category
function groupQuestionsByCategory(questions: Question[]): Record<Category, Question[]> {
  return questions.reduce((acc: Record<Category, Question[]>, questionData: Question) => {
    // Initialize the category if not already present
    if (!acc[questionData.category]) {
      acc[questionData.category] = [];
    }
    // Add the entire question object to the corresponding category array
    acc[questionData.category].push(questionData);
    return acc;
  }, {} as Record<Category, Question[]>);
}

// Group the questions by category
const groupedQuestions = groupQuestionsByCategory(questions);

// console.log(groupedQuestions);

type GroupedQuestions = Record<Category, Question[]>;

// Function to select 5 random questions from each category
function selectRandomQuestionsFromEachCategory(groupedQuestions: GroupedQuestions): GroupedQuestions {
  // Use reduce to iterate over the categories and select random questions
  return Object.entries(groupedQuestions).reduce((acc, [category, questions]) => {
    // Select up to 5 random questions from each category
    acc[category as Category] = selectRandomElements(questions, 5);
    return acc;
  }, {} as GroupedQuestions);
}

const randomQuestions = selectRandomQuestionsFromEachCategory(groupedQuestions);

export { personData, randomQuestions };
