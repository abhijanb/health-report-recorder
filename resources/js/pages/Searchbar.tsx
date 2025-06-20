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
    const formRef = useRef<HTMLFormElement | null>(null);
    const { data, setData, processing, get, errors } = useForm<Search>({
        search: '',
    });

    const [show, setShow] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const query = data.search.trim();
        if (query.length < 2) return;

        const prefix = query.charAt(0);
        const searchTerm = query.slice(1).trim();

        const routeMap: Record<string, string> = {
            '*': 'search.all',
            '@': 'search.user',
            '#': 'search.doctor',
            '!': 'search.urgent',
            '%': 'search.public',
            '^': 'search.tag',
            '$': 'search.billing',
            '~': 'search.date',
            ':': 'search.field',
            '>': 'search.future',
        };

        if (routeMap[prefix]) {
            get(route(routeMap[prefix], { search: searchTerm }));
        } else {
            router.get(route('search.all', { search: searchTerm }));
        }
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

    return (
        <>
            {/* Overlay: works on both desktop and mobile */}
            {show && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={handleClickOutside}
                />
            )}

            {/* Foreground content */}
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
                        placeholder="Search"
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
                    {/* Mobile Close Button */}
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

                {show && (
                    <div className="absolute left-1/2 mt-2 w-[500px] -translate-x-1/2 rounded-md bg-white p-4 text-sm text-black shadow-xl">
                        <h2 className="mb-2 font-semibold">Search Syntax</h2>
                        <ul className="list-inside list-disc space-y-1 text-sm">
                            <li><code>*</code> — All records</li>
                            <li><code>@</code> — User</li>
                            <li><code>#</code> — Doctor</li>
                            <li><code>!</code> — Urgent</li>
                            <li><code>%</code> — Public</li>
                            <li><code>^</code> — Tag</li>
                            <li><code>$</code> — Billing</li>
                            <li><code>~</code> — Date</li>
                            <li><code>:</code> — Field</li>
                            <li><code>&gt;</code> — Future</li>
                            <li><strong>No prefix</strong> — Own records</li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};



export default Searchbar;
