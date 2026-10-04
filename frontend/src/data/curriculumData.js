// KDU Faculty of Computing Official Academic Curriculum & Module Directory
// Extracted from Official KDU Faculty of Computing Curriculum Document

export const KDU_FACULTIES = [
  "Faculty of Computing",
  "Faculty of Engineering",
  "Faculty of Management, Social Sciences & Humanities",
  "Faculty of Allied Health Sciences",
  "Faculty of Built Environment & Spatial Sciences",
  "Faculty of Law",
  "Faculty of Technology",
  "Faculty of Criminal Justice",
  "Faculty of Defence & Strategic Studies"
];

export const DEGREE_CURRICULUM = {
  "BSc (Hons) Computer Science": {
    "Year 1": {
      "Semester I": [
        { code: "CS11012", name: "Fundamentals of Programming", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS11021", name: "Programming Laboratory", credits: "1 GPA", category: "COMPULSORY" },
        { code: "CS11032", name: "Foundation of Computer Science", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS11042", name: "Fundamentals of Databases (incl. Practical)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "SE11012", name: "Software Development Methodologies", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE11013", name: "Computer Systems Architecture", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CM11033", name: "Probability and Statistics", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CM11102", name: "Mathematics for Computing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE12992", name: "Collaborative Hardware Project (Final eval. Sem 2)", credits: "1 GPA", category: "COMPULSORY" },
        { code: "DL1132", name: "English: Basic Study Skills for CS/SE/CE", credits: "2 NGPA", category: "COMPULSORY" },
        { code: "LS1052", name: "Leadership Training", credits: "2 NGPA", category: "COMPULSORY" }
      ],
      "Semester II": [
        { code: "CS12012", name: "Web Development (incl. Practical)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS12023", name: "Object Oriented Programming (incl. Practical)", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS12033", name: "Computer Networks", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS12041", name: "Creative Media Tools", credits: "1 GPA", category: "COMPULSORY" },
        { code: "SE12012", name: "Software Analysis and Modeling", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM12052", name: "Discrete Mathematics", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE12241", name: "Fundamentals of Electronics", credits: "1 GPA", category: "COMPULSORY" },
        { code: "COE12992", name: "Collaborative Hardware Project", credits: "1 GPA", category: "COMPULSORY" },
        { code: "DL2142", name: "English: Advance Study Skills for CS/SE/CE", credits: "2 NGPA", category: "COMPULSORY" }
      ]
    },
    "Year 2": {
      "Semester III": [
        { code: "CS21012", name: "Operating Systems", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS21022", name: "Data Structures and Algorithms (incl. Practical)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS21032", name: "Advanced Object Oriented Programming (incl. Practical)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS21042", name: "Advanced Computer Networks and Wireless Communication", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS21052", name: "Advanced Web Development", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS22993", name: "Group Project in Software Development (Final eval. Sem 4)", credits: "1 GPA", category: "COMPULSORY" },
        { code: "SE21012", name: "Requirements Engineering", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM21032", name: "Statistical Distributions and Inference", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM21102", name: "Calculus", credits: "2 GPA", category: "COMPULSORY" },
        { code: "MF2112", name: "Principles of Management", credits: "2 NGPA", category: "COMPULSORY" },
        { code: "DL3152", name: "Writing and Speaking Skills", credits: "2 NGPA", category: "COMPULSORY" },
        { code: "MS3032", name: "Strategic Defence Studies", credits: "2 MGPA", category: "MANDATORY" }
      ],
      "Semester IV": [
        { code: "CS22012", name: "Advanced Data Structures and Algorithms (incl. Practical)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS22023", name: "Artificial Intelligence", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS22993", name: "Group Project in Software Development", credits: "2 GPA", category: "COMPULSORY" },
        { code: "SE22013", name: "Software Project Management", credits: "3 GPA", category: "COMPULSORY" },
        { code: "SE22022", name: "Software Architecture", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE22032", name: "Computer Interfacing and Microprocessors", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM22112", name: "Numerical Methods", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DL4162", name: "Research Writing Skills", credits: "2 NGPA", category: "COMPULSORY" }
      ]
    },
    "Year 3": {
      "Semester V": [
        { code: "CS31012", name: "Essentials of Computer Law", credits: "2 NGPA", category: "COMPULSORY" },
        { code: "CS31022", name: "Research Methodology", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS31032", name: "Mobile Computing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS31042", name: "Computer and Network Security", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS31062", name: "UX and UI Engineering", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS31072", name: "Advanced Databases Techniques", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS31082", name: "Distributed Computing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS31092", name: "Digital Image Processing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS31102", name: "Expert Systems and Logic Programming", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS31052", name: "Bioinformatics", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS31112", name: "Cloud Computing", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS31122", name: "Data Mining and Business Intelligence", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS31132", name: "Big Data Analytics", credits: "2 GPA", category: "ELECTIVE" },
        { code: "COE31052", name: "Enterprise System Administration", credits: "2 GPA", category: "ELECTIVE" }
      ],
      "Semester VI": [
        { code: "CS32012", name: "Computer Graphics and Visualization", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS32022", name: "Automata Theory", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS32032", name: "Complex Systems and Agent Technology", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS32042", name: "Information Security", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS32082", name: "Natural Language Processing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS32092", name: "Machine Learning", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS32992", name: "Independent Research Study", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM32013", name: "Operational Research", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CM32051", name: "Statistical Tools for Computing", credits: "1 GPA", category: "COMPULSORY" },
        { code: "CS32052", name: "Modeling and Simulation", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS32062", name: "Nature Inspired Computing", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS32072", name: "Internet of Things", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS32102", name: "Distributed Systems", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS32112", name: "Advanced Mobile Computing", credits: "2 GPA", category: "ELECTIVE" },
        { code: "COE32062", name: "Microcontrollers and Embedded Systems", credits: "2 GPA", category: "ELECTIVE" },
        { code: "IT32262", name: "Geoinformatics", credits: "2 GPA", category: "ELECTIVE" }
      ]
    },
    "Year 4": {
      "Semester VII": [
        { code: "CS4012", name: "Emerging Trends in Computing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS4022", name: "Theory of Programming Languages", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS4032", name: "Natural Language Processing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS4042", name: "Machine Learning", credits: "2 GPA", category: "COMPULSORY" },
        { code: "SE4042", name: "Software Quality Assurance", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS4999", name: "Individual Research Project (Final eval. Sem 8)", credits: "4 GPA", category: "COMPULSORY" },
        { code: "CS4062", name: "Artificial Cognitive Systems", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS4072", name: "Computability and Complexity", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS4082", name: "Semantic Web and Ontology", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS4092", name: "Distributed Systems", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS4102", name: "Computer Music", credits: "2 GPA", category: "ELECTIVE" },
        { code: "COE4022", name: "Advanced Operating Systems", credits: "2 GPA", category: "ELECTIVE" },
        { code: "COE4042", name: "Robotics and Automation", credits: "2 GPA", category: "ELECTIVE" },
        { code: "SE4012", name: "Formal Methods and Software Verification", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CM4012", name: "Advanced Topics in Statistics", credits: "2 GPA", category: "ELECTIVE" }
      ]
    }
  },

  "BSc (Hons) Software Engineering": {
    "Year 1": {
      "Semester I": [
        { code: "CS11012", name: "Fundamentals of Programming", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS11021", name: "Programming Laboratory", credits: "1 GPA", category: "COMPULSORY" },
        { code: "CS11032", name: "Foundation of Computer Science", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS11042", name: "Fundamentals of Databases (incl. Practical)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "SE11012", name: "Software Development Methodologies", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE11013", name: "Computer Systems Architecture", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CM11033", name: "Probability and Statistics", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CM11102", name: "Mathematics for Computing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE12992", name: "Collaborative Hardware Project (Final eval. Sem 2)", credits: "1 GPA", category: "COMPULSORY" },
        { code: "DL1132", name: "English: Basic Study Skills for CS/SE/CE", credits: "2 NGPA", category: "COMPULSORY" },
        { code: "LS1052", name: "Leadership Training", credits: "2 NGPA", category: "COMPULSORY" }
      ],
      "Semester II": [
        { code: "CS12012", name: "Web Development (incl. Practical)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS12023", name: "Object Oriented Programming (incl. Practical)", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS12033", name: "Computer Networks", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS12041", name: "Creative Media Tools", credits: "1 GPA", category: "COMPULSORY" },
        { code: "SE12012", name: "Software Analysis and Modeling", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM12052", name: "Discrete Mathematics", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE12241", name: "Fundamentals of Electronics", credits: "1 GPA", category: "COMPULSORY" },
        { code: "COE12992", name: "Collaborative Hardware Project", credits: "1 GPA", category: "COMPULSORY" },
        { code: "DL2142", name: "English: Advance Study Skills for CS/SE/CE", credits: "2 NGPA", category: "COMPULSORY" }
      ]
    },
    "Year 2": {
      "Semester III": [
        { code: "CS21012", name: "Operating Systems", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS21022", name: "Data Structures and Algorithms (incl. Practical)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS21032", name: "Advanced Object Oriented Programming (incl. Practical)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS21042", name: "Advanced Computer Networks and Wireless Communication", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS21052", name: "Advanced Web Development", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS22993", name: "Group Project in Software Development (Final eval. Sem 4)", credits: "1 GPA", category: "COMPULSORY" },
        { code: "SE21012", name: "Requirements Engineering", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM21032", name: "Statistical Distributions and Inference", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM21102", name: "Calculus", credits: "2 GPA", category: "COMPULSORY" },
        { code: "MF2112", name: "Principles of Management", credits: "2 NGPA", category: "COMPULSORY" },
        { code: "DL3152", name: "Writing and Speaking Skills", credits: "2 NGPA", category: "COMPULSORY" },
        { code: "MS3032", name: "Strategic Defence Studies", credits: "2 MGPA", category: "MANDATORY" }
      ],
      "Semester IV": [
        { code: "CS22012", name: "Advanced Data Structures and Algorithms (incl. Practical)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS22023", name: "Artificial Intelligence", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS22993", name: "Group Project in Software Development", credits: "2 GPA", category: "COMPULSORY" },
        { code: "SE22013", name: "Software Project Management", credits: "3 GPA", category: "COMPULSORY" },
        { code: "SE22022", name: "Software Architecture", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE22032", name: "Computer Interfacing and Microprocessors", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM22112", name: "Numerical Methods", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DL4162", name: "Research Writing Skills", credits: "2 NGPA", category: "COMPULSORY" }
      ]
    },
    "Year 3": {
      "Semester V": [
        { code: "CS31012", name: "Essentials of Computer Law", credits: "2 NGPA", category: "COMPULSORY" },
        { code: "CS31022", name: "Research Methodology", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS31032", name: "Mobile Computing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS31042", name: "Computer and Network Security", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS31062", name: "UX and UI Engineering", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS31072", name: "Advanced Database Techniques", credits: "2 GPA", category: "COMPULSORY" },
        { code: "SE31012", name: "Software Construction Technologies and Tools", credits: "2 GPA", category: "COMPULSORY" },
        { code: "SE31022", name: "Engineering Economics for Software", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS31052", name: "Bioinformatics", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS31092", name: "Digital Image Processing", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS31102", name: "Expert Systems and Logic Programming", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS31112", name: "Cloud Computing", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS31122", name: "Data Mining and Business Intelligence", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS31132", name: "Big Data Analytics", credits: "2 GPA", category: "ELECTIVE" }
      ],
      "Semester VI": [
        { code: "CS32042", name: "Information Security", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS32092", name: "Machine Learning", credits: "2 GPA", category: "COMPULSORY" },
        { code: "SE32992", name: "Independent Research Study", credits: "2 GPA", category: "COMPULSORY" },
        { code: "SE32012", name: "Software Verification and Validation", credits: "2 GPA", category: "COMPULSORY" },
        { code: "SE32022", name: "Rapid Application Development", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM32051", name: "Statistical Tools for Computing", credits: "1 GPA", category: "COMPULSORY" },
        { code: "CS32012", name: "Computer Graphics and Visualization", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS32022", name: "Automata Theory", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS32032", name: "Complex Systems and Agent Technology", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS32082", name: "Natural Language Processing", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS32102", name: "Distributed Systems", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS32112", name: "Advanced Mobile Computing", credits: "2 GPA", category: "ELECTIVE" },
        { code: "IT32262", name: "Geoinformatics", credits: "2 GPA", category: "ELECTIVE" }
      ]
    },
    "Year 4": {
      "Semester VII": [
        { code: "SE4012", name: "Formal Methods and Software Verifications", credits: "2 GPA", category: "COMPULSORY" },
        { code: "SE4022", name: "Software Evolution", credits: "2 GPA", category: "COMPULSORY" },
        { code: "SE4042", name: "Software Quality Assurance", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS4012", name: "Emerging Trends in Computing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "SE4999", name: "Individual Research Project (Final eval. Sem 8)", credits: "4 GPA", category: "COMPULSORY" },
        { code: "CS4022", name: "Theory of Programming Languages", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS4032", name: "Natural Language Processing", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS4042", name: "Machine Learning", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS4062", name: "Artificial Cognitive Systems", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS4082", name: "Semantic Web and Ontology", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS4092", name: "Distributed Systems", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CM4012", name: "Advanced Topics in Statistics", credits: "2 GPA", category: "ELECTIVE" }
      ]
    }
  },

  "BSc (Hons) Computer Engineering": {
    "Year 1": {
      "Semester I": [
        { code: "CS11012", name: "Fundamentals of Programming", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS11021", name: "Programming Laboratory", credits: "1 GPA", category: "COMPULSORY" },
        { code: "CS11032", name: "Foundation of Computer Science", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS11042", name: "Fundamentals of Databases (incl. Practical)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "SE11012", name: "Software Development Methodologies", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE11013", name: "Computer Systems Architecture", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CM11033", name: "Probability and Statistics", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CM11102", name: "Mathematics for Computing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE12992", name: "Collaborative Hardware Project (Final eval. Sem 2)", credits: "1 GPA", category: "COMPULSORY" },
        { code: "DL1132", name: "English: Basic Study Skills for CS/SE/CE", credits: "2 NGPA", category: "COMPULSORY" },
        { code: "LS1052", name: "Leadership Training", credits: "2 NGPA", category: "COMPULSORY" }
      ],
      "Semester II": [
        { code: "CS12012", name: "Web Development (incl. Practical)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS12023", name: "Object Oriented Programming (incl. Practical)", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS12033", name: "Computer Networks", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS12041", name: "Creative Media Tools", credits: "1 GPA", category: "COMPULSORY" },
        { code: "COE12012", name: "Fundamentals of Electrical Engineering (incl. Practical)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM12052", name: "Discrete Mathematics", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE12022", name: "Basic Electronics (incl. Practical)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE12992", name: "Collaborative Hardware Project", credits: "1 GPA", category: "COMPULSORY" },
        { code: "DL2142", name: "English: Advance Study Skills for CS/SE/CE", credits: "2 NGPA", category: "COMPULSORY" }
      ]
    },
    "Year 2": {
      "Semester III": [
        { code: "COE21013", name: "Digital Electronics and Systems", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS21022", name: "Data Structures and Algorithms (incl. Practical)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS21012", name: "Operating Systems", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS21032", name: "Advanced Object Oriented Programming (incl. Practical)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE21022", name: "Mobile Computing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "SE21012", name: "Requirements Engineering", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM21102", name: "Calculus", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM21032", name: "Statistical Distributions and Inference", credits: "2 GPA", category: "COMPULSORY" },
        { code: "MF2112", name: "Principles of Management", credits: "2 NGPA", category: "COMPULSORY" },
        { code: "DL3152", name: "Writing and Speaking Skills", credits: "2 NGPA", category: "COMPULSORY" },
        { code: "MS3032", name: "Strategic Defence Studies", credits: "2 MGPA", category: "MANDATORY" }
      ],
      "Semester IV": [
        { code: "CS22012", name: "Advanced Data Structures and Algorithms (incl. Practical)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS22023", name: "Artificial Intelligence", credits: "3 GPA", category: "COMPULSORY" },
        { code: "COE22012", name: "Engineering Drawing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE22023", name: "Advanced Computer Architecture", credits: "3 GPA", category: "COMPULSORY" },
        { code: "COE22993", name: "Group Project in Software Development", credits: "3 GPA", category: "COMPULSORY" },
        { code: "COE22032", name: "Computer Interfacing and Microprocessors", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM22112", name: "Numerical Methods", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DL4162", name: "Research Writing Skills", credits: "2 NGPA", category: "COMPULSORY" }
      ]
    },
    "Year 3": {
      "Semester V": [
        { code: "COE31012", name: "Micro Controllers and Embedded Systems", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE31021", name: "Embedded Systems Laboratory", credits: "1 GPA", category: "COMPULSORY" },
        { code: "COE31032", name: "Research Methodology", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE31062", name: "Digital Signal Processing (incl. Practical)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE31072", name: "Design Project", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS31042", name: "Computer and Network Security", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS31012", name: "Essentials of Computer Law", credits: "2 NGPA", category: "COMPULSORY" },
        { code: "COE31042", name: "Applied Mechanics", credits: "2 GPA", category: "ELECTIVE" },
        { code: "COE31052", name: "Enterprise Systems Administration", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS31062", name: "UX and UI Engineering", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS31122", name: "Data Mining and Business Intelligence", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS31092", name: "Digital Image Processing", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS31102", name: "Expert Systems and Logic Programming", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS31112", name: "Cloud Computing", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS31132", name: "Big Data Analytics", credits: "2 GPA", category: "ELECTIVE" }
      ],
      "Semester VI": [
        { code: "COE32012", name: "Computer Systems Engineering", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE32022", name: "Digital Systems Design", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE32992", name: "Independent Research Study", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE32032", name: "Electrical Properties of Materials (incl. Practical)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS32042", name: "Information Security", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM32051", name: "Statistical Tools for Computing", credits: "1 GPA", category: "COMPULSORY" },
        { code: "COE32042", name: "Robotics and Automation", credits: "2 GPA", category: "ELECTIVE" },
        { code: "COE32052", name: "Telecommunication Networks", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS32032", name: "Complex Systems and Agent Technology", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS32082", name: "Natural Language Processing", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS32062", name: "Nature Inspired Computing", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS32112", name: "Advanced Mobile Computing", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS32092", name: "Machine Learning", credits: "2 GPA", category: "ELECTIVE" }
      ]
    },
    "Year 4": {
      "Semester VII": [
        { code: "COE4012", name: "Semiconductors and Solid State Devices", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE4033", name: "VLSI Design and Fabrication", credits: "3 GPA", category: "COMPULSORY" },
        { code: "COE4022", name: "Advanced Operating Systems", credits: "2 GPA", category: "COMPULSORY" },
        { code: "COE4999", name: "Individual Research Project (Final eval. Sem 8)", credits: "4 GPA", category: "COMPULSORY" },
        { code: "CS4012", name: "Emerging Trends in Computing", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS4022", name: "Theory of Programming Languages", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS4032", name: "Natural Language Processing", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS4042", name: "Machine Learning", credits: "2 GPA", category: "ELECTIVE" },
        { code: "SE4042", name: "Software Quality Assurance", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS4062", name: "Artificial Cognitive Systems", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS4092", name: "Distributed Systems", credits: "2 GPA", category: "ELECTIVE" },
        { code: "COE4042", name: "Robotics and Automation", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CM4012", name: "Advanced Topics in Statistics", credits: "2 GPA", category: "ELECTIVE" }
      ]
    }
  }
};

// Generic fallback modules for other degrees
export const DEFAULT_FALLBACK_MODULES = [
  { code: "CS11012", name: "Fundamentals of Programming", credits: "2 GPA", category: "COMPULSORY" },
  { code: "CS11042", name: "Fundamentals of Databases", credits: "2 GPA", category: "COMPULSORY" },
  { code: "SE11012", name: "Software Development Methodologies", credits: "2 GPA", category: "COMPULSORY" },
  { code: "CM11033", name: "Probability and Statistics", credits: "3 GPA", category: "COMPULSORY" }
];

export const getSemestersForYear = (year) => {
  if (year === "Year 1" || year === "1st Year") return ["Semester I", "Semester II"];
  if (year === "Year 2" || year === "2nd Year") return ["Semester III", "Semester IV"];
  if (year === "Year 3" || year === "3rd Year") return ["Semester V", "Semester VI"];
  if (year === "Year 4" || year === "4th Year") return ["Semester VII"];
  return ["Semester I", "Semester II"];
};

export const getCurriculumModules = (faculty, degree, year, semester) => {
  if (!faculty || !degree || !year || !semester) {
    return [];
  }

  const normDegree = Object.keys(DEGREE_CURRICULUM).find(
    (d) => degree?.toLowerCase().includes(d.toLowerCase()) || d.toLowerCase().includes(degree?.toLowerCase())
  );

  const normYear = year?.includes("1") ? "Year 1"
    : year?.includes("2") ? "Year 2"
    : year?.includes("3") ? "Year 3"
    : year?.includes("4") ? "Year 4"
    : "Year 1";

  if (normDegree && DEGREE_CURRICULUM[normDegree]?.[normYear]?.[semester]) {
    return DEGREE_CURRICULUM[normDegree][normYear][semester];
  }

  // Fallback to first available degree's semester if specific degree isn't in top 3
  const firstMatch = DEGREE_CURRICULUM["BSc (Hons) Computer Science"]?.[normYear]?.[semester];
  if (firstMatch) return firstMatch;

  return DEFAULT_FALLBACK_MODULES;
};

// Deterministically compute or retrieve a realistic student score for a specific module
export const getStudentModuleScore = (student, moduleCode, baseTechScore = 75) => {
  if (!student) return 75;

  // 1. If student already has explicit module_scores stored
  if (student.module_scores && student.module_scores[moduleCode] !== undefined) {
    const raw = student.module_scores[moduleCode];
    const num = parseFloat(raw);
    if (!isNaN(num) && num > 0) return Math.min(100, Math.max(30, Math.round(num)));
  }

  // 2. Deterministic pseudo-random variation based on student_id and moduleCode
  // so each student has consistent but differentiated marks across modules
  const idStr = String(student.student_id || student.id || "STU-1");
  let hash = 0;
  const combined = idStr + "_" + moduleCode;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }
  const variance = (Math.abs(hash) % 21) - 10; // -10 to +10 variance
  const base = student.technical_score || baseTechScore || 75;
  const calculated = Math.min(99, Math.max(45, Math.round(base + variance)));
  return calculated;
};
