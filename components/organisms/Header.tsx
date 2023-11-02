import React, {useState} from "react"
import { useWeb3React } from '@web3-react/core'

import Web3ConnectionOptions from '../molecules/Web3ConnectionOptions'
import { ConnectionType, switchNetwork } from '../../utils/connections'
import { CHAIN_INFO, INPUT_CHAIN_URL } from '../../utils/constants' 


const Header = () => {
    const { chainId, account, isActive } = useWeb3React()
    const [blockNumber, setBlockNumber] = useState<number>(0)
    const [connectionType, setConnectionType] = useState<ConnectionType | null>(null)

    return(
        <Web3ConnectionOptions
            activeConnectionType={connectionType}
            isConnectionActive={isActive}
            onActivate={setConnectionType}
            onDeactivate={setConnectionType}
      />
    )
}


export default Header