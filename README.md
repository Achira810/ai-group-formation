# KDU AI Group Formation System

[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple?logo=vite)](https://vitejs.dev/)
[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110%2B-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Live%20Demo-ai--group--formation.vercel.app-black?logo=vercel&logoColor=white)](https://ai-group-formation.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-green)](#license)

An automated, intelligent student team optimization platform designed for **General Sir John Kotelawala Defence University (KDU)**. The system leverages a 3-stage hybrid AI pipeline—**Fuzzy Logic Skill Profiling**, **K-Means Cohort Stratification**, and a **Genetic Algorithm Balancing Engine**—to construct fair, balanced, and cross-disciplinary student teams.

**Live Deployment:** [https://ai-group-formation.vercel.app/](https://ai-group-formation.vercel.app/)

---

## Dashboard Previews

### 1. System Header, Empirical Suite & Benchmarking Arena
![KDU AI Group Formation System Suite](docs/images/01-hero-suite-overview.png)

### 2. Student Registration & Roster with Real-Time Competency Metrics
![Student Registration and Roster](docs/images/02-student-registration-roster.png)

### 3. Academic Curriculum & Module-Specific Competency Profiler
![Curriculum and Module Profiler](docs/images/03-curriculum-module-profiler.png)

### 4. AI-Optimized Balanced Team Allocations & Synergy Scores
![Optimized Team Allocations](docs/images/04-optimized-team-allocations.png)

---

## Key Features

- **Modern Glassmorphic Dashboard**: Dark-themed UI with real-time student roster stats, avatar badges, and skill progress bars.
- **KDU Curriculum & Module-Specific Profiling**:
  - Full official syllabus integration for KDU Computing degrees (**Computer Science**, **Information Technology**, **Information Systems**, **Data Science & Business Analytics**).
  - Evaluates student aptitude based on selected target modules and **cumulative prerequisite competency across all prior semesters**.
- **Multi-Format Bulk Data Upload (Excel, CSV, PDF)**:
  - In-browser parsing for `.xlsx`, `.xls`, `.csv`, and `.pdf` files.
  - Full native support for the official **KDU Examination Results Marksheet Format** (`Marks Format.xlsx`).
- **Dynamic Z-Score & Direct Mark Evaluation**:
  - **1st Year (1st Sem)**: Direct school intake evaluated via A/L Z-Score baseline.
  - **Semesters 2 to 8**: Direct evaluation using subject marks (0 - 100%) and prerequisite cumulative performance.
- **Belbin Team Role Profiler**: Assigns operational roles (Team Coordinator, Technical Implementer, Innovator, Specialist, QA Lead) to ensure functional team balance.
- **CSP Constraint Satisfaction Engine**: Real-time enforcement of student pair Affinities (Must Pair) and Conflicts (Must Separate).
- **3-Stage Hybrid AI Architecture**:
  - **Concept 1: Fuzzy Logic Profiler**: Standardizes disparate academic metrics into continuous competency scores.
  - **Concept 2: K-Means Clustering**: Partitions cohorts into $k=3$ stratified performance tiers (Developing, Proficient, Advanced) to eliminate homogeneous team seeding.
  - **Concept 3: Genetic Algorithm Optimizer**: Performs multi-objective optimization (2,500 iterations) balancing skill equity, role diversity, and constraint satisfaction.
- **Empirical Benchmarking Suite**: 4-model comparative verification (Random Allocation, Greedy Snake Draft, Pure GA, and Hybrid K-Means + GA).
- **Dual Report Generation**: Instant export of formatted team allocation reports in both **PDF** and **Excel (.xlsx)** formats.

---

## Project Structure

```text
ai-group-formation/
├── api/                      # Vercel Serverless Function Entrypoint
│   └── index.py              # Serverless ASGI Handler for FastAPI
│
├── frontend/                 # React 18 + Vite Web Application
│   ├── src/
│   │   ├── assets/           # UI Banners & Graphic Assets
│   │   ├── components/       # Modals, Visualizers & UI Elements
│   │   ├── data/             # KDU Curriculum & Module Catalogs
│   │   ├── services/         # Supabase Client & Python AI Service Connector
│   │   └── App.jsx           # Main Dashboard & UI Components
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Python 3.10+ FastAPI AI Engine
│   ├── ai_engine/            # K-Means, Genetic Algorithm, Benchmarking & XAI
│   │   ├── kmeans.py
│   │   ├── genetic_algorithm.py
│   │   ├── benchmarking.py
│   │   └── xai.py
│   ├── main.py               # FastAPI Microservice & API Endpoints
│   ├── run.py                # Local Server Startup Runner
│   └── requirements.txt      # Python Dependencies (FastAPI, Uvicorn, Pydantic, NumPy)
│
├── database/
│   ├── supabase_schema.sql             # PostgreSQL Database Schema
│   ├── fix_delete_permissions.sql      # Foreign Key Cascades & RLS Permissions
│   ├── migration_stage3.sql            # Stage 3 Database Migration
│   └── peer_evaluation_and_grading.sql # Peer Evaluation & Grading Tables
│
├── docs/
│   └── images/               # Repository Screenshots & Media
│
├── requirements.txt          # Root Python Dependencies for Vercel Deployment
├── vercel.json               # Vercel Deployment & API Routing Configuration
└── package.json              # Root Scripts (dev, backend, build, preview)
```

---

## Getting Started

### Prerequisites
- **Node.js**: v18+ (Recommended v20+)
- **Python**: 3.10+ (with `pip`)

---

### 1. Running the Python AI Backend (FastAPI Microservice)

You can run the backend directly using Python:

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Start the Python FastAPI AI server
python run.py
```

Or from the project root using npm:

```bash
npm run backend
```

- API Server will launch at **`http://127.0.0.1:8000/`**
- Interactive Swagger Documentation will be available at **`http://127.0.0.1:8000/docs`**

---

### 2. Running the Frontend (React + Vite)

In a new terminal window:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Or from the project root using npm:

```bash
npm run dev
```

The application will launch locally at **`http://localhost:5173/`**.

---

### 3. Production Deployment (Vercel)

The system is configured for seamless monorepo deployment on **Vercel**:
- The **React frontend** is built statically using Vite into `frontend/dist`.
- The **Python FastAPI backend** runs as a Vercel Serverless Function via `api/index.py` and root `requirements.txt`.
- All requests to `/api/*` are routed directly to the Python FastAPI microservice, ensuring zero CORS or mixed-content issues in production.

To deploy on Vercel:
1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Configure the environment variables in Vercel Settings:
   - `VITE_SUPABASE_URL`: Your Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key
   - `VITE_PYTHON_BACKEND_URL`: (Optional) Leave unset to automatically use the built-in Vercel Serverless `/api`, or provide an external URL if hosting on Render/Railway.
4. Deploy.

---

## Sample Data Upload Format

Lecturers can upload an Excel/CSV file with the following column headers:

| Student ID | Full Name | Academic Year | Faculty | Degree Program | Score |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `D/BIT/24/0001` | Achira Hathsidu | `1st Year` | Faculty of Computing | BSc (Hons) Computer Science | `1.854` |
| `D/DBA/25/0031` | D.L. Niluminda | `2nd Year` | Faculty of Computing | BSc (Hons) Data Science and Business Analytics | `3.75` |

The platform also natively detects and parses the official KDU Semester Examination Marks format (`Marks Format.xlsx`).

---

## Built With

- **Frontend**: React 18, Vite, jsPDF, AutoTable, SheetJS (XLSX), PDF.js (`pdfjs-dist`)
- **Backend**: Python 3.10+, FastAPI, Uvicorn, Pydantic, NumPy
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (Vite Frontend & Serverless Python Microservice)

---

## Developers

Developed by:
- **[Achira Hathsidu](https://github.com/Achira810)**
- **[Duvindu Lasath](https://github.com/Lasath192)**
- **[Piravahiny](https://github.com/Piravahiny)**
- **[Wageesha Muthugala](https://github.com/WageeshaMuthugala)**
- **[Maheshika Banagala](https://github.com/Maheshika2001)**

---

## License

This project is licensed under the MIT License.
