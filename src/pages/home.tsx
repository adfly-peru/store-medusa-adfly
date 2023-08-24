import Layout from "@modules/layout/templates";
import HomeView from "@modules/home/templates/home-view";
import { FeaturedProductsProvider } from "@context/featured-products-context";

const Home = () => {
  return (
    <Layout>
      <FeaturedProductsProvider>
        <HomeView />
      </FeaturedProductsProvider>
    </Layout>
  );
};

export default Home;
