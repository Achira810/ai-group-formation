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
  const normDegree = Object.keys(DEGREE_CURRICULUM).find(
    (d) => degree?.toLowerCase().includes(d.toLowerCase()) || d.toLowerCase().includes(degree?.toLowerCase())
  );

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
  "CS32023": { code: "CS22023", name: "Artificial Intelligence", reason: "AI reasoning foundation for ML" },
  "CS32032": { code: "CS31042", name: "Computer and Network Security", reason: "Advanced security defense" },
  "CS32043": { code: "CS22012", name: "Advanced Data Structures and Algorithms", reason: "Data mining & algorithmic complexity" }
};

// Retrieve intelligent prerequisite recommendation for a given target module
export const getPrerequisiteRecommendation = (targetModuleCode) => {
  if (!targetModuleCode) return null;
  if (CURRICULUM_PREREQUISITES[targetModuleCode]) {
    return CURRICULUM_PREREQUISITES[targetModuleCode];
  }

  // Dynamic heuristics based on subject name or code
  const upper = targetModuleCode.toUpperCase();
  if (upper.startsWith("CS11") || upper.startsWith("COE11") || upper.startsWith("CM11") || upper.startsWith("SE11")) {
    return { code: "AL_ZSCORE", name: "A/L Z-Score & School Aptitude Intake", reason: "Direct school intake foundation" };
  }
  if (upper.includes("SE") || upper.includes("PROJECT")) {
    return { code: "SE11012", name: "Software Development Methodologies", reason: "Software process & teamwork foundation" };
  }
  if (upper.includes("CM") || upper.includes("MATH")) {
    return { code: "CM11102", name: "Mathematics for Computing", reason: "Foundational mathematics" };
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
