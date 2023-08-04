module stork_oracle_verifier::stork_price_demo{

    use std::string::{Self,String};
    use std::option::{Self,Option};

    use sui::object_table::{Self, ObjectTable};
    use sui::tx_context::{Self, TxContext};
    use sui::object::{Self, UID};
    use sui::clock::Clock;
    use sui::transfer;

    struct AdminCap has key {
        id: UID
    }

    struct Price has key, store{
        id: UID,
        name: String,
        price: Option<u64>,
        timestamp: u64
    }

    struct PriceListStore has key, store{
        id: UID,
        price_list: ObjectTable<String,Price>
    }

    fun init(ctx: &mut TxContext) {
        let price1 = Price {
            id: object::new(ctx),
            name: string::utf8(b"SUIUSD"),
            price: option::some(1002548),
            timestamp: 121115550
        };

        let price2 = Price {
            id: object::new(ctx),
            name: string::utf8(b"BTCUSD"),
            price: option::some(6984564655),
            timestamp: 13132132132132
        };

        let price3 = Price {
            id: object::new(ctx),
            name: string::utf8(b"BTCETH"),
            price: option::some(888444555),
            timestamp: 9879878979798
        };

        let price4 = Price {
            id: object::new(ctx),
            name: string::utf8(b"ETHSUI"),
            price: option::some(987654321321),
            timestamp: 6565465465465
        };

        let priceListOT = PriceListStore {
            id: object::new(ctx),
            price_list: object_table::new(ctx)
        };


        object_table::add(&mut priceListOT.price_list, price1.name, price1);
        object_table::add(&mut priceListOT.price_list, price2.name, price2);
        object_table::add(&mut priceListOT.price_list, price3.name, price3);
        object_table::add(&mut priceListOT.price_list, price4.name, price4);

        transfer::transfer(priceListOT, tx_context::sender(ctx));

        transfer::transfer(AdminCap{id: object::new(ctx)}, tx_context::sender(ctx));
    }

    public fun update_price_object_table(_: &AdminCap,
                                         priceListOT : &mut PriceListStore,
                                         assetPairName: String,
                                         new_price: u64,
                                         clock: &Clock) {
        let price : &mut Price =  object_table::borrow_mut(&mut priceListOT.price_list, assetPairName);
        price.price = option::some(new_price);
        price.timestamp = sui::clock::timestamp_ms(clock);

    }

}