'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { makeUrlQuery } from '@/lib/utils'; //he calls it 'formUrlQuery'

type PaginationProps = {
    page: number | string;
    totalPages: number;
    urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleClick = (btnType: string) => {
        const pageValue =
            btnType === 'next' ? Number(page) + 1 : Number(page) - 1;

        const newUrl = makeUrlQuery({
            params: searchParams.toString(),
            key: urlParamName || 'page',
            value: pageValue.toString()
        });

        router.push(newUrl);
    };

    return (
        <div className="flex gap-2">
            <Button
                size="lg"
                variant="outline"
                className="w-28"
                disabled={Number(page) <= 1}
                onClick={() => handleClick('prev')}
            >
                previous
            </Button>
            <Button
                size="lg"
                variant="outline"
                className="w-28"
                disabled={Number(page) >= totalPages}
                onClick={() => handleClick('next')}
            >
                next
            </Button>
        </div>
    );
};

export default Pagination;
