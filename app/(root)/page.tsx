import sampleData from '@/db/sample-data';
import ProductList from '@/components/share/product/product-list';

export const metadata = {
    title: 'home'
};

const Homepage = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 1500));   //timeout test

    return (
        <ProductList
            data={sampleData.products}
            limit={4}
            title="newest arrivals"
        />
    );
};

export default Homepage;
