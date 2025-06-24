import AppLayout from '@/layouts/app-layout'
import { Head, useForm } from '@inertiajs/react'
import { useState } from 'react'
import axios from 'axios'

const PredictDiabetes = ({ record }) => {
  const [showForm, setShowForm] = useState(false)
  const [result, setResult] = useState(null)

  const { data, setData, reset } = useForm({
    gender: '',
    age: '',
    hypertension: '',
    heart_disease: '',
    smoking_history: '',
    bmi: '',
    hba1c: '',
    glucose: ''
  })

  const handleOwnData = () => {
    if (record) {
      setData({
        gender: record.gender?.toLowerCase() || '',
        age: record.age || '',
        hypertension: record.hypertension ? 'Yes' : 'No',
        heart_disease: record.heart_disease ? 'Yes' : 'No',
        smoking_history: record.smoking_history?.toLowerCase() || '',
        bmi: record.bmi || '',
        hba1c: record.hba1c || '',
        glucose: record.glucose || ''
      })
      setShowForm(true)
      setResult(null)
    } else {
      alert('No health record found.')
    }
  }

  const handleCustomData = () => {
    reset()
    setShowForm(true)
    setResult(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

    // Handle special casing for smoking history
    const formatSmokingHistory = (val) => {
      if (val === 'no info') return 'No Info'
      return val
    }

    try {
      const payload = {
        gender: capitalize(data.gender),
        age: parseFloat(data.age),
        hypertension: data.hypertension === 'Yes' ? 1 : 0,
        heart_disease: data.heart_disease === 'Yes' ? 1 : 0,
        smoking_history: formatSmokingHistory(data.smoking_history),
        bmi: parseFloat(data.bmi),
        hba1c: parseFloat(data.hba1c),
        glucose: parseFloat(data.glucose)
      }

      const response = await axios.post('http://127.0.0.1:5000/predict', payload)
      setResult(
        `<div>
          <h2 class="text-xl font-bold mb-2">Prediction Result</h2>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>Custom SVM:</strong> ${response.data.custom_svm}</li>
            <li><strong>Sklearn SVM:</strong> ${response.data.sklearn_svm}</li>
          </ul>
        </div>`
      )
    } catch (error) {
      alert('Prediction failed: ' + error.message)
    }
  }

  return (
    <AppLayout>
      <Head title="Health" />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Predict Diabetes</h1>

        <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
          <button
            type="button"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            onClick={handleOwnData}
          >
            Use Own Data
          </button>
          <button
            type="button"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            onClick={handleCustomData}
          >
            Enter Custom Data
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { label: 'Gender', name: 'gender', type: 'select', options: ['female', 'male', 'other'] },
              { label: 'Age', name: 'age', type: 'number' },
              { label: 'Hypertension', name: 'hypertension', type: 'select', options: ['Yes', 'No'] },
              { label: 'Heart Disease', name: 'heart_disease', type: 'select', options: ['Yes', 'No'] },
              {
                label: 'Smoking History',
                name: 'smoking_history',
                type: 'select',
                options: ['never', 'No Info', 'current', 'former', 'not current', 'ever']
              },
              { label: 'BMI', name: 'bmi', type: 'number', step: '0.01' },
              { label: 'HbA1c', name: 'hba1c', type: 'number', step: '0.1' },
              { label: 'Glucose', name: 'glucose', type: 'number' }
            ].map(({ label, name, type, options, step }) => (
              <div key={name}>
                <label className="block font-medium mb-1">{label}:</label>
                {type === 'select' ? (
                  <select
                    name={name}
                    value={data[name] || ''}
                    onChange={e => setData(name, e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">-- Select --</option>
                    {options.map(opt => (
                      <option key={opt} value={opt.toLowerCase()}>
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type}
                    step={step}
                    name={name}
                    value={data[name] || ''}
                    onChange={e => setData(name, e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Predict
            </button>
          </form>
        )}

        {result && (
          <div
            className="mt-8 p-4 border rounded bg-gray-50"
            dangerouslySetInnerHTML={{ __html: result }}
          />
        )}
      </div>
    </AppLayout>
  )
}

export default PredictDiabetes
