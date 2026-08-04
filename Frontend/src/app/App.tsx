import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Flame, Star, Zap, Trophy, Code2, BookOpen, User, Bell,
  Lock, CheckCircle, Play, ChevronRight, Award, Heart,
  X, Check, Sparkles, TrendingUp, Target, Rocket, Crown,
  Terminal, Lightbulb, Calendar, Volume2, SkipForward,
  Pause, Play as PlayIcon, ArrowLeft, ArrowRight, Copy,
  LogOut, RefreshCw,
  Eye, EyeOff, Mail, KeyRound,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen = "auth" | "dashboard" | "lang-select" | "topic-list" | "lesson" | "code-section" | "quiz" | "rewards" | "leaderboard";
type AuthMode = "login" | "signup";
type Theme = "dark" | "light";

interface UserData {
  name: string;
  email: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  coins: number;
  rank: number;
  completedTopics: string[];
}

interface QuizQuestion {
  type: "mcq" | "output" | "fill" | "debug" | "truefalse";
  question: string;
  code?: string;
  options: string[];
  correct: number;
  explanation: string;
  points: number;
}

interface Topic {
  id: string;
  title: string;
  subtitle: string;
  level: "beginner" | "intermediate" | "advanced";
  icon: string;
  duration: string;
  xpReward: number;
  coinReward: number;
  subtitles: string[];
  voiceScript: string;
  keyPoints: string[];
  code: string;
  codeExplanation: string;
  output: string;
  quiz: QuizQuestion[];
}

interface Language {
  id: string;
  name: string;
  emoji: string;
  description: string;
  gradient: string;
  textColor: string;
  topics: Topic[];
  enrolled: string;
  difficulty: number;
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(/\/$/, "");

async function apiRequest(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("codequest_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "API request failed");
  return data;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const pythonTopics: Topic[] = [
  {
    id: "py-hello",
    title: "Hello World",
    subtitle: "Your first Python program",
    level: "beginner",
    icon: "👋",
    duration: "5 min",
    xpReward: 25,
    coinReward: 10,
    subtitles: [
      "Python lo programming start chestham! 🐍",
      "print() function — screen meeda text show avvadam",
      "Hello, World! — programmer's tradition! 🌍",
      "Quotes lo text raayali — 'Hello' or \"Hello\"",
      "Run chesthe, output console lo vastundi! ✅",
    ],
    voiceScript: "Hello students! Meeru today Python programming start chestham. Python is a very popular and easy language. First, meeru print function nerchukundam. Print ante, screen meeda text show cheyyadam. Idi run chesthe, Hello World ani output vastaadi. It is a tradition in programming to write Hello World as your first program. Let's begin!",
    keyPoints: [
      "🖨️  print() displays output on screen",
      "📝  Text must be inside quotes",
      "▶️  Press Run to execute your code",
      "🎉  Hello, World! is every coder's first step",
    ],
    code: `# Your very first Python program! 🐍
print("Hello, World!")
print("Welcome to CodeQuest!")
print("Python lo nerchukundam — Let's Go! 🚀")

# You can print numbers too
print(2025)
print("Version:", 3.12)`,
    codeExplanation: "print() function use chesi screen meeda text show chestham. Text ni quotes lo raayali.",
    output: "Hello, World!\nWelcome to CodeQuest!\nPython lo nerchukundam — Let's Go! 🚀\n2025\nVersion: 3.12",
    quiz: [
      {
        type: "mcq",
        question: "Python lo output display cheyyadaniki emi use chestam?",
        options: ["printf()", "print()", "output()", "display()"],
        correct: 1,
        explanation: "print() is the correct function to display output in Python!",
        points: 10,
      },
      {
        type: "output",
        question: "Ee code run chesthe em output vastaadi?",
        code: `print("CodeQuest")`,
        options: ["\"CodeQuest\"", "CodeQuest", "code quest", "Error"],
        correct: 1,
        explanation: "print() quotes tho output icchadu kaadu — plain text show avutundi!",
        points: 15,
      },
      {
        type: "fill",
        question: "Screen meeda 'Hello' print cheyyadaniki blank fill cheyyi: _____(\"Hello\")",
        options: ["printf", "echo", "print", "write"],
        correct: 2,
        explanation: "Python lo print() function use chestam for displaying output.",
        points: 10,
      },
      {
        type: "truefalse",
        question: "Python lo print('Hi') and print(\"Hi\") — rendu same output icchatayi.",
        options: ["True — both work the same", "False — only double quotes work", "False — only single quotes work", "Error in both"],
        correct: 0,
        explanation: "Python lo both single and double quotes valid! Output same — Hi.",
        points: 10,
      },
    ],
  },
  {
    id: "py-variables",
    title: "Variables & Data Types",
    subtitle: "Store and manage data",
    level: "beginner",
    icon: "📦",
    duration: "8 min",
    xpReward: 35,
    coinReward: 15,
    subtitles: [
      "Variable ante — data store cheyyadaniki oka box! 📦",
      "x = 5 — x lo 5 store avutundi",
      "int, float, str, bool — 4 main data types",
      "type() function tho data type check cheyyi",
      "Python automatically type decide chestundi! ✨",
    ],
    voiceScript: "Hello! Today meeru variables gurinchi nerchukundam. Variable ante oka box laantidi — adi lo data store chestam. For example x equals 5 ante, x lo 5 store avutundi. Python lo naalu main data types unnai — integer, float, string, and boolean. Integer ante whole numbers, float ante decimal numbers, string ante text, and boolean ante True or False. Python automatically type decide chestundi — idi dynamic typing antaru!",
    keyPoints: [
      "📦  Variable = a container for storing data",
      "🔢  int → whole numbers: 5, 100, -3",
      "🌊  float → decimals: 3.14, 2.5",
      "📝  str → text: 'Hello', 'Python'",
      "✅  bool → True or False only",
    ],
    code: `# Variables in Python 📦
name = "CodeQuest"        # String (text)
age = 16                  # Integer (whole number)
score = 98.5              # Float (decimal)
is_premium = True         # Boolean (True/False)

# Print variables
print("Name:", name)
print("Age:", age)
print("Score:", score)
print("Premium:", is_premium)

# Check data types
print(type(name))         # <class 'str'>
print(type(age))          # <class 'int'>`,
    codeExplanation: "Variables ki values assign chestam = operator use chesi. type() function tho type check cheyochu.",
    output: "Name: CodeQuest\nAge: 16\nScore: 98.5\nPremium: True\n<class 'str'>\n<class 'int'>",
    quiz: [
      {
        type: "mcq",
        question: "x = 3.14 — x endi data type lo untundi?",
        options: ["int", "str", "float", "bool"],
        correct: 2,
        explanation: "3.14 is a decimal number — so it's a float data type!",
        points: 10,
      },
      {
        type: "output",
        question: "Em output vastaadi?",
        code: `x = 10\ny = 3\nprint(x + y)`,
        options: ["103", "13", "x+y", "Error"],
        correct: 1,
        explanation: "Two integers add avutayi — 10 + 3 = 13!",
        points: 15,
      },
      {
        type: "fill",
        question: "Variable type check cheyyadaniki _____() use chestam.",
        options: ["check", "typeof", "type", "gettype"],
        correct: 2,
        explanation: "type() function Python lo data type return chestundi.",
        points: 10,
      },
      {
        type: "debug",
        question: "Ee code lo em wrong undhi?",
        code: `Name = CodeQuest\nprint(Name)`,
        options: ["print syntax wrong", "CodeQuest quotes lo undaali", "Name capital letter wrong", "Nothing is wrong"],
        correct: 1,
        explanation: "String values always quotes lo undaali: name = \"CodeQuest\"",
        points: 15,
      },
    ],
  },
  {
    id: "py-conditions",
    title: "If-Else Conditions",
    subtitle: "Make decisions in code",
    level: "beginner",
    icon: "🔀",
    duration: "10 min",
    xpReward: 40,
    coinReward: 18,
    subtitles: [
      "Conditions — code ki decision making power! 🧠",
      "if condition True aithe → if block run avutundi",
      "else → condition False aithe run avutundi",
      "elif → multiple conditions check cheyyadaniki",
      "Indentation (spaces) very important in Python! ⚠️",
    ],
    voiceScript: "Today meeru if else conditions nerchukundam. Conditions ante, code ki decision making capability ivadam. If age greater than 18 aithe — adult, otherwise minor ani decide cheyyadam. Python lo indentation chala important — four spaces or one tab use cheyyi. elif use chesi multiple conditions check cheyochu. Meeru okka real example chustham!",
    keyPoints: [
      "🧠  if → condition True aithe execute",
      "🔀  else → condition False aithe execute",
      "🔢  elif → extra conditions check",
      "⚠️  Indentation (4 spaces) mandatory!",
      "💡  ==, >, <, >=, <=, != operators use cheyyi",
    ],
    code: `# If-Else in Python 🔀
age = 17
score = 85

# Simple if-else
if age >= 18:
    print("You are an Adult! 🧑")
else:
    print("You are a Minor! 👦")

# elif for multiple conditions
if score >= 90:
    print("Grade: A+ 🌟")
elif score >= 80:
    print("Grade: A 🎉")
elif score >= 70:
    print("Grade: B 👍")
else:
    print("Grade: C — Keep Practicing!")`,
    codeExplanation: "if condition True aithe adi block run avutundi. else block always runs when condition is False.",
    output: "You are a Minor! 👦\nGrade: A 🎉",
    quiz: [
      {
        type: "output",
        question: "x = 10 aithe em print avutundi?",
        code: `x = 10\nif x > 5:\n    print("Big")\nelse:\n    print("Small")`,
        options: ["Small", "Big", "Error", "Nothing"],
        correct: 1,
        explanation: "10 > 5 is True, so 'Big' prints!",
        points: 15,
      },
      {
        type: "mcq",
        question: "Python lo if statement tarvata emi mandatory?",
        options: ["semicolon ;", "colon :", "brackets {}", "parentheses ()"],
        correct: 1,
        explanation: "if condition: — colon mandatory in Python!",
        points: 10,
      },
      {
        type: "fill",
        question: "Multiple conditions check cheyyadaniki if tarvata _____ use chestam.",
        options: ["else if", "elsif", "elif", "elseif"],
        correct: 2,
        explanation: "Python uses elif (not else if or elsif) for additional conditions.",
        points: 10,
      },
      {
        type: "debug",
        question: "Ee code lo em error undhi?",
        code: `if x > 10\n    print("Hello")`,
        options: ["print wrong", "Missing colon after condition", "x not defined", "No error"],
        correct: 1,
        explanation: "if condition ke baad colon : mandatory! 'if x > 10:' undaali.",
        points: 15,
      },
    ],
  },
  {
    id: "py-loops",
    title: "Loops",
    subtitle: "Repeat actions efficiently",
    level: "beginner",
    icon: "🔄",
    duration: "12 min",
    xpReward: 45,
    coinReward: 20,
    subtitles: [
      "Loop ante same code ni repeat cheyyadam! 🔄",
      "for loop — known number of times repeat",
      "while loop — condition True ga undagantu repeat",
      "range() function — numbers generate chestundi",
      "break, continue — loop control cheyyadaniki! 🛑",
    ],
    voiceScript: "Today meeru loops nerchukundam. Loop ante, same code ni multiple times run cheyyadam. For loop use chesi range lo numbers iterate cheyochu. While loop use chesi condition True ga undagantu repeat cheyochu. Break use chesi loop ni stop cheyochu, continue use chesi current iteration skip cheyochu. Loops tho chala time save avutundi!",
    keyPoints: [
      "🔄  for loop → iterate over sequences",
      "⏳  while loop → runs until condition is False",
      "📊  range(start, stop, step) → generates numbers",
      "🛑  break → exits loop immediately",
      "⏭️  continue → skips current iteration",
    ],
    code: `# Loops in Python 🔄

# For loop with range
print("Counting 1 to 5:")
for i in range(1, 6):
    print(i, end=" ")

print()  # New line

# While loop
print("\\nCountdown!")
count = 5
while count > 0:
    print(count, end=" ")
    count -= 1
print("🚀 Blast off!")

# Loop with break
for num in range(10):
    if num == 5:
        break
    print(num, end=" ")`,
    codeExplanation: "range(1, 6) gives 1,2,3,4,5. while loop count > 0 ga undagantu run avutundi.",
    output: "Counting 1 to 5:\n1 2 3 4 5 \n\nCountdown!\n5 4 3 2 1 🚀 Blast off!\n0 1 2 3 4 ",
    quiz: [
      {
        type: "output",
        question: "Em output vastaadi?",
        code: `for i in range(3):\n    print(i)`,
        options: ["1 2 3", "0 1 2", "0 1 2 3", "Error"],
        correct: 1,
        explanation: "range(3) gives 0, 1, 2 — always starts from 0!",
        points: 15,
      },
      {
        type: "mcq",
        question: "Loop ni immediately stop cheyyadaniki emi use chestam?",
        options: ["stop", "exit", "break", "return"],
        correct: 2,
        explanation: "break statement loop ni immediately exit chestundi!",
        points: 10,
      },
      {
        type: "fill",
        question: "range(___) gives: 0, 1, 2, 3, 4",
        options: ["4", "5", "6", "range(0,5)"],
        correct: 1,
        explanation: "range(5) = 0, 1, 2, 3, 4 — five numbers starting from 0.",
        points: 10,
      },
      {
        type: "truefalse",
        question: "while True: ante — condition eppudu False kadu, so infinite loop avutundi.",
        options: ["True — it runs forever", "False — it stops after 10 iterations", "False — Python auto-stops it", "Error"],
        correct: 0,
        explanation: "while True: is an infinite loop — you need break to exit it!",
        points: 15,
      },
    ],
  },
  {
    id: "py-functions",
    title: "Functions",
    subtitle: "Reusable blocks of code",
    level: "intermediate",
    icon: "⚙️",
    duration: "15 min",
    xpReward: 55,
    coinReward: 25,
    subtitles: [
      "Function ante — reusable code block! ⚙️",
      "def keyword tho function define chestam",
      "Parameters — function ki data pass cheyyadaniki",
      "return — function nundi value return cheyyadaniki",
      "DRY principle: Don't Repeat Yourself! 💡",
    ],
    voiceScript: "Today meeru functions nerchukundam. Function ante oka reusable code block. def keyword tho define chestam. Parameters tho data pass cheyochu. Return tho result return cheyochu. Functions use chese DRY principle follow chestam — Don't Repeat Yourself. Oka bar function raasthe, daani multiple times use cheyochu!",
    keyPoints: [
      "⚙️  def function_name(): — function define",
      "📥  Parameters → data in, return → data out",
      "♻️  Write once, use many times!",
      "💡  Default parameter values possible",
      "🔄  Functions can call other functions",
    ],
    code: `# Functions in Python ⚙️

# Simple function
def greet(name):
    return f"Hello, {name}! Welcome to Python! 👋"

# Function with default parameter
def power(base, exp=2):
    return base ** exp

# Call functions
print(greet("Rahul"))
print(greet("Priya"))

print("Square of 5:", power(5))      # uses default exp=2
print("Cube of 3:", power(3, 3))     # exp=3

# Function returning multiple values
def min_max(numbers):
    return min(numbers), max(numbers)

low, high = min_max([5, 2, 8, 1, 9])
print(f"Min: {low}, Max: {high}")`,
    codeExplanation: "def tho function define chestam. Parameters ki default values set cheyochu. Multiple values return cheyochu.",
    output: "Hello, Rahul! Welcome to Python! 👋\nHello, Priya! Welcome to Python! 👋\nSquare of 5: 25\nCube of 3: 27\nMin: 1, Max: 9",
    quiz: [
      {
        type: "mcq",
        question: "Python lo function define cheyyadaniki which keyword use chestam?",
        options: ["function", "define", "def", "func"],
        correct: 2,
        explanation: "Python lo 'def' keyword use chesi functions define chestam!",
        points: 10,
      },
      {
        type: "output",
        question: "Em output vastaadi?",
        code: `def add(a, b):\n    return a + b\nprint(add(3, 4))`,
        options: ["34", "7", "a + b", "Error"],
        correct: 1,
        explanation: "add(3, 4) returns 3+4 = 7!",
        points: 15,
      },
      {
        type: "fill",
        question: "Function nundi value return cheyyadaniki _____ keyword use chestam.",
        options: ["give", "send", "return", "output"],
        correct: 2,
        explanation: "return keyword function nundi value return chestundi.",
        points: 10,
      },
      {
        type: "debug",
        question: "Ee function lo em wrong undhi?",
        code: `def multiply(x, y)\n    return x * y`,
        options: ["return wrong", "Missing colon after def line", "multiply wrong name", "Parameters wrong"],
        correct: 1,
        explanation: "def multiply(x, y): — colon : mandatory after function header!",
        points: 15,
      },
    ],
  },
];

const javaScriptTopics: Topic[] = [
  {
    id: "js-hello",
    title: "Hello World",
    subtitle: "First JS program",
    level: "beginner",
    icon: "👋",
    duration: "5 min",
    xpReward: 25,
    coinReward: 10,
    subtitles: ["console.log() — browser console lo output!", "JavaScript runs in browser & Node.js", "'Hello World' — coding tradition! 🌍", "// is comment in JavaScript"],
    voiceScript: "JavaScript lo meeru console.log tho output show chestam. Browser developer tools open chesi console lo output chudochu. JavaScript chala powerful — websites interactive ga chestundi!",
    keyPoints: ["🖥️  console.log() → outputs to console", "🌐  Runs in browser or Node.js", "//  Single-line comment", "/* */ Multi-line comment"],
    code: `// Your first JavaScript program! ⚡
console.log("Hello, World!");
console.log("Welcome to CodeQuest!");

// Variables in JS
let name = "Coder";
const year = 2025;

console.log(\`Hello, \${name}! Year: \${year}\`);

// Template literals — backtick use chestam
let lang = "JavaScript";
console.log(\`Learning \${lang} is fun! 🚀\`);`,
    codeExplanation: "console.log() tho output show chestam. Template literals lo ${} use chesi variables embed cheyochu.",
    output: "Hello, World!\nWelcome to CodeQuest!\nHello, Coder! Year: 2025\nLearning JavaScript is fun! 🚀",
    quiz: [
      { type: "mcq", question: "JavaScript lo output show cheyyadaniki?", options: ["print()", "console.log()", "output()", "log()"], correct: 1, explanation: "console.log() is the standard way to output in JavaScript!", points: 10 },
      { type: "output", question: "Em output vastaadi?", code: `console.log(5 + 3);`, options: ["53", "8", "5+3", "Error"], correct: 1, explanation: "5 + 3 = 8 — numbers add avutayi!", points: 15 },
      { type: "fill", question: "JS lo single-line comment?", options: ["#", "//", "/*", "--"], correct: 1, explanation: "// is single-line comment in JavaScript!", points: 10 },
      { type: "truefalse", question: "JavaScript only in browser run avutundi.", options: ["True", "False — Node.js lo kuda run avutundi", "True — browser only", "Depends"], correct: 1, explanation: "JavaScript runs in browsers AND Node.js on servers!", points: 10 },
    ],
  },
  {
    id: "js-variables",
    title: "Variables: let, const, var",
    subtitle: "Store data in JavaScript",
    level: "beginner",
    icon: "📦",
    duration: "8 min",
    xpReward: 35,
    coinReward: 15,
    subtitles: ["let — changeable variable", "const — constant, can't change", "var — old way, avoid using", "typeof operator — type check cheyyadaniki"],
    voiceScript: "JavaScript lo teen ways lo variables declare cheyochu — let, const, and var. Let is for variables that can change. Const is for constants that should not change. Var is the old way and we should mostly avoid it. Modern JavaScript lo let and const use chestam.",
    keyPoints: ["📝  let → mutable, block-scoped", "🔒  const → immutable after assignment", "⚠️  var → function-scoped, avoid in modern JS", "🔍  typeof → checks data type"],
    code: `// Variables in JavaScript 📦
let score = 95;        // Can change
const PI = 3.14159;    // Cannot change
var old = "avoid me";  // Old style

score = 100;           // ✅ Works
// PI = 3;            // ❌ Error!

// Data types
let name = "Alice";
let num = 42;
let decimal = 3.14;
let isActive = true;
let empty = null;
let notDefined = undefined;

console.log(typeof name);      // string
console.log(typeof num);       // number
console.log(typeof isActive);  // boolean`,
    codeExplanation: "let and const use chesi modern variables declare cheyyi. const ki value oka sari assign chesaka change avvaadu.",
    output: "string\nnumber\nboolean",
    quiz: [
      { type: "mcq", question: "Oka constant declare cheyyadaniki?", options: ["let", "var", "const", "fixed"], correct: 2, explanation: "const creates a constant — value cannot be reassigned!", points: 10 },
      { type: "output", question: "typeof 42 em return chestundi?", code: `console.log(typeof 42);`, options: ['"int"', '"number"', '"integer"', '"float"'], correct: 1, explanation: "JavaScript lo anni numbers 'number' type — int/float distinction ledhu!", points: 15 },
      { type: "truefalse", question: "const variable ki value reassign cheyochu.", options: ["True", "False — TypeError vastaadi", "True if different type", "Depends on value"], correct: 1, explanation: "const variables cannot be reassigned after declaration!", points: 10 },
      { type: "fill", question: "Modern JS lo preferred variable declaration: _____", options: ["var", "variable", "let/const", "dim"], correct: 2, explanation: "Modern JS lo let and const prefer chestam — var avoid chestam.", points: 10 },
    ],
  },
  {
    id: "js-functions",
    title: "Functions & Arrow Functions",
    subtitle: "Reusable code blocks",
    level: "beginner",
    icon: "⚙️",
    duration: "12 min",
    xpReward: 45,
    coinReward: 20,
    subtitles: ["function keyword — traditional way", "Arrow functions (=>) — modern shorthand", "Parameters & return values", "Higher order functions — functions inside functions!"],
    voiceScript: "JavaScript lo functions rendu ways lo raayochu — traditional function keyword tho, and modern arrow functions tho. Arrow functions => symbol use chestundi. Both same ga work chestai, kaani arrow functions shorter syntax undhi.",
    keyPoints: ["⚙️  function name() {} → traditional", "➡️  const fn = () => {} → arrow function", "📥  Parameters pass cheyyi", "📤  return value back pampinchu"],
    code: `// Functions in JavaScript ⚙️

// Traditional function
function greet(name) {
    return \`Hello, \${name}! 👋\`;
}

// Arrow function (modern way)
const square = (n) => n * n;

// Arrow with multiple lines
const divide = (a, b) => {
    if (b === 0) return "Cannot divide by zero!";
    return a / b;
};

// Call functions
console.log(greet("Alice"));
console.log("5² =", square(5));
console.log("10 ÷ 2 =", divide(10, 2));
console.log(divide(5, 0));`,
    codeExplanation: "Traditional functions and arrow functions rendu chestai. Arrow functions concise ga untayi.",
    output: "Hello, Alice! 👋\n5² = 25\n10 ÷ 2 = 5\nCannot divide by zero!",
    quiz: [
      { type: "mcq", question: "Arrow function correct syntax which?", options: ["function => {}", "const f = () => {}", "arrow f() {}", "fn => f() {}"], correct: 1, explanation: "const functionName = (params) => { body } is arrow function syntax!", points: 10 },
      { type: "output", question: "Em output vastaadi?", code: `const double = x => x * 2;\nconsole.log(double(7));`, options: ["7", "2", "14", "Error"], correct: 2, explanation: "double(7) = 7 × 2 = 14!", points: 15 },
      { type: "fill", question: "Arrow function symbol: const fn ___ x => x + 1", options: ["->", "=>", "==", "="], correct: 1, explanation: "Arrow functions use => (fat arrow) symbol!", points: 10 },
      { type: "truefalse", question: "Arrow functions always return value automatically without return keyword.", options: ["True only for one-liners", "False always needs return", "True always", "Depends on parameters"], correct: 0, explanation: "Single-expression arrow functions have implicit return! Multi-line needs explicit return.", points: 15 },
    ],
  },
  {
    id: "js-arrays",
    title: "Arrays",
    subtitle: "Collections of data",
    level: "intermediate",
    icon: "📚",
    duration: "14 min",
    xpReward: 50,
    coinReward: 22,
    subtitles: ["Array — multiple values oka variable lo!", "[] square brackets lo declare cheyyi", "push, pop, map, filter — useful methods", "index 0 nundi start avutundi"],
    voiceScript: "Arrays lo multiple values oka variable lo store cheyochu. Square brackets use chestam. Array methods chala powerful — map, filter, reduce use chesi data manipulate cheyochu.",
    keyPoints: ["📚  Array = ordered list of values", "0️⃣  Index starts at 0!", "➕  push() → add to end", "➖  pop() → remove from end", "🗺️  map() → transform each item"],
    code: `// Arrays in JavaScript 📚
let fruits = ["Apple", "Mango", "Orange", "Banana"];

console.log(fruits[0]);        // First item
console.log(fruits.length);   // Number of items

// Add/Remove
fruits.push("Grapes");        // Add to end
fruits.pop();                  // Remove last

// Array methods
let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(n => n * 2);
let evens = numbers.filter(n => n % 2 === 0);
let sum = numbers.reduce((acc, n) => acc + n, 0);

console.log("Doubled:", doubled);
console.log("Evens:", evens);
console.log("Sum:", sum);`,
    codeExplanation: "map() every element transform chestundi. filter() condition meet ayyevi keep chestundi. reduce() single value ki reduce chestundi.",
    output: "Apple\n4\nDoubled: [2, 4, 6, 8, 10]\nEvens: [2, 4]\nSum: 15",
    quiz: [
      { type: "mcq", question: "Array lo last element ki index em untundi? (length = 5)", options: ["5", "4", "6", "last"], correct: 1, explanation: "5 elements aithe last index = 5-1 = 4! Arrays are zero-indexed.", points: 10 },
      { type: "output", question: "Em output vastaadi?", code: `let a = [10, 20, 30];\nconsole.log(a[1]);`, options: ["10", "20", "30", "undefined"], correct: 1, explanation: "Index 1 means second element — 20!", points: 15 },
      { type: "mcq", question: "Array ki end lo element add cheyyadaniki?", options: ["add()", "push()", "append()", "insert()"], correct: 1, explanation: "push() adds element to the end of an array!", points: 10 },
      { type: "fill", question: "numbers._____(n => n > 3) — elements > 3 keep chestundi", options: ["map", "keep", "filter", "select"], correct: 2, explanation: "filter() keeps elements that satisfy the condition!", points: 15 },
    ],
  },
  {
    id: "js-dom",
    title: "DOM Manipulation",
    subtitle: "Make web pages dynamic",
    level: "intermediate",
    icon: "🌐",
    duration: "18 min",
    xpReward: 65,
    coinReward: 30,
    subtitles: ["DOM — Document Object Model", "getElementById, querySelector — elements find cheyyadaniki", "innerHTML, textContent — content change cheyyadaniki", "Events — user actions ki respond cheyyadaniki!"],
    voiceScript: "DOM ante Document Object Model. Idi HTML page ni JavaScript tho control cheyyadaniki help chestundi. querySelector use chesi elements select chestam. innerHTML tho content change chestam. addEventListener tho events handle chestam.",
    keyPoints: ["🌐  DOM = JavaScript's window to HTML", "🔍  querySelector() → selects elements", "✏️  innerHTML → changes content", "🖱️  addEventListener() → handles events"],
    code: `// DOM Manipulation 🌐
// (Simulated — run in browser!)

// Select elements
const title = document.querySelector("h1");
const btn = document.getElementById("myBtn");

// Change content
title.textContent = "CodeQuest is Awesome! 🚀";
title.style.color = "#7c3aed";

// Create new element
const newPara = document.createElement("p");
newPara.textContent = "JavaScript powers the web!";
document.body.appendChild(newPara);

// Event listener
btn.addEventListener("click", () => {
    alert("Button clicked! Great job! 🎉");
    btn.style.background = "#10b981";
});

console.log("DOM manipulation complete! ✅");`,
    codeExplanation: "querySelector tho elements select chestam. textContent, innerHTML tho content change chestam. addEventListener tho user events handle chestam.",
    output: "DOM manipulation complete! ✅\n(HTML page lo changes visible avutayi)",
    quiz: [
      { type: "mcq", question: "HTML element id tho select cheyyadaniki?", options: ["querySelector('#id')", "getElementById('id')", "getElement('id')", "Both A and B"], correct: 3, explanation: "Both getElementById('id') and querySelector('#id') work!", points: 10 },
      { type: "fill", question: "btn._____(\"click\", fn) — click event add cheyyadaniki", options: ["onClick", "addEvent", "addEventListener", "on"], correct: 2, explanation: "addEventListener() attaches event handlers to elements!", points: 15 },
      { type: "truefalse", question: "innerHTML and textContent exact same ga work chestundi.", options: ["True", "False — innerHTML allows HTML tags, textContent does not", "True for strings", "Depends on browser"], correct: 1, explanation: "innerHTML parses HTML tags, textContent treats everything as plain text.", points: 15 },
      { type: "mcq", question: "New HTML element create cheyyadaniki?", options: ["new Element()", "createElement()", "makeElement()", "addElement()"], correct: 1, explanation: "document.createElement('tag') creates new HTML elements!", points: 10 },
    ],
  },
];

const javaTopics: Topic[] = [
  {
    id: "java-hello",
    title: "Hello World",
    subtitle: "First Java program",
    level: "beginner",
    icon: "👋",
    duration: "8 min",
    xpReward: 30,
    coinReward: 12,
    subtitles: ["Java — Write once, run anywhere! ☕", "System.out.println() — output cheyyadaniki", "Class and main method — mandatory structure", "Java is statically typed — types declare cheyali"],
    voiceScript: "Java lo Hello World program raayyadam konchem lengthy ga untundi kaani idi understand cheyyadam important. Every Java program oka class lo undaali. Main method — entry point of program. System.out.println tho output show chestam.",
    keyPoints: ["☕  Every Java program needs a class", "🚪  main() is the entry point", "📢  System.out.println() → prints output", "📝  Semicolons mandatory in Java!"],
    code: `// Hello World in Java ☕
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Welcome to Java!");

        // Variables in Java
        String name = "CodeQuest";
        int year = 2025;
        double pi = 3.14;
        boolean active = true;

        System.out.println("Name: " + name);
        System.out.println("Year: " + year);
        System.out.println("PI: " + pi);
    }
}`,
    codeExplanation: "Java lo every program oka class lo undaali. main method lo code run avutundi. + operator tho strings concatenate chestam.",
    output: "Hello, World!\nWelcome to Java!\nName: CodeQuest\nYear: 2025\nPI: 3.14",
    quiz: [
      { type: "mcq", question: "Java program entry point?", options: ["start()", "main()", "run()", "begin()"], correct: 1, explanation: "public static void main(String[] args) is Java's entry point!", points: 10 },
      { type: "fill", question: "Java lo output cheyyadaniki: System.out._____(\"Hello\")", options: ["print", "println", "log", "write"], correct: 1, explanation: "println() prints and adds a newline. print() just prints.", points: 10 },
      { type: "truefalse", question: "Java lo semicolons optional unnai.", options: ["True", "False — semicolons mandatory!", "True for blocks", "Depends"], correct: 1, explanation: "Every statement in Java must end with a semicolon ;", points: 15 },
      { type: "mcq", question: "Java lo text (string) type?", options: ["string", "String", "str", "text"], correct: 1, explanation: "String (capital S) is the text type in Java!", points: 10 },
    ],
  },
  {
    id: "java-oop",
    title: "OOP & Classes",
    subtitle: "Object-Oriented Programming",
    level: "intermediate",
    icon: "🏗️",
    duration: "20 min",
    xpReward: 70,
    coinReward: 35,
    subtitles: ["OOP — real-world objects model cheyyadam", "Class — blueprint, Object — instance", "Constructor — object create chesyappudu run avvadam", "Encapsulation — data hide cheyyadam"],
    voiceScript: "Java primarily object-oriented language. OOP lo real world objects ni code lo represent chestam. Class oka blueprint laantidi. Object aa blueprint nundi create chesina instance. Constructor use chesi object initialize chestam.",
    keyPoints: ["🏗️  Class = blueprint for objects", "📦  Object = instance of class", "🔨  Constructor = initializes object", "🔒  Encapsulation = data protection"],
    code: `// OOP in Java 🏗️
public class Student {
    // Fields (attributes)
    private String name;
    private int age;
    private double gpa;

    // Constructor
    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }

    // Methods
    public void introduce() {
        System.out.println("Hi! I'm " + name);
        System.out.println("Age: " + age + ", GPA: " + gpa);
    }

    // Main method
    public static void main(String[] args) {
        Student s1 = new Student("Rahul", 20, 9.2);
        Student s2 = new Student("Priya", 19, 9.5);
        s1.introduce();
        s2.introduce();
    }
}`,
    codeExplanation: "Student class oka blueprint. new Student() tho objects create chestam. this keyword current object refer chestundi.",
    output: "Hi! I'm Rahul\nAge: 20, GPA: 9.2\nHi! I'm Priya\nAge: 19, GPA: 9.5",
    quiz: [
      { type: "mcq", question: "Java lo new object create cheyyadaniki?", options: ["create ClassName()", "new ClassName()", "ClassName.new()", "make ClassName()"], correct: 1, explanation: "new ClassName() creates a new object in Java!", points: 10 },
      { type: "fill", question: "Constructor lo current object refer cheyyadaniki _____ use chestam.", options: ["self", "this", "me", "current"], correct: 1, explanation: "this refers to the current object instance in Java!", points: 10 },
      { type: "truefalse", question: "Private fields class baayta direct access avutayi.", options: ["True", "False — only through public methods", "True with new", "Depends on class"], correct: 1, explanation: "private fields can only be accessed within the same class!", points: 15 },
      { type: "mcq", question: "Object create chesyappudu automatically call ayye method?", options: ["init()", "start()", "Constructor", "main()"], correct: 2, explanation: "Constructor is automatically called when an object is created!", points: 15 },
    ],
  },
];

const cTopics: Topic[] = [
  {
    id: "c-hello",
    title: "Hello World",
    subtitle: "First C program",
    level: "beginner",
    icon: "👋",
    duration: "8 min",
    xpReward: 30,
    coinReward: 12,
    subtitles: ["C — mother of all languages! 🔷", "#include <stdio.h> — header file", "printf() — formatted output", "int main() — program entry point"],
    voiceScript: "C language anni languages ki mother laantidi. C nerchukunte, anni other languages easy ga nerchukovachu. printf function tho output show chestam. stdio.h header file include cheyali for input output functions.",
    keyPoints: ["🔷  C is fast and close to hardware", "📁  #include adds library functions", "📢  printf() → formatted output", "🔢  main() returns int (0 = success)"],
    code: `/* Hello World in C 🔷 */
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    printf("Welcome to C Programming!\\n");

    // Variables in C
    int age = 20;
    float gpa = 9.2;
    char grade = 'A';

    printf("Age: %d\\n", age);
    printf("GPA: %.1f\\n", gpa);
    printf("Grade: %c\\n", grade);

    return 0;  // Success
}`,
    codeExplanation: "printf lo format specifiers use chestam — %d for int, %f for float, %c for char. \\n new line create chestundi.",
    output: "Hello, World!\nWelcome to C Programming!\nAge: 20\nGPA: 9.2\nGrade: A",
    quiz: [
      { type: "mcq", question: "C lo integer format specifier?", options: ["%s", "%f", "%d", "%c"], correct: 2, explanation: "%d is used for integers in printf!", points: 10 },
      { type: "fill", question: "C lo stdio functions use cheyyadaniki _____ include cheyali.", options: ["<stdlib.h>", "<stdio.h>", "<string.h>", "<math.h>"], correct: 1, explanation: "#include <stdio.h> gives access to printf, scanf, etc.!", points: 15 },
      { type: "truefalse", question: "C main function return type void ga undochu.", options: ["True", "False — should be int returning 0", "True in C99", "Depends"], correct: 1, explanation: "Standard C: int main() should return 0 for successful execution.", points: 15 },
      { type: "mcq", question: "printf lo new line character?", options: ["\\t", "\\n", "\\r", "\\0"], correct: 1, explanation: "\\n is the newline character in C!", points: 10 },
    ],
  },
  {
    id: "c-pointers",
    title: "Pointers",
    subtitle: "The power of C",
    level: "intermediate",
    icon: "👉",
    duration: "20 min",
    xpReward: 75,
    coinReward: 35,
    subtitles: ["Pointer — memory address store cheyyadam! 👉", "& operator — variable address get cheyyadaniki", "* operator — pointer declare & dereference", "Pointers = C's superpower! 💪"],
    voiceScript: "Pointers C language ki superpower. Pointer ante memory address store cheyye variable. Ampersand use chesi address get chestam. Star use chesi pointer declare chestam and dereference chestam. Idi initially confusing ga untundi kaani practice tho clear avutundi.",
    keyPoints: ["👉  Pointer stores memory address", "📍  & → address of variable", "⭐  * → declare pointer / dereference", "🔗  Pointers enable dynamic memory"],
    code: `/* Pointers in C 👉 */
#include <stdio.h>

int main() {
    int num = 42;
    int *ptr = &num;  // ptr stores address of num

    printf("Value of num: %d\\n", num);
    printf("Address of num: %p\\n", &num);
    printf("ptr stores: %p\\n", ptr);
    printf("Value via ptr: %d\\n", *ptr);

    // Modify via pointer
    *ptr = 100;
    printf("\\nAfter *ptr = 100:\\n");
    printf("num is now: %d\\n", num);

    return 0;
}`,
    codeExplanation: "int *ptr declares pointer. &num gives address. *ptr dereferences to get/set value. Pointer change cheste original variable change avutundi!",
    output: "Value of num: 42\nAddress of num: 0x7ffd5678 (varies)\nptr stores: 0x7ffd5678\nValue via ptr: 42\n\nAfter *ptr = 100:\nnum is now: 100",
    quiz: [
      { type: "mcq", question: "Variable address get cheyyadaniki which operator?", options: ["*", "&", "->", "@"], correct: 1, explanation: "& (address-of operator) gives the memory address of a variable!", points: 10 },
      { type: "fill", question: "int ___ptr = &x; — integer pointer declare cheyyadaniki", options: ["&", "->", "*", "#"], correct: 2, explanation: "* after type declares a pointer: int *ptr;", points: 15 },
      { type: "output", question: "x = 5, ptr = &x, *ptr = 10 chesthe x = ?", code: `int x = 5;\nint *ptr = &x;\n*ptr = 10;\nprintf("%d", x);`, options: ["5", "10", "Address", "Error"], correct: 1, explanation: "*ptr = 10 modifies x through the pointer! x becomes 10.", points: 15 },
      { type: "truefalse", question: "Pointer oka variable address store chestundi, not the value directly.", options: ["True — address store chestundi", "False — value store chestundi", "Both", "Neither"], correct: 0, explanation: "Pointers store memory addresses! Use * to access the actual value.", points: 10 },
    ],
  },
];

const cppTopics: Topic[] = [
  {
    id: "cpp-hello",
    title: "Hello World",
    subtitle: "First C++ program",
    level: "beginner",
    icon: "👋",
    duration: "7 min",
    xpReward: 28,
    coinReward: 11,
    subtitles: ["C++ — C with Classes! 🔶", "cout << — stream output", "#include <iostream> — I/O library", "using namespace std; — std:: abbreviate"],
    voiceScript: "C++ C language extension laantidi — objects and classes add chesindi. cout tho output show chestam. Iostream header include cheyali. Using namespace std chesthe std prefix type cheyakunda direct use cheyochu.",
    keyPoints: ["🔶  C++ = C + Object Oriented features", "📢  cout << → stream output", "📥  cin >> → stream input", "🏷️  using namespace std → saves typing"],
    code: `// Hello World in C++ 🔶
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    cout << "Welcome to C++!" << endl;

    // Variables
    string name = "CodeQuest";
    int version = 17;  // C++17
    double pi = 3.14159;

    cout << "Name: " << name << endl;
    cout << "C++ Version: " << version << endl;
    cout << "PI ≈ " << pi << endl;

    return 0;
}`,
    codeExplanation: "cout << stream output ki use avutundi. << operator tho multiple values chain cheyochu. endl new line add chestundi.",
    output: "Hello, World!\nWelcome to C++!\nName: CodeQuest\nC++ Version: 17\nPI ≈ 3.14159",
    quiz: [
      { type: "mcq", question: "C++ lo output cheyyadaniki?", options: ["printf()", "cout <<", "print()", "System.out"], correct: 1, explanation: "cout << is used for output in C++!", points: 10 },
      { type: "fill", question: "C++ I/O header: #include <___>", options: ["stdio.h", "iostream", "input.h", "output.h"], correct: 1, explanation: "#include <iostream> enables cin and cout!", points: 10 },
      { type: "output", question: "Em output vastaadi?", code: `cout << 5 + 3 << endl;`, options: ["53", "8", "5+3", "Error"], correct: 1, explanation: "5 + 3 = 8 is computed first, then output!", points: 15 },
      { type: "truefalse", question: "C++ programs main() nundi start avutayi.", options: ["True", "False", "Sometimes", "Depends on compiler"], correct: 0, explanation: "Like C, C++ programs always start execution from main()!", points: 10 },
    ],
  },
  {
    id: "cpp-classes",
    title: "Classes & OOP",
    subtitle: "C++ Object Oriented Power",
    level: "intermediate",
    icon: "🏗️",
    duration: "22 min",
    xpReward: 80,
    coinReward: 38,
    subtitles: ["C++ OOP chala powerful!", "class keyword tho define cheyyi", "public, private, protected — access specifiers", "Constructor & Destructor — lifecycle management"],
    voiceScript: "C++ OOP features chala powerful — C tho compare chesthe. Classes tho real world objects represent chestam. Access specifiers tho data hide cheyochu. Destructor object destroy ayye time auto-call avutundi.",
    keyPoints: ["🏗️  class = user-defined type", "🔒  private → class only access", "🔓  public → anywhere accessible", "🗑️  Destructor → cleanup on destroy"],
    code: `// Classes in C++ 🏗️
#include <iostream>
using namespace std;

class Car {
private:
    string brand;
    int speed;

public:
    // Constructor
    Car(string b, int s) : brand(b), speed(s) {}

    // Methods
    void accelerate(int amount) {
        speed += amount;
        cout << brand << " speed: " << speed << " km/h" << endl;
    }

    void display() {
        cout << "🚗 " << brand << " @ " << speed << " km/h" << endl;
    }

    // Destructor
    ~Car() { cout << brand << " destroyed!" << endl; }
};

int main() {
    Car car1("Tesla", 0);
    Car car2("BMW", 60);

    car1.accelerate(100);
    car2.display();
    return 0;
}`,
    codeExplanation: "Constructor initialization list tho members set chestam. Private members class baayta access avvaavu. Destructor auto-called at end.",
    output: "Tesla speed: 100 km/h\n🚗 BMW @ 60 km/h\nBMW destroyed!\nTesla destroyed!",
    quiz: [
      { type: "mcq", question: "C++ lo class member default access?", options: ["public", "private", "protected", "internal"], correct: 1, explanation: "class members are private by default in C++!", points: 10 },
      { type: "fill", question: "C++ lo Destructor name: ___ClassName()", options: ["!", "@", "~", "#"], correct: 2, explanation: "~ClassName() is the destructor in C++!", points: 15 },
      { type: "truefalse", question: "C++ struct members default ga public unnai.", options: ["True — struct is public by default", "False — private by default", "Same as class", "Depends"], correct: 0, explanation: "struct members are public by default, unlike class!", points: 15 },
      { type: "mcq", question: "Object scope end aysthe em auto-call avutundi?", options: ["Constructor", "Destructor", "main()", "delete()"], correct: 1, explanation: "Destructor is automatically called when object goes out of scope!", points: 10 },
    ],
  },
];

const LANGUAGES: Language[] = [
  {
    id: "python",
    name: "Python",
    emoji: "🐍",
    description: "Simple syntax, powerful libraries. Perfect for beginners and AI/ML!",
    gradient: "from-yellow-400 via-green-400 to-emerald-500",
    textColor: "text-emerald-900",
    topics: pythonTopics,
    enrolled: "2.4M",
    difficulty: 1,
  },
  {
    id: "javascript",
    name: "JavaScript",
    emoji: "⚡",
    description: "Language of the web. Build interactive websites and apps!",
    gradient: "from-yellow-300 via-amber-400 to-orange-500",
    textColor: "text-orange-900",
    topics: javaScriptTopics,
    enrolled: "3.1M",
    difficulty: 2,
  },
  {
    id: "java",
    name: "Java",
    emoji: "☕",
    description: "Write once, run anywhere. Enterprise-grade, Android development!",
    gradient: "from-orange-400 via-red-400 to-rose-500",
    textColor: "text-red-900",
    topics: javaTopics,
    enrolled: "1.8M",
    difficulty: 3,
  },
  {
    id: "c",
    name: "C",
    emoji: "🔷",
    description: "Mother of all languages. Learn fundamentals from the ground up!",
    gradient: "from-blue-400 via-cyan-400 to-sky-500",
    textColor: "text-blue-900",
    topics: cTopics,
    enrolled: "1.2M",
    difficulty: 3,
  },
  {
    id: "cpp",
    name: "C++",
    emoji: "🔶",
    description: "C with superpowers. Game dev, systems programming, competitive coding!",
    gradient: "from-purple-400 via-violet-400 to-indigo-500",
    textColor: "text-violet-900",
    topics: cppTopics,
    enrolled: "980K",
    difficulty: 4,
  },
];

const GLOBAL_LEADERBOARD = [
  { rank: 1, name: "Alex Chen", xp: 8420, streak: 45, emoji: "🐉", country: "🇺🇸" },
  { rank: 2, name: "Sofia Reyes", xp: 7850, streak: 32, emoji: "🦁", country: "🇪🇸" },
  { rank: 3, name: "Ravi Kumar", xp: 7200, streak: 28, emoji: "🦊", country: "🇮🇳" },
  { rank: 4, name: "Yuki Tanaka", xp: 6850, streak: 21, emoji: "🐺", country: "🇯🇵" },
  { rank: 5, name: "Priya Sharma", xp: 6200, streak: 18, emoji: "🦅", country: "🇮🇳" },
  { rank: 6, name: "Lucas Silva", xp: 5900, streak: 15, emoji: "🐻", country: "🇧🇷" },
  { rank: 7, name: "Aisha Hassan", xp: 5400, streak: 12, emoji: "🐯", country: "🇪🇬" },
  { rank: 8, name: "Arjun Nair", xp: 4850, streak: 9, emoji: "🦉", country: "🇮🇳" },
];

// ─── Utility ──────────────────────────────────────────────────────────────────

const speakTeluglish = (text: string) => {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const telugu = voices.find((v) => v.lang.startsWith("te"));
  if (telugu) utt.voice = telugu;
  else utt.lang = "te-IN";
  utt.rate = 0.88;
  utt.pitch = 1.08;
  window.speechSynthesis.speak(utt);
};

const stopSpeech = () => {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
};

// ─── CodeBot ─────────────────────────────────────────────────────────────────
function CodeBot({ size = 80, mood = "happy" }: { size?: number; mood?: "happy" | "think" | "cheer" }) {
  const mouthPath = mood === "cheer"
    ? "M33 37 Q50 47 67 37"
    : mood === "think"
    ? "M38 39 Q50 39 62 39"
    : "M36 37 Q50 44 64 37";
  return (
    <svg width={size} height={size} viewBox="0 0 100 110" fill="none">
      <defs>
        <radialGradient id="cb-eye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="23" y="54" width="54" height="42" rx="9" fill="#4c1d95" />
      <rect x="23" y="54" width="54" height="42" rx="9" stroke="#7c3aed" strokeWidth="1.5" />
      <rect x="30" y="62" width="40" height="18" rx="4" fill="#0a0a1a" opacity="0.85" />
      <circle cx="38" cy="71" r="3.5" fill="#10b981" />
      <circle cx="50" cy="71" r="3.5" fill="#f59e0b" />
      <circle cx="62" cy="71" r="3.5" fill="#ec4899" />
      <rect x="43" y="48" width="14" height="8" rx="3" fill="#5b21b6" />
      <rect x="18" y="10" width="64" height="40" rx="11" fill="#5b21b6" />
      <rect x="18" y="10" width="64" height="40" rx="11" stroke="#7c3aed" strokeWidth="1.5" />
      <rect x="24" y="16" width="52" height="26" rx="7" fill="#0a0a1a" />
      <circle cx="40" cy="29" r="9" fill="url(#cb-eye)" />
      <circle cx="40" cy="29" r="6" fill="#10b981" />
      <circle cx="60" cy="29" r="9" fill="url(#cb-eye)" />
      <circle cx="60" cy="29" r="6" fill="#10b981" />
      <circle cx="41.5" cy="27.5" r="2.8" fill="#0a0a1a" />
      <circle cx="61.5" cy="27.5" r="2.8" fill="#0a0a1a" />
      <circle cx="43" cy="26" r="1.4" fill="white" opacity="0.9" />
      <circle cx="63" cy="26" r="1.4" fill="white" opacity="0.9" />
      <path d={mouthPath} stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" />
      <line x1="50" y1="10" x2="50" y2="3" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="50" cy="2" r="3.5" fill="#f59e0b" />
      <circle cx="50" cy="2" r="6" fill="#f59e0b" opacity="0.25" />
      <rect x="5" y="58" width="19" height="9" rx="4.5" fill="#5b21b6" stroke="#7c3aed" strokeWidth="1" />
      <rect x="76" y="58" width="19" height="9" rx="4.5" fill="#5b21b6" stroke="#7c3aed" strokeWidth="1" />
      <rect x="30" y="93" width="17" height="11" rx="5" fill="#4c1d95" stroke="#7c3aed" strokeWidth="1" />
      <rect x="53" y="93" width="17" height="11" rx="5" fill="#4c1d95" stroke="#7c3aed" strokeWidth="1" />
    </svg>
  );
}

// ─── Auth Screen ──────────────────────────────────────────────────────────────
function AuthScreen({ onAuth }: { onAuth: (user: UserData, token: string) => void }) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("demo@codequest.ai");
  const [password, setPassword] = useState("password123");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const symbols = ["{ }", "=>", "def", "for", "if", "[]", "++", "!=", "&&", "//", "fn", "class", "int", "var"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup" && !name.trim()) { setError("Name is required!"); return; }
    if (!email.trim()) { setError("Email is required!"); return; }
    if (password.length < 6) { setError("Password must be 6+ characters!"); return; }
    setError("");
    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/signup";
      const payload = mode === "login" ? { email, password } : { name, email, password };
      const data = await apiRequest(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      onAuth(
        {
          ...data.user,
          rank: 0,
          level: data.user.level || Math.max(1, Math.floor((data.user.xp || 0) / 300) + 1),
        },
        data.token
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-900 flex-col items-center justify-center p-12 overflow-hidden">
        {/* Floating symbols */}
        {symbols.map((s, i) => (
          <motion.span
            key={i}
            className="absolute font-mono text-white/10 text-sm select-none"
            style={{ left: `${(i * 67 + 5) % 90}%`, top: `${(i * 43 + 10) % 85}%` }}
            animate={{ y: [0, -15, 0], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
          >
            {s}
          </motion.span>
        ))}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8"
        >
          <CodeBot size={160} mood="cheer" />
        </motion.div>
        <div className="text-center z-10">
          <h1 className="text-4xl font-black text-white mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            CodeQuest
          </h1>
          <p className="text-violet-300 text-lg font-semibold mb-6">
            Learn Programming Like a Game! 🎮
          </p>
          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
            {[
              { icon: "🔥", text: "Daily streaks" },
              { icon: "🏆", text: "Leaderboards" },
              { icon: "⚡", text: "XP rewards" },
              { icon: "🤖", text: "AI tutor voice" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                <span className="text-lg">{f.icon}</span>
                <span className="text-white/80 text-xs font-bold">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-background p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo on mobile */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center">
              <Code2 size={20} className="text-white" />
            </div>
            <span className="text-2xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>CodeQuest</span>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl shadow-black/40">
            {/* Mode toggle */}
            <div className="flex bg-secondary rounded-xl p-1 mb-6">
              {(["login", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(""); }}
                  className={`flex-1 py-2 rounded-lg text-sm font-black capitalize transition-all ${
                    mode === m ? "bg-violet-600 text-white shadow-md" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m === "login" ? "Log In" : "Sign Up"}
                </button>
              ))}
            </div>

            <h2 className="text-2xl font-black mb-1">
              {mode === "login" ? "Welcome back! 👋" : "Join CodeQuest! 🚀"}
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              {mode === "login" ? "Continue your learning journey" : "Start your coding adventure today"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-xl text-sm font-semibold outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              )}
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-xl text-sm font-semibold outline-none focus:border-violet-500 transition-colors"
                />
              </div>
              <div className="relative">
                <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-secondary border border-border rounded-xl text-sm font-semibold outline-none focus:border-violet-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {error && (
                <p className="text-red-400 text-xs font-semibold flex items-center gap-1.5">
                  <X size={12} /> {error}
                </p>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                className="w-full py-3.5 bg-violet-600 text-white rounded-xl font-black text-sm hover:bg-violet-500 transition-all shadow-lg shadow-violet-600/30 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Launching CodeQuest...
                  </>
                ) : (
                  <>{mode === "login" ? "Log In" : "Create Account"} <ChevronRight size={16} /></>
                )}
              </motion.button>
            </form>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-muted-foreground text-xs font-semibold">or continue with</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[{ icon: "🇬", label: "Google" }, { icon: "⬛", label: "GitHub" }].map((p) => (
                <button
                  key={p.label}
                  onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                  className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-xl text-sm font-bold hover:bg-secondary transition-colors"
                >
                  <span>{p.icon}</span>{p.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-muted-foreground text-xs mt-4 font-semibold">
            Demo: use any email & password (6+ chars)
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Dashboard Screen ─────────────────────────────────────────────────────────
function DashboardScreen({
  user,
  onNavigate,
  onLogout,
}: {
  user: UserData;
  onNavigate: (s: Screen) => void;
  onLogout: () => void;
}) {
  const [time, setTime] = useState({ h: 8, m: 42, s: 17 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime((p) => {
        let { h, m, s } = p;
        s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) return { h: 23, m: 59, s: 59 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen bg-background">
      {/* Top navbar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-3 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
            <Code2 size={16} className="text-white" />
          </div>
          <span className="font-black text-sm" style={{ fontFamily: "'Orbitron', sans-serif" }}>CodeQuest</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-400 text-xs font-black">
            <span>🪙</span>{user.coins}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-500/15 text-violet-300 text-xs font-black">
            <Zap size={11} />{user.xp.toLocaleString()} XP
          </div>
          <button className="relative w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground">
            <Bell size={14} />
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-500" />
          </button>
          <button onClick={onLogout} className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground">
            <LogOut size={14} />
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5 py-6 space-y-6">
        {/* Hero welcome */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-700 via-purple-800 to-fuchsia-900 p-6">
          <div className="absolute inset-0 overflow-hidden">
            {["</>", "def", "for", "if", "{ }"].map((s, i) => (
              <span key={i} className="absolute font-mono text-white/8 text-lg select-none"
                style={{ left: `${(i * 19 + 5) % 90}%`, top: `${(i * 23 + 5) % 85}%` }}>{s}</span>
            ))}
          </div>
          <div className="relative flex items-center gap-5">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
              <CodeBot size={100} mood="cheer" />
            </motion.div>
            <div>
              <p className="text-white/70 text-sm font-semibold">Welcome back,</p>
              <h2 className="text-white text-2xl font-black">{user.name}! 👋</h2>
              <p className="text-white/80 text-sm mt-1 max-w-xs">
                <span className="text-amber-300 font-black">{user.streak}-day streak</span> going strong! Don&apos;t break it today.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate("lang-select")}
                className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-violet-700 rounded-xl font-black text-sm shadow-lg hover:bg-violet-50 transition-colors"
              >
                <Play size={13} fill="currentColor" />Continue Learning
              </motion.button>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Streak", val: `${user.streak}🔥`, g: "from-orange-500/20 to-red-500/10", b: "border-orange-500/25", t: "text-orange-400" },
            { label: "XP", val: user.xp.toLocaleString(), g: "from-violet-500/20 to-purple-500/10", b: "border-violet-500/25", t: "text-violet-400" },
            { label: "Rank", val: `#${user.rank}🏆`, g: "from-amber-500/20 to-yellow-500/10", b: "border-amber-500/25", t: "text-amber-400" },
            { label: "Level", val: `${user.level}⭐`, g: "from-emerald-500/20 to-green-500/10", b: "border-emerald-500/25", t: "text-emerald-400" },
          ].map((s) => (
            <div key={s.label} className={`rounded-xl p-4 bg-gradient-to-br ${s.g} border ${s.b}`}>
              <p className="text-muted-foreground text-xs mb-0.5">{s.label}</p>
              <p className={`text-xl font-black ${s.t}`}>{s.val}</p>
            </div>
          ))}
        </div>

        {/* Daily challenge */}
        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Target size={17} className="text-amber-400" />
              </div>
              <div>
                <h3 className="font-black text-sm">Daily Challenge 🎯</h3>
                <p className="text-muted-foreground text-xs">Resets in {pad(time.h)}:{pad(time.m)}:{pad(time.s)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-black">
              <Zap size={10} />+100 XP
            </div>
          </div>
          <p className="text-sm text-foreground/90 mb-3">
            Write a function to check if a string is a <span className="text-amber-300 font-black">palindrome</span>. Return True/False.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate("lang-select")}
            className="w-full py-2.5 rounded-xl bg-amber-500 text-black font-black text-sm hover:bg-amber-400"
          >
            Accept Challenge →
          </motion.button>
        </div>

        {/* Mini leaderboard */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-sm text-muted-foreground uppercase tracking-widest">Top Coders</h3>
            <button onClick={() => onNavigate("leaderboard")} className="text-xs text-violet-400 font-black hover:text-violet-300">
              See All →
            </button>
          </div>
          <div className="space-y-2">
            {GLOBAL_LEADERBOARD.slice(0, 3).map((u) => (
              <div key={u.rank} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                <div className="font-black text-sm w-6 text-center">
                  {["🥇", "🥈", "🥉"][u.rank - 1]}
                </div>
                <div className="text-xl">{u.emoji}</div>
                <div className="flex-1">
                  <p className="font-black text-sm">{u.name} {u.country}</p>
                  <p className="text-muted-foreground text-xs">{u.xp.toLocaleString()} XP</p>
                </div>
                <div className="text-orange-400 text-xs font-black flex items-center gap-0.5">
                  <Flame size={10} />{u.streak}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-violet-600/20 border border-violet-500/40">
              <div className="font-black text-sm w-6 text-center text-violet-400">#{user.rank}</div>
              <div className="text-xl">{user.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="font-black text-sm text-violet-300">You</p>
                  <span className="text-xs px-1.5 py-0.5 bg-violet-500/20 text-violet-400 rounded font-black">YOU</span>
                </div>
                <p className="text-muted-foreground text-xs">{user.xp.toLocaleString()} XP</p>
              </div>
              <Flame size={12} className="text-orange-400" />
            </div>
          </div>
        </div>

        {/* Quick nav */}
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate("lang-select")}
            className="flex flex-col items-start p-5 rounded-2xl bg-gradient-to-br from-violet-600/30 to-purple-600/10 border border-violet-500/30 hover:border-violet-500/60 transition-all"
          >
            <Rocket size={22} className="text-violet-400 mb-2" />
            <p className="font-black text-sm">Start Learning</p>
            <p className="text-muted-foreground text-xs mt-0.5">Pick a language</p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate("leaderboard")}
            className="flex flex-col items-start p-5 rounded-2xl bg-gradient-to-br from-amber-600/30 to-orange-600/10 border border-amber-500/30 hover:border-amber-500/60 transition-all"
          >
            <Trophy size={22} className="text-amber-400 mb-2" />
            <p className="font-black text-sm">Leaderboard</p>
            <p className="text-muted-foreground text-xs mt-0.5">You are #{user.rank}</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ─── Language Select ──────────────────────────────────────────────────────────
function LangSelectScreen({ languages, onSelect, onBack }: { languages: Language[]; onSelect: (lang: Language) => void; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-5 py-8">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={onBack} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-2xl font-black">Choose Language 🎯</h1>
            <p className="text-muted-foreground text-sm">Select a programming language to master</p>
          </div>
        </div>

        <div className="space-y-4">
          {languages.map((lang, i) => (
            <motion.button
              key={lang.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(lang)}
              className="w-full flex items-center gap-5 p-5 rounded-2xl bg-card border border-border hover:border-violet-500/40 transition-all text-left group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${lang.gradient} flex items-center justify-center text-4xl flex-shrink-0 shadow-lg`}>
                {lang.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-black text-lg">{lang.name}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 4 }, (_, j) => (
                      <Star key={j} size={11} className={j < lang.difficulty ? "text-amber-400 fill-amber-400" : "text-muted-foreground"} />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{lang.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-muted-foreground font-semibold">👥 {lang.enrolled} learners</span>
                  <span className="text-xs text-emerald-400 font-bold">📚 {lang.topics.length} topics</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted-foreground group-hover:text-violet-400 transition-colors flex-shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Topic List ───────────────────────────────────────────────────────────────
function TopicListScreen({
  language,
  user,
  onSelect,
  onBack,
}: {
  language: Language;
  user: UserData;
  onSelect: (topic: Topic) => void;
  onBack: () => void;
}) {
  const levels = ["beginner", "intermediate", "advanced"] as const;
  const levelLabels = { beginner: "🟢 Beginner", intermediate: "🟡 Intermediate", advanced: "🔴 Advanced" };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-5 py-6">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={onBack} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center hover:bg-secondary/80">
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-xl font-black">{language.emoji} {language.name} Roadmap</h1>
            <p className="text-muted-foreground text-xs">{language.topics.length} topics · Beginner to Advanced</p>
          </div>
        </div>

        {/* Course banner */}
        <div className={`rounded-2xl bg-gradient-to-br ${language.gradient} p-5 mb-6`}>
          <div className="flex justify-between items-start">
            <div className={language.textColor}>
              <p className="text-sm font-bold opacity-70">Your Progress</p>
              <p className="text-3xl font-black">
                {Math.round((user.completedTopics.filter(t => language.topics.some(lt => lt.id === t)).length / language.topics.length) * 100)}%
              </p>
              <p className="text-sm font-semibold opacity-80">
                {user.completedTopics.filter(t => language.topics.some(lt => lt.id === t)).length}/{language.topics.length} complete
              </p>
            </div>
            <div className="text-6xl opacity-25 font-black select-none">{language.emoji}</div>
          </div>
          <div className="mt-3 h-2.5 bg-black/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/75 rounded-full transition-all"
              style={{ width: `${(user.completedTopics.filter(t => language.topics.some(lt => lt.id === t)).length / language.topics.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Topics by level */}
        {levels.map((level) => {
          const levelTopics = language.topics.filter((t) => t.level === level);
          if (!levelTopics.length) return null;
          return (
            <div key={level} className="mb-6">
              <h2 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3">
                {levelLabels[level]}
              </h2>
              <div className="space-y-2.5">
                {levelTopics.map((topic, i) => {
                  const completed = user.completedTopics.includes(topic.id);
                  const isActive = !completed && (i === 0 || user.completedTopics.includes(levelTopics[i - 1]?.id));
                  const locked = !completed && !isActive;
                  return (
                    <motion.button
                      key={topic.id}
                      whileHover={!locked ? { x: 4 } : {}}
                      whileTap={!locked ? { scale: 0.98 } : {}}
                      onClick={() => !locked && onSelect(topic)}
                      disabled={locked}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                        completed ? "bg-emerald-500/10 border-emerald-500/25" :
                        isActive  ? "bg-violet-600/15 border-violet-500/40" :
                                    "bg-card/40 border-border opacity-50 cursor-default"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${
                        completed ? "bg-emerald-500/20" : isActive ? "bg-violet-500/20" : "bg-secondary"
                      }`}>
                        {completed ? "✅" : locked ? "🔒" : topic.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm">{topic.title}</span>
                          {isActive && (
                            <motion.span
                              animate={{ opacity: [1, 0.4, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="text-xs px-1.5 py-0.5 bg-violet-500/20 text-violet-400 rounded font-black"
                            >
                              NEXT
                            </motion.span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-xs mt-0.5">{topic.subtitle}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground">⏱️ {topic.duration}</span>
                          <span className="text-xs text-violet-400 font-semibold">+{topic.xpReward} XP</span>
                          <span className="text-xs text-amber-400 font-semibold">🪙 {topic.coinReward}</span>
                        </div>
                      </div>
                      {completed && (
                        <div className="flex gap-0.5 flex-shrink-0">
                          {[0, 1, 2].map((j) => <Star key={j} size={12} className="text-amber-400 fill-amber-400" />)}
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Lesson Screen (Cinematic) ────────────────────────────────────────────────
function LessonScreen({
  topic,
  language,
  onNext,
  onBack,
}: {
  topic: Topic;
  language: Language;
  onNext: () => void;
  onBack: () => void;
}) {
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showKeyPoint, setShowKeyPoint] = useState(-1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalDuration = topic.subtitles.length * 4; // 4s per subtitle

  const startLesson = useCallback(() => {
    setPlaying(true);
    setSubtitleIdx(0);
    setProgress(0);
    setShowKeyPoint(-1);
    speakTeluglish(topic.voiceScript);

    let elapsed = 0;
    intervalRef.current = setInterval(() => {
      elapsed += 0.1;
      setProgress((elapsed / totalDuration) * 100);
      const idx = Math.floor(elapsed / 4);
      setSubtitleIdx(Math.min(idx, topic.subtitles.length - 1));
      setShowKeyPoint(Math.min(Math.floor(elapsed / (totalDuration / topic.keyPoints.length)), topic.keyPoints.length - 1));

      if (elapsed >= totalDuration) {
        clearInterval(intervalRef.current!);
        setProgress(100);
        setPlaying(false);
      }
    }, 100);
  }, [topic, totalDuration]);

  const pause = () => {
    setPlaying(false);
    stopSpeech();
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    return () => {
      stopSpeech();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#04040e] flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-white/10">
        <motion.div className="h-full bg-violet-500" style={{ width: `${progress}%` }} />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <button onClick={() => { stopSpeech(); onBack(); }} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-semibold">
          <ArrowLeft size={16} />Back
        </button>
        <div className="text-center">
          <p className="text-white/50 text-xs font-semibold">{language.emoji} {language.name}</p>
          <p className="text-white text-sm font-black">{topic.title}</p>
        </div>
        <button onClick={() => { stopSpeech(); onNext(); }} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-semibold">
          Skip <SkipForward size={14} />
        </button>
      </div>

      {/* Cinematic content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-6">
        {/* Bot + animations */}
        <div className="relative mb-8">
          {/* Floating particles */}
          {["{ }", "def", "for", "if", "=>", "[]"].map((sym, i) => (
            <motion.span
              key={i}
              className="absolute font-mono text-violet-400/30 text-sm select-none pointer-events-none"
              style={{ left: `${(i * 70 - 150)}px`, top: `${(i * 35 - 80)}px` }}
              animate={{ y: [0, -20, 0], opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
            >
              {sym}
            </motion.span>
          ))}

          <motion.div
            animate={playing ? { y: [0, -10, 0], rotate: [-2, 2, -2] } : { y: [0, -4, 0] }}
            transition={{ duration: playing ? 1.5 : 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <CodeBot size={140} mood={playing ? "cheer" : "happy"} />
          </motion.div>

          {/* Speech bubble */}
          {playing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-4 -right-4 flex gap-1 bg-violet-600 rounded-xl px-2.5 py-1.5"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  className="w-1.5 h-1.5 bg-white rounded-full"
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* Subtitle / narration box */}
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={subtitleIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center mb-6"
            >
              <p className="text-white text-lg font-black leading-relaxed">
                {topic.subtitles[subtitleIdx]}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Key points */}
          <div className="space-y-2 mb-6">
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest text-center mb-3">Key Points</p>
            {topic.keyPoints.map((kp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: i <= showKeyPoint ? 1 : 0.15, x: i <= showKeyPoint ? 0 : -20 }}
                transition={{ duration: 0.4 }}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  i <= showKeyPoint
                    ? "bg-violet-500/15 border-violet-500/30 text-white"
                    : "bg-white/5 border-white/5 text-white/30"
                }`}
              >
                {i <= showKeyPoint && <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />}
                {i > showKeyPoint && <div className="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0" />}
                <span className="text-sm font-semibold">{kp}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-5 pb-8">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          {playing ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={pause}
              className="flex-1 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-black flex items-center justify-center gap-2"
            >
              <Pause size={18} />Pause
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startLesson}
              className="flex-1 py-4 rounded-2xl bg-violet-600 text-white font-black flex items-center justify-center gap-2 shadow-lg shadow-violet-500/30"
            >
              {progress > 0 ? <RefreshCw size={18} /> : <PlayIcon size={18} fill="currentColor" />}
              {progress > 0 ? "Replay Lesson" : "▶ Play Lesson (AI Voice)"}
            </motion.button>
          )}
          {(progress >= 100 || !playing) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { stopSpeech(); onNext(); }}
              className="flex-1 py-4 rounded-2xl bg-emerald-500 text-white font-black flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25"
            >
              View Code <ArrowRight size={18} />
            </motion.button>
          )}
        </div>
        <p className="text-center text-white/30 text-xs mt-3 font-semibold">
          🎙️ AI voice speaks in Telugu + English (Teluglish)
        </p>
      </div>
    </div>
  );
}

// ─── Code Section Screen ──────────────────────────────────────────────────────
function CodeSectionScreen({
  topic,
  language,
  onNext,
  onBack,
}: {
  topic: Topic;
  language: Language;
  onNext: () => void;
  onBack: () => void;
}) {
  const [output, setOutput] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const runCode = () => {
    setRunning(true);
    setOutput(null);
    setTimeout(() => {
      setRunning(false);
      setOutput(topic.output);
    }, 1200);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(topic.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = topic.code.split("\n");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-3xl mx-auto px-5 py-6 w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center hover:bg-secondary/80">
            <ArrowLeft size={16} />
          </button>
          <div>
            <p className="text-muted-foreground text-xs font-semibold">{language.emoji} {language.name} · {topic.title}</p>
            <h2 className="font-black text-xl">📝 Code Example</h2>
          </div>
          <div className="ml-auto flex items-center gap-1 px-3 py-1.5 bg-violet-500/15 text-violet-300 rounded-xl text-xs font-black">
            <Zap size={11} />+{topic.xpReward} XP
          </div>
        </div>

        {/* AI tip */}
        <div className="flex gap-3 p-4 mb-4 bg-violet-600/10 border border-violet-500/25 rounded-xl">
          <CodeBot size={40} mood="think" />
          <div>
            <p className="text-xs font-black text-violet-300 mb-0.5">CodeBot says:</p>
            <p className="text-sm text-foreground/90 leading-relaxed">{topic.codeExplanation}</p>
          </div>
        </div>

        {/* Code editor */}
        <div className="rounded-2xl bg-[#060610] border border-border overflow-hidden mb-4 flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d22] border-b border-border">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-muted-foreground text-xs font-mono ml-1">
                {language.id === "python" ? "solution.py" : language.id === "javascript" ? "solution.js" : language.id === "java" ? "Main.java" : language.id === "cpp" ? "main.cpp" : "main.c"}
              </span>
            </div>
            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-semibold"
            >
              {copied ? <><Check size={12} className="text-emerald-400" />Copied!</> : <><Copy size={12} />Copy</>}
            </button>
          </div>

          {/* Code with line numbers */}
          <div className="flex text-xs leading-6 overflow-auto" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <div className="select-none px-3 py-4 text-right text-muted-foreground/40 bg-[#0d0d22] min-w-[2.5rem] border-r border-border flex-shrink-0">
              {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <pre className="flex-1 p-4 text-emerald-300 overflow-auto">
              {lines.map((line, i) => {
                const isComment = line.trim().startsWith("#") || line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*");
                const isKeyword = /\b(def|if|else|elif|for|while|return|class|import|from|const|let|var|function|int|float|String|bool|public|private|static|void|include|using|namespace|cout|cin)\b/.test(line);
                return (
                  <div key={i} className={isComment ? "text-muted-foreground/60" : isKeyword ? "text-violet-300" : "text-emerald-300"}>
                    {line || " "}
                  </div>
                );
              })}
            </pre>
          </div>
        </div>

        {/* Run button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={runCode}
          disabled={running}
          className={`w-full py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 mb-4 transition-all ${
            running ? "bg-muted text-muted-foreground" : "bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/25"
          }`}
        >
          {running ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
              Running...
            </>
          ) : (
            <><Play size={14} fill="currentColor" />▶ Run Code</>
          )}
        </motion.button>

        {/* Output */}
        <AnimatePresence>
          {output && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-[#060610] border border-emerald-500/30 p-4 mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <p className="text-xs text-emerald-400 font-bold mb-2">OUTPUT:</p>
              <pre className="text-emerald-300 text-xs leading-5 whitespace-pre-wrap">{output}</pre>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="w-full py-3.5 rounded-xl bg-violet-600 text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-violet-500 shadow-lg shadow-violet-600/25"
        >
          Take the Quiz <ArrowRight size={16} />
        </motion.button>
      </div>
    </div>
  );
}

// ─── Quiz Screen ──────────────────────────────────────────────────────────────
function QuizScreen({
  topic,
  language,
  onComplete,
  onBack,
}: {
  topic: Topic;
  language: Language;
  onComplete: (score: number, xp: number, coins: number) => void;
  onBack: () => void;
}) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [streak, setStreak] = useState(0);

  const q = topic.quiz[step];
  const total = topic.quiz.length;

  useEffect(() => {
    if (done || confirmed) return;
    const t = setInterval(() => {
      setTimeLeft((p) => {
        if (p <= 1) { clearInterval(t); handleConfirm(true); return 0; }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [step, confirmed, done]);

  const handleConfirm = (timeout = false) => {
    const sel = timeout ? -1 : selected;
    if (sel === null) return;
    setConfirmed(true);
    const correct = sel === q.correct;
    if (correct) { setCorrectCount((c) => c + 1); setStreak((s) => s + 1); }
    else setStreak(0);
  };

  const handleNext = () => {
    if (step < total - 1) {
      setStep((s) => s + 1);
      setSelected(null);
      setConfirmed(false);
      setTimeLeft(30);
    } else {
      setDone(true);
      const xpEarned = correctCount * topic.xpReward / total * 1.2;
      const coinsEarned = correctCount * topic.coinReward / total;
      onComplete(
        Math.round((correctCount / total) * 100),
        Math.round(xpEarned),
        Math.round(coinsEarned)
      );
    }
  };

  const typeColor: Record<string, string> = {
    mcq: "bg-violet-500/20 text-violet-400",
    output: "bg-blue-500/20 text-blue-400",
    fill: "bg-emerald-500/20 text-emerald-400",
    debug: "bg-red-500/20 text-red-400",
    truefalse: "bg-amber-500/20 text-amber-400",
  };
  const typeLabel: Record<string, string> = {
    mcq: "Multiple Choice",
    output: "Output Prediction",
    fill: "Fill in the Blank",
    debug: "Debug Challenge",
    truefalse: "True or False",
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-lg mx-auto px-5 py-6 w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
            <X size={16} />
          </button>
          <div className="flex gap-1.5 flex-1 mx-4">
            {topic.quiz.map((_, i) => (
              <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${
                i < step ? "bg-emerald-500" : i === step ? "bg-violet-500" : "bg-secondary"
              }`} />
            ))}
          </div>
          <div className="flex items-center gap-1 text-red-400 text-sm font-black">
            <Heart size={14} fill="currentColor" />4
          </div>
        </div>

        {/* Timer + streak */}
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black ${
            timeLeft <= 10 ? "bg-red-500/20 text-red-400" : "bg-secondary text-muted-foreground"
          }`}>
            <Target size={11} />{timeLeft}s
          </div>
          {streak > 1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 text-orange-400 text-xs font-black bg-orange-500/15 px-2.5 py-1 rounded-xl"
            >
              <Flame size={11} />{streak}x Streak! 🔥
            </motion.div>
          )}
          <div className="text-muted-foreground text-xs font-semibold">
            {step + 1}/{total}
          </div>
        </div>

        {/* Question */}
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-5">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="flex-shrink-0"
            >
              <CodeBot size={50} mood={confirmed ? (selected === q.correct ? "cheer" : "think") : "happy"} />
            </motion.div>
            <div>
              <div className={`inline-flex items-center gap-1.5 text-xs font-black px-2 py-0.5 rounded-md mb-2 ${typeColor[q.type]}`}>
                {typeLabel[q.type]}
              </div>
              <p className="font-black text-base leading-snug">{q.question}</p>
            </div>
          </div>

          {q.code && (
            <pre className="bg-[#060610] border border-border rounded-xl px-4 py-3 text-xs text-emerald-300 leading-5 overflow-auto mb-5"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {q.code}
            </pre>
          )}

          <div className="space-y-2.5 mb-5">
            {q.options.map((opt, i) => {
              let cls = "border-border bg-secondary/50 hover:border-violet-500/50 hover:bg-violet-500/10 cursor-pointer";
              if (confirmed) {
                if (i === q.correct) cls = "border-emerald-500 bg-emerald-500/10 text-emerald-200 cursor-default";
                else if (i === selected) cls = "border-red-500 bg-red-500/10 text-red-200 cursor-default";
                else cls = "border-border bg-secondary/20 opacity-40 cursor-default";
              } else if (selected === i) cls = "border-violet-500 bg-violet-500/20 text-violet-200 cursor-pointer";
              return (
                <motion.button
                  key={i}
                  whileHover={!confirmed ? { x: 4 } : {}}
                  whileTap={!confirmed ? { scale: 0.98 } : {}}
                  onClick={() => !confirmed && setSelected(i)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between ${cls}`}
                >
                  <span>{opt}</span>
                  {confirmed && i === q.correct && <Check size={15} className="text-emerald-400 flex-shrink-0" />}
                  {confirmed && i === selected && i !== q.correct && <X size={15} className="text-red-400 flex-shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {confirmed && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border text-sm mb-4 ${
                  selected === q.correct
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                    : "bg-red-500/10 border-red-500/30 text-red-200"
                }`}
              >
                <p className="font-black mb-1">
                  {selected === q.correct ? `✅ Correct! +${q.points} XP` : "❌ Not quite!"}
                </p>
                <p className="text-xs opacity-80 leading-relaxed">{q.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action button */}
        <div>
          {!confirmed ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleConfirm()}
              disabled={selected === null}
              className="w-full py-3.5 rounded-xl bg-violet-600 text-white font-black text-sm disabled:opacity-35 hover:bg-violet-500 transition-all"
            >
              Check Answer
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNext}
              className="w-full py-3.5 rounded-xl bg-violet-600 text-white font-black text-sm hover:bg-violet-500 flex items-center justify-center gap-2"
            >
              {step < total - 1 ? "Next Question" : "See Results"}
              <ChevronRight size={16} />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Rewards Screen ───────────────────────────────────────────────────────────
function RewardsScreen({
  topic,
  score,
  xpEarned,
  coinsEarned,
  user,
  onNext,
  onLeaderboard,
}: {
  topic: Topic;
  score: number;
  xpEarned: number;
  coinsEarned: number;
  user: UserData;
  onNext: () => void;
  onLeaderboard: () => void;
}) {
  const stars = score >= 90 ? 3 : score >= 70 ? 2 : score >= 50 ? 1 : 0;
  const emoji = score >= 90 ? "🎉" : score >= 70 ? "😊" : score >= 50 ? "👍" : "💪";
  const msg = score >= 90 ? "Perfect Score!" : score >= 70 ? "Great Job!" : score >= 50 ? "Good Effort!" : "Keep Practicing!";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-5 py-8">
      <div className="w-full max-w-md">
        {/* Celebration animation */}
        <div className="text-center mb-6">
          <motion.div
            animate={{ rotate: [0, 15, -15, 10, -10, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 0.8 }}
            className="text-7xl mb-4"
          >
            {emoji}
          </motion.div>
          <h2 className="text-3xl font-black mb-1">{msg}</h2>
          <p className="text-muted-foreground font-semibold">{topic.title} complete!</p>
        </div>

        {/* Score circle */}
        <div className="flex justify-center mb-6">
          <div className="relative w-28 h-28">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="44" fill="none"
                stroke={score >= 70 ? "#10b981" : score >= 50 ? "#f59e0b" : "#7c3aed"}
                strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 44}`}
                initial={{ strokeDashoffset: `${2 * Math.PI * 44}` }}
                animate={{ strokeDashoffset: `${2 * Math.PI * 44 * (1 - score / 100)}` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-black">{score}%</span>
              <span className="text-muted-foreground text-xs font-semibold">Score</span>
            </div>
          </div>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-3 mb-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: i < stars ? 1 : 0.6, rotate: 0 }}
              transition={{ delay: 0.3 + i * 0.15, type: "spring" }}
            >
              <Star size={32} className={i < stars ? "text-amber-400 fill-amber-400" : "text-muted-foreground"} />
            </motion.div>
          ))}
        </div>

        {/* Rewards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "XP Earned", value: `+${xpEarned}`, icon: <Zap size={18} className="text-violet-400" />, color: "from-violet-500/20 to-purple-500/10 border-violet-500/30" },
            { label: "Coins", value: `+${coinsEarned}`, icon: <span className="text-xl">🪙</span>, color: "from-amber-500/20 to-yellow-500/10 border-amber-500/30" },
            { label: "Streak", value: `${user.streak + 1}🔥`, icon: <Flame size={18} className="text-orange-400" />, color: "from-orange-500/20 to-red-500/10 border-orange-500/30" },
          ].map((r) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`p-3 rounded-xl bg-gradient-to-br ${r.color} border text-center`}
            >
              <div className="flex justify-center mb-1">{r.icon}</div>
              <p className="font-black text-lg">{r.value}</p>
              <p className="text-muted-foreground text-xs">{r.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Badge unlock */}
        {stars === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/30 mb-5"
          >
            <div className="text-3xl">🏅</div>
            <div>
              <p className="font-black text-sm">Badge Unlocked!</p>
              <p className="text-muted-foreground text-xs">"{topic.title} Master" earned!</p>
            </div>
          </motion.div>
        )}

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNext}
            className="w-full py-3.5 rounded-xl bg-violet-600 text-white font-black hover:bg-violet-500 flex items-center justify-center gap-2 shadow-lg shadow-violet-600/25"
          >
            Next Lesson <ArrowRight size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onLeaderboard}
            className="w-full py-3 rounded-xl bg-secondary text-muted-foreground font-black hover:text-foreground flex items-center justify-center gap-2"
          >
            <Trophy size={15} />View Leaderboard
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ─── Leaderboard Screen ───────────────────────────────────────────────────────
function LeaderboardScreen({ user, leaderboard, onBack }: { user: UserData; leaderboard: { rank: number; name: string; xp: number; streak: number; emoji: string }[]; onBack: () => void }) {
  const [period, setPeriod] = useState<"weekly" | "monthly" | "alltime">("weekly");
  const list = [...leaderboard, { rank: user.rank, name: user.name, xp: user.xp, streak: user.streak, emoji: user.avatar, country: "🇮🇳", isUser: true }]
    .sort((a, b) => b.xp - a.xp)
    .map((u, i) => ({ ...u, rank: i + 1 }));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-5 py-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-2xl font-black">Leaderboard 🏆</h1>
            <p className="text-muted-foreground text-sm">Compete globally</p>
          </div>
          <Trophy size={26} className="ml-auto text-amber-400" />
        </div>

        {/* Period */}
        <div className="flex gap-1 p-1 bg-secondary rounded-xl mb-5">
          {(["weekly", "monthly", "alltime"] as const).map((p) => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-black transition-all ${period === p ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
              {p === "alltime" ? "All Time" : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        {/* Podium */}
        <div className="flex items-end justify-center gap-4 pt-4 pb-4">
          {[list[1], list[0], list[2]].map((u, idx) => {
            const h = [72, 96, 56][idx];
            const medalBg = ["bg-slate-400", "bg-amber-400", "bg-orange-500"][idx];
            const r = [2, 1, 3][idx];
            return (
              <div key={u.name + idx} className="flex flex-col items-center gap-1.5">
                <div className="text-3xl">{u.emoji}</div>
                <p className="text-xs font-black text-center max-w-[4rem] truncate">{u.name.split(" ")[0]}</p>
                <div className={`w-20 ${medalBg} rounded-t-xl flex items-center justify-center text-black font-black text-xl`} style={{ height: `${h}px` }}>
                  {r}
                </div>
              </div>
            );
          })}
        </div>

        {/* Full list */}
        <div className="space-y-2">
          {list.map((u) => {
            const isMe = "isUser" in u && u.isUser;
            return (
              <motion.div key={u.rank} whileHover={{ x: 3 }}
                className={`flex items-center gap-3 p-3 rounded-xl border ${isMe ? "bg-violet-600/20 border-violet-500/40" : "bg-card border-border"}`}>
                <div className={`w-7 text-center font-black text-sm flex-shrink-0 ${
                  u.rank === 1 ? "text-amber-400" : u.rank === 2 ? "text-slate-300" : u.rank === 3 ? "text-orange-400" : "text-muted-foreground"
                }`}>
                  {u.rank <= 3 ? ["🥇","🥈","🥉"][u.rank-1] : u.rank}
                </div>
                <div className="text-xl flex-shrink-0">{u.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`font-black text-sm ${isMe ? "text-violet-300" : ""}`}>{isMe ? "You" : u.name}</span>
                    {"country" in u && <span className="text-xs">{u.country}</span>}
                    {isMe && <span className="text-xs px-1.5 py-0.5 bg-violet-500/20 text-violet-400 rounded font-black">YOU</span>}
                  </div>
                  <p className="text-muted-foreground text-xs">{u.xp.toLocaleString()} XP · <span className="text-orange-400">{u.streak}🔥</span></p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("auth");
  const [user, setUser] = useState<UserData | null>(null);
  const [languages, setLanguages] = useState<Language[]>(LANGUAGES);
  const [leaderboard, setLeaderboard] = useState<{ rank: number; name: string; xp: number; streak: number; emoji: string }[]>(GLOBAL_LEADERBOARD);
  const [selectedLang, setSelectedLang] = useState<Language | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [quizResults, setQuizResults] = useState<{ score: number; xp: number; coins: number } | null>(null);
  const [notif, setNotif] = useState<string | null>(null);

  const toast = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 3000);
  };

  const handleAuth = (userData: UserData, token: string) => {
    localStorage.setItem("codequest_token", token);
    setUser(userData);
    setScreen("dashboard");
    toast("Welcome to CodeQuest! 🚀");
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const coursesData = await apiRequest("/courses");
        const mapped: Language[] = await Promise.all(
          coursesData.courses.map(async (course: any) => {
            const lessonData = await apiRequest(`/courses/${course.id}/lessons`);
            const topics: Topic[] = await Promise.all(
              lessonData.lessons.map(async (lesson: any) => {
                const quizData = await apiRequest(`/lessons/${lesson._id}/quiz`);
                return {
                  id: lesson.topicId,
                  title: lesson.title,
                  subtitle: lesson.subtitle,
                  level: lesson.level,
                  icon: lesson.icon,
                  duration: lesson.duration,
                  xpReward: lesson.xpReward,
                  coinReward: lesson.coinReward,
                  subtitles: lesson.subtitles || [],
                  voiceScript: lesson.voiceScript || "",
                  keyPoints: lesson.keyPoints || [],
                  code: lesson.code || "",
                  codeExplanation: lesson.codeExplanation || "",
                  output: lesson.output || "",
                  quiz: quizData.questions || [],
                };
              })
            );
            return {
              id: course.slug,
              name: course.name,
              emoji: course.emoji,
              description: course.description,
              gradient: course.gradient,
              textColor: course.textColor,
              topics,
              enrolled: course.enrolled,
              difficulty: course.difficulty,
            };
          })
        );
        if (mapped.length) setLanguages(mapped);
      } catch {
        // Keep bundled frontend data as fallback.
      }

      try {
        const lb = await apiRequest("/leaderboard");
        if (Array.isArray(lb.leaderboard)) setLeaderboard(lb.leaderboard);
      } catch {
        // Keep local fallback leaderboard.
      }

      const token = localStorage.getItem("codequest_token");
      if (token) {
        try {
          const meData = await apiRequest("/auth/me");
          setUser({ ...meData.user, rank: 0, level: meData.user.level || Math.max(1, Math.floor((meData.user.xp || 0) / 300) + 1) });
          setScreen("dashboard");
        } catch {
          localStorage.removeItem("codequest_token");
        }
      }
    };

    loadInitialData();
  }, []);

  const handleQuizComplete = (score: number, xp: number, coins: number) => {
    setQuizResults({ score, xp, coins });
    if (user && selectedTopic) {
      setUser((u) => u ? ({
        ...u,
        xp: u.xp + xp,
        coins: u.coins + coins,
        streak: u.streak,
        completedTopics: u.completedTopics.includes(selectedTopic.id)
          ? u.completedTopics
          : [...u.completedTopics, selectedTopic.id],
      }) : u);
    }
    setScreen("rewards");
  };

  const handleNextLesson = () => {
    if (!selectedLang || !selectedTopic) { setScreen("topic-list"); return; }
    const topics = selectedLang.topics;
    const idx = topics.findIndex((t) => t.id === selectedTopic.id);
    if (idx < topics.length - 1) {
      setSelectedTopic(topics[idx + 1]);
      setQuizResults(null);
      setScreen("lesson");
    } else {
      setScreen("topic-list");
      toast("🎉 All topics completed! Pick another language!");
    }
  };

  const screens: Record<Screen, React.ReactNode> = {
    auth: <AuthScreen onAuth={handleAuth} />,
    dashboard: user ? <DashboardScreen user={user} onNavigate={setScreen} onLogout={() => { stopSpeech(); localStorage.removeItem("codequest_token"); setUser(null); setScreen("auth"); }} /> : null,
    "lang-select": <LangSelectScreen languages={languages} onSelect={(lang) => { setSelectedLang(lang); setScreen("topic-list"); }} onBack={() => setScreen("dashboard")} />,
    "topic-list": selectedLang && user ? (
      <TopicListScreen
        language={selectedLang}
        user={user}
        onSelect={(topic) => { setSelectedTopic(topic); setQuizResults(null); setScreen("lesson"); }}
        onBack={() => setScreen("lang-select")}
      />
    ) : null,
    lesson: selectedTopic && selectedLang ? (
      <LessonScreen
        topic={selectedTopic}
        language={selectedLang}
        onNext={() => setScreen("code-section")}
        onBack={() => setScreen("topic-list")}
      />
    ) : null,
    "code-section": selectedTopic && selectedLang ? (
      <CodeSectionScreen
        topic={selectedTopic}
        language={selectedLang}
        onNext={() => setScreen("quiz")}
        onBack={() => setScreen("lesson")}
      />
    ) : null,
    quiz: selectedTopic && selectedLang ? (
      <QuizScreen
        topic={selectedTopic}
        language={selectedLang}
        onComplete={handleQuizComplete}
        onBack={() => setScreen("code-section")}
      />
    ) : null,
    rewards: selectedTopic && quizResults && user ? (
      <RewardsScreen
        topic={selectedTopic}
        score={quizResults.score}
        xpEarned={quizResults.xp}
        coinsEarned={quizResults.coins}
        user={user}
        onNext={handleNextLesson}
        onLeaderboard={() => setScreen("leaderboard")}
      />
    ) : null,
    leaderboard: user ? <LeaderboardScreen user={user} leaderboard={leaderboard} onBack={() => setScreen("dashboard")} /> : null,
  };

  return (
    <div className="size-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="size-full"
        >
          {screens[screen]}
        </motion.div>
      </AnimatePresence>

      {/* Global toast */}
      <AnimatePresence>
        {notif && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-5 left-1/2 z-50 bg-violet-600 text-white px-5 py-2.5 rounded-2xl font-black text-sm shadow-xl shadow-violet-500/40"
          >
            {notif}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
