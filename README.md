
## ImmersivΞ - 3D NFTs with AR

### Project Structure
- `frontend/`: Contains the React + TypeScript frontend code for the UI.
  - Run `cd frontend && npm install && npm run dev` to start the frontend.
- `contracts/`: Contains the Sui smart contract code (Move language).
  - Run `cd contracts && sui move build` to build the smart contract.
  - Run `cd contracts && sui move test` to test the smart contract.

### Deployment
- The smart contract in `contracts/` is ready to be deployed. Use the `deploy.ts` script in `frontend/src/` to deploy to Sui testnet.
  - Run `cd frontend && npx ts-node src/deploy.ts` to deploy.
- Ensure you have Sui tokens in your wallet for gas fees (request from testnet faucet).

### Next Steps
- Backend dev: Deploy the smart contract and integrate with the frontend (e.g., update `handleMint` in `frontend/src/components/Hero.tsx` to call the deployed contract).
- Frontend dev: Continue improving the UI and test the integration with the smart contract.