import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { router, useForm } from '@inertiajs/react';
import { Search as SearchIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type Search = {
    search: string;
};

const Searchbar = () => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);
    const { data, setData, processing, get, errors } = useForm<Search>({
        search: '',
    });

    const [show, setShow] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        const query = data.search.trim();

        if (query.length < 1) return; // Allow single char query with prefix

        const prefix = query.charAt(0);
        const hasPrefix = ['#', '@', '*'].includes(prefix);
        const searchTerm = hasPrefix ? query.slice(1).trim() : query;

        if (hasPrefix && searchTerm.length < 1) {
            // If prefix present but no search term, do nothing
            return;
        }

        const routeMap: Record<string, string> = {
            '#': 'search.health-record',
            '@': 'search.medicine',
            // '*': 'search.health-record',
        };
timeoutRef.current = setTimeout(() => {
        if (hasPrefix && routeMap[prefix]) {
            get(route(routeMap[prefix], { search: searchTerm }));
        } else {
            router.get(route('search.health-record', { search: query }));
        }
},500);

    };

    // Close on ESC (desktop)
    useEffect(() => {
        const closeOnEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShow(false);
        };
        window.addEventListener('keydown', closeOnEscape);
        return () => window.removeEventListener('keydown', closeOnEscape);
    }, []);

    // Click outside to close
    const handleClickOutside = (e: React.MouseEvent) => {
        if (formRef.current && !formRef.current.contains(e.target as Node)) {
            setShow(false);
        }
    };

    // Determine if middleware-like message should show for prefixes # or * or no prefix
    const prefix = data.search.charAt(0);
    const showMiddlewareMessage =
        ['#', '*'].includes(prefix) || (data.search.length > 0 && !['#', '@', '*'].includes(prefix));

    return (
        <>
            {show && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={handleClickOutside}
                />
            )}

            <div className="relative z-50">
                <form
                    ref={formRef}
                    onSubmit={submit}
                    className="flex flex-row items-center justify-center gap-0 transition-all duration-300 ease-in-out"
                >
                    <Input
                        onClick={() => setShow(true)}
                        className={`border border-r-0 transition-all duration-300 ease-in-out ${
                            show ? 'w-96' : 'w-32'
                        }`}
                        placeholder="Search Health or Medicine"
                        name="search"
                        type="text"
                        value={data.search}
                        onChange={(e) => setData('search', e.target.value)}
                    />
                    <InputError message={errors.search} />
                    <Button
                        type="submit"
                        className="rounded-l-none bg-blue-600 text-white hover:bg-blue-500"
                        disabled={processing}
                    >
                        <SearchIcon className="h-4 w-4" />
                    </Button>

                    {show && (
                        <button
                            type="button"
                            className="ml-2 px-2 py-1 text-white bg-red-600 rounded hover:bg-red-500 md:hidden"
                            onClick={() => setShow(false)}
                        >
                            Close
                        </button>
                    )}
                </form>

                {showMiddlewareMessage && (
                    <div className="absolute left-1/2 mt-2 w-[400px] -translate-x-1/2 rounded-md bg-yellow-100 p-4 text-sm text-black shadow-xl">
                        <h2 className="mb-2 font-semibold">Middleware Notice</h2>
                        <p>
                            You are searching{' '}
                            {['#', '*'].includes(prefix)
                                ? 'Health Records'
                                : 'Health Records (default search)'}.
                            This search is protected by middleware (authentication & rate limiting).
                        </p>
                    </div>
                )}

                {show && !showMiddlewareMessage && (
                    <div className="absolute left-1/2 mt-2 w-[400px] -translate-x-1/2 rounded-md bg-white p-4 text-sm text-black shadow-xl">
                        <h2 className="mb-2 font-semibold">Search Syntax</h2>
                        <ul className="list-inside list-disc space-y-1 text-sm">
                            <li>
                                <code>#</code> — Health Records
                            </li>
                            <li>
                                <code>@</code> — Medicine
                            </li>
                            <li>
                                <code>*</code> — Health Records
                            </li>
                            <li>
                                <strong>No prefix</strong> — Search health records by default
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default Searchbar;
