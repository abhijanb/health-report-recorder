import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

type Relation = {
    relation_user_id: number;
    relation_user_name: string;
    relationship_name: string;
    relationship_avatar: string;
};
type Props = {
    relations: {
        data: Relation[];
        current_page: number;
        next_page_url: number;
        prev_page_url: number;
        last_page: number;
    };
};

const RelationList = ({ relations }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [code, setCode] = useState('');
    const [relationship, setRelationship] = useState('');
    const [page, setPage] = useState(relations.current_page);

    // Function to generate a 6-digit random code
    const generateCode = () => {
        const generatedCode = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit code
        setCode(generatedCode.toString()); // Convert to string to fit the input
    };

    const handleAddRelation = () => {
        // Validation to ensure both code and relationship are provided
        if (!code || !relationship) {
            alert('Please enter both a code and a relationship.');
            return;
        }

        // Make a POST request to the Laravel backend with both code and relationship
        router.post('/relation/code', {
            code,
            relationship,
        });

        setShowModal(false);
        setCode('');
        setRelationship('');
    };

    return (
        <AppLayout>
            <Head title="Medicine" />
            <div className="mx-auto mt-10 max-w-4xl space-y-6 px-4">
                {/* Add Relation Button */}
                <div className="flex justify-end">
                    <button
                        onClick={() => setShowModal(true)}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-white shadow transition hover:bg-indigo-700"
                    >
                        + Add Relation
                    </button>
                </div>

                {/* Relations List */}
                {relations.data.length > 0 ? (
                    relations.data.map((relation, index) => (
                        <>
                            <Link
                                key={index}
                                href={`/relation/${relation.relation_user_id}`}
                                className="block transform rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-[1.015] hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
                            >
                                <div className="flex items-center space-x-5 p-6">
                                    <img
                                        src={relation.relationship_avatar}
                                        alt={relation.relation_user_name}
                                        className="h-16 w-16 rounded-full border-2 border-indigo-500 object-cover dark:border-indigo-400"
                                    />

                                    <div className="flex-1 space-y-1">
                                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{relation.relation_user_name}</h2>

                                        <div className="text-sm text-gray-700 dark:text-gray-300">
                                            <span className="mr-1">Relationship:</span>
                                            <span className="font-semibold text-indigo-600 dark:text-indigo-400">{relation.relationship_name}</span>
                                        </div>
                                    </div>

                                    <div className="hidden text-xs text-gray-400 sm:block dark:text-gray-500">View →</div>
                                </div>
                            </Link>
                            <div className="mt-6 flex flex-col items-center space-y-4">
                                {/* Prev Page Button */}
                                <div>
                                    {relations.prev_page_url ? (
                                        <Link
                                            href={relations.prev_page_url}
                                            className="rounded-lg bg-indigo-500 px-4 py-2 text-white transition hover:bg-indigo-600"
                                        >
                                            ← Prev
                                        </Link>
                                    ) : (
                                        <span className="cursor-not-allowed rounded-lg bg-gray-300 px-4 py-2 text-gray-500">← Prev</span>
                                    )}
                                </div>

                                {/* Page Numbers */}
                                <div className="flex flex-wrap justify-center gap-2">
                                    {[...Array(relations.last_page)].map((_, index) => (
                                        <Link
                                            key={index}
                                            href={`/relation?page=${index + 1}`}
                                            className={`rounded-md px-3 py-1 transition ${
                                                page === index + 1
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            {index + 1}
                                        </Link>
                                    ))}
                                </div>

                                {/* Next Page Button */}
                                <div>
                                    {relations.next_page_url ? (
                                        <Link
                                            href={relations.next_page_url}
                                            className="rounded-lg bg-indigo-500 px-4 py-2 text-white transition hover:bg-indigo-600"
                                        >
                                            Next →
                                        </Link>
                                    ) : (
                                        <span className="cursor-not-allowed rounded-lg bg-gray-300 px-4 py-2 text-gray-500">Next →</span>
                                    )}
                                </div>
                            </div>
                        </>
                    ))
                ) : (
                    <div className="flex items-center justify-center py-12">
                        <span className="text-lg text-gray-500 dark:text-gray-400">No relations found.</span>
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm">
                        <div className="relative z-60 w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
                            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Enter 6-Digit Code and Relation</h2>

                            {/* Code Input */}
                            <input
                                type="text"
                                maxLength={6}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                placeholder="e.g. 123456"
                            />

                            {/* Generate Code Button */}
                            <button
                                onClick={generateCode}
                                className="mt-2 rounded-md bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
                            >
                                Generate Code
                            </button>

                            {/* Relationship Input */}
                            <input
                                type="text"
                                value={relationship}
                                onChange={(e) => setRelationship(e.target.value)}
                                className="mt-4 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                placeholder="Enter relationship (e.g. Friend, Family)"
                            />

                            <div className="mt-4 flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                                >
                                    Cancel
                                </button>

                                <button onClick={handleAddRelation} className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default RelationList;
