# GENERAL SIR JOHN KOTELAWALA DEFENCE UNIVERSITY
## DEPARTMENT OF COMPUTER SCIENCE / FACULTY OF COMPUTING
### ESSENTIALS OF ARTIFICIAL INTELLIGENCE (MODULE REPORT)

---

# 📑 STAGE 2: PROGRESS REVIEW REPORT
**Project Title**: AI-Based Intelligent Group Formation System for Balanced Academic Team Allocation  
**Module**: Essentials of Artificial Intelligence  
**Group Number**: Group 33  
**Submission Due**: Week 8 | **Weightage**: 10%  
**GitHub Repository**: [https://github.com/Achira810/ai-group-formation/tree/Dev-Achira](https://github.com/Achira810/ai-group-formation/tree/Dev-Achira)  

---

## 👥 Group Member Details

| Registration No. | Student Name | Degree Programme |
| :--- | :--- | :--- |
| **D/COE/25/0019** | S. R. Achira Hathsidu | B.Sc. (Hons) in Computer Engineering |
| **D/COE/25/0020** | Piravahiny Muraleetharan | B.Sc. (Hons) in Computer Engineering |
| **D/DBA/25/0031** | D. L. Niluminda | B.Sc. (Hons) in Data Science & Business Analytics |
| **D/DBA/25/0035** | W. S. Muthugala | B.Sc. (Hons) in Data Science & Business Analytics |
| **D/BIT/24/0081** | B. G. M. Banagala | B.Sc. (Hons) in Information Technology |

---

## 1. 📌 Updated Project Title and Problem Statement

### 1.1 Updated Project Title
**AI-Based Intelligent Group Formation System for Balanced Academic Team Allocation**

### 1.2 Updated Problem Statement
At Kotelawala Defence University (KDU), forming undergraduate student project groups has historically relied on manual, arbitrary methods—such as alphabetical order, random assignment, or student self-selection. 
- **Self-selected groups** frequently result in homogeneous skill cliques, leaving weaker students isolated and creating unbalanced team capabilities.
- **Random assignment** fails to account for variations in student technical skills, academic performance, and disciplinary backgrounds.
- **Manual allocation by lecturers** is time-consuming, prone to human error, and unscalable when handling large, multi-batch cohorts across various faculties (Computing, Engineering, Management, Allied Health, etc.).

Furthermore, 1st Year 1st Semester undergraduates have not yet established a university GPA, whereas senior students (2nd, 3rd, and 4th Years) possess GPA records. Existing systems fail to handle this hybrid scoring context or integrate seamless document ingestion (Excel/PDF lists). 

**Solution**: An intelligent, web-based group formation platform powered by **Fuzzy Logic Profiling** and a **Genetic Algorithm (GA) Optimization Engine** that ingests hybrid student academic data, enforces cross-disciplinary diversity, prevents duplicate entries, and balances team capabilities automatically.

---

## 2. 🔄 Changes Made After Proposal Feedback

Based on feedback received after Stage 1 Proposal Evaluation, the following key architectural and functional modifications were incorporated:

1. **Hybrid Academic Indicator Support (Z-Score vs. GPA)**:
   - *Proposal Feedback*: 1st Year students lack a university GPA.
   - *Implementation*: Introduced dynamic input selection. 1st Year students are evaluated based on their **A/L Z-Score (0.0 – 3.5)**, while 2nd–4th Year students are evaluated based on their **University GPA (0.0 – 4.0)**.

2. **Automated Multi-Format Document Ingestion (Excel & PDF)**:
   - *Proposal Feedback*: Manual single-student entry is impractical for large university batches.
   - *Implementation*: Integrated in-browser parsing for `.xlsx`, `.xls`, `.csv` (via SheetJS) and `.pdf` documents (via `pdfjs-dist`).

3. **Data Integrity & Duplicate Protection**:
   - *Implementation*: Added real-time Student ID validation and batch-import duplicate filtering to prevent redundant entries in the database.

4. **Dual Output Export (PDF & Excel)**:
   - *Implementation*: Added export support for both formatted university PDF reports (`jspdf`) and Microsoft Excel spreadsheets (`.xlsx`).

5. **Streamlined Tech Stack & Cloud Ingestion**:
   - *Implementation*: Transitioned from heavy Flask/Python backends to a high-performance **React 18 SPA + Node/Vite frontend** coupled with a **Java 17+ Genetic Algorithm engine** and **Supabase (PostgreSQL)** database.

---

## 3. 🧠 Finalized AI Techniques

The system employs a two-stage hybrid AI pipeline:

### 3.1 Stage 1: Fuzzy Logic Skill Profiler
The Fuzzy Logic system standardizes heterogeneous student academic indicators (A/L Z-Score for 1st Years and GPA for Seniors) into a unified **AI Technical Score ($T_s \in [0, 100]$)**.

### 3.2 Stage 2: Genetic Algorithm (GA) & Local Search Optimizer
A multi-objective Genetic Algorithm searches the combinatorial state space of student-to-team allocations to find optimal group configurations that:
1. Minimize variance in team average technical scores (Skill Balance).
2. Maximize disciplinary diversity by penalizing teams composed of students from a single degree program.

---

## 4. 📐 System Architecture & Workflow Diagram

```
+-----------------------------------------------------------------------------------+
|                                 USER INTERFACE                                    |
|   - Single Student Form (GPA / Z-Score)   - Bulk File Upload (.xlsx, .csv, .pdf)  |
+------------------------------------------+----------------------------------------+
                                           |
                                           v
+-----------------------------------------------------------------------------------+
|                              DATA PREPROCESSING & VALIDATION                       |
|   - Name Sanitization                    - Student ID Duplicate Check             |
+------------------------------------------+----------------------------------------+
                                           |
                                           v
+-----------------------------------------------------------------------------------+
|                             FUZZY LOGIC PROFILER ENGINE                           |
|   - 1st Year: A/L Z-Score (0.0 - 3.5)  -->  Standardized AI Tech Score (0 - 100)   |
|   - 2nd-4th Year: GPA (0.0 - 4.0)      -->  Standardized AI Tech Score (0 - 100)   |
+------------------------------------------+----------------------------------------+
                                           |
                                           v
+-----------------------------------------------------------------------------------+
|                        GENETIC ALGORITHM OPTIMIZATION ENGINE                      |
|   1. Initial Population Construction (Snake-Sort Distribution)                    |
|   2. Evaluation via Multi-Objective Fitness Function (Variance + Diversity Penalty)|
|   3. Tournament Selection, Two-Point Crossover & Mutation (Random Swaps)          |
|   4. Iterative Convergence (2,500 Generations)                                    |
+------------------------------------------+----------------------------------------+
                                           |
                                           v
+-----------------------------------------------------------------------------------+
|                                OUTPUT GENERATION                                  |
|   - Interactive Team Grid Cards          - Export PDF / Excel (.xlsx) Reports      |
+-----------------------------------------------------------------------------------+
```

---

## 5. 📊 Dataset Details

The system handles both real institutional student batches and synthetic test datasets.

- **Primary Attributes**:
  - `student_id` (String, Unique Index e.g., `D/BIT/24/0001`)
  - `full_name` (String, Sanitized)
  - `academic_year` (`1st Year`, `2nd Year`, `3rd Year`, `4th Year`)
  - `degree_program` (Faculty & Specialization)
  - `raw_score` (Z-Score or GPA value)
  - `technical_score` (Computed AI Tech Score, Float $0 - 100$)
- **Data Ingestion**: Parsed dynamically in-browser from Excel sheets (`.xlsx`, `.csv`) or PDF documents via regex pattern matching (`/(D\/[A-Z0-9\/\-\_]+|[A-Z]{2,4}\/[A-Z0-9\/\-\_]+)/i`).

---

## 6. ⚙️ Rules, Fuzzy Variables, Search Strategy & GA Design

### 6.1 Fuzzy Logic Rules & Membership Mapping
The Fuzzy Logic engine evaluates academic indicators to derive the **AI Technical Score ($T_s$)**:

#### A. 1st Year Students (A/L Z-Score Mapping)
$$\text{If } Z \ge 2.00 \implies T_s = 95 \quad (\text{High / Top Performer})$$
$$\text{If } 1.60 \le Z < 2.00 \implies T_s = 85 \quad (\text{Very Good})$$
$$\text{If } 1.20 \le Z < 1.60 \implies T_s = 75 \quad (\text{Good / Average})$$
$$\text{If } 0.80 \le Z < 1.20 \implies T_s = 65 \quad (\text{Pass})$$
$$\text{If } Z < 0.80 \implies T_s = 55 \quad (\text{Basic})$$

#### B. 2nd, 3rd, and 4th Year Students (GPA Mapping out of 4.0)
$$\text{If } \text{GPA} \ge 3.70 \implies T_s = 95 \quad (\text{First Class})$$
$$\text{If } 3.30 \le \text{GPA} < 3.70 \implies T_s = 85 \quad (\text{Second Upper})$$
$$\text{If } 3.00 \le \text{GPA} < 3.30 \implies T_s = 78 \quad (\text{Second Lower})$$
$$\text{If } 2.50 \le \text{GPA} < 3.00 \implies T_s = 68 \quad (\text{Pass})$$
$$\text{If } 2.00 \le \text{GPA} < 2.50 \implies T_s = 58 \quad (\text{Basic Pass})$$
$$\text{If } \text{GPA} < 2.00 \implies T_s = 45 \quad (\text{Below Average})$$

---

### 6.2 Genetic Algorithm (GA) Design

#### A. Chromosome Representation
A candidate solution is represented as an array of teams $G = \{g_1, g_2, \dots, g_K\}$, where each team $g_k$ contains a subset of student objects.

#### B. Initial Population Seeding (Snake-Draft Algorithm)
Students are sorted descending by $T_s$. Initial teams are assigned in an alternating snake-draft order ($0 \to K-1$, then $K-1 \to 0$) to seed the initial population close to optimality.

#### C. Fitness Function Formulation
The fitness value measures the imbalance across groups, incorporating a diversity penalty:

$$F(G) = \left( \max_{k} \overline{T_{s,k}} - \min_{k} \overline{T_{s,k}} \right) + \sum_{k=1}^{K} P(g_k)$$

Where:
- $\overline{T_{s,k}}$ is the mean Technical Score of team $k$.
- $P(g_k) = 10$ if $| \{ \text{degree\_program}(s) \mid s \in g_k \} | < 2$ and $|g_k| > 1$ (Penalty for single-discipline teams).
- **Goal**: Minimize $F(G)$. An optimal allocation yields $F(G) \to 0$.

#### D. Genetic Operators
- **Selection**: Elitism selection retaining best candidate configurations.
- **Mutation / Local Search**: Two random teams $g_i, g_j$ are selected, and two students $s_a \in g_i, s_b \in g_j$ are swapped. If $F(G_{\text{new}}) < F(G_{\text{best}})$, the swap is accepted.
- **Generations**: Executed for $N = 2,500$ iterations per execution.

---

## 7. 📸 Screenshots & Partial Implementation Outputs

### 7.1 Web Dashboard & Student Management Interface
![KDU AI Group Formation Dashboard](docs/images/dashboard-screenshot.png)

### 7.2 Key System Implementation Metrics
- **Live Server**: Hosted on Vercel at `http://localhost:5173/` (Live Production URL ready).
- **GitHub Repository**: Active branch `Dev-Achira` at `https://github.com/Achira810/ai-group-formation/tree/Dev-Achira`.
- **Bulk Upload**: Successfully tested parsing `.xlsx` and `.pdf` files with 100% duplicate Student ID detection.

---

## 8. ⚠️ Problems Faced During Development & Solutions

1. **Problem: Student ID Duplicates in Bulk Uploads**
   - *Issue*: Repeated Excel/PDF uploads led to duplicate database records.
   - *Solution*: Implemented in-memory Set validation (`existingIdsSet`) combined with visual flags (`⚠️ Duplicate (Skipped)`) in the preview modal to filter out duplicates prior to insertion.

2. **Problem: PDF Text Fragmentation**
   - *Issue*: PDF documents extract text in unstructured multi-line coordinates.
   - *Solution*: Utilized `pdfjs-dist` to group text items by vertical Y-coordinates, sorting top-to-bottom and left-to-right to reconstruct tabular data lines accurately.

3. **Problem: Unstructured Student Names with Degree Suffixes**
   - *Issue*: Extracted student names frequently included trailing degree program names or `undefined` prefixes.
   - *Solution*: Created a regex-based `cleanStudentName` sanitizer function to strip unwanted suffixes (`(Hons)`, `Civil`, `Data Science`, etc.) before UI rendering and database storage.

4. **Problem: Persistent Test State on Page Refresh**
   - *Issue*: Old database records persisted upon page refresh, confusing lecturers attempting a fresh allocation.
   - *Solution*: Added an automated startup initialization routine (`clearOnStartup`) ensuring the system launches clean with 0 registrations.

---

## 9. 🔮 Remaining Work Before Final Submission (Stage 3)

| Task | Description | Target Completion |
| :--- | :--- | :---: |
| **1. Interactive Drag-and-Drop Swapping** | Allow lecturers to manually drag & drop students between team cards with real-time recalculated scores. | Week 9 |
| **2. Role & Leadership Constraints** | Add tags for Team Leader and Coder roles to ensure every team has at least 1 leader. | Week 10 |
| **3. Visual Analytics & Charts** | Integrate `Chart.js` bar and pie charts to display faculty representation and skill balance metrics. | Week 10 |
| **4. Supabase Lecturer Authentication** | Add secure login/password authentication for lecturers. | Week 11 |
| **5. Final Documentation & Testing** | Complete unit testing, comparative evaluation against random groupings, and final report. | Week 12 |

---

## 10. 🤝 Updated Contribution of Each Member

| Member Name | Registration No. | Updated Technical Contribution |
| :--- | :--- | :--- |
| **S. R. Achira Hathsidu** | D/COE/25/0019 | Lead Architecture, Git Version Control, Supabase DB Schema, Vercel Deployment, Duplicate Validation & PDF Export. |
| **Piravahiny Muraleetharan** | D/COE/25/0020 | Frontend UI Dashboard Development, React State Management, Glassmorphic Styling & Component Design. |
| **B. G. M. Banagala** | D/BIT/24/0081 | Fuzzy Logic Profiling System Implementation, Z-Score/GPA Membership Rule Mapping & Tech Score formulation. |
| **D. L. Niluminda** | D/DBA/25/0031 | Genetic Algorithm Design, Fitness Function Formulation, Local Search Mutation & Inter-Disciplinary Diversity Penalty. |
| **W. S. Muthugala** | D/DBA/25/0035 | Bulk File Upload Ingestion Pipeline (`xlsx` & `pdfjs-dist`), System Testing & Comparative Performance Analysis. |

---
*Report Compiled for KDU Essentials of Artificial Intelligence (Group 33)*
