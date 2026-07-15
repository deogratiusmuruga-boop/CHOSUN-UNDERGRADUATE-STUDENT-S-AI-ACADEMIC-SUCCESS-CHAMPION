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
