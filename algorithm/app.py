import os
import numpy as np
import pandas as pd
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.model_selection import train_test_split
from sklearn.svm import LinearSVC
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score

app = Flask(__name__)
CORS(app)

# ------------------------- Custom SVM -------------------------
class CustomSVM:
    def __init__(self, learning_rate=0.001, lambda_param=0.01, n_iters=1000):
        self.lr = learning_rate
        self.lambda_param = lambda_param
        self.n_iters = n_iters
        self.w = None
        self.b = None

    def fit(self, X, y):
        n_samples, n_features = X.shape
        y_ = np.where(y <= 0, -1, 1)
        self.w = np.zeros(n_features)
        self.b = 0
        for iteration in range(self.n_iters):
            for idx, x_i in enumerate(X):
                condition = y_[idx] * (np.dot(x_i, self.w) + self.b) >= 1
                if condition:
                    self.w -= self.lr * (2 * self.lambda_param * self.w)
                else:
                    self.w -= self.lr * (2 * self.lambda_param * self.w - np.dot(x_i, y_[idx]))
                    self.b -= self.lr * y_[idx]

    def predict(self, X):
        approx = np.dot(X, self.w) + self.b
        return np.where(approx >= 0, 1, 0)

# ------------------------- Paths -------------------------
MODEL_DIR = "models"
os.makedirs(MODEL_DIR, exist_ok=True)

custom_model_path = os.path.join(MODEL_DIR, "custom_svm.pkl")
sklearn_model_path = os.path.join(MODEL_DIR, "sklearn_svm.pkl")
gender_encoder_path = os.path.join(MODEL_DIR, "gender_encoder.pkl")
smoking_encoder_path = os.path.join(MODEL_DIR, "smoking_encoder.pkl")
scaler_path = os.path.join(MODEL_DIR, "scaler.pkl")

# ------------------------- Load and Train -------------------------
df = pd.read_csv('diabetes.csv')

# Load or fit label encoders
if os.path.exists(gender_encoder_path):
    gender_encoder = joblib.load(gender_encoder_path)
else:
    gender_encoder = LabelEncoder()
    df['gender'] = gender_encoder.fit_transform(df['gender'])
    joblib.dump(gender_encoder, gender_encoder_path)

if os.path.exists(smoking_encoder_path):
    smoking_encoder = joblib.load(smoking_encoder_path)
else:
    smoking_encoder = LabelEncoder()
    df['smoking_history'] = smoking_encoder.fit_transform(df['smoking_history'])
    joblib.dump(smoking_encoder, smoking_encoder_path)

# Apply label encoding if needed
if df['gender'].dtype == 'object':
    df['gender'] = gender_encoder.transform(df['gender'])

if df['smoking_history'].dtype == 'object':
    df['smoking_history'] = smoking_encoder.transform(df['smoking_history'])

X = df.drop('diabetes', axis=1).values
y = df['diabetes'].values

# Normalize features
if os.path.exists(scaler_path):
    scaler = joblib.load(scaler_path)
else:
    scaler = StandardScaler()
    X = scaler.fit_transform(X)
    joblib.dump(scaler, scaler_path)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train or load Custom SVM
if os.path.exists(custom_model_path):
    custom_svm = joblib.load(custom_model_path)
else:
    custom_svm = CustomSVM()
    custom_svm.fit(X_train, y_train)
    joblib.dump(custom_svm, custom_model_path)

# Train or load Sklearn SVM
if os.path.exists(sklearn_model_path):
    sklearn_svm = joblib.load(sklearn_model_path)
else:
    sklearn_svm = LinearSVC(max_iter=10000)
    sklearn_svm.fit(X_train, y_train)
    joblib.dump(sklearn_svm, sklearn_model_path)

# ------------------------- Routes -------------------------
@app.route('/')
def index():
    return "<h1>Diabetes SVM Demo</h1><p>Use /predict or /accuracy</p>"

@app.route('/accuracy')
def accuracy():
    acc_custom = accuracy_score(y_test, custom_svm.predict(X_test))
    acc_sklearn = accuracy_score(y_test, sklearn_svm.predict(X_test))
    return jsonify({
        "custom_svm_accuracy": round(acc_custom, 2),
        "sklearn_svm_accuracy": round(acc_sklearn, 2)
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        gender = gender_encoder.transform([data['gender']])[0]
        smoking = smoking_encoder.transform([data['smoking_history']])[0]

        features = np.array([[gender,
                              float(data['age']),
                              int(data['hypertension']),
                              int(data['heart_disease']),
                              smoking,
                              float(data['bmi']),
                              float(data['hba1c']),
                              float(data['glucose'])]])

        features = scaler.transform(features)

        result_custom = int(custom_svm.predict(features)[0])
        result_sklearn = int(sklearn_svm.predict(features)[0])

        return jsonify({
            "custom_svm": "Non-Diabetic" if result_custom else "Diabetic",
            "sklearn_svm": "Diabetic" if result_sklearn else "Non-Diabetic"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ------------------------- Run -------------------------
if __name__ == '__main__':
    app.run(debug=True)
