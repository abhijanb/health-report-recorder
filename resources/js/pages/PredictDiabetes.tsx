import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const PredictDiabetes = ({ record }) => {
    const [showForm, setShowForm] = useState(false);
    const [result, setResult] = useState(null);

    const { data, setData, reset } = useForm({
        gender: '',
        age: '',
        hypertension: '',
        heart_disease: '',
        smoking_history: '',
        bmi: '',
        hba1c: '',
        glucose: '',
    });

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
                glucose: record.glucose || '',
            });
            setShowForm(true);
            setResult(null);
        } else {
            alert('No health record found.');
        }
    };

    const handleCustomData = () => {
        reset();
        setShowForm(true);
        setResult(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
        const formatSmokingHistory = (val) => (val === 'no info' ? 'No Info' : val);

        try {
            const payload = {
                gender: capitalize(data.gender),
                age: parseFloat(data.age),
                hypertension: data.hypertension === 'Yes' ? 1 : 0,
                heart_disease: data.heart_disease === 'Yes' ? 1 : 0,
                smoking_history: formatSmokingHistory(data.smoking_history),
                bmi: parseFloat(data.bmi),
                hba1c: parseFloat(data.hba1c),
                glucose: parseFloat(data.glucose),
            };

            const response = await axios.post('http://127.0.0.1:5000/predict', payload);
            setResult(response.data);
        } catch (error) {
            alert('Prediction failed: ' + error.message);
        }
    };

    return (
        <AppLayout>
            <Head title="Health" />
            <div className="mx-auto max-w-3xl px-4 py-12">
                <h1 className="mb-8 text-center text-3xl font-semibold">Predict Diabetes</h1>

                <div className="mb-8 flex flex-col justify-center gap-6 sm:flex-row">
                    <Button onClick={handleOwnData} variant="default" size="lg">
                        Use Own Data
                    </Button>
                    <Button onClick={handleCustomData} variant="outline" size="lg">
                        Enter Custom Data
                    </Button>
                </div>

                {showForm && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Enter your details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Gender */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium">Gender</label>
                                    <Select
                                        value={data.gender}
                                        onValueChange={(val) => setData('gender', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Age */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium">Age</label>
                                    <Input
                                        type="number"
                                        value={data.age}
                                        onChange={(e) => setData('age', e.target.value)}
                                        placeholder="Enter age"
                                    />
                                </div>

                                {/* Hypertension */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Hypertension
                                    </label>
                                    <Select
                                        value={data.hypertension}
                                        onValueChange={(val) => setData('hypertension', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Yes">Yes</SelectItem>
                                            <SelectItem value="No">No</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Heart Disease */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Heart Disease
                                    </label>
                                    <Select
                                        value={data.heart_disease}
                                        onValueChange={(val) => setData('heart_disease', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Yes">Yes</SelectItem>
                                            <SelectItem value="No">No</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Smoking History */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Smoking History
                                    </label>
                                    <Select
                                        value={data.smoking_history}
                                        onValueChange={(val) => setData('smoking_history', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="never">Never</SelectItem>
                                            <SelectItem value="no info">No Info</SelectItem>
                                            <SelectItem value="current">Current</SelectItem>
                                            <SelectItem value="former">Former</SelectItem>
                                            <SelectItem value="not current">
                                                Not Current
                                            </SelectItem>
                                            <SelectItem value="ever">Ever</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* BMI */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium">BMI</label>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={data.bmi}
                                        onChange={(e) => setData('bmi', e.target.value)}
                                        placeholder="e.g., 25.4"
                                    />
                                </div>

                                {/* HbA1c */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium">HbA1c</label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        value={data.hba1c}
                                        onChange={(e) => setData('hba1c', e.target.value)}
                                        placeholder="e.g., 5.7"
                                    />
                                </div>

                                {/* Glucose */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Glucose
                                    </label>
                                    <Input
                                        type="number"
                                        value={data.glucose}
                                        onChange={(e) => setData('glucose', e.target.value)}
                                        placeholder="e.g., 120"
                                    />
                                </div>

                                <Button type="submit" className="w-full" size="lg">
                                    Predict
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {result && (
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Prediction Result</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                <li>
                                    <strong>Custom SVM:</strong> {result.custom_svm}
                                </li>
                                <li>
                                    <strong>Sklearn SVM:</strong> {result.sklearn_svm}
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
};

export default PredictDiabetes;