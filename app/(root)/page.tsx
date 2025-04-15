import ProductList from '@/components/share/product/product-list';
import { getLatestProducts } from '@/lib/actions/product.actions';

export const metadata = {
    title: 'home'
};

const Homepage = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 1500));   //timeout test

    const latestProducts = await getLatestProducts();
    return (
        <ProductList data={latestProducts} limit={4} title="newest arrivals" />
    );
};

export default Homepage;
