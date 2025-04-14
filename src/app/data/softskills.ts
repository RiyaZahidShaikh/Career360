import { selectRandomElements } from "@/app/data/utils"; 
import softData from "@/SoftSkillData.json";

// Define types for the question data structure
export type SoftSkills = {
  question: string;
  test:     Test;
  type:     null;
  category: Category;
  field:    null;
}

export enum Category {
  AdaptabilityAndFlexibility = "Adaptability_and_Flexibility",
  Communication = "Communication",
  ConflictResolution = "Conflict_Resolution",
  EmotionalIntelligence = "Emotional_Intelligence",
  InterpersonalSkills = "Interpersonal_Skills",
  Leadership = "Leadership",
  ProblemSolving = "Problem_Solving",
  TeamworkAndCollaboration = "Teamwork_and_Collaboration",
  TimeManagement = "Time_Management",
  WorkEthic = "Work_Ethic",
}

export enum Test {
  SoftSkills = "soft_skills",
}

// Define the interface for the question structure
interface Question {
  question: string;
  test: Test;
  type: string | null;
  category: Category;
  field: string | null;
}

// Sample JSON data cast to the Question type
const questions: Question[] = softData as Question[];

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

export { randomQuestions };
