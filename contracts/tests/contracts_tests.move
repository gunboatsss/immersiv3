/// This module contains unit tests for the `simple_nft` contract.

#[test_only]
module simple_nft::simple_nft_tests {
    // === Imports for Testing ===
    use simple_nft::simple_nft::{Self, AdminCap, MintState, ArtworkNFT};
    use sui::test_scenario;

   // === Test Error Codes ===
    const E_WRONG_EDITION: u64 = 1;
    const E_WRONG_REMAINING: u64 = 2;
    const E_WRONG_MINTED: u64 = 3;

    // === Test Functions ===
    /// @test
    /// Tests the successful minting of an NFT.
    /// It verifies that:
    /// 1. An NFT is successfully minted.
    /// 2. The edition number of the minted NFT is correct.
    /// 3. The remaining supply is updated correctly after minting.
    fun test_mint_success() {
        // Define the test administrator's address.
        let admin = @0x1;
        let mut scenario_val = test_scenario::begin(admin);
        let scenario = &mut scenario_val;

        // Initialize contract state: create MintState and AdminCap and transfer to admin.
        let ctx = test_scenario::ctx(scenario);
        simple_nft::create_mint_state(admin, ctx);
        simple_nft::create_admin_cap(admin, ctx);

        // Advance to the next transaction, acting as the admin.
        test_scenario::next_tx(scenario, admin);
        let mut mint_state = test_scenario::take_from_sender<MintState>(scenario);
        let admin_cap = test_scenario::take_from_sender<AdminCap>(scenario);

        // Advance to the next transaction to perform the minting operation.
        test_scenario::next_tx(scenario, admin);
        simple_nft::mint(
            &admin_cap,
            &mut mint_state,
            b"https://example.com/nft.glb",
            test_scenario::ctx(scenario)
        );

        // Advance to the next transaction to check the results.
        test_scenario::next_tx(scenario, admin);
        let nft = test_scenario::take_from_sender<ArtworkNFT>(scenario);
        // Assert that the edition number of the minted NFT is 1 (first mint).
        assert!(simple_nft::get_edition(&nft) == 1, E_WRONG_EDITION);

        // Get the remaining supply and assert it's 1110 (TOTAL_SUPPLY - 1 minted).
        let remaining = simple_nft::remaining_supply(&mint_state);
        assert!(remaining == 1110, E_WRONG_REMAINING);

        // Return all objects back to the admin's address in the scenario.
        test_scenario::return_to_sender(scenario, nft);
        test_scenario::return_to_sender(scenario, admin_cap);
        test_scenario::return_to_sender(scenario, mint_state);
        test_scenario::end(scenario_val);
    }

    /// @test
    /// Tests that the `minted` count in `MintState` increases correctly after an NFT is minted.
    /// It verifies the initial minted count and the count after one mint operation.

    fun test_mint_increases_count() {
        let admin = @0x1;
        let mut scenario_val = test_scenario::begin(admin);
        let scenario = &mut scenario_val;
        
        // Initialize contract state: create MintState and AdminCap.
        let ctx = test_scenario::ctx(scenario);
        simple_nft::create_mint_state(admin, ctx);
        simple_nft::create_admin_cap(admin, ctx);

        // Advance to the next transaction and take objects from the admin.
        test_scenario::next_tx(scenario, admin);
        let mut mint_state = test_scenario::take_from_sender<MintState>(scenario);
        let admin_cap = test_scenario::take_from_sender<AdminCap>(scenario);

        // Assert that the initial minted count is 0.
        assert!(simple_nft::get_minted(&mint_state) == 0, E_WRONG_MINTED);

        // Advance to the next transaction and mint an NFT.
        test_scenario::next_tx(scenario, admin);
        simple_nft::mint(
            &admin_cap,
            &mut mint_state,
            b"https://example.com/nft.glb",
            test_scenario::ctx(scenario)
        );

        // Assert that the minted count has increased to 1 after the mint operation.
        assert!(simple_nft::get_minted(&mint_state) == 1, E_WRONG_MINTED);

        // Return objects to the sender.
        test_scenario::return_to_sender(scenario, admin_cap);
        test_scenario::return_to_sender(scenario, mint_state);
        test_scenario::end(scenario_val);
    }
}