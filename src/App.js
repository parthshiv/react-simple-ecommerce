import React from "react";
import Layout from "../src/HOC/Layout/Layout";
import BurgerBuilder from "../src/Containers/BurgerBuilder/BurgerBuilder";

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
