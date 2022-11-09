import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Mars from "../Mars/Mars";
import { OrbitControls } from "@react-three/drei";

import "./Login.scss";

const Login = () => {
  return (
    <section className='login-main'>
      <h1>Welcome Earthling</h1>
      <p>
        Mars DAO is the governance portal for proposals and voting on Mars-based
        projects and life. Please connect your wallet to get started
      </p>
      <Canvas className='canvas'>
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} color={"#a86a19"} />
        <directionalLight
          position={[-2, 5, -2]}
          intensity={1}
          color={"#a51a33"}
        />
        <Suspense fallback={null}>
          <Mars />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Login;
