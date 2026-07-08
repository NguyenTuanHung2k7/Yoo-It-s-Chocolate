 const products = [
    //best seller
    {id:1, name:`Milk & Dark Assorted Chocolate, 9pc`,price:6, img:`img/seller/assort9pc.png`, status: `hot`, type:`dark`},
    {id:2, name:`Assorted Cherry Chocolate, 20pc`,price:49, img:`img/seller/cherry20pc.png`, status: `hot`, type:`milk`},
    {id:3, name:`Cream Assorted Chocolate, 12pc`,price:13, img:`img/seller/cream12pc.png`, status: `hot`, type:`dark`},
    {id:4, name:`Cream Assorted Chocolate,  24pc`,price:30, img:`img/seller/cream24pc.png`, status: `hot`, type:`dark`},
    {id:5, name:`Dark Assorted Chocolate, 9pc`,price:7.99 , img:`img/seller/dark9pc.png`, status: `hot`, type:`dark`},


    //on Sale
    
    {id:26, name:`Dark Cherry assorted Chocolate, 24pc`,price:40, salePrice:32, salePercentage:20, img:`img/sale/darkcherry24pc.png`, status: `onSale`, type:`dark`},
    {id:27, name:`Assorted Chocolate giftbox ,15pc`,price:30, salePrice:21, salePercentage:30 , img:`img/sale/gift15pc.png`, status: `onSale`, type:`assorted`},
    {id:28, name:`Milk Assorted Sea Salt Chocolate, 24pc`,price:34.99, salePrice:24.49, salePercentage:30 , img:`img/sale/milkseasalt24pc.png`, status: `onSale`, type:`milk`},
    {id:29, name:`Truffle Assorted Chocolate giftbox, 15pc`,price:26, salePrice:20.99, salePercentage:20 , img:`img/sale/truffle15pc.png`, status: `onSale`, type:`truffle`},


    //Milk Chocolate
    {
        id: 6,
        name:`Milk Sea Salt Assorted Chocolate, 15pc`,
        price:4.25,
        img:`img/milk/milk15pc.png`,
        status: `normal`,
        type:`milk`,
        category:`bar`
    },

    {
        id: 7,
        name:`Milk Assorted Chocolate, 18pc`,
        price:1.5,
        img:`img/milk/milk18pc.png`,
        status: `normal`,
        type:`milk`,
        category:`bar`
    },

    {
        id: 8,
        name:`Milk Assorted Chocolate, 24pc`,
        price:2.49,
        img:`img/milk/milk24pc.png`,
        status: `normal`,
        type:`milk`,
        category:`bar`
    },

        {
        id: 9,
        name:`Milk Assorted Chocolate, 30pc`,
        price:5,
        img:`img/milk/milk30pc.png`,
        status: `normal`,
        type:`milk`,
        category:`bar`
    },

    {
        id: 10,
        name:`Milk Assorted Chocolate, 32pc`,
        price:9,
        img:`img/milk/milk32pc.png`,
        status: `normal`,
        type:`milk`,
        category:`bar`
    },



    //Dark Chocolae bar
    {
        id: 11,
        name:`Dark Assorted Chocolate, 16pc `,
        price:2,
        img:`img/dark/dark16pc.png`,
        status: `normal`,
        type:`dark`,
        category:`bar`
    },

    {
        id: 12,
        name:`Dark Assorted Chocolate, 24pc `,
        price:6,
        img:`img/dark/dark24pc.png`,
        status: `normal`,
        type:`dark`,
        category:`bar`
    },
    {
        id: 13,
        name:`Dark Assorted Chocolate, 25pc `,
        price:6,
        img:`img/dark/dark25pc.png`,
        status: `normal`,
        type:`dark`,
        category:`bar`
    },
    {
        id: 14,
        name:`Dark Assorted Chocolate, 32pc `,
        price:6,
        img:`img/dark/dark32pc.png`,
        status: `normal`,
        type:`dark`,
        category:`bar`
    },
    {
        id: 15,
        name:`Dark Assorted Chocolate, 32pc `,
        price:8,
        img:`img/dark/dark32pcv2.png`,
        status: `normal`,
        type:`dark`,
        category:`bar`
    },
    


    //TRUFFLE CHOCOLATE
    {
        id: 16,
        name:`Mik Truffle Chocolate, 24pc`,
        price:99,
        img:`img/truffle chocolate/24pc.png`,
        status: `normal`,
        type:`truffle`,
        // category:`truffle`
    },  
    {
        id: 17,
        name:`Grand Dark Truffle Chocolate assortment, 24pc`,
        price:100,
        img:`img/truffle chocolate/dark24pc.png`,
        status: `normal`,
        type:`truffle`,
        // category:`truffle`
    },  
    {
        id: 18,
        name:`Dark Chocolate Truffles Gift Box, 15pc.`,
        price:58,
        img:`img/truffle chocolate/dark15pc.png`,
        status: `normal`,
        type:`truffle`,
        // category:`truffle`
    },  
    {
        id: 19,
        name:`Dark Chocolate Truffles Gift Box, 18pc.`,
        price:40,
        img:`img/truffle chocolate/18pc.png`,
        status: `normal`,
        type:`truffle`,
        // category:`truffle`
    },  
    {
        id: 20,
        name:`Chocolate Truffles assortment, 15pc`,
        price:13,
        img:`img/truffle chocolate/15pc.png`,
        status: `normal`,
        type:`truffle`,
        // category:`truffle`
    },  
      


    //Assorted Chocolate

    // {
    //     id:21,
    //     name: `Assorted Chocolate Gold Gift Box, Gold Ribbon, 72 pc.`,
    //     price:150,
    //     img:`img/assorted chocolate/milkassorted.png`,
    //     status: `normal`,
    //     type:`assorted`,
    //     // category:`assorted`
    // },
    // {
    //     id:22,
    //     name: `Assorted Chocolate Gold Gift Box, 25pc`,
    //     price:65,
    //     img:`img/assorted chocolate/25pc.png`,
    //     status: `normal`,
    //     type:`assorted`,
    //     // category:`assorted`
    // },
    // {
    //     id:23,
    //     name: `Mueller assorted Chocolates, 18pc`,
    //     price:28,
    //     img:`img/assorted chocolate/18pc.png`,
    //     status: `normal`,
    //     type:`assorted`,
    //     // category:`assorted`
    // },
    // {
    //     id:24,
    //     name: `Chocilo 48 Pack Chocolate Assortment Gift Box - 570g`,
    //     price:80,
    //     img:`img/assorted chocolate/darkassorted.png`,
    //     status: `normal`,
    //     type:`assorted`,
    //     // category:`assorted`
    // },
    // {
    //     id:25,
    //     name: `Purdys Assorted Chocolate Favourites Gift Box, 15pc`,
    //     price:48,
    //     img:`img/assorted chocolate/15pc.png`,
    //     status: `normal`,
    //     type:`assorted`,
    //     // category:`assorted`
    // },
    
];