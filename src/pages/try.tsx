import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';

function Try() {
    const [timer, setTimer] = useState(3); // Initial timer value in seconds
    const [isDisabled, setIsDisabled] = useState(true); // Initial disabled state

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        // Clear interval when component unmounts
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (timer === 0) {
            setIsDisabled(false);
        }
    }, [timer]);

    const handleSkipAd = () => {
        // Add your skip ad logic here
        console.log('Skip Ad clicked');
    };

    return (
      <div>
        <div>Try</div>
        <Button onClick={handleSkipAd} isLoading={isDisabled}>
          {isDisabled ? `Skip Ad (${timer})` : "Skip Ad"}
        </Button>
      </div>
    );
}

export default Try;