import Link from 'next/link';

import Menu from './menu';
import { LogoSVG } from './logoSVG';

const Header = () => {
    return (
        <header className="w-full border-b">
            <div className="wrapper flex-between">
                <div className="flex-start">
                    <Link href="/" className="flex-start gap-2">
                        <LogoSVG />
                    </Link>
                </div>
                <div className="space-x-2">
                    <Menu />
                </div>
            </div>
        </header>
    );
};

export default Header;
