shopify.extend('WebPixel::Render', function(api) {
    var analytics = api.analytics,
        browser = api.browser,
        init = api.init;
    // Because we must use an await to get cookie data, we must wrap the get
    // in an async function. We also want the data pre-fetched and available to
    // us within the checkout_completed subscribe event, so we're storing it
    // within a variable.

    let optimizelyEndUserId;
    async function getUserId() {
        optimizelyEndUserId = await browser.cookie.get('optimizelyEndUserId');
        console.log('User ID:', optimizelyEndUserId);
    }

    getUserId();

    analytics.subscribe('checkout_completed', (event) => {
        const payload = {
            // set Optimizely Account ID
            account_id: "00000000000",
            visitors: [{
                visitor_id: optimizelyEndUserId,
                attributes: [],
                snapshots: [{
                    decisions: [],
                    events: [{
                            key: "trackRevenue",
                            // set unique Event ID
                            entity_id: 00000000000,
                            timestamp: new Date(event.timestamp).getTime(),
                            uuid: event.id,
                            revenue: event.data.checkout.totalPrice.amount * 100 // in cents
                        },
                        {
                            key: "orderCompleted",
                            // set unique Event ID
                            entity_id: 00000000000,
                            timestamp: new Date(event.timestamp).getTime(),
                            uuid: event.id
                        }
                    ]
                }]
            }],
            anonymize_ip: true,
            enrich_decisions: true
        }

        if (event.data.checkout.totalPrice.currencyCode === 'USD') {
            fetch("https://logx.optimizely.com/v1/events", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
        }
    });

});
