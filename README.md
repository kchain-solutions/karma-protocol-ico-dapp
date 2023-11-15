# What is EarnKarma?

"EarnKarma is a unique blockchain-based marketplace where you can showcase your art, contribute your time, or utilize your skills to earn. You can also choose to donate a portion of your earnings to causes that resonate with you."

This application serves as a foundation for the EarnKarma marketplace and DAO operations.

To learn more, read our [lightpaper](./public/Karma%20-%20Marketplace%20of%20Goodness%20-%20lightpaper.pdf).

# Initial Coin Offering (ICO)
Through this application, you can interact with dedicated smart contracts for the ICO phase and purchase GLDKRM using stablecoins (USDC, USDT).

Purchasing GLDKRM not only supports the development of the protocol but also enables the collection of revenues generated from the protocol's usage. These revenues will be distributed based on the blockchain chosen for deployment (ETH for Ethereum, Matic for Polygon, etc.).

# How to Launch the Application Locally

1. **Environment Variable Configuration**
   The following values are used for Sepolia:
    ```
    NEXT_PUBLIC_USDC_ADDRESS="0x64AAC408993Fd4092b7DdF0Ca204c475618Ecc8e"
    NEXT_PUBLIC_USDT_ADDRESS="0x34b4C111078B358d175D42D4B075Dd9E3a8Bb2Ea"
    NEXT_PUBLIC_GLDKRM_ADDRESS="0xf92735696823056fbF96E1EE58a0666c06AC27EF"
    NEXT_PUBLIC_ICO_ADDRESS="0x8e5A91f9e981ddfa51f10600857a6F5cE49fC6E4"
    NEXT_PUBLIC_STABLECOIN_GLDKRM_CON_RATE="30"
    NEXT_PUBLIC_TX_SCANNER="https://sepolia.etherscan.io"
    NEXT_PUBLIC_IS_TEST="true"
    NODE_PROVIDER="<<RPC ENDPOINT>>"
    ```

2. **Running the Application Locally**
Use the command `npm run dev` to start the application.

# References
- [EarnKarma.io](https://earnkarma.io)
- [kchain.solutions](https://kchain.solutions)
- [Medium blog](https://kchainsolutions.medium.com/)
- [Follow us on LinkedIn](https://www.linkedin.com/company/kchain-solutions)
