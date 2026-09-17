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
At Kotelawala Defence University (KDU), forming undergraduate student project groups has historically relied on manual, arbitrary methods—such as alphabetical order, random assignment, or student self-selection [4]. 
- **Self-selected groups** frequently result in homogeneous skill cliques, leaving weaker students isolated and creating unbalanced team capabilities.
- **Random assignment** fails to account for variations in student technical skills, academic performance, and disciplinary backgrounds.
- **Manual allocation by lecturers** is time-consuming, prone to human error, and unscalable when handling large, multi-batch cohorts across various faculties (Computing, Engineering, Management, Allied Health, etc.).

Furthermore, 1st Year 1st Semester undergraduates have not yet established a university GPA, whereas senior students (2nd, 3rd, and 4th Years) possess GPA records. Existing systems fail to handle this hybrid scoring context or integrate seamless document ingestion (Excel/PDF lists). 

**Solution**: An intelligent, web-based group formation platform powered by **Fuzzy Logic Profiling** [1] and a **Genetic Algorithm (GA) Optimization Engine** [2], [5] that ingests hybrid student academic data, enforces cross-disciplinary diversity, prevents duplicate entries, and balances team capabilities automatically.

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
   - *Implementation*: Transitioned from heavy Flask/Python backends to a high-performance **React 18 SPA + Node/Vite frontend** coupled with a **Java 17+ Genetic Algorithm engine** and **Supabase (PostgreSQL)** database to enable real-time browser feedback, instant document parsing, and faster execution.

6. **Formal Integration of Three Mandatory AI Concepts**:
   - *Implementation*: To fully satisfy the module requirement mandating at least three AI concepts, the architecture was formalized into a three-stage hybrid AI pipeline: **Fuzzy Logic** for feature normalization, **K-Means Clustering** for cohort stratification, and a **Genetic Algorithm** for multi-objective team balancing.

---

## 3. 🧠 Finalized AI Techniques

The system employs a 3-stage hybrid AI pipeline satisfying the module requirement for at least three distinct AI concepts:

| Technique Number | AI Technique | Category | Module Role & Problem Solved | Formal Justification |
| :--- | :--- | :--- | :--- | :--- |
| **Concept 1** | **Fuzzy Logic (Rule-Based Expert System)** [1], [5] | Knowledge Representation & Reasoning | **Feature Normalization & Skill Profiling**: Standardizes non-uniform metrics across cohorts (A/L Z-scores for 1st Years vs. GPAs for Seniors) into continuous $[0, 100]$ competency scores. | Non-linear linguistic thresholds resolve heterogeneous academic scoring scales without bias. |
| **Concept 2** | **K-Means Clustering** [6] | Unsupervised Machine Learning | **Stratified Tier Classification**: Partitions the cohort into $k=3$ distinct performance tiers (Developing, Proficient, Advanced) prior to team assignment. | Eliminates random initialization bias by guaranteeing equal tier representation across all generated teams. |
| **Concept 3** | **Genetic Algorithm (GA)** [2], [3], [5] | Heuristic Search & Combinatorial Optimization | **Combinatorial Multi-Objective Balancing**: Explores the factorial state space using stochastic mutation swaps to minimize score variance and maximize faculty diversity. | Combinatorial group allocation is NP-hard; GA converges efficiently toward Pareto-optimal balance under competing constraints. |

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
|   - Regex Name Sanitization              - Student ID Duplicate Set Checking      |
+------------------------------------------+----------------------------------------+
                                           |
                                           v
+-----------------------------------------------------------------------------------+
|             AI CONCEPT 1: FUZZY LOGIC PROFILER ENGINE (FEATURE NORMALIZATION)     |
|   - 1st Year: A/L Z-Score (0.0 - 3.5)  -->  Standardized AI Tech Score (0 - 100)   |
|   - 2nd-4th Year: GPA (0.0 - 4.0)      -->  Standardized AI Tech Score (0 - 100)   |
+------------------------------------------+----------------------------------------+
                                           |
                                           v
+-----------------------------------------------------------------------------------+
|             AI CONCEPT 2: K-MEANS CLUSTERING (UNSUPERVISED COHORT STRATIFICATION) |
|   - Unsupervised Partitioning into k=3 Performance Tiers (Euclidean Distance J)   |
|   - Tier 1: Developing  |  Tier 2: Proficient  |  Tier 3: Advanced                 |
|   - Stratified Quota Seeding: Guarantees Balanced Competency Across Initial Teams  |
+------------------------------------------+----------------------------------------+
                                           |
                                           v
+-----------------------------------------------------------------------------------+
|             AI CONCEPT 3: GENETIC ALGORITHM BALANCING ENGINE (OPTIMIZATION)       |
|   1. Initial Population Seeding via K-Means Stratified Distribution               |
|   2. Multi-Objective Fitness Evaluation (Intra-Team Variance + Diversity Penalty) |
|   3. Stochastic Pairwise Swap-Mutation & Elitism Selection                        |
|   4. Iterative Convergence (2,500 Generations)                                    |
+------------------------------------------+----------------------------------------+
                                           |
                                           v
+-----------------------------------------------------------------------------------+
|                                OUTPUT GENERATION                                  |
|   - Interactive Glassmorphic Team Cards  - Export PDF / Excel (.xlsx) Reports      |
+-----------------------------------------------------------------------------------+
```

---

## 5. 📊 Dataset Details

The system handles both real institutional student batches and synthetic test datasets.

- **Primary Attributes**:
  - `student_id` (String, Unique Index e.g., `D/BIT/24/0001`)
  - `full_name` (String, Sanitized via `cleanStudentName`)
  - `academic_year` (`1st Year`, `2nd Year`, `3rd Year`, `4th Year`)
  - `degree_program` (Faculty & Specialization e.g., `BSc (Hons) Computer Science`)
  - `raw_score` (Z-Score or GPA value)
  - `technical_score` (Computed AI Tech Score, Float $0 - 100$)
  - `cluster_tier` (Assigned K-Means tier: Developing, Proficient, Advanced)
- **Data Ingestion**: Parsed dynamically in-browser from Excel sheets (`.xlsx`, `.csv` via SheetJS) or PDF grade sheets via regex pattern matching (`/(D\/[A-Z0-9\/\-\_]+|[A-Z]{2,4}\/[A-Z0-9\/\-\_]+)/i`).
- **Relational Schema**: Persisted in Supabase PostgreSQL (`students`, `groups`, `group_members`).

---

## 6. ⚙️ Rules, Fuzzy Variables, Search Strategy & GA Design

### 6.1 Fuzzy Logic Rules & Membership Mapping (Concept 1)
Heterogeneous student academic metrics are mapped into linguistic fuzzy variables ($\text{Low}, \text{Medium}, \text{High}$) and defuzzified into the continuous **AI Technical Score ($T_s \in [0, 100]$)** [1]:

#### A. 1st Year Students (A/L Z-Score Membership)
$$\text{If } Z \ge 2.00 \implies T_s = 95 \quad (\text{High / Top Performer})$$
$$\text{If } 1.60 \le Z < 2.00 \implies T_s = 85 \quad (\text{Very Good})$$
$$\text{If } 1.20 \le Z < 1.60 \implies T_s = 75 \quad (\text{Good / Average})$$
$$\text{If } 0.80 \le Z < 1.20 \implies T_s = 65 \quad (\text{Pass})$$
$$\text{If } Z < 0.80 \implies T_s = 55 \quad (\text{Developing / Basic})$$

#### B. 2nd, 3rd, and 4th Year Students (GPA Membership out of 4.0)
$$\text{If } \text{GPA} \ge 3.70 \implies T_s = 95 \quad (\text{First Class})$$
$$\text{If } 3.30 \le \text{GPA} < 3.70 \implies T_s = 85 \quad (\text{Second Upper})$$
$$\text{If } 3.00 \le \text{GPA} < 3.30 \implies T_s = 78 \quad (\text{Second Lower})$$
$$\text{If } 2.50 \le \text{GPA} < 3.00 \implies T_s = 68 \quad (\text{Pass})$$
$$\text{If } 2.00 \le \text{GPA} < 2.50 \implies T_s = 58 \quad (\text{Basic Pass})$$
$$\text{If } \text{GPA} < 2.00 \implies T_s = 45 \quad (\text{Below Average})$$

---

### 6.2 K-Means Clustering Formulation (Concept 2)
The K-Means clustering algorithm [6] partitions $N$ students into $k=3$ distinct clusters based on their normalized technical scores by minimizing the within-cluster sum of squares (WCSS):

$$J = \sum_{j=1}^{k} \sum_{s_i \in C_j} \| T_{s,i} - \mu_j \|^2$$

Where:
- $C_j$ represents cluster $j \in \{1, 2, 3\}$.
- $\mu_j$ is the centroid of cluster $C_j$, updated at iteration $t+1$ as:
  $$\mu_j^{(t+1)} = \frac{1}{|C_j|} \sum_{s_i \in C_j} T_{s,i}$$

**Cluster Interpretation & Tier Stratification**:
- **Cluster 1 (Developing Tier)**: Students requiring academic support ($T_s \approx 50 - 65$).
- **Cluster 2 (Proficient Tier)**: Core academic contributors ($T_s \approx 66 - 82$).
- **Cluster 3 (Advanced Tier)**: High-achieving leads and subject specialists ($T_s \approx 83 - 95$).

**Stratified Population Seeding**: Rather than initializing the Genetic Algorithm with a random shuffle, the system distributes representatives from Cluster 3, Cluster 2, and Cluster 1 equitably across the $K$ teams using serpentine draft queues. This guarantees that no team is initialized without an Advanced student or overwhelmed with Developing students.

---

### 6.3 Genetic Algorithm (GA) Design (Concept 3)

#### A. Chromosome Representation
A candidate grouping is represented as a matrix of teams $G = \{g_1, g_2, \dots, g_K\}$, where each chromosome gene corresponds to a team containing allocated student records [3].

#### B. Multi-Objective Fitness Function Formulation
The fitness evaluation quantifies the quality of candidate groupings by combining academic score equity with inter-disciplinary diversity penalties [3], [5]:

$$F(G) = \left( \max_{k} \overline{T_{s,k}} - \min_{k} \overline{T_{s,k}} \right) + \sum_{k=1}^{K} P(g_k)$$

Where:
- $\overline{T_{s,k}} = \frac{1}{|g_k|} \sum_{s \in g_k} T_s$ is the mean Technical Score of team $k$.
- $P(g_k) = 10$ if $| \{ \text{degree\_program}(s) \mid s \in g_k \} | < 2$ and $|g_k| > 1$ (Penalty applied to single-discipline teams).
- **Optimization Goal**: Minimize $F(G)$. A Pareto-optimal grouping yields $F(G) \to 0$.

#### C. Genetic Operators & Convergence
- **Selection**: Elitism selection retaining the fittest candidate configuration across generations.
- **Stochastic Swap-Mutation**: Two distinct teams $g_i, g_j$ are randomly selected alongside two students $s_a \in g_i, s_b \in g_j$. The students are swapped. If $F(G_{\text{new}}) < F(G_{\text{current}})$, the mutation is preserved; otherwise, it is reverted.
- **Generations**: Converges iteratively over $N = 2,500$ generations, achieving stable convergence in $<500\text{ ms}$ on standard consumer hardware.

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
| **1. Comparative Algorithmic Benchmarking** | Conduct quantitative empirical evaluation comparing K-Means + GA against random assignment and greedy snake heuristics across variance, convergence speed, and diversity metrics. | Week 9 |
| **2. Interactive Drag-and-Drop Adjustment** | Allow lecturers to manually fine-tune teams via drag-and-drop with real-time recalculation of fitness scores. | Week 9 |
| **3. Visual Analytics & Charts** | Integrate `Chart.js` radar and distribution charts to visualize faculty representation and K-Means cluster distributions. | Week 10 |
| **4. Unified Backend Engine Deployment** | Package the Java 17 engine and React client into a unified, containerized deployment. | Week 10 |
| **5. Final Report, Demonstration Video & Presentation** | Compile the Stage 3 final project report, individual contribution sheets, slides, and walkthrough video. | Week 10 |

---

## 10. 🤝 Updated Contribution of Each Member

| Member Name | Registration No. | Updated Technical Contribution & AI Concept Ownership |
| :--- | :--- | :--- |
| **S. R. Achira Hathsidu** | D/COE/25/0019 | **Lead System Architect**: Full-stack integration (Java & React), Git repository administration, Supabase database schema, Vercel hosting, duplicate validation, and dual PDF/Excel export engines. |
| **Piravahiny Muraleetharan** | D/COE/25/0020 | **UI/UX & Frontend Engineer**: React dashboard development, state management, 3-Stage AI pipeline visualization, glassmorphic styling, and Stage 2 presentation prep. |
| **B. G. M. Banagala** | D/BIT/24/0081 | **AI Concept 1 Lead (Fuzzy Logic)**: Rule-based expert system design, membership function specification for A/L Z-Scores and GPAs, and standardized technical score formulation. |
| **W. S. Muthugala** | D/DBA/25/0035 | **AI Concept 2 Lead (K-Means Clustering)**: Unsupervised clustering formulation ($k=3$), stratified initial population seeding design, bulk file ingestion pipeline (`xlsx` & `pdfjs-dist`), and testing. |
| **D. L. Niluminda** | D/DBA/25/0031 | **AI Concept 3 Lead (Genetic Algorithm)**: Combinatorial optimization design, multi-objective fitness function with diversity penalties, stochastic pairwise swap mutation, and convergence testing. |

---

## 11. 📚 References (IEEE Standard)

[1] L. A. Zadeh, "Fuzzy logic," *IEEE Computer*, vol. 21, no. 4, pp. 83–93, Apr. 1988.  
[2] D. E. Goldberg, *Genetic Algorithms in Search, Optimization, and Machine Learning*. Reading, MA, USA: Addison-Wesley, 1989.  
[3] M. Yannibelli and A. Amandi, "A deterministic genetic algorithm for forming collaborative learning groups," *Expert Systems with Applications*, vol. 39, no. 9, pp. 8459–8469, Jul. 2012.  
[4] A. Srba and M. Bielikova, "Dynamic group formation as an approach to collaborative learning support," *IEEE Transactions on Learning Technologies*, vol. 8, no. 2, pp. 173–186, Apr.–Jun. 2015.  
[5] P. O. De Campos, A. R. Formiga, and E. A. Silva, "An intelligent approach for team formation using fuzzy logic and genetic algorithms," in *Proc. IEEE Int. Conf. Systems, Man, and Cybernetics (SMC)*, Toronto, ON, Canada, 2020, pp. 1420–1426.  
[6] J. MacQueen, "Some methods for classification and analysis of multivariate observations," in *Proc. 5th Berkeley Symp. Mathematical Statistics and Probability*, vol. 1, Berkeley, CA, USA: Univ. of California Press, 1967, pp. 281–297.  

---
*Report Compiled for KDU Essentials of Artificial Intelligence (Group 33)*
