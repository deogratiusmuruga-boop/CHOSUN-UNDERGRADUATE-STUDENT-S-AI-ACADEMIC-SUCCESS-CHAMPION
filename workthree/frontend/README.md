# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
Set-Content -Path "C:\Users\chosun\Downloads\CVB\erxr\CHOSUN-UNDERGRADUATE-STUDENT-S-AI-ACADEMIC-SUCCESS-CHAMPION\README.md" -Value '# 📘 Integration Guide for Team Members 4 & 5

## 🏗️ 1. How the System Works
* **Frontend (React):** Runs on http://localhost:5173
* **Backend (FastAPI):** Runs on http://localhost:8000

## 💡 2. Upload Flow
1. User submits project details and optional zip/pdf file.
2. Frontend sends request to `POST http://localhost:8000/projects/upload`.
3. Backend saves the file in `backend/uploads/` and adds project to memory.
4. UI updates instantly on the screen.

## 🔌 3. API Routes
* `GET /projects/` - Get all projects
* `GET /projects/recommend` - Get recommended projects
* `POST /projects/upload` - Upload new project
* `GET /scholarships/` - Get all scholarships

## 🔗 4. How to Connect Your Work
* **Add Tab:** Import your component in `src/App.jsx` and add a tab button.
* **Add Routes:** Include your Python router in `app.py`.

## 🚀 5. How to Run
Terminal 1 (Backend):
cd workthree\backend; .\venv\Scripts\python.exe -m uvicorn app:app --reload --port 8000

Terminal 2 (Frontend):
cd workthree\frontend; npm run dev' -Encoding UTF8