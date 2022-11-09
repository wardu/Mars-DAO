import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import texture from "../../assets/images/mars-texture.jpg";

const Mars = () => {
  const colorMap = useLoader(TextureLoader, texture);

  return (
    <mesh rotation={[90, 0, 20]}>
      <sphereGeometry attach='geometry' args={[1, 30, 30]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
};
export default Mars;
