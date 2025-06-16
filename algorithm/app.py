from flask import Flask, request
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.svm import LinearSVC
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score

app = Flask(__name__)

# -------------------------
# Custom SVM Implementation
# -------------------------
class CustomSVM:
    def __init__(self, learning_rate=0.001, lambda_param=0.01, n_iters=50):  # Reduced iterations
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
            if iteration % 10 == 0:
                print(f"Iteration {iteration} complete")

    def predict(self, X):
        approx = np.dot(X, self.w) + self.b
        return np.where(approx >= 0, 1, 0)

# -------------------------
# Load and Prepare Data
# -------------------------
df = pd.read_csv('diabetes.csv')

# Label encode categorical features
df['gender'] = LabelEncoder().fit_transform(df['gender'])
df['smoking_history'] = LabelEncoder().fit_transform(df['smoking_history'])

# Features and labels
X = df.drop('diabetes', axis=1).values
y = df['diabetes'].values

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train both models
custom_svm = CustomSVM(n_iters=50, learning_rate=0.001)  # Reduced iterations
custom_svm.fit(X_train[:100000], y_train[:100000])  # Train on subset to speed up training

sklearn_svm = LinearSVC(max_iter=10000)
sklearn_svm.fit(X_train, y_train)

# -------------------------
# Routes
# -------------------------
@app.route('/')
def index():
    return """
    <h1>Diabetes SVM Demo</h1>
    <p><a href='/accuracy'>/accuracy</a> - See accuracy of both models</p>
    <p><a href='/predict'>/predict</a> - Try a prediction</p>
    """

@app.route('/accuracy')
def accuracy():
    pred_custom = custom_svm.predict(X_test)
    acc_custom = accuracy_score(y_test, pred_custom)

    pred_sklearn = sklearn_svm.predict(X_test)
    acc_sklearn = accuracy_score(y_test, pred_sklearn)

    return f"""
    <h2>Model Accuracies</h2>
    <p>Custom SVM: {acc_custom:.2f}</p>
    <p>Sklearn SVM: {acc_sklearn:.2f}</p>
    <p><a href="/predict">Test prediction</a></p>
    """

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    form_html = """
    <h2>Predict Diabetes</h2>
    <form method="post">
        <table>
            <tr><td>Gender:</td>
                <td>
                    <select name="gender">
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                    </select>
                </td>
            </tr>
            <tr><td>Age:</td><td><input type="number" step="0.1" name="age" required></td></tr>
            <tr><td>Hypertension (0/1):</td><td><input type="number" name="hypertension" required></td></tr>
            <tr><td>Heart Disease (0/1):</td><td><input type="number" name="heart_disease" required></td></tr>
            <tr><td>Smoking History:</td>
                <td>
                    <select name="smoking_history">
                        <option value="never">never</option>
                        <option value="No Info">No Info</option>
                        <option value="current">current</option>
                        <option value="former">former</option>
                        <option value="not current">not current</option>
                        <option value="ever">ever</option>
                    </select>
                </td>
            </tr>
            <tr><td>BMI:</td><td><input type="number" step="0.01" name="bmi" required></td></tr>
            <tr><td>HbA1c:</td><td><input type="number" step="0.1" name="hba1c" required></td></tr>
            <tr><td>Glucose:</td><td><input type="number" name="glucose" required></td></tr>
        </table><br>
        <input type="submit" value="Predict">
    </form>
    {result}
    """

    result_html = ""
    if request.method == 'POST':
        try:
            # Maps for encoding categorical inputs
            gender_map = {'Female': 0, 'Male': 1, 'Other': 2}
            smoking_map = {'never': 3, 'No Info': 4, 'current': 1, 'former': 0, 'not current': 2, 'ever': 5}

            gender = gender_map[request.form['gender']]
            age = float(request.form['age'])
            hypertension = int(request.form['hypertension'])
            heart_disease = int(request.form['heart_disease'])
            smoking = smoking_map[request.form['smoking_history']]
            bmi = float(request.form['bmi'])
            hba1c = float(request.form['hba1c'])
            glucose = float(request.form['glucose'])

            point = np.array([[gender, age, hypertension, heart_disease, smoking, bmi, hba1c, glucose]])

            pred_custom = custom_svm.predict(point)[0]
            pred_sklearn = sklearn_svm.predict(point)[0]

            def label(val):
                return "Diabetic (1)" if val == 1 else "Non-Diabetic (0)"

            result_html = f"""
            <h3>Prediction Result</h3>
            <table border="1" cellpadding="6" cellspacing="0">
                <tr><th>Model</th><th>Prediction</th></tr>
                <tr><td>Custom SVM</td><td>{label(pred_custom)}</td></tr>
                <tr><td>Sklearn SVM</td><td>{label(pred_sklearn)}</td></tr>
            </table>
            <br><a href="/predict">Try another</a>
            """

        except Exception as e:
            result_html = f"<p style='color:red'>Error: {str(e)}</p>"

    return form_html.format(result=result_html)

# -------------------------
# Run the app
# -------------------------
if __name__ == '__main__':
    app.run(debug=True)
