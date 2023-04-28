import { CSSProperties } from 'react'
import { PulseLoader } from 'react-spinners';

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

interface LoaderProps {
    size?: number;
    isLoading?: boolean;
}

const Loader: React.FC<LoaderProps> = ({size, isLoading}) => {
  return (
    <PulseLoader
        color="#fff"
        loading={isLoading}
        cssOverride={override}
        size={size || 10}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> 
  )
}

export default Loader