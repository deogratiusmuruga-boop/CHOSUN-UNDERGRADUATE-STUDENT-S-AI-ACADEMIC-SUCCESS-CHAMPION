# 📊 Kaggle Datasets for Scholarships & Academic Success

This folder contains public Kaggle datasets and acquisition scripts used to populate the **Scholarship Feed** and **Recommendation Models** for the Chosun Undergraduate Student AI Academic Success Hub.

---

## 🎓 1. Public Kaggle Scholarship Datasets

### A. Global Scholarship Opportunities Dataset
* **Source:** Kaggle
* **Link:** https://www.kaggle.com/datasets/somyadipghosh/global-scholarship-opportunities-dataset
* **Format:** JSON
* **Description:** 200+ structured entries including title, eligibility criteria, application link, deadline, and award benefits.

### B. International Scholarships Dataset
* **Source:** Kaggle
* **Link:** https://www.kaggle.com/datasets/tiwariar273/international-scholarships-dataset
* **Format:** CSV
* **Description:** Global study grant listings with eligibility descriptions, degree levels, and location rules.

### C. Universities & Global Financial Aid Dataset
* **Source:** Kaggle
* **Link:** https://www.kaggle.com/datasets/timmofeyy/-universities-schoolarships-all-around-the-world
* **Format:** CSV
* **Description:** Degree program financial support records across global undergraduate and graduate institutions.

---

## 🎯 2. Student Eligibility & Recommendation Datasets

### Student Scholarship Eligibility Dataset
* **Source:** Kaggle
* **Link:** https://www.kaggle.com/datasets/mochandrisetiawan26/student-scholarship-eligibility-dataset
* **Format:** CSV
* **Description:** Records mapping candidate attributes (GPA/IPK, income level, dependents, achievements) to grant eligibility.

---

## 🛠️ 3. How to Connect This Folder to Backend (`workthree/backend/app.py`)

Load any dataset downloaded into this folder directly inside `app.py`:

```python
import pandas as pd
import os

# Path from workthree/backend to this Kaggle folder
dataset_path = os.path.join("..", "..", "datasets acclaimed for scholarships KAGGLE", "scholarships.csv")

# Load and format data
df = pd.read_csv(dataset_path)
scholarships_db = df.to_dict(orient="records")