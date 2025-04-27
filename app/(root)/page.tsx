import ProductList from '@/components/shared/product/product-list';
import { getLatestProducts } from '@/lib/actions/product.actions';
import IconBoxes from '@/components/icon-boxes';
export const metadata = {
    title: 'home'
};

const Homepage = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 1500));   //timeout test

    const latestProducts = await getLatestProducts();
    return (
        <>
            <ProductList
                data={latestProducts}
                limit={4}
                title="newest arrivals"
            />
            <IconBoxes />
        </>
    );
};

export default Homepage;
