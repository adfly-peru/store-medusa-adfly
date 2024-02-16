import Layout from "@modules/layout/templates";
import HomeView from "@modules/home/templates/home-view";
import { FeaturedProductsProvider } from "@context/featured-products-context";
import CollaboratorModals from "@modules/modals/templates";

const Home = () => {
  return (
    <Layout>
      <CollaboratorModals>
        <FeaturedProductsProvider>
          <HomeView />
        </FeaturedProductsProvider>
      </CollaboratorModals>
    </Layout>
  );
};

export default Home;
