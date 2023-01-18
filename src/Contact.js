import { Box, Button } from '@mui/material';
import React from 'react';
import {usePrepareContractWrite,useContractWrite} from "wagmi";
import {abi_controller,fit_address,controller_address} from "./Contracts";
import {utils} from "ethers";

function Contact({url}) {
    // const new_url=url.slice(0,30);
    const new_url=utils.keccak256(utils.toUtf8Bytes(url));
    console.log(new_url);
    const { config, error } = usePrepareContractWrite({
    address: controller_address,
    abi: abi_controller,
    functionName: 'claimFunds',
    args:[new_url]
  })
  console.log(url);
  const {write}=useContractWrite(config);
  return (
    <Box display={'flex'} justifyContent='center' mt={'100px'}>
        <Button variant='contained' onClick={write}>Confirm</Button>
    </Box>
  )
}

export default Contact