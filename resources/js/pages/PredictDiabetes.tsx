import AppLayout from '@/layouts/app-layout'
import { Head, useForm } from '@inertiajs/react'
import { useState } from 'react'

const PredictDiabetes = ({ record }) => {
  const [showForm, setShowForm] = useState(false)

  const { data, setData, post, reset } = useForm({
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
        hypertension: record.hypertension || '',
        heart_disease: record.heart_disease || '',
        smoking_history: record.smoking_history || '',
        bmi: record.bmi || '',
        hba1c: record.hba1c || '',
        glucose: record.glucose || ''
      })
      setShowForm(true)
    } else {
      alert('No health record found.')
    }
  }

  const handleCustomData = () => {
    reset()
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/predict', {
      preserveScroll: true,
      onSuccess: () => alert('Prediction submitted!')
    })
  }

  return (
    <AppLayout>
      <Head title="Health" />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Predict Diabetes</h1>

        <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            onClick={handleOwnData}
          >
            Use Own Data
          </button>

          <button
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
              { label: 'Hypertension (0/1)', name: 'hypertension', type: 'number' },
              { label: 'Heart Disease (0/1)', name: 'heart_disease', type: 'number' },
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
      </div>
    </AppLayout>
  )
}

export default PredictDiabetes
