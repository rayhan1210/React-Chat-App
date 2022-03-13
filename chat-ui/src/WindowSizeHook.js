import { useEffect, useState } from "react";



function GetWindowSize(){
    //initially set windowsize width and height to null using usestate hooks
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    //get the updated window size each time window size changes using useeffect hook which performs for each render of the component
    useEffect(() => {
        function handleResize(){
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    },[]);
    return windowSize;
}

export default GetWindowSize;