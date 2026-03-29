import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { router, useForm } from '@inertiajs/react';
import { Search as SearchIcon, X } from 'lucide-react';
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
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        const query = data.search.trim();
        if (query.length < 1) return;

        const prefix = query.charAt(0);
        const hasPrefix = ['#', '@', '*'].includes(prefix);
        const searchTerm = hasPrefix ? query.slice(1).trim() : query;

        if (hasPrefix && searchTerm.length < 1) return;

        const routeMap: Record<string, string> = {
            '#': 'search.health-record',
            '@': 'search.medicine',
        };

        timeoutRef.current = setTimeout(() => {
            if (hasPrefix && routeMap[prefix]) {
                get(route(routeMap[prefix], { search: searchTerm }));
            } else {
                router.get(route('search.health-record', { search: query }));
            }
        }, 500);
    };

    // Close on ESC
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
                    className="flex flex-row items-center justify-center gap-0"
                >
                    <Input
                        onClick={() => setShow(true)}
                        className={`rounded-r-none transition-all duration-300 ${
                            show ? 'w-96' : 'w-32'
                        }`}
                        placeholder="Search Health or Medicine"
                        name="search"
                        type="text"
                        value={data.search}
                        onChange={(e) => setData('search', e.target.value)}
                    />
                    <Button
                        type="submit"
                        className="rounded-l-none"
                        disabled={processing}
                        size="default"
                    >
                        <SearchIcon className="h-4 w-4" />
                    </Button>

                    {show && (
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="ml-2 md:hidden"
                            onClick={() => setShow(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </form>
                <InputError message={errors.search} className="mt-1" />

                {showMiddlewareMessage && (
                    <Card className="absolute left-1/2 mt-2 w-[400px] -translate-x-1/2 shadow-lg">
                        <CardContent className="p-4">
                            <h2 className="mb-2 text-sm font-semibold">Middleware Notice</h2>
                            <p className="text-sm text-muted-foreground">
                                You are searching{' '}
                                {['#', '*'].includes(prefix)
                                    ? 'Health Records'
                                    : 'Health Records (default search)'}
                                . This search is protected by middleware (authentication & rate
                                limiting).
                            </p>
                        </CardContent>
                    </Card>
                )}

                {show && !showMiddlewareMessage && (
                    <Card className="absolute left-1/2 mt-2 w-[400px] -translate-x-1/2 shadow-lg">
                        <CardContent className="p-4">
                            <h2 className="mb-2 text-sm font-semibold">Search Syntax</h2>
                            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                                <li>
                                    <code className="rounded bg-muted px-1">#</code> — Health Records
                                </li>
                                <li>
                                    <code className="rounded bg-muted px-1">@</code> — Medicine
                                </li>
                                <li>
                                    <code className="rounded bg-muted px-1">*</code> — Health Records
                                </li>
                                <li>
                                    <strong>No prefix</strong> — Search health records by default
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
};

export default Searchbar;