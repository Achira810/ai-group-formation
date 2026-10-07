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

export const CAMPUS_FACULTY_DEGREES = {
  "Faculty of Computing": [
    "BSc (Hons) Computer Science", 
    "BSc (Hons) Software Engineering", 
    "BSc (Hons) Computer Engineering", 
    "BSc (Hons) Information Technology", 
    "BSc (Hons) Information Systems",
    "BSc (Hons) Data Science"
  ],
  "Faculty of Engineering": [
    "Civil Engineering", 
    "Mechanical Engineering", 
    "Electrical & Electronic Engineering", 
    "Electronic & Telecommunication", 
    "Aeronautical Engineering", 
    "Biomedical Engineering",
    "Naval Architecture & Marine Engineering"
  ],
  "Faculty of Management, Social Sciences & Humanities": [
    "BSc Management & Technical Sciences", 
    "BSc Logistics Management", 
    "BSc Social Sciences", 
    "BA in Applied Data Science Communication"
  ],
  "Faculty of Allied Health Sciences": [
    "BSc (Hons) Nursing", 
    "BSc (Hons) Physiotherapy", 
    "BSc (Hons) Medical Laboratory Sciences", 
    "BSc (Hons) Radiography", 
    "BSc (Hons) Radiotherapy", 
    "BSc (Hons) Pharmacy"
  ],
  "Faculty of Built Environment & Spatial Sciences": [
    "Bachelor of Architecture", 
    "BSc (Hons) Quantity Surveying", 
    "BSc (Hons) Spatial Sciences"
  ],
  "Faculty of Law": [
    "Bachelor of Laws (LLB)"
  ],
  "Faculty of Technology": [
    "BTech (Hons) in ICT", 
    "BTech (Hons) in Biosystems Technology"
  ],
  "Faculty of Criminal Justice": [
    "BSc in Criminology & Criminal Justice"
  ],
  "Faculty of Defence & Strategic Studies": [
    "BSc in Strategic Studies & International Relations"
  ]
};

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
  },

  "BSc (Hons) Information Technology": {
    "Year 1": {
      "Semester I": [
        { code: "IT1022", name: "Information Technology Concepts", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT1033", name: "Fundamentals of Computer Programming", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT1043", name: "Fundamentals of Computer Systems", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT1062", name: "Fundamentals of Visual Computing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT1072", name: "Career Development Plan", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM1023", name: "Mathematics for IT - I", credits: "3 GPA", category: "COMPULSORY" },
        { code: "DL1172", name: "English Study Skills for ICT", credits: "2 GPA", category: "COMPULSORY" },
        { code: "MF1112", name: "Principles of Management", credits: "2 GPA", category: "COMPULSORY" },
        { code: "LS1052", name: "Leadership Training", credits: "2 GPA", category: "COMPULSORY" }
      ],
      "Semester II": [
        { code: "IT1083", name: "Computer Systems Architecture", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT1093", name: "Object Oriented Programming", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT1103", name: "System Analysis and Design", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT1113", name: "Fundamentals of Database Management Skills", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT1992", name: "Visual Computing Project (Group)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT1122", name: "Internet of Things (IoT)", credits: "2 NGPA", category: "COMPULSORY" },
        { code: "CM1042", name: "Basic Probability and Statistics", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DL2192", name: "Presentation Skills for ICT", credits: "2 NGPA", category: "COMPULSORY" }
      ]
    },
    "Year 2": {
      "Semester III": [
        { code: "IT2022", name: "Computer Network Systems I", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT2032", name: "Object Oriented Designing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT2043", name: "Data and Information Management", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT2053", name: "Rapid Application Development", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT2063", name: "Software Engineering", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT2072", name: "UX and UI Engineering", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM2022", name: "Mathematics for IT II", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DL24202", name: "Writing and Speaking Skills", credits: "2 NGPA", category: "COMPULSORY" }
      ],
      "Semester IV": [
        { code: "IT2082", name: "Web Technologies", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT2093", name: "Data Structures and Algorithms", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT2103", name: "Computer Network Systems II", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT2992", name: "Industry based Software Engineering Project", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT2113", name: "Project Management", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT2122", name: "Operating Systems", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT2132", name: "Research Methodology", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM2032", name: "Statistical Distribution and Inference", credits: "2 GPA", category: "COMPULSORY" },
        { code: "MF2212", name: "Human Resource Management", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DL29302", name: "Research Writing Skills", credits: "2 NGPA", category: "COMPULSORY" }
      ]
    },
    "Year 3": {
      "Semester V": [
        { code: "IT3023", name: "Advanced Multimedia Technologies", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT3033", name: "Information and Data Security", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT3043", name: "Advanced Computer Network Systems I", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT3052", name: "Programming Frameworks", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT3063", name: "Advanced Web Technologies", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT3072", name: "Enterprise Resource Planning Systems", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT3082", name: "Computer Ethics and IT Law", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT3093", name: "Mobile Computing", credits: "3 GPA", category: "COMPULSORY" }
      ],
      "Semester VI": [
        { code: "IT3103", name: "Service Oriented Web Programming", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT3113", name: "Cyber Security", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT3123", name: "Cloud Computing and Virtualization", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT3133", name: "Programming Distributed Components", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT3143", name: "Independent Study", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT3153", name: "Software Quality Assurance", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT3162", name: "GIS and Remote Sensing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT3182", name: "Essentials of Artificial Intelligence", credits: "2 GPA", category: "ELECTIVE" }
      ]
    },
    "Year 4": {
      "Semester VII": [
        { code: "IT4012", name: "Emerging Trends in IT", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT4999", name: "Individual Research Project", credits: "6 GPA", category: "COMPULSORY" },
        { code: "IT4022", name: "Advanced Cloud Architecture", credits: "2 GPA", category: "ELECTIVE" },
        { code: "IT4032", name: "DevOps & Continuous Integration", credits: "2 GPA", category: "ELECTIVE" }
      ]
    }
  },

  "BSc (Hons) Information Systems": {
    "Year 1": {
      "Semester I": [
        { code: "IT1022", name: "Information Technology Concepts", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT1033", name: "Fundamentals of Computer Programming", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT1043", name: "Fundamentals of Computer Systems", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT1062", name: "Fundamentals of Visual Computing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT1072", name: "Career Development Plan", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM1023", name: "Mathematics for IT - I", credits: "3 GPA", category: "COMPULSORY" },
        { code: "DL1172", name: "English Study Skills for ICT", credits: "2 GPA", category: "COMPULSORY" },
        { code: "MF1112", name: "Principles of Management", credits: "2 GPA", category: "COMPULSORY" },
        { code: "LS1052", name: "Leadership Training", credits: "2 GPA", category: "COMPULSORY" }
      ],
      "Semester II": [
        { code: "IT1083", name: "Computer Systems Architecture", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT1093", name: "Object Oriented Programming", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT1103", name: "System Analysis and Design", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT1113", name: "Fundamentals of Database Management Skills", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT1992", name: "Visual Computing Project (Group)", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT1122", name: "Internet of Things (IoT)", credits: "2 NGPA", category: "COMPULSORY" },
        { code: "CM1042", name: "Basic Probability and Statistics", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DL2192", name: "Presentation Skills for ICT", credits: "2 NGPA", category: "COMPULSORY" }
      ]
    },
    "Year 2": {
      "Semester III": [
        { code: "IT2022", name: "Computer Network Systems I", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT2032", name: "Object Oriented Designing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT2043", name: "Data and Information Management", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT2053", name: "Rapid Application Development", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT2063", name: "Software Engineering", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT2072", name: "UX and UI Engineering", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM2022", name: "Mathematics for IT II", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DL24202", name: "Writing and Speaking Skills", credits: "2 NGPA", category: "COMPULSORY" }
      ],
      "Semester IV": [
        { code: "IT2082", name: "Web Technologies", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT2093", name: "Data Structures and Algorithms", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT2103", name: "Computer Network Systems II", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT2992", name: "Industry based Software Engineering Project", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT2113", name: "Project Management", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT2122", name: "Operating Systems", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT2132", name: "Research Methodology", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM2032", name: "Statistical Distribution and Inference", credits: "2 GPA", category: "COMPULSORY" },
        { code: "MF2212", name: "Human Resource Management", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DL29302", name: "Research Writing Skills", credits: "2 NGPA", category: "COMPULSORY" }
      ]
    },
    "Year 3": {
      "Semester V": [
        { code: "IS3022", name: "Accounting Principles and Costing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IS3042", name: "Principles of Economics", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IS3053", name: "Strategic Management", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT3082", name: "Computer Ethics and IT Law", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IS3062", name: "Knowledge Management", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT3063", name: "Advanced Web Technologies", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT3072", name: "Enterprise Resource Planning Systems", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM3013", name: "Operational Research", credits: "3 GPA", category: "COMPULSORY" }
      ],
      "Semester VI": [
        { code: "IS3073", name: "Management Information Systems", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IS3112", name: "Marketing Management", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IS3083", name: "E-Commerce", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IS3093", name: "Financial Management Concepts", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT3143", name: "Independent Study", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IS3102", name: "Organizational Behaviour", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT3153", name: "Software Quality Assurance", credits: "3 GPA", category: "COMPULSORY" },
        { code: "IT3162", name: "GIS and Remote Sensing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IT3182", name: "Essentials of Artificial Intelligence", credits: "2 GPA", category: "ELECTIVE" }
      ]
    },
    "Year 4": {
      "Semester VII": [
        { code: "IS4012", name: "Business Process Management & Reengineering", credits: "2 GPA", category: "COMPULSORY" },
        { code: "IS4999", name: "Individual Research Project in Information Systems", credits: "6 GPA", category: "COMPULSORY" },
        { code: "IS4022", name: "Enterprise Architecture & IT Governance", credits: "2 GPA", category: "ELECTIVE" }
      ]
    }
  },

  "BSc (Hons) Data Science": {
    "Year 1": {
      "Semester I": [
        { code: "CS1122", name: "Fundamentals of Data Science", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM1072", name: "Linear Algebra I", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM1063", name: "Calculus I", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS1012", name: "Fundamentals of Programming", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS1101", name: "Programming Laboratory", credits: "1 GPA", category: "COMPULSORY" },
        { code: "MF1122", name: "Principles of Management", credits: "2 GPA", category: "COMPULSORY" },
        { code: "MF1131", name: "Analysis of Business Environment", credits: "1 GPA", category: "COMPULSORY" },
        { code: "LC1133", name: "Introduction to Communication Skills", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MS1013", name: "Military Studies", credits: "4 MGPA", category: "COMPULSORY" }
      ],
      "Semester II": [
        { code: "DS12013", name: "Discrete Mathematics for Data Science", credits: "3 GPA", category: "COMPULSORY" },
        { code: "DS12022", name: "Linear Algebra I", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DS12033", name: "Statistical Inference", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS12052", name: "Object Oriented Programming", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DS12042", name: "Applied Statistical Computing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "MF1212", name: "Business Economics", credits: "2 GPA", category: "COMPULSORY" },
        { code: "LC1243", name: "Fundamentals of Business Communication", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MS1024", name: "Military Studies", credits: "Non-GPA", category: "COMPULSORY" }
      ]
    },
    "Year 2": {
      "Semester III": [
        { code: "CM2042", name: "Calculus II", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM2052", name: "Linear Algebra II", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM2062", name: "Statistical Computing with R", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM2073", name: "Statistical Inference", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS2093", name: "Data Structures and Algorithms", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MF2123", name: "Accounting and Finance", credits: "3 GPA", category: "COMPULSORY" },
        { code: "LC2353", name: "Advanced Communication Skills", credits: "3 GPA", category: "COMPULSORY" }
      ],
      "Semester IV": [
        { code: "CM2083", name: "Regression Analysis", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS2122", name: "Introduction to Artificial Intelligence", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS2112", name: "Business Analytical Techniques", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS2103", name: "Software Engineering", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MF2222", name: "Cost & Management Accounting", credits: "2 GPA", category: "COMPULSORY" },
        { code: "MF2233", name: "Financial Analysis", credits: "3 GPA", category: "COMPULSORY" },
        { code: "LC2463", name: "Conversation Analysis", credits: "3 GPA", category: "COMPULSORY" }
      ]
    },
    "Year 3": {
      "Semester V": [
        { code: "CS3212", name: "Advanced Database Management Systems", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS3223", name: "Data Mining and Data Warehousing", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS3273", name: "Introduction to Machine Learning", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS3242", name: "Computer Networks", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DS3013", name: "Research Methodology", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MF3113", name: "Operations Research", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MF3122", name: "Marketing for Analytics", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DS3993", name: "Group Project in Data Science", credits: "3 GPA", category: "COMPULSORY" }
      ],
      "Semester VI": [
        { code: "CS3253", name: "Big Data Analytics", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CM3023", name: "Financial Time Series Analysis", credits: "3 GPA", category: "COMPULSORY" },
        { code: "DS3993", name: "Group Project in Data Science", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CM3032", name: "Bayesian Data Analysis", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CM3042", name: "Categorical Data Analysis", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CM3052", name: "Multivariate Data Analysis", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS3263", name: "Professional Practices and IT Law", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MF3212", name: "Operation Management", credits: "2 GPA", category: "COMPULSORY" },
        { code: "LC3673", name: "Discourse Communication", credits: "3 GPA", category: "COMPULSORY" }
      ]
    },
    "Year 4": {
      "Semester VII": [
        { code: "CS41172", name: "Image Processing and Computer Vision", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DS41012", name: "Data Management and Governance", credits: "2 GPA", category: "COMPULSORY" },
        { code: "SE41052", name: "Project Management for Data Science", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS41142", name: "Natural Language Processing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS41052", name: "Semantic Web and Ontology", credits: "2 GPA", category: "ELECTIVE" },
        { code: "DS41022", name: "Spatial Data Analysis", credits: "2 GPA", category: "ELECTIVE" },
        { code: "DS41032", name: "Emerging Trends in Data Science", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS41182", name: "Parallel Computing", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS41152", name: "Information Security", credits: "2 GPA", category: "ELECTIVE" },
        { code: "MF4122", name: "Strategic Business Analysis", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DS42999", name: "Individual Research Project (Carried throughout Sem 7 & Sem 8)", credits: "Major Project", category: "COMPULSORY" }
      ]
    }
  },

  "BSc (Hons) in Data Science & Business Analytics": {
    "Year 1": {
      "Semester I": [
        { code: "CS1122", name: "Fundamentals of Data Science", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM1072", name: "Linear Algebra I", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM1063", name: "Calculus I", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS1012", name: "Fundamentals of Programming", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS1101", name: "Programming Laboratory", credits: "1 GPA", category: "COMPULSORY" },
        { code: "MF1122", name: "Principles of Management", credits: "2 GPA", category: "COMPULSORY" },
        { code: "MF1131", name: "Analysis of Business Environment", credits: "1 GPA", category: "COMPULSORY" },
        { code: "LC1133", name: "Introduction to Communication Skills", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MS1013", name: "Military Studies", credits: "4 MGPA", category: "COMPULSORY" }
      ],
      "Semester II": [
        { code: "DS12013", name: "Discrete Mathematics for Data Science", credits: "3 GPA", category: "COMPULSORY" },
        { code: "DS12022", name: "Linear Algebra I", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DS12033", name: "Statistical Inference", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS12052", name: "Object Oriented Programming", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DS12042", name: "Applied Statistical Computing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "MF1212", name: "Business Economics", credits: "2 GPA", category: "COMPULSORY" },
        { code: "LC1243", name: "Fundamentals of Business Communication", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MS1024", name: "Military Studies", credits: "Non-GPA", category: "COMPULSORY" }
      ]
    },
    "Year 2": {
      "Semester III": [
        { code: "CM2042", name: "Calculus II", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM2052", name: "Linear Algebra II", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM2062", name: "Statistical Computing with R", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CM2073", name: "Statistical Inference", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS2093", name: "Data Structures and Algorithms", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MF2123", name: "Accounting and Finance", credits: "3 GPA", category: "COMPULSORY" },
        { code: "LC2353", name: "Advanced Communication Skills", credits: "3 GPA", category: "COMPULSORY" }
      ],
      "Semester IV": [
        { code: "CM2083", name: "Regression Analysis", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS2122", name: "Introduction to Artificial Intelligence", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS2112", name: "Business Analytical Techniques", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS2103", name: "Software Engineering", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MF2222", name: "Cost & Management Accounting", credits: "2 GPA", category: "COMPULSORY" },
        { code: "MF2233", name: "Financial Analysis", credits: "3 GPA", category: "COMPULSORY" },
        { code: "LC2463", name: "Conversation Analysis", credits: "3 GPA", category: "COMPULSORY" }
      ]
    },
    "Year 3": {
      "Semester V": [
        { code: "CS3212", name: "Advanced Database Management Systems", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS3223", name: "Data Mining and Data Warehousing", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS3273", name: "Introduction to Machine Learning", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CS3242", name: "Computer Networks", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DS3013", name: "Research Methodology", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MF3113", name: "Operations Research", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MF3122", name: "Marketing for Analytics", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DS3993", name: "Group Project in Data Science", credits: "3 GPA", category: "COMPULSORY" }
      ],
      "Semester VI": [
        { code: "CS3253", name: "Big Data Analytics", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CM3023", name: "Financial Time Series Analysis", credits: "3 GPA", category: "COMPULSORY" },
        { code: "DS3993", name: "Group Project in Data Science", credits: "3 GPA", category: "COMPULSORY" },
        { code: "CM3032", name: "Bayesian Data Analysis", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CM3042", name: "Categorical Data Analysis", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CM3052", name: "Multivariate Data Analysis", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS3263", name: "Professional Practices and IT Law", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MF3212", name: "Operation Management", credits: "2 GPA", category: "COMPULSORY" },
        { code: "LC3673", name: "Discourse Communication", credits: "3 GPA", category: "COMPULSORY" }
      ]
    },
    "Year 4": {
      "Semester VII": [
        { code: "CS41172", name: "Image Processing and Computer Vision", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DS41012", name: "Data Management and Governance", credits: "2 GPA", category: "COMPULSORY" },
        { code: "SE41052", name: "Project Management for Data Science", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS41142", name: "Natural Language Processing", credits: "2 GPA", category: "COMPULSORY" },
        { code: "CS41052", name: "Semantic Web and Ontology", credits: "2 GPA", category: "ELECTIVE" },
        { code: "DS41022", name: "Spatial Data Analysis", credits: "2 GPA", category: "ELECTIVE" },
        { code: "DS41032", name: "Emerging Trends in Data Science", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS41182", name: "Parallel Computing", credits: "2 GPA", category: "ELECTIVE" },
        { code: "CS41152", name: "Information Security", credits: "2 GPA", category: "ELECTIVE" },
        { code: "MF4122", name: "Strategic Business Analysis", credits: "2 GPA", category: "COMPULSORY" },
        { code: "DS42999", name: "Individual Research Project (Carried throughout Sem 7 & Sem 8)", credits: "Major Project", category: "COMPULSORY" }
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

// Comprehensive curriculum catalogs for non-computing KDU faculties
export const FACULTY_FALLBACK_CURRICULUM = {
  "Faculty of Engineering": {
    "Year 1": {
      "Semester I": [
        { code: "EN1012", name: "Engineering Mathematics I", credits: "3 GPA", category: "COMPULSORY" },
        { code: "EN1022", name: "Engineering Mechanics", credits: "3 GPA", category: "COMPULSORY" },
        { code: "EN1032", name: "Computer Programming for Engineers", credits: "2 GPA", category: "COMPULSORY" },
        { code: "EN1042", name: "Engineering Drawing & CAD", credits: "2 GPA", category: "COMPULSORY" },
        { code: "EN1002", name: "Workshop Practice & Laboratory", credits: "1 GPA", category: "COMPULSORY" }
      ],
      "Semester II": [
        { code: "EN1052", name: "Engineering Mathematics II", credits: "3 GPA", category: "COMPULSORY" },
        { code: "EN1062", name: "Fluid Mechanics", credits: "3 GPA", category: "COMPULSORY" },
        { code: "EN1072", name: "Thermodynamics", credits: "3 GPA", category: "COMPULSORY" },
        { code: "EN1082", name: "Materials Science for Engineers", credits: "2 GPA", category: "COMPULSORY" },
        { code: "EN1092", name: "Basic Electrical Engineering", credits: "2 GPA", category: "COMPULSORY" }
      ]
    },
    "Year 2": {
      "Semester III": [
        { code: "EN2012", name: "Engineering Mathematics III", credits: "3 GPA", category: "COMPULSORY" },
        { code: "EN2022", name: "Solid Mechanics & Strength of Materials", credits: "3 GPA", category: "COMPULSORY" },
        { code: "EN2032", name: "Applied Electronics & Circuit Analysis", credits: "3 GPA", category: "COMPULSORY" },
        { code: "EN2042", name: "Collaborative Engineering Design Project", credits: "2 GPA", category: "COMPULSORY" }
      ],
      "Semester IV": [
        { code: "EN2052", name: "Numerical Methods for Engineers", credits: "3 GPA", category: "COMPULSORY" },
        { code: "EN2062", name: "Control Systems Engineering", credits: "3 GPA", category: "COMPULSORY" },
        { code: "EN2072", name: "Applied Thermodynamics & Heat Transfer", credits: "3 GPA", category: "COMPULSORY" },
        { code: "EN2082", name: "Engineering Economics & Project Management", credits: "2 GPA", category: "COMPULSORY" }
      ]
    }
  },

  "Faculty of Management, Social Sciences & Humanities": {
    "Year 1": {
      "Semester I": [
        { code: "MG1012", name: "Principles of Management", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MG1022", name: "Financial Accounting", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MG1032", name: "Business Mathematics", credits: "2 GPA", category: "COMPULSORY" },
        { code: "MG1042", name: "Microeconomics", credits: "3 GPA", category: "COMPULSORY" }
      ],
      "Semester II": [
        { code: "MG1052", name: "Macroeconomics", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MG1062", name: "Business Statistics", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MG1072", name: "Marketing Management", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MG1082", name: "Organizational Behavior & Group Dynamics", credits: "2 GPA", category: "COMPULSORY" }
      ]
    },
    "Year 2": {
      "Semester III": [
        { code: "MG2012", name: "Cost & Management Accounting", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MG2022", name: "Human Resource Management", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MG2032", name: "Operations & Supply Chain Management", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MG2042", name: "Business Project in Management", credits: "2 GPA", category: "COMPULSORY" }
      ],
      "Semester IV": [
        { code: "MG2052", name: "Financial Management", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MG2062", name: "Management Information Systems", credits: "3 GPA", category: "COMPULSORY" },
        { code: "MG2072", name: "Business Law & Ethics", credits: "2 GPA", category: "COMPULSORY" }
      ]
    }
  },

  "Faculty of Technology": {
    "Year 1": {
      "Semester I": [
        { code: "TC1012", name: "Mathematics for Technology", credits: "3 GPA", category: "COMPULSORY" },
        { code: "TC1022", name: "Electronics Fundamentals", credits: "3 GPA", category: "COMPULSORY" },
        { code: "TC1032", name: "Programming Principles for Technology", credits: "2 GPA", category: "COMPULSORY" }
      ],
      "Semester II": [
        { code: "TC1042", name: "Data Communication & Computer Networks", credits: "3 GPA", category: "COMPULSORY" },
        { code: "TC1052", name: "Database Technology", credits: "3 GPA", category: "COMPULSORY" },
        { code: "TC1062", name: "Web Application Technologies", credits: "2 GPA", category: "COMPULSORY" }
      ]
    },
    "Year 2": {
      "Semester III": [
        { code: "TC2012", name: "Applied Operating Systems", credits: "3 GPA", category: "COMPULSORY" },
        { code: "TC2022", name: "Internet of Things (IoT) Systems", credits: "3 GPA", category: "COMPULSORY" },
        { code: "TC2032", name: "Technology Group Development Project", credits: "2 GPA", category: "COMPULSORY" }
      ],
      "Semester IV": [
        { code: "TC2042", name: "Information Security for Technology", credits: "3 GPA", category: "COMPULSORY" },
        { code: "TC2052", name: "Cloud & Virtualization Technologies", credits: "3 GPA", category: "COMPULSORY" }
      ]
    }
  },

  "Faculty of Law": {
    "Year 1": {
      "Semester I": [
        { code: "LW1012", name: "Legal Method & Sri Lankan Legal System", credits: "3 GPA", category: "COMPULSORY" },
        { code: "LW1022", name: "Constitutional Law I", credits: "3 GPA", category: "COMPULSORY" },
        { code: "LW1032", name: "Criminal Law I", credits: "3 GPA", category: "COMPULSORY" }
      ],
      "Semester II": [
        { code: "LW1042", name: "Law of Contract", credits: "3 GPA", category: "COMPULSORY" },
        { code: "LW1052", name: "Constitutional Law II", credits: "3 GPA", category: "COMPULSORY" },
        { code: "LW1062", name: "Human Rights Law", credits: "2 GPA", category: "COMPULSORY" }
      ]
    },
    "Year 2": {
      "Semester III": [
        { code: "LW2012", name: "Law of Delict / Torts", credits: "3 GPA", category: "COMPULSORY" },
        { code: "LW2022", name: "Public International Law", credits: "3 GPA", category: "COMPULSORY" },
        { code: "LW2032", name: "Moot Court & Trial Advocacy Simulation", credits: "2 GPA", category: "COMPULSORY" }
      ]
    }
  },

  "Faculty of Allied Health Sciences": {
    "Year 1": {
      "Semester I": [
        { code: "AH1012", name: "Human Anatomy", credits: "3 GPA", category: "COMPULSORY" },
        { code: "AH1022", name: "Human Physiology I", credits: "3 GPA", category: "COMPULSORY" },
        { code: "AH1032", name: "Biochemistry", credits: "2 GPA", category: "COMPULSORY" }
      ],
      "Semester II": [
        { code: "AH1042", name: "Human Physiology II", credits: "3 GPA", category: "COMPULSORY" },
        { code: "AH1052", name: "Pathology & Microbiology", credits: "3 GPA", category: "COMPULSORY" },
        { code: "AH1062", name: "Clinical Skills & Patient Care Group Lab", credits: "2 GPA", category: "COMPULSORY" }
      ]
    },
    "Year 2": {
      "Semester III": [
        { code: "AH2012", name: "Pharmacology & Therapeutics", credits: "3 GPA", category: "COMPULSORY" },
        { code: "AH2022", name: "Epidemiology & Community Health", credits: "3 GPA", category: "COMPULSORY" }
      ]
    }
  }
};

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

  const normYear = year?.includes("1") ? "Year 1"
    : year?.includes("2") ? "Year 2"
    : year?.includes("3") ? "Year 3"
    : year?.includes("4") ? "Year 4"
    : "Year 1";

  // 1. Direct match by degree name in DEGREE_CURRICULUM
  const degLower = (degree || '').toLowerCase();
  const normDegree = Object.keys(DEGREE_CURRICULUM).find((d) => {
    const dLower = d.toLowerCase();
    if (degLower === dLower) return true;
    if (degLower.includes(dLower) || dLower.includes(degLower)) return true;
    if ((degLower.includes('data science') || degLower.includes('dba') || degLower.includes('business analytics')) &&
        (dLower.includes('data science') || dLower.includes('dba'))) return true;
    if ((degLower.includes('information technology') || degLower === 'it' || degLower.includes('it stream')) &&
        dLower.includes('information technology')) return true;
    if ((degLower.includes('information systems') || degLower === 'is' || degLower.includes('is stream')) &&
        dLower.includes('information systems')) return true;
    return false;
  });

  if (normDegree && DEGREE_CURRICULUM[normDegree]?.[normYear]?.[semester]) {
    return DEGREE_CURRICULUM[normDegree][normYear][semester];
  }

  // 2. Direct match by Faculty catalog in FACULTY_FALLBACK_CURRICULUM
  const normFaculty = Object.keys(FACULTY_FALLBACK_CURRICULUM).find(
    (f) => faculty?.toLowerCase().includes(f.toLowerCase()) || f.toLowerCase().includes(faculty?.toLowerCase())
  );

  if (normFaculty && FACULTY_FALLBACK_CURRICULUM[normFaculty]?.[normYear]?.[semester]) {
    return FACULTY_FALLBACK_CURRICULUM[normFaculty][normYear][semester];
  }

  // 3. Fallback to computing semester catalog
  const firstMatch = DEGREE_CURRICULUM["BSc (Hons) Computer Science"]?.[normYear]?.[semester];
  if (firstMatch) return firstMatch;

  return DEFAULT_FALLBACK_MODULES;
};

// ====================================================================
// KDU Prerequisite & Benchmark Subject Knowledge Base
// Maps target project modules to their foundation prerequisite modules
// ====================================================================
export const CURRICULUM_PREREQUISITES = {
  // English & Communication Skills Sequence
  "DL2142": { code: "DL1132", name: "English: Basic Study Skills for CS/SE/CE", reason: "Basic English study skills" },
  "DL3152": { code: "DL2142", name: "English: Advance Study Skills for CS/SE/CE", reason: "Advanced academic English & study skills" },
  "DL4162": { code: "DL3152", name: "Writing and Speaking Skills", reason: "Academic writing & speaking foundation" },

  // Management, Leadership & Defence
  "MF2112": { code: "LS1052", name: "Leadership Training", reason: "Organizational & leadership baseline" },
  "MS3032": { code: "LS1052", name: "Leadership Training", reason: "Leadership & strategic defence studies" },
  "CS31012": { code: "MF2112", name: "Principles of Management", reason: "Professional legal and managerial context" },
  "SE31022": { code: "MF2112", name: "Principles of Management", reason: "Engineering economics & financial principles" },

  // Year 1 Semester II
  "CS12012": { code: "CS11012", name: "Fundamentals of Programming", reason: "Web script & coding baseline" },
  "CS12023": { code: "CS11012", name: "Fundamentals of Programming", reason: "Foundational programming & syntax" },
  "CS12033": { code: "COE11013", name: "Computer Systems Architecture", reason: "Hardware & architecture baseline" },
  "CS12041": { code: "CS11012", name: "Fundamentals of Programming", reason: "Media scripting & tools" },
  "SE12012": { code: "SE11012", name: "Software Development Methodologies", reason: "Software process & engineering basics" },
  "CM12052": { code: "CM11102", name: "Mathematics for Computing", reason: "Mathematical logic & discrete structures" },
  "COE12241": { code: "COE11013", name: "Computer Systems Architecture", reason: "Digital logic & electronics" },
  "COE12992": { code: "COE11013", name: "Computer Systems Architecture", reason: "Hardware design & architecture" },
  
  // Year 2 Semester III
  "CS21012": { code: "COE11013", name: "Computer Systems Architecture", reason: "OS processes & architecture concepts" },
  "CS21022": { code: "CS12023", name: "Object Oriented Programming", reason: "Data structures require strong OOP" },
  "CS21032": { code: "CS12023", name: "Object Oriented Programming", reason: "OOP mastery required for Advanced OOP" },
  "CS21042": { code: "CS12033", name: "Computer Networks", reason: "Networking fundamentals" },
  "CS21052": { code: "CS12012", name: "Web Development", reason: "Core web development required" },
  "CS22993": { code: "SE11012", name: "Software Development Methodologies", reason: "Software lifecycle & collaborative dev" },
  "SE21012": { code: "SE12012", name: "Software Analysis and Modeling", reason: "UML & modeling required for requirements" },
  "CM21032": { code: "CM11033", name: "Probability and Statistics", reason: "Statistical distribution background" },
  "CM21102": { code: "CM11102", name: "Mathematics for Computing", reason: "Foundational calculus baseline" },

  // Year 2 Semester IV
  "CS22012": { code: "CS21022", name: "Data Structures and Algorithms", reason: "Algorithm analysis & advanced data structures" },
  "CS22023": { code: "CS21022", name: "Data Structures and Algorithms", reason: "AI search heuristics & algorithms" },
  "SE22013": { code: "SE21012", name: "Requirements Engineering", reason: "Project management & scoping" },
  "SE22022": { code: "SE12012", name: "Software Analysis and Modeling", reason: "Architectural patterns & modeling" },
  "COE22032": { code: "COE12241", name: "Fundamentals of Electronics", reason: "Microprocessor & interfacing hardware" },
  "CM22112": { code: "CM21102", name: "Calculus", reason: "Numerical approximations & calculus" },

  // Year 3 Semester V & VI
  "CS31022": { code: "CM11033", name: "Probability and Statistics", reason: "Empirical data analysis & research" },
  "CS31032": { code: "CS21032", name: "Advanced Object Oriented Programming", reason: "Mobile app architecture & OOP" },
  "CS31042": { code: "CS21042", name: "Advanced Computer Networks", reason: "Network security & protocols" },
  "CS31062": { code: "CS12012", name: "Web Development", reason: "UX & UI front-end design foundation" },
  "CS31072": { code: "CS11042", name: "Fundamentals of Databases (incl. Practical)", reason: "Database concepts & data management" },
  "SE31012": { code: "SE22022", name: "Software Architecture", reason: "Software construction & design patterns" },
  "CS32023": { code: "CS22023", name: "Artificial Intelligence", reason: "AI reasoning foundation for ML" },
  "CS32032": { code: "CS31042", name: "Computer and Network Security", reason: "Advanced security defense" },
  "CS32042": { code: "CS31042", name: "Computer and Network Security", reason: "Information security & protocols" },
  "CS32043": { code: "CS22012", name: "Advanced Data Structures and Algorithms", reason: "Data mining & algorithmic complexity" },
  "CS32092": { code: "CS22023", name: "Artificial Intelligence", reason: "Machine learning foundation" },
  "SE32012": { code: "SE21012", name: "Requirements Engineering", reason: "Verification and validation standards" },
  "SE32022": { code: "CS21052", name: "Advanced Web Development", reason: "Rapid application frameworks" },
  "SE32992": { code: "CS31022", name: "Research Methodology", reason: "Independent research study foundation" },
  "CM32051": { code: "CM21032", name: "Statistical Distributions and Inference", reason: "Statistical computing tools" },

  // Year 4 Semester VII
  "CS4012": { code: "CS11032", name: "Foundation of Computer Science", reason: "Theoretical computer science trends" },
  "CS4022": { code: "CS11012", name: "Fundamentals of Programming", reason: "Programming language paradigms" },
  "CS4032": { code: "CS22023", name: "Artificial Intelligence", reason: "Natural language & cognitive computing" },
  "CS4042": { code: "CS32092", name: "Machine Learning", reason: "Advanced machine learning models" },
  "SE4012": { code: "SE12012", name: "Software Analysis and Modeling", reason: "Formal software verification" },
  "SE4022": { code: "SE22022", name: "Software Architecture", reason: "Software evolution and maintenance" },
  "SE4042": { code: "SE32012", name: "Software Verification and Validation", reason: "Quality assurance & testing" },
  "CS4999": { code: "CS31022", name: "Research Methodology", reason: "Final individual research project" },
  "SE4999": { code: "SE32992", name: "Independent Research Study", reason: "Final SE research project" },

  // IT & IS Stream Prerequisite Mappings
  "IT1083": { code: "IT1043", name: "Fundamentals of Computer Systems", reason: "Hardware & architecture baseline" },
  "IT1093": { code: "IT1033", name: "Fundamentals of Computer Programming", reason: "Programming concepts for OOP" },
  "IT1103": { code: "IT1022", name: "Information Technology Concepts", reason: "IT concepts baseline for systems analysis" },
  "IT1113": { code: "IT1033", name: "Fundamentals of Computer Programming", reason: "Data storage & logic baseline" },
  "IT1992": { code: "IT1062", name: "Fundamentals of Visual Computing", reason: "Visual computing project foundation" },
  "IT1122": { code: "IT1043", name: "Fundamentals of Computer Systems", reason: "Systems & embedded IoT foundation" },
  "CM1042": { code: "CM1023", name: "Mathematics for IT - I", reason: "Foundational mathematics for statistics" },
  "DL2192": { code: "DL1172", name: "English Study Skills for ICT", reason: "Communication & study skills baseline" },

  "IT2022": { code: "IT1083", name: "Computer Systems Architecture", reason: "Systems architecture for networking" },
  "IT2032": { code: "IT1093", name: "Object Oriented Programming", reason: "OOP mastery for design patterns" },
  "IT2043": { code: "IT1113", name: "Fundamentals of Database Management Skills", reason: "Database skills for data management" },
  "IT2053": { code: "IT1093", name: "Object Oriented Programming", reason: "OOP logic for rapid application dev" },
  "IT2063": { code: "IT1103", name: "System Analysis and Design", reason: "Analysis & modeling for software engineering" },
  "IT2072": { code: "IT1062", name: "Fundamentals of Visual Computing", reason: "Visual design for UI/UX engineering" },
  "CM2022": { code: "CM1023", name: "Mathematics for IT - I", reason: "Discrete & computational mathematics" },
  "DL24202": { code: "DL2192", name: "Presentation Skills for ICT", reason: "Presentation skills for professional speaking" },

  "IT2082": { code: "IT2053", name: "Rapid Application Development", reason: "Web application development baseline" },
  "IT2093": { code: "IT1093", name: "Object Oriented Programming", reason: "OOP for data structures & algorithms" },
  "IT2103": { code: "IT2022", name: "Computer Network Systems I", reason: "Foundational networking for Network Systems II" },
  "IT2992": { code: "IT2063", name: "Software Engineering", reason: "Software engineering baseline for industry project" },
  "IT2113": { code: "IT2063", name: "Software Engineering", reason: "Software process & project management" },
  "IT2122": { code: "IT1083", name: "Computer Systems Architecture", reason: "Computer architecture for operating systems" },
  "IT2132": { code: "CM1042", name: "Basic Probability and Statistics", reason: "Statistical foundations for research methodology" },
  "CM2032": { code: "CM1042", name: "Basic Probability and Statistics", reason: "Probability baseline for statistical inference" },
  "MF2212": { code: "MF1112", name: "Principles of Management", reason: "General management for human resources" },
  "DL29302": { code: "DL24202", name: "Writing and Speaking Skills", reason: "Writing skills for research papers" },

  "IT3023": { code: "IT1062", name: "Fundamentals of Visual Computing", reason: "Visual computing for advanced multimedia" },
  "IT3033": { code: "IT2103", name: "Computer Network Systems II", reason: "Network infrastructure for information security" },
  "IT3043": { code: "IT2103", name: "Computer Network Systems II", reason: "Advanced network architecture baseline" },
  "IT3052": { code: "IT2053", name: "Rapid Application Development", reason: "Development frameworks & libraries" },
  "IT3063": { code: "IT2082", name: "Web Technologies", reason: "Web standards for advanced web technologies" },
  "IT3072": { code: "IT2043", name: "Data and Information Management", reason: "Enterprise data architecture for ERP" },
  "IT3082": { code: "MF1112", name: "Principles of Management", reason: "Managerial context for IT law & ethics" },
  "IT3093": { code: "IT2053", name: "Rapid Application Development", reason: "Application development for mobile platforms" },

  "IS3022": { code: "MF1112", name: "Principles of Management", reason: "Management foundation for costing" },
  "IS3042": { code: "MF1112", name: "Principles of Management", reason: "Economic analysis in management" },
  "IS3053": { code: "MF1112", name: "Principles of Management", reason: "Strategic leadership & business management" },
  "IS3062": { code: "IT2043", name: "Data and Information Management", reason: "Information assets for knowledge management" },
  "CM3013": { code: "CM2032", name: "Statistical Distribution and Inference", reason: "Quantitative methods for operational research" },

  "IT3103": { code: "IT3063", name: "Advanced Web Technologies", reason: "Web services & SOA architecture" },
  "IT3113": { code: "IT3033", name: "Information and Data Security", reason: "Security concepts for cybersecurity" },
  "IT3123": { code: "IT3043", name: "Advanced Computer Network Systems I", reason: "Networking baseline for virtualization & cloud" },
  "IT3133": { code: "IT2093", name: "Data Structures and Algorithms", reason: "Algorithms for distributed systems" },
  "IT3143": { code: "IT2132", name: "Research Methodology", reason: "Research methodology for independent study" },
  "IT3153": { code: "IT2063", name: "Software Engineering", reason: "Software process for quality assurance" },
  "IT3162": { code: "IT2043", name: "Data and Information Management", reason: "Spatial data management for GIS" },
  "IT3182": { code: "IT2093", name: "Data Structures and Algorithms", reason: "Algorithmic thinking for AI" },

  "IS3073": { code: "IT2043", name: "Data and Information Management", reason: "Information systems & database baseline" },
  "IS3112": { code: "MF1112", name: "Principles of Management", reason: "Management principles for marketing" },
  "IS3083": { code: "IT2082", name: "Web Technologies", reason: "Web platforms for e-commerce" },
  "IS3093": { code: "IS3022", name: "Accounting Principles and Costing", reason: "Financial accounting principles" },
  "IS3102": { code: "MF1112", name: "Principles of Management", reason: "Organizational behavior & dynamics" },

  // Data Science & Business Analytics (DBA) Prerequisite Mappings
  "DS12013": { code: "CM1072", name: "Linear Algebra I", reason: "Mathematical foundations for discrete structures" },
  "DS12022": { code: "CM1072", name: "Linear Algebra I", reason: "Vector spaces & matrix operations" },
  "DS12033": { code: "CM1063", name: "Calculus I", reason: "Continuous probability distributions" },
  "CS12052": { code: "CS1012", name: "Fundamentals of Programming", reason: "Programming syntax for OOP" },
  "DS12042": { code: "CS1012", name: "Fundamentals of Programming", reason: "Programming for statistical computing" },
  "MF1212": { code: "MF1122", name: "Principles of Management", reason: "Managerial economics foundation" },
  "LC1243": { code: "LC1133", name: "Introduction to Communication Skills", reason: "Communication skills for business" },

  "CM2042": { code: "CM1063", name: "Calculus I", reason: "Single variable calculus for multivariable calculus" },
  "CM2052": { code: "DS12022", name: "Linear Algebra I", reason: "Advanced linear algebra & eigenvalues" },
  "CM2062": { code: "DS12042", name: "Applied Statistical Computing", reason: "Statistical scripting in R" },
  "CM2073": { code: "DS12033", name: "Statistical Inference", reason: "Parametric & hypothesis testing" },
  "CS2093": { code: "CS12052", name: "Object Oriented Programming", reason: "OOP foundation for data structures" },
  "MF2123": { code: "MF1122", name: "Principles of Management", reason: "Managerial finance & accounting" },
  "LC2353": { code: "LC1243", name: "Fundamentals of Business Communication", reason: "Professional business communication" },

  "CM2083": { code: "CM2073", name: "Statistical Inference", reason: "Hypothesis testing for regression models" },
  "CS2122": { code: "CS2093", name: "Data Structures and Algorithms", reason: "Search algorithms & heuristic structures" },
  "CS2112": { code: "CM2062", name: "Statistical Computing with R", reason: "Statistical packages for business analytics" },
  "CS2103": { code: "CS12052", name: "Object Oriented Programming", reason: "OOP & software lifecycle" },
  "MF2222": { code: "MF2123", name: "Accounting and Finance", reason: "Accounting principles for cost management" },
  "MF2233": { code: "MF2123", name: "Accounting and Finance", reason: "Financial statements & corporate analysis" },
  "LC2463": { code: "LC2353", name: "Advanced Communication Skills", reason: "Discourse & conversation linguistics" },

  "CS3212": { code: "CS12052", name: "Object Oriented Programming", reason: "Database storage & relational models" },
  "CS3223": { code: "CS2112", name: "Business Analytical Techniques", reason: "Analytical modeling for data warehousing" },
  "CS3273": { code: "CS2122", name: "Introduction to Artificial Intelligence", reason: "AI foundation for machine learning" },
  "CS3242": { code: "CS1012", name: "Fundamentals of Programming", reason: "Network programming & distributed protocols" },
  "DS3013": { code: "CM2083", name: "Regression Analysis", reason: "Empirical research methodology" },
  "MF3113": { code: "CM2083", name: "Regression Analysis", reason: "Mathematical optimization in operations" },
  "MF3122": { code: "CS2112", name: "Business Analytical Techniques", reason: "Customer segmentation & analytics" },
  "DS3993": { code: "CS2103", name: "Software Engineering", reason: "Collaborative data science group project" },

  "CS3253": { code: "CS3223", name: "Data Mining and Data Warehousing", reason: "Distributed data storage for big data" },
  "CM3023": { code: "CM2083", name: "Regression Analysis", reason: "Time series forecasting & regression" },
  "CM3032": { code: "CM2073", name: "Statistical Inference", reason: "Bayesian prior distributions" },
  "CM3042": { code: "CM2073", name: "Statistical Inference", reason: "Contingency tables & categorical data" },
  "CM3052": { code: "CM2052", name: "Linear Algebra II", reason: "Multivariate matrix operations & PCA" },
  "CS3263": { code: "MF1122", name: "Principles of Management", reason: "Ethics & IT jurisprudence" },
  "MF3212": { code: "MF3113", name: "Operations Research", reason: "Production scheduling & operations" },
  "LC3673": { code: "LC2463", name: "Conversation Analysis", reason: "Discourse & rhetorical communication" },

  "CS41172": { code: "CS3273", name: "Introduction to Machine Learning", reason: "Convolutional filters & vision models" },
  "DS41012": { code: "CS3212", name: "Advanced Database Management Systems", reason: "Data stewardship & governance" },
  "SE41052": { code: "DS3993", name: "Group Project in Data Science", reason: "Agile analytics & project delivery" },
  "CS41142": { code: "CS3273", name: "Introduction to Machine Learning", reason: "Language tokenization & embeddings" },
  "CS41052": { code: "CS3212", name: "Advanced Database Management Systems", reason: "Knowledge graphs & RDF" },
  "DS41022": { code: "CM2083", name: "Regression Analysis", reason: "Geostatistical models & spatial GIS" },
  "DS41032": { code: "CS3253", name: "Big Data Analytics", reason: "Current frontiers in data science" },
  "CS41182": { code: "CS3242", name: "Computer Networks", reason: "Multi-threaded & cluster computing" },
  "CS41152": { code: "CS3242", name: "Computer Networks", reason: "Data security & cryptographic protection" },
  "MF4122": { code: "MF3122", name: "Marketing for Analytics", reason: "Competitive intelligence & business strategy" },
  "DS42999": { code: "DS3013", name: "Research Methodology", reason: "Final individual data science thesis" }
};

// Retrieve intelligent prerequisite recommendation for a given target module
export const getPrerequisiteRecommendation = (targetModuleCode) => {
  if (!targetModuleCode) return null;
  if (CURRICULUM_PREREQUISITES[targetModuleCode]) {
    return CURRICULUM_PREREQUISITES[targetModuleCode];
  }

  // Dynamic heuristics based on subject name or code
  const upper = targetModuleCode.toUpperCase();
  if (upper.startsWith("CS11") || upper.startsWith("COE11") || upper.startsWith("CM11") || upper.startsWith("SE11") || upper.startsWith("IT10") || upper.startsWith("CS10")) {
    return { code: "AL_ZSCORE", name: "A/L Z-Score & School Aptitude Intake", reason: "Direct school intake foundation" };
  }
  if (upper.startsWith("LC") || upper.startsWith("DL") || upper.includes("ENGLISH") || upper.includes("WRITING") || upper.includes("COMMUNICATION")) {
    return { code: "DL1172", name: "English Study Skills for ICT", reason: "Foundational academic communication" };
  }
  if (upper.startsWith("DS") || upper.includes("DATA SCIENCE")) {
    return { code: "CS1122", name: "Fundamentals of Data Science", reason: "Data science concepts baseline" };
  }
  if (upper.startsWith("MF") || upper.startsWith("LS") || upper.startsWith("MS") || upper.includes("MANAGEMENT") || upper.includes("LEADER")) {
    return { code: "LS1052", name: "Leadership Training", reason: "Organizational & leadership baseline" };
  }
  if (upper.includes("SE") || upper.includes("PROJECT")) {
    return { code: "SE11012", name: "Software Development Methodologies", reason: "Software process & teamwork foundation" };
  }
  if (upper.includes("CM") || upper.includes("MATH") || upper.includes("CALCULUS") || upper.includes("STAT")) {
    return { code: "CM11102", name: "Mathematics for Computing", reason: "Foundational mathematics" };
  }
  if (upper.startsWith("COE") || upper.includes("HARDWARE") || upper.includes("ELECTRONIC")) {
    return { code: "COE11013", name: "Computer Systems Architecture", reason: "Hardware & digital architecture foundation" };
  }
  if (upper.includes("WEB") || upper.includes("DATABASE") || upper.includes("SQL")) {
    return { code: "CS11042", name: "Fundamentals of Databases (incl. Practical)", reason: "Data storage & information systems" };
  }
  if (upper.startsWith("IT")) {
    return { code: "IT1033", name: "Fundamentals of Computer Programming", reason: "Programming & computational logic" };
  }
  return { code: "CS11012", name: "Fundamentals of Programming", reason: "Core computing & logic foundation" };
};

// Order definition of academic progression
const SEMESTER_CHRONO_ORDER = [
  { year: "Year 1", sem: "Semester I", label: "Year 1 • Semester I" },
  { year: "Year 1", sem: "Semester II", label: "Year 1 • Semester II" },
  { year: "Year 2", sem: "Semester III", label: "Year 2 • Semester III" },
  { year: "Year 2", sem: "Semester IV", label: "Year 2 • Semester IV" },
  { year: "Year 3", sem: "Semester V", label: "Year 3 • Semester V" },
  { year: "Year 3", sem: "Semester VI", label: "Year 3 • Semester VI" },
  { year: "Year 4", sem: "Semester VII", label: "Year 4 • Semester VII" }
];

// Returns all curriculum modules that were taught strictly before currentYear & currentSemester
export const getAvailablePriorModules = (faculty, degree, currentYear, currentSemester) => {
  if (!currentYear || !currentSemester) return [];

  const normCurrYear = currentYear.includes("1") ? "Year 1"
    : currentYear.includes("2") ? "Year 2"
    : currentYear.includes("3") ? "Year 3"
    : currentYear.includes("4") ? "Year 4"
    : "Year 1";

  const currentIndex = SEMESTER_CHRONO_ORDER.findIndex(
    s => s.year === normCurrYear && s.sem.toLowerCase() === currentSemester.toLowerCase()
  );

  // If Semester I of Year 1, no prior university modules exist (only A/L Z-Score)
  if (currentIndex <= 0) {
    return [
      { code: "AL_ZSCORE", name: "A/L Z-Score (Direct School Intake)", credits: "Intake Metric", category: "FOUNDATION" }
    ];
  }

  const priorModules = [];

  // Always offer A/L Z-Score as a foundational fallback option
  priorModules.push({
    code: "AL_ZSCORE",
    name: "A/L Z-Score (Direct School Intake)",
    credits: "School Intake",
    category: "FOUNDATION"
  });

  // Collect all modules from prior semesters in chronological order
  for (let i = 0; i < currentIndex; i++) {
    const priorSem = SEMESTER_CHRONO_ORDER[i];
    const mods = getCurriculumModules(faculty, degree, priorSem.year, priorSem.sem);
    mods.forEach(m => {
      if (!priorModules.some(p => p.code === m.code)) {
        priorModules.push({
          ...m,
          semesterLabel: priorSem.label
        });
      }
    });
  }

  return priorModules;
};

// Deterministically compute or retrieve a realistic student score for a specific module or prerequisite
export const getStudentModuleScore = (student, moduleCode, baseTechScore = 75) => {
  if (!student) return 75;

  // 1. If checking A/L Z-Score foundation
  if (moduleCode === "AL_ZSCORE") {
    const rawZ = student.module_scores?.["AL_ZSCORE"] 
      ?? student.module_scores?.["Z_SCORE"] 
      ?? student.al_zscore 
      ?? student.z_score;
    if (rawZ !== undefined && rawZ !== null && rawZ !== '') {
      const z = parseFloat(rawZ);
      if (!isNaN(z)) {
        // Z-scores in Sri Lanka typically range from -1.5 to ~2.8.
        // Normalize [-2.0, 3.0] into a 35 - 100 scale:
        const normalized = Math.round(((z + 2.0) / 5.0) * 65 + 35);
        return Math.min(100, Math.max(30, normalized));
      }
    }
    return student.technical_score || baseTechScore || 75;
  }

  // 2. If student already has explicit module_scores stored
  if (student.module_scores && student.module_scores[moduleCode] !== undefined) {
    const raw = student.module_scores[moduleCode];
    const num = parseFloat(raw);
    if (!isNaN(num) && num > 0) return Math.min(100, Math.max(30, Math.round(num)));
  }

  // 3. Deterministic pseudo-random variation based on student_id and moduleCode
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

// Classifies a module into its academic subject areas/domains
export const getModuleAcademicDomains = (mod) => {
  if (!mod) return [];
  const code = (mod.code || '').toUpperCase().trim();
  const name = (mod.name || '').toUpperCase().trim();
  const text = `${code} ${name}`;
  const domains = [];

  // 1. English, Writing, Linguistics & Professional Communication
  if (
    code.startsWith('DL') ||
    code.startsWith('LC') ||
    text.includes('ENGLISH') ||
    text.includes('WRITING') ||
    text.includes('SPEAKING') ||
    text.includes('STUDY SKILLS') ||
    text.includes('COMMUNICATION SKILLS') ||
    text.includes('BUSINESS COMMUNICATION') ||
    text.includes('DISCOURSE COMMUNICATION') ||
    text.includes('CONVERSATION ANALYSIS') ||
    text.includes('PRESENTATION SKILLS') ||
    text.includes('LANGUAGE') ||
    text.includes('LITERATURE')
  ) {
    domains.push('ENGLISH_COMMUNICATION');
  }

  // 2. Management, Leadership, Strategic Defence & Economics
  if (
    code.startsWith('MF') ||
    code.startsWith('LS') ||
    code.startsWith('MS') ||
    code.startsWith('MGT') ||
    code.startsWith('LW') ||
    text.includes('MANAGEMENT') ||
    text.includes('LEADERSHIP') ||
    text.includes('DEFENCE STUDIES') ||
    text.includes('MILITARY STUDIES') ||
    text.includes('DEFENSE') ||
    text.includes('COMPUTER LAW') ||
    text.includes('IT LAW') ||
    text.includes('ENGINEERING ECONOMICS') ||
    text.includes('BUSINESS ECONOMICS') ||
    text.includes('ACCOUNTING') ||
    text.includes('FINANCIAL') ||
    text.includes('HUMAN RESOURCE') ||
    text.includes('BUSINESS ENVIRONMENT') ||
    text.includes('ORGANIZATIONAL BEHAVIOUR') ||
    text.includes('MARKETING') ||
    text.includes('OPERATIONS RESEARCH') ||
    text.includes('OPERATION MANAGEMENT') ||
    text.includes('BUSINESS ANALYSIS') ||
    text.includes('E-COMMERCE') ||
    text.includes('LAW')
  ) {
    domains.push('MANAGEMENT_LEADERSHIP');
  }

  // 3. Research Methodology & Academic Investigation
  if (
    text.includes('RESEARCH METHODOLOGY') ||
    text.includes('RESEARCH STUDY') ||
    text.includes('RESEARCH PROJECT') ||
    text.includes('RESEARCH WRITING') ||
    text.includes('INDEPENDENT RESEARCH') ||
    text.includes('INDIVIDUAL RESEARCH')
  ) {
    domains.push('RESEARCH_SKILLS');
  }

  // 4. Mathematics & Statistics
  if (
    code.startsWith('CM') ||
    code.startsWith('DS1201') ||
    code.startsWith('DS1202') ||
    code.startsWith('DS1203') ||
    text.includes('MATH') ||
    text.includes('CALCULUS') ||
    text.includes('STATISTIC') ||
    text.includes('PROBABILITY') ||
    text.includes('DISCRETE') ||
    text.includes('NUMERICAL') ||
    text.includes('ALGEBRA') ||
    text.includes('GEOMETRY') ||
    text.includes('REGRESSION') ||
    text.includes('TIME SERIES') ||
    text.includes('INFERENCE')
  ) {
    domains.push('MATHEMATICS');
  }

  // 5. Core Programming, Data Structures, Algorithms, AI, ML
  if (
    text.includes('PROGRAMMING') ||
    text.includes('DATA STRUCTURE') ||
    text.includes('ALGORITHM') ||
    text.includes('OBJECT ORIENTED') ||
    text.includes('OOP') ||
    text.includes('PYTHON') ||
    text.includes('JAVA') ||
    text.includes('LOGIC PROGRAMMING') ||
    text.includes('ARTIFICIAL INTELLIGENCE') ||
    text.includes('MACHINE LEARNING') ||
    text.includes('AUTOMATA') ||
    text.includes('NATURAL LANGUAGE') ||
    text.includes('COGNITIVE SYSTEMS') ||
    text.includes('BIOINFORMATICS') ||
    text.includes('COMPUTER GRAPHICS') ||
    text.includes('IMAGE PROCESSING')
  ) {
    domains.push('PROGRAMMING');
  }

  // 6. Software Engineering & Project Management
  if (
    code.startsWith('SE') ||
    text.includes('SOFTWARE') ||
    text.includes('REQUIREMENT') ||
    text.includes('SOFTWARE ARCHITECTURE') ||
    text.includes('ANALYSIS AND MODEL') ||
    text.includes('PROJECT MANAGEMENT') ||
    text.includes('METHODOLOG') ||
    text.includes('QUALITY ASSURANCE') ||
    text.includes('GROUP PROJECT') ||
    text.includes('VERIFICATION') ||
    text.includes('RAPID APPLICATION')
  ) {
    domains.push('SOFTWARE_ENG');
  }

  // 7. Systems, Hardware, Electronics, Microprocessors
  if (
    code.startsWith('COE') ||
    text.includes('HARDWARE') ||
    text.includes('COMPUTER SYSTEMS ARCHITECTURE') ||
    text.includes('ELECTRONIC') ||
    text.includes('MICROPROCESSOR') ||
    text.includes('MICROCONTROLLER') ||
    text.includes('INTERFACING') ||
    text.includes('OPERATING SYSTEM') ||
    text.includes('EMBEDDED') ||
    text.includes('DIGITAL LOGIC') ||
    text.includes('ROBOTICS')
  ) {
    domains.push('SYSTEMS_HARDWARE');
  }

  // 8. Networks, Telecom, Security
  if (
    text.includes('NETWORK') ||
    text.includes('SECURITY') ||
    (text.includes('COMMUNICATION') && !text.includes('WRITING') && !text.includes('SKILLS')) ||
    text.includes('WIRELESS') ||
    text.includes('CLOUD') ||
    text.includes('DISTRIBUTED') ||
    text.includes('TELECOMMUNICATION') ||
    text.includes('INTERNET OF THINGS')
  ) {
    domains.push('NETWORKS_SECURITY');
  }

  // 9. Web & Database Systems
  if (
    text.includes('WEB') ||
    text.includes('DATABASE') ||
    text.includes('DATA MANAGEMENT') ||
    text.includes('SQL') ||
    text.includes('MEDIA TOOLS') ||
    text.includes('UX AND UI') ||
    text.includes('DATA MINING') ||
    text.includes('BIG DATA') ||
    text.includes('GEOINFORMATICS')
  ) {
    domains.push('WEB_DATABASE');
  }

  // 10. Engineering Core (Civil, Mech, Electrical, Marine, Aero)
  if (
    text.includes('MECHANIC') ||
    text.includes('FLUID') ||
    text.includes('THERMO') ||
    text.includes('STATICS') ||
    text.includes('DYNAMICS') ||
    text.includes('MATERIAL') ||
    text.includes('STRUCTURE') ||
    text.includes('CIVIL') ||
    text.includes('ELECTRICAL') ||
    text.includes('AERONAUTICAL') ||
    text.includes('BIOMEDICAL') ||
    text.includes('NAVAL')
  ) {
    domains.push('ENGINEERING_CORE');
  }

  // 11. Health Sciences / Medicine
  if (
    code.startsWith('AH') ||
    text.includes('ANATOMY') ||
    text.includes('PHYSIOLOGY') ||
    text.includes('BIOCHEMISTRY') ||
    text.includes('PHARMACOLOGY') ||
    text.includes('PATHOLOGY') ||
    text.includes('PATIENT CARE')
  ) {
    domains.push('HEALTH_SCIENCES');
  }

  return domains;
};

// Retrieves ALL matching related prerequisite subjects from ALL prior semesters (Sem 1, Sem 2, etc.)
export const getAllPrerequisiteRecommendations = (targetModule, faculty, degree, currentYear, currentSemester) => {
  if (!targetModule || !currentSemester) return [];

  const normCurrYear = (currentYear || '').includes("1") ? "Year 1"
    : (currentYear || '').includes("2") ? "Year 2"
    : (currentYear || '').includes("3") ? "Year 3"
    : (currentYear || '').includes("4") ? "Year 4"
    : "Year 1";

  const currentIndex = SEMESTER_CHRONO_ORDER.findIndex(
    s => s.year === normCurrYear && s.sem.toLowerCase() === currentSemester.toLowerCase()
  );

  // If Semester I of Year 1, direct intake only
  if (currentIndex <= 0) {
    return [
      {
        code: "AL_ZSCORE",
        name: "G.C.E. A/L Intake Z-Score",
        semesterLabel: "Year 1 • Semester I",
        reason: "Direct School Intake Baseline"
      }
    ];
  }

  // Collect ALL prior semester modules chronologically from Semester I up to current
  const allPriorModules = [];
  for (let i = 0; i < currentIndex; i++) {
    const priorSem = SEMESTER_CHRONO_ORDER[i];
    const mods = getCurriculumModules(faculty, degree, priorSem.year, priorSem.sem);
    mods.forEach(m => {
      allPriorModules.push({
        ...m,
        semIndex: i,
        semesterLabel: priorSem.label
      });
    });
  }

  const targetDomains = getModuleAcademicDomains(targetModule);
  const targetCode = (targetModule.code || '').toUpperCase();
  const directPrereqCode = CURRICULUM_PREREQUISITES[targetCode]?.code?.toUpperCase();

  const matched = [];

  // Match prior modules across ALL prior semesters
  allPriorModules.forEach(priorMod => {
    const pCode = (priorMod.code || '').toUpperCase();
    const pDomains = getModuleAcademicDomains(priorMod);

    let isMatch = false;
    let matchReason = "";

    // A) Explicit direct prerequisite
    if (directPrereqCode && pCode === directPrereqCode) {
      isMatch = true;
      matchReason = CURRICULUM_PREREQUISITES[targetCode]?.reason || "Direct foundational requirement";
    }
    // B) Domain-based academic matching across all prior semesters
    else if (targetDomains.some(d => pDomains.includes(d))) {
      isMatch = true;
      if (targetDomains.includes('ENGLISH_COMMUNICATION')) {
        matchReason = "Prior English & academic communication foundation";
      } else if (targetDomains.includes('MANAGEMENT_LEADERSHIP')) {
        matchReason = "Management, leadership & organizational skills";
      } else if (targetDomains.includes('RESEARCH_SKILLS')) {
        matchReason = "Research methodology & analytical writing skills";
      } else if (targetDomains.includes('MATHEMATICS')) {
        matchReason = "Foundational mathematics & analytical methods";
      } else if (targetDomains.includes('PROGRAMMING')) {
        matchReason = "Core programming, algorithms & logic";
      } else if (targetDomains.includes('SOFTWARE_ENG')) {
        matchReason = "Software development & engineering process";
      } else if (targetDomains.includes('SYSTEMS_HARDWARE')) {
        matchReason = "Hardware & computer systems architecture";
      } else if (targetDomains.includes('NETWORKS_SECURITY')) {
        matchReason = "Networking & communications baseline";
      } else if (targetDomains.includes('WEB_DATABASE')) {
        matchReason = "Data handling & software structures";
      } else if (targetDomains.includes('ENGINEERING_CORE')) {
        matchReason = "Foundational engineering principles";
      } else {
        matchReason = "Related prior semester subject";
      }
    }

    if (isMatch && !matched.some(m => m.code === priorMod.code)) {
      matched.push({
        code: priorMod.code,
        name: priorMod.name,
        semesterLabel: priorMod.semesterLabel,
        semIndex: priorMod.semIndex,
        credits: priorMod.credits,
        category: priorMod.category,
        reason: matchReason
      });
    }
  });

  // Sort from most recent prior semester down to earliest prior semester (e.g. Sem 3, then Sem 2, then Sem 1)
  matched.sort((a, b) => b.semIndex - a.semIndex);

  // If no specific domain matches found, fallback to primary prerequisite or general foundation
  if (matched.length === 0) {
    const fallbackPrereq = getPrerequisiteRecommendation(targetModule.code);
    if (fallbackPrereq) {
      matched.push({
        code: fallbackPrereq.code,
        name: fallbackPrereq.name,
        semesterLabel: "Foundational Prerequisite",
        reason: fallbackPrereq.reason
      });
    }
  }

  return matched;
};

// Computes student's aggregate competency score across ALL matching related prerequisite modules from prior semesters
export const getStudentAggregateScore = (student, relatedModules, baseTechScore = 75) => {
  if (!student) return 75;
  if (!relatedModules || relatedModules.length === 0) {
    return student.technical_score || baseTechScore || 75;
  }

  // If 1st semester intake Z-score
  if (relatedModules.length === 1 && relatedModules[0].code === 'AL_ZSCORE') {
    return getStudentModuleScore(student, 'AL_ZSCORE', baseTechScore);
  }

  const foundMarks = [];
  relatedModules.forEach(mod => {
    if (student.module_scores && student.module_scores[mod.code] !== undefined) {
      const val = parseFloat(student.module_scores[mod.code]);
      if (!isNaN(val) && val > 0) {
        foundMarks.push(val);
      }
    }
  });

  if (foundMarks.length > 0) {
    // Average student competency across all completed matching subjects from prior semesters!
    const avg = foundMarks.reduce((a, b) => a + b, 0) / foundMarks.length;
    return Math.min(100, Math.max(30, Math.round(avg)));
  }

  // If student doesn't have explicit marks in these specific module codes yet,
  // compute deterministic baseline using the primary related module
  const primaryCode = relatedModules[0]?.code || 'CS11012';
  return getStudentModuleScore(student, primaryCode, baseTechScore);
};
