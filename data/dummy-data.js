import Category from '../models/category.js';
import Question from '../models/question.js';
import Hello from '../models/hello.js'

export const HELLO = [
    new Hello('h1', 'What\'s up?'),
    new Hello('h2', 'What\'s good?'),
    new Hello('h3', 'Hiya.'),
    new Hello('h4', 'What\'s popping?'),
    new Hello('h5', 'Hola.'),
    new Hello('h6', 'Bonjour.'),
    new Hello('h7', 'Buenas noches.'),
]

export const CATEGORIES = [
    new Category('c1', 'Adult'),
    new Category('c2', 'Arts'),
    new Category('c3', 'Books'),
    new Category('c4', 'Business'),
    new Category('c5', 'Career'),
    new Category('c6', 'Education'),
    new Category('c7', 'Entertainment'),
    new Category('c8', 'Games'),
    new Category('c9', 'Health & Fitness'),
    new Category('c10', 'IT'),
    new Category('c11', 'People and Society'),
    new Category('c12', 'Pets and Animals'),
    new Category('c13', 'Politics'),
    new Category('c14', 'Science'),
    new Category('c15', 'Travel'),
]

export const QUESTIONS = [
    new Question('q1', 'Do you think Finland has the best education in the world?', ['c6', 'c11'], new Date(), 100, 351, 102),
    new Question('q2', 'Is Harry Potter worth reading?', 'c3', new Date(), 46, 102, 68),
    new Question('q3', 'Should we send our kids to school during COVID?', ['c6', 'c13'], new Date(), 3246, 3461, 230),
    new Question('q4', 'Is it weird if I eat soup at school?', ['c11', 'c6'], new Date(), 10, 56, 11),
    new Question('q5', 'Is it stressful to play competitive games?', 'c8', new Date(), 1032, 5612, 2342),
    new Question('q6', 'Do you like this app?', 'c7', new Date(), 232, 533, 64),
    new Question('q7', 'Do you watch TV often?', ['c11', 'c7'], new Date(), 22, 12, 124),
    new Question('q8', 'Should I warm up before 40m of cycling in the city park?', 'c9', new Date(), 221, 122, 346),
    new Question('q9', 'Is Pirate Bay safe to use without a VPN?', 'c10', new Date(), 31, 21, 312),
    new Question('q10', 'Is React Native worth learning in 2020?', ['c10', 'c5'], new Date(), 31, 21, 312),
    new Question('q11', 'Do you think bangs are cute?', 'c11', new Date(), 313, 2391, 211),
    new Question('q12', 'Would you date a drug dealer?', 'c11', new Date(), 324, 235, 211),
    new Question('q13', 'Did you like the last season of Game of Thrones?', 'c11', new Date(), 4353, 1431, 3545),
]