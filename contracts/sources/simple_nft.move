/// @title Simple NFT Contract
/// @version 0.1.0
/// @license MIT
/// @authors Artitaya <contact@artitaya.dev> 

// === Imports ===
module simple_nft::simple_nft {
    use sui::url::{Self, Url};
    use sui::event;
    //use sui::object;
    //use sui::transfer;
    //use sui::tx_context;
    use std::ascii;

    // === Constants ===
    const TOTAL_SUPPLY: u64 = 1111;
    const MAX_URL_LENGTH: u64 = 2048; 
    const E_SUPPLY_EXHAUSTED: u64 = 0;
    const E_INVALID_URL: u64 = 1;
    //const E_UNAUTHORIZED: u64 = 2;

    // === Structs ===
    // public struct SIMPLE_NFT has drop {}
    public struct ArtworkNFT has key, store {
        id: object::UID,
        edition: u64,
        url: Url,
    }
    public struct MintState has key {
        id: object::UID,
        minted: u64,
    }
    //public struct AdminCap has key {
    //    id: object::UID,
    //   admin_address: address,
    //}

    // === Events ===
    public struct MintEvent has copy, drop {
        nft_id: address,
        edition: u64,
        url: ascii::String,
    }

    // === Test Helper Functions ===
    #[test_only]
    public(package) fun create_mint_state(sender: address, ctx: &mut tx_context::TxContext) {
        let mint_state = MintState {
            id: object::new(ctx),
            minted: 0,
        };
        transfer::transfer(mint_state, sender);
    }

    #[test_only]
    public(package) fun create_admin_cap(sender: address, ctx: &mut tx_context::TxContext) {
        let admin_cap = AdminCap {
            id: object::new(ctx),
            admin_address: sender,
        };
        transfer::transfer(admin_cap, sender);
    }

    // === Public Functions ===
    fun validate_url(url: vector<u8>): ascii::String {
        assert!(url.length() <= MAX_URL_LENGTH, E_INVALID_URL);
        let url_str = ascii::string(url);
        assert!(
            url_str.as_bytes().length() > 7 &&
            (
                (url_str.as_bytes()[0] == 104 && url_str.as_bytes()[1] == 116 && url_str.as_bytes()[2] == 116 && url_str.as_bytes()[3] == 112 && url_str.as_bytes()[4] == 58) ||
                (url_str.as_bytes()[0] == 104 && url_str.as_bytes()[1] == 116 && url_str.as_bytes()[2] == 116 && url_str.as_bytes()[3] == 112 && url_str.as_bytes()[4] == 115 && url_str.as_bytes()[5] == 58)
            ),
            E_INVALID_URL
        );
        let mut i = 0;
        while (i < url.length()) {
            assert!(url[i] >= 0x20 && url[i] <= 0x7E, E_INVALID_URL);
            i = i + 1;
        };
        url_str
    }

    fun init(ctx: &mut tx_context::TxContext) {
        let sender = tx_context::sender(ctx);
        transfer::share_object(MintState { id: object::new(ctx), minted: 0 });
        //transfer::transfer(AdminCap { id: object::new(ctx), admin_address: sender }, sender);
    }

    public entry fun mint(state: &mut MintState, url_bytes: vector<u8>, ctx: &mut tx_context::TxContext) {
        // assert!(tx_context::sender(ctx) == admin_cap.admin_address, E_UNAUTHORIZED);
        assert!(state.minted < TOTAL_SUPPLY, E_SUPPLY_EXHAUSTED);
        let url_str = validate_url(url_bytes);
        state.minted = state.minted + 1;
        let edition = state.minted;
        let nft = ArtworkNFT {
            id: object::new(ctx),
            edition,
            url: url::new_unsafe(url_str),
        };
        let nft_id = object::uid_to_address(&nft.id);
        transfer::public_transfer(nft, tx_context::sender(ctx));
        event::emit(MintEvent { nft_id, edition, url: url_str });
    }

    public fun get_edition(nft: &ArtworkNFT): u64 { nft.edition }

    public fun remaining_supply(state: &MintState): u64 { TOTAL_SUPPLY - state.minted }

    public fun get_minted(state: &MintState): u64 { state.minted }
}