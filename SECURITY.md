# Security Policy - KDU AI Group Formation System

## Overview
The **KDU AI Group Formation System** handles sensitive academic records, including student names, admission IDs, degree affiliations, technical and prerequisite marks, and peer evaluations. Security, confidentiality, and data integrity are central to the system's design.

---

## Supported Versions

Security patches and bug fixes are actively provided for the following releases:

| Version | Status | Supported |
| :--- | :--- | :--- |
| **2.0.x (Current - Python AI Engine)** | Active Production | Yes |
| **1.x.x (Legacy Client-Side)** | Deprecated | No |

---

## Architecture & Security Controls

### 1. Zero-Trust API Key Segregation
- **Frontend / Client**: Exclusively restricted to the public Supabase **Anonymous Key (`VITE_SUPABASE_ANON_KEY`)**.
- **Service Role Key**: The administrative `service_role` key is strictly excluded from client-side bundles and version control.
- Environment variables are isolated via `.env` files and enforced via `.gitignore`. Templates (`.env.example`, `.env.production.example`) contain only sanitized mock placeholders.

### 2. Row-Level Security (RLS)
All database tables on Supabase PostgreSQL have Row-Level Security (RLS) enabled:
- `students`
- `groups`
- `group_members`
- `team_constraints`
- `team_health_logs`
- `chat_messages`
- `benchmark_runs`
- `peer_evaluations`
- `group_grades`

Data operations are verified against RLS policies. Deletions and cascade updates adhere to relational integrity constraints (`ON DELETE CASCADE`) to prevent orphaned records or permission escalation.

### 3. HTTP Security Headers
Production deployments on Vercel enforce strict browser security headers:
- `X-Content-Type-Options: nosniff` (Mitigates MIME-type sniffing)
- `X-Frame-Options: DENY` (Mitigates clickjacking attacks)
- `X-XSS-Protection: 1; mode=block` (Reflected XSS filter)
- `Referrer-Policy: strict-origin-when-cross-origin` (Safeguards referrer metadata)
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` (Restricts browser hardware access)

### 4. Input Validation & Anti-Injection
- **Backend (Python / FastAPI)**: Strong request typing via Pydantic schema validation (`OptimizeRequest`, `BenchmarkRequest`, `KMeansRequest`) prevents malicious or oversized payload injection.
- **Database**: All database interactions use parameterized Supabase PostgREST queries, eliminating SQL injection vulnerabilities.
- **File Parsing**: Bulk student marks uploaded via Excel/CSV/PDF are validated and sanitized client-side before submission.

---

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please notify the development team responsibly:

1. **Do not create public GitHub issues** detailing the exploit or vulnerability.
2. Email the maintainers directly with:
   - A detailed description of the vulnerability.
   - Steps to reproduce or proof-of-concept (PoC).
   - Expected impact and affected components.
3. The development team will acknowledge receipt within **24 hours** and aim to deploy a fix within **48 to 72 hours**.
