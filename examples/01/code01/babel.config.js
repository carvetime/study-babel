const presets = [
    [
        "@babel/env",
        {
            targets: {
                edge: "17",
                firefox: "10",
                chrome: "67",
                safari: "11.1"
            },
            useBuiltIns: "usage",
        },
    ]
    
];

module.exports = {presets};