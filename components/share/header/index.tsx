import { ShoppingCart, UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/contants';

const Header = () => {
    return ( <header className="w-full border-b">
        <div className="wrapper flex-between">
            <div className="flex-start">
                <Link href="/" className="flex-start gap-2">
                    <Image src="/images/logo.svg" alt={`${APP_NAME} logo text`} height={100} width={100} priority={true} className="hidden lg:block"/>
                    <Image src="/images/mankind.svg" alt={`${APP_NAME} logo`} height={60} width={60} priority={true}/>
                </Link>
            </div>
            <div className="space-x-2">
                <Button asChild variant="ghost">
                    <Link href="/cart">
                        <ShoppingCart/> Cart
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/sign-in">
                        <UserIcon/> Sign in
                    </Link>
                </Button>
            </div>
        </div>
    </header> );
}
 
export default Header;